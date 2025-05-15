
import React from 'react';
import { Alert } from '@/data/dummyData';

interface MapProps {
  alerts?: Alert[];
  className?: string;
}

const Map = ({ alerts, className = "h-[400px]" }: MapProps) => {
  return (
    <div className={`relative bg-gray-200 rounded-lg overflow-hidden ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center p-4">
          <h3 className="text-lg font-semibold mb-2">Interactive Map</h3>
          <p className="text-sm text-gray-600 mb-4">
            Map visualization would appear here.
          </p>
          <div className="text-xs text-gray-500">
            {alerts ? (
              <div>
                <p className="font-medium mb-2">Currently displaying {alerts.length} disaster locations</p>
                <ul className="text-left inline-block">
                  {alerts.slice(0, 3).map(alert => (
                    <li key={alert.id} className="mb-1">• {alert.type} in {alert.location}</li>
                  ))}
                  {alerts.length > 3 && <li>• and {alerts.length - 3} more...</li>}
                </ul>
              </div>
            ) : (
              <p>No specific alerts selected for display</p>
            )}
          </div>
        </div>
      </div>
      {/* Map grid lines for visual effect */}
      <div className="absolute inset-0 grid grid-cols-8 grid-rows-6">
        {[...Array(48)].map((_, i) => (
          <div key={i} className="border border-gray-300/30"></div>
        ))}
      </div>
      {/* Mock location markers */}
      {alerts && alerts.map((alert, index) => {
        // Generate random positions for demo purposes
        const top = 20 + (index * 15) % 60;
        const left = 15 + (index * 17) % 70;
        
        let bgColor = "bg-alert-low";
        if (alert.severity === "High") bgColor = "bg-alert-high";
        else if (alert.severity === "Moderate") bgColor = "bg-alert-moderate";
        
        return (
          <div 
            key={alert.id}
            className={`absolute w-4 h-4 ${bgColor} rounded-full animate-pulse-subtle`}
            style={{ top: `${top}%`, left: `${left}%` }}
          ></div>
        );
      })}
    </div>
  );
};

export default Map;
