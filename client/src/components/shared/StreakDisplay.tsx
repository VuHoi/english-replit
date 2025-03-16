
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Flame } from "lucide-react";

interface StreakDisplayProps {
  currentStreak: number;
  maxStreak: number;
}

export function StreakDisplay({ currentStreak, maxStreak }: StreakDisplayProps) {
  return (
    <Card className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border-orange-500/20">
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Flame className="h-6 w-6 text-orange-500" />
          <div>
            <p className="text-sm font-medium">Current Streak</p>
            <p className="text-2xl font-bold text-orange-500">{currentStreak} days</p>
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Best</p>
          <p className="text-lg font-semibold">{maxStreak} days</p>
        </div>
      </CardContent>
    </Card>
  );
}
