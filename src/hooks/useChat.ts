import { useState, useRef, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ChatService } from "@/services/chat-service";
import { appConfig } from "@/config/app-config";
import type { ChatMessage, UserPreferences, DiscussedTopics } from "@/types/shared";
import { BirthPlanData } from "@/components/BirthPlanWizard";

export const useChat = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: appConfig.chat.initialMessage,
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({});
  const [birthPlanData, setBirthPlanData] = useState<BirthPlanData>({
    laborPreferences: {
      environment: '',
      positions: [],
      mobility: '',
      atmosphere: '',
    },
    painManagement: {
      approach: '',
      specificPreferences: [],
      backupPlan: '',
    },
    supportTeam: {
      primarySupport: '',
      additionalSupport: [],
      communicationStyle: '',
    },
  });
  const [conversationPhase, setConversationPhase] = useState<'introduction' | 'labor' | 'pain' | 'support' | 'scripts' | 'complete'>('introduction');
  const [isListening, setIsListening] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [discussedTopics, setDiscussedTopics] = useState<DiscussedTopics>({
    painManagement: false,
    environment: false,
    positions: false,
    support: false,
    expectations: false,
  });
  
  // Auth and progress states
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [showResumePrompt, setShowResumePrompt] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [promptedAuth, setPromptedAuth] = useState(false);
  const [guestId, setGuestId] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (completion: number) => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    const messageContent = inputMessage.trim();
    setInputMessage("");
    setIsLoading(true);

    try {
      // Update preferences and topics based on user message
      const lowerMessage = messageContent.toLowerCase();
      const prefUpdates = ChatService.updateUserPreferences(lowerMessage);
      const topicUpdates = ChatService.updateDiscussedTopics(lowerMessage);
      
      if (Object.keys(prefUpdates).length > 0) {
        setUserPreferences(prev => ({ ...prev, ...prefUpdates }));
      }
      
      if (Object.keys(topicUpdates).length > 0) {
        setDiscussedTopics(prev => ({ ...prev, ...topicUpdates }));
      }

      const nextTopic = ChatService.getNextUndiscussedTopic(discussedTopics);
      const response = await ChatService.generateResponse(messageContent, messages, completion, nextTopic);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Check for milestone messages
      const milestoneMessage = ChatService.getMilestoneMessage(completion);
      if (milestoneMessage) {
        setTimeout(() => {
          const milestone: ChatMessage = {
            id: (Date.now() + 2).toString(),
            role: 'assistant',
            content: milestoneMessage,
            timestamp: new Date(),
            type: 'text'
          };
          setMessages(prev => [...prev, milestone]);
        }, 1000);
      }

    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Voice functionality would be implemented here
  };

  return {
    // State
    messages,
    inputMessage,
    isLoading,
    userPreferences,
    birthPlanData,
    conversationPhase,
    isListening,
    currentStep,
    discussedTopics,
    showAuthPrompt,
    showResumePrompt,
    isAuthed,
    promptedAuth,
    guestId,
    messagesEndRef,
    
    // Actions
    setInputMessage,
    sendMessage,
    toggleListening,
    setUserPreferences,
    setBirthPlanData,
    setConversationPhase,
    setCurrentStep,
    setDiscussedTopics,
    setShowAuthPrompt,
    setShowResumePrompt,
    setIsAuthed,
    setPromptedAuth,
    setGuestId
  };
};