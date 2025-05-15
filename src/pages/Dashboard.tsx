import React, { useState, useEffect } from "react";
import { Database, Loader, AlertTriangle, Info, MessageCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { alerts, inMemoryIncidents, resources, aiInsights, Incident, AIInsight } from "@/data/dummyData";
import { simulateProcessing, analyzeIncidentPriorities } from "@/utils/aiSimulation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Map from "@/components/Map";
import InsightCard from "@/components/InsightCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ChatInterface from "@/components/ChatInterface";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [generatingInsight, setGeneratingInsight] = useState(false);

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      await simulateProcessing(1500);
      setIncidents(inMemoryIncidents);
      setInsights(aiInsights);
      setLoading(false);
    };
    
    loadDashboard();
  }, []);

  const generateNewInsight = async () => {
    setGeneratingInsight(true);
    
    try {
      const newInsight = await analyzeIncidentPriorities(incidents);
      setInsights(prev => [newInsight, ...prev]);
    } catch (error) {
      console.error("Error generating insight:", error);
    } finally {
      setGeneratingInsight(false);
    }
  };

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

  const countBySeverity = {
    High: incidents.filter(inc => inc.urgency === 'High').length,
    Moderate: incidents.filter(inc => inc.urgency === 'Moderate').length,
    Low: incidents.filter(inc => inc.urgency === 'Low').length
  };

  // Dashboard statistics
  const totalAlerts = alerts.length;
  const highSeverityAlerts = alerts.filter(a => a.severity === 'High').length;
  const totalResources = resources.reduce((acc, r) => acc + r.available, 0);
  const allocatedResources = resources.reduce((acc, r) => acc + r.allocated, 0);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Overview of disaster management operations
            </p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Total Alerts</p>
                  <p className="text-3xl font-bold">{totalAlerts}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-primary/60" />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">High Severity</p>
                  <p className="text-3xl font-bold">{highSeverityAlerts}</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-alert-high flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-white" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Available Resources</p>
                  <p className="text-3xl font-bold">{totalResources}</p>
                </div>
                <Database className="h-8 w-8 text-primary/60" />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Allocated Resources</p>
                  <p className="text-3xl font-bold">{allocatedResources}</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center">
                  <Database className="h-5 w-5 text-accent" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map Column */}
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
            
            {/* Main Content */}
            <div className="lg:col-span-2">
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
                </TabsContent>
                
                <TabsContent value="insights" className="mt-0">
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
                        onClick={generateNewInsight}
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
                </TabsContent>

                <TabsContent value="chat" className="mt-0">
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
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
