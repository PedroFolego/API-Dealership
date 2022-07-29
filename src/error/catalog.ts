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
    message: 'Invalid Id',
    httpStatus: 400,
  },
};