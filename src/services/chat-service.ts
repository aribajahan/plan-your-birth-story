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
    const lowerMessage = message.toLowerCase();
    
    // Enhanced communication style detection
    if (lowerMessage.includes('detail') || lowerMessage.includes('explain') || lowerMessage.includes('more information') || 
        lowerMessage.includes('tell me everything') || lowerMessage.includes('want to know') || lowerMessage.includes('understand')) {
      updates.communicationStyle = 'detailed';
    } else if (lowerMessage.includes('quick') || lowerMessage.includes('simple') || lowerMessage.includes('brief') || 
               lowerMessage.includes('straight forward') || lowerMessage.includes('direct') || lowerMessage.includes('just tell me')) {
      updates.communicationStyle = 'direct';
    } else if (lowerMessage.includes('gentle') || lowerMessage.includes('nervous') || lowerMessage.includes('scared') ||
               lowerMessage.includes('anxious') || lowerMessage.includes('worried') || lowerMessage.includes('reassuring')) {
      updates.communicationStyle = 'gentle';
    }

    // Enhanced pain management detection
    if (lowerMessage.includes('natural') || lowerMessage.includes('no medication') || lowerMessage.includes('unmedicated') ||
        lowerMessage.includes('drug-free') || lowerMessage.includes('without drugs') || lowerMessage.includes('breathing') ||
        lowerMessage.includes('hypnobirthing') || lowerMessage.includes('water birth')) {
      updates.painManagementApproach = 'natural';
    } else if (lowerMessage.includes('epidural') || lowerMessage.includes('medication') || lowerMessage.includes('pain relief') ||
               lowerMessage.includes('drugs') || lowerMessage.includes('medical') || lowerMessage.includes('anesthesia')) {
      updates.painManagementApproach = 'medical';
    } else if (lowerMessage.includes('flexible') || lowerMessage.includes('open to both') || lowerMessage.includes('see how it goes') ||
               lowerMessage.includes('decide later') || lowerMessage.includes('keep options open') || lowerMessage.includes('maybe')) {
      updates.painManagementApproach = 'flexible';
    }

    // Enhanced environment detection
    if (lowerMessage.includes('quiet') || lowerMessage.includes('peaceful') || lowerMessage.includes('calm') ||
        lowerMessage.includes('dim lights') || lowerMessage.includes('soft music') || lowerMessage.includes('private') ||
        lowerMessage.includes('minimal noise')) {
      updates.environmentStyle = 'quiet';
    } else if (lowerMessage.includes('active') || lowerMessage.includes('energy') || lowerMessage.includes('people around') ||
               lowerMessage.includes('music') || lowerMessage.includes('talking') || lowerMessage.includes('social')) {
      updates.environmentStyle = 'lively';
    }

    // Enhanced experience detection
    if (lowerMessage.includes('first baby') || lowerMessage.includes('first time') || lowerMessage.includes('never done this') ||
        lowerMessage.includes('first child') || lowerMessage.includes('new to this') || lowerMessage.includes('don\'t know what to expect')) {
      updates.previousExperience = 'first-time';
    } else if (lowerMessage.includes('had babies before') || lowerMessage.includes('not my first') || lowerMessage.includes('experienced') ||
               lowerMessage.includes('second baby') || lowerMessage.includes('third') || lowerMessage.includes('previous birth') ||
               lowerMessage.includes('last time')) {
      updates.previousExperience = 'experienced';
    }

    // Enhanced location detection
    if (lowerMessage.includes('hospital')) {
      updates.birthLocation = 'hospital';
    } else if (lowerMessage.includes('birthing center') || lowerMessage.includes('birth center') || lowerMessage.includes('midwifery')) {
      updates.birthLocation = 'birthing-center';
    } else if (lowerMessage.includes('home birth') || lowerMessage.includes('at home') || lowerMessage.includes('my house')) {
      updates.birthLocation = 'home';
    }

    // Enhanced support needs detection
    if (lowerMessage.includes('minimal') || lowerMessage.includes('leave me alone') || lowerMessage.includes('quiet support') ||
        lowerMessage.includes('space') || lowerMessage.includes('privacy') || lowerMessage.includes('don\'t need much')) {
      updates.supportNeeds = 'minimal';
    } else if (lowerMessage.includes('lots of support') || lowerMessage.includes('need help') || lowerMessage.includes('check on me') ||
               lowerMessage.includes('frequent') || lowerMessage.includes('active support') || lowerMessage.includes('close attention')) {
      updates.supportNeeds = 'extensive';
    } else if (lowerMessage.includes('moderate') || lowerMessage.includes('balanced') || lowerMessage.includes('when needed') ||
               lowerMessage.includes('some support') || lowerMessage.includes('reasonable amount')) {
      updates.supportNeeds = 'moderate';
    }

    return updates;
  }

  // Enhanced method to extract specific details from user messages
  static extractSpecificDetails(message: string): {
    names?: string[];
    preferences?: string[];
    concerns?: string[];
    requests?: string[];
  } {
    const details: any = {};
    const lowerMessage = message.toLowerCase();

    // Extract names (looking for patterns like "my partner John" or "Jane will be there")
    const namePatterns = [
      /(?:my |the |with )?(?:partner|husband|wife|mom|mother|dad|father|sister|brother|friend|doula) (?:is |named |called )?([A-Z][a-z]+)/gi,
      /([A-Z][a-z]+) (?:will be|is my|is the)/gi,
      /called ([A-Z][a-z]+)/gi
    ];
    
    const extractedNames: string[] = [];
    namePatterns.forEach(pattern => {
      const matches = message.matchAll(pattern);
      for (const match of matches) {
        if (match[1] && !extractedNames.includes(match[1])) {
          extractedNames.push(match[1]);
        }
      }
    });
    
    if (extractedNames.length > 0) {
      details.names = extractedNames;
    }

    // Extract specific preferences
    const preferencePatterns = [
      /I (?:want|prefer|would like|need) to ([^.!?]+)/gi,
      /I don't want ([^.!?]+)/gi,
      /Please (?:don't |avoid )?([^.!?]+)/gi
    ];

    const extractedPreferences: string[] = [];
    preferencePatterns.forEach(pattern => {
      const matches = message.matchAll(pattern);
      for (const match of matches) {
        if (match[1] && !extractedPreferences.includes(match[1].trim())) {
          extractedPreferences.push(match[1].trim());
        }
      }
    });

    if (extractedPreferences.length > 0) {
      details.preferences = extractedPreferences;
    }

    // Extract concerns or worries
    if (lowerMessage.includes('worried') || lowerMessage.includes('concerned') || lowerMessage.includes('afraid') || 
        lowerMessage.includes('nervous') || lowerMessage.includes('scared')) {
      details.concerns = [message]; // Store the full message as context
    }

    return details;
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
