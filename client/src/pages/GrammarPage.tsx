
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GrammarModule } from "@/components/modules/GrammarModule";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function GrammarPage() {
  const [_, navigate] = useLocation();
  const [showPractice, setShowPractice] = useState(false);

  const theory = {
    title: "Present Simple Tense",
    explanation: "The present simple tense is used to describe habits, unchanging situations, general truths, and fixed arrangements.",
    rules: [
      "Use the base form of the verb for I/you/we/they",
      "Add -s or -es for he/she/it",
      "Use do/does for negative and question forms"
    ],
    examples: [
      "I play tennis every weekend.",
      "She works in a bank.",
      "They don't live in London.",
      "Does he speak English?"
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
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
          {showPractice ? "Grammar Practice" : "Grammar Theory"}
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
              <h3 className="font-semibold mb-2">Rules:</h3>
              <ul className="list-disc pl-6">
                {theory.rules.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Examples:</h3>
              <ul className="list-disc pl-6">
                {theory.examples.map((example, index) => (
                  <li key={index}>{example}</li>
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
          <GrammarModule />
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
