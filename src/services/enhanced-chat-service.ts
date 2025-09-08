import { ChatService } from "./chat-service";
import type { ChatMessage, UserPreferences, DiscussedTopics } from "@/types/shared";

export interface EnhancedUserData {
  preferences: UserPreferences;
  discussedTopics: DiscussedTopics;
  specificDetails: {
    supportTeam: {
      primarySupportName?: string;
      primarySupportContact?: string;
      additionalSupport: { type: string; name: string; contact?: string }[];
      specialInstructions?: string;
    };
    laborPreferences: {
      customRequests?: string;
      specificPositions?: string[];
      environmentDetails?: string;
    };
    painManagement: {
      specificMethods?: string[];
      concerns?: string[];
      backupPreferences?: string;
    };
    personalQuotes: string[]; // Direct quotes from user for personalization
  };
}

export class EnhancedChatService extends ChatService {
  static async generateEnhancedResponse(
    userMessage: string,
    messages: ChatMessage[],
    userData: EnhancedUserData,
    completion: number
  ): Promise<{
    response: string;
    updatedUserData: Partial<EnhancedUserData>;
    followUpQuestions?: string[];
  }> {
    // Generate base response
    const baseResponse = await this.generateResponse(
      userMessage,
      messages,
      completion,
      this.getNextUndiscussedTopic(userData.discussedTopics)
    );

    // Extract enhanced details from the message
    const specificDetails = this.extractSpecificDetails(userMessage);
    const updatedPreferences = this.updateUserPreferences(userMessage);
    const updatedTopics = this.updateDiscussedTopics(userMessage);

    // Build updated user data
    const updatedUserData: Partial<EnhancedUserData> = {
      preferences: { ...userData.preferences, ...updatedPreferences },
      discussedTopics: { ...userData.discussedTopics, ...updatedTopics },
      specificDetails: {
        ...userData.specificDetails,
        personalQuotes: [
          ...userData.specificDetails.personalQuotes,
          ...this.extractMeaningfulQuotes(userMessage)
        ].slice(-10) // Keep last 10 quotes
      }
    };

    // Update support team details if names were mentioned
    if (specificDetails.names && specificDetails.names.length > 0) {
      const supportUpdate = this.updateSupportTeamFromMessage(userMessage, specificDetails.names);
      if (supportUpdate) {
        updatedUserData.specificDetails!.supportTeam = {
          ...userData.specificDetails.supportTeam,
          ...supportUpdate
        };
      }
    }

    // Generate targeted follow-up questions based on missing info
    const followUpQuestions = this.generateFollowUpQuestions(
      userData,
      updatedTopics,
      completion
    );

    return {
      response: baseResponse,
      updatedUserData,
      followUpQuestions
    };
  }

  private static updateSupportTeamFromMessage(
    message: string,
    names: string[]
  ): Partial<EnhancedUserData['specificDetails']['supportTeam']> | null {
    const lowerMessage = message.toLowerCase();
    const update: any = {};

    // Check if this is about primary support
    if (lowerMessage.includes('partner') || lowerMessage.includes('husband') || 
        lowerMessage.includes('wife') || lowerMessage.includes('main support')) {
      if (names.length > 0) {
        update.primarySupportName = names[0];
      }
    }

    // Check for additional support mentions
    names.forEach(name => {
      if (lowerMessage.includes('doula') && lowerMessage.includes(name.toLowerCase())) {
        update.additionalSupport = update.additionalSupport || [];
        update.additionalSupport.push({ type: 'Doula', name, contact: '' });
      } else if (lowerMessage.includes('mom') || lowerMessage.includes('mother')) {
        update.additionalSupport = update.additionalSupport || [];
        update.additionalSupport.push({ type: 'Mother', name, contact: '' });
      } else if (lowerMessage.includes('friend')) {
        update.additionalSupport = update.additionalSupport || [];
        update.additionalSupport.push({ type: 'Friend', name, contact: '' });
      }
    });

    return Object.keys(update).length > 0 ? update : null;
  }

  private static extractMeaningfulQuotes(message: string): string[] {
    const quotes: string[] = [];
    
    // Extract meaningful statements (avoiding questions and short responses)
    if (message.length > 20 && !message.includes('?') && 
        (message.includes('I want') || message.includes('I prefer') || 
         message.includes('I need') || message.includes('I don\'t want'))) {
      quotes.push(message.trim());
    }

    return quotes;
  }

  private static generateFollowUpQuestions(
    userData: EnhancedUserData,
    recentTopics: Partial<DiscussedTopics>,
    completion: number
  ): string[] {
    const questions: string[] = [];

    // Support team questions
    if (recentTopics.support && userData.specificDetails.supportTeam.primarySupportName && 
        !userData.specificDetails.supportTeam.primarySupportContact) {
      questions.push("What's the best phone number to reach your primary support person?");
    }

    // Pain management follow-ups
    if (recentTopics.painManagement && userData.preferences.painManagementApproach === 'natural' &&
        !userData.specificDetails.painManagement.specificMethods?.length) {
      questions.push("Which natural pain management techniques are you most interested in trying?");
    }

    // Environment details
    if (recentTopics.environment && userData.preferences.environmentStyle === 'quiet' &&
        !userData.specificDetails.laborPreferences.environmentDetails) {
      questions.push("What specific things help you feel calm and peaceful?");
    }

    return questions.slice(0, 2); // Limit to 2 follow-up questions
  }
}