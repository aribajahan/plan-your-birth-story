import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BirthPlanData } from "@/components/BirthPlanWizard";
import { Download, Mail, Printer, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { generateBirthPlanPDF, transformToPDFData } from "@/utils/pdfGenerator";
import { BirthPlanService } from "@/services/birth-plan-service";
import { supabase } from "@/integrations/supabase/client";

interface SummaryStepProps {
  data: BirthPlanData;
  updateData: (stepKey: keyof BirthPlanData, data: any) => void;
}

export const SummaryStep = ({ data }: SummaryStepProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [showEmailInput, setShowEmailInput] = useState(false);

  const handleDownloadPDF = async () => {
    try {
      setIsLoading(true);
      
      // Transform birth plan data to PDF format
      const liveBirthPlan = BirthPlanService.transformToLiveBirthPlan(data);
      const pdfData = transformToPDFData(liveBirthPlan);
      
      // Generate and download PDF
      generateBirthPlanPDF(pdfData);
      
      // Save to database and mark as exported
      const savedPlan = await BirthPlanService.saveBirthPlan(data);
      await BirthPlanService.markAsExported(savedPlan.id, 'pdf');
      
      toast.success("Birth plan PDF downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailPlan = async () => {
    if (!emailAddress.trim()) {
      toast.error("Please enter an email address");
      return;
    }

    try {
      setIsLoading(true);
      
      // Save birth plan first
      const savedPlan = await BirthPlanService.saveBirthPlan(data);
      
      // Send email via edge function
      const { data: emailResult, error } = await supabase.functions.invoke('send-birth-plan', {
        body: {
          email: emailAddress.trim(),
          birthPlanData: data,
          birthPlanId: savedPlan.id
        }
      });

      if (error) {
        throw error;
      }

      // Mark as exported
      await BirthPlanService.markAsExported(savedPlan.id, 'email');
      
      toast.success(`Birth plan sent to ${emailAddress}!`);
      setEmailAddress("");
      setShowEmailInput(false);
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePlan = async () => {
    try {
      setIsLoading(true);
      await BirthPlanService.saveBirthPlan(data);
      toast.success("Birth plan saved successfully!");
    } catch (error) {
      console.error("Error saving birth plan:", error);
      toast.error("Failed to save birth plan. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
        <Button 
          onClick={handleDownloadPDF} 
          disabled={isLoading}
          className="gradient-primary text-white shadow-gentle"
        >
          <Download className="w-4 h-4 mr-2" />
          {isLoading ? "Generating..." : "Download PDF"}
        </Button>
        
        <Button 
          onClick={() => setShowEmailInput(!showEmailInput)} 
          variant="outline" 
          className="shadow-gentle"
        >
          <Mail className="w-4 h-4 mr-2" />
          Email Plan
        </Button>
        
        <Button 
          onClick={handleSavePlan} 
          disabled={isLoading}
          variant="outline" 
          className="shadow-gentle"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Plan
        </Button>
        
        <Button onClick={handlePrint} variant="outline" className="shadow-gentle">
          <Printer className="w-4 h-4 mr-2" />
          Print
        </Button>
      </div>

      {/* Email Input */}
      {showEmailInput && (
        <div className="max-w-md mx-auto mb-8 p-4 bg-background border border-border rounded-lg shadow-gentle">
          <label className="block text-sm font-medium text-foreground mb-2">
            Email Address
          </label>
          <div className="flex gap-2">
            <input
              type="email"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button 
              onClick={handleEmailPlan} 
              disabled={isLoading || !emailAddress.trim()}
              className="gradient-primary text-white"
            >
              {isLoading ? "Sending..." : "Send"}
            </Button>
          </div>
        </div>
      )}

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