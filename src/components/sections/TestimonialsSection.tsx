import { Quote } from "lucide-react";
import { SectionContainer } from "@/components/ui/section-container";
import { testimonialsData, testimonialsConfig } from "@/data/testimonials-data";
import { colors, typography } from "@/styles/design-tokens";

export const TestimonialsSection = () => {
  return (
    <SectionContainer backgroundColor={colors.boldYellow} condesa={true}>
          
        {/* Asymmetrical testimonials layout */}
        <div className="space-y-16">
          
          {/* Title and Illustration */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <h2 
              className={`${typography.heading.sizes.xl} font-bold leading-none`}
              style={{ 
                fontFamily: typography.heading.fontFamily,
                color: colors.deepBlack
              }}
            >
              {testimonialsConfig.title}
            </h2>
            
            {/* Three Women Illustration */}
            <div className="flex justify-center lg:justify-end">
              <img
                src={testimonialsConfig.illustration.src}
                alt={testimonialsConfig.illustration.alt}
                className="w-full h-auto max-w-sm lg:max-w-md"
              />
            </div>
          </div>
          
          {/* Testimonials in bold blocks */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonialsData.map((testimonial, index) => (
              <div 
                key={index}
                className="p-8" 
                style={{ backgroundColor: colors.testimonialsCard }}
              >
                <Quote className="w-8 h-8 mb-4" style={{ color: colors.vibrantCoral }} />
                <p 
                  className={`${typography.body.sizes.md} leading-relaxed mb-4`}
                  style={{ color: colors.deepBlack }}
                >
                  "{testimonial.quote}"
                </p>
                <p 
                  className={`${typography.body.sizes.sm} font-bold`}
                  style={{ color: colors.deepBlack }}
                >
                  — {testimonial.author}
                </p>
                {testimonial.location && (
                  <p 
                    className={`${typography.body.sizes.sm} mt-2`}
                    style={{ color: colors.deepBlack, opacity: 0.7 }}
                  >
                    {testimonial.location}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
    </SectionContainer>
  );
};