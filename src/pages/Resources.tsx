import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { FooterSection } from "@/components/sections/FooterSection";
import { SectionContainer } from "@/components/ui/section-container";
import { colors, typography } from "@/styles/design-tokens";
import { useAppMode } from "@/hooks/useAppMode";

const Resources = () => {
  const { goToChat } = useAppMode();

  return (
    <div className="min-h-screen overflow-hidden relative">
      <Header onGetStarted={goToChat} />
      
      {/* Hero Section - Cream Background */}
      <SectionContainer backgroundColor={colors.creamBase} condesa={true}>
        <div className="text-center">
          <h1 
            className={`${typography.heading.sizes.xl} font-bold leading-none mb-6`}
            style={{ fontFamily: typography.heading.fontFamily }}
          >
            Resources for Your Journey
          </h1>
          <p 
            className={`${typography.body.sizes.lg} max-w-2xl mx-auto`}
            style={{ 
              fontFamily: typography.body.fontFamily,
              color: colors.deepBlack 
            }}
          >
            Trusted information and support for every step
          </p>
        </div>
      </SectionContainer>

      {/* Educational Resources - Yellow Background */}
      <SectionContainer backgroundColor={colors.boldYellow} condesa={true}>
        <div className="text-center mb-16">
          <h2 
            className={`${typography.heading.sizes.lg} font-bold leading-none mb-4`}
            style={{ fontFamily: typography.heading.fontFamily }}
          >
            Learn What You Need to Know
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 
              className={`${typography.heading.sizes.sm} font-bold mb-6`}
              style={{ 
                fontFamily: typography.heading.fontFamily,
                color: colors.deepBlack
              }}
            >
              Evidence-Based Information
            </h3>
            <div 
              className={`space-y-4 ${typography.body.sizes.md}`}
              style={{ 
                fontFamily: typography.body.fontFamily,
                color: colors.deepBlack
              }}
            >
              <div>
                <a href="https://evidencebasedbirth.com" target="_blank" rel="noopener" className="font-bold hover:underline">Evidence Based Birth</a>
                <span> - Research made accessible</span>
              </div>
              <div>
                <a href="https://www.acog.org/womens-health" target="_blank" rel="noopener" className="font-bold hover:underline">ACOG Patient Resources</a>
                <span> - Official guidance, simplified</span>
              </div>
              <div>
                <a href="https://www.nationalpartnership.org/our-work/health/maternity/" target="_blank" rel="noopener" className="font-bold hover:underline">Childbirth Connection</a>
                <span> - Research on maternity care</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 
              className={`${typography.heading.sizes.sm} font-bold mb-6`}
              style={{ 
                fontFamily: typography.heading.fontFamily,
                color: colors.deepBlack
              }}
            >
              Understanding Your Options
            </h3>
            <ul 
              className={`space-y-3 ${typography.body.sizes.md}`}
              style={{ 
                fontFamily: typography.body.fontFamily,
                color: colors.deepBlack
              }}
            >
              <li>• Pain management choices explained simply</li>
              <li>• Hospital vs. birth center vs. home birth</li>
              <li>• Common interventions and when they're used</li>
              <li>• Your rights during labor and delivery</li>
            </ul>
          </div>
        </div>
      </SectionContainer>

      {/* Professional Support - Blue Background */}
      <SectionContainer backgroundColor={colors.richBlue} condesa={true}>
        <div className="text-center mb-16">
          <h2 
            className={`${typography.heading.sizes.lg} font-bold leading-none mb-4 text-white`}
            style={{ fontFamily: typography.heading.fontFamily }}
          >
            Find Your People
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-12">
          <div>
            <h3 
              className={`${typography.heading.sizes.sm} font-bold mb-6 text-white`}
              style={{ fontFamily: typography.heading.fontFamily }}
            >
              Doulas & Birth Support
            </h3>
            <div 
              className={`space-y-4 ${typography.body.sizes.md} text-white`}
              style={{ fontFamily: typography.body.fontFamily }}
            >
              <div>
                <a href="https://www.dona.org/what-is-a-doula/find-a-doula/" target="_blank" rel="noopener" className="font-bold hover:underline">DONA International</a>
                <span> - Find certified doulas</span>
              </div>
              <div>• Questions to ask when interviewing doulas</div>
              <div>• What doulas do (and don't do)</div>
            </div>
          </div>
          
          <div>
            <h3 
              className={`${typography.heading.sizes.sm} font-bold mb-6 text-white`}
              style={{ fontFamily: typography.heading.fontFamily }}
            >
              Childbirth Education
            </h3>
            <div 
              className={`space-y-4 ${typography.body.sizes.md} text-white`}
              style={{ fontFamily: typography.body.fontFamily }}
            >
              <div>
                <a href="https://www.lamaze.org/FindAClass" target="_blank" rel="noopener" className="font-bold hover:underline">Lamaze Classes</a>
                <span> - Evidence-based preparation</span>
              </div>
              <div>
                <a href="https://www.bradleybirth.com/Directory.aspx" target="_blank" rel="noopener" className="font-bold hover:underline">Bradley Method</a>
                <span> - Natural childbirth focus</span>
              </div>
              <div>• Hospital classes vs. independent instructors</div>
            </div>
          </div>
          
          <div>
            <h3 
              className={`${typography.heading.sizes.sm} font-bold mb-6 text-white`}
              style={{ fontFamily: typography.heading.fontFamily }}
            >
              Healthcare Providers
            </h3>
            <div 
              className={`space-y-4 ${typography.body.sizes.md} text-white`}
              style={{ fontFamily: typography.body.fontFamily }}
            >
              <div>
                <a href="https://www.midwife.org/find-a-midwife" target="_blank" rel="noopener" className="font-bold hover:underline">Find a Midwife</a>
                <span> - Certified nurse-midwives</span>
              </div>
              <div>• Questions to ask potential providers</div>
              <div>• When to consider switching providers</div>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* Mental Health & Crisis Support - Black Background */}
      <SectionContainer backgroundColor={colors.deepBlack} condesa={true}>
        <div className="text-center mb-16">
          <h2 
            className={`${typography.heading.sizes.lg} font-bold leading-none mb-4 text-white`}
            style={{ fontFamily: typography.heading.fontFamily }}
          >
            You're Not Alone
          </h2>
        </div>
        
        <div className="space-y-12">
          <div>
            <h3 
              className={`${typography.heading.sizes.sm} font-bold mb-6 text-white`}
              style={{ fontFamily: typography.heading.fontFamily }}
            >
              Immediate Crisis Support
            </h3>
            <div 
              className={`space-y-4 ${typography.body.sizes.md} text-white bg-white/5 rounded-2xl p-8`}
              style={{ fontFamily: typography.body.fontFamily }}
            >
              <div><strong>Crisis Text Line:</strong> Text HOME to 741741</div>
              <div><strong>National Suicide Prevention Lifeline:</strong> 988</div>
              <div><strong>Maternal Mental Health Hotline:</strong> 1-833-TLC-MAMA</div>
            </div>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div>
              <h3 
                className={`${typography.heading.sizes.sm} font-bold mb-6 text-white`}
                style={{ fontFamily: typography.heading.fontFamily }}
              >
                Mental Health Resources
              </h3>
              <div 
                className={`space-y-4 ${typography.body.sizes.md} text-white`}
                style={{ fontFamily: typography.body.fontFamily }}
              >
                <div>
                  <a href="https://www.postpartum.net/get-help/" target="_blank" rel="noopener" className="font-bold hover:underline">Postpartum Support International</a>
                  <span> - Find perinatal specialists</span>
                </div>
                <div>
                  <a href="https://maternalmentalhealthnow.org/resources/" target="_blank" rel="noopener" className="font-bold hover:underline">Maternal Mental Health NOW</a>
                  <span> - Resources and advocacy</span>
                </div>
                <div>• When to seek professional help</div>
              </div>
            </div>
            
            <div>
              <h3 
                className={`${typography.heading.sizes.sm} font-bold mb-6 text-white`}
                style={{ fontFamily: typography.heading.fontFamily }}
              >
                Birth Trauma Support
              </h3>
              <div 
                className={`space-y-4 ${typography.body.sizes.md} text-white`}
                style={{ fontFamily: typography.body.fontFamily }}
              >
                <div>
                  <a href="https://www.birthtraumaassociation.org.uk/" target="_blank" rel="noopener" className="font-bold hover:underline">Birth Trauma Association</a>
                  <span> - Processing difficult experiences</span>
                </div>
                <div>
                  <a href="https://solaceformothers.org/" target="_blank" rel="noopener" className="font-bold hover:underline">Solace for Mothers</a>
                  <span> - Peer support network</span>
                </div>
                <div>• Therapy options for birth trauma</div>
              </div>
            </div>
            
            <div>
              <h3 
                className={`${typography.heading.sizes.sm} font-bold mb-6 text-white`}
                style={{ fontFamily: typography.heading.fontFamily }}
              >
                Community Support
              </h3>
              <div 
                className={`space-y-4 ${typography.body.sizes.md} text-white`}
                style={{ fontFamily: typography.body.fontFamily }}
              >
                <div>
                  <a href="https://www.familyequality.org/resources/" target="_blank" rel="noopener" className="font-bold hover:underline">Family Equality Council</a>
                  <span> - LGBTQ+ family resources</span>
                </div>
                <div>• Local new parent groups</div>
                <div>• Online communities that actually help</div>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* Final CTA - Coral Background */}
      <SectionContainer backgroundColor={colors.vibrantCoral} condesa={true}>
        <div className="text-center">
          <h2 
            className={`${typography.heading.sizes.xl} font-bold leading-none mb-8 text-white`}
            style={{ fontFamily: typography.heading.fontFamily }}
          >
            Ready to Put It All Together?
          </h2>
          <p 
            className={`${typography.body.sizes.lg} mb-12 text-white/90 max-w-2xl mx-auto`}
            style={{ fontFamily: typography.body.fontFamily }}
          >
            Information is helpful. A plan you feel good about is better.
          </p>
          <Button
            onClick={goToChat}
            className="rounded-full px-12 py-6 font-bold transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: colors.creamBase,
              color: colors.deepBlack,
              fontFamily: typography.body.fontFamily,
              fontSize: typography.body.sizes.lg
            }}
          >
            Create My Birth Plan
          </Button>
        </div>
      </SectionContainer>

      <FooterSection />
    </div>
  );
};

export default Resources;