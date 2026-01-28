import React from 'react';
import { useParking } from '@/context/ParkingContext';
import { ParkingSlotComponent } from './ParkingSlot';
import { cn } from '@/lib/utils';

export const ParkingGrid: React.FC = () => {
  const { slots, selectedSlot, setSelectedSlot, selectedFloor, selectedCategory } = useParking();

  const floorSlots = slots.filter(slot => slot.floor === selectedFloor);
  const zones = ['A', 'B', 'C', 'D'];
  const rows = ['01', '02', '03', '04', '05', '06', '07', '08'];

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
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-slot-reserved" />
            <span className="text-muted-foreground">Reserved</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {zones.map((zone) => (
          <div key={zone} className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                Zone {zone}
              </span>
              {zone === 'A' && (
                <span className="text-xs text-slot-disabled bg-slot-disabled/10 px-2 py-0.5 rounded">
                  Disabled Priority
                </span>
              )}
              {zone === 'B' && (
                <span className="text-xs text-slot-women bg-slot-women/10 px-2 py-0.5 rounded">
                  Women Priority
                </span>
              )}
            </div>
            
            <div className="bg-muted/30 rounded-lg p-3 space-y-2">
              {rows.map((row) => (
                <div key={`${zone}-${row}`} className="flex items-center gap-2">
                  <span className="text-xs font-mono text-muted-foreground w-6">
                    {row}
                  </span>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5, 6].map((num) => {
                      const slot = getSlotByPosition(zone, row, num);
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
        ))}
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
