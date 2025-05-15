
import { Alert, AlertSeverity, DisasterType, Incident, Resource, AIInsight } from '../data/dummyData';

// Simulate AI processing delay
export const simulateProcessing = async (ms: number = 1500): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Generate a simulated AI alert based on provided parameters
export const generateAlert = async (
  type: DisasterType, 
  location: string, 
  severity: AlertSeverity
): Promise<Alert> => {
  // Simulate processing time for AI analysis
  await simulateProcessing();
  
  // Generate coordinates based on location string (simplified)
  // In real app, would use geolocation service
  const getRandomCoordinates = (): [number, number] => {
    // Generate random coordinates for demo purposes
    return [
      35 + Math.random() * 10, 
      -100 + Math.random() * 20
    ];
  };
  
  const descriptions = {
    'Earthquake': [
      'Seismic activity detected. Potential for structural damage.',
      'Magnitude assessment in progress. Expect aftershocks.',
      'Ground movement detected. Evaluating impact on infrastructure.'
    ],
    'Flood': [
      'Rising water levels detected. Low-lying areas at risk.',
      'Heavy rainfall causing rapid water accumulation.',
      'Potential for flash flooding in affected areas.'
    ],
    'Hurricane': [
      'Strong winds and heavy rain approaching. Secure loose objects.',
      'Storm system intensifying. Monitoring trajectory.',
      'Coastal areas at risk. Evacuation may be necessary.'
    ],
    'Wildfire': [
      'Fire spreading rapidly due to dry conditions and winds.',
      'Smoke detected in region. Air quality deteriorating.',
      'Vegetation fire with potential to spread to populated areas.'
    ],
    'Tornado': [
      'Rotation detected in storm system. Seeking shelter advised.',
      'Weather conditions favorable for tornado development.',
      'Wind patterns indicate potential for funnel formation.'
    ]
  };
  
  // Select a random description based on disaster type
  const description = descriptions[type][Math.floor(Math.random() * descriptions[type].length)];
  
  // Generate current timestamp
  const now = new Date();
  const timeString = now.toISOString().replace('T', ' ').substring(0, 16);
  
  return {
    id: Math.floor(Math.random() * 10000),
    type,
    location,
    severity,
    time: timeString,
    description,
    coordinates: getRandomCoordinates()
  };
};

// Generate resource allocation recommendation based on alerts and resources
export const generateResourceRecommendation = async (
  alerts: Alert[],
  resources: Resource[]
): Promise<string> => {
  await simulateProcessing();
  
  // Simple simulation logic - in reality would be based on ML models
  const highSeverityAlerts = alerts.filter(alert => alert.severity === 'High');
  
  if (highSeverityAlerts.length === 0) {
    return 'No critical resource allocations needed at this time.';
  }
  
  // Pick a random high severity alert
  const criticalAlert = highSeverityAlerts[Math.floor(Math.random() * highSeverityAlerts.length)];
  
  // Pick a random resource to allocate
  const resourceToAllocate = resources[Math.floor(Math.random() * resources.length)];
  
  // Generate a random quantity to allocate based on available resources
  const quantityToAllocate = Math.floor(resourceToAllocate.available * 0.1) + 1;
  
  return `RECOMMENDATION: Deploy ${quantityToAllocate} ${resourceToAllocate.type} to ${criticalAlert.location} to address ${criticalAlert.type.toLowerCase()} (${criticalAlert.severity} severity).`;
};

// Analyze incident priorities
export const analyzeIncidentPriorities = async (
  incidents: Incident[]
): Promise<AIInsight> => {
  await simulateProcessing();
  
  const highUrgencyIncidents = incidents.filter(incident => incident.urgency === 'High');
  let content = '';
  
  if (highUrgencyIncidents.length > 0) {
    const locations = highUrgencyIncidents.map(inc => inc.location).join(', ');
    content = `PRIORITY ALERT: ${highUrgencyIncidents.length} high urgency incidents require immediate attention in ${locations}.`;
  } else {
    const moderateIncidents = incidents.filter(inc => inc.urgency === 'Moderate');
    if (moderateIncidents.length > 0) {
      content = `Current incident distribution: ${moderateIncidents.length} moderate urgency incidents being monitored.`;
    } else {
      content = 'No high priority incidents to report at this time.';
    }
  }
  
  return {
    id: Math.floor(Math.random() * 10000),
    type: 'Analysis',
    content,
    relatedTo: 'Incidents',
    time: new Date().toISOString().replace('T', ' ').substring(0, 16)
  };
};
