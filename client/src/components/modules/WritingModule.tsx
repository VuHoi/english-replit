import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { writing } from "@/data/content";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { Send } from "lucide-react";

export function WritingModule() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submission, setSubmission] = useState("");
  const [submitted, setSubmitted] = useState<Set<string>>(new Set());

  const currentPrompt = writing.prompts[currentIndex];

  const handleSubmit = () => {
    setSubmitted((prev) => new Set([...prev, currentPrompt.id]));
    // Here we would typically send the submission to the server
    setSubmission("");
    setCurrentIndex((i) => (i + 1) % writing.prompts.length);
  };

  const wordCount = submission.trim().split(/\s+/).length;
  const isValidLength = wordCount >= currentPrompt.minWords && 
                       wordCount <= currentPrompt.maxWords;

  return (
    <div className="space-y-6">
      <ProgressBar
        value={submitted.size}
        max={writing.prompts.length}
        label="Writing Progress"
      />

      <Card>
        <CardHeader>
          <CardTitle>{currentPrompt.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose">
            <p>{currentPrompt.description}</p>
            <p className="text-sm text-muted-foreground">
              Write between {currentPrompt.minWords} and {currentPrompt.maxWords} words
            </p>
          </div>

          <Textarea
            value={submission}
            onChange={(e) => setSubmission(e.target.value)}
            placeholder="Write your response here..."
            className="min-h-[200px]"
          />

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              Words: {wordCount}
            </span>
            <Button
              onClick={handleSubmit}
              disabled={!isValidLength}
            >
              Submit
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
