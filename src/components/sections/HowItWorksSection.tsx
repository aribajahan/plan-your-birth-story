import { Button } from "@/components/ui/button";
import { MessageCircle, FileText } from "lucide-react";

interface HowItWorksSectionProps {
  onStartChat: () => void;
  onStartForm: () => void;
}

export const HowItWorksSection = ({ onStartChat, onStartForm }: HowItWorksSectionProps) => {
  return (
    <section className="py-16 lg:py-24 bg-cream-base">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Rounded Blue Container - Modern Clean Design with better shadow */}
        <div className="rounded-3xl p-8 lg:p-16 shadow-2xl" style={{ backgroundColor: 'hsl(var(--rich-blue))' }}>
          
          {/* Clean centered layout */}
          <div className="text-center mb-12">
            <h2 className="text-7xl font-bold leading-none text-white mb-4" style={{ 
              fontFamily: 'Crimson Text, serif'
            }}>
              Two Ways
            </h2>
            <p className="text-xl text-white/80 font-medium">Choose the approach that feels right for you</p>
          </div>

          {/* Two clean cards side by side */}
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Chat Approach - Enhanced with subtle shadow */}
            <div className="bg-white/95 backdrop-blur-sm p-8 lg:p-12 rounded-2xl hover:bg-white transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl shadow-lg">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: 'hsl(var(--vibrant-coral))' }}>
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold" style={{ color: 'hsl(var(--deep-black))' }}>Chat Through It</h3>
                <p className="text-lg leading-relaxed" style={{ color: 'hsl(var(--deep-black))' }}>
                  Natural conversation that feels like talking to a supportive friend who knows birth plans inside out.
                </p>
                <Button 
                  onClick={onStartChat}
                  className="w-full text-lg font-bold py-4 rounded-xl transition-all duration-300 hover:scale-105"
                  style={{ 
                    backgroundColor: 'hsl(var(--vibrant-coral))',
                    color: 'white'
                  }}
                >
                  Start Chatting
                </Button>
              </div>
            </div>

            {/* Form Approach - Enhanced with subtle shadow */}
            <div className="bg-white/95 backdrop-blur-sm p-8 lg:p-12 rounded-2xl hover:bg-white transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl shadow-lg">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: 'hsl(var(--rich-blue))' }}>
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold" style={{ color: 'hsl(var(--deep-black))' }}>Fill Out Forms</h3>
                <p className="text-lg leading-relaxed" style={{ color: 'hsl(var(--deep-black))' }}>
                  Structured sections at your own pace with clear progress tracking and thoughtful prompts.
                </p>
                <Button 
                  onClick={onStartForm}
                  className="w-full text-lg font-bold py-4 rounded-xl transition-all duration-300 hover:scale-105"
                  style={{ 
                    backgroundColor: 'hsl(var(--rich-blue))',
                    color: 'white'
                  }}
                >
                  Start Forms
                </Button>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};