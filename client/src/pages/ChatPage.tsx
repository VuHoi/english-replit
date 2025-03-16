
import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send } from "lucide-react";

interface Message {
  content: string;
  isUser: boolean;
}

export default function ChatPage() {
  const [_, navigate] = useLocation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    const userMessage = { content: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      
      const data = await response.json();
      const aiMessage = { content: data.response, isUser: false };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
          Chat with AI
        </h1>
      </div>

      <Card className="flex flex-col h-[70vh]">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.isUser
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 dark:bg-gray-800"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[70%] rounded-lg p-3 bg-gray-100 dark:bg-gray-800">
                Thinking...
              </div>
            </div>
          )}
        </div>
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (!isLoading && input.trim()) {
                    handleSubmit();
                  }
                }
              }}
            />
            <Button
              onClick={(e) => {
                e.preventDefault();
                if (!isLoading && input.trim()) {
                  handleSubmit();
                }
              }}
              disabled={isLoading || !input.trim()}
              className="self-end"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
