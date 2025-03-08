import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { speaking } from "@/data/content";
import { AudioRecorder } from "@/components/shared/AudioRecorder";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { ChevronRight } from "lucide-react";

export function SpeakingModule() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  const currentExercise = speaking.exercises[currentIndex];

  const handleRecordingComplete = (audioBlob: Blob) => {
    setCompleted((prev) => new Set([...prev, currentExercise.id]));
  };

  const nextExercise = () => {
    setCurrentIndex((i) => (i + 1) % speaking.exercises.length);
  };

  return (
    <div className="space-y-6">
      <ProgressBar
        value={completed.size}
        max={speaking.exercises.length}
        label="Speaking Progress"
      />

      <Card>
        <CardHeader>
          <CardTitle>Speaking Practice</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">{currentExercise.phrase}</h2>
            <p className="text-muted-foreground">
              Difficulty: {currentExercise.difficulty}
            </p>
            <div className="bg-muted p-4 rounded-md">
              <h3 className="font-semibold mb-2">Tips:</h3>
              <p>{currentExercise.tips}</p>
            </div>
          </div>

          <AudioRecorder onRecordingComplete={handleRecordingComplete} />

          <div className="flex justify-end mt-4">
            <Button onClick={nextExercise}>
              Next Exercise
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
