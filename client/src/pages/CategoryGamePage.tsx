
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Trophy, RefreshCw } from "lucide-react";
import { useLocation } from "wouter";
import { vocabulary } from "@/data/content";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function CategoryGamePage() {
  const [_, navigate] = useLocation();
  const [categories, setCategories] = useState<string[]>([]);
  const [currentCategories, setCurrentCategories] = useState<string[]>([]);
  const [words, setWords] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Extract unique topics from vocabulary data
  useEffect(() => {
    const uniqueTopics = [...new Set(
      vocabulary.words
        .filter(word => word.topic)
        .map(word => word.topic as string)
    )];
    setCategories(uniqueTopics);
    startNewRound();
  }, []);

  const startNewRound = () => {
    // Select 3 random categories
    const shuffledCategories = [...categories].sort(() => Math.random() - 0.5);
    const selectedCategories = shuffledCategories.slice(0, 3);
    setCurrentCategories(selectedCategories);

    // Get 2 words from each category
    const gameWords: any[] = [];
    selectedCategories.forEach(category => {
      const categoryWords = vocabulary.words
        .filter(word => word.topic === category)
        .sort(() => Math.random() - 0.5)
        .slice(0, 2);
      gameWords.push(...categoryWords);
    });

    // Shuffle the words
    setWords(gameWords.sort(() => Math.random() - 0.5));
    setSelectedCategory(null);
    setSelectedWord(null);
    setMatches({});
    setIsCorrect(null);
    setShowResults(false);
  };

  const handleCategoryClick = (category: string) => {
    if (Object.values(matches).includes(category)) return;
    
    setSelectedCategory(category);
    if (selectedWord) {
      // Check if match is correct
      const word = words.find(w => w.id === selectedWord);
      const isMatch = word.topic === category;
      
      // Update state
      if (isMatch) {
        setMatches(prev => ({ ...prev, [selectedWord]: category }));
        setScore(prev => prev + 10);
        setIsCorrect(true);
        if (Object.keys(matches).length + 1 === words.length) {
          setTimeout(() => {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 }
            });
            setShowResults(true);
          }, 1000);
        }
      } else {
        setIsCorrect(false);
        if (score > 0) setScore(prev => prev - 5);
      }
      
      // Reset selections after a brief delay
      setTimeout(() => {
        setSelectedWord(null);
        setSelectedCategory(null);
        setIsCorrect(null);
      }, 1000);
    }
  };

  const handleWordClick = (wordId: string) => {
    if (matches[wordId]) return;
    
    setSelectedWord(wordId);
    if (selectedCategory) {
      // Check if match is correct
      const word = words.find(w => w.id === wordId);
      const isMatch = word.topic === selectedCategory;
      
      // Update state
      if (isMatch) {
        setMatches(prev => ({ ...prev, [wordId]: selectedCategory }));
        setScore(prev => prev + 10);
        setIsCorrect(true);
        if (Object.keys(matches).length + 1 === words.length) {
          setTimeout(() => {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 }
            });
            setShowResults(true);
          }, 1000);
        }
      } else {
        setIsCorrect(false);
        if (score > 0) setScore(prev => prev - 5);
      }
      
      // Reset selections after a brief delay
      setTimeout(() => {
        setSelectedWord(null);
        setSelectedCategory(null);
        setIsCorrect(null);
      }, 1000);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6 sticky top-0 z-10 py-4 bg-background">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate("/")}
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Category Game
        </h1>
        <div className="ml-auto flex items-center gap-2">
          <span className="font-semibold">Score: <span className="text-primary">{score}</span></span>
          <Button
            variant="outline"
            size="icon"
            onClick={startNewRound}
            className="ml-2"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isCorrect !== null && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`p-3 rounded-md text-white text-center mb-4 ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}
          >
            {isCorrect ? 'Correct match!' : 'Wrong match, try again!'}
          </motion.div>
        )}
      </AnimatePresence>

      {!showResults ? (
        <div className="grid gap-8">
          {/* Categories Section */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentCategories.map(category => {
                const isSelected = selectedCategory === category;
                const isMatched = Object.values(matches).includes(category);
                const matchCount = Object.values(matches).filter(c => c === category).length;
                
                return (
                  <Card 
                    key={category} 
                    className={`p-4 cursor-pointer transition-all duration-300 ${
                      isSelected ? 'ring-2 ring-primary ring-offset-2' : ''
                    } ${isMatched && matchCount >= 2 ? 'opacity-60 bg-green-50 dark:bg-green-950' : ''}`}
                    onClick={() => handleCategoryClick(category)}
                  >
                    <h3 className="text-lg font-medium">{category}</h3>
                    {matchCount > 0 && (
                      <div className="text-xs mt-1 text-green-600">{matchCount}/2 words matched</div>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
          
          {/* Words Section */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Words</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {words.map(word => {
                const isSelected = selectedWord === word.id;
                const isMatched = Boolean(matches[word.id]);
                
                return (
                  <Card 
                    key={word.id} 
                    className={`p-4 cursor-pointer transition-all duration-300 ${
                      isSelected ? 'ring-2 ring-primary ring-offset-2' : ''
                    } ${isMatched ? 'opacity-60 bg-green-50 dark:bg-green-950' : ''}`}
                    onClick={() => handleWordClick(word.id)}
                  >
                    <h3 className="text-lg font-medium">{word.word}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{word.definition.substring(0, 80)}{word.definition.length > 80 ? '...' : ''}</p>
                    {isMatched && (
                      <div className="text-xs mt-2 text-green-600">Matched to {matches[word.id]}</div>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
          
          <div className="text-center text-sm text-muted-foreground mt-4">
            Match words to their correct categories. 
            <br />+10 points for correct matches, -5 points for incorrect matches.
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8">
          <div className="mb-4">
            <Trophy className="h-16 w-16 text-yellow-500" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Round Complete!</h2>
          <p className="text-lg mb-4">Your score: <span className="font-bold text-primary">{score}</span></p>
          
          <Button 
            className="mt-4"
            onClick={startNewRound}
          >
            Play Again
          </Button>
          
          <Button 
            variant="outline"
            className="mt-2"
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
        </div>
      )}
    </div>
  );
}
