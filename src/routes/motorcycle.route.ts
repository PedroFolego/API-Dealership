import { Router } from 'express';
import MotorcycleController from '../controllers/Motorcycle.controller';
import MotorcycleModel from '../models/Motorcycle.model';
import MotorcycleService from '../services/Motorcycle.service';

const motorcycle = Router();

const factory = () => {
  const model = new MotorcycleModel();
  const service = new MotorcycleService(model);
  const controller = new MotorcycleController(service);

  return controller;
};

motorcycle.post('/', factory().create);
motorcycle.get('/', factory().read);
motorcycle.get('/:id', factory().readOne);
motorcycle.put('/:id', factory().update);
motorcycle.delete('/:id', factory().delete);

export default motorcycle;