export class RegisterError extends Error {
  constructor(message: string = 'Register error') {
    super(message);
    this.name = 'RegisterError';
  }
}

export class RegisterValidationError extends RegisterError {
  constructor(message: string = 'Invalid credentials') {
    super(message);
    this.name = 'RegisterValidationError';
  }
}

export class RegisterUnauthorizedError extends RegisterError {
  constructor(message: string = 'Unauthorized') {
    super(message);
    this.name = 'RegisterUnauthorizedError';
  }
}

export class RegisterNotFoundError extends RegisterError {
  constructor(message: string = 'User not found') {
    super(message);
    this.name = 'RegisterNotFoundError';
  }
}

export class RegisterServerError extends RegisterError {
  constructor(message: string = 'Server error') {
    super(message);
    this.name = 'RegisterServerError';
  }
}
