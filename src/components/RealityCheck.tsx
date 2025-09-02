import { Info } from "lucide-react";

interface RealityCheckProps {
  title: string;
  content: string;
  className?: string;
}

export const RealityCheck = ({ title, content, className = "" }: RealityCheckProps) => {
  return (
    <div className={`bg-accent/30 border border-accent/50 rounded-lg p-4 ${className}`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-accent-deep/20 flex items-center justify-center mt-0.5">
          <Info className="w-3 h-3 text-accent-deep" />
        </div>
        <div>
          <h4 className="font-medium text-accent-foreground mb-1">{title}</h4>
          <p className="text-sm text-accent-foreground/80 leading-relaxed">{content}</p>
        </div>
      </div>
    </div>
  );
};