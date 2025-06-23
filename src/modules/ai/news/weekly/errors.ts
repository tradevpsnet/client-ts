export class WeeklyNewsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'WeeklyNewsError';
  }
}

export class WeeklyNewsValidationError extends WeeklyNewsError {
  constructor(message: string) {
    super(message);
    this.name = 'WeeklyNewsValidationError';
  }
}

export class WeeklyNewsUnauthorizedError extends WeeklyNewsError {
  constructor(message: string) {
    super(message);
    this.name = 'WeeklyNewsUnauthorizedError';
  }
}

export class WeeklyNewsNotFoundError extends WeeklyNewsError {
  constructor(message: string) {
    super(message);
    this.name = 'WeeklyNewsNotFoundError';
  }
}

export class WeeklyNewsServerError extends WeeklyNewsError {
  constructor(message: string) {
    super(message);
    this.name = 'WeeklyNewsServerError';
  }
}
