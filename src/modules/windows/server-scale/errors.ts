export class ServerScaleError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ServerScaleError';
  }
}

export class ServerScaleValidationError extends ServerScaleError {
  constructor(message: string) {
    super(message);
    this.name = 'ServerScaleValidationError';
  }
}

export class ServerScaleUnauthorizedError extends ServerScaleError {
  constructor(message: string) {
    super(message);
    this.name = 'ServerScaleUnauthorizedError';
  }
}

export class ServerScaleNotFoundError extends ServerScaleError {
  constructor(message: string) {
    super(message);
    this.name = 'ServerScaleNotFoundError';
  }
}

export class ServerScaleServerError extends ServerScaleError {
  constructor(message: string) {
    super(message);
    this.name = 'ServerScaleServerError';
  }
}
