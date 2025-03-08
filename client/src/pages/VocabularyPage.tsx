
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { TurtleProgress } from "@/components/shared/TurtleProgress";
import { ArrowLeft, Check, RotateCw } from "lucide-react";
import { useLocation } from "wouter";
import { vocabulary } from "@/data/content";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import confetti from 'canvas-confetti';
import { AudioPlayer } from "@/components/shared/AudioPlayer";

const WORDS_PER_SESSION = 10;

export default function VocabularyPage() {
  const [_, navigate] = useLocation();
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

  const currentWord = vocabulary.words.find(w => w.id === sessionWords[currentIndex]) || vocabulary.words[0];

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#4F46E5', '#22C55E', '#EAB308']
    });
  };

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

  const nextCard = () => {
    if (currentIndex < sessionWords.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setFlipped(false);
    } else if (learned.size === WORDS_PER_SESSION) {
      // Session complete, restart
      setLearned(new Set());
      const newRandomWords = [...vocabulary.words]
        .sort(() => Math.random() - 0.5)
        .slice(0, WORDS_PER_SESSION)
        .map(w => w.id);
      setSessionWords(newRandomWords);
      setCurrentIndex(0);
      setFlipped(false);
    } else {
      // Go back to first card
      setCurrentIndex(0);
      setFlipped(false);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setFlipped(false);
    } else {
      // Wrap to last card
      setCurrentIndex(sessionWords.length - 1);
      setFlipped(false);
    }
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
      {/* Header with back button */}
      <div className="p-4 flex items-center">
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => navigate("/")} 
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Vocabulary Game
        </h1>
      </div>

      {/* Progress bar */}
      <div className="px-4 py-2">
        <TurtleProgress 
          value={learned.size} 
          max={WORDS_PER_SESSION}
          label={`Learned words: ${learned.size}/${WORDS_PER_SESSION}`}
        />
      </div>

      {/* Session complete screen */}
      {isSessionComplete ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 gap-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring" }}
          >
            <svg viewBox="0 0 200 200" width="200" height="200">
              <motion.g
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                {/* Trophy graphic */}
                <circle cx="100" cy="100" r="90" fill="gold" opacity="0.3" />
                <circle cx="100" cy="100" r="70" fill="gold" opacity="0.5" />
                <polygon points="100,40 120,85 170,85 130,115 145,165 100,135 55,165 70,115 30,85 80,85" fill="gold" />
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
              setFlipped(false);
            }}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
          >
            Bắt đầu lại
          </Button>
        </div>
      ) : (
        <>
          {/* Main card area */}
          <div className="flex-1 flex items-center justify-center p-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentWord.id + (flipped ? "-flipped" : "")}
                initial={{ rotateY: flipped ? -90 : 0, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: flipped ? 0 : 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-md perspective-card"
              >
                <Card className={`h-[350px] w-full flex flex-col ${learned.has(currentWord.id) ? "border-green-500 border-2" : ""}`}>
                  <CardContent className="flex-1 flex flex-col items-center justify-center text-center p-6 gap-4">
                    {flipped ? (
                      <>
                        <h3 className="text-3xl font-semibold">{currentWord.translation}</h3>
                        <p className="text-muted-foreground">{currentWord.example_translation}</p>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-2">
                          <h2 className="text-4xl font-bold">{currentWord.text}</h2>
                          {currentWord.audio && (
                            <AudioPlayer
                              src={currentWord.audio}
                              onError={handleAudioError}
                            />
                          )}
                        </div>
                        <p className="italic text-lg">{currentWord.pronunciation}</p>
                        <p className="text-muted-foreground">{currentWord.example}</p>
                      </>
                    )}

                    <div className="text-sm text-muted-foreground mt-auto">
                      Card {currentIndex + 1} of {sessionWords.length}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Fixed bottom controls */}
          <div className="p-4 flex justify-between items-center bg-background/80 backdrop-blur-sm border-t">
            <Button variant="outline" onClick={prevCard}>Previous</Button>
            
            <div className="flex gap-2">
              <Button
                variant={learned.has(currentWord.id) ? "default" : "outline"}
                onClick={toggleLearned}
                className={learned.has(currentWord.id) ? "bg-green-600 hover:bg-green-700" : ""}
              >
                <Check className="mr-2 h-4 w-4" />
                {learned.has(currentWord.id) ? "Learned" : "Mark as Learned"}
              </Button>
              
              <Button 
                variant="secondary" 
                onClick={() => setFlipped(!flipped)}
              >
                <RotateCw className="mr-2 h-4 w-4" />
                Flip
              </Button>
            </div>
            
            <Button variant="outline" onClick={nextCard}>Next</Button>
          </div>
        </>
      )}
    </div>
  );
}
