
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ChatInterface from "@/components/ChatInterface";

const ChatSection = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>AI Disaster Assistance</CardTitle>
        <CardDescription>
          Get real-time assistance and guidance during disaster situations
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[500px]">
        <ChatInterface />
      </CardContent>
    </Card>
  );
};

export default ChatSection;
