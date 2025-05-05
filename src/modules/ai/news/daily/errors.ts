export class DailyNewsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DailyNewsError';
  }
}

export class DailyNewsValidationError extends DailyNewsError {
  constructor(message: string) {
    super(message);
    this.name = 'DailyNewsValidationError';
  }
}

export class DailyNewsUnauthorizedError extends DailyNewsError {
  constructor(message: string) {
    super(message);
    this.name = 'DailyNewsUnauthorizedError';
  }
}

export class DailyNewsNotFoundError extends DailyNewsError {
  constructor(message: string) {
    super(message);
    this.name = 'DailyNewsNotFoundError';
  }
}

export class DailyNewsServerError extends DailyNewsError {
  constructor(message: string) {
    super(message);
    this.name = 'DailyNewsServerError';
  }
}
