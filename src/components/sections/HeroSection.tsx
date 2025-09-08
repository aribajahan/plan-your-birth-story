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
        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-helvetica font-light mb-8 leading-tight max-w-5xl tracking-wide" style={{ color: 'hsl(var(--vibrant-coral))' }}>
          You've Got Pregnancy Down. <span className="font-medium">Now Birth.</span>
        </h1>
        
        {/* Subtext */}
        <p className="text-lg lg:text-xl font-helvetica font-light mb-12 leading-relaxed max-w-4xl mx-auto" style={{ color: 'hsl(var(--deep-black))' }}>
          You're already doing the very best. Let's just add one more layer of preparation with a birth plan that you actually understand and feel good about, that prepares you for the real thing.
        </p>
        
        {/* CTA Button */}
        <Button 
          onClick={onGetStarted}
          className="text-lg lg:text-xl font-helvetica font-bold px-12 lg:px-16 py-6 lg:py-8 rounded-none hover:scale-105 transition-all duration-300 mb-8"
          style={{
            backgroundColor: 'hsl(var(--deep-black))',
            color: 'hsl(var(--cream-base))'
          }}
        >
          Let's Make a Birth Plan
        </Button>
        
        {/* Trust Line */}
        <p className="text-sm lg:text-base font-helvetica font-medium" style={{ color: 'hsl(var(--deep-black))', opacity: 0.7 }}>
          Building confidence for families everywhere
        </p>
        
      </div>
    </SectionContainer>
  );
};