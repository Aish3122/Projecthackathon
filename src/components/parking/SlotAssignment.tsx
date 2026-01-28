import React from 'react';
import { useParking } from '@/context/ParkingContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Ticket, MapPin, Tag, Building } from 'lucide-react';

export const SlotAssignment: React.FC = () => {
  const { selectedSlot, assignSlot, getAvailableSlots } = useParking();
  const navigate = useNavigate();
  const availableCount = getAvailableSlots().length;

  const handleGenerateTicket = () => {
    if (selectedSlot) {
      assignSlot(selectedSlot);
      navigate('/ticket');
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'women': return 'Women Only';
      case 'disabled': return 'Disabled Access';
      default: return 'General';
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 px-5 py-4 border-b border-border">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Ticket className="w-5 h-5 text-primary" />
          Slot Assignment
        </h3>
      </div>

      <div className="p-5">
        {selectedSlot ? (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                Selected Slot
              </p>
              <p className="text-3xl font-bold font-mono text-primary">
                {selectedSlot.id}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building className="w-4 h-4" />
                <span>Floor {selectedSlot.floor}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Zone {selectedSlot.zone}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground col-span-2">
                <Tag className="w-4 h-4" />
                <span>{getCategoryLabel(selectedSlot.category)}</span>
              </div>
            </div>

            <Button
              onClick={handleGenerateTicket}
              className="w-full h-12 text-base font-semibold glow-primary"
              size="lg"
            >
              <Ticket className="w-5 h-5 mr-2" />
              Generate E-Ticket
            </Button>
          </div>
        ) : (
          <div className="text-center py-8 space-y-3">
            <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto">
              <MapPin className="w-8 h-8 text-muted-foreground/50" />
            </div>
            <div>
              <p className="text-muted-foreground">No slot selected</p>
              <p className="text-sm text-muted-foreground/70 mt-1">
                Click on an available slot to assign
              </p>
            </div>
            <div className="pt-2">
              <span className="text-xs bg-slot-available/10 text-slot-available px-3 py-1 rounded-full">
                {availableCount} slots available
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
