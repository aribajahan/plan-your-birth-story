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
            className={`${typography.heading.sizes.xl} font-bold leading-none mb-8`}
            style={{ 
              fontFamily: typography.heading.fontFamily,
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

      {/* The Process Section - Yellow */}
      <SectionContainer 
        backgroundColor={colors.boldYellow} 
        condesa={true}
        innerPadding="xl"
      >
        <div className="max-w-7xl mx-auto">
          <h2 
            className={`${typography.heading.sizes.lg} font-bold text-center mb-16`}
            style={{ 
              fontFamily: typography.heading.fontFamily,
              color: colors.deepBlack
            }}
          >
            Five Simple Steps
          </h2>
          
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Left side - Steps (60% on desktop) */}
            <div className="lg:col-span-3 space-y-12">
              {[
                {
                  step: "Step 1: Choose Your Path",
                  description: "Pick conversation or forms - both lead to the same place."
                },
                {
                  step: "Step 2: Share What Matters",
                  description: "We'll ask about your hopes, concerns, and values around birth."
                },
                {
                  step: "Step 3: Get Real About Scenarios",
                  description: "Gentle preparation for different possibilities, so you're ready for whatever comes."
                },
                {
                  step: "Step 4: Practice Communication",
                  description: "Learn exactly what to say to medical staff in different situations."
                },
                {
                  step: "Step 5: Get Your Plan",
                  description: "Receive a clear document plus scripts for your medical team."
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                    style={{ backgroundColor: colors.deepBlack, color: colors.boldYellow }}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <h3 
                      className="text-xl font-bold mb-2"
                      style={{ color: colors.deepBlack }}
                    >
                      {item.step}
                    </h3>
                    <p 
                      className="text-base leading-relaxed"
                      style={{ color: colors.deepBlack }}
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
                src="/lovable-uploads/277d7049-7e3e-43f7-9207-63a1c6a6c4b2.png" 
                alt="Healthcare provider consulting with pregnant woman illustration" 
                className="w-full max-w-md h-auto rounded-2xl"
              />
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* What You Get Section - Blue */}
      <SectionContainer 
        backgroundColor={colors.richBlue} 
        condesa={true}
        innerPadding="xl"
      >
        <div className="max-w-7xl mx-auto">
          <h2 
            className={`${typography.heading.sizes.lg} font-bold text-center mb-16 text-white`}
            style={{ fontFamily: typography.heading.fontFamily }}
          >
            What You Actually Receive
          </h2>
          
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Left side - Illustration space (40% on desktop) */}
            <div className="lg:col-span-2 flex items-center justify-center">
              <div 
                className="w-full h-80 rounded-2xl flex items-center justify-center border-2 border-dashed border-white/30"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              >
                <div className="text-center p-8">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-white" />
                  <p className="text-sm font-medium text-white">
                    Sample document preview
                    <br />
                    or illustration
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Content (60% on desktop) */}
            <div className="lg:col-span-3 space-y-8">
              {[
                {
                  title: "Your Personal Birth Plan",
                  items: [
                    "Clear preferences organized by topic",
                    "Professional format hospitals understand",
                    "Easy to share with your medical team"
                  ]
                },
                {
                  title: "Communication Scripts",
                  items: [
                    "Exact phrases for common situations",
                    "Questions to ask when decisions need to be made",
                    "Language for your partner to use when advocating"
                  ]
                },
                {
                  title: "Confidence for Any Scenario",
                  items: [
                    "Preparation for different birth possibilities",
                    "Tools to communicate when plans change",
                    "Guidance for unexpected situations"
                  ]
                }
              ].map((section, index) => (
                <div key={index}>
                  <h3 className="text-xl font-bold mb-4 text-white">
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3 text-white/90">
                        <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* Sample Plan Preview Section - Cream */}
      <SectionContainer 
        backgroundColor={colors.creamBase} 
        condesa={true}
        innerPadding="xl"
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 
            className={`${typography.heading.sizes.lg} font-bold mb-8`}
            style={{ 
              fontFamily: typography.heading.fontFamily,
              color: colors.deepBlack
            }}
          >
            See What Your Plan Looks Like
          </h2>
          
          <p 
            className={`${typography.body.sizes.lg} mb-12 max-w-3xl mx-auto`}
            style={{ color: colors.deepBlack }}
          >
            Here's an example of how Asha organizes your preferences into a clear, 
            professional birth plan that medical teams actually use.
          </p>

          {/* Mockup preview area */}
          <div 
            className="w-full max-w-2xl mx-auto h-96 rounded-2xl flex items-center justify-center border-2 border-dashed mb-12"
            style={{ 
              borderColor: colors.deepBlack,
              backgroundColor: 'rgba(255, 255, 255, 0.5)'
            }}
          >
            <div className="text-center p-8">
              <FileText 
                className="w-16 h-16 mx-auto mb-4"
                style={{ color: colors.deepBlack }}
              />
              <p 
                className="text-lg font-medium"
                style={{ color: colors.deepBlack }}
              >
                Birth Plan Document Preview
              </p>
              <p 
                className="text-sm mt-2"
                style={{ color: colors.deepBlack }}
              >
                Visual mockup of a completed birth plan
              </p>
            </div>
          </div>

          <Button 
            className="font-bold px-12 py-6 rounded-full text-lg hover:scale-105 transition-transform duration-300"
            style={{ 
              backgroundColor: colors.richBlue,
              color: colors.white
            }}
          >
            See Full Example Plan
          </Button>
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
            className={`${typography.heading.sizes.xl} font-bold leading-none text-white mb-8`}
            style={{ fontFamily: typography.heading.fontFamily }}
          >
            Ready to Get Started?
          </h2>
          
          <p className="text-xl text-white/90 font-medium mb-16 max-w-2xl mx-auto">
            Most people finish in about 15 minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              onClick={handleGetStarted}
              className={`${typography.body.sizes.lg} font-bold px-16 py-8 rounded-full hover:scale-105 transition-transform duration-300`}
              style={{ 
                backgroundColor: colors.creamBase,
                color: colors.deepBlack
              }}
            >
              Create My Birth Plan
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button 
              variant="outline"
              className={`${typography.body.sizes.lg} font-bold px-12 py-8 rounded-full border-2 border-white text-white hover:bg-white hover:text-coral-500 transition-all duration-300`}
            >
              See Example Plan
            </Button>
          </div>
        </div>
      </SectionContainer>

      <FooterSection />
    </div>
  );
};

export default HowItWorks;