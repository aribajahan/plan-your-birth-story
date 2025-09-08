import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/ui/section-container";
import { colors, typography } from "@/styles/design-tokens";
import type { CTAProps } from "@/types/shared";

export const FinalCTASection = ({ onGetStarted }: CTAProps) => {
  return (
    <SectionContainer backgroundColor={colors.vibrantCoral} condesa={true}>
      <div className="text-center">
        
        {/* Bold asymmetrical CTA with enhanced typography */}
        <h2 
          className={`${typography.heading.sizes.xl} font-bold leading-none text-white mb-8`}
          style={{ 
            fontFamily: typography.heading.fontFamily
          }}
        >
          Feel Prepared for Whatever Comes
        </h2>
        
        {/* Subtext */}
        <p className="text-lg text-white/90 font-medium mb-16 max-w-2xl mx-auto font-helvetica">
          You've been taking great care of yourself and your baby. Now let's make sure you feel ready for birth.
        </p>
        
        <div className="flex flex-col lg:flex-row gap-8 justify-center items-center">
          <Button 
            onClick={onGetStarted}
            className={`${typography.body.sizes.lg} font-bold px-16 py-8 rounded-full hover:scale-105 transition-transform duration-300 font-helvetica`}
            style={{ 
              backgroundColor: colors.creamBase,
              color: colors.deepBlack
            }}
          >
            Create My Birth Plan
          </Button>
        </div>
      </div>
    </SectionContainer>
  );
};