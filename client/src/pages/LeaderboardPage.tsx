
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  avatar: string;
}

export default function LeaderboardPage() {
  const [_, navigate] = useLocation();

  // Example data - replace with real data from your backend
  const leaderboardData: LeaderboardEntry[] = [
    { rank: 1, name: "John Doe", score: 1200, avatar: "https://github.com/shadcn.png" },
    { rank: 2, name: "Jane Smith", score: 1100, avatar: "https://github.com/shadcn.png" },
    { rank: 3, name: "Bob Johnson", score: 1000, avatar: "https://github.com/shadcn.png" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto py-4 px-4">
        <div className="flex items-center mb-6">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/games")}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Leaderboard
          </h1>
        </div>

        <div className="space-y-4">
          {leaderboardData.map((entry, index) => (
            <motion.div
              key={entry.rank}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4 flex items-center space-x-4 bg-white/80 backdrop-blur-lg dark:bg-gray-800/80">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center font-bold text-lg">
                  {entry.rank}
                </div>
                <img
                  src={entry.avatar}
                  alt={entry.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-grow">
                  <div className="font-semibold">{entry.name}</div>
                </div>
                <div className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  {entry.score}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
