
import { Button } from "@/components/ui/button";
import { SpeakingModule } from "@/components/modules/SpeakingModule";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function SpeakingPage() {
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
        <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
          Speaking Practice
        </h1>
      </div>
      
      <div className="mt-6">
        <SpeakingModule />
      </div>
    </div>
  );
}
