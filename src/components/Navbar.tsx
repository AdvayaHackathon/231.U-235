import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Brain, Calendar, MessageSquare, Phone, Trophy } from 'lucide-react';
import { cn } from '../lib/utils';

function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: MessageSquare, label: 'Chat' },
    { path: '/stress-relief', icon: Brain, label: 'Stress Relief' },
    { path: '/calendar', icon: Calendar, label: 'Calendar' },
    { path: '/progress', icon: Trophy, label: 'Progress' },
    { path: '/emergency', icon: Phone, label: 'Emergency' },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-blue-500" />
            <span className="text-xl font-bold text-gray-900">Mental Health Assistant</span>
          </Link>
          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    location.pathname === item.path
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-600 hover:bg-blue-50 hover:text-blue-500'
                  )}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar