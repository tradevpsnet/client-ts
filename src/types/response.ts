export type IResponse = {
  success: boolean;
  message: string;
  data?: Record<string, unknown>;
}