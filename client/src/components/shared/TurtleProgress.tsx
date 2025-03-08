import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy } from "lucide-react";

interface TurtleProgressProps {
  value: number;
  max: number;
  label?: string;
}

export function TurtleProgress({ value, max, label }: TurtleProgressProps) {
  const percentage = Math.round((value / max) * 100);
  
  return (
    <div className="w-full space-y-2">
      {label && (
        <motion.div 
          className="flex justify-between items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm text-muted-foreground">{label}</span>
          <motion.div
            className="flex items-center gap-2"
            key={value}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {value === max && (
              <Trophy className="w-5 h-5 text-yellow-500 animate-bounce" />
            )}
            <span className="text-sm font-medium bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
              {value} / {max}
            </span>
          </motion.div>
        </motion.div>
      )}
      
      <div className="relative h-8 bg-muted rounded-full overflow-hidden">
        <Progress value={percentage} className="h-full" />
        
        {/* Turtle SVG */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2"
          initial={{ x: "0%" }}
          animate={{ x: `${percentage}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="drop-shadow-lg"
          >
            <motion.path
              d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
              fill="#10B981"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.path
              d="M19 12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12C5 8.13401 8.13401 5 12 5C15.866 5 19 8.13401 19 12Z"
              stroke="#064E3B"
              strokeWidth="2"
              strokeLinecap="round"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </svg>
        </motion.div>

        {/* Progress sparkles */}
        <motion.div
          className="absolute top-0 left-0 h-full w-2 bg-primary/50 blur-sm"
          animate={{
            x: [`${percentage}%`, `${percentage}%`],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Motivational message */}
      <AnimatePresence>
        {value > 0 && value < max && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-sm text-center text-muted-foreground"
          >
            {value === max - 1 ? "Cố lên! Chỉ còn 1 từ nữa thôi! 🎉" : "Bạn đang làm rất tốt! Hãy tiếp tục nhé! 💪"}
          </motion.p>
        )}
        {value === max && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-sm text-center font-medium text-green-600 dark:text-green-400"
          >
            Tuyệt vời! Bạn đã hoàn thành bài học hôm nay! 🌟
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
