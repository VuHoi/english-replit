import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, BookText, Mic2, PenTool, Gamepad2 } from "lucide-react";
import TurtleProgress from "@/components/shared/TurtleProgress";

export default function HomePage() {
  const [_, navigate] = useLocation();

  const modules = [
    {
      id: "vocabulary",
      title: "Vocabulary",
      description: "Learn new words and expand your vocabulary.",
      icon: <BookText className="h-5 w-5" />,
      path: "/topics",
      progress: 35,
    },
    {
      id: "grammar",
      title: "Grammar",
      description: "Master English grammar rules and structures.",
      icon: <BookOpen className="h-5 w-5" />,
      path: "/grammar/courses",
      progress: 20,
    },
    {
      id: "games",
      title: "Games",
      description: "Practice English with fun interactive games.",
      icon: <Gamepad2 className="h-5 w-5" />,
      path: "/games",
      progress: 40,
    },
    {
      id: "speaking",
      title: "Speaking",
      description: "Practice pronunciation and conversation skills.",
      icon: <Mic2 className="h-5 w-5" />,
      path: "/speaking",
      progress: 15,
    },
    {
      id: "writing",
      title: "Writing",
      description: "Develop your writing skills with practical exercises.",
      icon: <PenTool className="h-5 w-5" />,
      path: "/writing",
      progress: 10,
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
        English Learning Hub
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {modules.map((module) => (
          <Card
            key={module.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate(module.path)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl">{module.title}</CardTitle>
              <div className="text-primary">{module.icon}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {module.description}
              </p>
              <div className="pt-2">
                <TurtleProgress
                  value={module.progress}
                  max={100}
                  label={`${module.title} Progress`}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
