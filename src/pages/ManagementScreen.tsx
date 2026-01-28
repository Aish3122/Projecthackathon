import React from 'react';
import { Link } from 'react-router-dom';
import { ParkingGrid } from '@/components/parking/ParkingGrid';
import { StatsPanel } from '@/components/parking/StatsPanel';
import { FilterPanel } from '@/components/parking/FilterPanel';
import { SlotAssignment } from '@/components/parking/SlotAssignment';
import { Shield, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useParking } from '@/context/ParkingContext';

const ManagementScreen: React.FC = () => {
  const { currentTicket } = useParking();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">Mall Parking System</h1>
                <p className="text-xs text-muted-foreground">Security Management Console</p>
              </div>
            </div>

            {currentTicket && (
              <Link to="/ticket">
                <Button variant="outline" size="sm" className="gap-2">
                  <Ticket className="w-4 h-4" />
                  View Last Ticket
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Stats */}
        <StatsPanel />

        {/* Grid and Controls */}
        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          {/* Parking Grid */}
          <ParkingGrid />

          {/* Sidebar */}
          <div className="space-y-6">
            <FilterPanel />
            <SlotAssignment />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManagementScreen;
