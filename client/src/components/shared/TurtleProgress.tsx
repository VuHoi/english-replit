import { motion, AnimatePresence } from "framer-motion";
import { Trophy } from "lucide-react";
import { Progress } from "@/components/ui/progress";

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

      {/* Game-like race track */}
      <div className="race-track relative h-16 bg-gradient-to-r from-green-100 to-green-200 dark:from-green-950 dark:to-green-900 rounded-lg overflow-hidden border border-green-300 dark:border-green-800">
        {/* Finish line */}
        <div className="finish-line absolute right-0 h-full w-2 bg-gradient-to-b from-red-500 via-white to-red-500 flex items-center justify-center z-10">
          <div className="checkered-flag h-8 w-8 absolute -left-6 bg-contain bg-no-repeat" style={{ backgroundImage: 'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iMTAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0id2hpdGUiLz48cmVjdCB5PSIxMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==")' }}></div>
        </div>

        {/* Lane markings */}
        <div className="lane-markings absolute left-0 right-0 top-1/2 h-1 flex justify-between">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="h-full w-6 bg-white opacity-70" style={{ marginLeft: `${i * 10}%` }}></div>
          ))}
        </div>

        {/* Turtle character */}
        <motion.div 
          className="turtle absolute bottom-2"
          initial={{ x: 0 }}
          animate={{ x: `${percentage - 3}%` }}
          transition={{ 
            type: "spring", 
            stiffness: 60, 
            damping: 20,
            mass: 1
          }}
        >
          <svg width="40" height="30" viewBox="0 0 50 40" className="drop-shadow-lg">
            <motion.g
              animate={value === max ? {
                y: [0, -10, 0],
                rotate: [0, 10, -10, 0]
              } : {}}
              transition={{
                duration: 0.8,
                repeat: value === max ? Infinity : 0,
                repeatType: "loop"
              }}
            >
              {/* Turtle body */}
              <ellipse cx="25" cy="25" rx="20" ry="15" fill="#2E7D32" />
              <ellipse cx="25" cy="25" rx="16" ry="12" fill="#43A047" />
              <ellipse cx="25" cy="25" rx="12" ry="8" fill="#66BB6A" />

              {/* Turtle head */}
              <circle cx="42" cy="20" r="6" fill="#66BB6A" />
              <circle cx="43" cy="18" r="1.5" fill="black" />
              <path d="M45 20.5C45 20.5 46 21 46 22C46 23 45 23.5 45 23.5" stroke="black" strokeWidth="0.7" fill="none" />

              {/* Turtle legs */}
              <ellipse cx="15" cy="15" rx="5" ry="3" fill="#66BB6A" transform="rotate(-30 15 15)" />
              <ellipse cx="15" cy="35" rx="5" ry="3" fill="#66BB6A" transform="rotate(30 15 35)" />
              <ellipse cx="35" cy="15" rx="5" ry="3" fill="#66BB6A" transform="rotate(30 35 15)" />
              <ellipse cx="35" cy="35" rx="5" ry="3" fill="#66BB6A" transform="rotate(-30 35 35)" />

              {/* Turtle tail */}
              <path d="M5 25C5 25 2 25 2 25C2 25 3 27 5 25Z" fill="#66BB6A" />
            </motion.g>
          </svg>
        </motion.div>

        {value === max && (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </div>

      {/* Actual progress bar (invisible but needed for accessibility) */}
      <div className="opacity-0 absolute">
        <Progress value={percentage} className="h-1" />
      </div>

      {/* Motivational messages */}
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