import { useState } from "react";
import { BirthPlanWizard } from "@/components/BirthPlanWizard";
import { ChatBirthPlan } from "@/components/ChatBirthPlan";
import { Button } from "@/components/ui/button";
import { GeneratedImage } from "@/components/GeneratedImage";

import { Heart, MessageCircle, FileText, Quote, Plus, Minus } from "lucide-react";

const Index = () => {
  const [mode, setMode] = useState<'home' | 'chat' | 'form'>('home');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        {/* Background Elements */}
        <div className="absolute inset-0 gradient-radial"></div>
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-accent/10 blur-3xl"></div>
        
        <div className="container mx-auto px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center min-h-screen py-20">
            
            {/* Left Column - Bold Typography */}
            <div className="lg:col-span-7 space-y-12">
              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 bg-card/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-card hover-glow transition-smooth text-sm font-medium">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Trusted by 1000+ families</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>4.9/5 rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Used by doulas & birth professionals</span>
                </div>
              </div>
              
              {/* Headline */}
              <div className="space-y-6">
                <h1 className="text-editorial-headline">
                  <span className="block text-shimmer">Your Birth,</span>
                  <span className="block text-primary relative">
                    Your Way
                    <div className="absolute -right-16 top-0 w-24 h-24 rounded-full bg-secondary/20 blur-2xl"></div>
                  </span>
                </h1>
                
                <div className="w-32 h-2 bg-gradient-primary rounded-full shadow-glow"></div>
              </div>
              
              <p className="text-editorial-body max-w-2xl">
                Create a thoughtful birth plan with guidance that feels like having 
                a supportive, experienced friend by your side. 
                <span className="text-primary font-semibold">Professional, empowering, and realistic.</span>
              </p>

              {/* CTAs */}
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row gap-6">
                  <Button 
                    onClick={() => setMode('chat')}
                    className="btn-editorial-primary text-xl px-10 py-8 rounded-2xl group h-auto"
                    size="lg"
                  >
                    <MessageCircle className="w-7 h-7 mr-4 group-hover:rotate-12 transition-transform" />
                    <div className="text-left">
                      <div className="font-bold">Chat Through It</div>
                      <div className="text-sm opacity-90 font-normal">Natural conversation</div>
                    </div>
                  </Button>
                  
                  <Button 
                    onClick={() => setMode('form')}
                    className="btn-editorial-ghost text-xl px-10 py-8 rounded-2xl group h-auto"
                    size="lg"
                  >
                    <FileText className="w-7 h-7 mr-4 group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <div className="font-bold">Fill Out Forms</div>
                      <div className="text-sm opacity-90 font-normal">Step-by-step approach</div>
                    </div>
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column - Quick Preview */}
            <div className="lg:col-span-5 relative">
              {/* Subtle background elements */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 blur-xl"></div>
                <div className="absolute bottom-20 left-5 w-24 h-24 rounded-full bg-gradient-to-br from-secondary/15 to-primary/10 blur-lg"></div>
              </div>
              
              <div className="relative z-10">
                
                {/* Main Floating Card */}
                <div className="bg-card/90 backdrop-blur-sm rounded-3xl p-8 shadow-dramatic hover-lift">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-display font-bold text-2xl mb-2">What you'll create</h3>
                      <p className="text-muted-foreground text-sm">Your complete birth planning toolkit</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-3 h-3 rounded-full bg-gradient-primary mt-1.5 shadow-glow"></div>
                        <p className="text-sm">Personalized birth preferences</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-3 h-3 rounded-full bg-gradient-primary mt-1.5 shadow-glow"></div>
                        <p className="text-sm">Pain management options</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-3 h-3 rounded-full bg-gradient-primary mt-1.5 shadow-glow"></div>
                        <p className="text-sm">Support team preferences</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-3 h-3 rounded-full bg-gradient-primary mt-1.5 shadow-glow"></div>
                        <p className="text-sm">Professional document ready to share</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-3 h-3 rounded-full bg-gradient-primary mt-1.5 shadow-glow"></div>
                        <p className="text-sm">Communication scripts for medical team</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-3 h-3 rounded-full bg-gradient-primary mt-1.5 shadow-glow"></div>
                        <p className="text-sm">Partner advocacy guidance</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-primary shadow-glow hover:scale-110 transition-transform cursor-pointer flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-accent relative">
        <div className="container mx-auto px-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Section Header */}
            <div className="grid lg:grid-cols-3 gap-16 mb-24">
              <div className="lg:col-span-2">
                <h2 className="text-editorial-subhead mb-8 text-white">
                  Why families choose our 
                  <span className="text-white block">birth planning approach</span>
                </h2>
                <p className="text-editorial-large text-white/80">
                  We combine professional expertise with warm, supportive guidance 
                  to help you navigate one of life's most important moments.
                </p>
              </div>
              <div className="flex items-end">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover-lift border border-white/20">
                  <div className="text-3xl font-bold text-white mb-2">95%</div>
                  <div className="text-sm text-white/70">Feel more prepared for birth</div>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
              
              {/* Feature 1 */}
              <div className="bg-white rounded-3xl p-12 shadow-card hover-lift">
                <div className="space-y-6">
                  <h3 className="text-editorial-large text-foreground">Guided Questions That Actually Help</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Our thoughtfully crafted questions help you explore your preferences 
                    without overwhelming medical jargon. We guide you through topics like 
                    pain management, birthing positions, and immediate postpartum care 
                    with warmth and clarity.
                  </p>
                  <div className="flex gap-3">
                    <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">Personalized</span>
                    <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">No Jargon</span>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="bg-white rounded-3xl p-12 shadow-card hover-lift">
                <div className="space-y-6">
                  <h3 className="text-editorial-large text-foreground">Reality Checks</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Gentle, honest insights about what labor might really be like, 
                    so you can plan with realistic expectations. We share what many 
                    first-time parents don't realize, without being scary or discouraging.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="bg-white rounded-3xl p-12 shadow-card hover-lift">
                <div className="space-y-6">
                  <h3 className="text-editorial-large text-foreground">Professional Output</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Generate a clean, professional birth plan that medical staff 
                    will respect and can quickly reference during your labor. No more 
                    wondering if your preferences will be taken seriously.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-12 border border-white/30 hover-lift">
                <div className="space-y-6">
                  <h3 className="text-editorial-large text-white">Communication Confidence</h3>
                  <p className="text-white/80 text-lg leading-relaxed">
                    Learn how to advocate for yourself and communicate with your medical team, 
                    even in challenging moments. We provide scripts and guidance for difficult conversations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-32 bg-primary relative">
        <div className="container mx-auto px-8">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center mb-20">
              <h2 className="text-editorial-hero mb-8 text-white">
                Two ways to create your plan
              </h2>
              <p className="text-editorial-body max-w-3xl mx-auto text-white/80">
                Choose the approach that feels right for you. Both paths lead to the same professional birth plan.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              
              {/* Chat Approach */}
              <div className="bg-white rounded-3xl p-12 shadow-card hover-lift">
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center">
                      <MessageCircle className="w-8 h-8 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-display font-bold text-foreground">Chat Through It</h3>
                      <p className="text-muted-foreground">Natural conversation approach</p>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    Have a guided conversation with our AI that feels like talking to a supportive friend. 
                    Ask questions, share concerns, and get personalized guidance as you work through your preferences.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                      <span className="text-sm text-foreground">Personalized follow-up questions</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                      <span className="text-sm text-foreground">Real-time script generation</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                      <span className="text-sm text-foreground">Flexible, conversational flow</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                      <span className="text-sm text-foreground">Perfect for processing complex feelings</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => setMode('chat')}
                    className="btn-editorial-primary w-full"
                  >
                    Start Chatting →
                  </Button>
                </div>
              </div>

              {/* Form Approach */}
              <div className="bg-white rounded-3xl p-12 shadow-card hover-lift">
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center">
                      <FileText className="w-8 h-8 text-accent-foreground" />
                    </div>
                     <div>
                       <h3 className="text-2xl font-display font-bold text-foreground">Fill Out Forms</h3>
                       <p className="text-muted-foreground">Structured step-by-step</p>
                     </div>
                   </div>
                   
                   <p className="text-muted-foreground leading-relaxed">
                     Work through organized sections at your own pace. Each section includes guidance, 
                     reality checks, and communication scripts tailored to your choices.
                   </p>
                   
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-accent"></div>
                        <span className="text-sm text-foreground">Clear progress tracking</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-accent"></div>
                        <span className="text-sm text-foreground">Organized by topic</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-accent"></div>
                        <span className="text-sm text-foreground">Save and return anytime</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-accent"></div>
                        <span className="text-sm text-foreground">Great for methodical planners</span>
                      </div>
                    </div>
                  
                   <Button 
                     onClick={() => setMode('form')}
                     className="btn-editorial-ghost w-full"
                   >
                     Start Forms →
                   </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-secondary relative">
        {/* Elegant background elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-16 left-16 w-48 h-48 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 rotate-12 blur-lg"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-gradient-to-br from-white/8 to-white/3 blur-md"></div>
          <div className="absolute top-1/3 right-1/4 w-20 h-20 rounded-2xl bg-white/5 rotate-45 blur-sm"></div>
        </div>
        <div className="container mx-auto px-8">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center mb-20">
              <h2 className="text-editorial-hero mb-8 text-white">
                What families are saying
              </h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              
              <div className="bg-white rounded-3xl p-8 shadow-card hover-lift">
                <div className="space-y-6">
                  <Quote className="w-8 h-8 text-accent" />
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    "This made me feel so much more confident about advocating for myself. 
                    I wish every pregnant person had this tool."
                  </p>
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=80&h=80&fit=crop&crop=face" 
                      alt="Sarah M. profile picture" 
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-foreground">Sarah M.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-card hover-lift">
                <div className="space-y-6">
                  <Quote className="w-8 h-8 text-accent" />
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    "Finally, a birth plan tool that doesn't make me feel like I'm just checking boxes. 
                    This actually helped me think through what I really wanted."
                  </p>
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face" 
                      alt="Jessica K. profile picture" 
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-foreground">Jessica K.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-card hover-lift">
                <div className="space-y-6">
                  <Quote className="w-8 h-8 text-accent" />
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    "The communication scripts were game-changing. I felt prepared for 
                    conversations I didn't even know I needed to have."
                  </p>
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face" 
                      alt="Maria L. profile picture" 
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-foreground">Maria L.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-accent">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            
            <div className="text-center mb-20">
              <h2 className="text-editorial-hero mb-8 text-accent-foreground">
                Common questions
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-card overflow-hidden">
                  <button
                    className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                    {openFaq === index ? (
                      <Minus className="w-5 h-5 text-accent" />
                    ) : (
                      <Plus className="w-5 h-5 text-accent" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="px-8 pb-6">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 relative overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent opacity-90"></div>
        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-12">
            <h2 className="text-editorial-hero text-primary-foreground">
              Ready to feel empowered 
              <span className="block">about your birth?</span>
            </h2>
            
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
              Join thousands of families who've created thoughtful, 
              professional birth plans that actually get used.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Button 
                onClick={() => setMode('chat')}
                className="bg-white text-primary hover:bg-white/90 text-xl px-12 py-6 rounded-2xl shadow-dramatic font-display font-bold"
                size="lg"
              >
                <MessageCircle className="w-6 h-6 mr-3" />
                Start Your Birth Plan - It's Free
              </Button>
              <Button 
                onClick={() => setMode('form')}
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-xl px-12 py-6 rounded-2xl font-display font-bold"
                size="lg"
              >
                See a Sample Birth Plan
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card border-t border-border">
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