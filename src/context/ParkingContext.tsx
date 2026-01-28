import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ParkingSlot, ETicket, SlotCategory } from '@/types/parking';
import { 
  initialParkingData, 
  generateVehicleToken, 
  generateTicketId,
  generateRouteToSlot 
} from '@/data/parkingData';

interface ParkingContextType {
  slots: ParkingSlot[];
  selectedSlot: ParkingSlot | null;
  currentTicket: ETicket | null;
  selectedFloor: number;
  selectedCategory: SlotCategory | 'all';
  setSelectedSlot: (slot: ParkingSlot | null) => void;
  setSelectedFloor: (floor: number) => void;
  setSelectedCategory: (category: SlotCategory | 'all') => void;
  assignSlot: (slot: ParkingSlot) => ETicket;
  getAvailableSlots: () => ParkingSlot[];
  getSlotStats: () => { available: number; occupied: number; reserved: number };
  clearTicket: () => void;
}

const ParkingContext = createContext<ParkingContextType | undefined>(undefined);

export const ParkingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [slots, setSlots] = useState<ParkingSlot[]>(initialParkingData);
  const [selectedSlot, setSelectedSlot] = useState<ParkingSlot | null>(null);
  const [currentTicket, setCurrentTicket] = useState<ETicket | null>(null);
  const [selectedFloor, setSelectedFloor] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<SlotCategory | 'all'>('all');

  const getAvailableSlots = () => {
    return slots.filter(slot => {
      const floorMatch = slot.floor === selectedFloor;
      const categoryMatch = selectedCategory === 'all' || slot.category === selectedCategory;
      const statusMatch = slot.status === 'available';
      return floorMatch && categoryMatch && statusMatch;
    });
  };

  const getSlotStats = () => {
    const floorSlots = slots.filter(slot => {
      const floorMatch = slot.floor === selectedFloor;
      const categoryMatch = selectedCategory === 'all' || slot.category === selectedCategory;
      return floorMatch && categoryMatch;
    });
    
    return {
      available: floorSlots.filter(s => s.status === 'available').length,
      occupied: floorSlots.filter(s => s.status === 'occupied').length,
      reserved: floorSlots.filter(s => s.status === 'reserved').length,
    };
  };

  const assignSlot = (slot: ParkingSlot): ETicket => {
    const ticket: ETicket = {
      ticketId: generateTicketId(),
      vehicleToken: generateVehicleToken(),
      slotId: slot.id,
      slotCategory: slot.category,
      floor: slot.floor,
      zone: slot.zone,
      timestamp: new Date(),
      qrCode: `PARK-${slot.id}-${Date.now()}`,
      route: generateRouteToSlot(slot),
    };

    setSlots(prev => 
      prev.map(s => 
        s.id === slot.id ? { ...s, status: 'reserved' as const } : s
      )
    );

    setCurrentTicket(ticket);
    setSelectedSlot(null);
    return ticket;
  };

  const clearTicket = () => {
    setCurrentTicket(null);
  };

  return (
    <ParkingContext.Provider
      value={{
        slots,
        selectedSlot,
        currentTicket,
        selectedFloor,
        selectedCategory,
        setSelectedSlot,
        setSelectedFloor,
        setSelectedCategory,
        assignSlot,
        getAvailableSlots,
        getSlotStats,
        clearTicket,
      }}
    >
      {children}
    </ParkingContext.Provider>
  );
};

export const useParking = () => {
  const context = useContext(ParkingContext);
  if (!context) {
    throw new Error('useParking must be used within a ParkingProvider');
  }
  return context;
};
