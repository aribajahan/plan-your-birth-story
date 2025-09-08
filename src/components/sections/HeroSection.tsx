import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/ui/section-container";
import { colors } from "@/styles/design-tokens";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <SectionContainer backgroundColor={colors.creamBase} condesa={true}>
      
      {/* Single Column Centered Layout */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        
        {/* Wordmark */}
        <div className="mb-12">
          <img 
            src="/lovable-uploads/1e3f2e06-e530-44e3-8793-e1150e066a77.png"
            alt="Asha - AI Birth Plan Assistant" 
            className="w-auto max-h-64 lg:max-h-80 xl:max-h-96 object-contain mx-auto"
          />
        </div>
        
        {/* New Headline */}
        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-helvetica font-light mb-16 leading-tight max-w-5xl tracking-wide" style={{ color: 'hsl(var(--vibrant-coral))' }}>
          You've already mastered pregnancy.<br />
          <span className="font-medium">Now let's prepare you for birth with confidence.</span>
        </h1>
        
        {/* CTA Button */}
          <Button 
            onClick={onGetStarted}
            className="text-lg lg:text-xl font-helvetica font-bold px-12 lg:px-16 py-6 lg:py-8 rounded-none hover:scale-105 transition-all duration-300"
            style={{
              backgroundColor: 'hsl(var(--deep-black))',
              color: 'hsl(var(--cream-base))'
            }}
          >
          Get Started
        </Button>
        
      </div>
    </SectionContainer>
  );
};