import { model as mongooseCreateModel, Schema } from 'mongoose';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import MongoModel from './MongoModel';

const motorcycleMongooseSchema = new Schema<IMotorcycle>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  category: { type: String, required: true },
  engineCapacity: Number,

}, {
  versionKey: false, // https://stackoverflow.com/questions/12495891/what-is-the-v-field-in-mongoose
});

class CarModel extends MongoModel<IMotorcycle> {
  constructor(
    model = mongooseCreateModel('Motorcycle', motorcycleMongooseSchema),
  ) {
    super(model);
  }
}

export default CarModel;