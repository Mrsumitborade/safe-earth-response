
import React, { useState, useEffect } from "react";
import { alerts, inMemoryIncidents, resources, aiInsights, Incident, AIInsight } from "@/data/dummyData";
import { simulateProcessing, analyzeIncidentPriorities } from "@/utils/aiSimulation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsGrid from "@/components/dashboard/StatsGrid";
import IncidentsMap from "@/components/dashboard/IncidentsMap";
import DashboardTabs from "@/components/dashboard/DashboardTabs";

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
          <DashboardHeader 
            title="Admin Dashboard" 
            subtitle="Overview of disaster management operations" 
          />
          
          <StatsGrid 
            totalAlerts={totalAlerts}
            highSeverityAlerts={highSeverityAlerts}
            totalResources={totalResources}
            allocatedResources={allocatedResources}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <IncidentsMap incidents={incidents} countBySeverity={countBySeverity} />
            
            <div className="lg:col-span-2">
              <DashboardTabs 
                incidents={incidents}
                insights={insights}
                loading={loading}
                generatingInsight={generatingInsight}
                onGenerateInsight={generateNewInsight}
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
