export class GetRegionsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GetRegionsError';
  }
}

export class GetRegionsNotFoundError extends GetRegionsError {
  constructor(message: string) {
    super(message);
    this.name = 'GetRegionsNotFoundError';
  }
}

export class GetRegionsUnauthorizedError extends GetRegionsError {
  constructor(message: string) {
    super(message);
    this.name = 'GetRegionsUnauthorizedError';
  }
}

export class GetRegionsServerError extends GetRegionsError {
  constructor(message: string) {
    super(message);
    this.name = 'GetRegionsServerError';
  }
}

export class GetRegionsValidationError extends GetRegionsError {
  constructor(message: string) {
    super(message);
    this.name = 'GetRegionsValidationError';
  }
}
