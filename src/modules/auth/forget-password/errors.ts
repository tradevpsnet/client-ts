export class ForgetPasswordError extends Error {
  constructor(message: string = 'Reset password error') {
    super(message);
    this.name = 'ResetPasswordError';
  }
}

export class ForgetPasswordValidationError extends ForgetPasswordError {
  constructor(message: string = 'Invalid email') {
    super(message);
    this.name = 'ResetPasswordValidationError';
  }
}

export class ForgetPasswordUnauthorizedError extends ForgetPasswordError {
  constructor(message: string = 'Unauthorized') {
    super(message);
    this.name = 'ResetPasswordUnauthorizedError';
  }
}

export class ForgetPasswordNotFoundError extends ForgetPasswordError {
  constructor(message: string = 'User not found') {
    super(message);
    this.name = 'ResetPasswordNotFoundError';
  }
}

export class ForgetPasswordServerError extends ForgetPasswordError {
  constructor(message: string = 'Server error') {
    super(message);
    this.name = 'ResetPasswordServerError';
  }
}
