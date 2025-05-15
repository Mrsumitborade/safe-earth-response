
import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, AlertTriangle, Database, FileText, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  return (
    <nav className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <AlertTriangle size={24} />
            <span className="font-bold text-lg sm:text-xl">DisasterManager</span>
          </Link>

          <div className="hidden md:flex space-x-1">
            <Link to="/">
              <Button variant="ghost" className="hover:bg-primary-foreground/10">
                <MapPin className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
            <Link to="/alerts">
              <Button variant="ghost" className="hover:bg-primary-foreground/10">
                <Bell className="mr-2 h-4 w-4" />
                Alerts
              </Button>
            </Link>
            <Link to="/resources">
              <Button variant="ghost" className="hover:bg-primary-foreground/10">
                <Database className="mr-2 h-4 w-4" />
                Resources
              </Button>
            </Link>
            <Link to="/report">
              <Button variant="ghost" className="hover:bg-primary-foreground/10">
                <FileText className="mr-2 h-4 w-4" />
                Report
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="ghost" className="hover:bg-primary-foreground/10">
                Dashboard
              </Button>
            </Link>
          </div>
          
          <div className="md:hidden">
            <Button variant="ghost" className="hover:bg-primary-foreground/10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
