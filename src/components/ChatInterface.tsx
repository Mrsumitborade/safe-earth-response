
import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MessageCircle, Send, Loader, AlertTriangle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

const ChatInterface = () => {
  const [apiKey, setApiKey] = useState<string>(() => {
    const savedKey = localStorage.getItem("openai_api_key");
    return savedKey || "";
  });
  const [isApiKeySet, setIsApiKeySet] = useState<boolean>(!!localStorage.getItem("openai_api_key"));
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content: "You are DisasterHelper, an AI assistant specifically designed to help people during disaster situations. Provide clear, concise, and helpful information. Prioritize safety advice, emergency procedures, and practical guidance. If someone is in immediate danger, always advise them to contact emergency services first."
    },
    {
      role: "assistant", 
      content: "Hello, I'm DisasterHelper. I'm here to assist you during this difficult time. How can I help you today?"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [apiKeyDialogOpen, setApiKeyDialogOpen] = useState(!localStorage.getItem("openai_api_key"));

  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem("openai_api_key", apiKey);
      setIsApiKeySet(true);
      setApiKeyDialogOpen(false);
      toast({
        title: "API Key Saved",
        description: "Your OpenAI API key has been securely saved in your browser."
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid API key"
      });
    }
  };

  const resetApiKey = () => {
    localStorage.removeItem("openai_api_key");
    setApiKey("");
    setIsApiKeySet(false);
    setApiKeyDialogOpen(true);
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    if (!isApiKeySet) {
      setApiKeyDialogOpen(true);
      return;
    }

    const userMessage = { role: "user" as const, content: message };
    setMessages(prev => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("openai_api_key")}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [...messages, userMessage],
          temperature: 0.3,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "Failed to get response");
      }

      const data = await response.json();
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: data.choices[0].message.content }
      ]);
    } catch (error: any) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Something went wrong. Please try again."
      });
      
      // Check if it's an API key issue
      if (error.message?.includes("API key")) {
        resetApiKey();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Dialog open={apiKeyDialogOpen} onOpenChange={setApiKeyDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Enter your OpenAI API Key</DialogTitle>
            <DialogDescription>
              Your API key is stored locally in your browser and never sent to our servers.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              type="password"
              placeholder="sk-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type="submit" onClick={saveApiKey}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Disaster Assistance Chat</h3>
          {isApiKeySet && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={resetApiKey}
            >
              Reset API Key
            </Button>
          )}
        </div>
        
        <div className="flex-1 overflow-y-auto mb-4 space-y-4 max-h-[400px] pr-2">
          {messages.filter(m => m.role !== "system").map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground ml-8"
                  : "bg-muted text-foreground mr-8"
              }`}
            >
              {msg.content}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center p-3 rounded-lg bg-muted text-foreground mr-8">
              <Loader className="h-4 w-4 mr-2 animate-spin" />
              Thinking...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex items-end gap-2">
          <Textarea
            className="flex-1 resize-none"
            placeholder="Ask for help or information..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={2}
          />
          <Button
            className="flex-shrink-0 h-10"
            onClick={handleSendMessage}
            disabled={isLoading || !message.trim()}
          >
            {isLoading ? <Loader className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </>
  );
};

export default ChatInterface;
