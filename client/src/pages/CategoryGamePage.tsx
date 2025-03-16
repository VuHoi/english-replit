
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import { vocabulary } from "@/data/content";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

type Option = {
  text: string;
  type: 'definition' | 'example' | 'context';
  isCorrect: boolean;
};

export default function CategoryGamePage() {
  const [_, navigate] = useLocation();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [gameWords, setGameWords] = useState(
    vocabulary.words
      .sort(() => Math.random() - 0.5)
      .slice(0, 10)
  );

  const currentWord = gameWords[currentWordIndex];

  useEffect(() => {
    if (!currentWord) return;
    const correctOption = Math.floor(Math.random() * 4);
    const newOptions: Option[] = [];
    const otherWords = vocabulary.words
      .filter(w => w.id !== currentWord.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    for (let i = 0; i < 4; i++) {
      if (i === correctOption) {
        newOptions.push({
          text: currentWord.definition,
          type: 'definition',
          isCorrect: true
        });
      } else {
        const wrongWord = otherWords[i > correctOption ? i - 1 : i];
        if (wrongWord) {
          newOptions.push({
            text: wrongWord.definition,
            type: 'definition',
            isCorrect: false
          });
        }
      }
    }

    setOptions(newOptions);
    setTimeLeft(10);
    setSelectedOption(null);
    setIsCorrect(null);
  }, [currentWordIndex, gameWords]);

  useEffect(() => {
    if (timeLeft > 0 && !selectedOption) {
      const timer = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !selectedOption) {
      handleNextWord();
    }
  }, [timeLeft, selectedOption]);

  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null) return;

    setSelectedOption(index);
    const correct = options[index].isCorrect;
    setIsCorrect(correct);

    if (correct) {
      setScore(s => s + 10);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4F46E5', '#22C55E', '#EAB308']
      });
    }

    setTimeout(handleNextWord, 1500);
  };

  const handleNextWord = () => {
    if (currentWordIndex === gameWords.length - 1) {
      setShowResult(true);
    } else {
      setCurrentWordIndex(i => i + 1);
    }
  };

  const startNewGame = () => {
    setGameWords(
      vocabulary.words
        .sort(() => Math.random() - 0.5)
        .slice(0, 10)
    );
    setCurrentWordIndex(0);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center mb-6">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/games")}
            className="mr-4 hover:scale-105 transition-transform"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Vocabulary Preview
          </h1>
          <motion.div 
            className="ml-auto text-lg font-semibold"
            animate={{ scale: score % 20 === 0 ? [1, 1.2, 1] : 1 }}
          >
            Score: <span className="text-primary">{score}</span>
          </motion.div>
        </div>

        {!showResult ? (
          <div className="max-w-2xl mx-auto">
            <div className="mb-4 h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: "100%" }}
                animate={{ width: `${(timeLeft / 10) * 100}%` }}
                transition={{ duration: 1 }}
              />
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-8 mb-6 backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 shadow-xl">
                <motion.h2 
                  className="text-4xl font-bold text-center mb-3"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentWord?.word}
                </motion.h2>
                <p className="text-center text-gray-500 dark:text-gray-400 mb-4">
                  {currentWord?.phonetic}
                </p>
              </Card>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              <AnimatePresence>
                {options.map((option, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Button
                      variant={selectedOption === index
                        ? (options[index].isCorrect ? "default" : "destructive")
                        : "outline"
                      }
                      className={`w-full h-auto p-6 text-left transition-all hover:scale-105 ${
                        selectedOption !== null && options[index].isCorrect
                          ? "ring-2 ring-green-500"
                          : ""
                      }`}
                      onClick={() => handleOptionSelect(index)}
                    >
                      {option.text}
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <motion.div 
            className="text-center py-12"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Game Over!
            </h2>
            <p className="text-2xl mb-8">
              Final Score: <span className="text-primary font-bold">{score}</span>
            </p>
            <Button 
              onClick={startNewGame}
              size="lg"
              className="hover:scale-105 transition-transform"
            >
              Play Again
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
