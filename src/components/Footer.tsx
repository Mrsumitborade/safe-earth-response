
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">DisasterManager</h3>
            <p className="text-sm opacity-70">
              AI-powered disaster management platform for real-time alerts, resource allocation, and incident reporting.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/alerts" className="hover:underline">Alerts</a></li>
              <li><a href="/resources" className="hover:underline">Resources</a></li>
              <li><a href="/report" className="hover:underline">Report Incident</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Emergency Contact</h3>
            <p className="text-sm">
              <strong>Hotline:</strong> 555-DISASTER<br />
              <strong>Email:</strong> help@disastermanager.example<br />
              Available 24/7 for emergency assistance
            </p>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-sm text-center opacity-70">
          <p>© 2025 DisasterManager. All rights reserved.</p>
          <p className="mt-1">This is a demo website with simulated AI functionality.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
