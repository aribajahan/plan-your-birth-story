import { useState } from "react";
import { BirthPlanWizard } from "@/components/BirthPlanWizard";
import { Button } from "@/components/ui/button";
import { Heart, Baby, Shield } from "lucide-react";

const Index = () => {
  const [showWizard, setShowWizard] = useState(false);

  if (showWizard) {
    return <BirthPlanWizard onBack={() => setShowWizard(false)} />;
  }

  return (
    <div className="min-h-screen gradient-calm">
      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-primary mb-6 shadow-gentle">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-6 text-foreground leading-tight">
              Your Birth, Your Way
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Create a thoughtful birth plan with guidance that feels like having 
              a supportive, experienced friend by your side every step of the way.
            </p>
          </div>

          <Button 
            onClick={() => setShowWizard(true)}
            size="lg"
            className="gradient-hero text-white px-8 py-4 text-lg font-semibold shadow-warm hover:shadow-gentle transition-gentle mb-12"
          >
            Start Your Birth Plan
          </Button>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-card rounded-xl p-8 shadow-card transition-gentle hover:shadow-warm">
              <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4 mx-auto">
                <Baby className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-card-foreground">Guided Questions</h3>
              <p className="text-muted-foreground leading-relaxed">
                Thoughtful prompts that help you think through your preferences 
                without overwhelming medical jargon.
              </p>
            </div>

            <div className="bg-card rounded-xl p-8 shadow-card transition-gentle hover:shadow-warm">
              <div className="w-12 h-12 rounded-lg gradient-secondary flex items-center justify-center mb-4 mx-auto">
                <Shield className="w-6 h-6 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-card-foreground">Reality Checks</h3>
              <p className="text-muted-foreground leading-relaxed">
                Gentle, honest insights about what labor might really be like, 
                so you can plan with realistic expectations.
              </p>
            </div>

            <div className="bg-card rounded-xl p-8 shadow-card transition-gentle hover:shadow-warm">
              <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4 mx-auto">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-card-foreground">Professional Output</h3>
              <p className="text-muted-foreground leading-relaxed">
                Generate a clean, professional birth plan that medical staff 
                will respect and can quickly reference.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;