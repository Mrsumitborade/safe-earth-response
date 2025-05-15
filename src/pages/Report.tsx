
import React, { useState } from "react";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { Incident } from "@/data/dummyData";
import { inMemoryIncidents } from "@/data/dummyData";
import { simulateProcessing } from "@/utils/aiSimulation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IncidentForm from "@/components/IncidentForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

const Report = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (incidentData: Omit<Incident, "id" | "status">) => {
    setIsSubmitting(true);
    
    try {
      await simulateProcessing(2000);
      
      // Create a new incident with an ID and add it to memory
      const newIncident: Incident = {
        ...incidentData,
        id: Date.now(), // Simple ID generation using timestamp
        status: "New"
      };
      
      // Add to our in-memory storage
      inMemoryIncidents.push(newIncident);
      
      // Show toast notification
      toast.success("Incident report submitted successfully");
      
      // Show success state
      setSubmitted(true);
      
    } catch (error) {
      console.error("Error submitting incident:", error);
      toast.error("Failed to submit report. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleNewReport = () => {
    setSubmitted(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold">Report an Incident</h1>
              <p className="text-muted-foreground">
                Submit details about a disaster or emergency situation
              </p>
            </div>
            
            {submitted ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-6">
                    <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                    <h2 className="text-2xl font-semibold mb-2">Report Received</h2>
                    <p className="text-muted-foreground mb-6">
                      Thank you for your report. Emergency services have been notified.
                    </p>
                    <button
                      onClick={handleNewReport}
                      className="text-primary hover:underline"
                    >
                      Submit another report
                    </button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Incident Details</CardTitle>
                  <CardDescription>
                    Provide as much information as possible to help emergency responders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-yellow-50 border border-yellow-100 rounded p-4 mb-6 flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-yellow-800">Important</h3>
                      <p className="text-sm text-yellow-700">
                        For immediate life-threatening emergencies, please call emergency services directly.
                        This form is for reporting incidents to our disaster management system.
                      </p>
                    </div>
                  </div>
                  
                  <IncidentForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Report;
