import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RealityCheck } from "@/components/RealityCheck";
import { BirthPlanData } from "@/components/BirthPlanWizard";
import { useState } from "react";

interface PainManagementStepProps {
  data: BirthPlanData;
  updateData: (stepKey: keyof BirthPlanData, data: any) => void;
}

export const PainManagementStep = ({ data, updateData }: PainManagementStepProps) => {
  const [customBackupPlan, setCustomBackupPlan] = useState("");

  const painApproaches = [
    { 
      id: 'natural', 
      label: 'Unmedicated birth', 
      description: 'Using breathing, movement, and natural coping techniques' 
    },
    { 
      id: 'flexible', 
      label: 'Open to pain relief', 
      description: 'Start naturally but open to medication if needed' 
    },
    { 
      id: 'epidural', 
      label: 'Plan for epidural', 
      description: 'Request pain medication when active labor begins' 
    },
    { 
      id: 'undecided', 
      label: 'I\'m not sure yet', 
      description: 'Want to learn more about all options' 
    },
  ];

  const naturalMethods = [
    'Breathing techniques', 'Water therapy', 'Massage', 'Position changes',
    'Birth ball', 'Visualization', 'Music/aromatherapy', 'Hot/cold therapy'
  ];

  const medicalOptions = [
    'Epidural', 'Nitrous oxide (laughing gas)', 'IV pain medication', 
    'Spinal block', 'Local anesthesia', 'TENS unit'
  ];

  const handleApproachChange = (approach: string) => {
    updateData('painManagement', { ...data.painManagement, approach });
  };

  const handlePreferenceToggle = (preference: string) => {
    const current = data.painManagement.specificPreferences;
    const updated = current.includes(preference) 
      ? current.filter(p => p !== preference)
      : [...current, preference];
    updateData('painManagement', { ...data.painManagement, specificPreferences: updated });
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-3">
          Let's talk about pain management
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Many women feel conflicted about pain medication. It's okay to want both 
          'natural birth' AND pain relief if you need it. What matters most to you?
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Pain Management Approach */}
          <Card className="p-6 shadow-card">
            <h3 className="text-xl font-semibold mb-4 text-card-foreground">
              What's your general approach to pain management?
            </h3>
            <p className="text-muted-foreground mb-6">
              Remember, you can change your mind during labor. This helps your team 
              understand your starting preference.
            </p>
            
            <div className="space-y-3">
              {painApproaches.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleApproachChange(option.id)}
                  className={`
                    w-full text-left p-4 rounded-lg border-2 transition-gentle
                    ${data.painManagement.approach === option.id
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

          {/* Specific Methods */}
          {(data.painManagement.approach === 'natural' || data.painManagement.approach === 'flexible') && (
            <Card className="p-6 shadow-card">
              <h3 className="text-xl font-semibold mb-4 text-card-foreground">
                Natural pain management methods that interest you
              </h3>
              <p className="text-muted-foreground mb-6">
                Select any methods you'd like to try. Your support team can help remind you of these options.
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                {naturalMethods.map((method) => (
                  <Button
                    key={method}
                    variant={data.painManagement.specificPreferences.includes(method) ? "default" : "outline"}
                    onClick={() => handlePreferenceToggle(method)}
                    className="justify-start h-auto p-3 text-left"
                  >
                    {method}
                  </Button>
                ))}
              </div>
            </Card>
          )}

          {(data.painManagement.approach === 'epidural' || data.painManagement.approach === 'flexible') && (
            <Card className="p-6 shadow-card">
              <h3 className="text-xl font-semibold mb-4 text-card-foreground">
                Medical pain relief options to discuss
              </h3>
              <p className="text-muted-foreground mb-6">
                These are options you can discuss with your medical team before or during labor.
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                {medicalOptions.map((option) => (
                  <Button
                    key={option}
                    variant={data.painManagement.specificPreferences.includes(option) ? "default" : "outline"}
                    onClick={() => handlePreferenceToggle(option)}
                    className="justify-start h-auto p-3 text-left"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </Card>
          )}

          {/* Backup Plan */}
          <Card className="p-6 shadow-card">
            <h3 className="text-xl font-semibold mb-4 text-card-foreground">
              If your pain management plan isn't working...
            </h3>
            <p className="text-muted-foreground mb-6">
              What would you want your support team to remind you of? What backup options feel right to you?
            </p>
            
            <Textarea
              value={customBackupPlan}
              onChange={(e) => setCustomBackupPlan(e.target.value)}
              placeholder="For example: 'Remind me I'm stronger than I think' or 'Help me explore all my options before making changes' or 'I trust my body to tell me what I need'..."
              className="min-h-[120px]"
            />
          </Card>
        </div>

        {/* Reality Checks Sidebar */}
        <div className="space-y-4">
          <RealityCheck
            title="About pain in labor"
            content="Labor pain is different from injury pain - it has a purpose and comes in waves with breaks. Many women find it more manageable than they expected, while others find relief in medication. Both experiences are normal."
          />
          
          <RealityCheck
            title="Changing your mind is normal"
            content="Even women with strong preferences about pain management sometimes change their minds during labor. A good birth plan acknowledges this possibility without shame."
          />
          
          <RealityCheck
            title="Timing matters"
            content="Some pain relief options aren't available at all stages of labor. Discussing timing with your provider beforehand helps set realistic expectations."
          />
          
          <RealityCheck
            title="Your support team's role"
            content="Partners and doulas can help you work through difficult moments, but they can't take away your pain. Consider what kind of support feels most helpful to you."
          />
        </div>
      </div>
    </div>
  );
};