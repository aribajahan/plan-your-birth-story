import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Full Red Background */}
      <div className="absolute inset-0 w-full h-full bg-vibrant-coral" />
      
      {/* Editorial Layout Grid */}
      <div className="relative z-10 h-full grid lg:grid-cols-2">
        
        {/* Left Side: Typography + Wordmark */}
        <div className="flex flex-col justify-center items-start px-8 lg:px-16 py-20">
          {/* Massive Editorial Headline */}
          <h1 className="text-6xl lg:text-8xl xl:text-9xl font-helvetica font-bold leading-none mb-8 text-cream-base tracking-tight">
            Birth Plans
            <br />
            That Work
          </h1>
          
          {/* Wordmark */}
          <div className="mb-12">
            <img 
              src="/lovable-uploads/1e3f2e06-e530-44e3-8793-e1150e066a77.png"
              alt="Asha - AI Birth Plan Assistant" 
              className="w-auto h-20 lg:h-24 xl:h-32"
            />
          </div>
          
          {/* Subheading */}
          <p className="text-xl lg:text-2xl font-helvetica font-medium max-w-lg text-cream-base leading-relaxed">
            Professional, personalized birth plans created through AI-guided conversations
          </p>
        </div>
        
        {/* Right Side: Clean CTA Block */}
        <div className="flex items-end justify-end">
          <div className="w-full h-2/3 flex items-center justify-center p-8 lg:p-16 bg-cream-base">
            <div className="text-center">
              <h2 className="text-3xl lg:text-4xl font-helvetica font-bold mb-8 text-deep-black leading-tight">
                Start Your
                <br />
                Birth Plan
              </h2>
              
              <Button 
                onClick={onGetStarted}
                className="text-lg lg:text-xl font-helvetica font-bold px-12 lg:px-16 py-6 lg:py-8 rounded-none bg-deep-black text-cream-base hover:scale-105 transition-all duration-300"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};