
import React, { useState, useEffect } from "react";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { resources as allResources, alerts, Resource } from "@/data/dummyData";
import { simulateProcessing, generateResourceRecommendation } from "@/utils/aiSimulation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResourceTable from "@/components/ResourceTable";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Resources = () => {
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState<Resource[]>([]);
  const [recommendation, setRecommendation] = useState("");
  const [loadingRecommendation, setLoadingRecommendation] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [requestQuantity, setRequestQuantity] = useState(1);
  const [requestLocation, setRequestLocation] = useState("");

  useEffect(() => {
    const loadResources = async () => {
      setLoading(true);
      await simulateProcessing(1000);
      setResources(allResources);
      setLoading(false);
      
      // Generate initial recommendation
      generateRecommendation();
    };
    
    loadResources();
  }, []);

  const generateRecommendation = async () => {
    setLoadingRecommendation(true);
    try {
      const recommendation = await generateResourceRecommendation(alerts, resources);
      setRecommendation(recommendation);
    } catch (error) {
      console.error("Error generating recommendation:", error);
      setRecommendation("Unable to generate recommendations at this time.");
    } finally {
      setLoadingRecommendation(false);
    }
  };

  const handleRequestResource = (resource: Resource) => {
    setSelectedResource(resource);
    setRequestQuantity(1);
    setRequestLocation("");
  };

  const handleSubmitRequest = async () => {
    if (!selectedResource) return;
    
    setLoading(true);
    await simulateProcessing(800);
    
    // Create a copy of the resources array
    const updatedResources = resources.map(res => {
      if (res.id === selectedResource.id) {
        // Don't allow more than available
        const quantity = Math.min(requestQuantity, res.available);
        return {
          ...res,
          available: res.available - quantity,
          allocated: res.allocated + quantity
        };
      }
      return res;
    });
    
    setResources(updatedResources);
    setSelectedResource(null);
    setLoading(false);
    
    toast.success(`Resource request submitted: ${requestQuantity} ${selectedResource.type} for ${requestLocation}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Resource Management</h1>
            <p className="text-muted-foreground">
              Monitor and allocate resources for disaster response
            </p>
          </div>
          
          {/* AI Recommendation Card */}
          <Card className="mb-8">
            <CardHeader className="pb-3">
              <CardTitle>AI Recommendation</CardTitle>
              <CardDescription>
                Based on current alert data and resource availability
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loadingRecommendation ? (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader className="h-4 w-4 animate-spin" />
                  <span>Analyzing resource allocation needs...</span>
                </div>
              ) : (
                <div className="p-4 bg-accent/20 rounded-lg border border-accent/10">
                  <p className="font-medium">{recommendation}</p>
                </div>
              )}
              
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={generateRecommendation}
                disabled={loadingRecommendation}
              >
                Generate New Recommendation
              </Button>
            </CardContent>
          </Card>
          
          {/* Resources Table */}
          <Card>
            <CardHeader>
              <CardTitle>Available Resources</CardTitle>
              <CardDescription>
                Current inventory and allocation status
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <ResourceTable
                  resources={resources}
                  onRequestResource={handleRequestResource}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
      
      {/* Resource Request Dialog */}
      <Dialog
        open={!!selectedResource}
        onOpenChange={(open) => !open && setSelectedResource(null)}
      >
        {selectedResource && (
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Request {selectedResource.type}</DialogTitle>
              <DialogDescription>
                Complete the form below to request resource allocation
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">
                  Quantity
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  value={requestQuantity}
                  onChange={(e) => setRequestQuantity(parseInt(e.target.value) || 1)}
                  min={1}
                  max={selectedResource.available}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Location
                </Label>
                <Input
                  id="location"
                  placeholder="e.g., Downtown Hospital"
                  value={requestLocation}
                  onChange={(e) => setRequestLocation(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="priority" className="text-right">
                  Priority
                </Label>
                <Select defaultValue="moderate">
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedResource(null)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitRequest} disabled={!requestLocation || requestQuantity < 1}>
                Submit Request
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default Resources;
