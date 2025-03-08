
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Book, BookOpen, Mic, Pencil } from "lucide-react";
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => {
          // Get total words for this topic
          const topicWords = vocabulary.words.filter(word => word.topic === topic);
          const totalWords = topicWords.length;
          
          // This would need to be connected to actual user progress data
          // For now, generating a random number for demo purposes
          const wordsLearned = Math.floor(Math.random() * (totalWords + 1));
          const progressPercent = totalWords > 0 ? (wordsLearned / totalWords) * 100 : 0;
          
          // Generate a consistent color based on the topic name
          const hash = topic.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
          const hue = hash % 360;
          const bgColor = `hsl(${hue}, 80%, 92%)`;
          const iconColor = `hsl(${hue}, 80%, 40%)`;
          
          // Pick an icon based on the topic name
          const getTopicIcon = (topicName) => {
            const firstChar = topicName.charAt(0).toLowerCase();
            if ('abcd'.includes(firstChar)) return <Book className="h-6 w-6" style={{color: iconColor}} />;
            if ('efgh'.includes(firstChar)) return <BookOpen className="h-6 w-6" style={{color: iconColor}} />;
            if ('ijklm'.includes(firstChar)) return <Mic className="h-6 w-6" style={{color: iconColor}} />;
            return <Pencil className="h-6 w-6" style={{color: iconColor}} />;
          };
          
          return (
            <Card 
              key={topic} 
              className="cursor-pointer hover:shadow-lg transition-all hover:translate-y-[-5px] overflow-hidden group"
              onClick={() => navigate(`/vocabulary?topic=${encodeURIComponent(topic)}`)}
            >
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <div 
                    className="p-3 rounded-full mr-4 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: bgColor }}
                  >
                    {getTopicIcon(topic)}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">{topic}</h2>
                    <p className="text-sm text-muted-foreground">
                      {totalWords} words
                    </p>
                  </div>
                </div>
                
                <div className="mt-auto pt-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span className="font-medium">{wordsLearned}/{totalWords} words</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-500 ease-out group-hover:opacity-80"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
