import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/Car.model';
import { Model } from 'mongoose';
import { carMock, carMockWithId, carsMock } from '../../mocks/CarMock';
const { expect } = chai;

describe('Car Model', () => {
  const carModel = new CarModel();

  before(async () => {
    sinon
      .stub(Model, 'create')
      .resolves(carMock);
    sinon
      .stub(Model, 'find')
      .resolves(carsMock);
    sinon
      .stub(Model, 'findOne')
      .resolves(carMockWithId);
    sinon
      .stub(Model, 'findOneAndUpdate')
      .resolves(carMockWithId);
    sinon
      .stub(Model, 'findOneAndDelete')
      .resolves(carMockWithId);
  });

  after(()=>{
    sinon.restore();
  })
  describe('Creatiing Car', () => {
    it('Successfully created', async () => {
      const newCar = carModel.create(carMock);
      expect(newCar).to.be.eql(carMock);
    });
  })
  describe('Finding Cars', () => {
    it('Successfully finded', async () => {
      const cars = carModel.read();
      expect(cars).to.be.eql(carsMock);
    });
  })
  describe('Finding One Car', () => {
    it('Successfully finded', async () => {
      const car = carModel.readOne('4edd40c86762e0fb12000003');
      expect(car).to.be.eql(carMockWithId);
    });
  })
  describe('Updating One Car', () => {
    it('Successfully updated', async () => {
      const car = carModel.update('4edd40c86762e0fb12000003', carMock);
      expect(car).to.be.eql(carMockWithId);
    });
  })
  describe('Deleting Car', () => {
    it('Successfully deleted', async () => {
      const car = carModel.delete('4edd40c86762e0fb12000003');
      expect(car).to.be.eql(carMockWithId);
    });
  })
});