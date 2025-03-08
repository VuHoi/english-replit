import { useState, useCallback, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { vocabulary } from "@/data/content";
import { TurtleProgress } from "@/components/shared/TurtleProgress";
import { AudioPlayer } from "@/components/shared/AudioPlayer";
import { ChevronLeft, ChevronRight, RotateCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import confetti from 'canvas-confetti';

const WORDS_PER_SESSION = 10;

export function VocabularyModule() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [learned, setLearned] = useState<Set<string>>(new Set());
  const [sessionWords, setSessionWords] = useState<string[]>([]);
  const { toast } = useToast();

  // Initialize session words
  useEffect(() => {
    const randomWords = [...vocabulary.words]
      .sort(() => Math.random() - 0.5)
      .slice(0, WORDS_PER_SESSION)
      .map(w => w.id);
    setSessionWords(randomWords);
  }, []);

  const currentWord = vocabulary.words.find(w => w.id === sessionWords[currentIndex]) || vocabulary.words[0];

  const next = () => {
    setCurrentIndex((i) => (i + 1) % sessionWords.length);
    setFlipped(false);
  };

  const previous = () => {
    setCurrentIndex((i) => (i - 1 + sessionWords.length) % sessionWords.length);
    setFlipped(false);
  };

  const triggerConfetti = useCallback(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#4F46E5', '#22C55E', '#EAB308']
    });
  }, []);

  const toggleLearned = () => {
    const newLearned = new Set(learned);
    if (learned.has(currentWord.id)) {
      newLearned.delete(currentWord.id);
    } else {
      newLearned.add(currentWord.id);
      triggerConfetti();
      toast({
        title: "Tuyệt vời! 🎉",
        description: "Bạn đã học thêm được một từ mới!",
      });
    }
    setLearned(newLearned);
  };

  const handleAudioError = () => {
    toast({
      variant: "destructive",
      title: "Lỗi",
      description: "Không thể phát âm thanh.",
    });
  };

  const isSessionComplete = learned.size === WORDS_PER_SESSION;

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-xl p-4">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950">
          <div className="absolute inset-0 bg-grid-primary/20 bg-[size:20px_20px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <TurtleProgress 
            value={learned.size} 
            max={WORDS_PER_SESSION}
            label="Tiến độ học tập" 
          />
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mt-6 w-full max-w-2xl mx-auto backdrop-blur-sm bg-white/90 dark:bg-gray-950/90 border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-center bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
                  Flashcards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative preserve-3d" style={{ perspective: "1000px" }}>
                  <div
                    className={`relative w-full min-h-[300px] sm:min-h-[400px] cursor-pointer transition-transform duration-500 ease-in-out transform-style-3d ${
                      flipped ? "rotate-y-180" : ""
                    }`}
                    onClick={() => setFlipped(!flipped)}
                  >
                    <div className="absolute w-full h-full backface-hidden bg-white dark:bg-gray-900 rounded-xl shadow-lg">
                      <div className="flex flex-col items-center justify-center h-full p-4 sm:p-6 space-y-4">
                        <motion.h3 
                          className="text-2xl sm:text-4xl font-bold text-center bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent"
                          initial={{ scale: 0.5 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          {currentWord.word}
                        </motion.h3>
                        <p className="text-lg sm:text-xl text-muted-foreground">{currentWord.phonetic}</p>
                        <div className="mt-4">
                          <AudioPlayer 
                            audioUrl={currentWord.audioUrl} 
                            onError={handleAudioError}
                          />
                        </div>
                        <motion.p 
                          className="text-sm text-muted-foreground mt-4"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          Chạm để xem nghĩa
                        </motion.p>
                      </div>
                    </div>

                    <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
                      <div className="flex flex-col items-center justify-center h-full p-4 sm:p-6 space-y-4">
                        <div className="text-center space-y-4">
                          <h3 className="text-xl sm:text-2xl font-bold">{currentWord.definition}</h3>
                          <div className="space-y-2">
                            <p className="text-base sm:text-lg font-medium">Ví dụ:</p>
                            <p className="text-sm sm:text-base text-muted-foreground italic">"{currentWord.example}"</p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-base sm:text-lg font-medium">Ngữ cảnh:</p>
                            <p className="text-sm sm:text-base text-muted-foreground">"{currentWord.context}"</p>
                          </div>
                        </div>
                        <motion.p 
                          className="text-sm text-muted-foreground mt-4"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          Chạm để xem từ
                        </motion.p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
                  <div className="flex w-full sm:w-auto gap-2">
                    <Button 
                      variant="outline" 
                      onClick={previous}
                      className="flex-1 sm:flex-none hover:scale-105 transition-transform"
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Trước</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={next}
                      className="flex-1 sm:flex-none hover:scale-105 transition-transform"
                    >
                      <span className="hidden sm:inline">Tiếp</span>
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant={learned.has(currentWord.id) ? "default" : "outline"}
                      onClick={toggleLearned}
                      className={`flex-1 sm:flex-none transition-all duration-300 ${
                        learned.has(currentWord.id) 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                          : 'hover:scale-105'
                      }`}
                    >
                      {learned.has(currentWord.id) ? "Đã học ✓" : "Đánh dấu đã học"}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setFlipped(!flipped)}
                      className="hover:rotate-180 transition-transform duration-300"
                    >
                      <RotateCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Victory celebration screen */}
        {isSessionComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm flex items-center justify-center rounded-xl"
          >
            <div className="text-center space-y-4">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Victory Turtle with Medal */}
                <svg
                  width="120"
                  height="120"
                  viewBox="0 0 120 120"
                  fill="none"
                  className="mx-auto"
                >
                  {/* Turtle Body */}
                  <motion.circle
                    cx="60"
                    cy="60"
                    r="40"
                    fill="#10B981"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  {/* Shell Pattern */}
                  <motion.path
                    d="M80 60C80 70.5 71.5 79 61 79C50.5 79 42 70.5 42 60C42 49.5 50.5 41 61 41C71.5 41 80 49.5 80 60Z"
                    stroke="#064E3B"
                    strokeWidth="3"
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  {/* Medal */}
                  <motion.g
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <circle cx="85" cy="45" r="15" fill="#EAB308" />
                    <path
                      d="M85 35L89 40L95 41L90 45L91 51L85 48L79 51L80 45L75 41L81 40L85 35Z"
                      fill="#FEF3C7"
                    />
                  </motion.g>
                </svg>
              </motion.div>

              <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">
                🎉 Chúc mừng chiến thắng! 🎉
              </h3>
              <p className="text-muted-foreground">
                Bạn đã hoàn thành xuất sắc {WORDS_PER_SESSION} từ trong phiên học này!
              </p>
              <Button
                onClick={() => {
                  setLearned(new Set());
                  const newRandomWords = [...vocabulary.words]
                    .sort(() => Math.random() - 0.5)
                    .slice(0, WORDS_PER_SESSION)
                    .map(w => w.id);
                  setSessionWords(newRandomWords);
                  setCurrentIndex(0);
                }}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
              >
                Bắt đầu phiên mới
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}