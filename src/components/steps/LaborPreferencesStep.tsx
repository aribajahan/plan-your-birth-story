import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RealityCheck } from "@/components/RealityCheck";
import { BirthPlanData } from "@/components/BirthPlanWizard";
import { useState } from "react";

interface LaborPreferencesStepProps {
  data: BirthPlanData;
  updateData: (stepKey: keyof BirthPlanData, data: any) => void;
}

export const LaborPreferencesStep = ({ data, updateData }: LaborPreferencesStepProps) => {
  const [customAtmosphere, setCustomAtmosphere] = useState("");

  const environmentOptions = [
    { id: 'natural', label: 'As natural as possible', description: 'Minimal medical intervention' },
    { id: 'flexible', label: 'Open to interventions', description: 'Whatever keeps baby and me safe' },
    { id: 'medical', label: 'Medically managed', description: 'Trust medical professionals completely' },
  ];

  const positionOptions = [
    'Standing/walking', 'Squatting', 'Side-lying', 'Hands and knees', 
    'Birth ball', 'Water birth', 'Hospital bed', 'Whatever feels right'
  ];

  const atmosphereOptions = [
    'Dim lighting', 'Music playing', 'Essential oils', 'Quiet environment', 
    'Family present', 'Photos/video', 'Birth affirmations'
  ];

  const handleEnvironmentChange = (environment: string) => {
    updateData('laborPreferences', { ...data.laborPreferences, environment });
  };

  const handlePositionToggle = (position: string) => {
    const current = data.laborPreferences.positions;
    const updated = current.includes(position) 
      ? current.filter(p => p !== position)
      : [...current, position];
    updateData('laborPreferences', { ...data.laborPreferences, positions: updated });
  };

  const handleAtmosphereChange = (atmosphere: string) => {
    updateData('laborPreferences', { ...data.laborPreferences, atmosphere });
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-3">
          Let's talk about your labor preferences
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          There's no "right" way to give birth. These questions help you think through 
          what might feel most comfortable and empowering for you.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Environment Preference */}
          <Card className="p-6 shadow-card">
            <h3 className="text-xl font-semibold mb-4 text-card-foreground">
              How do you envision your birth experience?
            </h3>
            <p className="text-muted-foreground mb-6">
              Many women have an ideal in mind, but it's wise to stay flexible. 
              What matters most to you about the experience?
            </p>
            
            <div className="space-y-3">
              {environmentOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleEnvironmentChange(option.id)}
                  className={`
                    w-full text-left p-4 rounded-lg border-2 transition-gentle
                    ${data.laborPreferences.environment === option.id
                      ? 'border-primary bg-primary/5 shadow-gentle'
                      : 'border-border hover:border-primary/50 hover:bg-primary/2'
                    }
                  `}
                >
                  <div className="font-medium text-card-foreground">{option.label}</div>
                  <div className="text-sm text-muted-foreground mt-1">{option.description}</div>
                </button>
              ))}
            </div>
          </Card>

          {/* Labor Positions */}
          <Card className="p-6 shadow-card">
            <h3 className="text-xl font-semibold mb-4 text-card-foreground">
              What positions feel appealing to you?
            </h3>
            <p className="text-muted-foreground mb-6">
              You can select multiple options. Remember, what feels good during pregnancy 
              might feel different during labor.
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              {positionOptions.map((position) => (
                <Button
                  key={position}
                  variant={data.laborPreferences.positions.includes(position) ? "default" : "outline"}
                  onClick={() => handlePositionToggle(position)}
                  className="justify-start h-auto p-3 text-left"
                >
                  {position}
                </Button>
              ))}
            </div>
          </Card>

          {/* Atmosphere */}
          <Card className="p-6 shadow-card">
            <h3 className="text-xl font-semibold mb-4 text-card-foreground">
              What kind of atmosphere helps you feel calm?
            </h3>
            <p className="text-muted-foreground mb-6">
              Think about what makes you feel most relaxed and supported.
            </p>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              {atmosphereOptions.map((option) => (
                <Button
                  key={option}
                  variant={data.laborPreferences.atmosphere === option ? "default" : "outline"}
                  onClick={() => handleAtmosphereChange(option)}
                  className="justify-start h-auto p-3 text-left"
                >
                  {option}
                </Button>
              ))}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Or describe your ideal atmosphere:
              </label>
              <Textarea
                value={customAtmosphere}
                onChange={(e) => setCustomAtmosphere(e.target.value)}
                placeholder="Tell us what would make you feel most comfortable and supported..."
                className="min-h-[100px]"
              />
            </div>
          </Card>
        </div>

        {/* Reality Checks Sidebar */}
        <div className="space-y-4">
          <RealityCheck
            title="Many first-time parents don't realize..."
            content="Labor positions you practice might feel impossible in the moment. Having multiple options helps you stay flexible when your body tells you what it needs."
          />
          
          <RealityCheck
            title="About birth environments"
            content="Even with the most detailed plan, hospitals have policies and emergencies happen. Focus on what makes you feel safe and supported rather than controlling every detail."
          />
          
          <RealityCheck
            title="Labor can be unpredictable"
            content="Some women who planned unmedicated births find relief in pain medication, while others surprise themselves with their strength. Both outcomes are perfectly valid."
          />
        </div>
      </div>
    </div>
  );
};