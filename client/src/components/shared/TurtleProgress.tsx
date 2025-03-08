
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

      <div className="relative h-16 bg-gradient-to-r from-sky-100 to-blue-100 dark:from-sky-950 dark:to-blue-900 rounded-xl overflow-hidden border border-blue-200 dark:border-blue-800">
        {/* Path/Road */}
        <div className="absolute w-full h-2 bg-slate-300 dark:bg-slate-700 top-1/2 -translate-y-1/2"></div>
        
        {/* Finish line */}
        <div className="absolute right-2 top-0 bottom-0 flex items-center">
          <div className="w-3 h-10 bg-red-500 opacity-80 relative">
            <div className="absolute w-full h-full bg-white opacity-50 grid grid-rows-4">
              <div className="bg-red-500"></div>
              <div className="bg-white"></div>
              <div className="bg-red-500"></div>
              <div className="bg-white"></div>
            </div>
          </div>
        </div>
        
        {/* Progress indicator */}
        <div 
          className="absolute h-2 bg-primary top-1/2 -translate-y-1/2 left-0"
          style={{ width: `${percentage}%` }}
        ></div>
        
        {/* Animated Turtle */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2"
          initial={{ x: "5%" }}
          animate={{ x: `${percentage}%` }}
          transition={{ type: "spring", stiffness: 60, damping: 20 }}
        >
          <motion.div
            animate={{ y: [0, -2, 0, 2, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="relative"
          >
            <svg width="40" height="30" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Shell */}
              <motion.ellipse 
                cx="20" cy="15" rx="14" ry="12" 
                fill="#2ecc71" 
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
              
              {/* Shell pattern */}
              <path d="M20 8C21 10 25 11 25 15C25 19 21 20 20 22C19 20 15 19 15 15C15 11 19 10 20 8Z" fill="#27ae60" />
              
              {/* Head */}
              <motion.path 
                d="M33 15C33 12.5 32 11 30 10C31 12 31 14 30 15C29 16 28 15 27 15.5C26 16 25 19 28 19C31 19 33 17.5 33 15Z" 
                fill="#3edc81"
                animate={{ x: [0, 1, 0], rotate: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
              
              {/* Tail */}
              <motion.path 
                d="M7 15C7 12.5 8 11 10 10C9 12 9 14 10 15C11 16 12 15 13 15.5C14 16 15 19 12 19C9 19 7 17.5 7 15Z" 
                fill="#3edc81"
                animate={{ x: [0, -1, 0], rotate: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
              
              {/* Legs */}
              <motion.g
                animate={{ 
                  y: [0, 1, 0],
                  x: [0, 0.5, 0]
                }}
                transition={{ repeat: Infinity, duration: 0.75 }}
              >
                <ellipse cx="11" cy="9" rx="3" ry="2" fill="#3edc81" />
                <ellipse cx="11" cy="21" rx="3" ry="2" fill="#3edc81" />
              </motion.g>
              <motion.g
                animate={{ 
                  y: [0, -1, 0],
                  x: [0, 0.5, 0]
                }}
                transition={{ repeat: Infinity, duration: 0.75, delay: 0.375 }}
              >
                <ellipse cx="29" cy="9" rx="3" ry="2" fill="#3edc81" />
                <ellipse cx="29" cy="21" rx="3" ry="2" fill="#3edc81" />
              </motion.g>
              
              {/* Eye */}
              <circle cx="31" cy="13" r="1" fill="black" />
            </svg>
          </motion.div>
        </motion.div>
        
        {/* Progress sparkles */}
        <div className="absolute inset-0">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-yellow-300"
              initial={{ 
                left: `${Math.min(percentage, 95)}%`, 
                opacity: 0, 
                scale: 0 
              }}
              animate={{ 
                left: [`${Math.min(percentage, 95)}%`, `${Math.min(percentage + Math.random() * 5, 95)}%`],
                y: [0, -10 - Math.random() * 15],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 1 + Math.random(),
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
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
