
import { Button } from "@/components/ui/button";
import { GrammarModule } from "@/components/modules/GrammarModule";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function GrammarPage() {
  const [_, navigate] = useLocation();

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
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
          Grammar Practice
        </h1>
      </div>
      
      <div className="mt-6">
        <GrammarModule />
      </div>
    </div>
  );
}
