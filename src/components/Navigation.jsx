import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

const Navigation = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <Home size={20} className="mr-2" />
            <span className="font-semibold text-lg">Craftfolio</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 