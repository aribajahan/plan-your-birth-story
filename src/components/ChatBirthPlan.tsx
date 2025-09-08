import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Mic, MicOff, FileText, MessageCircle, Sparkles, Download } from "lucide-react";
import { BirthPlanData } from "./BirthPlanWizard";
import { RealityCheck } from "./RealityCheck";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { BirthPlanProgress } from "@/components/BirthPlanProgress";
import { useBirthPlanProgress } from "@/hooks/useBirthPlanProgress";
import { LiveBirthPlanCanvas } from "@/components/LiveBirthPlanCanvas";
import { useLiveBirthPlan } from "@/hooks/useLiveBirthPlan";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
interface ChatBirthPlanProps {
  onBack: () => void;
  onSwitchToForm: () => void;
}

export interface UserPreferences {
  painManagementApproach?: 'natural' | 'medical' | 'flexible';
  environmentStyle?: 'quiet' | 'lively' | 'flexible';
  supportNeeds?: 'minimal' | 'moderate' | 'extensive';
  communicationStyle?: 'direct' | 'gentle' | 'detailed';
  birthLocation?: 'hospital' | 'birthing-center' | 'home';
  previousExperience?: 'first-time' | 'experienced' | 'mixed';
}

export interface DiscussedTopics {
  painManagement: boolean;
  environment: boolean;
  positions: boolean;
  support: boolean;
  expectations: boolean;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'text' | 'reality-check' | 'summary' | 'script-preview';
  realityCheck?: {
    title: string;
    content: string;
  };
  scriptPreview?: {
    title: string;
    content: string;
    category: string;
  };
}

