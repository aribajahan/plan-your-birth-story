import { Check } from "lucide-react";

interface Step {
  id: string;
  title: string;
}

interface ProgressTrackerProps {
  steps: Step[];
  currentStep: number;
}

export const ProgressTracker = ({ steps, currentStep }: ProgressTrackerProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex items-center">
              {/* Step Circle */}
              <div className={`
                flex items-center justify-center w-8 h-8 rounded-full transition-gentle
                ${index < currentStep 
                  ? 'bg-primary text-white shadow-gentle' 
                  : index === currentStep 
                    ? 'gradient-primary text-white shadow-gentle' 
                    : 'bg-muted text-muted-foreground'
                }
              `}>
                {index < currentStep ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              
              {/* Step Title */}
              <div className="ml-3">
                <p className={`
                  text-sm font-medium transition-gentle
                  ${index <= currentStep ? 'text-foreground' : 'text-muted-foreground'}
                `}>
                  {step.title}
                </p>
              </div>
            </div>
            
            {/* Progress Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 mx-4">
                <div className="h-0.5 bg-muted relative">
                  <div 
                    className={`
                      h-full transition-gentle duration-500
                      ${index < currentStep ? 'bg-primary' : 'bg-transparent'}
                    `}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};