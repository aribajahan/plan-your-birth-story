import { supabase } from "@/integrations/supabase/client";
import { appConfig } from "@/config/app-config";
import type { ChatMessage, UserPreferences, DiscussedTopics } from "@/types/shared";

export class ChatService {
  static async generateResponse(
    userMessage: string,
    messages: ChatMessage[],
    completion: number,
    nextTopic: string | null
  ): Promise<string> {
    try {
      // Keep the last ~10 exchanges (~20 messages) for better continuity
      const recentMessages = messages.slice(-20).map((msg) => ({
        role: msg.role === "assistant" ? "assistant" : "user",
        content: msg.content,
      }));

      // Enhanced system message with completion guidance
      const systemMessage = {
        role: "system",
        content: `You are a warm, supportive birth-planning companion. Your goal is to help users complete a comprehensive birth plan.

Birth plan completion: ${completion}%
${nextTopic ? `Next suggested topic: ${nextTopic}` : 'All major topics covered!'}

GUIDANCE RULES:
- If completion is below 60%, gently guide toward undiscussed topics
- If completion is 60-80%, ask deeper questions about partially filled preferences  
- If completion is 80%+, focus on finalizing details and preparing for completion
- Always celebrate milestones and progress
- When user goes off-topic, acknowledge then gently redirect: "That's wonderful insight! Now let's explore [next topic]..."
- If next topic exists, naturally weave it into your response
- Keep responses warm, encouraging, and focused on birth plan completion

Reply in 2–3 short sentences, friendly and non-clinical, no medical advice. If helpful, end with one concise follow-up question about birth planning.`,
      } as const;

      const finalMessages = [
        systemMessage,
        ...recentMessages,
        { role: "user", content: userMessage },
      ];

      const { data, error } = await supabase.functions.invoke("openai-generate", {
        body: {
          model: appConfig.openai.model,
          messages: finalMessages,
          maxTokens: appConfig.openai.maxTokens,
        },
      });

      if (error) {
        console.error("Error calling OpenAI:", error);
        return "I'm having trouble connecting right now. Could you try asking that again?";
      }

      const text = (data?.generatedText as string) ||
        "I'm here to help you with your birth plan. What would you like to discuss?";

      return this.trimToSentences(text, 3);
    } catch (error) {
      console.error("Error generating response:", error);
      return "I'm having a moment of difficulty - could you rephrase your question?";
    }
  }

  private static trimToSentences(text: string, max = 3): string {
    const parts = text
      .split(/(?<=[.!?])\s+/)
      .map((s) => s.trim())
      .filter(Boolean);
    return parts.slice(0, max).join(" ").trim();
  }

  static updateUserPreferences(message: string): Partial<UserPreferences> {
    const updates: Partial<UserPreferences> = {};
    
    // Detect communication style preference
    if (message.includes('detail') || message.includes('explain') || message.includes('more information')) {
      updates.communicationStyle = 'detailed';
    } else if (message.includes('quick') || message.includes('simple') || message.includes('brief')) {
      updates.communicationStyle = 'direct';
    } else if (message.includes('gentle') || message.includes('support') || message.includes('scared')) {
      updates.communicationStyle = 'gentle';
    }

    // Detect pain management preferences
    if (message.includes('natural') || message.includes('no medication') || message.includes('unmedicated')) {
      updates.painManagementApproach = 'natural';
    } else if (message.includes('epidural') || message.includes('medication') || message.includes('pain relief')) {
      updates.painManagementApproach = 'medical';
    } else if (message.includes('flexible') || message.includes('open to both') || message.includes('see how it goes')) {
      updates.painManagementApproach = 'flexible';
    }

    // Detect environment preferences
    if (message.includes('quiet') || message.includes('peaceful') || message.includes('calm')) {
      updates.environmentStyle = 'quiet';
    } else if (message.includes('active') || message.includes('energy') || message.includes('people around')) {
      updates.environmentStyle = 'lively';
    }

    // Detect experience level
    if (message.includes('first baby') || message.includes('first time') || message.includes('never done this')) {
      updates.previousExperience = 'first-time';
    } else if (message.includes('had babies before') || message.includes('not my first') || message.includes('experienced')) {
      updates.previousExperience = 'experienced';
    }

    // Detect birth location
    if (message.includes('hospital')) {
      updates.birthLocation = 'hospital';
    } else if (message.includes('birthing center') || message.includes('birth center')) {
      updates.birthLocation = 'birthing-center';
    } else if (message.includes('home birth') || message.includes('at home')) {
      updates.birthLocation = 'home';
    }

    // Detect support needs
    if (message.includes('minimal') || message.includes('leave me alone') || message.includes('quiet support')) {
      updates.supportNeeds = 'minimal';
    } else if (message.includes('lots of support') || message.includes('need help') || message.includes('check on me')) {
      updates.supportNeeds = 'extensive';
    } else if (message.includes('moderate') || message.includes('balanced') || message.includes('when needed')) {
      updates.supportNeeds = 'moderate';
    }

    return updates;
  }

  static updateDiscussedTopics(message: string): Partial<DiscussedTopics> {
    const updates: Partial<DiscussedTopics> = {};
    
    // Mark topics as discussed based on content
    if (message.includes('pain') || message.includes('epidural') || message.includes('medication')) {
      updates.painManagement = true;
    }
    if (message.includes('environment') || message.includes('room') || message.includes('atmosphere')) {
      updates.environment = true;
    }
    if (message.includes('position') || message.includes('move') || message.includes('walk')) {
      updates.positions = true;
    }
    if (message.includes('support') || message.includes('team') || message.includes('help')) {
      updates.support = true;
    }
    if (message.includes('expect') || message.includes('hope') || message.includes('worry') || message.includes('concern')) {
      updates.expectations = true;
    }

    return updates;
  }

  static getNextUndiscussedTopic(discussed: DiscussedTopics): string | null {
    if (!discussed.painManagement) return 'pain management options';
    if (!discussed.environment) return 'birth environment preferences';
    if (!discussed.support) return 'support team and communication';
    if (!discussed.positions) return 'labor positions and mobility';
    if (!discussed.expectations) return 'birth expectations and contingencies';
    return null;
  }

  static getMilestoneMessage(completion: number): string | null {
    const milestones = appConfig.progress.milestones;
    
    if (completion >= 25 && completion < 50) return milestones[25];
    if (completion >= 50 && completion < 75) return milestones[50];
    if (completion >= 75 && completion < 90) return milestones[75];
    if (completion >= 90 && completion < 100) return milestones[90];
    if (completion >= 100) return milestones[100];
    
    return null;
  }
}
