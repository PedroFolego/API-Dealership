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

  read = async (req: Request, res: Response) => {
    const cars = await this.#service.read();
    return res.status(200).json(cars);
  };
}

export default CarController;