import { Heart } from "lucide-react";

export const FooterSection = () => {
  return (
    <footer className="py-12" style={{ backgroundColor: 'hsl(var(--cream-base))', borderTop: '1px solid hsl(var(--border))' }}>
      <div className="container mx-auto px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Brand & Tagline */}
            <div className="lg:col-span-1 space-y-4">
              <div className="flex items-center gap-3">
                <img 
                  src="/lovable-uploads/889e82d7-b67f-4854-8b53-a04f49ab944c.png" 
                  alt="Asha" 
                  className="h-8 w-auto"
                />
                <span className="text-2xl font-bold" style={{ color: 'hsl(var(--deep-black))' }}>Asha</span>
              </div>
              <p className="text-sm" style={{ color: 'hsl(var(--deep-black))' }}>
                Birth planning made simple
              </p>
            </div>

            {/* Links */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm" style={{ color: 'hsl(var(--deep-black))' }}>Links</h4>
              <div className="space-y-2">
                <a href="/resources" className="block text-sm transition-colors hover:opacity-80" style={{ color: 'hsl(var(--deep-black))' }}>Resources</a>
                <a href="#" className="block text-sm transition-colors hover:opacity-80" style={{ color: 'hsl(var(--deep-black))' }}>Contact</a>
                <a href="#" className="block text-sm transition-colors hover:opacity-80" style={{ color: 'hsl(var(--deep-black))' }}>Help</a>
              </div>
            </div>

            {/* Information */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm" style={{ color: 'hsl(var(--deep-black))' }}>Information</h4>
              <div className="space-y-2">
                <a href="#" className="block text-sm transition-colors hover:opacity-80" style={{ color: 'hsl(var(--deep-black))' }}>About</a>
                <a href="#" className="block text-sm transition-colors hover:opacity-80" style={{ color: 'hsl(var(--deep-black))' }}>Privacy Policy</a>
                <a href="#" className="block text-sm transition-colors hover:opacity-80" style={{ color: 'hsl(var(--deep-black))' }}>Terms of Service</a>
              </div>
            </div>

            {/* Connect */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm" style={{ color: 'hsl(var(--deep-black))' }}>Connect</h4>
              <div className="space-y-2">
                <a href="mailto:hello@asha.com" className="block text-sm transition-colors hover:opacity-80" style={{ color: 'hsl(var(--deep-black))' }}>
                  Email: hello@asha.com
                </a>
                <a href="mailto:support@asha.com" className="block text-sm transition-colors hover:opacity-80" style={{ color: 'hsl(var(--deep-black))' }}>
                  Support: support@asha.com
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-6 text-center" style={{ borderTop: '1px solid hsl(var(--border))' }}>
            <p className="text-xs" style={{ color: 'hsl(var(--deep-black))' }}>
              © 2025 Asha. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};