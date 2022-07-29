import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import { IService } from '../interfaces/IService';

class CarController {
  #service: IService<ICar>;
  
  constructor(service: IService<ICar>) {
    this.#service = service;
  }

  create = async (
    req: Request & { body: ICar }, 
    res: Response, 
  ) => {
    const car = await this.#service.create(req.body);
    return res.status(201).json(car);
  };

  read = async (_req: Request, res: Response) => {
    const cars = await this.#service.read();
    return res.status(200).json(cars);
  };

  readOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    const car = await this.#service.readOne(id);
    if (!car) return res.status(404).end();
    return res.status(200).json(car);
  };
}

export default CarController;