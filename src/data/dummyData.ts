
// Alert Types
export type AlertSeverity = 'High' | 'Moderate' | 'Low';
export type DisasterType = 'Earthquake' | 'Flood' | 'Hurricane' | 'Wildfire' | 'Tornado';

export interface Alert {
  id: number;
  type: DisasterType;
  location: string;
  severity: AlertSeverity;
  time: string;
  description: string;
  coordinates: [number, number]; // [lat, lng]
}

export interface Resource {
  id: number;
  type: string;
  available: number;
  allocated: number;
  location: string;
  lastUpdated: string;
}

export interface Incident {
  id: number;
  location: string;
  description: string;
  urgency: AlertSeverity;
  time: string;
  contactName?: string;
  contactPhone?: string;
  status: 'New' | 'In Progress' | 'Resolved';
  coordinates?: [number, number]; // [lat, lng]
}

export interface AIInsight {
  id: number;
  type: 'Prediction' | 'Recommendation' | 'Analysis';
  content: string;
  relatedTo?: 'Alerts' | 'Resources' | 'Incidents';
  time: string;
}

// Dummy Data
export const alerts: Alert[] = [
  {
    id: 1,
    type: 'Earthquake',
    location: 'San Francisco, CA',
    severity: 'High',
    time: '2025-05-15 08:00',
    description: 'Magnitude 6.2 earthquake detected. Multiple buildings affected in downtown area.',
    coordinates: [37.7749, -122.4194]
  },
  {
    id: 2,
    type: 'Flood',
    location: 'New Orleans, LA',
    severity: 'Moderate',
    time: '2025-05-14 14:30',
    description: 'Rising water levels in the Lower Ninth Ward. Potential for moderate flooding in next 24 hours.',
    coordinates: [29.9511, -90.0715]
  },
  {
    id: 3,
    type: 'Hurricane',
    location: 'Miami, FL',
    severity: 'High',
    time: '2025-05-13 09:15',
    description: 'Category 3 hurricane approaching. Expected landfall within 48 hours. Evacuation recommended in coastal areas.',
    coordinates: [25.7617, -80.1918]
  },
  {
    id: 4,
    type: 'Wildfire',
    location: 'Los Angeles, CA',
    severity: 'Moderate',
    time: '2025-05-12 16:45',
    description: 'Brush fire spreading in Angeles National Forest. Currently contained but conditions may worsen.',
    coordinates: [34.0522, -118.2437]
  },
  {
    id: 5,
    type: 'Tornado',
    location: 'Oklahoma City, OK',
    severity: 'Low',
    time: '2025-05-11 19:20',
    description: 'Weather conditions favorable for tornado development. Monitoring in progress.',
    coordinates: [35.4676, -97.5164]
  }
];

export const resources: Resource[] = [
  {
    id: 1,
    type: 'Medical Kits',
    available: 200,
    allocated: 50,
    location: 'Central Warehouse, Atlanta',
    lastUpdated: '2025-05-15 07:30'
  },
  {
    id: 2,
    type: 'Emergency Personnel',
    available: 75,
    allocated: 30,
    location: 'Regional HQ, Dallas',
    lastUpdated: '2025-05-15 06:45'
  },
  {
    id: 3,
    type: 'Water Supplies',
    available: 5000,
    allocated: 1200,
    location: 'Distribution Center, Chicago',
    lastUpdated: '2025-05-14 22:15'
  },
  {
    id: 4,
    type: 'Emergency Vehicles',
    available: 45,
    allocated: 15,
    location: 'Fleet Center, Denver',
    lastUpdated: '2025-05-14 20:00'
  },
  {
    id: 5,
    type: 'Temporary Shelters',
    available: 30,
    allocated: 8,
    location: 'Storage Facility, Phoenix',
    lastUpdated: '2025-05-15 05:30'
  }
];

export const incidents: Incident[] = [
  {
    id: 1,
    location: 'Houston, TX',
    description: 'Flooding near Buffalo Bayou. Several streets inaccessible.',
    urgency: 'High',
    time: '2025-05-15 09:00',
    contactName: 'John Smith',
    contactPhone: '555-123-4567',
    status: 'New',
    coordinates: [29.7604, -95.3698]
  },
  {
    id: 2,
    location: 'Seattle, WA',
    description: 'Power outage affecting downtown area after windstorm.',
    urgency: 'Moderate',
    time: '2025-05-14 23:15',
    contactName: 'Emily Johnson',
    contactPhone: '555-987-6543',
    status: 'In Progress',
    coordinates: [47.6062, -122.3321]
  },
  {
    id: 3,
    location: 'Boston, MA',
    description: 'Gas leak reported in residential neighborhood. Evacuation in progress.',
    urgency: 'High',
    time: '2025-05-15 07:45',
    contactName: 'Michael Brown',
    contactPhone: '555-456-7890',
    status: 'In Progress',
    coordinates: [42.3601, -71.0589]
  }
];

export const aiInsights: AIInsight[] = [
  {
    id: 1,
    type: 'Recommendation',
    content: 'Prioritize resource allocation to New Orleans, LA due to increasing flood risk and limited evacuation routes.',
    relatedTo: 'Resources',
    time: '2025-05-15 08:30'
  },
  {
    id: 2,
    type: 'Prediction',
    content: 'Hurricane in Miami expected to intensify to Category 4 within next 12 hours based on current trajectory and ocean temperatures.',
    relatedTo: 'Alerts',
    time: '2025-05-15 07:15'
  },
  {
    id: 3,
    type: 'Analysis',
    content: 'Recent incident reports from Houston show 300% increase in flooding compared to historical data for this season.',
    relatedTo: 'Incidents',
    time: '2025-05-15 09:30'
  }
];

// In-memory storage - will reset on page reload
export let inMemoryIncidents = [...incidents];
