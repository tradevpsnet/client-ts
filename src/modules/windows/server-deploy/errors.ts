export class ServerDeployError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ServerDeployError';
  }
}

export class ServerDeployValidationError extends ServerDeployError {
  constructor(message: string) {
    super(message);
    this.name = 'ServerDeployValidationError';
  }
}

export class ServerDeployUnauthorizedError extends ServerDeployError {
  constructor(message: string) {
    super(message);
    this.name = 'ServerDeployUnauthorizedError';
  }
}

export class ServerDeployNotFoundError extends ServerDeployError {
  constructor(message: string) {
    super(message);
    this.name = 'ServerDeployNotFoundError';
  }
}

export class ServerDeployServerError extends ServerDeployError {
  constructor(message: string) {
    super(message);
    this.name = 'ServerDeployServerError';
  }
}
