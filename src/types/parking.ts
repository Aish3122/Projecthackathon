export type SlotStatus = 'available' | 'occupied' | 'reserved';
export type SlotCategory = 'general' | 'women' | 'disabled';

export interface ParkingSlot {
  id: string;
  zone: string;
  floor: number;
  row: string;
  number: number;
  status: SlotStatus;
  category: SlotCategory;
  coordinates: { x: number; y: number };
}

export interface ETicket {
  ticketId: string;
  vehicleToken: string;
  slotId: string;
  slotCategory: SlotCategory;
  floor: number;
  zone: string;
  timestamp: Date;
  qrCode: string;
  route: RouteStep[];
}

export interface RouteStep {
  instruction: string;
  direction: 'straight' | 'left' | 'right' | 'arrive';
  landmark?: string;
}
