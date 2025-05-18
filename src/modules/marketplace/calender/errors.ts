export class CalendarError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CalendarError';
  }
}

export class CalendarValidationError extends CalendarError {
  constructor(message: string) {
    super(message);
    this.name = 'CalendarValidationError';
  }
}

export class CalendarUnauthorizedError extends CalendarError {
  constructor(message: string) {
    super(message);
    this.name = 'CalendarUnauthorizedError';
  }
}

export class CalendarServerError extends CalendarError {
  constructor(message: string) {
    super(message);
    this.name = 'CalendarServerError';
  }
}
