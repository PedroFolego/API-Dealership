export enum ErroTypes {
  InvalidMongoId = 'InvalidMongoId',
}

type ObjectErrorResponse = {
  message: string,
  httpStatus: number
};

export type ErrorCatalog = {
  [key in ErroTypes]: ObjectErrorResponse
};

export const errorCatalog: ErrorCatalog = {
  InvalidMongoId: {
    message: 'Id must have 24 hexadecimal characters',
    httpStatus: 400,
  },
};