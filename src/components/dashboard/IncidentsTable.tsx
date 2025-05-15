
import React from "react";
import { Loader } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Incident } from "@/data/dummyData";

interface IncidentsTableProps {
  incidents: Incident[];
  loading: boolean;
}

const IncidentsTable = ({ incidents, loading }: IncidentsTableProps) => {
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'High':
        return <Badge variant="outline" className="bg-alert-high text-white">High</Badge>;
      case 'Moderate':
        return <Badge variant="outline" className="bg-alert-moderate text-white">Moderate</Badge>;
      case 'Low':
        return <Badge variant="outline" className="bg-alert-low text-white">Low</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'New':
        return <Badge variant="outline" className="bg-blue-500 text-white">New</Badge>;
      case 'In Progress':
        return <Badge variant="outline" className="bg-amber-500 text-white">In Progress</Badge>;
      case 'Resolved':
        return <Badge variant="outline" className="bg-green-500 text-white">Resolved</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Incident Reports</CardTitle>
        <CardDescription>
          User-submitted incident reports awaiting action
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {incidents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No incidents reported yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Location</TableHead>
                      <TableHead>Urgency</TableHead>
                      <TableHead className="hidden md:table-cell">Time</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {incidents.map((incident) => (
                      <TableRow key={incident.id}>
                        <TableCell className="font-medium">
                          {incident.location}
                          <div className="text-xs text-muted-foreground md:hidden">
                            {incident.time}
                          </div>
                        </TableCell>
                        <TableCell>{getSeverityBadge(incident.urgency)}</TableCell>
                        <TableCell className="hidden md:table-cell">{incident.time}</TableCell>
                        <TableCell>{getStatusBadge(incident.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default IncidentsTable;
