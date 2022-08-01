// template para criação dos testes de cobertura da camada de controller


import * as sinon from 'sinon';
import chai from 'chai';
import MotorcycleModel from '../../../models/Motorcycle.model';
import MotorcycleService from '../../../services/Motorcycle.service';
import MotorcycleController from '../../../controllers/Motorcycle.controller';
import { motorcycleMock, motorcycleMockWithId, motorcyclesMock } from '../../mocks/MotorcycleMock';
import { Request, Response } from 'express';
import { ErroTypes } from '../../../error/catalog';
const { expect } = chai;

describe('Motorcycle Controller', () => {
  const motorcycleModel = new MotorcycleModel();
  const motorcycleService = new MotorcycleService(motorcycleModel);
  const motorcycleController = new MotorcycleController(motorcycleService);

  const req = {} as Request;
  const res = {} as Response;

  before(async () => {
    sinon
      .stub(motorcycleService, 'create')
      .resolves(motorcycleMockWithId);
    sinon
      .stub(motorcycleService, 'read')
      .resolves(motorcyclesMock);
    sinon
      .stub(motorcycleService, 'readOne')
      .onCall(0).resolves(motorcycleMock)
      .onCall(1).resolves(null);
    sinon
      .stub(motorcycleService, 'update')
      .onCall(0).resolves(motorcycleMock)
      .onCall(1).resolves(null);
    sinon
      .stub(motorcycleService, 'delete')
      .onCall(0).resolves(motorcycleMock)
      .onCall(1).resolves(null);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Create Motorcycle', () => {
    it('Sucess', async () => {
      req.body = motorcycleMock;
      await motorcycleController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMockWithId)).to.be.true;
    });
  })
  describe('Finding Motorcycles', () => {
    it('Finded', async () => {
      await motorcycleController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcyclesMock)).to.be.true;
    })
  })
  describe('Finding One Motorcycle', () => {
    it('Finded', async () => {
      req.params = '4edd40c86762e0fb12000003' as any;
      await motorcycleController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMock)).to.be.true;
    })
    it('Not Finded', async () => {
      try {
        req.params = '4edd40c86762e0fb12000003' as any;
        await motorcycleController.readOne(req, res);
      } catch (error: any) {
				expect(error.message).to.be.deep.equal(ErroTypes.NotFound);
      }
    })
  })
  describe('Update Motorcycle', () => {
    it('Sucess', async () => {
      req.body = motorcycleMock;
      req.params = '4edd40c86762e0fb12000003' as any;
      await motorcycleController.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMockWithId)).to.be.true;
    });
    it('Not Finded', async () => {
      try {
        req.params = '4edd40c86762e0fb12000003' as any;
        await motorcycleController.readOne(req, res);
      } catch (error: any) {
				expect(error.message).to.be.deep.equal(ErroTypes.NotFound);
      }
    })
  })
  describe('Deleting One Motorcycle', () => {
    it('Deleted', async () => {
      req.params = '4edd40c86762e0fb12000003' as any;
      await motorcycleController.delete(req, res);

      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
    })
    it('Not Finded', async () => {
      try {
        req.params = '4edd40c86762e0fb12000003' as any;
        await motorcycleController.readOne(req, res);
      } catch (error: any) {
				expect(error.message).to.be.deep.equal(ErroTypes.NotFound);
      }
    })
  })
});