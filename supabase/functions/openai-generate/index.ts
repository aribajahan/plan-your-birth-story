import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const openAIApiKey = Deno.env.get("OPENAI_API_KEY");

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!openAIApiKey) {
      console.error("OPENAI_API_KEY is not set in Supabase secrets.");
      return new Response(
        JSON.stringify({ error: "Server misconfiguration: missing OPENAI_API_KEY" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { prompt, messages, model, maxTokens, promptId, promptVersion } = await req.json().catch(() => ({ }));

    const selectedModel: string = model || "gpt-4o-mini"; // default to a legacy model for broad compatibility

    // Detect model family to set correct token parameter
    const isNewModel = ["gpt-5", "gpt-4.1", "o3", "o4-mini"].some((m) => selectedModel.startsWith(m));

    // Safe upper bound to prevent runaway costs
    const tokensCap = Math.max(1, Math.min(Number(maxTokens) || 800, 2000));

    // Determine if we should use the Responses API with a saved Prompt
    const promptRefId: string | undefined = (prompt && typeof prompt === 'object' && (prompt as any).id) || promptId;
    const promptRefVersion: string | number | undefined = (prompt && typeof prompt === 'object' && (prompt as any).version) || promptVersion;
    const useResponsesApi = Boolean(promptRefId);

    let response: Response;

    if (useResponsesApi) {
      // Build payload for Responses API
      const payload: Record<string, unknown> = {
        // Only include model if the client explicitly provided it; otherwise let the Prompt control model
        ...(model ? { model: selectedModel } : {}),
        // Provide the saved Prompt reference
        prompt: { id: promptRefId, version: (promptRefVersion != null ? String(promptRefVersion) : "latest") },
        // Also pass conversation context so the Prompt can use it
        input: Array.isArray(messages) && messages.length
          ? messages
          : [{ role: "user", content: String(prompt ?? "") }],
      };

      // Use Responses API parameter name
      (payload as any).max_output_tokens = tokensCap;
      // Only set temperature for legacy models
      if (!isNewModel) {
        (payload as any).temperature = 0.7;
      }

      response = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openAIApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    } else {
      // Fallback to Chat Completions API
      const payload: Record<string, unknown> = {
        model: selectedModel,
        messages: Array.isArray(messages) && messages.length
          ? messages
          : [{ role: "user", content: String(prompt ?? "") }],
      };

      if (isNewModel) {
        (payload as any).max_completion_tokens = tokensCap;
      } else {
        (payload as any).max_tokens = tokensCap;
        (payload as any).temperature = 0.7;
      }

      response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openAIApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    }

    if (!response.ok) {
      const errText = await response.text().catch(() => "");
      console.error("OpenAI API error:", response.status, errText);

      // Fallback: if Responses API fails (e.g., due to Prompt settings), try Chat Completions
      if (useResponsesApi) {
        try {
          const fallbackPayload: Record<string, unknown> = {
            model: selectedModel,
            messages: Array.isArray(messages) && messages.length
              ? messages
              : [{ role: "user", content: String(prompt ?? "") }],
          };

          if (isNewModel) {
            (fallbackPayload as any).max_completion_tokens = tokensCap;
          } else {
            (fallbackPayload as any).max_tokens = tokensCap;
            (fallbackPayload as any).temperature = 0.7;
          }

          const fb = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${openAIApiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(fallbackPayload),
          });

          if (fb.ok) {
            const fbData = await fb.json();
            const fbContent = fbData?.choices?.[0]?.message?.content ?? "";
            return new Response(
              JSON.stringify({ model: selectedModel, generatedText: fbContent, usedFallback: true }),
              { headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
          } else {
            const fbErr = await fb.text().catch(() => "");
            console.error("Fallback Chat Completions also failed:", fb.status, fbErr);
          }
        } catch (e) {
          console.error("Fallback attempt error:", e);
        }
      }

      return new Response(
        JSON.stringify({ error: "OpenAI request failed", status: response.status, details: errText }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();

    let content = "";
    if (useResponsesApi) {
      content = data?.output_text ?? "";
      if (!content) {
        try {
          // Try alternative shapes
          content = data?.output?.[0]?.content?.[0]?.text?.value
            || data?.content?.[0]?.text
            || data?.data?.[0]?.text
            || "";
        } catch (_) {
          content = "";
        }
      }
    } else {
      content = data?.choices?.[0]?.message?.content ?? "";
    }

    return new Response(
      JSON.stringify({
        model: selectedModel,
        generatedText: content,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in openai-generate function:", error);
    return new Response(
      JSON.stringify({ error: (error as Error).message ?? "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
