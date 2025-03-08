import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { vocabulary } from "@/data/content";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function VocabularyModule() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [learned, setLearned] = useState<Set<string>>(new Set());

  const currentWord = vocabulary.words[currentIndex];

  const next = () => {
    setCurrentIndex((i) => (i + 1) % vocabulary.words.length);
    setFlipped(false);
  };

  const previous = () => {
    setCurrentIndex((i) => (i - 1 + vocabulary.words.length) % vocabulary.words.length);
    setFlipped(false);
  };

  const toggleLearned = () => {
    const newLearned = new Set(learned);
    if (learned.has(currentWord.id)) {
      newLearned.delete(currentWord.id);
    } else {
      newLearned.add(currentWord.id);
    }
    setLearned(newLearned);
  };

  return (
    <div className="space-y-6">
      <ProgressBar 
        value={learned.size} 
        max={vocabulary.words.length}
        label="Words Learned" 
      />

      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Vocabulary Flashcards</CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            className="min-h-[200px] flex items-center justify-center cursor-pointer"
            onClick={() => setFlipped(!flipped)}
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">
                {flipped ? currentWord.definition : currentWord.word}
              </h3>
              {flipped && (
                <p className="text-muted-foreground italic">
                  {currentWord.example}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <Button variant="outline" onClick={previous}>
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button
              variant={learned.has(currentWord.id) ? "default" : "outline"}
              onClick={toggleLearned}
            >
              {learned.has(currentWord.id) ? "Learned" : "Mark as Learned"}
            </Button>
            <Button variant="outline" onClick={next}>
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
