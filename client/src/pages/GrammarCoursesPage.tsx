
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BookOpen, Star } from "lucide-react";
import { useLocation } from "wouter";

export default function GrammarCoursesPage() {
  const [_, navigate] = useLocation();
  
  const courses = [
    {
      id: 1,
      title: "Basic Grammar",
      description: "Learn fundamental English grammar rules",
      level: "Beginner",
      lessons: 12,
      icon: <Star className="h-5 w-5 text-yellow-500" />
    },
    {
      id: 2,
      title: "Intermediate Grammar",
      description: "Advanced tenses and structures",
      level: "Intermediate",
      lessons: 15,
      icon: <Star className="h-5 w-5 text-blue-500" />
    },
    {
      id: 3,
      title: "Advanced Grammar",
      description: "Complex sentences and academic writing",
      level: "Advanced",
      lessons: 20,
      icon: <Star className="h-5 w-5 text-purple-500" />
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate("/grammar")}
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
          Grammar Courses
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                {course.title}
                {course.icon}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{course.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{course.level}</span>
                <span className="text-sm text-muted-foreground">{course.lessons} lessons</span>
              </div>
              <Button 
                className="w-full mt-4"
                onClick={() => navigate(`/grammar/course/${course.id}`)}
              >
                Start Learning
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
