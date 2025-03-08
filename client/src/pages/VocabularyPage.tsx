import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { TurtleProgress } from "@/components/shared/TurtleProgress";
import { VocabularyModule } from "@/components/modules/VocabularyModule";
import { ArrowLeft } from "lucide-react";
import { useLocation, useSearch } from "wouter";

const WORDS_PER_SESSION = 10; // Should match the value in VocabularyModule

export default function VocabularyPage() {
  const [_, navigate] = useLocation();
  const search = useSearch();
  const params = new URLSearchParams(search);
  const topic = params.get("topic");

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6 sticky top-0 z-[1000] py-4 bg-background">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate("/topics")}
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        {topic && (
          <div className="text-lg font-medium bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            {decodeURIComponent(topic)}
          </div>
        )}
        <div className="ml-auto text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Learned: <span id="vocab-score">0</span>/{WORDS_PER_SESSION}
        </div>
      </div>

      <div className="mt-6 ">
        <VocabularyModule
          topic={topic ? decodeURIComponent(topic) : undefined}
          onScoreChange={(score) => {
            const scoreElement = document.getElementById("vocab-score");
            if (scoreElement) scoreElement.textContent = score.toString();
          }}
        />
      </div>
    </div>
  );
}
