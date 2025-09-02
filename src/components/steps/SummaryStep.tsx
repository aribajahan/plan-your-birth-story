import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BirthPlanData } from "@/components/BirthPlanWizard";
import { Download, Mail, Edit } from "lucide-react";

interface SummaryStepProps {
  data: BirthPlanData;
  updateData: (stepKey: keyof BirthPlanData, data: any) => void;
}

export const SummaryStep = ({ data }: SummaryStepProps) => {
  const handleDownloadPDF = () => {
    // TODO: Implement PDF generation
    console.log("Downloading PDF...", data);
  };

  const handleEmailPlan = () => {
    // TODO: Implement email functionality
    console.log("Emailing birth plan...", data);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-3">
          Your Personal Birth Plan
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Here's your thoughtful birth plan, ready to share with your medical team. 
          Remember, this is a starting point - you can always adjust during labor.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <Button onClick={handleDownloadPDF} className="gradient-primary text-white shadow-gentle">
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
        <Button onClick={handleEmailPlan} variant="outline" className="shadow-gentle">
          <Mail className="w-4 h-4 mr-2" />
          Email to Me
        </Button>
        <Button onClick={handlePrint} variant="outline" className="shadow-gentle">
          <Edit className="w-4 h-4 mr-2" />
          Print
        </Button>
      </div>

      {/* Birth Plan Summary */}
      <div className="max-w-4xl mx-auto print:max-w-none print:mx-0">
        <Card className="p-8 shadow-card print:shadow-none print:border-0">
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center border-b border-border pb-6 print:pb-4">
              <h1 className="text-2xl font-bold text-card-foreground mb-2">Birth Plan</h1>
              <p className="text-muted-foreground">Prepared with care and thoughtful consideration</p>
            </div>

            {/* Labor Preferences */}
            <div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 flex items-center">
                <span className="w-2 h-6 bg-primary rounded mr-3"></span>
                Labor Preferences
              </h3>
              <div className="space-y-3 ml-5">
                <div>
                  <span className="font-medium text-card-foreground">Birth Experience: </span>
                  <span className="text-muted-foreground capitalize">{data.laborPreferences.environment || 'Not specified'}</span>
                </div>
                {data.laborPreferences.positions.length > 0 && (
                  <div>
                    <span className="font-medium text-card-foreground">Preferred Positions: </span>
                    <span className="text-muted-foreground">{data.laborPreferences.positions.join(', ')}</span>
                  </div>
                )}
                {data.laborPreferences.atmosphere && (
                  <div>
                    <span className="font-medium text-card-foreground">Preferred Atmosphere: </span>
                    <span className="text-muted-foreground">{data.laborPreferences.atmosphere}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Pain Management */}
            <div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 flex items-center">
                <span className="w-2 h-6 bg-secondary-warm rounded mr-3"></span>
                Pain Management
              </h3>
              <div className="space-y-3 ml-5">
                <div>
                  <span className="font-medium text-card-foreground">Approach: </span>
                  <span className="text-muted-foreground capitalize">{data.painManagement.approach || 'Not specified'}</span>
                </div>
                {data.painManagement.specificPreferences.length > 0 && (
                  <div>
                    <span className="font-medium text-card-foreground">Preferred Methods: </span>
                    <span className="text-muted-foreground">{data.painManagement.specificPreferences.join(', ')}</span>
                  </div>
                )}
                {data.painManagement.backupPlan && (
                  <div>
                    <span className="font-medium text-card-foreground">Backup Plan: </span>
                    <span className="text-muted-foreground">{data.painManagement.backupPlan}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Support Team */}
            <div>
              <h3 className="text-xl font-semibold text-card-foreground mb-4 flex items-center">
                <span className="w-2 h-6 bg-accent-deep rounded mr-3"></span>
                Support Team
              </h3>
              <div className="space-y-3 ml-5">
                <div>
                  <span className="font-medium text-card-foreground">Primary Support: </span>
                  <span className="text-muted-foreground capitalize">{data.supportTeam.primarySupport || 'Not specified'}</span>
                </div>
                {data.supportTeam.additionalSupport.length > 0 && (
                  <div>
                    <span className="font-medium text-card-foreground">Additional Support: </span>
                    <span className="text-muted-foreground">{data.supportTeam.additionalSupport.join(', ')}</span>
                  </div>
                )}
                {data.supportTeam.communicationStyle && (
                  <div>
                    <span className="font-medium text-card-foreground">Communication Style: </span>
                    <span className="text-muted-foreground capitalize">{data.supportTeam.communicationStyle}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-border pt-6 print:pt-4 text-center">
              <p className="text-sm text-muted-foreground">
                This birth plan represents my preferences and hopes for labor and delivery. 
                I understand that medical situations may require flexibility, and I trust my medical team 
                to keep me and my baby safe while honoring these preferences when possible.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Encouragement */}
      <div className="text-center mt-12">
        <div className="max-w-2xl mx-auto bg-primary/5 rounded-xl p-6 border border-primary/20">
          <h3 className="text-lg font-semibold text-card-foreground mb-3">
            You're prepared and empowered! 💚
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Remember that birth is unpredictable, and the "best" birth is one where you and your baby are healthy and safe. 
            Trust yourself, trust your team, and know that you have the strength to handle whatever comes your way.
          </p>
        </div>
      </div>
    </div>
  );
};