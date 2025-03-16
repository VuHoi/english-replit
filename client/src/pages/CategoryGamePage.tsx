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

    // Generate options for current word
    const correctOption = Math.floor(Math.random() * 4);
    const newOptions: Option[] = [];

    // Get random words for wrong options
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
        if (wrongWord) { //added null check
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
  }, [currentWordIndex, gameWords]); //added gameWords to dependency array

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
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      // Added feedback for incorrect answer.
      alert("Incorrect!");
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
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate("/games")}
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Vocabulary Preview
        </h1>
        <div className="ml-auto">
          Score: <span className="text-primary font-bold">{score}</span>
        </div>
      </div>

      {!showResult ? (
        <div className="max-w-2xl mx-auto">
          <div className="mb-4 h-2 bg-gray-200 rounded">
            <div
              className="h-full bg-primary rounded transition-all duration-1000"
              style={{ width: `${(timeLeft / 10) * 100}%` }}
            />
          </div>

          <Card className="p-6 mb-6">
            <h2 className="text-3xl font-bold text-center mb-2">
              {currentWord?.word}
            </h2>
            <p className="text-center text-gray-500 mb-4">
              {currentWord?.phonetic}
            </p>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            {options.map((option, index) => (
              <Button
                key={index}
                variant={selectedOption === index
                  ? (options[index].isCorrect ? "default" : "destructive")
                  : "outline"
                }
                className={`h-auto p-4 text-left ${
                  selectedOption !== null && options[index].isCorrect
                    ? "ring-2 ring-green-500"
                    : ""
                }`}
                onClick={() => handleOptionSelect(index)}
              >
                {option.text}
              </Button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Game Over!</h2>
          <p className="text-xl mb-6">
            Final Score: <span className="text-primary font-bold">{score}</span>
          </p>
          <Button onClick={startNewGame}>Play Again</Button>
        </div>
      )}
    </div>
  );
}