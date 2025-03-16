
import { useLocation, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Mic } from "lucide-react";

export default function SpeakingDetailPage() {
  const [_, navigate] = useLocation();
  const { id } = useParams();

  const courseDetails = {
    1: {
      title: "Basic Pronunciation",
      description: "Master fundamental English sounds and pronunciation",
      lessons: [
        { title: "Vowel Sounds", content: "Practice basic vowel sounds in English" },
        { title: "Consonant Sounds", content: "Master common consonant sounds" },
        { title: "Word Stress", content: "Learn proper word stress patterns" }
      ]
    },
    2: {
      title: "Conversation Skills",
      description: "Practice everyday conversations and expressions",
      lessons: [
        { title: "Greetings & Introductions", content: "Common greetings and self-introductions" },
        { title: "Daily Routines", content: "Talking about daily activities" },
        { title: "Making Plans", content: "Arranging meetings and activities" }
      ]
    },
    3: {
      title: "Advanced Speaking",
      description: "Complex discussions and presentations",
      lessons: [
        { title: "Public Speaking", content: "Techniques for effective presentations" },
        { title: "Debate Skills", content: "Expressing and defending opinions" },
        { title: "Professional Communication", content: "Business and academic speaking" }
      ]
    }
  }[id as keyof typeof courseDetails];

  if (!courseDetails) {
    navigate("/speaking/courses");
    return null;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate("/speaking/courses")}
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
          {courseDetails.title}
        </h1>
      </div>

      <p className="text-muted-foreground mb-8">{courseDetails.description}</p>

      <div className="grid gap-4">
        {courseDetails.lessons.map((lesson, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mic className="h-5 w-5" />
                {lesson.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{lesson.content}</p>
              <Button className="mt-4" onClick={() => navigate(`/speaking`)}>
                Start Lesson
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
