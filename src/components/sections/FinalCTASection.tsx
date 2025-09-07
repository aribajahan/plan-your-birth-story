import { Button } from "@/components/ui/button";

interface FinalCTASectionProps {
  onGetStarted: () => void;
}

export const FinalCTASection = ({ onGetStarted }: FinalCTASectionProps) => {
  return (
    <section className="min-h-screen flex items-center" style={{ backgroundColor: 'hsl(var(--vibrant-coral))' }}>
      <div className="w-full">
        <div className="max-w-7xl mx-auto p-16 text-center">
          
          {/* Bold asymmetrical CTA */}
          <h2 className="section-headline leading-none text-white mb-16" style={{ 
            fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'
          }}>
            Ready?
          </h2>
          
          <div className="flex flex-col lg:flex-row gap-8 justify-center items-center">
            <Button 
              onClick={onGetStarted}
              className="text-3xl font-bold px-16 py-8 rounded-full hover:scale-105 transition-transform duration-300 font-helvetica"
              style={{ 
                backgroundColor: 'hsl(var(--cream-base))',
                color: 'hsl(var(--deep-black))'
              }}
            >
              Start Your Birth Plan
            </Button>
            
            <div className="text-2xl text-white font-bold font-helvetica">
              It's Free
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};