
import React from "react";
import { Info, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import InsightCard from "@/components/InsightCard";
import { AIInsight } from "@/data/dummyData";

interface InsightsSectionProps {
  insights: AIInsight[];
  loading: boolean;
  generatingInsight: boolean;
  onGenerateInsight: () => void;
}

const InsightsSection = ({
  insights,
  loading,
  generatingInsight,
  onGenerateInsight
}: InsightsSectionProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>AI-Generated Insights</CardTitle>
          <CardDescription>
            Analysis and recommendations based on current data
          </CardDescription>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onGenerateInsight}
          disabled={generatingInsight}
        >
          {generatingInsight ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Analyzing
            </>
          ) : (
            <>
              <Info className="mr-2 h-4 w-4" />
              Generate Insight
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insights.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InsightsSection;
