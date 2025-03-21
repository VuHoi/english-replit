import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";

interface TurtleProgressProps {
  value: number;
  max: number;
  label?: string;
}

export  function TurtleProgress({
  value,
  max,
  label,
}: TurtleProgressProps) {
  const percentage = Math.round((value / max) * 100);
  return (
    <div className="w-full space-y-2">
      {/* Game-like race track */}
      <div className="race-track relative h-20 bg-gray-800 dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-700 dark:border-gray-800 shadow-inner">
        {/* Road with white stripes */}
        <div className="absolute inset-0 flex items-center">
          <div className="w-full h-1 bg-white opacity-70"></div>
        </div>
        {/* Stars in the background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        {/* Finish line */}
        <div className="finish-line absolute right-0 h-full w-3 bg-gradient-to-b from-red-500 via-white to-red-500 flex items-center justify-center z-10">
          <div
            className="checkered-flag h-10 w-10 absolute -left-6 bg-contain bg-no-repeat"
            style={{
              backgroundImage:
                'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iMTAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0id2hpdGUiLz48cmVjdCB5PSIxMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==")',
            }}
          ></div>
        </div>

        {/* Road dash markings */}
        <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-2 w-10 bg-white opacity-70 rounded-sm"
              initial={{ x: `${i * 8.3}%` }}
              animate={{ x: [`${i * 8.3}%`, "-10%"] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.3,
                repeatType: "loop",
              }}
            />
          ))}
        </div>

        {/* Turtle character */}
        <motion.div
          className="turtle absolute bottom-5 w-full"
          initial={{ x: "0%" }}
          animate={{
            x: `${value === 0 ? 0 : Math.min(Math.max(0, (value / max) * 100 - 10), 90)}%`,
          }}
          transition={{
            type: "spring",
            stiffness: 60,
            damping: 20,
            mass: 1,
          }}
        >
          <svg
            width="50"
            height="40"
            viewBox="0 0 50 40"
            className="drop-shadow-xl"
          >
            <motion.g
              animate={
                value === max
                  ? {
                      y: [0, -10, 0],
                      rotate: [0, 10, -10, 0],
                    }
                  : {
                      y: [0, -3, 0],
                      x: [0, 3, 0],
                    }
              }
              transition={{
                duration: value === max ? 0.8 : 1.2,
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              {/* Turtle body */}
              <ellipse cx="25" cy="25" rx="20" ry="15" fill="#2E7D32" />
              <ellipse cx="25" cy="25" rx="16" ry="12" fill="#43A047" />

              {/* Turtle shell pattern */}
              <ellipse cx="25" cy="25" rx="12" ry="8" fill="#66BB6A" />
              <path d="M25 17 L25 33" stroke="#43A047" strokeWidth="1" />
              <path d="M17 25 L33 25" stroke="#43A047" strokeWidth="1" />
              <circle cx="25" cy="25" r="4" fill="#43A047" />

              {/* Turtle head */}
              <circle cx="42" cy="20" r="6" fill="#66BB6A" />
              <circle cx="44" cy="18" r="1.5" fill="black" />
              <motion.path
                d="M45 20.5C45 20.5 46 21 46 22C46 23 45 23.5 45 23.5"
                stroke="black"
                strokeWidth="0.7"
                fill="none"
                animate={{
                  d: "M45 20.5C45 20.5 47 21 47 22C47 23 45 23.5 45 23.5",
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />

              {/* Turtle legs with animation */}
              <motion.ellipse
                cx="15"
                cy="15"
                rx="5"
                ry="3"
                fill="#66BB6A"
                transform="rotate(-30 15 15)"
                animate={{ rx: [5, 4, 5], ry: [3, 4, 3] }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
              <motion.ellipse
                cx="15"
                cy="35"
                rx="5"
                ry="3"
                fill="#66BB6A"
                transform="rotate(30 15 35)"
                animate={{ rx: [5, 4, 5], ry: [3, 4, 3] }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.25,
                }}
              />
              <motion.ellipse
                cx="35"
                cy="15"
                rx="5"
                ry="3"
                fill="#66BB6A"
                transform="rotate(30 35 15)"
                animate={{ rx: [5, 4, 5], ry: [3, 4, 3] }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.5,
                }}
              />
              <motion.ellipse
                cx="35"
                cy="35"
                rx="5"
                ry="3"
                fill="#66BB6A"
                transform="rotate(-30 35 35)"
                animate={{ rx: [5, 4, 5], ry: [3, 4, 3] }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.75,
                }}
              />

              {/* Turtle tail */}
              <motion.path
                d="M5 25C5 25 2 25 2 25C2 25 3 27 5 25Z"
                fill="#66BB6A"
                animate={{ d: "M5 25C5 25 2 23 2 25C2 27 3 27 5 25Z" }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            </motion.g>
          </svg>

          {/* Motion blur effect for speed */}
          {percentage > 20 && (
            <motion.div
              className="absolute inset-0 z-[-1]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 0.5 }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute right-full top-1/2 transform -translate-y-1/2"
                  style={{
                    width: `${10 + i * 5}px`,
                    height: "2px",
                    background:
                      "linear-gradient(to left, rgba(102, 187, 106, 0.6), transparent)",
                    right: `${-5 - i * 10}px`,
                  }}
                />
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Celebration effect when completed */}
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
    </div>
  );
}

export default TurtleProgress;