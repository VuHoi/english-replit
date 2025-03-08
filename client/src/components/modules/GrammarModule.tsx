import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { grammar } from "@/data/content";
import { ProgressBar } from "@/components/shared/ProgressBar";

export function GrammarModule() {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [isChecked, setIsChecked] = useState(false);
  const [score, setScore] = useState(0);

  const currentLesson = grammar.lessons[currentLessonIndex];
  const currentExercise = currentLesson.exercises[0];

  const checkAnswer = () => {
    if (selectedAnswer === currentExercise.answer) {
      setScore((s) => s + 1);
    }
    setIsChecked(true);
  };

  const nextLesson = () => {
    setCurrentLessonIndex((i) => (i + 1) % grammar.lessons.length);
    setSelectedAnswer("");
    setIsChecked(false);
  };

  return (
    <div className="space-y-6">
      <ProgressBar
        value={score}
        max={grammar.lessons.length}
        label="Grammar Progress"
      />

      <Card>
        <CardHeader>
          <CardTitle>{currentLesson.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose">
            <p>{currentLesson.explanation}</p>
            <ul>
              {currentLesson.examples.map((example, i) => (
                <li key={i}>{example}</li>
              ))}
            </ul>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-4">Practice Exercise</h3>
            <p className="mb-4">{currentExercise.question}</p>

            <RadioGroup
              value={selectedAnswer}
              onValueChange={setSelectedAnswer}
              className="space-y-2"
            >
              {currentExercise.options.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={option} />
                  <Label htmlFor={option}>{option}</Label>
                </div>
              ))}
            </RadioGroup>

            <div className="mt-6 space-x-4">
              {!isChecked ? (
                <Button onClick={checkAnswer} disabled={!selectedAnswer}>
                  Check Answer
                </Button>
              ) : (
                <Button onClick={nextLesson}>Next Lesson</Button>
              )}
            </div>

            {isChecked && (
              <div className={`mt-4 p-4 rounded-md ${
                selectedAnswer === currentExercise.answer
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}>
                {selectedAnswer === currentExercise.answer
                  ? "Correct! Well done!"
                  : `Incorrect. The correct answer is: ${currentExercise.answer}`}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
