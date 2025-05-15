
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, FileText, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { alerts, Alert } from "@/data/dummyData";
import { simulateProcessing } from "@/utils/aiSimulation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Map from "@/components/Map";
import AlertCard from "@/components/AlertCard";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [recentAlerts, setRecentAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await simulateProcessing(1000);
      
      // Sort alerts by time (newest first) and take the 3 most recent
      const sorted = [...alerts].sort((a, b) => 
        new Date(b.time).getTime() - new Date(a.time).getTime()
      );
      setRecentAlerts(sorted.slice(0, 3));
      
      setLoading(false);
    };
    
    loadData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-accent text-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl font-bold mb-4">
                  AI-Powered Disaster Management
                </h1>
                <p className="text-lg mb-6">
                  Real-time alerts, resource allocation, and incident reporting powered by artificial intelligence.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/alerts">
                    <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                      <AlertTriangle className="mr-2 h-5 w-5" /> View Alerts
                    </Button>
                  </Link>
                  <Link to="/report">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                      <FileText className="mr-2 h-5 w-5" /> Report Incident
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="hidden md:block">
                <Card className="bg-white/10 backdrop-blur-sm border-none">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <AlertTriangle className="mx-auto h-16 w-16 mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Emergency Response System</h3>
                      <p className="opacity-80">
                        Our AI analyzes disaster data in real-time to help coordinate emergency response efforts efficiently.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Disaster Monitoring</h2>
            <Map alerts={alerts} />
          </div>
        </section>
        
        {/* Recent Alerts Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Recent Alerts</h2>
              <Link to="/alerts">
                <Button variant="ghost">View All</Button>
              </Link>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recentAlerts.map(alert => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
