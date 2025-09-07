import { Download, FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { LiveBirthPlan, BirthPlanSection } from "@/hooks/useLiveBirthPlan";

interface LiveBirthPlanCanvasProps {
  birthPlan: LiveBirthPlan;
  completion: number;
  className?: string;
}

const SectionCard = ({ section }: { section: BirthPlanSection }) => {
  return (
    <Card className={cn(
      "transition-all duration-300 relative",
      section.isComplete ? "border-primary/20 bg-primary/5" : "border-dashed border-muted-foreground/30"
    )}>
      {!section.isComplete && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
      )}
      
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className={cn(
            "text-sm font-medium flex items-center gap-2",
            !section.isComplete && "text-orange-600 dark:text-orange-400"
          )}>
            {section.isComplete ? (
              <div className="w-2 h-2 rounded-full bg-primary" />
            ) : (
              <Plus className="w-3 h-3 text-muted-foreground" />
            )}
            {section.title}
            {!section.isComplete && <span className="text-xs font-normal">(needs attention)</span>}
          </CardTitle>
          {section.isComplete && (
            <Badge variant="secondary" className="text-xs">
              Added
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {section.isComplete ? (
          <ul className="space-y-2">
            {section.content.slice(0, 3).map((item, index) => (
              <li key={index} className="text-sm text-muted-foreground leading-relaxed">
                • {item}
              </li>
            ))}
            {section.content.length > 3 && (
              <li className="text-xs text-muted-foreground italic">
                + {section.content.length - 3} more items
              </li>
            )}
          </ul>
        ) : (
          <p className="text-xs text-muted-foreground italic">
            Chat about this topic to add details to your birth plan
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export const LiveBirthPlanCanvas = ({ birthPlan, completion, className }: LiveBirthPlanCanvasProps) => {
  const sections = Object.values(birthPlan);
  const completedSections = sections.filter(section => section.isComplete).length;

  const handleDownloadPDF = () => {
    const { transformToPDFData, generateBirthPlanPDF } = require('@/utils/pdfGenerator');
    const pdfData = transformToPDFData(birthPlan);
    generateBirthPlanPDF(pdfData);
  };

  return (
    <div className={cn("h-full flex flex-col bg-card border-l border-border", className)}>
      {/* Header */}
      <div className="p-4 border-b border-border bg-card/50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-foreground">Your Birth Plan</h2>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDownloadPDF}
            disabled={completion < 50}
            className="text-xs"
          >
            <Download className="w-3 h-3 mr-1" />
            PDF
          </Button>
        </div>
        
        <div className="text-xs text-muted-foreground mb-2">
          {completedSections} of {sections.length} sections complete ({Math.round(completion)}%)
        </div>
        
        <div className={cn(
          "text-xs font-medium",
          completion < 25 ? "text-muted-foreground" :
          completion < 50 ? "text-orange-600 dark:text-orange-400" :
          completion < 75 ? "text-blue-600 dark:text-blue-400" :
          completion < 90 ? "text-green-600 dark:text-green-400" :
          completion < 100 ? "text-purple-600 dark:text-purple-400" :
          "text-emerald-600 dark:text-emerald-400"
        )}>
          {completion < 25 && "Just getting started..."}
          {completion >= 25 && completion < 50 && "Making good progress! 🌟"}
          {completion >= 50 && completion < 75 && "Halfway there! 🎉"}
          {completion >= 75 && completion < 90 && "Almost complete! ✨"}
          {completion >= 90 && completion < 100 && "Final touches needed 🎊"}
          {completion >= 100 && "Your plan is ready! 🌈"}
        </div>
        
        <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${completion}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {completion === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <FileText className="w-12 h-12 text-muted-foreground/40 mb-4" />
            <h3 className="font-medium text-muted-foreground mb-2">
              Start Building Your Birth Plan
            </h3>
            <p className="text-sm text-muted-foreground/70 max-w-xs">
              As you chat about your preferences, your personalized birth plan will appear here in real-time.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <h1 className="text-lg font-semibold text-foreground mb-1">
                My Birth Plan
              </h1>
              <p className="text-xs text-muted-foreground">
                A guide for my care team and support network
              </p>
            </div>

            <div className="space-y-4">
              {sections.map((section, index) => (
                <SectionCard key={index} section={section} />
              ))}
            </div>

            {completion >= 50 && (
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">
                      Your birth plan is taking shape! 
                    </p>
          <Button 
            onClick={handleDownloadPDF}
            className="text-xs"
            size="sm"
          >
            <Download className="w-3 h-3 mr-1" />
            Download as PDF
          </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
};