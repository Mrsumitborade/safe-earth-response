
import React from "react";
import { MessageCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IncidentsTable from "./IncidentsTable";
import InsightsSection from "./InsightsSection";
import ChatSection from "./ChatSection";
import { Incident, AIInsight } from "@/data/dummyData";

interface DashboardTabsProps {
  incidents: Incident[];
  insights: AIInsight[];
  loading: boolean;
  generatingInsight: boolean;
  onGenerateInsight: () => void;
}

const DashboardTabs = ({
  incidents,
  insights,
  loading,
  generatingInsight,
  onGenerateInsight
}: DashboardTabsProps) => {
  return (
    <Tabs defaultValue="incidents">
      <TabsList className="grid w-full grid-cols-3 mb-4">
        <TabsTrigger value="incidents">Reported Incidents</TabsTrigger>
        <TabsTrigger value="insights">AI Insights</TabsTrigger>
        <TabsTrigger value="chat" className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4" />
          Assistance
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="incidents" className="mt-0">
        <IncidentsTable incidents={incidents} loading={loading} />
      </TabsContent>
      
      <TabsContent value="insights" className="mt-0">
        <InsightsSection 
          insights={insights} 
          loading={loading} 
          generatingInsight={generatingInsight}
          onGenerateInsight={onGenerateInsight}
        />
      </TabsContent>

      <TabsContent value="chat" className="mt-0">
        <ChatSection />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
