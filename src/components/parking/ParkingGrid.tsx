import React from 'react';
import { useParking } from '@/context/ParkingContext';
import { ParkingSlotComponent } from './ParkingSlot';
import { cn } from '@/lib/utils';
import { getZoneTraffic } from '@/data/parkingData';
import { TrafficLevel } from '@/types/parking';
import { AlertTriangle } from 'lucide-react';

const getTrafficStyles = (traffic: TrafficLevel) => {
  switch (traffic) {
    case 'heavy':
      return 'text-[hsl(var(--traffic-heavy))] bg-[hsl(var(--traffic-heavy)/0.15)]';
    case 'moderate':
      return 'text-[hsl(var(--traffic-moderate))] bg-[hsl(var(--traffic-moderate)/0.15)]';
    default:
      return 'text-[hsl(var(--traffic-clear))] bg-[hsl(var(--traffic-clear)/0.15)]';
  }
};

const getTrafficLabel = (traffic: TrafficLevel) => {
  switch (traffic) {
    case 'heavy':
      return 'Heavy Traffic';
    case 'moderate':
      return 'Moderate';
    default:
      return 'Clear';
  }
};

export const ParkingGrid: React.FC = () => {
  const { slots, selectedSlot, setSelectedSlot, selectedFloor, selectedCategory } = useParking();

  const floorSlots = slots.filter(slot => slot.floor === selectedFloor);
  const generalZones = ['A', 'B', 'C', 'D'];
  const rows = ['01', '02', '03', '04'];
  const womenRows = ['01', '02', '03'];
  const disabledRows = ['01', '02'];

  const getSlotByPosition = (zone: string, row: string, num: number) => {
    return floorSlots.find(
      s => s.zone === zone && s.row === row && s.number === num
    );
  };

  const shouldHighlightSlot = (slot: ReturnType<typeof getSlotByPosition>) => {
    if (!slot) return false;
    if (selectedCategory === 'all') return true;
    return slot.category === selectedCategory;
  };

  const renderZoneSection = (
    zoneName: string, 
    zoneLabel: string, 
    zoneRows: string[], 
    tagColor?: string,
    tagLabel?: string
  ) => {
    const traffic = getZoneTraffic(zoneName);
    
    return (
      <div key={zoneName} className="space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
            {zoneLabel}
          </span>
          {tagLabel && tagColor && (
            <span className={cn('text-xs px-2 py-0.5 rounded', tagColor)}>
              {tagLabel}
            </span>
          )}
          <span className={cn(
            'text-xs px-2 py-0.5 rounded-full flex items-center gap-1 font-medium',
            getTrafficStyles(traffic)
          )}>
            {traffic === 'heavy' && <AlertTriangle className="w-3 h-3" />}
            {getTrafficLabel(traffic)}
          </span>
        </div>
        
        <div className="bg-muted/30 rounded-lg p-3 space-y-2">
          {zoneRows.map((row) => (
            <div key={`${zoneName}-${row}`} className="flex items-center gap-2">
              <span className="text-xs font-mono text-muted-foreground w-6">
                {row}
              </span>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5, 6].map((num) => {
                  const slot = getSlotByPosition(zoneName, row, num);
                  if (!slot) return null;
                  
                  const highlighted = shouldHighlightSlot(slot);
                  
                  return (
                    <div
                      key={slot.id}
                      className={cn(
                        'transition-opacity duration-200',
                        !highlighted && selectedCategory !== 'all' && 'opacity-30'
                      )}
                    >
                      <ParkingSlotComponent
                        slot={slot}
                        isSelected={selectedSlot?.id === slot.id}
                        onClick={() => {
                          if (slot.status === 'available') {
                            setSelectedSlot(
                              selectedSlot?.id === slot.id ? null : slot
                            );
                          }
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-lg overflow-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Floor {selectedFloor} - Parking Layout
        </h3>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-slot-available" />
            <span className="text-muted-foreground">Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-slot-occupied" />
            <span className="text-muted-foreground">Occupied</span>
          </div>
        </div>
      </div>

      {/* General Zones */}
      <div className="mb-8">
        <h4 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">General Parking</h4>
        <div className="grid grid-cols-2 gap-6">
          {generalZones.map((zone) => renderZoneSection(zone, `Zone ${zone}`, rows))}
        </div>
      </div>

      {/* Special Sections */}
      <div className="grid grid-cols-2 gap-6">
        {/* Women Section */}
        <div>
          <h4 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm border-2 border-slot-women bg-slot-women/20" />
            Women's Parking
          </h4>
          {renderZoneSection('W', 'Women Section', womenRows, 'text-slot-women bg-slot-women/10', 'Women Only')}
        </div>

        {/* Disabled Section */}
        <div>
          <h4 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm border-2 border-slot-disabled bg-slot-disabled/20" />
            Accessible Parking
          </h4>
          {renderZoneSection('D-Section', 'Disabled Section', disabledRows, 'text-slot-disabled bg-slot-disabled/10', 'Accessible')}
        </div>
      </div>

      {/* Driving Lane Indicator */}
      <div className="mt-6 flex items-center justify-center">
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <div className="h-px w-16 bg-border" />
          <span>← Entry Lane →</span>
          <div className="h-px w-16 bg-border" />
        </div>
      </div>
    </div>
  );
};
