
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { TurtleProgress } from "@/components/shared/TurtleProgress";
import { VocabularyModule } from "@/components/modules/VocabularyModule";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

const WORDS_PER_SESSION = 10; // Should match the value in VocabularyModule

export default function VocabularyPage() {
  const [_, navigate] = useLocation();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => navigate("/")} 
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="ml-auto text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Learned: <span id="vocab-score">0</span>/{WORDS_PER_SESSION}
        </div>
      </div>
      
      <div className="mt-6">
        <VocabularyModule onScoreChange={(score) => {
          const scoreElement = document.getElementById('vocab-score');
          if (scoreElement) scoreElement.textContent = score.toString();
        }} />
      </div>
    </div>
  );
}
