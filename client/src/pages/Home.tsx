import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VocabularyModule } from "@/components/modules/VocabularyModule";
import { GrammarModule } from "@/components/modules/GrammarModule";
import { SpeakingModule } from "@/components/modules/SpeakingModule";
import { WritingModule } from "@/components/modules/WritingModule";
import { Book, BookOpen, Mic, Pencil } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
        English Learning Hub
      </h1>

      <Tabs defaultValue="vocabulary" className="max-w-4xl mx-auto">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="vocabulary" className="flex items-center gap-2">
            <Book className="h-4 w-4" />
            <span className="hidden sm:inline">Vocabulary</span>
          </TabsTrigger>
          <TabsTrigger value="grammar" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Grammar</span>
          </TabsTrigger>
          <TabsTrigger value="speaking" className="flex items-center gap-2">
            <Mic className="h-4 w-4" />
            <span className="hidden sm:inline">Speaking</span>
          </TabsTrigger>
          <TabsTrigger value="writing" className="flex items-center gap-2">
            <Pencil className="h-4 w-4" />
            <span className="hidden sm:inline">Writing</span>
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="vocabulary">
            <VocabularyModule />
          </TabsContent>
          <TabsContent value="grammar">
            <GrammarModule />
          </TabsContent>
          <TabsContent value="speaking">
            <SpeakingModule />
          </TabsContent>
          <TabsContent value="writing">
            <WritingModule />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}