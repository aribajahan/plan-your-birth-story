import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="relative h-screen">
      {/* Red on Red Background Block */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ backgroundColor: 'hsl(var(--vibrant-coral))' }}
      >
        {/* Black on White CTA Block - Bottom Right */}
        <div 
          className="absolute bottom-0 right-0 w-1/3 h-1/3"
          style={{ backgroundColor: 'hsl(var(--cream-base))' }}
        >
          <div className="flex items-center justify-center h-full p-12">
            <Button 
              onClick={onGetStarted}
              className="text-xl font-bold px-12 py-6 font-helvetica hover:scale-105 transition-transform duration-300"
              style={{ 
                backgroundColor: 'hsl(var(--deep-black))', 
                color: 'hsl(var(--cream-base))'
              }}
            >
              Start Your Birth Plan
            </Button>
          </div>
        </div>
      </div>
      
      {/* Massive Wordmark - Center Left */}
      <div className="relative z-10 h-full flex items-center justify-start pl-16">
        <img 
          src={"/lovable-uploads/988162e5-578e-48d9-8560-2f769a1e16d3.png"}
          alt="Asha" 
          className="w-auto"
          style={{ 
            height: 'clamp(24rem, 70vh, 48rem)',
            maxWidth: '60vw',
          }}
        />
      </div>
    </section>
  );
};