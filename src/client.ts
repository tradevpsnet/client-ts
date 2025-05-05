import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { APIError } from './modules/exception';
import {
  HttpMethod,
  IRequest,
  RequestData,
  RequestParams,
  ResponseData
} from './types/request';
import { Auth } from './modules/auth/auth';

export class BaseClient implements IRequest {
  private baseUrl: string;
  private _session: AxiosInstance;

  constructor(apiKey?: string, baseUrl: string = 'https://api.tradevps.net') {
    this.baseUrl = baseUrl;
    this._session = axios.create();

    if (apiKey) {
      this.setApiKey(apiKey);
    }
  }

  public setApiKey(apiKey: string): void {
    this._session.defaults.headers.common['Authorization'] = `Bearer ${apiKey}`;
  }

  async _request<T = ResponseData>(config: {
    method: HttpMethod;
    endpoint: string;
    data?: RequestData;
    params?: RequestParams;
  }): Promise<T> {
    const url = `${this.baseUrl}/${config.endpoint.replace(/^\//, '')}`;

    const axiosConfig: AxiosRequestConfig = {
      method: config.method,
      url,
      data: config.data,
      params: config.params,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    };

    try {
      const response: AxiosResponse<T> = await this._session.request(axiosConfig);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new APIError(
          error.response?.data?.msg || 'Unknown error',
          error.response?.status
        );
      }
      throw new APIError('Network error');
    }
  }
}


export class Client extends BaseClient {
  private _auth?: Auth;

  get auth(): Auth {
    if (!this._auth) {
      this._auth = new Auth(this);
    }
    return this._auth;
  }
};
export * from './types/index';
export {APIError};