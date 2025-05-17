export class ServerDetailError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ServerDetailError';
  }
}

export class ServerDetailValidationError extends ServerDetailError {
  constructor(message: string) {
    super(message);
    this.name = 'ServerDetailValidationError';
  }
}

export class ServerDetailUnauthorizedError extends ServerDetailError {
  constructor(message: string) {
    super(message);
    this.name = 'ServerDetailUnauthorizedError';
  }
}

export class ServerDetailNotFoundError extends ServerDetailError {
  constructor(message: string) {
    super(message);
    this.name = 'ServerDetailNotFoundError';
  }
}

export class ServerDetailServerError extends ServerDetailError {
  constructor(message: string) {
    super(message);
    this.name = 'ServerDetailServerError';
  }
}
