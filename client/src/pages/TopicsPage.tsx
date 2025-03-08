
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import { vocabulary } from "@/data/content";

export default function TopicsPage() {
  const [_, navigate] = useLocation();
  const [topics, setTopics] = useState<string[]>([]);

  // Extract unique topics from vocabulary data
  useEffect(() => {
    const uniqueTopics = [...new Set(
      vocabulary.words
        .filter(word => word.topic)
        .map(word => word.topic as string)
    )];
    setTopics(uniqueTopics);
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6 sticky top-0 z-10 py-4 bg-background">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate("/")}
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Vocabulary Topics
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.map((topic) => (
          <Card 
            key={topic} 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate(`/vocabulary?topic=${encodeURIComponent(topic)}`)}
          >
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold">{topic}</h2>
              <p className="text-muted-foreground mt-2">
                {vocabulary.words.filter(word => word.topic === topic).length} words
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
