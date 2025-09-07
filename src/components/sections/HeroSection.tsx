import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Full Red Background */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ backgroundColor: 'hsl(var(--vibrant-coral))' }}
      />
      
      {/* Editorial Layout Grid */}
      <div className="relative z-10 h-full grid lg:grid-cols-2">
        
        {/* Left Side: Typography + Wordmark */}
        <div className="flex flex-col justify-center items-start px-16 py-20">
          {/* Massive Editorial Headline */}
          <h1 
            className="text-8xl lg:text-9xl font-bold leading-none mb-8"
            style={{ 
              fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
              color: 'hsl(var(--cream-base))',
              letterSpacing: '-0.02em'
            }}
          >
            Birth Plans
            <br />
            That Work
          </h1>
          
          {/* Wordmark */}
          <div className="mb-12">
            <img 
              src="/lovable-uploads/1e3f2e06-e530-44e3-8793-e1150e066a77.png"
              alt="Asha - AI Birth Plan Assistant" 
              className="w-auto h-24 lg:h-32"
            />
          </div>
          
          {/* Subheading */}
          <p 
            className="text-2xl font-medium max-w-lg"
            style={{ 
              fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
              color: 'hsl(var(--cream-base))',
              lineHeight: '1.3'
            }}
          >
            Professional, personalized birth plans created through AI-guided conversations
          </p>
        </div>
        
        {/* Right Side: Clean CTA Block */}
        <div className="flex items-end justify-end">
          <div 
            className="w-full h-2/3 flex items-center justify-center p-16"
            style={{ backgroundColor: 'hsl(var(--cream-base))' }}
          >
            <div className="text-center">
              <h2 
                className="text-4xl font-bold mb-8"
                style={{ 
                  fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                  color: 'hsl(var(--deep-black))',
                  lineHeight: '1.1'
                }}
              >
                Start Your
                <br />
                Birth Plan
              </h2>
              
              <Button 
                onClick={onGetStarted}
                className="text-xl font-bold px-16 py-8 rounded-none transition-all duration-300 hover:scale-105"
                style={{ 
                  backgroundColor: 'hsl(var(--deep-black))', 
                  color: 'hsl(var(--cream-base))',
                  fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'
                }}
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