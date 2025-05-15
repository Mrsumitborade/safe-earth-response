
import React from 'react';
import { AIInsight } from '@/data/dummyData';
import { Info } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface InsightCardProps {
  insight: AIInsight;
}

const InsightCard = ({ insight }: InsightCardProps) => {
  const getIcon = () => {
    return <Info className="h-5 w-5 text-accent" />;
  };
  
  const getTypeColor = () => {
    switch(insight.type) {
      case 'Prediction':
        return 'text-blue-500';
      case 'Recommendation':
        return 'text-purple-500';
      case 'Analysis':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getIcon()}
            <CardTitle className="text-sm sm:text-base">{insight.type}</CardTitle>
          </div>
          <CardDescription className={`text-xs ${getTypeColor()}`}>
            {insight.relatedTo}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{insight.content}</p>
        <p className="text-xs text-muted-foreground mt-2">{insight.time}</p>
      </CardContent>
    </Card>
  );
};

export default InsightCard;
