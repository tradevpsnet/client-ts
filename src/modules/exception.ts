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
  public responseData?: any;

  constructor(msg: string, statusCode?: number, responseData?: any) {
    super(msg);
    this.name = 'APIError';
    this.statusCode = statusCode;
    this.responseData = responseData;
  }
}
