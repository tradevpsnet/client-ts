export class ServerListError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ServerListError';
  }
}

export class ServerListValidationError extends ServerListError {
  constructor(message: string) {
    super(message);
    this.name = 'ServerListValidationError';
  }
}

export class ServerListUnauthorizedError extends ServerListError {
  constructor(message: string) {
    super(message);
    this.name = 'ServerListUnauthorizedError';
  }
}

export class ServerListServerError extends ServerListError {
  constructor(message: string) {
    super(message);
    this.name = 'ServerListServerError';
  }
}
