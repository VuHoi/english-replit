import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, RotateCw } from "lucide-react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  CarouselNext,
  CarouselPrevious 
} from "@/components/ui/carousel";
import TurtleProgress from "../shared/TurtleProgress";

// Mock vocabulary data (This will need to be replaced with the actual vocabulary data)
const vocabularyItems = [
  { id: 1, word: "Ubiquitous", definition: "Present, appearing, or found everywhere" },
  { id: 2, word: "Ephemeral", definition: "Lasting for a very short time" },
  { id: 3, word: "Serendipity", definition: "The occurrence of events by chance in a happy or beneficial way" },
  { id: 4, word: "Eloquent", definition: "Fluent or persuasive in speaking or writing" },
  { id: 5, word: "Resilience", definition: "The capacity to recover quickly from difficulties" },
];

export function VocabularyModule() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [markedItems, setMarkedItems] = useState<number[]>([]);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleMark = () => {
    if (!markedItems.includes(vocabularyItems[currentIndex].id)) {
      setMarkedItems([...markedItems, vocabularyItems[currentIndex].id]);
    } else {
      setMarkedItems(markedItems.filter(id => id !== vocabularyItems[currentIndex].id));
    }
  };

  const progress = (currentIndex / (vocabularyItems.length - 1)) * 100;

  return (
    <div className="vocabulary-game">
      {/* Progress Bar at top */}
      <div className="mb-8">
        <TurtleProgress value={progress} />
      </div>

      {/* Card Carousel */}
      <div className="card-container mb-8">
        <Carousel 
          opts={{
            align: "center",
            loop: false,
            skipSnaps: false,
            dragFree: false,
          }}
          onSelect={(api) => {
            const selectedIndex = api.selectedScrollSnap();
            setCurrentIndex(selectedIndex);
            setFlipped(false);
          }}
          className="w-full max-w-lg mx-auto"
        >
          <CarouselContent>
            {vocabularyItems.map((item, index) => (
              <CarouselItem key={item.id} className="basis-full">
                <div className="card-scene min-h-[300px] w-full">
                  <div className={`card-inner w-full h-full transform-style-3d transition-transform duration-500 ${flipped ? 'rotate-y-180' : ''}`}>
                    <div className="card-face card-front absolute w-full h-full backface-hidden">
                      <Card className="h-full flex items-center justify-center p-6 bg-card shadow-md">
                        <h3 className="text-3xl font-bold text-center">
                          {item.word}
                        </h3>
                        {markedItems.includes(item.id) && (
                          <div className="absolute top-2 right-2">
                            <Check className="h-6 w-6 text-green-500" />
                          </div>
                        )}
                      </Card>
                    </div>
                    <div className="card-face card-back absolute w-full h-full backface-hidden rotate-y-180">
                      <Card className="h-full flex items-center justify-center p-6 bg-card shadow-md">
                        <p className="text-xl text-center">
                          {item.definition}
                        </p>
                        {markedItems.includes(item.id) && (
                          <div className="absolute top-2 right-2">
                            <Check className="h-6 w-6 text-green-500" />
                          </div>
                        )}
                      </Card>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="flex justify-center gap-4 mt-4">
            <CarouselPrevious className="static transform-none" />
            <CarouselNext className="static transform-none" />
          </div>
        </Carousel>
      </div>

      {/* Control Buttons fixed at bottom */}
      <div className="control-buttons fixed bottom-0 left-0 right-0 bg-background p-4 flex justify-center gap-4 shadow-lg">
        <Button 
          variant="outline" 
          onClick={handleMark} 
          className={markedItems.includes(vocabularyItems[currentIndex].id) ? "bg-green-100" : ""}
        >
          {markedItems.includes(vocabularyItems[currentIndex].id) ? "Marked" : "Mark"}
        </Button>
        <Button onClick={handleFlip}>
          <RotateCw className="h-4 w-4 mr-2" />
          Flip
        </Button>
      </div>
    </div>
  );
}