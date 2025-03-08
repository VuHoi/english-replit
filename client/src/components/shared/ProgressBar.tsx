import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

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
        <motion.div 
          className="flex justify-between mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm text-muted-foreground">{label}</span>
          <motion.span 
            className="text-sm font-medium"
            key={percentage}
            initial={{ scale: 1.5, color: "#22c55e" }}
            animate={{ scale: 1, color: "#64748b" }}
            transition={{ duration: 0.5 }}
          >
            {percentage}%
          </motion.span>
        </motion.div>
      )}
      <div className="relative">
        <Progress value={percentage} className="h-2" />
        <motion.div
          className="absolute top-0 left-0 h-full bg-primary/30 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5 }}
        />
        {/* Glow effect */}
        <motion.div
          className="absolute top-0 left-0 h-full w-2 bg-primary rounded-full opacity-75 blur-sm"
          animate={{
            x: [`${percentage}%`, `${percentage}%`],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
}