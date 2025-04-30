export class TradeVPSException extends Error {
  constructor(message: string) {
      super(message);
      this.name = 'TradeVPSException';
      if (Error) {
          Error;
      }
  }
}
export class APIError extends TradeVPSException {
  public statusCode?: number;

  constructor(message: string, statusCode?: number) {
      super(message);
      this.name = 'APIError';
      this.statusCode = statusCode;
  }
}