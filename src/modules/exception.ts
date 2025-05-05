export class TradeVPSException extends Error {
  constructor(msg: string) {
      super(msg);
      this.name = 'TradeVPSException';
      if (Error) {
          Error;
      }
  }
}
export class APIError extends TradeVPSException {
  public statusCode?: number;
  constructor(msg: string, statusCode?: number) {
      super(msg);
      this.name = 'APIError';
      this.statusCode = statusCode;
  }
}