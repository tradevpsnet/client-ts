export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export type RequestData = Record<string, any> | null;
export type RequestParams = Record<string, any> | null;
export type ResponseData = Record<string, any>;

export type IRequest = {
  _request<T = ResponseData>(config: {
    method: HttpMethod;
    endpoint: string;
    data?: RequestData;
    params?: RequestParams;
  }): Promise<T>;
}