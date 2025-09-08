import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { FooterSection } from "@/components/sections/FooterSection";
import { SectionContainer } from "@/components/ui/section-container";
import { colors, typography, spacing } from "@/styles/design-tokens";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle, FileText, MessageCircle } from "lucide-react";

const HowItWorks = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen overflow-hidden relative">
      <Header onGetStarted={handleGetStarted} />
      
      {/* Hero Section - Cream */}
      <SectionContainer 
        backgroundColor={colors.creamBase} 
        condesa={true}
        innerPadding="xl"
      >
        <div className="text-center max-w-4xl mx-auto">
          <h1 
            className={`${typography.heading.serif.sizes.xl} ${typography.heading.serif.weights.semibold} leading-none mb-8`}
            style={{ 
              fontFamily: typography.heading.serif.fontFamily,
              color: colors.deepBlack
            }}
          >
            How Asha Works
          </h1>
          <p 
            className={`${typography.body.sizes.lg} max-w-2xl mx-auto`}
            style={{ color: colors.deepBlack }}
          >
            A simple, step-by-step approach to birth planning
          </p>
        </div>
      </SectionContainer>

      {/* The Process Section - Rich Blue */}
      <SectionContainer 
        backgroundColor={colors.richBlue} 
        condesa={true}
        innerPadding="xl"
      >
        <div className="max-w-7xl mx-auto">
          <h2 
            className={`${typography.heading.serif.sizes.lg} ${typography.heading.serif.weights.semibold} text-center mb-16 text-white`}
            style={{ 
              fontFamily: typography.heading.serif.fontFamily
            }}
          >
            Three Simple Steps
          </h2>
          
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Left side - Steps (60% on desktop) */}
            <div className="lg:col-span-3 space-y-12">
              {[
                {
                  step: "Step 1: Share Your Preferences",
                  description: "Tell us about your hopes, concerns, and values around birth through conversation or forms."
                },
                {
                  step: "Step 2: Prepare for Scenarios",
                  description: "Gentle preparation for different possibilities, so you're ready for whatever comes."
                },
                {
                  step: "Step 3: Get Your Plan & Scripts",
                  description: "Receive a clear document plus communication scripts for your medical team."
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-6">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-transform hover:scale-110 duration-300"
                    style={{ 
                      backgroundColor: colors.boldYellow, 
                      color: colors.deepBlack,
                      fontSize: '1.25rem',
                      fontWeight: '700'
                    }}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <h3 
                      className={`${typography.body.sizes.lg} ${typography.body.weights.bold} mb-3 text-white`}
                      style={{ fontFamily: typography.body.fontFamily }}
                    >
                      {item.step}
                    </h3>
                    <p 
                      className={`${typography.body.sizes.md} ${typography.body.weights.normal} leading-relaxed text-white/90`}
                      style={{ fontFamily: typography.body.fontFamily }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right side - Illustration space (40% on desktop) */}
            <div className="lg:col-span-2 flex items-center justify-center">
              <img 
                src="/lovable-uploads/097fa9d6-f8fc-4de1-ba76-9d36bace2c9b.png" 
                alt="Woman working on laptop at desk illustration" 
                className="w-full max-w-md h-auto rounded-2xl"
              />
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* What You Get Section - Yellow */}
      <SectionContainer 
        backgroundColor={colors.boldYellow} 
        condesa={true}
        innerPadding="xl"
      >
        <div className="max-w-7xl mx-auto">
          <h2 
            className={`${typography.heading.serif.sizes.lg} ${typography.heading.serif.weights.semibold} text-center mb-16`}
            style={{ 
              fontFamily: typography.heading.serif.fontFamily,
              color: colors.deepBlack
            }}
          >
            What You Receive
          </h2>
          
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Left side - Illustration space (40% on desktop) */}
            <div className="lg:col-span-2 flex items-center justify-center">
              <img 
                src="/lovable-uploads/e2df5fce-3c29-4fe0-bc43-7042e67188f0.png" 
                alt="Pregnant woman consulting with healthcare provider illustration" 
                className="w-full max-w-md h-auto rounded-2xl"
              />
            </div>

            {/* Right side - Content (60% on desktop) */}
            <div className="lg:col-span-3 space-y-8">
              {[
                {
                  title: "Your Birth Plan Document",
                  items: [
                    "Clear preferences organized by topic",
                    "Professional format hospitals understand",
                    "Easy to share with your medical team",
                    "Preparation for different birth possibilities"
                  ]
                },
                {
                  title: "Communication Scripts & Confidence",
                  items: [
                    "Exact phrases for common situations",
                    "Questions to ask when decisions need to be made",
                    "Language for your partner to use when advocating",
                    "Tools to communicate when plans change"
                  ]
                }
              ].map((section, index) => (
                <div key={index}>
                  <h3 
                    className={`${typography.body.sizes.lg} ${typography.body.weights.bold} mb-4`}
                    style={{ 
                      color: colors.deepBlack,
                      fontFamily: typography.body.fontFamily
                    }}
                  >
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3" 
                          style={{ 
                            color: colors.deepBlack,
                            fontFamily: typography.body.fontFamily
                          }}>
                        <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.deepBlack }} />
                        <span className={`${typography.body.sizes.sm} ${typography.body.weights.normal}`}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>


      {/* Ready to Start CTA Section - Coral */}
      <SectionContainer 
        backgroundColor={colors.vibrantCoral} 
        condesa={true}
        innerPadding="xl"
      >
        <div className="text-center max-w-4xl mx-auto">
          <h2 
            className={`${typography.heading.serif.sizes.xl} ${typography.heading.serif.weights.semibold} leading-none text-white mb-8`}
            style={{ fontFamily: typography.heading.serif.fontFamily }}
          >
            Ready to Get Started?
          </h2>
          
          <p 
            className={`${typography.body.sizes.lg} ${typography.body.weights.medium} text-white/90 mb-16 max-w-2xl mx-auto`}
            style={{ fontFamily: typography.body.fontFamily }}
          >
            Most people finish in about 15 minutes.
          </p>
          
          <div className="flex justify-center">
            <Button 
              onClick={handleGetStarted}
              className={`${typography.body.sizes.lg} ${typography.body.weights.bold} px-16 py-8 rounded-full hover:scale-105 transition-transform duration-300`}
              style={{ 
                backgroundColor: colors.creamBase,
                color: colors.deepBlack,
                fontFamily: typography.body.fontFamily
              }}
            >
              Create My Birth Plan
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </SectionContainer>

      <FooterSection />
    </div>
  );
};

export default HowItWorks;