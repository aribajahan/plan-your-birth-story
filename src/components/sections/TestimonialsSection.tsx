import { Quote } from "lucide-react";

export const TestimonialsSection = () => {
  return (
    <section className="min-h-screen flex items-center bg-cream-base">
      <div className="w-full px-4 lg:px-8">
        
        {/* Rounded Yellow Container */}
        <div className="rounded-3xl p-8 lg:p-16" style={{ backgroundColor: 'hsl(var(--bold-yellow))' }}>
          
          {/* Asymmetrical testimonials layout */}
          <div className="space-y-16">
            
            {/* Title and Illustration */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <h2 className="text-6xl lg:text-8xl font-bold leading-none" style={{ 
                fontFamily: 'Crimson Text, serif',
                color: 'hsl(var(--vibrant-coral))'
              }}>
                What families are saying
              </h2>
              
              {/* Three Women Illustration */}
              <div className="flex justify-center lg:justify-end">
                <img
                  src="/lovable-uploads/3c986592-ed47-4d38-bc5e-ab626b90d3f5.png"
                  alt="Three pregnant women with a stroller - representing community support"
                  className="w-full h-auto max-w-sm lg:max-w-md"
                />
              </div>
            </div>
            
            {/* Testimonials in bold blocks */}
            <div className="grid lg:grid-cols-2 gap-8">
              
              <div className="p-12 rounded-3xl" style={{ backgroundColor: 'hsl(var(--cream-base))' }}>
                <Quote className="w-12 h-12 mb-6" style={{ color: 'hsl(var(--vibrant-coral))' }} />
                <p className="text-2xl font-bold leading-relaxed mb-6" style={{ color: 'hsl(var(--deep-black))' }}>
                  "This made me feel so much more confident about advocating for myself."
                </p>
                <p className="text-xl font-semibold" style={{ color: 'hsl(var(--deep-black))' }}>Sarah M.</p>
              </div>

              <div className="p-12 rounded-3xl" style={{ backgroundColor: 'hsl(var(--cream-base))' }}>
                <Quote className="w-12 h-12 mb-6" style={{ color: 'hsl(var(--vibrant-coral))' }} />
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