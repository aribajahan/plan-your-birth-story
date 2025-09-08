import { BirthPlanWizard } from "@/components/BirthPlanWizard";
import { ChatBirthPlan } from "@/components/ChatBirthPlan";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { WhyAshaWorksSection } from "@/components/sections/WhyAshaWorksSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { FooterSection } from "@/components/sections/FooterSection";
import { useAppMode } from "@/hooks/useAppMode";

const Index = () => {
  const { mode, goToHome, goToChat, goToForm } = useAppMode();

  console.log('Index component rendering, mode:', mode);

  if (mode === 'chat') {
    return <ChatBirthPlan onBack={goToHome} onSwitchToForm={goToForm} />;
  }

  if (mode === 'form') {
    return <BirthPlanWizard onBack={goToHome} onSwitchToChat={goToChat} />;
  }

  return (
    <div className="min-h-screen overflow-hidden relative">
      <Header onGetStarted={goToChat} />
      
      <HeroSection onGetStarted={goToChat} />
      
      <WhyAshaWorksSection />
      
      <HowItWorksSection 
        onStartChat={goToChat}
        onStartForm={goToForm}
      />
      
      <TestimonialsSection />
      
      <FAQSection />
      
      <FinalCTASection onGetStarted={goToChat} />
      
      <FooterSection />
    </div>
  );
};

export default Index;