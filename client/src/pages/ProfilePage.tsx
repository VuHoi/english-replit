import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, User, Mail, Calendar as CalendarIcon, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export default function ProfilePage() {
  const [_, navigate] = useLocation();
  const [view, setView] = useState<'week' | 'month'>('month');

  // Example user data - replace with real data from your backend
  const userData = {
    name: "John Doe",
    email: "john@example.com",
    joinDate: "2024-01-01",
    achievements: [
      { name: "Vocabulary Master", description: "Completed 100 vocabulary exercises" },
      { name: "Grammar Expert", description: "Finished all grammar courses" },
      { name: "Speaking Pro", description: "Completed 50 speaking exercises" }
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
        <Avatar className="h-12 w-12 mr-4">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          User Profile
        </h1>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>{userData.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{userData.email}</span>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Learning Progress Calendar
          </h2>

          <div className="flex flex-col gap-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Completion Days</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setView('week')}>Week</Button>
                    <Button variant="outline" size="sm" onClick={() => setView('month')}>Month</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                {view === 'week' ? (
                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 7 }, (_, i) => {
                      const date = new Date();
                      date.setDate(date.getDate() - date.getDay() + i);
                      const isSelected = [new Date(2024, 0, 15), new Date(2024, 0, 16)]
                        .some(selectedDate => 
                          selectedDate.toDateString() === date.toDateString()
                        );
                      
                      return (
                        <div
                          key={i}
                          className={`h-20 rounded-lg flex items-center justify-center ${
                            isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'
                          }`}
                        >
                          {date.toLocaleDateString('en-US', { weekday: 'short' })}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: new Date(
                      new Date().getFullYear(),
                      new Date().getMonth() + 1,
                      0
                    ).getDate() }, (_, i) => {
                      const date = new Date();
                      date.setDate(i + 1);
                      const isSelected = [new Date(2024, 0, 15), new Date(2024, 0, 16)]
                        .some(selectedDate => 
                          selectedDate.toDateString() === date.toDateString()
                        );
                      
                      return (
                        <div
                          key={i}
                          className={`h-12 rounded-lg flex items-center justify-center ${
                            isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'
                          }`}
                        >
                          {i + 1}
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {userData.achievements.map((achievement, index) => (
                <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                  <h3 className="font-medium">{achievement.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}