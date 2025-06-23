export class LoginError extends Error {
  constructor(message: string = 'Login error') {
    super(message);
    this.name = 'LoginError';
  }
}

export class LoginValidationError extends LoginError {
  constructor(message: string = 'Invalid credentials') {
    super(message);
    this.name = 'LoginValidationError';
  }
}

export class LoginUnauthorizedError extends LoginError {
  constructor(message: string = 'Unauthorized') {
    super(message);
    this.name = 'LoginUnauthorizedError';
  }
}

export class LoginNotFoundError extends LoginError {
  constructor(message: string = 'User not found') {
    super(message);
    this.name = 'LoginNotFoundError';
  }
}

export class LoginServerError extends LoginError {
  constructor(message: string = 'Server error') {
    super(message);
    this.name = 'LoginServerError';
  }
}