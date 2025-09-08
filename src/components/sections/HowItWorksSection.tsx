import { Button } from "@/components/ui/button";
import { MessageCircle, FileText } from "lucide-react";
import { SectionContainer } from "@/components/ui/section-container";
import { colors, typography } from "@/styles/design-tokens";

interface HowItWorksSectionProps {
  onStartChat: () => void;
  onStartForm: () => void;
}

export const HowItWorksSection = ({ onStartChat, onStartForm }: HowItWorksSectionProps) => {
  return (
    <SectionContainer backgroundColor={colors.faqBlack} condesa={true}>
      
      {/* Compact centered header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold leading-none text-white mb-4" style={{ 
          fontFamily: typography.heading.fontFamily
        }}>
          Two Ways To Build
        </h2>
        <p className="text-lg text-white/80 max-w-xl mx-auto">Choose your preferred approach</p>
      </div>

      {/* Side-by-side options */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        
        {/* Chat Approach */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MessageCircle className="w-5 h-5 text-white/80" />
            <h3 className="text-xl font-bold text-white">Chat Through It</h3>
          </div>
          <p className="text-white/80 text-sm leading-relaxed">
            Have a supportive conversation about your preferences
          </p>
          <Button 
            onClick={onStartChat}
            className="font-bold py-3 px-6 rounded-xl border-2 border-white/20 bg-transparent text-white hover:bg-white hover:text-black transition-all duration-300"
          >
            Start Chatting
          </Button>
        </div>

        {/* Form Approach */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileText className="w-5 h-5 text-white/80" />
            <h3 className="text-xl font-bold text-white">Fill Out Forms</h3>
          </div>
          <p className="text-white/80 text-sm leading-relaxed">
            Answer thoughtful questions at your own pace
          </p>
          <Button 
            onClick={onStartForm}
            className="font-bold py-3 px-6 rounded-xl border-2 border-white/20 bg-transparent text-white hover:bg-white hover:text-black transition-all duration-300"
          >
            Start Forms
          </Button>
        </div>
      </div>
    </SectionContainer>
  );
};