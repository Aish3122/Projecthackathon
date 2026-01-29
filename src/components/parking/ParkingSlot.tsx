import React from 'react';
import { ParkingSlot as ParkingSlotType } from '@/types/parking';
import { cn } from '@/lib/utils';
import { Accessibility, User, Car } from 'lucide-react';

interface ParkingSlotProps {
  slot: ParkingSlotType;
  isSelected: boolean;
  onClick: () => void;
}

export const ParkingSlotComponent: React.FC<ParkingSlotProps> = ({
  slot,
  isSelected,
  onClick,
}) => {
  const isAvailable = slot.status === 'available';
  
  const getCategoryIcon = () => {
    switch (slot.category) {
      case 'disabled':
        return <Accessibility className="w-3 h-3" />;
      case 'women':
        return <User className="w-3 h-3" />;
      default:
        return null;
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={!isAvailable}
      className={cn(
        'relative w-12 h-10 rounded-md font-mono text-xs font-medium transition-all duration-200',
        'flex flex-col items-center justify-center gap-0.5',
        'border-2',
        // Base status styling
        isAvailable && 'bg-slot-available/20 border-slot-available text-slot-available hover:bg-slot-available hover:text-white cursor-pointer',
        slot.status === 'occupied' && 'bg-slot-occupied/20 border-slot-occupied/50 text-slot-occupied/70 cursor-not-allowed',
        // Category border overrides (only border, not fill)
        slot.category === 'disabled' && isAvailable && 'border-slot-disabled border-2',
        slot.category === 'women' && isAvailable && 'border-slot-women border-2',
        // Selection state
        isSelected && 'ring-2 ring-primary ring-offset-2 ring-offset-background bg-primary text-primary-foreground scale-110 z-10',
      )}
    >
      {slot.status === 'occupied' && <Car className="w-4 h-4 opacity-60" />}
      {slot.status !== 'occupied' && (
        <>
          <span className="text-[10px] leading-none">{slot.id.split('-')[1]}</span>
          {getCategoryIcon()}
        </>
      )}
    </button>
  );
};
