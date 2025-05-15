
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import Map from "@/components/Map";
import { Incident } from "@/data/dummyData";

interface IncidentsMapProps {
  incidents: Incident[];
  countBySeverity: {
    High: number;
    Moderate: number;
    Low: number;
  };
}

const IncidentsMap = ({ incidents, countBySeverity }: IncidentsMapProps) => {
  return (
    <Card className="lg:col-span-1">
      <CardHeader>
        <CardTitle>Active Incidents</CardTitle>
        <CardDescription>
          Geographic distribution of reported incidents
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Map 
          alerts={incidents.map(inc => ({
            id: inc.id,
            type: 'Incident' as any,
            location: inc.location,
            severity: inc.urgency,
            time: inc.time,
            description: inc.description,
            coordinates: inc.coordinates || [0, 0]
          }))} 
          className="h-[40vh]" 
        />
        
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="py-2 px-1 rounded bg-alert-high/10">
            <p className="text-sm font-medium">High</p>
            <p className="text-2xl font-bold">{countBySeverity.High}</p>
          </div>
          <div className="py-2 px-1 rounded bg-alert-moderate/10">
            <p className="text-sm font-medium">Moderate</p>
            <p className="text-2xl font-bold">{countBySeverity.Moderate}</p>
          </div>
          <div className="py-2 px-1 rounded bg-alert-low/10">
            <p className="text-sm font-medium">Low</p>
            <p className="text-2xl font-bold">{countBySeverity.Low}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IncidentsMap;
