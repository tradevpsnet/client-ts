export class ServerDeleteError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ServerDeleteError';
  }
}

export class ServerDeleteValidationError extends ServerDeleteError {
  constructor(message: string) {
    super(message);
    this.name = 'ServerDeleteValidationError';
  }
}

export class ServerDeleteUnauthorizedError extends ServerDeleteError {
  constructor(message: string) {
    super(message);
    this.name = 'ServerDeleteUnauthorizedError';
  }
}

export class ServerDeleteNotFoundError extends ServerDeleteError {
  constructor(message: string) {
    super(message);
    this.name = 'ServerDeleteNotFoundError';
  }
}

export class ServerDeleteServerError extends ServerDeleteError {
  constructor(message: string) {
    super(message);
    this.name = 'ServerDeleteServerError';
  }
}
