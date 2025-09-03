import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Mic, MicOff, FileText, MessageCircle, Sparkles } from "lucide-react";
import { BirthPlanData } from "./BirthPlanWizard";
import { RealityCheck } from "./RealityCheck";

interface ChatBirthPlanProps {
  onBack: () => void;
  onSwitchToForm: () => void;
}

interface UserPreferences {
  painManagementApproach?: 'natural' | 'medical' | 'flexible';
  environmentStyle?: 'quiet' | 'lively' | 'flexible';
  supportNeeds?: 'minimal' | 'moderate' | 'extensive';
  communicationStyle?: 'direct' | 'gentle' | 'detailed';
  birthLocation?: 'hospital' | 'birthing-center' | 'home';
  previousExperience?: 'first-time' | 'experienced' | 'mixed';
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
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi there! I'm Maya, your birth plan companion. Think of me as a supportive friend who's been through this journey many times before - here to help you create a plan that feels right for YOU.\n\nI'll guide you through the important decisions at your own pace, share gentle reality checks when helpful, and even generate personalized scripts for talking with your care team. Ready to start? What's on your mind - your ideal birth environment, pain management thoughts, or maybe you have specific questions?",
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
  const totalSteps = 5;
  
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

    if (Object.keys(updates).length > 0) {
      setUserPreferences(prev => ({ ...prev, ...updates }));
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

  const generateResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Update user preferences based on their responses
    updateUserPreferences(lowerMessage);
    
    // Generate contextual responses based on phase and preferences
    const responses = {
      introduction: {
        environment: [
          "I love that you're thinking about your birth environment! Creating the right atmosphere can really help you feel grounded. Are you picturing something calm and intimate, or do you thrive with more energy and activity around you?",
          "The environment you birth in can make such a difference. Some women want dimmed lights and soft music, others prefer things brighter and more bustling. What feels like 'home' to you?"
        ],
        pain: [
          "Pain management is such a personal choice, and there's no 'right' way to approach it. Are you leaning toward trying natural methods first, or are you thinking medical options might be helpful from the start?",
          "Let's talk about pain management - this is where I see so many women get anxious, but you have options! Are you curious about natural comfort measures, or would you like to explore medical pain relief?"
        ],
        general: [
          "That's a great question. I'm here to help you think through all of it. What aspect feels most important or overwhelming to you right now?",
          "I can hear how thoughtful you're being about this. What would help you feel most prepared and confident?"
        ]
      },
      labor: {
        environment: [
          userPreferences.communicationStyle === 'gentle' 
            ? "Creating your perfect birth space sounds wonderful. Many women find that thinking about lighting, who they want present, and how they want to move helps them feel more in control. What draws you in - having your favorite people close by, or having space to move freely?"
            : "Great thinking about your birth environment. Key things to consider: lighting, music, who's present, and mobility. What matters most - familiar faces or freedom to move?",
          userPreferences.environmentStyle === 'quiet'
            ? "I can tell you value a peaceful atmosphere. Many women with similar preferences love dimmed lights, soft music, and minimal interruptions. How do you envision managing visitors or medical checks in your calm space?"
            : "It sounds like you might enjoy a more dynamic environment. Some women love having their support team actively involved and don't mind more activity. What would make you feel most supported?"
        ],
        positions: [
          "Movement and positioning can be incredibly helpful during labor. Your body will tell you what it needs, but it's good to know your options. Do you see yourself wanting to walk around, use different positions, or maybe try water birth?",
          "Great question about positioning! Your comfort and your baby's position both matter. Are you drawn to staying upright and mobile, or do you think you might want more supported positions?"
        ]
      },
      pain: {
        natural: [
          userPreferences.painManagementApproach === 'natural'
            ? "I love that you want to try natural methods. Water, movement, breathing, and massage can be incredibly effective. Since this feels important to you, let's think about your backup plan - what would you want if labor is more intense than expected?"
            : "Natural pain management has so many wonderful tools - breathing, positioning, water, massage. It's smart to also think about what you'd want if you need more support. How do you feel about keeping medical options open just in case?",
          "There are amazing natural comfort measures available. Some women love water birth, others swear by movement and massage. What resonates with you, and how would you want to handle it if those methods aren't quite enough?"
        ],
        medical: [
          userPreferences.painManagementApproach === 'medical'
            ? "Medical pain relief can be such a gift when you need it. Since you're open to this, let's think about timing - some women want it early to stay relaxed, others prefer to try natural methods first. What feels right for your situation?"
            : "Epidurals and other medical options are there when you need them. Many women like having a plan but staying flexible. What would help you feel confident making decisions in the moment?",
          "Medical pain management can really help you stay present and focused. Are you thinking about timing - like having it available early, or trying other methods first and having it as backup?"
        ]
      }
    };

    // Select appropriate response category
    let category = 'general';
    let phase = conversationPhase;
    
    if (lowerMessage.includes('pain') || lowerMessage.includes('epidural') || lowerMessage.includes('natural') || lowerMessage.includes('medication')) {
      category = 'pain';
      if (conversationPhase === 'introduction') {
        setConversationPhase('pain');
        setCurrentStep(2);
        phase = 'pain';
      }
    } else if (lowerMessage.includes('environment') || lowerMessage.includes('room') || lowerMessage.includes('atmosphere') || lowerMessage.includes('lighting')) {
      category = 'environment';
      if (conversationPhase === 'introduction') {
        setConversationPhase('labor');
        setCurrentStep(2);
        phase = 'labor';
      }
    } else if (lowerMessage.includes('position') || lowerMessage.includes('move') || lowerMessage.includes('walk') || lowerMessage.includes('birth ball')) {
      category = 'positions';
      if (conversationPhase === 'introduction') {
        setConversationPhase('labor');
        setCurrentStep(2);
        phase = 'labor';
      }
    }

    // Get responses for current phase and category
    const phaseResponses = responses[phase as keyof typeof responses];
    if (phaseResponses && phaseResponses[category as keyof typeof phaseResponses]) {
      const categoryResponses = phaseResponses[category as keyof typeof phaseResponses] as string[];
      return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
    }

    // Fallback responses based on phase
    const fallbacks = {
      introduction: "I'm here to help you think through whatever feels most important right now. What's on your heart?",
      labor: "That's a thoughtful consideration about your labor preferences. Tell me more about what matters most to you.",
      pain: "Pain management is such a personal journey. What feels right for your situation?",
      support: "Your support team can make all the difference. What kind of support helps you feel strongest?",
      scripts: "I'm working on some communication scripts based on what you've shared. What else would be helpful?",
      complete: "You've shared so much thoughtful information. Is there anything else you'd like to explore together?"
    };

    return fallbacks[conversationPhase] || "Tell me more about what's on your mind.";
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
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Simulate AI processing delay with typing indicator
    setTimeout(() => {
      const response = generateResponse(inputMessage);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Generate script preview if user has shared preferences
      if (Object.keys(userPreferences).length > 0 && conversationPhase !== 'introduction') {
        setTimeout(() => {
          const scriptPreview = generateScriptPreview(userPreferences, conversationPhase);
          if (scriptPreview) {
            const scriptMessage: ChatMessage = {
              id: (Date.now() + 2).toString(),
              role: 'assistant',
              content: "",
              timestamp: new Date(),
              type: 'script-preview',
              scriptPreview
            };
            setMessages(prev => [...prev, scriptMessage]);
          }
        }, 1500);
      }
      
      // Add contextual reality checks
      if (shouldAddRealityCheck(inputMessage, conversationPhase)) {
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
      
      setIsLoading(false);
    }, 1200);
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

  const quickReplies = [
    "Tell me about pain management options",
    "I want a natural birth experience",
    "What should I know about epidurals?",
    "How do I create a calm environment?",
    "I'm feeling anxious about labor",
    "This is my first baby"
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with Progress */}
      <div className="bg-card shadow-card border-b border-border">
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
                <h1 className="text-xl font-semibold text-foreground">Chat with Maya</h1>
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
          
          {/* Progress Bar */}
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
            <span className="text-sm text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto px-4 py-6">
          <div className="max-w-4xl mx-auto space-y-6">
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
                  <div className={`max-w-2xl ${message.role === 'user' ? 'ml-12' : 'mr-12'} animate-fade-in`}>
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
                <div className="max-w-2xl mr-12">
                  <div className="bg-card border border-border text-card-foreground p-4 rounded-lg shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
                      </div>
                      <span className="text-sm text-muted-foreground">Maya is thinking...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Quick Replies */}
      <div className="px-4 py-3 bg-muted/30">
        <div className="max-w-4xl mx-auto">
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

      {/* Message Input */}
      <div className="bg-card border-t border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-4xl mx-auto flex items-center gap-3">
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
                placeholder="Share your thoughts, questions, or concerns with Maya..."
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
  );
};