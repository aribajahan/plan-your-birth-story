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
      
      {/* Clean centered layout */}
      <div className="text-center mb-16">
        <h2 className="text-6xl font-bold leading-none text-white mb-6" style={{ 
          fontFamily: typography.heading.fontFamily
        }}>
          Two Ways To Build
        </h2>
        <p className="text-xl text-white/80 font-medium max-w-2xl mx-auto">Choose the approach that feels right for you. Both paths lead to the same place: feeling prepared and confident.</p>
      </div>

      {/* Stacked minimalist options */}
      <div className="max-w-2xl mx-auto space-y-16">
        
        {/* Chat Approach */}
        <div className="text-center space-y-6 group">
          <div className="flex items-center justify-center gap-4 mb-6">
            <MessageCircle className="w-6 h-6 text-white/80" />
            <h3 className="text-3xl font-bold text-white">Chat Through It</h3>
          </div>
          <p className="text-lg text-white/80 leading-relaxed max-w-lg mx-auto">
            Have a supportive conversation that feels like talking to a friend who's been through it. We'll explore your hopes, concerns, and preferences together.
          </p>
          <Button 
            onClick={onStartChat}
            className="text-lg font-bold py-4 px-8 rounded-xl border-2 border-white/20 bg-transparent text-white hover:bg-white hover:text-black transition-all duration-300"
          >
            Start Chatting
          </Button>
        </div>

        {/* Subtle divider */}
        <div className="flex items-center justify-center">
          <div className="w-px h-16 bg-white/20"></div>
        </div>

        {/* Form Approach */}
        <div className="text-center space-y-6 group">
          <div className="flex items-center justify-center gap-4 mb-6">
            <FileText className="w-6 h-6 text-white/80" />
            <h3 className="text-3xl font-bold text-white">Fill Out Forms</h3>
          </div>
          <p className="text-lg text-white/80 leading-relaxed max-w-lg mx-auto">
            Answer thoughtful questions at your own pace. Perfect if you prefer to organize your thoughts in a more structured way.
          </p>
          <Button 
            onClick={onStartForm}
            className="text-lg font-bold py-4 px-8 rounded-xl border-2 border-white/20 bg-transparent text-white hover:bg-white hover:text-black transition-all duration-300"
          >
            Start Forms
          </Button>
        </div>
      </div>
      
      {/* Bottom Text */}
      <div className="text-center mt-12">
        <p className="text-lg text-white/80 font-medium">
          Both paths create the same comprehensive birth plan. Choose what feels right for you.
        </p>
      </div>
    </SectionContainer>
  );
};