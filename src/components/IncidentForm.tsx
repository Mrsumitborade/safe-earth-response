
import React, { useState } from 'react';
import { AlertSeverity, Incident } from '@/data/dummyData';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from 'sonner';

interface IncidentFormProps {
  onSubmit: (incident: Omit<Incident, 'id' | 'status'>) => void;
  isSubmitting: boolean;
}

const IncidentForm = ({ onSubmit, isSubmitting }: IncidentFormProps) => {
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState<AlertSeverity>('Moderate');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!location || !description || !urgency) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    const now = new Date();
    const time = now.toISOString().replace('T', ' ').substring(0, 16);
    
    onSubmit({
      location,
      description,
      urgency,
      contactName: contactName || undefined,
      contactPhone: contactPhone || undefined,
      time
    });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            placeholder="City, State"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="urgency">Urgency *</Label>
          <Select value={urgency} onValueChange={(value) => setUrgency(value as AlertSeverity)}>
            <SelectTrigger>
              <SelectValue placeholder="Select urgency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Moderate">Moderate</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          placeholder="Describe the incident in detail"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={4}
        />
      </div>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contactName">Contact Name</Label>
          <Input
            id="contactName"
            placeholder="Your name"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="contactPhone">Contact Phone</Label>
          <Input
            id="contactPhone"
            placeholder="555-123-4567"
            type="tel"
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
          />
        </div>
      </div>
      
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Processing...' : 'Submit Report'}
      </Button>
    </form>
  );
};

export default IncidentForm;
