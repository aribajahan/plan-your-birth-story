import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="relative h-screen flex items-center justify-center" style={{ backgroundColor: 'hsl(var(--vibrant-coral))' }}>
      {/* Geometric shapes background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-80 h-80 rounded-full" style={{ backgroundColor: 'hsl(var(--bold-yellow))' }}></div>
        <div className="absolute bottom-32 left-16 w-64 h-32" style={{ backgroundColor: 'hsl(var(--electric-blue))' }}></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 rotate-45" style={{ backgroundColor: 'hsl(var(--cream-base))' }}></div>
      </div>
      
      {/* Wordmark - MASSIVE and dominant */}
      <div className="relative z-10 text-center">
        <img 
          src="/lovable-uploads/e9051f6b-475a-4a97-b5e4-b82330515a2e.png"
          alt="Asha - Birth Plans Built with Hope" 
          className="w-auto mx-auto mb-12"
          style={{ 
            height: 'clamp(20rem, 60vh, 40rem)',
            maxWidth: '90vw',
            filter: 'drop-shadow(0 8px 40px rgba(0, 0, 0, 0.3))',
          }}
        />
        
        {/* Minimal, bold call-to-action in contrasting color block */}
        <div className="inline-block p-8 rounded-3xl" style={{ backgroundColor: 'hsl(var(--cream-base))' }}>
          <Button 
            onClick={onGetStarted}
            className="text-2xl font-bold px-16 py-6 rounded-full hover:scale-105 transition-transform duration-300"
            style={{ 
              backgroundColor: 'hsl(var(--deep-black))', 
              color: 'hsl(var(--cream-base))'
            }}
          >
            Start Your Birth Plan
          </Button>
        </div>
      </div>
    </section>
  );
};