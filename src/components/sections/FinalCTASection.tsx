import { Button } from "@/components/ui/button";

interface FinalCTASectionProps {
  onGetStarted: () => void;
}

export const FinalCTASection = ({ onGetStarted }: FinalCTASectionProps) => {
  return (
    <section className="py-8 lg:py-12 bg-cream-base">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Rounded Coral Container with editorial shadow */}
        <div className="rounded-3xl p-16 lg:p-32 text-center shadow-2xl" style={{ backgroundColor: 'hsl(var(--vibrant-coral))' }}>
          
          {/* Bold asymmetrical CTA with enhanced typography */}
          <h2 className="text-7xl lg:text-8xl font-bold leading-none text-white mb-16" style={{ 
            fontFamily: 'Crimson Text, serif'
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