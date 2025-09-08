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
          
          {/* Navigation Links */}
          <nav className="flex items-center gap-8">
            <a 
              href="/" 
              className="font-medium hover:text-vibrant-coral transition-colors duration-300"
              style={{ color: 'hsl(var(--deep-black))' }}
            >
              Asha
            </a>
            <a 
              href="/resources" 
              className="font-medium hover:text-vibrant-coral transition-colors duration-300"
              style={{ color: 'hsl(var(--deep-black))' }}
            >
              Resources
            </a>
            <a 
              href="/how-it-works" 
              className="font-medium hover:text-vibrant-coral transition-colors duration-300"
              style={{ color: 'hsl(var(--deep-black))' }}
            >
              How It Works
            </a>
          </nav>

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