import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import HomePage from "@/pages/HomePage";
import VocabularyPage from "@/pages/VocabularyPage";
import TopicsPage from "@/pages/TopicsPage";
import GrammarPage from "@/pages/GrammarPage";
import SpeakingPage from "@/pages/SpeakingPage";
import WritingPage from "@/pages/WritingPage";
import CategoryGamePage from "@/pages/CategoryGamePage";
import GamesListPage from "@/pages/GamesListPage";
import LeaderboardPage from "@/pages/LeaderboardPage";
import ChatPage from "@/pages/ChatPage";
import GrammarCoursesPage from "@/pages/GrammarCoursesPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/vocabulary" component={VocabularyPage} />
      <Route path="/topics" component={TopicsPage} />
      <Route path="/grammar" component={GrammarPage} />
      <Route path="/speaking" component={SpeakingPage} />
      <Route path="/writing" component={WritingPage} />
      <Route path="/category-game" component={CategoryGamePage} />
      <Route path="/games" component={GamesListPage} />
      <Route path="/leaderboard" component={LeaderboardPage} />
      <Route path="/chat" component={ChatPage} />
      <Route path="/grammar/courses" component={GrammarCoursesPage} />
      {/* Keep the NotFound route as fallback */}
      <Route component={() => <div>404 Not Found</div>} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background">
        <Router />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
