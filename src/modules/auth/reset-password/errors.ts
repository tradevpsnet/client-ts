export class ResetPasswordError extends Error {
  constructor(message: string = 'Reset password error') {
    super(message);
    this.name = 'ResetPasswordError';
  }
}

export class ResetPasswordValidationError extends ResetPasswordError {
  public fieldErrors: Record<string, string[]>;

  constructor(
    message: string = 'Invalid reset password request',
    fieldErrors: Record<string, string[]> = {}
  ) {
    super(message);
    this.name = 'ResetPasswordValidationError';
    this.fieldErrors = fieldErrors;
  }
}

export class ResetPasswordUnauthorizedError extends ResetPasswordError {
  constructor(message: string = 'Unauthorized') {
    super(message);
    this.name = 'ResetPasswordUnauthorizedError';
  }
}

export class ResetPasswordNotFoundError extends ResetPasswordError {
  constructor(message: string = 'User not found') {
    super(message);
    this.name = 'ResetPasswordNotFoundError';
  }
}

export class ResetPasswordServerError extends ResetPasswordError {
  constructor(message: string = 'Server error') {
    super(message);
    this.name = 'ResetPasswordServerError';
  }
}
