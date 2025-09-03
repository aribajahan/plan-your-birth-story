import { useState } from "react";
import { BirthPlanWizard } from "@/components/BirthPlanWizard";
import { ChatBirthPlan } from "@/components/ChatBirthPlan";
import { Button } from "@/components/ui/button";
import { Heart, Baby, Shield, MessageCircle, FileText, Star, Sparkles, Award } from "lucide-react";

const Index = () => {
  const [mode, setMode] = useState<'home' | 'chat' | 'form'>('home');

  if (mode === 'chat') {
    return <ChatBirthPlan onBack={() => setMode('home')} onSwitchToForm={() => setMode('form')} />;
  }

  if (mode === 'form') {
    return <BirthPlanWizard onBack={() => setMode('home')} onSwitchToChat={() => setMode('chat')} />;
  }

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Dramatic Hero Section - Magazine Editorial Style */}
      <section className="relative min-h-screen flex items-center">
        {/* Background Elements */}
        <div className="absolute inset-0 gradient-radial"></div>
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-accent/10 blur-3xl"></div>
        
        <div className="container mx-auto px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center min-h-screen py-20">
            
            {/* Left Column - Bold Typography */}
            <div className="lg:col-span-7 space-y-12">
              {/* Floating Badge */}
              <div className="inline-flex items-center gap-3 bg-card/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-card hover-glow transition-smooth">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="font-display font-semibold text-primary">Trusted by 1000+ families</span>
              </div>
              
              {/* Massive Headline */}
              <div className="space-y-6">
                <h1 className="text-editorial-headline">
                  <span className="block text-shimmer">Your</span>
                  <span className="block text-primary">Birth,</span>
                  <span className="block text-accent relative">
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

              {/* Bold Action Section */}
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
                
                {/* Trust Indicators */}
                <div className="flex items-center gap-8 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background"></div>
                      <div className="w-8 h-8 rounded-full bg-secondary/20 border-2 border-background"></div>
                      <div className="w-8 h-8 rounded-full bg-accent/20 border-2 border-background"></div>
                    </div>
                    <span className="text-sm font-medium">1000+ happy families</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-accent text-accent" />
                    <span className="text-sm font-medium">4.9/5 rating</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Floating Card */}
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
                        <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                        <p className="text-sm">Personalized birth preferences</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-secondary mt-2"></div>
                        <p className="text-sm">Pain management options</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-accent mt-2"></div>
                        <p className="text-sm">Support team preferences</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary/60 mt-2"></div>
                        <p className="text-sm">Professional document ready to share</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-accent flex items-center justify-center shadow-glow hover:rotate-12 transition-transform cursor-pointer">
                  <Award className="w-8 h-8 text-accent-foreground" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Magazine-Style Feature Section */}
      <section className="py-32 bg-gradient-editorial">
        <div className="container mx-auto px-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Section Header - Asymmetric */}
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

            {/* Asymmetric Feature Grid */}
            <div className="grid lg:grid-cols-12 gap-8">
              
              {/* Large Feature Card */}
              <div className="lg:col-span-8">
                <div className="bg-card rounded-3xl p-12 shadow-card hover-lift h-full">
                  <div className="flex items-start gap-8">
                    <div className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center shadow-glow flex-shrink-0">
                      <Baby className="w-10 h-10 text-primary-foreground" />
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
                        <span className="px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-medium">No Jargon</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Smaller Feature Cards */}
              <div className="lg:col-span-4 space-y-8">
                <div className="bg-card rounded-3xl p-8 shadow-card hover-lift">
                  <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mb-6 shadow-glow">
                    <Shield className="w-8 h-8 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-4 text-card-foreground">Reality Checks</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Gentle, honest insights about what labor might really be like, 
                    so you can plan with realistic expectations.
                  </p>
                </div>

                <div className="bg-primary/5 backdrop-blur-sm rounded-3xl p-8 border border-primary/20 hover-lift">
                  <div className="w-16 h-16 rounded-2xl gradient-secondary flex items-center justify-center mb-6 shadow-glow">
                    <Heart className="w-8 h-8 text-secondary-foreground" />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-4 text-primary">Professional Output</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Generate a clean, professional birth plan that medical staff 
                    will respect and can quickly reference during your labor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bold Closing Statement */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10"></div>
        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-12">
            <h2 className="text-editorial-hero">
              Birth planning should feel 
              <span className="text-primary block">empowering</span>
              <span className="text-muted-foreground text-4xl lg:text-5xl block mt-4">not overwhelming</span>
            </h2>
            
            <p className="text-editorial-body max-w-3xl mx-auto">
              Whether you're a detailed planner or prefer to go with the flow, 
              we'll help you create a birth plan that truly reflects your values 
              and gives you confidence for your big day.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Button 
                onClick={() => setMode('chat')}
                className="btn-editorial-primary text-xl px-12 py-6 rounded-2xl"
                size="lg"
              >
                Start Your Birth Plan
              </Button>
              <Button 
                onClick={() => setMode('form')}
                className="btn-editorial-secondary text-xl px-12 py-6 rounded-2xl"
                size="lg"
              >
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