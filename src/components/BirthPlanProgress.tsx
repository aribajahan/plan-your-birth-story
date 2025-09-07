import { cn } from "@/lib/utils";

interface BirthPlanProgressProps {
  completion: number;
  capturedPrefs: string[];
  className?: string;
}

export const BirthPlanProgress = ({ completion, capturedPrefs, className }: BirthPlanProgressProps) => {
  const clamped = Math.max(0, Math.min(100, Math.round(completion)));
  return (
    <div className={cn("w-full bg-muted/40 border border-border rounded-xl p-3", className)}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-foreground">Birth plan completion</p>
        <span className="text-xs text-muted-foreground">{clamped}%</span>
      </div>
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${clamped}%` }}
        />
      </div>
      {capturedPrefs.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {capturedPrefs.slice(0, 6).map((pref, idx) => (
            <span
              key={`${pref}-${idx}`}
              className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
            >
              {pref}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};