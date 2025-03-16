import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, User, Mail, Calendar as CalendarIcon, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export default function ProfilePage() {
  const [_, navigate] = useLocation();
  const [view, setView] = useState<'week' | 'month' | 'year'>('month');

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
                    <Button variant="outline" size="sm" onClick={() => setView('year')}>Year</Button>
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
                      const isSaturday = date.getDay() === 6;

                      return (
                        <div
                          key={i}
                          className={`h-20 rounded-lg flex items-center justify-center transition-all ${
                            isSelected 
                              ? 'animate-gradient bg-[size:400%] bg-gradient-to-br from-primary via-purple-500 to-pink-500 text-primary-foreground shadow-lg shadow-primary/20 scale-105 border-2 border-primary/20' 
                              : isSaturday 
                                ? 'bg-gradient-to-br from-purple-600 via-amber-400 to-emerald-400 text-white shadow-lg scale-105 border border-amber-200/30'
                                : 'bg-muted hover:bg-muted/80'
                          }`}
                        >
                          {date.toLocaleDateString('en-US', { weekday: 'short' })}
                        </div>
                      );
                    })}
                  </div>
                ) : view === 'month' ? (
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
                          className={`h-12 rounded-lg flex items-center justify-center transition-all group relative ${
                            i < 10 
                              ? 'bg-gradient-to-br from-purple-600 via-amber-400 to-emerald-400 text-white shadow-lg scale-105 border border-amber-200/30' 
                              : 'bg-muted hover:bg-muted/80'
                          }`}
                        >
                          {i + 1}
                          <div className="absolute -top-8 bg-black/80 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                            {i < 10 ? `${i} words learned` : 'Goal reached!'}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-4">
                    {Array.from({ length: 12 }, (_, monthIndex) => {
                      const daysInMonth = new Date(
                        new Date().getFullYear(),
                        monthIndex + 1,
                        0
                      ).getDate();

                      return (
                        <div key={monthIndex} className="space-y-2">
                          <div className="text-sm font-medium">
                            {new Date(2024, monthIndex).toLocaleString('default', { month: 'long' })}
                          </div>
                          <div className="grid grid-cols-7 gap-1">
                            {Array.from({ length: daysInMonth }, (_, i) => {
                              const date = new Date(2024, monthIndex, i + 1);
                              const isSelected = [new Date(2024, 0, 15), new Date(2024, 0, 16)]
                                .some(selectedDate =>
                                  selectedDate.toDateString() === date.toDateString()
                                );
                              
                              return (
                                <div
                                  key={i}
                                  className={`h-6 w-6 rounded-sm flex items-center justify-center text-xs transition-all ${
                                    isSelected
                                      ? 'bg-gradient-to-br from-purple-600 via-amber-400 to-emerald-400 text-white shadow-sm scale-105'
                                      : 'bg-muted hover:bg-muted/80'
                                  }`}
                                >
                                  {i + 1}
                                </div>
                              );
                            })}
                          </div>
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