import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Volume2 } from "lucide-react";
import { useLocation } from "wouter";
import { vocabulary } from "@/data/content";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

type QuestionType = 'definition' | 'example' | 'audio' | 'context' | 'image';

type Option = {
  text: string;
  type: QuestionType;
  isCorrect: boolean;
  audioUrl?: string;
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
  const [currentQuestionType, setCurrentQuestionType] = useState<QuestionType>('definition');
  const [gameWords, setGameWords] = useState(
    vocabulary.words
      .sort(() => Math.random() - 0.5)
      .slice(0, 10)
  );

  const currentWord = gameWords[currentWordIndex];

  const playAudio = (url: string) => {
    new Audio(url).play().catch(console.error);
  };

  useEffect(() => {
    if (!currentWord) return;

    const questionTypes: QuestionType[] = ['definition', 'example', 'audio', 'context', 'image'];
    const newQuestionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    setCurrentQuestionType(newQuestionType);

    const correctOption = Math.floor(Math.random() * 4);
    const newOptions: Option[] = [];
    const otherWords = vocabulary.words
      .filter(w => w.id !== currentWord.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    for (let i = 0; i < 4; i++) {
      if (i === correctOption) {
        newOptions.push({
          text: newQuestionType === 'audio' ? currentWord.word : 
                newQuestionType === 'example' ? currentWord.example :
                newQuestionType === 'context' ? currentWord.context :
                currentWord.definition,
          type: newQuestionType,
          isCorrect: true,
          audioUrl: currentWord.audioUrl
        });
      } else {
        const wrongWord = otherWords[i > correctOption ? i - 1 : i];
        if (wrongWord) {
          newOptions.push({
            text: newQuestionType === 'audio' ? wrongWord.word :
                  newQuestionType === 'example' ? wrongWord.example :
                  newQuestionType === 'context' ? wrongWord.context :
                  wrongWord.definition,
            type: newQuestionType,
            isCorrect: false,
            audioUrl: wrongWord.audioUrl
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
      setSelectedOption(-1); // Use -1 to indicate timeout
      setIsCorrect(false);
      setTimeout(handleNextWord, 1500);
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

  const getQuestionText = () => {
    switch (currentQuestionType) {
      case 'audio':
        return "Listen and choose the correct word:";
      case 'example':
        return "Choose the word that fits this example:";
      case 'context':
        return "Select the word that matches this context:";
      case 'image':
        return "What does this image represent?";
      default:
        return "Choose the correct definition:";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto py-4 px-4 min-h-screen flex flex-col">
        <div className="flex items-center mb-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/games")}
            className="mr-4 hover:scale-105 transition-transform"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Vocabulary Quiz
          </h1>
          <motion.div 
            className="ml-auto flex items-center gap-3"
            animate={{ scale: score % 20 === 0 ? [1, 1.2, 1] : 1 }}
          >
            <div className="bg-white/20 backdrop-blur-lg rounded-full px-4 py-2 flex items-center gap-2">
              <span className="text-white/80">Score:</span>
              <span className="text-2xl font-bold text-white">{score}</span>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-full px-4 py-2">
              <span className="text-xl font-bold text-white">{timeLeft}s</span>
            </div>
          </motion.div>
        </div>

        {!showResult ? (
          <div className="flex-1 flex flex-col max-w-md mx-auto w-full">
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
              className="mb-6"
            >
              <Card className="p-6 backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 shadow-xl">
                {currentQuestionType === 'audio' ? (
                  <div className="flex flex-col items-center gap-4">
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-full p-6"
                      onClick={() => currentWord?.audioUrl && playAudio(currentWord.audioUrl)}
                    >
                      <Volume2 className="h-8 w-8" />
                    </Button>
                    <p className="text-center text-sm text-gray-500">
                      Click to play audio
                    </p>
                  </div>
                ) : currentQuestionType === 'image' ? (
                  <div className="flex flex-col items-center gap-4">
                    <img 
                      src={currentWord?.imageUrl} 
                      alt="Question" 
                      className="w-full max-w-[300px] h-auto rounded-lg shadow-lg object-cover"
                    />
                    <p className="text-center text-sm text-gray-500">
                      Choose the word that matches this image
                    </p>
                  </div>
                ) : (
                  <>
                    <motion.h2 
                      className="text-2xl font-bold text-center mb-3"
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {currentWord?.word}
                    </motion.h2>
                    <p className="text-center text-gray-500 dark:text-gray-400">
                      {getQuestionText()}
                    </p>
                  </>
                )}
              </Card>
            </motion.div>

            <div className="grid grid-cols-1 gap-3">
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
                      variant={selectedOption === index || (selectedOption === -1 && options[index].isCorrect)
                        ? (options[index].isCorrect ? "default" : "destructive")
                        : "outline"
                      }
                      className={`w-full min-h-[60px] p-4 text-left transition-all hover:scale-105 ${
                        (selectedOption !== null && options[index].isCorrect) || (selectedOption === -1 && options[index].isCorrect)
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
            className="flex-1 flex flex-col items-center justify-center"
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