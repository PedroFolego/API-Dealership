import { Router } from 'express';
import car from './car.route';
import motorcycle from './motorcycle.route';

const route = Router();

route.use('/cars', car);
route.use('/motorcycles', motorcycle);

export default route;