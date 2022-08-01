import { IMotorcycle } from "../../interfaces/IMotorcycle"

export const motorcycleMockWithId: IMotorcycle & { _id: string } = {
  _id: "4edd40c86762e0fb12000003",
  model: "Honda CG Titan 125",
  year: 1963,
  color: "black",
  buyValue: 3500,
  category: "Street",
  engineCapacity: 125
}

export const motorcycleMock: IMotorcycle = {
  model: "Honda CG Titan 125",
  year: 1963,
  color: "black",
  buyValue: 3500,
  category: "Street",
  engineCapacity: 125
}

export const vehicleMock = {
  model: "Honda CG Titan 125",
  year: 1963,
  color: "black",
  buyValue: 3500,
}

export const motorcyclesMock: (IMotorcycle & { _id: string })[] = [
  {
    _id: "4edd40c86762e0fb12000003",
    model: "Honda CG Titan 125",
    year: 1963,
    color: "black",
    buyValue: 3500,
    category: "Street",
    engineCapacity: 125
  }, {
    _id: "43fd40c86762e0fb12000003",
    model: "Cgzinha do vrum vrum",
    year: 1933,
    color: "cor mais linda",
    buyValue: 350000000,
    category: "Street",
    engineCapacity: 125
  }, {
    _id: "4fgd40c86762e0fb12000003",
    model: "Lambretazinha rapidona",
    year: 1943,
    color: "yellow de ouro",
    buyValue: 35000000,
    category: "Street",
    engineCapacity: 125
  }
]