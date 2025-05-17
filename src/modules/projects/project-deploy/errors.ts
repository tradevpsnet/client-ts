export class ProjectDeployError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ProjectDeployError';
  }
}

export class ProjectDeployValidationError extends ProjectDeployError {
  constructor(message: string) {
    super(message);
    this.name = 'ProjectDeployValidationError';
  }
}

export class ProjectDeployUnauthorizedError extends ProjectDeployError {
  constructor(message: string) {
    super(message);
    this.name = 'ProjectDeployUnauthorizedError';
  }
}

export class ProjectDeployNotFoundError extends ProjectDeployError {
  constructor(message: string) {
    super(message);
    this.name = 'ProjectDeployNotFoundError';
  }
}

export class ProjectDeployServerError extends ProjectDeployError {
  constructor(message: string) {
    super(message);
    this.name = 'ProjectDeployServerError';
  }
}
