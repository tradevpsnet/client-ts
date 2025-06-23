export class ServerActionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ServerActionError';
  }
}

export class ServerActionValidationError extends ServerActionError {
  constructor(message: string) {
    super(message);
    this.name = 'ServerActionValidationError';
  }
}

export class ServerActionUnauthorizedError extends ServerActionError {
  constructor(message: string) {
    super(message);
    this.name = 'ServerActionUnauthorizedError';
  }
}

export class ServerActionNotFoundError extends ServerActionError {
  constructor(message: string) {
    super(message);
    this.name = 'ServerActionNotFoundError';
  }
}

export class ServerActionServerError extends ServerActionError {
  constructor(message: string) {
    super(message);
    this.name = 'ServerActionServerError';
  }
}
