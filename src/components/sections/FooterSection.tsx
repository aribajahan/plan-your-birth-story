import { Heart } from "lucide-react";

export const FooterSection = () => {
  return (
    <footer className="py-12" style={{ backgroundColor: 'hsl(var(--cream-base))', borderTop: '1px solid hsl(var(--border))' }}>
      <div className="container mx-auto px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            
            {/* Brand & Mission */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'hsl(var(--vibrant-coral))' }}>
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold" style={{ color: 'hsl(var(--deep-black))' }}>Your Birth, Your Way</span>
              </div>
              <p className="text-sm max-w-sm" style={{ color: 'hsl(var(--deep-black))' }}>
                Empowering families to create thoughtful, professional birth plans 
                with confidence and clarity.
              </p>
            </div>

            {/* Resources Links */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm" style={{ color: 'hsl(var(--deep-black))' }}>Resources</h4>
              <div className="space-y-2">
                <a href="#" className="block text-sm transition-colors hover:opacity-80" style={{ color: 'hsl(var(--deep-black))' }}>About Us</a>
                <a href="#" className="block text-sm transition-colors hover:opacity-80" style={{ color: 'hsl(var(--deep-black))' }}>Privacy Policy</a>
                <a href="#" className="block text-sm transition-colors hover:opacity-80" style={{ color: 'hsl(var(--deep-black))' }}>Contact</a>
                <a href="#" className="block text-sm transition-colors hover:opacity-80" style={{ color: 'hsl(var(--deep-black))' }}>Resources</a>
              </div>
            </div>

            {/* Professionals Links */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm" style={{ color: 'hsl(var(--deep-black))' }}>Professionals</h4>
              <div className="space-y-2">
                <a href="#" className="block text-sm transition-colors hover:opacity-80" style={{ color: 'hsl(var(--deep-black))' }}>For Healthcare Providers</a>
                <a href="#" className="block text-sm transition-colors hover:opacity-80" style={{ color: 'hsl(var(--deep-black))' }}>For Doulas</a>
                <a href="#" className="block text-sm transition-colors hover:opacity-80" style={{ color: 'hsl(var(--deep-black))' }}>Birthing Centers</a>
              </div>
            </div>

            {/* Social Proof */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm" style={{ color: 'hsl(var(--deep-black))' }}>Trusted By</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs" style={{ color: 'hsl(var(--deep-black))' }}>
                  <div className="w-1 h-1 rounded-full" style={{ backgroundColor: 'hsl(var(--vibrant-coral))' }}></div>
                  <span>Doulas nationwide</span>
                </div>
                <div className="flex items-center gap-2 text-xs" style={{ color: 'hsl(var(--deep-black))' }}>
                  <div className="w-1 h-1 rounded-full" style={{ backgroundColor: 'hsl(var(--vibrant-coral))' }}></div>
                  <span>Featured in publications</span>
                </div>
                <div className="flex items-center gap-2 text-xs" style={{ color: 'hsl(var(--deep-black))' }}>
                  <div className="w-1 h-1 rounded-full" style={{ backgroundColor: 'hsl(var(--vibrant-coral))' }}></div>
                  <span>Birthing centers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-6 text-center" style={{ borderTop: '1px solid hsl(var(--border))' }}>
            <p className="text-xs" style={{ color: 'hsl(var(--deep-black))' }}>
              © 2024 Your Birth, Your Way. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};