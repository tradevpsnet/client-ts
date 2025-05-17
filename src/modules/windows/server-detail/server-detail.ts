import type { IServerDetailResponse } from '../../../types/windows/server-detail';
import {
  ServerDetailError,
  ServerDetailNotFoundError,
  ServerDetailServerError,
  ServerDetailUnauthorizedError,
  ServerDetailValidationError,
} from './errors';
import { Windows } from '../windows';
import { APIError } from '../../exception';

export class ServerDetail {
  constructor(private windows: Windows) {}

  async execute(serverId: string): Promise<IServerDetailResponse> {
    try {
      const response = await this.windows.client._request({
        method: 'GET',
        endpoint: `/my/trading/windows-servers/show/${serverId}`,
      });

      if (!response?.ok) {
        throw new ServerDetailError(response?.msg || 'Failed to retrieve server details');
      }

      return response as IServerDetailResponse;
    } catch (error: any) {
      const status = error?.status;

      if (error instanceof APIError) {
        switch (status) {
          case 400:
            throw new ServerDetailValidationError(error.message || 'Invalid server ID');
          case 401:
            throw new ServerDetailUnauthorizedError(error.message || 'Unauthorized');
          case 404:
            throw new ServerDetailNotFoundError(error.message || 'Server not found');
          case 500:
            throw new ServerDetailServerError(error.message || 'Server error');
          default:
            throw new ServerDetailError(error.message || 'Unexpected error');
        }
      }

      throw new ServerDetailError(error.message || 'An unexpected error occurred');
    }
  }
}
