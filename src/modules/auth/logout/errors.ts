export class LogoutError extends Error {
  constructor(message: string = 'Login error') {
    super(message);
    this.name = 'LoginError';
  }
}

export class LogoutValidationError extends LogoutError {
  constructor(message: string = 'Invalid credentials') {
    super(message);
    this.name = 'LoginValidationError';
  }
}

export class LogoutUnauthorizedError extends LogoutError {
  constructor(message: string = 'Unauthorized') {
    super(message);
    this.name = 'LoginUnauthorizedError';
  }
}

export class LogoutNotFoundError extends LogoutError {
  constructor(message: string = 'User not found') {
    super(message);
    this.name = 'LoginNotFoundError';
  }
}

export class LogoutServerError extends LogoutError {
  constructor(message: string = 'Server error') {
    super(message);
    this.name = 'LoginServerError';
  }
}