import { useState } from "react";
import { BirthPlanWizard } from "@/components/BirthPlanWizard";
import { ChatBirthPlan } from "@/components/ChatBirthPlan";
import { Button } from "@/components/ui/button";
import { GeneratedImage } from "@/components/GeneratedImage";
import { Header } from "@/components/Header";

import { Heart, MessageCircle, FileText, Quote, Plus, Minus } from "lucide-react";

const Index = () => {
  const [mode, setMode] = useState<'home' | 'chat' | 'form'>('home');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  console.log('Index component rendering, mode:', mode);

  if (mode === 'chat') {
    return <ChatBirthPlan onBack={() => setMode('home')} onSwitchToForm={() => setMode('form')} />;
  }

  if (mode === 'form') {
    return <BirthPlanWizard onBack={() => setMode('home')} onSwitchToChat={() => setMode('chat')} />;
  }

  const faqs = [
    {
      question: "Is this medical advice?",
      answer: "No, we're a planning tool that helps you organize your preferences and communicate with your medical team. Always work with your healthcare providers for medical decisions."
    },
    {
      question: "What if I change my mind during labor?",
      answer: "That's completely normal! Birth plans are starting points, not contracts. We help you plan for flexibility and changing circumstances."
    },
    {
      question: "How long does it take?",
      answer: "Most people complete their birth plan in 20-30 minutes, but you can save and return anytime. The chat approach tends to be faster, while forms allow more detailed reflection."
    },
    {
      question: "Can my partner use this too?",
      answer: "Absolutely! We include specific guidance for partners and support people throughout the process."
    },
    {
      question: "What format do I get?",
      answer: "You'll receive a professional PDF birth plan plus a communication toolkit with personalized scripts. Both can be printed or shared digitally."
    }
  ];

  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Header */}
      <Header onGetStarted={() => setMode('chat')} />
      
      {/* Hero Section - Bold Condesa-Style */}
      <section className="relative h-screen flex items-center justify-center" style={{ backgroundColor: 'hsl(var(--vibrant-coral))' }}>
        {/* Geometric shapes background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-80 h-80 rounded-full" style={{ backgroundColor: 'hsl(var(--bold-yellow))' }}></div>
          <div className="absolute bottom-32 left-16 w-64 h-32" style={{ backgroundColor: 'hsl(var(--electric-blue))' }}></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 rotate-45" style={{ backgroundColor: 'hsl(var(--cream-base))' }}></div>
        </div>
        
        {/* Wordmark - MASSIVE and dominant */}
        <div className="relative z-10 text-center">
          <img 
            src="/lovable-uploads/e9051f6b-475a-4a97-b5e4-b82330515a2e.png"
            alt="Asha - Birth Plans Built with Hope" 
            className="w-auto mx-auto mb-12"
            style={{ 
              height: 'clamp(20rem, 60vh, 40rem)',
              maxWidth: '90vw',
              filter: 'drop-shadow(0 8px 40px rgba(0, 0, 0, 0.3))',
            }}
          />
          
          {/* Minimal, bold call-to-action in contrasting color block */}
          <div className="inline-block p-8 rounded-3xl" style={{ backgroundColor: 'hsl(var(--cream-base))' }}>
            <Button 
              onClick={() => setMode('chat')}
              className="text-2xl font-bold px-16 py-6 rounded-full hover:scale-105 transition-transform duration-300"
              style={{ 
                backgroundColor: 'hsl(var(--deep-black))', 
                color: 'hsl(var(--cream-base))'
              }}
            >
              Start Your Birth Plan
            </Button>
          </div>
        </div>
      </section>

      {/* Why Asha Actually Works - Bold Color Block */}
      <section className="min-h-screen flex items-center" style={{ backgroundColor: 'hsl(var(--bold-yellow))' }}>
        <div className="w-full">
          <div className="grid lg:grid-cols-2 min-h-screen">
            
            {/* Left: Bold Text Block */}
            <div className="flex items-center justify-center p-16">
              <div className="max-w-xl">
                <h2 className="text-8xl font-bold leading-none mb-8" style={{ 
                  fontFamily: 'Crimson Text, serif',
                  color: 'hsl(var(--deep-black))'
                }}>
                  Why Asha Actually Works
                </h2>
                
                <div className="space-y-8 text-2xl" style={{ color: 'hsl(var(--deep-black))' }}>
                  <p className="font-bold">Guided questions that help</p>
                  <p className="font-bold">Reality checks that prepare</p>
                  <p className="font-bold">Professional output that works</p>
                </div>
              </div>
            </div>

            {/* Right: Illustration */}
            <div className="flex items-center justify-center p-16" style={{ backgroundColor: 'hsl(var(--cream-base))' }}>
              <img 
                src="/lovable-uploads/283ff4e2-3b9b-4a55-b7dc-c5a2a74139fd.png"
                alt="Creative pregnant woman painting - representing personalized birth planning"
                className="w-full h-auto max-w-lg"
              />
            </div>
            
          </div>
        </div>
      </section>

      {/* How It Works - Electric Blue Block */}
      <section className="min-h-screen flex items-center" style={{ backgroundColor: 'hsl(var(--electric-blue))' }}>
        <div className="w-full">
          <div className="max-w-7xl mx-auto p-16">
            
            {/* Bold asymmetrical layout */}
            <div className="grid lg:grid-cols-3 gap-16 items-start">
              
              {/* Large title taking up left column */}
              <div className="lg:col-span-1">
                <h2 className="text-7xl font-bold leading-none text-white" style={{ 
                  fontFamily: 'Crimson Text, serif'
                }}>
                  Two Ways
                </h2>
              </div>

              {/* Two approaches side by side */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Chat Approach */}
                <div className="p-12 rounded-3xl" style={{ backgroundColor: 'hsl(var(--cream-base))' }}>
                  <div className="flex items-start gap-8">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: 'hsl(var(--vibrant-coral))' }}>
                        <MessageCircle className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-4xl font-bold" style={{ color: 'hsl(var(--deep-black))' }}>Chat Through It</h3>
                      <p className="text-xl" style={{ color: 'hsl(var(--deep-black))' }}>
                        Natural conversation that feels like talking to a supportive friend.
                      </p>
                      <Button 
                        onClick={() => setMode('chat')}
                        className="text-xl font-bold px-8 py-4 rounded-full"
                        style={{ 
                          backgroundColor: 'hsl(var(--vibrant-coral))',
                          color: 'white'
                        }}
                      >
                        Start Chatting
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Form Approach */}
                <div className="p-12 rounded-3xl" style={{ backgroundColor: 'hsl(var(--bold-yellow))' }}>
                  <div className="flex items-start gap-8">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: 'hsl(var(--deep-black))' }}>
                        <FileText className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-4xl font-bold" style={{ color: 'hsl(var(--deep-black))' }}>Fill Out Forms</h3>
                      <p className="text-xl" style={{ color: 'hsl(var(--deep-black))' }}>
                        Structured sections at your own pace with clear progress tracking.
                      </p>
                      <Button 
                        onClick={() => setMode('form')}
                        className="text-xl font-bold px-8 py-4 rounded-full"
                        style={{ 
                          backgroundColor: 'hsl(var(--deep-black))',
                          color: 'white'
                        }}
                      >
                        Start Forms
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Deep Green Block */}
      <section className="min-h-screen flex items-center" style={{ backgroundColor: 'hsl(var(--forest-green))' }}>
        <div className="w-full">
          <div className="max-w-7xl mx-auto p-16">
            
            {/* Asymmetrical testimonials layout */}
            <div className="space-y-16">
              
              {/* Bold title */}
              <h2 className="text-8xl font-bold leading-none text-white max-w-4xl" style={{ 
                fontFamily: 'Crimson Text, serif'
              }}>
                What families are saying
              </h2>
              
              {/* Testimonials in bold blocks */}
              <div className="grid lg:grid-cols-2 gap-8">
                
                <div className="p-12 rounded-3xl" style={{ backgroundColor: 'hsl(var(--cream-base))' }}>
                  <Quote className="w-12 h-12 mb-6" style={{ color: 'hsl(var(--vibrant-coral))' }} />
                  <p className="text-2xl font-bold leading-relaxed mb-6" style={{ color: 'hsl(var(--deep-black))' }}>
                    "This made me feel so much more confident about advocating for myself."
                  </p>
                  <p className="text-xl font-semibold" style={{ color: 'hsl(var(--deep-black))' }}>Sarah M.</p>
                </div>

                <div className="p-12 rounded-3xl" style={{ backgroundColor: 'hsl(var(--bold-yellow))' }}>
                  <Quote className="w-12 h-12 mb-6" style={{ color: 'hsl(var(--deep-black))' }} />
                  <p className="text-2xl font-bold leading-relaxed mb-6" style={{ color: 'hsl(var(--deep-black))' }}>
                    "Finally, a birth plan tool that doesn't make me feel like I'm just checking boxes."
                  </p>
                  <p className="text-xl font-semibold" style={{ color: 'hsl(var(--deep-black))' }}>Jessica K.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ - Bold Yellow Block */}
      <section className="py-24" style={{ backgroundColor: 'hsl(var(--bold-yellow))' }}>
        <div className="max-w-6xl mx-auto px-16">
          
          <h2 className="text-6xl font-bold mb-16 text-center" style={{ 
            fontFamily: 'Crimson Text, serif',
            color: 'hsl(var(--deep-black))'
          }}>
            Questions?
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="rounded-3xl overflow-hidden" style={{ backgroundColor: 'hsl(var(--cream-base))' }}>
                <button
                  className="w-full px-12 py-8 text-left flex items-center justify-between hover:opacity-80 transition-opacity"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <h3 className="text-2xl font-bold" style={{ color: 'hsl(var(--deep-black))' }}>{faq.question}</h3>
                  {openFaq === index ? (
                    <Minus className="w-8 h-8" style={{ color: 'hsl(var(--vibrant-coral))' }} />
                  ) : (
                    <Plus className="w-8 h-8" style={{ color: 'hsl(var(--vibrant-coral))' }} />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-12 pb-8">
                    <p className="text-xl leading-relaxed" style={{ color: 'hsl(var(--deep-black))' }}>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Coral Block */}
      <section className="min-h-screen flex items-center" style={{ backgroundColor: 'hsl(var(--vibrant-coral))' }}>
        <div className="w-full">
          <div className="max-w-7xl mx-auto p-16 text-center">
            
            {/* Bold asymmetrical CTA */}
            <h2 className="text-8xl font-bold leading-none text-white mb-16" style={{ 
              fontFamily: 'Crimson Text, serif'
            }}>
              Ready?
            </h2>
            
            <div className="flex flex-col lg:flex-row gap-8 justify-center items-center">
              <Button 
                onClick={() => setMode('chat')}
                className="text-3xl font-bold px-16 py-8 rounded-full hover:scale-105 transition-transform duration-300"
                style={{ 
                  backgroundColor: 'hsl(var(--cream-base))',
                  color: 'hsl(var(--deep-black))'
                }}
              >
                Start Your Birth Plan
              </Button>
              
              <div className="text-2xl text-white font-bold">
                It's Free
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
              
              {/* Brand & Mission */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Heart className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="text-xl font-display font-bold">Your Birth, Your Way</span>
                </div>
                <p className="text-muted-foreground text-sm max-w-sm">
                  Empowering families to create thoughtful, professional birth plans 
                  with confidence and clarity.
                </p>
              </div>

              {/* Resources Links */}
              <div className="space-y-3">
                <h4 className="font-display font-semibold text-sm">Resources</h4>
                <div className="space-y-2">
                  <a href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">About Us</a>
                  <a href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">Privacy Policy</a>
                  <a href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">Contact</a>
                  <a href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">Resources</a>
                </div>
              </div>

              {/* Professionals Links */}
              <div className="space-y-3">
                <h4 className="font-display font-semibold text-sm">Professionals</h4>
                <div className="space-y-2">
                  <a href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">For Healthcare Providers</a>
                  <a href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">For Doulas</a>
                  <a href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">Birthing Centers</a>
                </div>
              </div>

              {/* Social Proof */}
              <div className="space-y-3">
                <h4 className="font-display font-semibold text-sm">Trusted By</h4>
                 <div className="space-y-2">
                   <div className="flex items-center gap-2 text-xs text-muted-foreground">
                     <div className="w-1 h-1 rounded-full bg-primary"></div>
                     <span>Doulas nationwide</span>
                   </div>
                   <div className="flex items-center gap-2 text-xs text-muted-foreground">
                     <div className="w-1 h-1 rounded-full bg-primary"></div>
                     <span>Featured in publications</span>
                   </div>
                   <div className="flex items-center gap-2 text-xs text-muted-foreground">
                     <div className="w-1 h-1 rounded-full bg-primary"></div>
                     <span>Birthing centers</span>
                   </div>
                 </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-border mt-8 pt-6 text-center">
              <p className="text-muted-foreground text-xs">
                © 2024 Your Birth, Your Way. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;