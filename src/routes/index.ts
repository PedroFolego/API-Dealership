import { Router } from 'express';
import car from './car.route';

const route = Router();

route.use('/cars', car);

export default route;