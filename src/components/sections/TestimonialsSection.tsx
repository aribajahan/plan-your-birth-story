import { Quote } from "lucide-react";

export const TestimonialsSection = () => {
  return (
    <section className="min-h-screen flex items-center bg-cream-base">
      <div className="w-full px-4 lg:px-8">
        
        {/* Rounded Green Container */}
        <div className="rounded-3xl p-8 lg:p-16" style={{ backgroundColor: 'hsl(var(--forest-green))' }}>
          
          {/* Asymmetrical testimonials layout */}
          <div className="space-y-16">
            
            {/* Bold title */}
            <h2 className="text-8xl font-bold leading-none text-white max-w-4xl" style={{ 
              fontFamily: 'Crimson Text, serif'
            }}>
              What families are saying
            </h2>
            
            {/* Testimonials in bold blocks */}
            <div className="grid lg:grid-cols-2 gap-8">
              
              <div className="p-12 rounded-3xl" style={{ backgroundColor: 'hsl(var(--cream-base))' }}>
                <Quote className="w-12 h-12 mb-6" style={{ color: 'hsl(var(--vibrant-coral))' }} />
                <p className="text-2xl font-bold leading-relaxed mb-6" style={{ color: 'hsl(var(--deep-black))' }}>
                  "This made me feel so much more confident about advocating for myself."
                </p>
                <p className="text-xl font-semibold" style={{ color: 'hsl(var(--deep-black))' }}>Sarah M.</p>
              </div>

              <div className="p-12 rounded-3xl" style={{ backgroundColor: 'hsl(var(--bold-yellow))' }}>
                <Quote className="w-12 h-12 mb-6" style={{ color: 'hsl(var(--deep-black))' }} />
                <p className="text-2xl font-bold leading-relaxed mb-6" style={{ color: 'hsl(var(--deep-black))' }}>
                  "Finally, a birth plan tool that doesn't make me feel like I'm just checking boxes."
                </p>
                <p className="text-xl font-semibold" style={{ color: 'hsl(var(--deep-black))' }}>Jessica K.</p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};