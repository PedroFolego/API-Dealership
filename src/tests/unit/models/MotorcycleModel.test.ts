import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import MotorcycleModel from '../../../models/Motorcycle.model';
import { motorcycleMock, motorcycleMockWithId, motorcyclesMock } from '../../mocks/MotorcycleMock';
import { ErroTypes } from '../../../error/catalog';
const { expect } = chai;

describe('Motorcycle Model', () => {
  const motorcycleModel = new MotorcycleModel();

  before(async () => {
    sinon
      .stub(Model, 'create')
      .resolves(motorcycleMockWithId);
    sinon
      .stub(Model, 'find')
      .resolves(motorcyclesMock);
    sinon
      .stub(Model, 'findOne')
      .resolves(motorcycleMockWithId);
    sinon
      .stub(Model, 'findOneAndUpdate')
      .resolves(motorcycleMockWithId);
    sinon
      .stub(Model, 'findOneAndDelete')
      .resolves(motorcycleMockWithId);
  });

  after(()=>{
    sinon.restore();
  })
  describe('Creatiing Motorcycle', () => {
    it('Successfully created', async () => {
      const newMotocycle = await motorcycleModel.create(motorcycleMock);
      expect(newMotocycle).to.be.eql(motorcycleMockWithId);
    });
  })
  describe('Finding Motorcycle', () => {
    it('Successfully finded', async () => {
      const motorcycle = await motorcycleModel.read();
      expect(motorcycle).to.be.eql(motorcyclesMock);
    });
  })
  describe('Finding One Motorcycle', () => {
    it('Successfully finded', async () => {
      const motorcycle = await motorcycleModel.readOne('4edd40c86762e0fb12000003');
      expect(motorcycle).to.be.eql(motorcycleMockWithId);
    });
    it('_id not found', async () => {
      try {
      await motorcycleModel.readOne('INVALIDID123');
      } catch (error: any) {
        expect(error.message).to.be.eq('InvalidMongoId')
        expect(error).to.be.instanceOf(ErroTypes);
        expect(error.message).to.be.a('string');
      }
    })
  })
  describe('Updating One motorcycle', () => {
    it('Successfully updated', async () => {
      const motorcycle = await motorcycleModel.update('4edd40c86762e0fb12000003', motorcycleMock);
      expect(motorcycle).to.be.eql(motorcycleMockWithId);
    });
    it('_id not found', async () => {
      try {
      await motorcycleModel.readOne('INVALIDID123');
      } catch (error: any) {
        expect(error.message).to.be.eq('InvalidMongoId');
        expect(error).to.be.instanceOf(ErroTypes);
        expect(error.message).to.be.a('string');
      }
    })
  })
  describe('Deleting motorcycle', () => {
    it('Successfully deleted', async () => {
      const motorcycle = await motorcycleModel.delete('4edd40c86762e0fb12000003');
      expect(motorcycle).to.be.eql(motorcycleMockWithId);
    });
    it('_id not found', async () => {
      try {
      await motorcycleModel.delete('INVALIDID123');
      } catch (error: any) {
        expect(error.message).to.be.eq('InvalidMongoId')
        expect(error).to.be.instanceOf(ErroTypes);
        expect(error.message).to.be.a('string');
      }
    })
  })
});