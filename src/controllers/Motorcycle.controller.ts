import { Request, Response } from 'express';
import { ErroTypes } from '../error/catalog';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';

class MotorcycleController {
  #service: IService<IMotorcycle>;
  
  constructor(service: IService<IMotorcycle>) {
    this.#service = service;
  }

  create = async (
    req: Request & { body: IMotorcycle }, 
    res: Response, 
  ) => {
    const { model, year, color, status, 
      buyValue, category, engineCapacity,
    } = req.body;
    const newMotorcycle = {
      model,
      year,
      color,
      status,
      buyValue,
      category,
      engineCapacity,
    };
    const motorcycle = await this.#service.create(newMotorcycle);
    return res.status(201).json(motorcycle);
  };

  read = async (_req: Request, res: Response) => {
    const cars = await this.#service.read();
    return res.status(200).json(cars);
  };

  readOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    const motorcycle = await this.#service.readOne(id);
    if (!motorcycle) throw Error(ErroTypes.NotFound);
    return res.status(200).json(motorcycle);
  };

  update = async (req: Request & { body: IMotorcycle }, res: Response) => {
    const { id } = req.params;
    const { model, year, color, status,
      buyValue, category, engineCapacity,
    } = req.body;
    const newMotorcycle = {
      model,
      year,
      color,
      status,
      buyValue,
      category,
      engineCapacity,
    };
    const motorcycle = await this.#service.update(id, newMotorcycle);
    if (!motorcycle) throw Error(ErroTypes.NotFound);
    return res.status(200).json(motorcycle);
  };
  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const motorcycle = await this.#service.delete(id);
    if (!motorcycle) throw Error(ErroTypes.NotFound);
    return res.status(204).json({});
  };
}

export default MotorcycleController;