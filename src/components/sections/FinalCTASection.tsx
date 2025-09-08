import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/ui/section-container";
import { colors, typography } from "@/styles/design-tokens";
import type { CTAProps } from "@/types/shared";

export const FinalCTASection = ({ onGetStarted }: CTAProps) => {
  return (
    <SectionContainer backgroundColor={colors.creamBase}>
      <div 
        className="rounded-3xl p-16 lg:p-32 text-center shadow-2xl" 
        style={{ backgroundColor: colors.vibrantCoral }}
      >
          
          {/* Bold asymmetrical CTA with enhanced typography */}
          <h2 
            className={`${typography.heading.sizes.xl} font-bold leading-none text-white mb-16`}
            style={{ 
              fontFamily: typography.heading.fontFamily
            }}
          >
            Ready?
          </h2>
          
          <div className="flex flex-col lg:flex-row gap-8 justify-center items-center">
            <Button 
              onClick={onGetStarted}
              className={`${typography.body.sizes.lg} font-bold px-16 py-8 rounded-full hover:scale-105 transition-transform duration-300 font-helvetica`}
              style={{ 
                backgroundColor: colors.creamBase,
                color: colors.deepBlack
              }}
            >
              Start Your Birth Plan
            </Button>
            
            <div 
              className={`${typography.body.sizes.lg} text-white font-bold font-helvetica`}
            >
              It's Free
            </div>
          </div>
        </div>
    </SectionContainer>
  );
};