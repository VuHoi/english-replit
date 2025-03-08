import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
}

export function ProgressBar({ value, max, label }: ProgressBarProps) {
  const percentage = Math.round((value / max) * 100);
  
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between mb-2">
          <span className="text-sm text-muted-foreground">{label}</span>
          <span className="text-sm font-medium">{percentage}%</span>
        </div>
      )}
      <Progress value={percentage} className="h-2" />
    </div>
  );
}
