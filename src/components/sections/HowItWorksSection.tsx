import { Button } from "@/components/ui/button";
import { MessageCircle, FileText } from "lucide-react";

interface HowItWorksSectionProps {
  onStartChat: () => void;
  onStartForm: () => void;
}

export const HowItWorksSection = ({ onStartChat, onStartForm }: HowItWorksSectionProps) => {
  return (
    <section className="min-h-screen flex items-center" style={{ backgroundColor: 'hsl(var(--rich-blue))' }}>
      <div className="w-full">
        <div className="max-w-7xl mx-auto p-16">
          
          {/* Bold asymmetrical layout */}
          <div className="grid lg:grid-cols-3 gap-16 items-start">
            
            {/* Large title taking up left column */}
            <div className="lg:col-span-1">
              <h2 className="text-7xl font-bold leading-none text-white" style={{ 
                fontFamily: 'Crimson Text, serif'
              }}>
                Two Ways
              </h2>
            </div>

            {/* Two approaches side by side */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Chat Approach */}
              <div className="p-12 rounded-3xl" style={{ backgroundColor: 'hsl(var(--cream-base))' }}>
                <div className="flex items-start gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: 'hsl(var(--vibrant-coral))' }}>
                      <MessageCircle className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-4xl font-bold" style={{ color: 'hsl(var(--deep-black))' }}>Chat Through It</h3>
                    <p className="text-xl" style={{ color: 'hsl(var(--deep-black))' }}>
                      Natural conversation that feels like talking to a supportive friend.
                    </p>
                    <Button 
                      onClick={onStartChat}
                      className="text-xl font-bold px-8 py-4 rounded-full"
                      style={{ 
                        backgroundColor: 'hsl(var(--vibrant-coral))',
                        color: 'white'
                      }}
                    >
                      Start Chatting
                    </Button>
                  </div>
                </div>
              </div>

              {/* Form Approach */}
              <div className="p-12 rounded-3xl" style={{ backgroundColor: 'hsl(var(--bold-yellow))' }}>
                <div className="flex items-start gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: 'hsl(var(--deep-black))' }}>
                      <FileText className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-4xl font-bold" style={{ color: 'hsl(var(--deep-black))' }}>Fill Out Forms</h3>
                    <p className="text-xl" style={{ color: 'hsl(var(--deep-black))' }}>
                      Structured sections at your own pace with clear progress tracking.
                    </p>
                    <Button 
                      onClick={onStartForm}
                      className="text-xl font-bold px-8 py-4 rounded-full"
                      style={{ 
                        backgroundColor: 'hsl(var(--deep-black))',
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
        </div>
      </div>
    </section>
  );
};