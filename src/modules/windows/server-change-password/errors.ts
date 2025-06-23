export class ServerChangePasswordError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ServerChangePasswordError';
  }
}

export class ServerChangePasswordValidationError extends ServerChangePasswordError {
  constructor(message: string) {
    super(message);
    this.name = 'ServerChangePasswordValidationError';
  }
}

export class ServerChangePasswordUnauthorizedError extends ServerChangePasswordError {
  constructor(message: string) {
    super(message);
    this.name = 'ServerChangePasswordUnauthorizedError';
  }
}

export class ServerChangePasswordNotFoundError extends ServerChangePasswordError {
  constructor(message: string) {
    super(message);
    this.name = 'ServerChangePasswordNotFoundError';
  }
}

export class ServerChangePasswordServerError extends ServerChangePasswordError {
  constructor(message: string) {
    super(message);
    this.name = 'ServerChangePasswordServerError';
  }
}
