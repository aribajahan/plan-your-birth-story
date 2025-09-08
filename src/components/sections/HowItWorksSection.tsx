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
      <div className="text-center mb-12">
        <h2 className="text-7xl font-bold leading-none text-white mb-4" style={{ 
          fontFamily: typography.heading.fontFamily
        }}>
          Two Ways To Build
        </h2>
        <p className="text-xl text-white/80 font-medium">Choose the approach that feels right for you. Both paths lead to the same place: feeling prepared and confident.</p>
      </div>

      {/* Two clean cards side by side */}
      <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        
        {/* Chat Approach - Enhanced with subtle shadow */}
        <div className="bg-white/95 backdrop-blur-sm p-8 lg:p-12 rounded-2xl hover:bg-white transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl shadow-lg relative">
          {/* Most Popular Badge */}
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <span className="bg-white text-sm font-bold px-4 py-2 rounded-full shadow-lg" style={{ color: colors.vibrantCoral }}>
              Most Popular
            </span>
          </div>
          <div className="text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: colors.vibrantCoral }}>
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold" style={{ color: colors.deepBlack }}>Chat Through It</h3>
            <p className="text-lg leading-relaxed" style={{ color: colors.deepBlack }}>
              Have a supportive conversation that feels like talking to a friend who's been through it. We'll explore your hopes, concerns, and preferences together.
            </p>
            <Button 
              onClick={onStartChat}
              className="w-full text-lg font-bold py-4 rounded-xl transition-all duration-300 hover:scale-105"
              style={{ 
                backgroundColor: colors.vibrantCoral,
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
            <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: colors.vibrantCoral }}>
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold" style={{ color: colors.deepBlack }}>Fill Out Forms</h3>
            <p className="text-lg leading-relaxed" style={{ color: colors.deepBlack }}>
              Answer thoughtful questions at your own pace. Perfect if you prefer to organize your thoughts in a more structured way.
            </p>
            <Button 
              onClick={onStartForm}
              className="w-full text-lg font-bold py-4 rounded-xl transition-all duration-300 hover:scale-105"
              style={{ 
                backgroundColor: colors.vibrantCoral,
                color: 'white'
              }}
            >
              Start Forms
            </Button>
          </div>
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