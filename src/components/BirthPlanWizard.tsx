import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProgressTracker } from "./ProgressTracker";
import { LaborPreferencesStep } from "./steps/LaborPreferencesStep";
import { PainManagementStep } from "./steps/PainManagementStep";
import { SupportTeamStep } from "./steps/SupportTeamStep";
import { SummaryStep } from "./steps/SummaryStep";
import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";

interface BirthPlanWizardProps {
  onBack: () => void;
  onSwitchToChat?: () => void;
}

export interface BirthPlanData {
  laborPreferences: {
    environment: string;
    positions: string[];
    mobility: string;
    atmosphere: string;
    customRequests?: string;
  };
  painManagement: {
    approach: string;
    specificPreferences: string[];
    backupPlan: string;
    specificDetails?: string;
  };
  supportTeam: {
    primarySupport: string;
    primarySupportName: string;
    primarySupportContact: string;
    additionalSupport: string[];
    additionalSupportDetails: { type: string; name: string; contact?: string }[];
    communicationStyle: string;
    specialInstructions: string;
  };
}

const steps = [
  { id: 'labor', title: 'Labor Preferences', component: LaborPreferencesStep },
  { id: 'pain', title: 'Pain Management', component: PainManagementStep },
  { id: 'support', title: 'Support Team', component: SupportTeamStep },
  { id: 'summary', title: 'Your Birth Plan', component: SummaryStep },
];

export const BirthPlanWizard = ({ onBack, onSwitchToChat }: BirthPlanWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [birthPlanData, setBirthPlanData] = useState<BirthPlanData>({
    laborPreferences: {
      environment: '',
      positions: [],
      mobility: '',
      atmosphere: '',
      customRequests: '',
    },
    painManagement: {
      approach: '',
      specificPreferences: [],
      backupPlan: '',
      specificDetails: '',
    },
    supportTeam: {
      primarySupport: '',
      primarySupportName: '',
      primarySupportContact: '',
      additionalSupport: [],
      additionalSupportDetails: [],
      communicationStyle: '',
      specialInstructions: '',
    },
  });

  const updateStepData = (stepKey: keyof BirthPlanData, data: any) => {
    setBirthPlanData(prev => ({
      ...prev,
      [stepKey]: { ...prev[stepKey], ...data }
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  return (
    <div className="min-h-screen gradient-calm">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
          
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-foreground">Create Your Birth Plan</h1>
            <p className="text-muted-foreground">Step {currentStep + 1} of {steps.length}</p>
          </div>
          
          {onSwitchToChat ? (
            <Button 
              variant="outline" 
              onClick={onSwitchToChat}
              className="flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Switch to Chat
            </Button>
          ) : (
            <div className="w-24" />
          )}
        </div>

        {/* Progress Tracker */}
        <ProgressTracker steps={steps} currentStep={currentStep} />

        {/* Step Content */}
        <div className="max-w-4xl mx-auto mt-8">
          <CurrentStepComponent 
            data={birthPlanData}
            updateData={updateStepData}
          />
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 max-w-4xl mx-auto">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={isFirstStep}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>

          {!isLastStep && (
            <Button
              onClick={handleNext}
              className="gradient-primary text-white flex items-center gap-2 shadow-gentle hover:shadow-warm transition-gentle"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};