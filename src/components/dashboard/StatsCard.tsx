
import React from "react";
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  iconBackground?: string;
  iconColor?: string;
}

const StatsCard = ({ 
  title, 
  value, 
  icon: Icon,
  iconBackground,
  iconColor = "text-primary/60"
}: StatsCardProps) => {
  return (
    <Card>
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        {iconBackground ? (
          <div className={`h-8 w-8 rounded-full ${iconBackground} flex items-center justify-center`}>
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
        ) : (
          <Icon className={`h-8 w-8 ${iconColor}`} />
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
