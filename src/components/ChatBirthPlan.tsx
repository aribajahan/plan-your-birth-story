import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Mic, MicOff, FileText, Volume2 } from "lucide-react";
import { BirthPlanData } from "./BirthPlanWizard";
import { RealityCheck } from "./RealityCheck";
import { useConversation } from "@11labs/react";

interface ChatBirthPlanProps {
  onBack: () => void;
  onSwitchToForm: () => void;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'text' | 'reality-check' | 'summary';
  realityCheck?: {
    title: string;
    content: string;
  };
}

export const ChatBirthPlan = ({ onBack, onSwitchToForm }: ChatBirthPlanProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi there! I'm here to help you create a thoughtful birth plan. Think of me as a supportive friend who's been through this journey before. We'll talk through your hopes, concerns, and preferences at your own pace. What would you like to start with - how you envision your ideal birth environment, pain management thoughts, or maybe you have some specific questions?",
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
  const [conversationPhase, setConversationPhase] = useState<'labor' | 'pain' | 'support' | 'complete'>('labor');
  const [isListening, setIsListening] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const conversation = useConversation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string) => {
    // Simulate AI conversation logic based on the current phase
    const responses = {
      labor: {
        environment: [
          "That sounds like a lovely vision. Many women find that thinking about lighting, music, and who they want present helps create that atmosphere. What feels most important to you - having familiar people around, or having the space to move freely?",
          "It's wonderful that you're thinking about the environment. Some women want a quiet, dimly lit space, while others prefer more activity. What helps you feel most calm and safe?"
        ],
        positions: [
          "Movement and positioning can be so helpful during labor. Some women love being upright and walking, others prefer being able to change positions frequently. Have you thought about what feels natural to your body?",
          "Great question about positions! Many women find that being able to move freely - whether that's walking, using a birthing ball, or changing positions in bed - helps them cope. What sounds appealing to you?"
        ]
      },
      pain: {
        natural: [
          "I hear you wanting to try natural methods first. That's completely valid. Many women find breathing techniques, water therapy, or massage helpful. At the same time, it's wise to think about what you'd want if labor is more intense than expected. How do you feel about having options available?",
          "Natural pain management can be really effective. Some women love water birth or movement, others find guided breathing or massage most helpful. It might be worth thinking about your 'backup plan' - what would you want to try if your first choice isn't enough?"
        ],
        medical: [
          "Epidurals can be a wonderful tool when you need them. It's smart to think through the timing - some women want it early, others prefer to labor naturally as long as possible. What feels right for you?",
          "Medical pain relief is there when you need it. Many women appreciate having a plan but also flexibility. Have you thought about what would help you feel confident in making decisions in the moment?"
        ]
      }
    };

    // Extract key themes and generate appropriate responses
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('pain') || lowerMessage.includes('epidural') || lowerMessage.includes('natural')) {
      setConversationPhase('pain');
      return responses.pain.natural[Math.floor(Math.random() * responses.pain.natural.length)];
    } else if (lowerMessage.includes('environment') || lowerMessage.includes('room') || lowerMessage.includes('atmosphere')) {
      return responses.labor.environment[Math.floor(Math.random() * responses.labor.environment.length)];
    } else if (lowerMessage.includes('position') || lowerMessage.includes('move') || lowerMessage.includes('walk')) {
      return responses.labor.positions[Math.floor(Math.random() * responses.labor.positions.length)];
    } else {
      return "I can hear how important this is to you. Tell me more about what you're feeling - there's no wrong answer here.";
    }
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

    // Simulate AI processing delay
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
      
      // Occasionally add reality checks
      if (Math.random() > 0.7) {
        setTimeout(() => {
          const realityCheckMessage: ChatMessage = {
            id: (Date.now() + 2).toString(),
            role: 'assistant',
            content: "",
            timestamp: new Date(),
            type: 'reality-check',
            realityCheck: {
              title: "Gentle Reality Check",
              content: "Remember, birth plans are wonderful guides, but births can be unpredictable. The most important thing is you and your baby's safety and health."
            }
          };
          setMessages(prev => [...prev, realityCheckMessage]);
        }, 2000);
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const toggleVoiceInput = async () => {
    if (!isListening) {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setIsListening(true);
        // Voice input functionality would be implemented here
        // For now, just simulate the state
        setTimeout(() => setIsListening(false), 3000);
      } catch (error) {
        console.error("Microphone access denied:", error);
      }
    } else {
      setIsListening(false);
    }
  };

  const quickReplies = [
    "Tell me about pain management options",
    "I want a natural birth",
    "What should I know about epidurals?",
    "How do I create a calm environment?",
    "I'm feeling overwhelmed"
  ];

  return (
    <div className="min-h-screen gradient-calm flex flex-col">
      {/* Header */}
      <div className="bg-card shadow-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
            
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold text-foreground">Birth Plan Chat</h1>
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
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto px-4 py-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.type === 'reality-check' && message.realityCheck ? (
                  <div className="w-full max-w-2xl">
                    <RealityCheck 
                      title={message.realityCheck.title}
                      content={message.realityCheck.content}
                    />
                  </div>
                ) : (
                  <div className={`max-w-2xl ${message.role === 'user' ? 'ml-12' : 'mr-12'}`}>
                    <div className={`p-4 rounded-lg ${
                      message.role === 'user' 
                        ? 'gradient-primary text-white' 
                        : 'bg-card border border-border text-card-foreground'
                    }`}>
                      <p className="leading-relaxed">{message.content}</p>
                      <div className={`text-xs mt-2 ${message.role === 'user' ? 'text-white/70' : 'text-muted-foreground'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-2xl mr-12">
                  <div className="bg-card border border-border text-card-foreground p-4 rounded-lg">
                    <div className="flex items-center gap-2">
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
      </div>

      {/* Quick Replies */}
      <div className="px-4 py-2">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {quickReplies.map((reply, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setInputMessage(reply)}
                className="whitespace-nowrap text-xs"
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
              className={`${isListening ? 'bg-primary text-primary-foreground' : ''}`}
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
                className="border-border"
              />
            </div>
            
            <Button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="gradient-primary text-white shadow-gentle hover:shadow-warm transition-gentle"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};