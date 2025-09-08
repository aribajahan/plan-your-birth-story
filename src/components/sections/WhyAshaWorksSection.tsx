import { SectionContainer } from "@/components/ui/section-container";
import { colors, typography } from "@/styles/design-tokens";

export const WhyAshaWorksSection = () => {
  return (
    <SectionContainer backgroundColor={colors.boldYellow} condesa={true}>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
          {/* Text Content */}
          <div className="space-y-8">
            <h2 
              className="text-4xl lg:text-7xl font-bold leading-none mb-8" 
              style={{ 
                fontFamily: typography.body.fontFamily,
                color: colors.deepBlack
              }}
            >
              What Makes Asha Different
            </h2>
            
            <div className="space-y-6">
              {/* Feature Block 1 */}
              <div>
                <p className="text-lg font-helvetica leading-relaxed" style={{ color: colors.deepBlack }}>
                  Honest guidance that prepares you without overwhelming you - we share what birth is really like in a way that helps, not scares
                </p>
              </div>
              
              {/* Feature Block 2 */}
              <div>
                <p className="text-lg font-helvetica leading-relaxed" style={{ color: colors.deepBlack }}>
                  The exact words to use when you need to speak up - practice what to say when medical staff suggests interventions
                </p>
              </div>
              
              {/* Feature Block 3 */}
              <div>
                <p className="text-lg font-helvetica leading-relaxed" style={{ color: colors.deepBlack }}>
                  Plans that help you communicate no matter how birth unfolds - whether everything goes smoothly or decisions need to be made quickly
                </p>
              </div>
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