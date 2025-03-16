
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SpeakingModule } from "@/components/modules/SpeakingModule";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SpeakingPage() {
  const [_, navigate] = useLocation();
  const [showPractice, setShowPractice] = useState(false);

  const theory = {
    title: "English Pronunciation Basics",
    explanation: "Mastering English pronunciation involves understanding and practicing various sounds, stress patterns, and intonation.",
    rules: [
      "Pay attention to word stress - English words have stressed and unstressed syllables",
      "Practice linking sounds between words",
      "Use rising intonation for questions and falling intonation for statements",
      "Focus on difficult sounds like 'th', 'r', and 'l'"
    ],
    techniques: [
      "Record yourself speaking and compare with native speakers",
      "Practice tongue twisters for specific sounds",
      "Listen and repeat exercises",
      "Shadow native speaker conversations"
    ]
  };

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
        <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
          {showPractice ? "Speaking Practice" : "Speaking Theory"}
        </h1>
      </div>
      
      {!showPractice ? (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{theory.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{theory.explanation}</p>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Key Rules:</h3>
              <ul className="list-disc pl-6">
                {theory.rules.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            </div>
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Practice Techniques:</h3>
              <ul className="list-disc pl-6">
                {theory.techniques.map((technique, index) => (
                  <li key={index}>{technique}</li>
                ))}
              </ul>
            </div>
            <Button 
              className="mt-6"
              onClick={() => setShowPractice(true)}
            >
              Start Practice
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="mt-6">
          <SpeakingModule />
          <Button 
            variant="outline"
            className="mt-4"
            onClick={() => setShowPractice(false)}
          >
            Back to Theory
          </Button>
        </div>
      )}
    </div>
  );
}
