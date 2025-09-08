import { SectionContainer } from "@/components/ui/section-container";
import { colors, typography } from "@/styles/design-tokens";

export const WhyAshaWorksSection = () => {
  return (
    <SectionContainer backgroundColor={colors.boldYellow} fullBleed={true}>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
          {/* Text Content */}
          <div>
            <h2 
              className="section-headline leading-none mb-8" 
              style={{ 
                fontFamily: typography.body.fontFamily,
                color: colors.deepBlack
              }}
            >
              Why Asha
            </h2>
            
            <div 
              className={`space-y-6 ${typography.body.sizes.lg} font-helvetica font-medium`}
              style={{ color: colors.deepBlack }}
            >
              <p className="font-bold">Guided questions that help</p>
              <p className="font-bold">Reality checks that prepare</p>
              <p className="font-bold">Professional output that works</p>
            </div>
          </div>

          {/* Illustration */}
          <div className="flex items-center justify-center">
            <img
              src="/lovable-uploads/283ff4e2-3b9b-4a55-b7dc-c5a2a74139fd.png"
              alt="Pregnant woman painting - representing creative birth planning process"
              className="w-full h-auto max-w-md lg:max-w-lg"
            />
          </div>
          
        </div>
    </SectionContainer>
  );
};