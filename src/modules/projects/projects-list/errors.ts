export class ProjectListError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ProjectListError';
  }
}

export class ProjectListValidationError extends ProjectListError {
  constructor(message: string) {
    super(message);
    this.name = 'ProjectListValidationError';
  }
}

export class ProjectListUnauthorizedError extends ProjectListError {
  constructor(message: string) {
    super(message);
    this.name = 'ProjectListUnauthorizedError';
  }
}

export class ProjectListServerError extends ProjectListError {
  constructor(message: string) {
    super(message);
    this.name = 'ProjectListServerError';
  }
}
