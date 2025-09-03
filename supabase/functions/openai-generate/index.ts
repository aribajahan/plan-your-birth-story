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

    const { prompt, messages, model, maxTokens } = await req.json().catch(() => ({ }));

    const selectedModel: string = model || "gpt-4o-mini"; // default to a legacy model for broad compatibility

    // Detect model family to set correct token parameter
    const isNewModel = ["gpt-5", "gpt-4.1", "o3", "o4-mini"].some((m) => selectedModel.startsWith(m));

    // Safe upper bound to prevent runaway costs
    const tokensCap = Math.max(1, Math.min(Number(maxTokens) || 800, 2000));

    const payload: Record<string, unknown> = {
      model: selectedModel,
      messages: Array.isArray(messages) && messages.length
        ? messages
        : [{ role: "user", content: String(prompt ?? "") }],
    };

    if (isNewModel) {
      // Newer models require max_completion_tokens and do not support temperature
      (payload as any).max_completion_tokens = tokensCap;
    } else {
      // Legacy models use max_tokens
      (payload as any).max_tokens = tokensCap;
      (payload as any).temperature = 0.7; // supported by legacy models
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openAIApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => "");
      console.error("OpenAI API error:", response.status, errText);
      return new Response(
        JSON.stringify({ error: "OpenAI request failed", status: response.status, details: errText }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content ?? "";

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
