import React from 'react';
import { useParking } from '@/context/ParkingContext';
import { SlotCategory } from '@/types/parking';
import { cn } from '@/lib/utils';
import { Users, Accessibility, User, Layers } from 'lucide-react';

export const FilterPanel: React.FC = () => {
  const { selectedFloor, setSelectedFloor, selectedCategory, setSelectedCategory } = useParking();

  const categories: { value: SlotCategory | 'all'; label: string; icon: React.ReactNode }[] = [
    { value: 'all', label: 'All Slots', icon: <Layers className="w-4 h-4" /> },
    { value: 'general', label: 'General', icon: <Users className="w-4 h-4" /> },
    { value: 'women', label: 'Women Only', icon: <User className="w-4 h-4" /> },
    { value: 'disabled', label: 'Disabled', icon: <Accessibility className="w-4 h-4" /> },
  ];

  const floors = [1, 2];

  return (
    <div className="bg-card rounded-xl p-5 border border-border shadow-sm space-y-5">
      <div>
        <label className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-3 block">
          Select Floor
        </label>
        <div className="flex gap-2">
          {floors.map((floor) => (
            <button
              key={floor}
              onClick={() => setSelectedFloor(floor)}
              className={cn(
                'flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200',
                'border-2',
                selectedFloor === floor
                  ? 'bg-primary text-primary-foreground border-primary shadow-md'
                  : 'bg-muted/50 text-muted-foreground border-transparent hover:bg-muted hover:text-foreground'
              )}
            >
              Floor {floor}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-3 block">
          Parking Category
        </label>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={cn(
                'flex items-center gap-2 py-2.5 px-3 rounded-lg font-medium transition-all duration-200',
                'border-2 text-sm',
                selectedCategory === cat.value
                  ? 'bg-primary text-primary-foreground border-primary shadow-md'
                  : 'bg-muted/50 text-muted-foreground border-transparent hover:bg-muted hover:text-foreground',
                cat.value === 'women' && selectedCategory === cat.value && 'bg-slot-women border-slot-women',
                cat.value === 'disabled' && selectedCategory === cat.value && 'bg-slot-disabled border-slot-disabled',
              )}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
