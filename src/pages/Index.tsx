import { useState } from "react";
import { BirthPlanWizard } from "@/components/BirthPlanWizard";
import { ChatBirthPlan } from "@/components/ChatBirthPlan";
import { Button } from "@/components/ui/button";
import { Heart, Baby, Shield, MessageCircle, FileText, Star, Sparkles, Award, Users, CheckCircle, Quote, ArrowRight, Plus, Minus } from "lucide-react";

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
      question: "How long does it take to create a birth plan?",
      answer: "Most people complete their birth plan in 15-30 minutes. The chat approach feels like a natural conversation, while the form takes a more structured approach."
    },
    {
      question: "Can I change my birth plan after creating it?",
      answer: "Absolutely! Birth preferences can evolve throughout pregnancy. You can return anytime to update your plan as your thoughts and circumstances change."
    },
    {
      question: "Will my doctor/midwife respect this birth plan?",
      answer: "Yes! Our plans are written in professional language that healthcare providers understand and appreciate. They're concise, clear, and focus on your key preferences."
    },
    {
      question: "What if I don't know what I want yet?",
      answer: "That's completely normal! Our guided questions help you explore your options and preferences. You don't need to have everything figured out before you start."
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
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                        <Heart className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-lg">Quick Preview</h3>
                        <p className="text-muted-foreground text-sm">What you'll create</p>
                      </div>
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
            <div className="text-center mb-20">
              <h2 className="text-editorial-hero mb-8">
                4 Ways We Make 
                <span className="text-primary block">Birth Planning Better</span>
              </h2>
              <p className="text-editorial-body max-w-3xl mx-auto">
                We combine professional expertise with warm, supportive guidance 
                to help you navigate one of life's most important moments.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
              
              {/* Feature 1 */}
              <div className="bg-card rounded-3xl p-12 shadow-card hover-lift">
                <div className="flex items-start gap-8">
                  <div className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center shadow-glow flex-shrink-0">
                    <Baby className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-editorial-large text-card-foreground">Guided Questions That Actually Help</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Our thoughtfully crafted questions help you explore your preferences 
                      without overwhelming medical jargon. Clear, supportive, and comprehensive.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="bg-card rounded-3xl p-12 shadow-card hover-lift">
                <div className="flex items-start gap-8">
                  <div className="w-20 h-20 rounded-3xl bg-accent flex items-center justify-center shadow-glow flex-shrink-0">
                    <Shield className="w-10 h-10 text-accent-foreground" />
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-editorial-large text-card-foreground">Reality Checks</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Gentle, honest insights about what labor might really be like, 
                      so you can plan with realistic expectations and flexibility.
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
                      will respect and can quickly reference during your labor.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="bg-primary/5 backdrop-blur-sm rounded-3xl p-12 border border-primary/20 hover-lift">
                <div className="flex items-start gap-8">
                  <div className="w-20 h-20 rounded-3xl gradient-primary flex items-center justify-center shadow-glow flex-shrink-0">
                    <MessageCircle className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-editorial-large text-primary">Supportive Guidance</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Feel like you have an experienced friend by your side, 
                      offering encouragement and practical wisdom throughout the process.
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
                How It Works
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
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                        <span className="text-primary font-bold text-sm">1</span>
                      </div>
                      <p>Start a conversation with Maya, your AI birth planning companion</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                        <span className="text-primary font-bold text-sm">2</span>
                      </div>
                      <p>Share your thoughts, concerns, and preferences naturally</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                        <span className="text-primary font-bold text-sm">3</span>
                      </div>
                      <p>Get your personalized birth plan instantly</p>
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
                      <p className="text-muted-foreground">Step-by-step structured approach</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center mt-1">
                        <span className="text-accent font-bold text-sm">1</span>
                      </div>
                      <p>Work through organized sections at your own pace</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center mt-1">
                        <span className="text-accent font-bold text-sm">2</span>
                      </div>
                      <p>Answer specific questions about each aspect of birth</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center mt-1">
                        <span className="text-accent font-bold text-sm">3</span>
                      </div>
                      <p>Review and refine your complete birth plan</p>
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
                What Families Say
              </h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              
              <div className="bg-card rounded-3xl p-8 shadow-card hover-lift">
                <div className="space-y-6">
                  <Quote className="w-8 h-8 text-primary" />
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    "This made birth planning feel manageable instead of overwhelming. 
                    The questions helped me think through things I hadn't even considered."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20"></div>
                    <div>
                      <p className="font-semibold">Sarah M.</p>
                      <p className="text-sm text-muted-foreground">First-time mom</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-3xl p-8 shadow-card hover-lift">
                <div className="space-y-6">
                  <Quote className="w-8 h-8 text-primary" />
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    "My midwife loved how clear and organized my birth plan was. 
                    It made our conversations so much more focused and productive."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/20"></div>
                    <div>
                      <p className="font-semibold">Jessica R.</p>
                      <p className="text-sm text-muted-foreground">Second baby</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-3xl p-8 shadow-card hover-lift">
                <div className="space-y-6">
                  <Quote className="w-8 h-8 text-primary" />
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    "I recommend this to all my clients. It helps them articulate 
                    their preferences in a way that's both personal and professional."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary/20"></div>
                    <div>
                      <p className="font-semibold">Maria L.</p>
                      <p className="text-sm text-muted-foreground">Birth doula</p>
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
                Common Questions
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
              Ready to create your 
              <span className="block">birth plan?</span>
            </h2>
            
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
              Join thousands of families who've created thoughtful, 
              professional birth plans with confidence and clarity.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Button 
                onClick={() => setMode('chat')}
                className="bg-white text-primary hover:bg-white/90 text-xl px-12 py-6 rounded-2xl shadow-dramatic font-display font-bold"
                size="lg"
              >
                <MessageCircle className="w-6 h-6 mr-3" />
                Start Your Birth Plan
              </Button>
              <Button 
                onClick={() => setMode('form')}
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-xl px-12 py-6 rounded-2xl font-display font-bold"
                size="lg"
              >
                <FileText className="w-6 h-6 mr-3" />
                Explore Options
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;