export const ChatBirthPlan = ({ onBack, onSwitchToForm }: ChatBirthPlanProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm here to help you create a birth plan that truly reflects what matters to you. Think of this as having a conversation with a supportive friend who's been through this before and wants to help you feel prepared and confident. Let's start with something that many people feel conflicted about - how are you thinking about pain management during labor? There's no right answer here, just what feels right for you.",
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
      customRequests: '',
    },
    painManagement: {
      approach: '',
      specificPreferences: [],
      backupPlan: '',
      specificDetails: '',
    },
    supportTeam: {
      primarySupport: '',
      primarySupportName: '',
      primarySupportContact: '',
      additionalSupport: [],
      additionalSupportDetails: [],
      communicationStyle: '',
      specialInstructions: '',
    },
  });
  const [conversationPhase, setConversationPhase] = useState<'introduction' | 'labor' | 'pain' | 'support' | 'scripts' | 'complete'>('introduction');
  const [isListening, setIsListening] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const [discussedTopics, setDiscussedTopics] = useState<DiscussedTopics>({
    painManagement: false,
    environment: false,
    positions: false,
    support: false,
    expectations: false,
  });
  // New state for progress, auth prompting, and resume
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [showResumePrompt, setShowResumePrompt] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [promptedAuth, setPromptedAuth] = useState(false);
  const [guestId, setGuestId] = useState<string | null>(null);

  const { completion, capturedPrefs } = useBirthPlanProgress(userPreferences, discussedTopics);
  const liveBirthPlan = useLiveBirthPlan(userPreferences, discussedTopics);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const updateUserPreferences = (message: string) => {
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

    if (Object.keys(updates).length > 0) {
      setUserPreferences(prev => ({ ...prev, ...updates }));
    }
    
    // Mark topics as discussed based on content
    if (message.includes('pain') || message.includes('epidural') || message.includes('medication')) {
      setDiscussedTopics(prev => ({ ...prev, painManagement: true }));
    }
    if (message.includes('environment') || message.includes('room') || message.includes('atmosphere')) {
      setDiscussedTopics(prev => ({ ...prev, environment: true }));
    }
    if (message.includes('position') || message.includes('move') || message.includes('walk')) {
      setDiscussedTopics(prev => ({ ...prev, positions: true }));
    }
    if (message.includes('support') || message.includes('team') || message.includes('help')) {
      setDiscussedTopics(prev => ({ ...prev, support: true }));
    }
    if (message.includes('expect') || message.includes('hope') || message.includes('worry') || message.includes('concern')) {
      setDiscussedTopics(prev => ({ ...prev, expectations: true }));
    }
  };

  const generateScriptPreview = (preferences: UserPreferences, phase: string) => {
    const scripts = {
      pain_natural: {
        title: "Discussing Natural Pain Management",
        content: "I'm planning to try natural comfort measures during labor, including movement, breathing techniques, and possibly water therapy. I'd like the room to be conducive to these methods. Can we discuss what support your team can provide?",
        category: "Pain Management"
      },
      pain_medical: {
        title: "Pain Relief Options",
        content: "I'm interested in medical pain management options during labor. Can you walk me through the timing for an epidural and what to expect? I want to understand my choices so I can make informed decisions.",
        category: "Pain Management"
      },
      environment_quiet: {
        title: "Creating a Calm Birth Environment",
        content: "I'm hoping for a calm, peaceful birth environment with dimmed lights and minimal interruptions. Can we discuss how to coordinate care while respecting this atmosphere?",
        category: "Environment"
      },
      environment_active: {
        title: "Active Birth Preferences",
        content: "I'd like to stay active during labor with freedom to move and change positions. Can we discuss the monitoring options that would allow this mobility?",
        category: "Environment"
      }
    };

    // Choose appropriate script based on preferences and phase
    let scriptKey = '';
    if (phase === 'pain') {
      if (preferences.painManagementApproach === 'natural') {
        scriptKey = 'pain_natural';
      } else if (preferences.painManagementApproach === 'medical') {
        scriptKey = 'pain_medical';
      }
    } else if (phase === 'labor') {
      if (preferences.environmentStyle === 'quiet') {
        scriptKey = 'environment_quiet';
      } else if (preferences.environmentStyle === 'lively') {
        scriptKey = 'environment_active';
      }
    }

    return scripts[scriptKey as keyof typeof scripts];
  };

  const markTopicDiscussed = (topic: keyof DiscussedTopics) => {
    setDiscussedTopics(prev => ({ ...prev, [topic]: true }));
  };

  const getNextUndiscussedTopic = (discussed: DiscussedTopics): string | null => {
    if (!discussed.painManagement) return 'pain management options';
    if (!discussed.environment) return 'birth environment preferences';
    if (!discussed.support) return 'support team and communication';
    if (!discussed.positions) return 'labor positions and mobility';
    if (!discussed.expectations) return 'birth expectations and contingencies';
    return null;
  };

  const getMilestoneMessage = (completion: number): string | null => {
    if (completion >= 25 && completion < 50) {
      return "🌟 Great start! You're making good progress on your birth plan. Let's keep exploring your preferences.";
    }
    if (completion >= 50 && completion < 75) {
      return "🎉 Wonderful! You're halfway through building your birth plan. Your vision is really taking shape.";
    }
    if (completion >= 75 && completion < 90) {
      return "✨ Amazing progress! Your birth plan is looking comprehensive. Let's cover the final details.";
    }
    if (completion >= 90 && completion < 100) {
      return "🎊 You're almost there! Just a few more details and your birth plan will be complete.";
    }
    if (completion >= 100) {
      return "🌈 Congratulations! Your birth plan is complete. You've thoughtfully considered all the important aspects of your birth experience.";
    }
    return null;
  };

  // Removed saved prompt usage; relying on explicit system prompt and model


  const generateResponse = async (userMessage: string): Promise<string> => {
    const lowerMessage = userMessage.toLowerCase();

    // Update user preferences based on their responses
    updateUserPreferences(lowerMessage);

    const nextTopic = getNextUndiscussedTopic(discussedTopics);
    const milestoneMessage = getMilestoneMessage(completion);
    
    // Helper to trim to a max number of sentences
    const trimToSentences = (t: string, max = 3) => {
      const parts = t
        .split(/(?<=[.!?])\s+/)
        .map((s) => s.trim())
        .filter(Boolean);
      return parts.slice(0, max).join(" ").trim();
    };

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
          model: "gpt-4.1-2025-04-14",
          messages: finalMessages,
          maxTokens: 180,
        },
      });

      if (error) {
        console.error("Error calling OpenAI:", error);
        return "I'm having trouble connecting right now. Could you try asking that again?";
      }

      const text = (data?.generatedText as string) ||
        "I'm here to help you with your birth plan. What would you like to discuss?";

      return trimToSentences(text, 3);
    } catch (error) {
      console.error("Error generating response:", error);
      return "I'm having a moment of difficulty - could you rephrase your question?";
    }
  };

  const shouldAddRealityCheck = (message: string, phase: string): boolean => {
    const lowerMessage = message.toLowerCase();
    
    // Add reality checks for specific scenarios
    if (phase === 'pain' && (lowerMessage.includes('no pain') || lowerMessage.includes('completely natural'))) return true;
    if (phase === 'labor' && (lowerMessage.includes('perfect') || lowerMessage.includes('exactly as planned'))) return true;
    if (lowerMessage.includes('worried') || lowerMessage.includes('scared') || lowerMessage.includes('anxious')) return true;
    
    return Math.random() > 0.8; // Occasional random reality checks
  };

  const generateRealityCheck = (phase: string, preferences: UserPreferences) => {
    const realityChecks = {
      pain: {
        natural: {
          title: "Gentle Reality Check: Pain in Labor",
          content: "Natural methods are wonderful and can be very effective. Remember that labor pain intensity varies greatly, and it's wise to stay flexible. Many women find that being open to all options - including medical pain relief if needed - actually helps them feel more confident and relaxed."
        },
        medical: {
          title: "Gentle Reality Check: Medical Options",
          content: "Medical pain relief can be a great choice and doesn't make you 'less strong.' Every birth is different, and the goal is a healthy mom and baby. Having a plan while staying flexible allows you to make the best decisions in the moment."
        }
      },
      labor: {
        environment: {
          title: "Gentle Reality Check: Birth Environment",
          content: "Creating your ideal environment is wonderful, and your care team wants to support your vision. Remember that medical needs might require some adjustments, and that's completely normal. The most important thing is that you and your baby are safe and healthy."
        }
      },
      general: {
        title: "Gentle Reality Check: Birth Plans",
        content: "Birth plans are beautiful guides that help communicate your hopes and values. They're most helpful when they're flexible - think of them as your preferences rather than strict rules. Your care team is your partner in creating the best possible experience for you and your baby."
      }
    };

    // Choose appropriate reality check
    if (phase === 'pain') {
      if (preferences.painManagementApproach === 'natural') return realityChecks.pain.natural;
      if (preferences.painManagementApproach === 'medical') return realityChecks.pain.medical;
    }
    
    if (phase === 'labor') return realityChecks.labor.environment;
    
    return realityChecks.general;
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Generate response using OpenAI
      const response = await generateResponse(userMessage.content);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Add milestone celebrations based on current completion
      const milestoneMessage = getMilestoneMessage(completion);
      if (milestoneMessage && Math.random() > 0.7) { // Show milestone messages occasionally
        setTimeout(() => {
          const milestoneMsg: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: milestoneMessage,
            timestamp: new Date(),
            type: 'text'
          };
          setMessages(prev => [...prev, milestoneMsg]);
        }, 1000);
      }

      // Add completion guidance at key thresholds
      if (completion >= 60 && completion < 80) {
        const nextTopic = getNextUndiscussedTopic(discussedTopics);
        if (nextTopic && Math.random() > 0.8) { // Show guidance occasionally
          setTimeout(() => {
            const guidanceMsg: ChatMessage = {
              id: (Date.now() + 2).toString(),
              role: 'assistant',
              content: `Let's dive deeper into ${nextTopic} to make your plan even more comprehensive.`,
              timestamp: new Date(),
              type: 'text'
            };
            setMessages(prev => [...prev, guidanceMsg]);
          }, 1500);
        }
      }

      if (completion >= 80) {
        if (Math.random() > 0.9) { // Show final stretch message occasionally
          setTimeout(() => {
            const finalStretchMsg: ChatMessage = {
              id: (Date.now() + 3).toString(),
              role: 'assistant',
              content: "You're in the final stretch! Let's polish the remaining details to complete your personalized birth plan.",
              timestamp: new Date(),
              type: 'text'
            };
            setMessages(prev => [...prev, finalStretchMsg]);
          }, 2000);
        }
      }

      // Generate script preview if user has shared preferences
      if (Object.keys(userPreferences).length > 0 && conversationPhase !== 'introduction') {
        setTimeout(() => {
          const scriptPreview = generateScriptPreview(userPreferences, conversationPhase);
          if (scriptPreview) {
            const scriptMessage: ChatMessage = {
              id: (Date.now() + 4).toString(),
              role: 'assistant',
              content: "",
              timestamp: new Date(),
              type: 'script-preview',
              scriptPreview
            };
            setMessages(prev => [...prev, scriptMessage]);
          }
        }, 2500);
      }
      
      // Add contextual reality checks
      if (shouldAddRealityCheck(userMessage.content, conversationPhase)) {
        setTimeout(() => {
          const realityCheck = generateRealityCheck(conversationPhase, userPreferences);
          const realityCheckMessage: ChatMessage = {
            id: (Date.now() + 3).toString(),
            role: 'assistant',
            content: "",
            timestamp: new Date(),
            type: 'reality-check',
            realityCheck
          };
          setMessages(prev => [...prev, realityCheckMessage]);
        }, 2500);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm having trouble responding right now. Please try again in a moment.",
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleVoiceInput = async () => {
    if (!isListening) {
      setIsListening(true);
      // Voice input functionality to be implemented later
      setTimeout(() => setIsListening(false), 3000);
    } else {
      setIsListening(false);
    }
  };

  const getDynamicQuickReplies = (discussed: DiscussedTopics, completion: number): string[] => {
    if (completion >= 90) {
      return [
        "Review my complete plan",
        "Any final recommendations?", 
        "Help me prepare for birth",
        "What should I discuss with my doctor?"
      ];
    }
    
    const undiscussedReplies: string[] = [];
    if (!discussed.painManagement) undiscussedReplies.push("Tell me about pain relief options");
    if (!discussed.environment) undiscussedReplies.push("What about the birth environment?");
    if (!discussed.support) undiscussedReplies.push("Who should be in my support team?");
    if (!discussed.positions) undiscussedReplies.push("What positions are best for labor?");
    if (!discussed.expectations) undiscussedReplies.push("What should I expect during birth?");
    
    // Fill remaining slots with general helpful prompts
    const generalReplies = [
      "What if things don't go as planned?",
      "How do I communicate with my team?",
      "Tell me about newborn procedures"
    ];
    
    const combined = [...undiscussedReplies, ...generalReplies];
    return combined.slice(0, 4);
  };

  const quickReplies = getDynamicQuickReplies(discussedTopics, completion);

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Header with Progress */}
      <div className="bg-card shadow-card border-b border-border flex-shrink-0">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                <h1 className="text-xl font-semibold text-foreground">Birth Plan Chat</h1>
              </div>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            </div>
            
            <Button 
              variant="outline" 
              onClick={onSwitchToForm}
              className="flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Switch to Forms
            </Button>
          </div>
          
          {/* Enhanced Progress */}
          <BirthPlanProgress 
            completion={completion}
            capturedPrefs={capturedPrefs}
            className="max-w-md"
          />
        </div>
      </div>

      {/* Two-Column Layout: Chat + Live Birth Plan */}
      <div className="flex-1 overflow-hidden flex">
        {/* Chat Column */}
        <div className="flex-1 flex flex-col lg:w-3/5 overflow-hidden">
          <div className="flex-1 overflow-y-auto px-4 py-6 min-h-0">
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {message.type === 'reality-check' && message.realityCheck ? (
                    <div className="w-full max-w-2xl animate-fade-in">
                      <RealityCheck 
                        title={message.realityCheck.title}
                        content={message.realityCheck.content}
                      />
                    </div>
                  ) : message.type === 'script-preview' && message.scriptPreview ? (
                    <div className="w-full max-w-2xl animate-fade-in">
                      <div className="bg-accent/20 border border-accent/40 rounded-lg p-4 mb-2">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/30 flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-accent-foreground" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-accent-foreground">{message.scriptPreview.title}</h4>
                              <span className="text-xs bg-accent/40 text-accent-foreground px-2 py-1 rounded-full">
                                {message.scriptPreview.category}
                              </span>
                            </div>
                            <p className="text-sm text-accent-foreground/80 leading-relaxed italic">
                              "{message.scriptPreview.content}"
                            </p>
                            <p className="text-xs text-accent-foreground/60 mt-2">
                              💡 This script is being generated based on your preferences
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className={`max-w-xl ${message.role === 'user' ? 'ml-8' : 'mr-8'} animate-fade-in`}>
                      <div className={`p-4 rounded-lg shadow-sm transition-smooth hover:shadow-card ${
                        message.role === 'user' 
                          ? 'gradient-primary text-white' 
                          : 'bg-card border border-border text-card-foreground'
                      }`}>
                        <p className="leading-relaxed whitespace-pre-line">{message.content}</p>
                        <div className={`text-xs mt-2 ${message.role === 'user' ? 'text-white/70' : 'text-muted-foreground'}`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start animate-fade-in">
                  <div className="max-w-xl mr-8">
                    <div className="bg-card border border-border text-card-foreground p-4 rounded-lg shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
                        </div>
                        <span className="text-sm text-muted-foreground">Thinking...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Quick Replies - Within Chat Column */}
          <div className="px-4 py-3 bg-muted/30 border-t border-border">
            <div className="max-w-3xl mx-auto">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {quickReplies.map((reply, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setInputMessage(reply)}
                    className="whitespace-nowrap text-xs hover-lift transition-smooth"
                  >
                    {reply}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Message Input - Within Chat Column */}
          <div className="bg-card border-t border-border">
            <div className="px-4 py-4">
              <div className="max-w-3xl mx-auto flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleVoiceInput}
                  className={`transition-smooth ${isListening ? 'bg-primary text-primary-foreground shadow-glow' : 'hover-glow'}`}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
                
                <div className="flex-1">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Share your thoughts, questions, or concerns..."
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    disabled={isLoading}
                    className="border-border transition-smooth focus:shadow-glow"
                  />
                </div>
                
                <Button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="gradient-primary text-white shadow-card hover:shadow-confident transition-editorial transform hover:scale-105"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Live Birth Plan Canvas - Right Column */}
        <div className="hidden lg:block lg:w-2/5 h-full">
          <LiveBirthPlanCanvas 
            birthPlan={liveBirthPlan}
            completion={completion}
            className="h-full overflow-hidden"
          />
        </div>
      </div>

    </div>
  );
};