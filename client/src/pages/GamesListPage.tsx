
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, BookOpen, Puzzle, LayoutGrid, BookText } from "lucide-react";
import { useLocation } from "wouter";

export default function GamesListPage() {
  const [_, navigate] = useLocation();

  const games = [
    {
      id: "word-description",
      name: "Đoán từ dựa vào mô tả",
      icon: <BookText className="h-6 w-6 text-primary" />,
      path: "/category-game",
      description: "Guess words based on their descriptions"
    },
    {
      id: "category-game",
      name: "Phân loại từ",
      icon: <LayoutGrid className="h-6 w-6 text-emerald-500" />,
      path: "/category-game",
      description: "Match words to their correct categories"
    },
    {
      id: "word-puzzle",
      name: "Ghép từ",
      icon: <Puzzle className="h-6 w-6 text-blue-500" />,
      path: "/category-game",
      description: "Create words by arranging letters"
    },
    {
      id: "flash-cards",
      name: "Thẻ từ vựng",
      icon: <BookOpen className="h-6 w-6 text-amber-500" />,
      path: "/category-game",
      description: "Practice vocabulary with flashcards"
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate("/")}
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Learning Games
        </h1>
        <Button
          variant="outline"
          onClick={() => navigate("/leaderboard")}
          className="flex items-center gap-2"
        >
          Leaderboard
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {games.map((game) => (
          <Card
            key={game.id}
            className="cursor-pointer hover:shadow-lg transition-all hover:scale-105"
            onClick={() => navigate(game.path)}
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                {game.icon}
              </div>
              <h2 className="text-xl font-semibold mb-2">{game.name}</h2>
              <p className="text-sm text-muted-foreground">{game.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
