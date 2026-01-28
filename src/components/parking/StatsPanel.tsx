import React from 'react';
import { useParking } from '@/context/ParkingContext';
import { Car, CircleParking, Clock } from 'lucide-react';

export const StatsPanel: React.FC = () => {
  const { getSlotStats, selectedCategory, selectedFloor } = useParking();
  const stats = getSlotStats();
  const total = stats.available + stats.occupied + stats.reserved;

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-card rounded-xl p-4 border border-border shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Available</p>
            <p className="text-3xl font-bold text-slot-available mt-1">{stats.available}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-slot-available/10 flex items-center justify-center">
            <CircleParking className="w-6 h-6 text-slot-available" />
          </div>
        </div>
        <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-slot-available rounded-full transition-all duration-500"
            style={{ width: `${(stats.available / total) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-card rounded-xl p-4 border border-border shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Occupied</p>
            <p className="text-3xl font-bold text-slot-occupied mt-1">{stats.occupied}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-slot-occupied/10 flex items-center justify-center">
            <Car className="w-6 h-6 text-slot-occupied" />
          </div>
        </div>
        <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-slot-occupied rounded-full transition-all duration-500"
            style={{ width: `${(stats.occupied / total) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-card rounded-xl p-4 border border-border shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Reserved</p>
            <p className="text-3xl font-bold text-slot-reserved mt-1">{stats.reserved}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-slot-reserved/10 flex items-center justify-center">
            <Clock className="w-6 h-6 text-slot-reserved" />
          </div>
        </div>
        <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-slot-reserved rounded-full transition-all duration-500"
            style={{ width: `${(stats.reserved / total) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
