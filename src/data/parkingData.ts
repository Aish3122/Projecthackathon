import { ParkingSlot, SlotCategory, SlotStatus, TrafficLevel } from '@/types/parking';

const zones = ['A', 'B', 'C', 'D'];
const rows = ['01', '02', '03', '04', '05', '06', '07', '08'];

const getRandomStatus = (): SlotStatus => {
  const rand = Math.random();
  if (rand < 0.5) return 'available';
  return 'occupied';
};

const getRandomTraffic = (): TrafficLevel => {
  const rand = Math.random();
  if (rand < 0.5) return 'clear';
  if (rand < 0.8) return 'moderate';
  return 'heavy';
};

const getCategory = (zone: string, row: string): SlotCategory => {
  if (zone === 'A' && ['01', '02'].includes(row)) return 'disabled';
  if (zone === 'B' && ['01', '02', '03'].includes(row)) return 'women';
  return 'general';
};

export const generateParkingSlots = (floor: number): ParkingSlot[] => {
  const slots: ParkingSlot[] = [];
  
  zones.forEach((zone, zoneIndex) => {
    rows.forEach((row, rowIndex) => {
      for (let num = 1; num <= 6; num++) {
        const id = `${zone}${row}-${num.toString().padStart(2, '0')}`;
        slots.push({
          id,
          zone,
          floor,
          row,
          number: num,
          status: getRandomStatus(),
          category: getCategory(zone, row),
          coordinates: {
            x: zoneIndex * 200 + num * 30,
            y: rowIndex * 50,
          },
        });
      }
    });
  });
  
  return slots;
};

export const initialParkingData: ParkingSlot[] = [
  ...generateParkingSlots(1),
  ...generateParkingSlots(2),
];

export const generateVehicleToken = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let token = 'VH-';
  for (let i = 0; i < 6; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
};

export const generateTicketId = (): string => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `TKT-${timestamp}-${random}`;
};

export const generateRouteToSlot = (slot: ParkingSlot): { instruction: string; direction: 'straight' | 'left' | 'right' | 'arrive'; landmark?: string; trafficLevel?: TrafficLevel }[] => {
  return [
    {
      instruction: 'Enter through Main Gate',
      direction: 'straight',
      landmark: 'Security Checkpoint',
      trafficLevel: getRandomTraffic(),
    },
    {
      instruction: `Proceed to Floor ${slot.floor}`,
      direction: slot.floor > 1 ? 'right' : 'straight',
      landmark: slot.floor > 1 ? 'Ramp/Elevator' : undefined,
      trafficLevel: getRandomTraffic(),
    },
    {
      instruction: `Navigate to Zone ${slot.zone}`,
      direction: ['A', 'B'].includes(slot.zone) ? 'left' : 'right',
      landmark: `Zone ${slot.zone} Sign`,
      trafficLevel: getRandomTraffic(),
    },
    {
      instruction: `Find Row ${slot.row}`,
      direction: 'straight',
      landmark: `Row ${slot.row} Marker`,
      trafficLevel: getRandomTraffic(),
    },
    {
      instruction: `Park at Slot ${slot.id}`,
      direction: 'arrive',
      landmark: 'Your Assigned Slot',
      trafficLevel: 'clear',
    },
  ];
};
