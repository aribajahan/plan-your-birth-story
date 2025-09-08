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
      <SectionContainer backgroundColor={colors.creamBase} fullBleed={true} innerPadding="xl">
        <div className="text-center pt-20">
          <h1 className="text-6xl lg:text-8xl font-bold leading-none mb-6" style={{ 
            fontFamily: typography.heading.fontFamily,
            color: colors.deepBlack
          }}>
            Resources for Your Journey
          </h1>
          <p className="text-xl lg:text-2xl max-w-2xl mx-auto" style={{ 
            color: colors.deepBlack 
          }}>
            Trusted information and support for every step
          </p>
        </div>
      </SectionContainer>

      {/* Educational Resources - Yellow Background */}
      <SectionContainer backgroundColor={colors.boldYellow} fullBleed={true} innerPadding="xl">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left Column - 60% */}
          <div className="lg:col-span-3">
            <h2 className="text-4xl lg:text-6xl font-bold leading-none mb-12" style={{ 
              fontFamily: typography.heading.fontFamily,
              color: colors.deepBlack
            }}>
              Learn What You Need to Know
            </h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-6" style={{ 
                  fontFamily: typography.heading.fontFamily,
                  color: colors.deepBlack
                }}>
                  Evidence-Based Information
                </h3>
                <div className="space-y-4 text-lg">
                  <div>
                    <a href="https://evidencebasedbirth.com" target="_blank" rel="noopener" className="font-bold hover:underline" style={{ color: colors.deepBlack }}>Evidence Based Birth</a>
                    <span style={{ color: colors.deepBlack }}> - Research made accessible</span>
                  </div>
                  <div>
                    <a href="https://www.acog.org/womens-health" target="_blank" rel="noopener" className="font-bold hover:underline" style={{ color: colors.deepBlack }}>ACOG Patient Resources</a>
                    <span style={{ color: colors.deepBlack }}> - Official guidance, simplified</span>
                  </div>
                  <div>
                    <a href="https://www.nationalpartnership.org/our-work/health/maternity/" target="_blank" rel="noopener" className="font-bold hover:underline" style={{ color: colors.deepBlack }}>Childbirth Connection</a>
                    <span style={{ color: colors.deepBlack }}> - Research on maternity care</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-6" style={{ 
                  fontFamily: typography.heading.fontFamily,
                  color: colors.deepBlack
                }}>
                  Understanding Your Options
                </h3>
                <ul className="space-y-3 text-lg" style={{ color: colors.deepBlack }}>
                  <li>Pain management choices explained simply</li>
                  <li>Hospital vs. birth center vs. home birth</li>
                  <li>Common interventions and when they're used</li>
                  <li>Your rights during labor and delivery</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - 40% */}
          <div className="lg:col-span-2 flex items-center justify-center">
            <div className="text-center p-12 rounded-2xl bg-white/20">
              <div className="text-6xl mb-4">📚</div>
              <p className="text-lg font-medium" style={{ color: colors.deepBlack }}>
                Learning & Reading
              </p>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* Professional Support - Blue Background */}
      <SectionContainer backgroundColor={colors.richBlue} fullBleed={true} innerPadding="xl">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left Column - 40% */}
          <div className="lg:col-span-2 flex items-center justify-center">
            <div className="text-center p-12 rounded-2xl bg-white/10">
              <div className="text-6xl mb-4">👥</div>
              <p className="text-lg font-medium text-white">
                Support Team
              </p>
            </div>
          </div>

          {/* Right Column - 60% */}
          <div className="lg:col-span-3">
            <h2 className="text-4xl lg:text-6xl font-bold leading-none mb-12 text-white" style={{ 
              fontFamily: typography.heading.fontFamily
            }}>
              Find Your People
            </h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-6 text-white" style={{ 
                  fontFamily: typography.heading.fontFamily
                }}>
                  Doulas & Birth Support
                </h3>
                <div className="space-y-4 text-lg text-white">
                  <div>
                    <a href="https://www.dona.org/what-is-a-doula/find-a-doula/" target="_blank" rel="noopener" className="font-bold hover:underline">DONA International</a>
                    <span> - Find certified doulas</span>
                  </div>
                  <ul className="space-y-2 ml-4">
                    <li>Questions to ask when interviewing doulas</li>
                    <li>What doulas do (and don't do)</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-6 text-white" style={{ 
                  fontFamily: typography.heading.fontFamily
                }}>
                  Childbirth Education
                </h3>
                <div className="space-y-4 text-lg text-white">
                  <div>
                    <a href="https://www.lamaze.org/FindAClass" target="_blank" rel="noopener" className="font-bold hover:underline">Lamaze Classes</a>
                    <span> - Evidence-based preparation</span>
                  </div>
                  <div>
                    <a href="https://www.bradleybirth.com/Directory.aspx" target="_blank" rel="noopener" className="font-bold hover:underline">Bradley Method</a>
                    <span> - Natural childbirth focus</span>
                  </div>
                  <ul className="space-y-2 ml-4">
                    <li>Hospital classes vs. independent instructors</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-6 text-white" style={{ 
                  fontFamily: typography.heading.fontFamily
                }}>
                  Healthcare Providers
                </h3>
                <div className="space-y-4 text-lg text-white">
                  <div>
                    <a href="https://www.midwife.org/find-a-midwife" target="_blank" rel="noopener" className="font-bold hover:underline">Find a Midwife</a>
                    <span> - Certified nurse-midwives</span>
                  </div>
                  <ul className="space-y-2 ml-4">
                    <li>Questions to ask potential providers</li>
                    <li>When to consider switching providers</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* Mental Health & Crisis Support - Black Background */}
      <SectionContainer backgroundColor={colors.faqBlack} fullBleed={true} innerPadding="xl">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl lg:text-6xl font-bold leading-none mb-12 text-white text-center" style={{ 
            fontFamily: typography.heading.fontFamily
          }}>
            You're Not Alone
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-6 text-white" style={{ 
                  fontFamily: typography.heading.fontFamily
                }}>
                  Immediate Crisis Support
                </h3>
                <div className="space-y-3 text-lg text-white">
                  <div><strong>Crisis Text Line:</strong> Text HOME to 741741</div>
                  <div><strong>National Suicide Prevention Lifeline:</strong> 988</div>
                  <div><strong>Maternal Mental Health Hotline:</strong> 1-833-TLC-MAMA</div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-6 text-white" style={{ 
                  fontFamily: typography.heading.fontFamily
                }}>
                  Mental Health Resources
                </h3>
                <div className="space-y-4 text-lg text-white">
                  <div>
                    <a href="https://www.postpartum.net/get-help/" target="_blank" rel="noopener" className="font-bold hover:underline">Postpartum Support International</a>
                    <span> - Find perinatal specialists</span>
                  </div>
                  <div>
                    <a href="https://maternalmentalhealthnow.org/resources/" target="_blank" rel="noopener" className="font-bold hover:underline">Maternal Mental Health NOW</a>
                    <span> - Resources and advocacy</span>
                  </div>
                  <ul className="space-y-2 ml-4">
                    <li>When to seek professional help</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-6 text-white" style={{ 
                  fontFamily: typography.heading.fontFamily
                }}>
                  Birth Trauma Support
                </h3>
                <div className="space-y-4 text-lg text-white">
                  <div>
                    <a href="https://www.birthtraumaassociation.org.uk/" target="_blank" rel="noopener" className="font-bold hover:underline">Birth Trauma Association</a>
                    <span> - Processing difficult experiences</span>
                  </div>
                  <div>
                    <a href="https://solaceformothers.org/" target="_blank" rel="noopener" className="font-bold hover:underline">Solace for Mothers</a>
                    <span> - Peer support network</span>
                  </div>
                  <ul className="space-y-2 ml-4">
                    <li>Therapy options for birth trauma</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-6 text-white" style={{ 
                  fontFamily: typography.heading.fontFamily
                }}>
                  Community Support
                </h3>
                <div className="space-y-4 text-lg text-white">
                  <div>
                    <a href="https://www.familyequality.org/resources/" target="_blank" rel="noopener" className="font-bold hover:underline">Family Equality Council</a>
                    <span> - LGBTQ+ family resources</span>
                  </div>
                  <ul className="space-y-2 ml-4">
                    <li>Local new parent groups</li>
                    <li>Online communities that actually help</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* Final CTA - Coral Background */}
      <SectionContainer backgroundColor={colors.vibrantCoral} fullBleed={true} innerPadding="xl">
        <div className="text-center">
          <h2 className="text-4xl lg:text-6xl font-bold leading-none mb-6 text-white" style={{ 
            fontFamily: typography.heading.fontFamily
          }}>
            Ready to Put It All Together?
          </h2>
          <p className="text-xl lg:text-2xl mb-12 text-white max-w-2xl mx-auto">
            Information is helpful. A plan you feel good about is better.
          </p>
          <Button
            onClick={goToChat}
            className="rounded-full px-12 py-4 text-xl font-bold transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: 'white',
              color: colors.vibrantCoral,
              fontWeight: '700'
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