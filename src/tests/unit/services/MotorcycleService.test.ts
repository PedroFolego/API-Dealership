// template para criação dos testes de cobertura da camada de service


import * as sinon from 'sinon';
import chai from 'chai';
import MotorcycleModel from '../../../models/Motorcycle.model';
import MotorcycleService from '../../../services/Motorcycle.service';
import { vehicleMock, motorcycleMock, motorcycleMockWithId, motorcyclesMock } from '../../mocks/MotorcycleMock';
import { ZodError } from 'zod';
const { expect } = chai;

describe('motorcycle Service', () => {
  const motorcycleModel = new MotorcycleModel();
  const motorcycleService = new MotorcycleService(motorcycleModel);

  before(async () => {
    sinon
      .stub(motorcycleModel, 'create')
      .resolves(motorcycleMockWithId);
    sinon
      .stub(motorcycleModel, 'read')
      .resolves(motorcyclesMock);
    sinon
      .stub(motorcycleModel, 'readOne')
      .resolves(motorcycleMockWithId);
    sinon
      .stub(motorcycleModel, 'update')
      .resolves(motorcycleMockWithId);
    sinon
      .stub(motorcycleModel, 'delete')
      .resolves(motorcycleMockWithId);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Creating Motorcycle', () => {
    it('Successfully created', async () => {
      const newMotorcycle = await motorcycleService.create(motorcycleMock);
      expect(newMotorcycle).to.be.eql(motorcycleMockWithId);
    });
    it('Failure creating vehicle', async () => {
      try {
        await motorcycleService.create({} as any);
      } catch (error) {
        expect(error).to.be.instanceOf(ZodError);
      }
    });
    it('Failure creating Motorcycle', async () => {
      try {
        await motorcycleService.create(vehicleMock as any);
      } catch (error) {
        expect(error).to.be.instanceOf(ZodError);
      }
    })
  })
  describe('Finding Motorcycles', () => {
    it('Successfully finded', async () => {
      const motorcycles = await motorcycleService.read();
      expect(motorcycles).to.be.eql(motorcyclesMock);
    });
  })
  describe('Finding One Motorcycle', () => {
    it('Successfully finded', async () => {
      const motorcycle = await motorcycleService.readOne('4edd40c86762e0fb12000003');
      expect(motorcycle).to.be.eql(motorcycleMockWithId);
    });
    it('_id not found', async () => {
      try {
      await motorcycleService.readOne('INVALIDID123');
      } catch (error: any) {
        expect(error.message).to.be.eq('InvalidMongoId')
      }
    })
  })
  describe('Updating One Motorcycle', () => {
    it('Successfully updated', async () => {
      const motorcycle = await motorcycleService.update('4edd40c86762e0fb12000003', motorcycleMock);
      expect(motorcycle).to.be.eql(motorcycleMockWithId);
    });
    it('_id not found', async () => {
      try {
      await motorcycleService.update('INVALIDID123', motorcycleMock);
      } catch (error: any) {
        expect(error.message).to.be.eq('InvalidMongoId')
      }
    })
    it('Failure creating vehicle', async () => {
      try {
        await motorcycleService.update('4edd40c86762e0fb12000003', {} as any);
      } catch (error) {
        expect(error).to.be.instanceOf(ZodError);
      }
    });
    it('Failure creating Motorcycle', async () => {
      try {
        await motorcycleService.update('4edd40c86762e0fb12000003', vehicleMock as any);
      } catch (error) {
        expect(error).to.be.instanceOf(ZodError);
      }
    })
  })
  describe('Deleting Motorcycle', () => {
    it('Successfully deleted', async () => {
      const motorcycle = await motorcycleService.delete('4edd40c86762e0fb12000003');
      expect(motorcycle).to.be.eql(motorcycleMockWithId);
    });
    it('_id not found', async () => {
      try {
      await motorcycleService.delete('INVALIDID123');
      } catch (error: any) {
        expect(error.message).to.be.eq('InvalidMongoId')
      }
    })
  })
});