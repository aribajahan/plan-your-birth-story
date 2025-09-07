import { Heart } from "lucide-react";

export const FooterSection = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            
            {/* Brand & Mission */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-display font-bold">Your Birth, Your Way</span>
              </div>
              <p className="text-muted-foreground text-sm max-w-sm">
                Empowering families to create thoughtful, professional birth plans 
                with confidence and clarity.
              </p>
            </div>

            {/* Resources Links */}
            <div className="space-y-3">
              <h4 className="font-display font-semibold text-sm">Resources</h4>
              <div className="space-y-2">
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">About Us</a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">Privacy Policy</a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">Contact</a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">Resources</a>
              </div>
            </div>

            {/* Professionals Links */}
            <div className="space-y-3">
              <h4 className="font-display font-semibold text-sm">Professionals</h4>
              <div className="space-y-2">
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">For Healthcare Providers</a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">For Doulas</a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">Birthing Centers</a>
              </div>
            </div>

            {/* Social Proof */}
            <div className="space-y-3">
              <h4 className="font-display font-semibold text-sm">Trusted By</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-1 h-1 rounded-full bg-primary"></div>
                  <span>Doulas nationwide</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-1 h-1 rounded-full bg-primary"></div>
                  <span>Featured in publications</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-1 h-1 rounded-full bg-primary"></div>
                  <span>Birthing centers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-border mt-8 pt-6 text-center">
            <p className="text-muted-foreground text-xs">
              © 2024 Your Birth, Your Way. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};