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
    dragFree: false, // More controlled sliding
    containScroll: "keepSnaps",
    align: "center",
    duration: 30, // Faster transitions
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
    <div className="min-h-screen flex flex-col">
      {/* Progress bar in fixed position */}
      <div className="fixed top-0 left-0 right-0 z-50 px-4 py-2 bg-background/80 backdrop-blur-sm">
        <TurtleProgress 
          value={learned.size} 
          max={WORDS_PER_SESSION}
          label="Tiến độ học tập" 
        />
      </div>

      {/* Carousel taking up full viewport height */}
      <div className="flex-1 mt-16" ref={emblaRef}>
        <div className="flex h-[calc(100vh-8rem)]">
          {sessionWords.map((wordId, index) => {
            const word = vocabulary.words.find(w => w.id === wordId)!;
            return (
              <div 
                key={word.id} 
                className="flex-[0_0_100%] h-full flex items-center justify-center px-4"
              >
                <Card className="w-full h-full max-w-4xl mx-auto backdrop-blur-sm bg-white/90 dark:bg-gray-950/90 border-none shadow-xl">
                  <CardContent className="h-full flex flex-col">
                    <div className="flex-1 relative preserve-3d" style={{ perspective: "1000px" }}>
                      <div
                        className={`absolute inset-0 transition-transform duration-500 ease-in-out transform-style-3d cursor-pointer ${
                          flipped && index === currentIndex ? "rotate-y-180" : ""
                        }`}
                        onClick={() => index === currentIndex && setFlipped(!flipped)}
                      >
                        {/* Front of card */}
                        <div className="absolute inset-0 backface-hidden bg-white dark:bg-gray-900 rounded-xl shadow-lg">
                          <div className="flex flex-col items-center justify-center h-full p-6 space-y-8">
                            <motion.h3 
                              className="text-4xl sm:text-6xl font-bold text-center bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent"
                              initial={{ scale: 0.5 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.5 }}
                            >
                              {word.word}
                            </motion.h3>
                            <p className="text-2xl sm:text-3xl text-muted-foreground">{word.phonetic}</p>
                            <div className="mt-8">
                              <AudioPlayer 
                                audioUrl={word.audioUrl} 
                                onError={handleAudioError}
                              />
                            </div>
                            <motion.p 
                              className="text-lg text-muted-foreground mt-8"
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              Chạm để xem nghĩa
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

                    {/* Controls */}
                    <div className="p-6 flex justify-center gap-4">
                      <Button
                        variant={learned.has(word.id) ? "default" : "outline"}
                        onClick={() => index === currentIndex && toggleLearned()}
                        className={`text-lg py-6 px-8 transition-all duration-300 ${
                          learned.has(word.id) 
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                            : 'hover:scale-105'
                        }`}
                        disabled={index !== currentIndex}
                      >
                        {learned.has(word.id) ? "Đã học ✓" : "Đánh dấu đã học"}
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => index === currentIndex && setFlipped(!flipped)}
                        className="h-14 w-14 hover:rotate-180 transition-transform duration-300"
                        disabled={index !== currentIndex}
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

      {/* Victory celebration screen */}
      {isSessionComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm flex items-center justify-center z-50"
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
                if (emblaApi) {
                  emblaApi.scrollTo(0);
                }
              }}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
            >
              Bắt đầu phiên mới
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}