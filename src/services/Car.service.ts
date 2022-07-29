import { ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';

class CarService implements IService<ICar> {
  #model: IModel<ICar>;
  constructor(model: IModel<ICar>) {
    this.#model = model;
  }

  async create(obj: ICar): Promise<ICar> {
    return this.#model.create(obj);
  }
}

export default CarService;