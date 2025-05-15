
import React, { useState, useEffect } from "react";
import { Filter, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { alerts as allAlerts, DisasterType, Alert } from "@/data/dummyData";
import { simulateProcessing } from "@/utils/aiSimulation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Map from "@/components/Map";
import AlertCard from "@/components/AlertCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Alerts = () => {
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [filterType, setFilterType] = useState<DisasterType[]>([]);

  useEffect(() => {
    const loadAlerts = async () => {
      setLoading(true);
      await simulateProcessing(1000);
      setAlerts(allAlerts);
      setLoading(false);
    };
    
    loadAlerts();
  }, []);

  const toggleTypeFilter = (type: DisasterType) => {
    if (filterType.includes(type)) {
      setFilterType(filterType.filter(t => t !== type));
    } else {
      setFilterType([...filterType, type]);
    }
  };

  const clearFilters = () => setFilterType([]);

  const filteredAlerts = filterType.length
    ? alerts.filter(alert => filterType.includes(alert.type))
    : alerts;

  const allDisasterTypes: DisasterType[] = [
    'Earthquake',
    'Flood',
    'Hurricane',
    'Wildfire',
    'Tornado'
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Disaster Alerts</h1>
              <p className="text-muted-foreground">
                AI-generated alerts based on real-time monitoring
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                    {filterType.length > 0 && (
                      <span className="ml-1 rounded-full bg-primary w-5 h-5 text-xs flex items-center justify-center text-primary-foreground">
                        {filterType.length}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {allDisasterTypes.map((type) => (
                    <DropdownMenuCheckboxItem
                      key={type}
                      checked={filterType.includes(type)}
                      onCheckedChange={() => toggleTypeFilter(type)}
                    >
                      {type}
                    </DropdownMenuCheckboxItem>
                  ))}
                  {filterType.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full mt-2"
                      onClick={clearFilters}
                    >
                      Clear Filters
                    </Button>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map column */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Disaster Map</CardTitle>
                  <CardDescription>Current active alerts</CardDescription>
                </CardHeader>
                <CardContent>
                  <Map alerts={filteredAlerts} className="h-[60vh]" />
                </CardContent>
              </Card>
            </div>
            
            {/* Alerts column */}
            <div className="lg:col-span-2">
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <>
                  {filteredAlerts.length === 0 ? (
                    <Card>
                      <CardContent className="py-8">
                        <div className="text-center text-muted-foreground">
                          No alerts match your current filters
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredAlerts.map((alert) => (
                        <AlertCard
                          key={alert.id}
                          alert={alert}
                          onClick={() => setSelectedAlert(alert)}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Alert Detail Dialog */}
      <Dialog
        open={!!selectedAlert}
        onOpenChange={(open) => !open && setSelectedAlert(null)}
      >
        {selectedAlert && (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedAlert.type} Alert
                <span 
                  className={`inline-block w-3 h-3 rounded-full ${
                    selectedAlert.severity === 'High'
                      ? 'bg-alert-high'
                      : selectedAlert.severity === 'Moderate'
                      ? 'bg-alert-moderate'
                      : 'bg-alert-low'
                  }`}
                ></span>
              </DialogTitle>
              <DialogDescription>
                {selectedAlert.location} - {selectedAlert.time}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <p>{selectedAlert.description}</p>
              <div>
                <h4 className="text-sm font-medium mb-1">Severity</h4>
                <div 
                  className={`inline-block px-3 py-1 rounded-full text-white text-sm ${
                    selectedAlert.severity === 'High'
                      ? 'bg-alert-high'
                      : selectedAlert.severity === 'Moderate'
                      ? 'bg-alert-moderate'
                      : 'bg-alert-low'
                  }`}
                >
                  {selectedAlert.severity}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Location Coordinates</h4>
                <p className="text-sm text-muted-foreground">
                  Lat: {selectedAlert.coordinates[0].toFixed(4)}, 
                  Lng: {selectedAlert.coordinates[1].toFixed(4)}
                </p>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default Alerts;
