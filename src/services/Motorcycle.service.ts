import { MotorcycleSchema, IMotorcycle } from '../interfaces/IMotorcycle';
import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';
import { VehicleSchema } from '../interfaces/IVehicle';

class MotorcycleService implements IService<IMotorcycle> {
  #model: IModel<IMotorcycle>;
  constructor(model: IModel<IMotorcycle>) {
    this.#model = model;
  }

  async create(obj: IMotorcycle): Promise<IMotorcycle> {
    const parsedVehicle = VehicleSchema.safeParse(obj);
    if (!parsedVehicle.success) throw parsedVehicle.error;
    
    const parsedMotorcycle = MotorcycleSchema.safeParse(obj);
    if (!parsedMotorcycle.success) throw parsedMotorcycle.error;

    return this.#model.create(obj);
  }

  async read(): Promise<IMotorcycle[]> {
    return this.#model.read();
  }

  async readOne(_id: string): Promise<IMotorcycle | null> {
    return this.#model.readOne(_id);
  }
  async update(_id: string, obj: IMotorcycle): Promise<IMotorcycle | null> {
    const parsedVehicle = VehicleSchema.safeParse(obj);
    if (!parsedVehicle.success) throw parsedVehicle.error;
    
    const parsedMotorcycle = MotorcycleSchema.safeParse(obj);
    if (!parsedMotorcycle.success) throw parsedMotorcycle.error;

    return this.#model.update(_id, obj);
  }

  async delete(_id: string): Promise<IMotorcycle | null> {
    return this.#model.delete(_id);
  }
}

export default MotorcycleService;