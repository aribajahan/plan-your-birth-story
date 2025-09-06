import { useState } from "react";
import { BirthPlanWizard } from "@/components/BirthPlanWizard";
import { ChatBirthPlan } from "@/components/ChatBirthPlan";
import { Button } from "@/components/ui/button";
import { Heart, Baby, Shield, MessageCircle, FileText, Star, Sparkles, Award, Users, CheckCircle, Quote, ArrowRight, Plus, Minus, MessageSquare, Lightbulb, Megaphone } from "lucide-react";

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
    <div className="min-h-screen bg-background overflow-hidden">
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
                  <Users className="w-4 h-4 text-primary" />
                  <span>Trusted by 1000+ families</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-primary text-primary" />
                  <span>4.9/5 rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-primary" />
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
            <div className="lg:col-span-5">
              <div className="relative">
                {/* Main Floating Card */}
                <div className="bg-card/90 backdrop-blur-sm rounded-3xl p-8 shadow-dramatic hover-lift">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-display font-bold text-2xl mb-2">What you'll create</h3>
                      <p className="text-muted-foreground text-sm">Your complete birth planning toolkit</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-1" />
                        <p className="text-sm">Personalized birth preferences</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-1" />
                        <p className="text-sm">Pain management options</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-1" />
                        <p className="text-sm">Support team preferences</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-1" />
                        <p className="text-sm">Professional document ready to share</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-1" />
                        <p className="text-sm">Communication scripts for medical team</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-1" />
                        <p className="text-sm">Partner advocacy guidance</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-accent flex items-center justify-center shadow-glow hover:rotate-12 transition-transform cursor-pointer">
                  <Sparkles className="w-8 h-8 text-accent-foreground" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-gradient-editorial">
        <div className="container mx-auto px-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Section Header */}
            <div className="grid lg:grid-cols-3 gap-16 mb-24">
              <div className="lg:col-span-2">
                <h2 className="text-editorial-subhead mb-8">
                  Why families choose our 
                  <span className="text-primary block">birth planning approach</span>
                </h2>
                <p className="text-editorial-large text-muted-foreground">
                  We combine professional expertise with warm, supportive guidance 
                  to help you navigate one of life's most important moments.
                </p>
              </div>
              <div className="flex items-end">
                <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-6 hover-lift">
                  <div className="text-3xl font-bold text-primary mb-2">95%</div>
                  <div className="text-sm text-muted-foreground">Feel more prepared for birth</div>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
              
              {/* Feature 1 */}
              <div className="bg-card rounded-3xl p-12 shadow-card hover-lift">
                <div className="flex items-start gap-8">
                  <div className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center shadow-glow flex-shrink-0">
                    <MessageSquare className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-editorial-large text-card-foreground">Guided Questions That Actually Help</h3>
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
              </div>

              {/* Feature 2 */}
              <div className="bg-card rounded-3xl p-12 shadow-card hover-lift">
                <div className="flex items-start gap-8">
                  <div className="w-20 h-20 rounded-3xl bg-accent flex items-center justify-center shadow-glow flex-shrink-0">
                    <Lightbulb className="w-10 h-10 text-accent-foreground" />
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-editorial-large text-card-foreground">Reality Checks</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Gentle, honest insights about what labor might really be like, 
                      so you can plan with realistic expectations. We share what many 
                      first-time parents don't realize, without being scary or discouraging.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="bg-card rounded-3xl p-12 shadow-card hover-lift">
                <div className="flex items-start gap-8">
                  <div className="w-20 h-20 rounded-3xl bg-secondary flex items-center justify-center shadow-glow flex-shrink-0">
                    <Heart className="w-10 h-10 text-secondary-foreground" />
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-editorial-large text-card-foreground">Professional Output</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Generate a clean, professional birth plan that medical staff 
                      will respect and can quickly reference during your labor. No more 
                      wondering if your preferences will be taken seriously.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="bg-primary/5 backdrop-blur-sm rounded-3xl p-12 border border-primary/20 hover-lift">
                <div className="flex items-start gap-8">
                  <div className="w-20 h-20 rounded-3xl gradient-primary flex items-center justify-center shadow-glow flex-shrink-0">
                    <Megaphone className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-editorial-large text-primary">Communication Confidence</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Learn how to advocate for yourself and communicate with your medical team, 
                      even in challenging moments. We provide scripts and guidance for difficult conversations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-32">
        <div className="container mx-auto px-8">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center mb-20">
              <h2 className="text-editorial-hero mb-8">
                Two ways to create your plan
              </h2>
              <p className="text-editorial-body max-w-3xl mx-auto">
                Choose the approach that feels right for you. Both paths lead to the same professional birth plan.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              
              {/* Chat Approach */}
              <div className="bg-card rounded-3xl p-12 shadow-card hover-lift">
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center">
                      <MessageCircle className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-display font-bold">Chat Through It</h3>
                      <p className="text-muted-foreground">Natural conversation approach</p>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    Have a guided conversation with our AI that feels like talking to a supportive friend. 
                    Ask questions, share concerns, and get personalized guidance as you work through your preferences.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span className="text-sm">Personalized follow-up questions</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span className="text-sm">Real-time script generation</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span className="text-sm">Flexible, conversational flow</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span className="text-sm">Perfect for processing complex feelings</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => setMode('chat')}
                    className="btn-editorial-primary w-full"
                  >
                    Start Chatting
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>

              {/* Form Approach */}
              <div className="bg-card rounded-3xl p-12 shadow-card hover-lift">
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center">
                      <FileText className="w-8 h-8 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-display font-bold">Fill Out Forms</h3>
                      <p className="text-muted-foreground">Structured step-by-step</p>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    Work through organized sections at your own pace. Each section includes guidance, 
                    reality checks, and communication scripts tailored to your choices.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-accent" />
                      <span className="text-sm">Clear progress tracking</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-accent" />
                      <span className="text-sm">Organized by topic</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-accent" />
                      <span className="text-sm">Save and return anytime</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-accent" />
                      <span className="text-sm">Great for methodical planners</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => setMode('form')}
                    className="btn-editorial-ghost w-full"
                  >
                    Start Forms
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-gradient-editorial">
        <div className="container mx-auto px-8">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center mb-20">
              <h2 className="text-editorial-hero mb-8">
                What families are saying
              </h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              
              <div className="bg-card rounded-3xl p-8 shadow-card hover-lift">
                <div className="space-y-6">
                  <Quote className="w-8 h-8 text-primary" />
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    "This made me feel so much more confident about advocating for myself. 
                    I wish every pregnant person had this tool."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20"></div>
                    <div>
                      <p className="font-semibold">Sarah M.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-3xl p-8 shadow-card hover-lift">
                <div className="space-y-6">
                  <Quote className="w-8 h-8 text-primary" />
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    "Finally, a birth plan tool that doesn't make me feel like I'm just checking boxes. 
                    This actually helped me think through what I really wanted."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/20"></div>
                    <div>
                      <p className="font-semibold">Jessica K.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-3xl p-8 shadow-card hover-lift">
                <div className="space-y-6">
                  <Quote className="w-8 h-8 text-primary" />
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    "The communication scripts were game-changing. I felt prepared for 
                    conversations I didn't even know I needed to have."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary/20"></div>
                    <div>
                      <p className="font-semibold">Maria L.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            
            <div className="text-center mb-20">
              <h2 className="text-editorial-hero mb-8">
                Common questions
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-card rounded-2xl shadow-card overflow-hidden">
                  <button
                    className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <h3 className="text-lg font-semibold">{faq.question}</h3>
                    {openFaq === index ? (
                      <Minus className="w-5 h-5 text-primary" />
                    ) : (
                      <Plus className="w-5 h-5 text-primary" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="px-8 pb-6">
                      <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
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
      <footer className="py-16 bg-card border-t border-border">
        <div className="container mx-auto px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-8">
              
              {/* Brand & Mission */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <Heart className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <span className="text-2xl font-display font-bold">Your Birth, Your Way</span>
                </div>
                <p className="text-muted-foreground max-w-md">
                  Empowering families to create thoughtful, professional birth plans 
                  with confidence and clarity.
                </p>
                
                {/* Social Proof */}
                <div className="space-y-3 pt-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Award className="w-4 h-4 text-primary" />
                    <span>Recommended by doulas nationwide</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Star className="w-4 h-4 text-primary" />
                    <span>Featured in relevant publications</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="w-4 h-4 text-primary" />
                    <span>Trusted by birthing centers</span>
                  </div>
                </div>
              </div>

              {/* Links */}
              <div className="space-y-4">
                <h4 className="font-display font-semibold">Resources</h4>
                <div className="space-y-3">
                  <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">About Us</a>
                  <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
                  <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Contact</a>
                  <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Resources</a>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-display font-semibold">Professionals</h4>
                <div className="space-y-3">
                  <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">For Healthcare Providers</a>
                  <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">For Doulas</a>
                  <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Birthing Centers</a>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-border mt-12 pt-8 text-center">
              <p className="text-muted-foreground text-sm">
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