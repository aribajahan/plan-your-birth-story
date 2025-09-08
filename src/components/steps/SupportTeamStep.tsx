import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RealityCheck } from "@/components/RealityCheck";
import { BirthPlanData } from "@/components/BirthPlanWizard";
import { useState } from "react";
import { Trash2, Plus } from "lucide-react";

interface SupportTeamStepProps {
  data: BirthPlanData;
  updateData: (stepKey: keyof BirthPlanData, data: any) => void;
}

export const SupportTeamStep = ({ data, updateData }: SupportTeamStepProps) => {
  const [newAdditionalSupport, setNewAdditionalSupport] = useState({ type: '', name: '', contact: '' });

  const primarySupportOptions = [
    { id: 'partner', label: 'My partner/spouse', description: 'The person closest to me' },
    { id: 'family', label: 'Family member', description: 'Parent, sibling, or other relative' },
    { id: 'friend', label: 'Close friend', description: 'Someone who knows me well' },
    { id: 'doula', label: 'Doula', description: 'Professional birth support person' },
    { id: 'multiple', label: 'Multiple people', description: 'I want a team approach' },
  ];

  const additionalSupportOptions = [
    'Professional doula', 'Family members', 'Close friends', 'Religious/spiritual advisor',
    'Photographer', 'Student midwife/nurse', 'No additional support needed'
  ];

  const communicationStyles = [
    { 
      id: 'direct', 
      label: 'Direct and clear', 
      description: 'Tell me exactly what\'s happening and what my options are' 
    },
    { 
      id: 'gentle', 
      label: 'Gentle and reassuring', 
      description: 'Use calm, encouraging language and check in with my feelings' 
    },
    { 
      id: 'minimal', 
      label: 'Minimal talking', 
      description: 'I prefer quiet support with physical comfort measures' 
    },
    { 
      id: 'collaborative', 
      label: 'Collaborative discussion', 
      description: 'Include me in all decisions and explain reasoning' 
    },
  ];

  const handlePrimarySupportChange = (support: string) => {
    updateData('supportTeam', { ...data.supportTeam, primarySupport: support });
  };

  const handleAdditionalSupportToggle = (support: string) => {
    const current = data.supportTeam.additionalSupport;
    const updated = current.includes(support) 
      ? current.filter(s => s !== support)
      : [...current, support];
    updateData('supportTeam', { ...data.supportTeam, additionalSupport: updated });
  };

  const handleCommunicationChange = (style: string) => {
    updateData('supportTeam', { ...data.supportTeam, communicationStyle: style });
  };

  const handlePrimarySupportNameChange = (name: string) => {
    updateData('supportTeam', { ...data.supportTeam, primarySupportName: name });
  };

  const handlePrimarySupportContactChange = (contact: string) => {
    updateData('supportTeam', { ...data.supportTeam, primarySupportContact: contact });
  };

  const handleSpecialInstructionsChange = (instructions: string) => {
    updateData('supportTeam', { ...data.supportTeam, specialInstructions: instructions });
  };

  const addAdditionalSupportPerson = () => {
    if (newAdditionalSupport.type && newAdditionalSupport.name) {
      const updated = [...data.supportTeam.additionalSupportDetails, { ...newAdditionalSupport }];
      updateData('supportTeam', { ...data.supportTeam, additionalSupportDetails: updated });
      setNewAdditionalSupport({ type: '', name: '', contact: '' });
    }
  };

  const removeAdditionalSupportPerson = (index: number) => {
    const updated = data.supportTeam.additionalSupportDetails.filter((_, i) => i !== index);
    updateData('supportTeam', { ...data.supportTeam, additionalSupportDetails: updated });
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-3">
          Who's on your support team?
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Who in your life makes you feel most heard and supported? The right support team 
          can make all the difference in how you experience birth.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Primary Support Person */}
          <Card className="p-6 shadow-card">
            <h3 className="text-xl font-semibold mb-4 text-card-foreground">
              Who will be your primary support person?
            </h3>
            <p className="text-muted-foreground mb-6">
              This is the person you most want by your side - someone who knows you well 
              and will advocate for your needs.
            </p>
            
            <div className="space-y-3">
              {primarySupportOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handlePrimarySupportChange(option.id)}
                  className={`
                    w-full text-left p-4 rounded-lg border-2 transition-gentle
                    ${data.supportTeam.primarySupport === option.id
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

            {/* Primary Support Details */}
            {data.supportTeam.primarySupport && (
              <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <h4 className="font-medium text-card-foreground mb-3">Primary Support Person Details</h4>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="primary-name" className="text-sm font-medium">Full Name *</Label>
                    <Input
                      id="primary-name"
                      value={data.supportTeam.primarySupportName}
                      onChange={(e) => handlePrimarySupportNameChange(e.target.value)}
                      placeholder="Enter their full name"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="primary-contact" className="text-sm font-medium">Phone Number</Label>
                    <Input
                      id="primary-contact"
                      value={data.supportTeam.primarySupportContact}
                      onChange={(e) => handlePrimarySupportContactChange(e.target.value)}
                      placeholder="Contact number (optional)"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* Additional Support */}
          <Card className="p-6 shadow-card">
            <h3 className="text-xl font-semibold mb-4 text-card-foreground">
              Additional support you'd like present
            </h3>
            <p className="text-muted-foreground mb-6">
              Add specific people you want as additional support. Include their names and contact information 
              so medical staff can identify them.
            </p>
            
            {/* Existing Additional Support People */}
            {data.supportTeam.additionalSupportDetails.length > 0 && (
              <div className="space-y-3 mb-6">
                {data.supportTeam.additionalSupportDetails.map((person, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/20">
                    <div>
                      <div className="font-medium text-card-foreground">{person.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {person.type} {person.contact && `• ${person.contact}`}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAdditionalSupportPerson(index)}
                      className="text-destructive hover:text-destructive/80"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Add New Additional Support Person */}
            <div className="space-y-4 p-4 border border-dashed border-primary/30 rounded-lg">
              <h4 className="font-medium text-card-foreground">Add Additional Support Person</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <Label htmlFor="support-type" className="text-sm font-medium">Role/Relationship</Label>
                  <Input
                    id="support-type"
                    value={newAdditionalSupport.type}
                    onChange={(e) => setNewAdditionalSupport(prev => ({ ...prev, type: e.target.value }))}
                    placeholder="e.g., Doula, Mother, Friend"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="support-name" className="text-sm font-medium">Full Name</Label>
                  <Input
                    id="support-name"
                    value={newAdditionalSupport.name}
                    onChange={(e) => setNewAdditionalSupport(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Their full name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="support-contact" className="text-sm font-medium">Phone (Optional)</Label>
                  <Input
                    id="support-contact"
                    value={newAdditionalSupport.contact}
                    onChange={(e) => setNewAdditionalSupport(prev => ({ ...prev, contact: e.target.value }))}
                    placeholder="Contact number"
                    className="mt-1"
                  />
                </div>
              </div>
              <Button
                onClick={addAdditionalSupportPerson}
                disabled={!newAdditionalSupport.type || !newAdditionalSupport.name}
                className="w-full"
                variant="outline"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Support Person
              </Button>
            </div>

            {/* Quick Add Common Support Types */}
            <div className="mt-6">
              <p className="text-sm text-muted-foreground mb-3">Or quickly add common support types:</p>
              <div className="grid grid-cols-2 gap-2">
                {additionalSupportOptions.slice(0, 6).map((support) => (
                  <Button
                    key={support}
                    variant={data.supportTeam.additionalSupport.includes(support) ? "default" : "outline"}
                    onClick={() => handleAdditionalSupportToggle(support)}
                    className="justify-start h-auto p-2 text-xs"
                    size="sm"
                  >
                    {support}
                  </Button>
                ))}
              </div>
            </div>
          </Card>

          {/* Communication Style */}
          <Card className="p-6 shadow-card">
            <h3 className="text-xl font-semibold mb-4 text-card-foreground">
              How do you want your team to communicate with you?
            </h3>
            <p className="text-muted-foreground mb-6">
              When you're in labor, how do you want decisions discussed? What communication 
              style helps you feel most supported?
            </p>
            
            <div className="space-y-3">
              {communicationStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => handleCommunicationChange(style.id)}
                  className={`
                    w-full text-left p-4 rounded-lg border-2 transition-gentle
                    ${data.supportTeam.communicationStyle === style.id
                      ? 'border-primary bg-primary/5 shadow-gentle'
                      : 'border-border hover:border-primary/50 hover:bg-primary/2'
                    }
                  `}
                >
                  <div className="font-medium text-card-foreground">{style.label}</div>
                  <div className="text-sm text-muted-foreground mt-1">{style.description}</div>
                </button>
              ))}
            </div>
          </Card>

          {/* Special Instructions */}
          <Card className="p-6 shadow-card">
            <h3 className="text-xl font-semibold mb-4 text-card-foreground">
              Special instructions for your support team
            </h3>
            <p className="text-muted-foreground mb-6">
              Is there anything specific you want your support team to know? Any phrases 
              that help you or things that don't?
            </p>
            
            <Textarea
              value={data.supportTeam.specialInstructions}
              onChange={(e) => handleSpecialInstructionsChange(e.target.value)}
              placeholder="For example: 'Please don't say how much longer labor might take' or 'Remind me to drink water' or 'Help me stay focused on my breathing'..."
              className="min-h-[120px]"
            />
          </Card>
        </div>

        {/* Reality Checks Sidebar */}
        <div className="space-y-4">
          <RealityCheck
            title="Hospital support limits"
            content="Most hospitals limit the number of people who can be in the delivery room. Check your hospital's policy and prioritize who matters most to you."
          />
          
          <RealityCheck
            title="Support people get tired too"
            content="Labor can last many hours. Your support team may need breaks, food, or rest. Having backup support or rotating team members can help everyone stay strong."
          />
          
          <RealityCheck
            title="Medical staff change shifts"
            content="You might meet your delivery nurse just hours before birth. A familiar support person can provide continuity when medical staff changes."
          />
          
          <RealityCheck
            title="Partners need support too"
            content="Watching someone you love in pain can be challenging. Consider how your partner might need support, and don't hesitate to include a doula or family member to help them help you."
          />
        </div>
      </div>
    </div>
  );
};