import { NextFunction, Request, Response } from 'express';
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
    next: NextFunction,
  ) => {
    try {
      const car = await this.#service.create(req.body);
      return res.status(201).json(car);
    } catch (error) {
      next(error);      
    }
  };
}

export default CarController;