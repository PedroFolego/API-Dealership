import { Router } from 'express';
import CarController from '../controllers/Car.controller';
import CarModel from '../models/Car.model';
import CarService from '../services/Car.service';

const car = Router();

const factory = () => {
  const model = new CarModel();
  const service = new CarService(model);
  const controller = new CarController(service);

  return controller;
};

car.post('/', factory().create);
car.get('/', factory().read);
car.get('/:id', factory().readOne);
car.put('/:id', factory().update);
car.delete('/:id', factory().delete);

export default car;