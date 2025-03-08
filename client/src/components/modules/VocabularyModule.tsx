
import { useState, useCallback, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { vocabulary } from "@/data/content";
import { TurtleProgress } from "@/components/shared/TurtleProgress";
import { AudioPlayer } from "@/components/shared/AudioPlayer";
import { RotateCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import confetti from 'canvas-confetti';
import useEmblaCarousel from 'embla-carousel-react';

const WORDS_PER_SESSION = 10;

export function VocabularyModule() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: false,
    containScroll: "keepSnaps",
    align: "center",
    duration: 30,
    loop: false,
    draggableClass: "cursor-grab",
    draggingClass: "cursor-grabbing",
  });
  const [flipped, setFlipped] = useState(false);
  const [learned, setLearned] = useState<Set<string>>(new Set());
  const [sessionWords, setSessionWords] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { toast } = useToast();

  // Initialize session words
  useEffect(() => {
    const randomWords = [...vocabulary.words]
      .sort(() => Math.random() - 0.5)
      .slice(0, WORDS_PER_SESSION)
      .map(w => w.id);
    setSessionWords(randomWords);
  }, []);

  // Handle slide changes
  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on('select', () => {
      setCurrentIndex(emblaApi.selectedScrollSnap());
      setFlipped(false);
    });
  }, [emblaApi]);

  const currentWord = vocabulary.words.find(w => w.id === sessionWords[currentIndex]) || vocabulary.words[0];

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
    if (newLearned.has(currentWord.id)) {
      newLearned.delete(currentWord.id);
      toast({
        title: "Từ vựng đã được bỏ đánh dấu",
        description: `${currentWord.word} sẽ xuất hiện trong danh sách cần ôn tập`,
      });
    } else {
      newLearned.add(currentWord.id);
      toast({
        title: "Từ vựng đã học",
        description: `Bạn đã học ${newLearned.size}/${sessionWords.length} từ`,
      });
      
      if (newLearned.size === sessionWords.length) {
        setTimeout(triggerConfetti, 300);
      }
    }
    setLearned(newLearned);
  };

  const progress = (learned.size / sessionWords.length) * 100;

  return (
    <div className="flex flex-col h-[calc(100vh-14rem)]">
      {/* Progress bar */}
      <div className="flex items-center justify-center mb-4">
        <TurtleProgress 
          progress={progress} 
          label="Tiến độ học tập" 
        />
      </div>

      {/* Success overlay when all words are learned */}
      <AnimatePresence>
        {learned.size === sessionWords.length && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex flex-col items-center justify-center space-y-8 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="bg-white dark:bg-gray-900 rounded-xl p-8 max-w-lg text-center shadow-lg"
            >
              <svg className="w-40 h-40 mx-auto" viewBox="0 0 200 200">
                <motion.g 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#10B981" strokeWidth="8" />
                  <path 
                    d="M70 100 L90 120 L130 80" 
                    fill="none" 
                    stroke="#10B981" 
                    strokeWidth="8" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  />
                </motion.g>
              </svg>

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
                  if (emblaApi) {
                    emblaApi.scrollTo(0);
                  }
                }}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 mt-4"
              >
                Bắt đầu lại
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card container with fixed height and proper swipe navigation */}
      <div className="flex-1 relative overflow-hidden">
        <div className="vocabulary-carousel absolute inset-0" ref={emblaRef}>
          <div className="flex h-full">
            {sessionWords.map((wordId, index) => {
              const word = vocabulary.words.find(w => w.id === wordId)!;
              return (
                <div 
                  key={word.id} 
                  className="flex-[0_0_100%] h-full flex items-center justify-center px-0"
                >
                  <Card className="w-full h-full mx-auto backdrop-blur-sm bg-white/90 dark:bg-gray-950/90 border-none shadow-xl">
                    <CardContent className="h-full flex flex-col p-6">
                      <div className="flex-1 relative preserve-3d" style={{ perspective: "1000px" }}>
                        <div
                          className={`absolute inset-0 transition-transform duration-500 ease-in-out transform-style-3d cursor-pointer ${
                            flipped ? "rotate-y-180" : ""
                          }`}
                          onClick={() => setFlipped(!flipped)}
                        >
                          {/* Front of card */}
                          <div className="absolute inset-0 backface-hidden bg-white dark:bg-gray-900 rounded-xl shadow-lg">
                            <div className="flex flex-col items-center justify-center h-full p-6 space-y-8">
                              <h2 className="text-3xl sm:text-5xl font-bold mb-4">{word.word}</h2>
                              
                              <div className="flex items-center justify-center mb-2">
                                <p className="text-xl sm:text-2xl text-muted-foreground">{word.phonetic}</p>
                                {word.audio && (
                                  <div className="ml-2 mt-1">
                                    <AudioPlayer audioUrl={word.audio} />
                                  </div>
                                )}
                              </div>
                              
                              {word.image && (
                                <div className="w-full max-w-sm h-48 sm:h-64 my-4 overflow-hidden rounded-lg">
                                  <img 
                                    src={word.image} 
                                    alt={word.word} 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}

                              <motion.p 
                                className="text-lg text-muted-foreground mt-8"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                Chạm để lật thẻ
                              </motion.p>
                            </div>
                          </div>

                          {/* Back of card */}
                          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
                            <div className="flex flex-col items-center justify-center h-full p-6 space-y-8">
                              <div className="text-center space-y-6">
                                <h3 className="text-2xl sm:text-4xl font-bold">{word.definition}</h3>
                                <div className="space-y-4">
                                  <p className="text-xl sm:text-2xl font-medium">Ví dụ:</p>
                                  <p className="text-lg sm:text-xl text-muted-foreground italic">"{word.example}"</p>
                                </div>
                                <div className="space-y-4">
                                  <p className="text-xl sm:text-2xl font-medium">Ngữ cảnh:</p>
                                  <p className="text-lg sm:text-xl text-muted-foreground">"{word.context}"</p>
                                </div>
                              </div>
                              <motion.p 
                                className="text-lg text-muted-foreground mt-8"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                Chạm để xem từ
                              </motion.p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Controls - Fixed at bottom */}
                      <div className="p-6 flex justify-center gap-4 mt-auto">
                        <Button
                          variant={learned.has(word.id) ? "default" : "outline"}
                          onClick={toggleLearned}
                          className={`text-lg py-6 px-8 transition-all duration-300 ${
                            learned.has(word.id) 
                              ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                              : 'hover:scale-105'
                          }`}
                        >
                          {learned.has(word.id) ? "Đã học ✓" : "Đánh dấu đã học"}
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setFlipped(!flipped)}
                          className="h-14 w-14 hover:rotate-180 transition-transform duration-300"
                        >
                          <RotateCw className="h-6 w-6" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
       
      {/* Current card counter (minimized) */}
      <div className="absolute bottom-0 right-0 m-3 z-10 bg-background/80 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm border border-border">
        {currentIndex + 1} / {sessionWords.length}
      </div>
    </div>
  );
}
