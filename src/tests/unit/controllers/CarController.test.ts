// template para criação dos testes de cobertura da camada de controller


import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/Car.model';
import CarService from '../../../services/Car.service';
import CarController from '../../../controllers/Car.controller';
import { carMock, carMockWithId, carsMock } from '../../mocks/CarMock';
import { NextFunction, Request, Response } from 'express';
import { ErroTypes } from '../../../error/catalog';
const { expect } = chai;

describe('Car Controller', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  const req = {} as Request;
  const res = {} as Response;

  before(async () => {
    sinon
      .stub(carService, 'create')
      .resolves(carMockWithId);
    sinon
      .stub(carService, 'read')
      .resolves(carsMock);
    sinon
      .stub(carService, 'readOne')
      .onCall(0).resolves(carMock)
      .onCall(1).resolves(null);
    sinon
      .stub(carService, 'update')
      .onCall(0).resolves(carMock)
      .onCall(1).resolves(null);
    sinon
      .stub(carService, 'delete')
      .onCall(0).resolves(carMock)
      .onCall(1).resolves(null);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Create Car', () => {
    it('Sucess', async () => {
      req.body = carMock;
      await carController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });
  })
  describe('Finding Cars', () => {
    it('Finded', async () => {
      await carController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carsMock)).to.be.true;
    })
  })
  describe('Finding One Car', () => {
    it('Finded', async () => {
      req.params = '4edd40c86762e0fb12000003' as any;
      await carController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
    })
    it('Not Finded', async () => {
      try {
        req.params = '4edd40c86762e0fb12000003' as any;
        await carController.readOne(req, res);
      } catch (error: any) {
				expect(error.message).to.be.deep.equal(ErroTypes.NotFound);
      }
    })
  })
  describe('Update Car', () => {
    it('Sucess', async () => {
      req.body = carMock;
      req.params = '4edd40c86762e0fb12000003' as any;
      await carController.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });
    it('Not Finded', async () => {
      try {
        req.params = '4edd40c86762e0fb12000003' as any;
        await carController.readOne(req, res);
      } catch (error: any) {
				expect(error.message).to.be.deep.equal(ErroTypes.NotFound);
      }
    })
  })
  describe('Deleting One Car', () => {
    it('Deleted', async () => {
      req.params = '4edd40c86762e0fb12000003' as any;
      await carController.delete(req, res);

      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
    })
    it('Not Finded', async () => {
      try {
        req.params = '4edd40c86762e0fb12000003' as any;
        await carController.readOne(req, res);
      } catch (error: any) {
				expect(error.message).to.be.deep.equal(ErroTypes.NotFound);
      }
    })
  })
});