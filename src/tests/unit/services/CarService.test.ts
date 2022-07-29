// template para criação dos testes de cobertura da camada de service


import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/Car.model';
import CarService from '../../../services/Car.service';
import { carMock, carMockWithId, carsMock, vehicleMock } from '../../mocks/CarMock';
import { ZodError } from 'zod';
const { expect } = chai;

describe('Car Service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(async () => {
    sinon
      .stub(carModel, 'create')
      .resolves(carMockWithId);
    sinon
      .stub(carModel, 'read')
      .resolves(carsMock);
    sinon
      .stub(carModel, 'readOne')
      .resolves(carMockWithId);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Creatiing Car', () => {
    it('Successfully created', async () => {
      const newCar = await carService.create(carMock);
      expect(newCar).to.be.eql(carMockWithId);
    });
    it('Failure creating vehicle', async () => {
      try {
        await carService.create({} as any);
      } catch (error) {
        expect(error).to.be.instanceOf(ZodError);
      }
    });
    it('Failure creating car', async () => {
      try {
        await carService.create(vehicleMock as any);
      } catch (error) {
        expect(error).to.be.instanceOf(ZodError);
      }
    })
  })
  describe('Finding Cars', () => {
    it('Successfully finded', async () => {
      const cars = await carService.read();
      expect(cars).to.be.eql(carsMock);
    });
  })
  describe('Finding One Car', () => {
    it('Successfully finded', async () => {
      const car = await carService.readOne('4edd40c86762e0fb12000003');
      expect(car).to.be.eql(carMockWithId);
    });
    it('_id not found', async () => {
      try {
      await carService.readOne('INVALIDID123');
      } catch (error: any) {
        expect(error.message).to.be.eq('InvalidMongoId')
      }
    })
  })
  // describe('Updating One Car', () => {
  //   it('Successfully updated', async () => {
  //     const car = await carModel.update('4edd40c86762e0fb12000003', carMock);
  //     expect(car).to.be.eql(carMockWithId);
  //   });
  //   it('_id not found', async () => {
  //     try {
  //     await carModel.readOne('INVALIDID123');
  //     } catch (error: any) {
  //       expect(error.message).to.be.eq('InvalidMongoId')
  //     }
  //   })
  // })
  // describe('Deleting Car', () => {
  //   it('Successfully deleted', async () => {
  //     const car = await carModel.delete('4edd40c86762e0fb12000003');
  //     expect(car).to.be.eql(carMockWithId);
  //   });
  //   it('_id not found', async () => {
  //     try {
  //     await carModel.readOne('INVALIDID123');
  //     } catch (error: any) {
  //       expect(error.message).to.be.eq('InvalidMongoId')
  //     }
  //   })
  // })
});