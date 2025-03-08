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
import GamesListPage from "@/pages/GamesListPage"; // Added import


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
      <Route path="/games" component={GamesListPage} /> {/* Added route */}
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

// Minimal GamesListPage component -  Needs further development to meet full requirements
const GamesListPage = () => {
  return (
    <div>
      <h1>Game List</h1>
      <ul>
        <li>
          <span role="img" aria-label="Game Icon">🤔</span>{' '}
          Đoán từ dựa vào mô tả
        </li>
        {/* Add more games here */}
      </ul>
    </div>
  );
};

export default GamesListPage;