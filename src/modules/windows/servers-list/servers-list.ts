import type {
  IListServersResponse,
  IServerListQueryParams,
} from '../../../types/windows/servers-list';
import {
  ServerListError,
  ServerListServerError,
  ServerListUnauthorizedError,
  ServerListValidationError,
} from './errors';
import { Windows } from '../windows';
import { APIError } from '../../exception';

function buildQueryParams(params: IServerListQueryParams): string {
  const searchParams = new URLSearchParams();
  for (const key in params) {
    const typedKey = key as keyof IServerListQueryParams;
    const value = params[typedKey];
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  }
  return searchParams.toString();
}



export class ServersList {
  constructor(private windows: Windows) {}

  async execute(params: IServerListQueryParams = {}): Promise<IListServersResponse> {
    try {
      const query = buildQueryParams(params);
      const endpoint = `/my/trading/windows-servers${query ? '?' + query : ''}`;

      const response = await this.windows.client._request({
        method: 'GET',
        endpoint,
      });

      if (!response?.ok) {
        throw new ServerListError(response?.msg || 'Failed to fetch servers');
      }

      return response as IListServersResponse;
    } catch (error: any) {
      const status = error?.status;

      if (error instanceof APIError) {
        switch (status) {
          case 400:
            throw new ServerListValidationError(error.message || 'Invalid request parameters');
          case 401:
            throw new ServerListUnauthorizedError(error.message || 'Unauthorized');
          case 500:
            throw new ServerListServerError(error.message || 'Internal server error');
          default:
            throw new ServerListError(error.message || 'Unexpected error');
        }
      }

      throw new ServerListError(error.message || 'An unexpected error occurred');
    }
  }
}
