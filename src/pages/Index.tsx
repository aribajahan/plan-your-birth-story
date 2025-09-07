import { useState } from "react";
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

const Index = () => {
  const [mode, setMode] = useState<'home' | 'chat' | 'form'>('home');

  console.log('Index component rendering, mode:', mode);

  if (mode === 'chat') {
    return <ChatBirthPlan onBack={() => setMode('home')} onSwitchToForm={() => setMode('form')} />;
  }

  if (mode === 'form') {
    return <BirthPlanWizard onBack={() => setMode('home')} onSwitchToChat={() => setMode('chat')} />;
  }

  return (
    <div className="min-h-screen overflow-hidden relative">
      <Header onGetStarted={() => setMode('chat')} />
      
      <HeroSection onGetStarted={() => setMode('chat')} />
      
      <WhyAshaWorksSection />
      
      <HowItWorksSection 
        onStartChat={() => setMode('chat')}
        onStartForm={() => setMode('form')}
      />
      
      <TestimonialsSection />
      
      <FAQSection />
      
      <FinalCTASection onGetStarted={() => setMode('chat')} />
      
      <FooterSection />
    </div>
  );
};

export default Index;