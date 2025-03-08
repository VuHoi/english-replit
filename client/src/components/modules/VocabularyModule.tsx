import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { vocabulary } from "@/data/content";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { AudioPlayer } from "@/components/shared/AudioPlayer";
import { ChevronLeft, ChevronRight, RotateCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function VocabularyModule() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [learned, setLearned] = useState<Set<string>>(new Set());
  const { toast } = useToast();

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

  const handleAudioError = () => {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Could not play pronunciation audio.",
    });
  };

  return (
    <div className="space-y-6">
      <ProgressBar 
        value={learned.size} 
        max={vocabulary.words.length}
        label="Words Learned" 
      />

      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Vocabulary Flashcards</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Flashcard container with perspective */}
          <div className="relative preserve-3d" style={{ perspective: "1000px" }}>
            {/* Card inner container with flip animation */}
            <div
              className={`relative w-full min-h-[300px] cursor-pointer transition-transform duration-500 ease-in-out transform-style-3d ${
                flipped ? "rotate-y-180" : ""
              }`}
              onClick={() => setFlipped(!flipped)}
            >
              {/* Front of card */}
              <div className="absolute w-full h-full backface-hidden">
                <div className="flex flex-col items-center justify-center h-full p-6 space-y-4">
                  <h3 className="text-4xl font-bold text-center">{currentWord.word}</h3>
                  <p className="text-xl text-muted-foreground">{currentWord.phonetic}</p>
                  <div className="mt-4">
                    <AudioPlayer 
                      audioUrl={currentWord.audioUrl} 
                      onError={handleAudioError}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">Click to see definition</p>
                </div>
              </div>

              {/* Back of card */}
              <div className="absolute w-full h-full backface-hidden rotate-y-180">
                <div className="flex flex-col items-center justify-center h-full p-6 space-y-4">
                  <div className="text-center space-y-4">
                    <h3 className="text-2xl font-bold">{currentWord.definition}</h3>
                    <div className="space-y-2">
                      <p className="text-lg font-medium">Example:</p>
                      <p className="text-muted-foreground italic">"{currentWord.example}"</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-lg font-medium">Context:</p>
                      <p className="text-muted-foreground">"{currentWord.context}"</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">Click to see word</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-8">
            <Button variant="outline" onClick={previous}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <div className="flex gap-2">
              <Button
                variant={learned.has(currentWord.id) ? "default" : "outline"}
                onClick={toggleLearned}
              >
                {learned.has(currentWord.id) ? "Learned" : "Mark as Learned"}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setFlipped(!flipped)}
              >
                <RotateCw className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="outline" onClick={next}>
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}