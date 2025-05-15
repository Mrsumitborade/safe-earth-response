
import React from "react";
import { AlertTriangle, Database } from "lucide-react";
import StatsCard from "./StatsCard";

interface StatsGridProps {
  totalAlerts: number;
  highSeverityAlerts: number;
  totalResources: number;
  allocatedResources: number;
}

const StatsGrid = ({ 
  totalAlerts, 
  highSeverityAlerts, 
  totalResources,
  allocatedResources 
}: StatsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatsCard 
        title="Total Alerts" 
        value={totalAlerts} 
        icon={AlertTriangle} 
      />
      
      <StatsCard 
        title="High Severity" 
        value={highSeverityAlerts} 
        icon={AlertTriangle} 
        iconBackground="bg-alert-high"
        iconColor="text-white" 
      />
      
      <StatsCard 
        title="Available Resources" 
        value={totalResources} 
        icon={Database} 
      />
      
      <StatsCard 
        title="Allocated Resources" 
        value={allocatedResources} 
        icon={Database} 
        iconBackground="bg-accent/20"
        iconColor="text-accent" 
      />
    </div>
  );
};

export default StatsGrid;
