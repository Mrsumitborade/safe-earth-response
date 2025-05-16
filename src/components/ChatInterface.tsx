
import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Send, Loader, Key } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

const OPENAI_API_KEY_STORAGE_KEY = "openai_api_key";

const ChatInterface = () => {
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
  const [apiKey, setApiKey] = useState("");
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Try to load the API key from localStorage on component mount
    const savedApiKey = localStorage.getItem(OPENAI_API_KEY_STORAGE_KEY);
    if (savedApiKey) {
      setApiKey(savedApiKey);
    } else {
      // If no key is found, show the input form
      setShowApiKeyInput(true);
    }
  }, []);

  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem(OPENAI_API_KEY_STORAGE_KEY, apiKey.trim());
      setShowApiKeyInput(false);
      toast({
        title: "API Key Saved",
        description: "Your OpenAI API key has been saved for this session."
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid OpenAI API key."
      });
    }
  };

  const resetApiKey = () => {
    localStorage.removeItem(OPENAI_API_KEY_STORAGE_KEY);
    setApiKey("");
    setShowApiKeyInput(true);
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    // Check if API key is available
    if (!apiKey) {
      setShowApiKeyInput(true);
      toast({
        variant: "destructive",
        title: "API Key Required",
        description: "Please enter your OpenAI API key to use the chat assistant."
      });
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
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
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
      
      // Check for API key related errors
      if (error.message && error.message.includes("API key")) {
        toast({
          variant: "destructive",
          title: "API Key Error",
          description: "Your OpenAI API key appears to be invalid. Please check and update your key."
        });
        resetApiKey();
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "We're having trouble connecting to our AI assistant. Please try again later."
        });
      }
      
      // Add a fallback response so users aren't left hanging
      setMessages(prev => [
        ...prev,
        { 
          role: "assistant", 
          content: "I apologize, but I'm having trouble processing your request right now. In an emergency situation, please contact local emergency services immediately. For non-emergency assistance, please try again in a few moments or refer to your local disaster management resources." 
        }
      ]);
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

  if (showApiKeyInput) {
    return (
      <div className="flex flex-col h-full">
        <Alert className="mb-4">
          <Key className="h-4 w-4" />
          <AlertTitle>OpenAI API Key Required</AlertTitle>
          <AlertDescription>
            To use the Disaster Assistance Chat, you need to provide your own OpenAI API key. 
            Your key will be stored locally in your browser for this session only.
          </AlertDescription>
        </Alert>
        
        <div className="flex flex-col gap-4">
          <Input
            type="password"
            placeholder="Enter your OpenAI API key (starts with sk-...)"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <Button onClick={saveApiKey}>Save API Key</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Disaster Assistance Chat</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={resetApiKey}
          className="flex items-center gap-1"
        >
          <Key className="h-3 w-3" /> Change API Key
        </Button>
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
  );
};

export default ChatInterface;
