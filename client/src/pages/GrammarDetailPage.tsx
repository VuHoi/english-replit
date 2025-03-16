
import { useLocation, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BookOpen } from "lucide-react";

export default function GrammarDetailPage() {
  const [_, navigate] = useLocation();
  const { id } = useParams();

  const courseDetails = {
    1: {
      title: "Basic Grammar",
      description: "Learn fundamental English grammar rules",
      lessons: [
        { title: "Simple Present Tense", content: "Usage and examples of simple present tense" },
        { title: "Simple Past Tense", content: "Understanding past tense structures" },
        { title: "Articles (A, An, The)", content: "When and how to use articles" }
      ]
    },
    2: {
      title: "Intermediate Grammar",
      description: "Advanced tenses and structures",
      lessons: [
        { title: "Present Perfect", content: "Understanding present perfect usage" },
        { title: "Past Perfect", content: "Complex past tense structures" },
        { title: "Conditionals", content: "If clauses and conditions" }
      ]
    },
    3: {
      title: "Advanced Grammar",
      description: "Complex sentences and academic writing",
      lessons: [
        { title: "Passive Voice", content: "Advanced passive constructions" },
        { title: "Reported Speech", content: "Direct and indirect speech" },
        { title: "Complex Clauses", content: "Advanced sentence structures" }
      ]
    }
  }[id as keyof typeof courseDetails];

  if (!courseDetails) {
    navigate("/grammar/courses");
    return null;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate("/grammar/courses")}
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
          {courseDetails.title}
        </h1>
      </div>

      <p className="text-muted-foreground mb-8">{courseDetails.description}</p>

      <div className="grid gap-4">
        {courseDetails.lessons.map((lesson, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                {lesson.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{lesson.content}</p>
              <Button className="mt-4" onClick={() => navigate(`/grammar`)}>
                Start Lesson
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
