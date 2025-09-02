import { useState } from "react";
import { BirthPlanWizard } from "@/components/BirthPlanWizard";
import { ChatBirthPlan } from "@/components/ChatBirthPlan";
import { Button } from "@/components/ui/button";
import { Heart, Baby, Shield, MessageCircle, FileText } from "lucide-react";

const Index = () => {
  const [mode, setMode] = useState<'home' | 'chat' | 'form'>('home');

  if (mode === 'chat') {
    return <ChatBirthPlan onBack={() => setMode('home')} onSwitchToForm={() => setMode('form')} />;
  }

  if (mode === 'form') {
    return <BirthPlanWizard onBack={() => setMode('home')} onSwitchToChat={() => setMode('chat')} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Editorial Hero Section - Bold and Magazine-Style */}
      <main className="container mx-auto px-8 py-24">
        <div className="max-w-6xl mx-auto">
          
          {/* Bold Editorial Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary mb-12 shadow-editorial">
              <Heart className="w-12 h-12 text-primary-foreground" />
            </div>
            
            <h1 className="text-editorial-headline mb-8">
              Your Birth,<br/>
              <span className="text-accent">Your Way</span>
            </h1>
            
            <p className="text-editorial-body max-w-3xl mx-auto mb-16">
              Create a thoughtful birth plan with guidance that feels like having 
              a supportive, experienced friend by your side. Professional, empowering, and realistic.
            </p>

            {/* Bold Editorial CTAs */}
            <div className="flex flex-col lg:flex-row gap-8 items-center justify-center mb-8">
              <Button 
                onClick={() => setMode('chat')}
                className="btn-editorial-primary text-xl px-12 py-6 min-w-72 group"
              >
                <MessageCircle className="w-6 h-6 mr-4 group-hover:scale-110 transition-transform" />
                Chat Through It
              </Button>
              
              <div className="flex items-center">
                <div className="w-12 h-px bg-border mx-4"></div>
                <span className="text-muted-foreground font-display font-medium">or</span>
                <div className="w-12 h-px bg-border mx-4"></div>
              </div>
              
              <Button 
                onClick={() => setMode('form')}
                className="btn-editorial-secondary text-xl px-12 py-6 min-w-72 group"
              >
                <FileText className="w-6 h-6 mr-4 group-hover:scale-110 transition-transform" />
                Fill Out Forms
              </Button>
            </div>
            
            {/* Editorial Explanation */}
            <div className="max-w-4xl mx-auto bg-card rounded-3xl p-8 shadow-card mt-16">
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div className="border-r border-border pr-8">
                  <h4 className="font-display font-bold text-primary text-xl mb-3">Chat Through It</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Natural conversation with gentle guidance, voice support, and personalized recommendations 
                    that adapt to your responses.
                  </p>
                </div>
                <div className="pl-8 md:pl-0">
                  <h4 className="font-display font-bold text-accent text-xl mb-3">Fill Out Forms</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Traditional step-by-step approach with structured questions 
                    for those who prefer systematic planning.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Editorial Feature Grid - Magazine Layout */}
          <div className="grid lg:grid-cols-3 gap-12 mt-32">
            
            {/* Feature 1 - Guided Questions */}
            <div className="group">
              <div className="bg-card rounded-3xl p-12 shadow-card hover:shadow-confident transition-editorial mb-8">
                <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-8 shadow-editorial">
                  <Baby className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-editorial-subhead mb-6 text-card-foreground">Guided Questions</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Thoughtful prompts that help you explore your preferences 
                  without overwhelming medical jargon.
                </p>
              </div>
            </div>

            {/* Feature 2 - Reality Checks */}
            <div className="group">
              <div className="bg-card rounded-3xl p-12 shadow-card hover:shadow-confident transition-editorial mb-8">
                <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mb-8 shadow-editorial">
                  <Shield className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="text-editorial-subhead mb-6 text-card-foreground">Reality Checks</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Gentle, honest insights about what labor might really be like, 
                  so you can plan with realistic expectations.
                </p>
              </div>
            </div>

            {/* Feature 3 - Professional Output */}
            <div className="group">
              <div className="bg-card rounded-3xl p-12 shadow-card hover:shadow-confident transition-editorial mb-8">
                <div className="w-16 h-16 rounded-2xl gradient-secondary flex items-center justify-center mb-8 shadow-editorial">
                  <Heart className="w-8 h-8 text-secondary-foreground" />
                </div>
                <h3 className="text-editorial-subhead mb-6 text-card-foreground">Professional Output</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Generate a clean, professional birth plan that medical staff 
                  will respect and can quickly reference.
                </p>
              </div>
            </div>
          </div>

          {/* Editorial Confidence Statement */}
          <div className="text-center mt-32 py-20 gradient-editorial rounded-3xl">
            <h2 className="text-editorial-subhead mb-8 max-w-3xl mx-auto">
              Birth planning should feel <span className="text-primary">empowering</span>, 
              not overwhelming
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Whether you're a planner or prefer to go with the flow, 
              we'll help you create a birth plan that truly reflects your values.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;