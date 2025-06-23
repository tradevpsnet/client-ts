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
import { AI } from './modules/ai/ai';
import { Flags } from './modules/flags/flags';
import { Windows } from './modules/windows/windows';
import { Projects } from './modules/projects/projects';
import { Marketplace } from './modules/marketplace/marketplace';

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
      const res = response.data as any;
      if (res?.ok === false) {
        throw new APIError(res.message || 'Unknown API error', response.status, res);
      }
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const msg = error.response?.data?.msg;
        const data = error.response?.data;
        let message = 'Unkown Error';
        if (msg) {
          message = msg;
        } else {
          message =
            data?.message || error.message || 'HTTP error';
        }
        throw new APIError(message, status, data);
      }
      throw new APIError('Network error');
    }
  }
}


export class Client extends BaseClient {
  private _auth?: Auth;
  private _ai?: AI;
  private _flags?: Flags;
  private _windows?: Windows;
  private _projects?: Projects;
  private _marketplace?: Marketplace;

  get auth(): Auth {
    if (!this._auth) {
      this._auth = new Auth(this);
    }
    return this._auth;
  }
  get ai(): AI {
    if (!this._ai) {
      this._ai = new AI(this);
    }
    return this._ai;
  }

  get flags(): Flags {
    if (!this._flags) {
      this._flags = new Flags();
    }
    return this._flags;
  }
  get windows(): Windows {
    if (!this._windows) {
      this._windows = new Windows(this);
    }
    return this._windows;
  }
  get projects(): Projects {
    if (!this._projects) {
      this._projects = new Projects(this);
    }
    return this._projects;
  }
  get marketplace(): Marketplace {
    if (!this._marketplace) {
      this._marketplace = new Marketplace(this);
    }
    return this._marketplace;
  }
};
export * from './types/index';
export { default as EconomicCalendar } from './modules/marketplace/component/calender'
export { APIError };