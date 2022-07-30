import { z } from 'zod';
import { IVehicle } from './IVehicle';

export const MotorcycleSchema = z.object({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().int().max(2500),
});

export type IMotorcycle = IVehicle & z.infer<typeof MotorcycleSchema>;
