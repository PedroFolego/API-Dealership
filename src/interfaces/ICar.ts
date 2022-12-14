import { z } from 'zod';
import { IVehicle } from './IVehicle';

export const CarSchema = z.object({
  doorsQty: z.number().min(2).max(4),
  seatsQty: z.number().min(2).max(7),
});

export type ICar = IVehicle & z.infer<typeof CarSchema>;
