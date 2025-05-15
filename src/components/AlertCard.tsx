
import React from 'react';
import { Alert } from '@/data/dummyData';
import { AlertTriangle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AlertCardProps {
  alert: Alert;
  onClick?: () => void;
}

const AlertCard = ({ alert, onClick }: AlertCardProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High':
        return 'bg-alert-high';
      case 'Moderate':
        return 'bg-alert-moderate';
      case 'Low':
        return 'bg-alert-low';
      default:
        return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    return <AlertTriangle className="h-5 w-5" />;
  };

  return (
    <Card 
      className="overflow-hidden transition-all hover:shadow-lg cursor-pointer"
      onClick={onClick}
    >
      <div className={`h-2 ${getSeverityColor(alert.severity)}`}></div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            {getTypeIcon(alert.type)}
            <CardTitle className="text-lg">{alert.type}</CardTitle>
          </div>
          <Badge variant="outline">{alert.severity}</Badge>
        </div>
        <CardDescription className="text-sm">{alert.location}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm">{alert.description}</p>
      </CardContent>
      <CardFooter className="pt-0 text-xs text-muted-foreground">
        Reported: {alert.time}
      </CardFooter>
    </Card>
  );
};

export default AlertCard;
