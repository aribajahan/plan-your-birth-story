import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onGetStarted: () => void;
}

export const Header = ({ onGetStarted }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-cream-base/95 backdrop-blur-sm shadow-card' 
          : 'bg-cream-base'
      }`}
      style={{ backgroundColor: 'hsl(var(--cream-base))' }}
    >
      <div className="container mx-auto px-8">
        <div className="flex items-center justify-between py-6">
          
          {/* Logo Area - Flexible container for future image upload */}
          <div className="flex items-center gap-3 group cursor-pointer hover:scale-105 transition-transform duration-300">
            {/* Logo container - easily replaceable with image */}
            <div className="logo-container">
              <img 
                src="/lovable-uploads/adba3b7b-b015-4501-a4db-edc56e44d7f3.png" 
                alt="Asha - Birth Plans Built with Hope" 
                className="h-12 w-auto"
              />
            </div>
            
            {/* Tagline */}
            <div className="hidden sm:block ml-2">
              <p 
                className="text-xs font-medium tracking-widest uppercase"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.8rem',
                  color: 'hsl(var(--deep-black))',
                  letterSpacing: '0.1em'
                }}
              >
                Birth Plans Built with Hope
              </p>
            </div>
          </div>

          {/* Get Started Button */}
          <Button
            onClick={onGetStarted}
            className="rounded-full px-8 py-3 font-bold transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: 'hsl(var(--bold-yellow))',
              color: 'hsl(var(--deep-black))',
              fontWeight: '700'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'hsl(var(--vibrant-coral))';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'hsl(var(--bold-yellow))';
              e.currentTarget.style.color = 'hsl(var(--deep-black))';
            }}
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};