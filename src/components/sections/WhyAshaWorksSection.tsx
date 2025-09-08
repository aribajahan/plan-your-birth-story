import { SectionContainer } from "@/components/ui/section-container";
import { colors, typography } from "@/styles/design-tokens";

export const WhyAshaWorksSection = () => {
  return (
    <SectionContainer backgroundColor={colors.boldYellow} condesa={true}>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
          {/* Text Content */}
          <div className="space-y-12">
            <h2 
              className="section-headline leading-none mb-12" 
              style={{ 
                fontFamily: typography.body.fontFamily,
                color: colors.deepBlack
              }}
            >
              Why Asha Actually Works
            </h2>
            
            <div className="space-y-8">
              {/* Feature Block 1 */}
              <div>
                <h3 className="text-2xl font-bold mb-3 font-helvetica" style={{ color: colors.deepBlack }}>
                  Thoughtful Conversations, Not Checklists
                </h3>
                <p className="text-lg font-helvetica leading-relaxed" style={{ color: colors.deepBlack }}>
                  We speak your language, not textbook medicine. Every conversation feels like talking to a wise friend who's been there.
                </p>
              </div>
              
              {/* Feature Block 2 */}
              <div>
                <h3 className="text-2xl font-bold mb-3 font-helvetica" style={{ color: colors.deepBlack }}>
                  Honest Guidance That Prepares
                </h3>
                <p className="text-lg font-helvetica leading-relaxed" style={{ color: colors.deepBlack }}>
                  We tell you what birth is actually like without scaring you. You'll feel prepared for whatever comes your way.
                </p>
              </div>
              
              {/* Feature Block 3 */}
              <div>
                <h3 className="text-2xl font-bold mb-3 font-helvetica" style={{ color: colors.deepBlack }}>
                  Scripts That Work in Real Life
                </h3>
                <p className="text-lg font-helvetica leading-relaxed" style={{ color: colors.deepBlack }}>
                  Practice exactly what to say when medical staff suggests interventions. No more fumbling for words in the moment.
                </p>
              </div>
              
              {/* Feature Block 4 */}
              <div>
                <h3 className="text-2xl font-bold mb-3 font-helvetica" style={{ color: colors.deepBlack }}>
                  Gentle Preparation for Any Scenario
                </h3>
                <p className="text-lg font-helvetica leading-relaxed" style={{ color: colors.deepBlack }}>
                  Your plan adjusts when birth doesn't go as expected. We prepare you for success in any scenario.
                </p>
              </div>
              
              {/* Sample Conversation Preview */}
              <div className="bg-black/10 p-6 rounded-lg mt-8">
                <p className="text-lg font-helvetica italic leading-relaxed" style={{ color: colors.deepBlack }}>
                  "Many women feel conflicted about pain medication. It's okay to want both 'natural birth' AND pain relief if you need it. What matters most to you - the experience or the outcome?"
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