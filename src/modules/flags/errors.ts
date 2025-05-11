export class InvalidFlagCodeError extends Error {
  constructor(code: string) {
    super(`Invalid or unsupported flag code: "${code}"`);
    this.name = 'InvalidFlagCodeError';
  }
}

export class EmptyInputError extends Error {
  constructor() {
    super('No flag codes provided. Please provide at least one.');
    this.name = 'EmptyInputError';
  }
}
