import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="relative h-screen overflow-hidden bg-cream-base">
      
      {/* Single Column Centered Layout */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-8 lg:px-16 py-20 text-center">
        
        {/* Wordmark */}
        <div className="mb-12">
          <img 
            src="/lovable-uploads/1e3f2e06-e530-44e3-8793-e1150e066a77.png"
            alt="Asha - AI Birth Plan Assistant" 
            className="w-auto max-h-48 lg:max-h-64 xl:max-h-80 object-contain mx-auto"
          />
        </div>
        
        {/* New Headline */}
        <h1 className="text-2xl lg:text-3xl xl:text-4xl font-helvetica font-medium mb-12 text-vibrant-coral leading-relaxed max-w-4xl">
          You've already mastered pregnancy. Now let's prepare you for birth with confidence.
        </h1>
        
        {/* CTA Button */}
        <Button 
          onClick={onGetStarted}
          className="text-lg lg:text-xl font-helvetica font-bold px-12 lg:px-16 py-6 lg:py-8 rounded-none bg-deep-black text-cream-base hover:scale-105 transition-all duration-300"
        >
          Get Started
        </Button>
        
      </div>
    </section>
  );
};