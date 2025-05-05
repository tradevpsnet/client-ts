export type IResponse = {
  success: boolean;
  msg: string;
  data?: Record<string, unknown>;
}