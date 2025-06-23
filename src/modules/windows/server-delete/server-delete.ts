import type { IServerDeleteResponse } from '../../../types/windows/delete';
import {
  ServerDeleteError,
  ServerDeleteNotFoundError,
  ServerDeleteServerError,
  ServerDeleteUnauthorizedError,
  ServerDeleteValidationError,
} from './errors';
import { Windows } from '../windows';
import { APIError } from '../../exception';

export class ServerDelete {
  constructor(private windows: Windows) {}

  async execute(serverId: string): Promise<IServerDeleteResponse> {
    try {
      const response = await this.windows.client._request({
        method: 'DELETE',
        endpoint: `/my/trading/windows-servers/${serverId}`,
      });

      if (!response?.ok) {
        throw new ServerDeleteError(response?.msg || 'Server deletion failed');
      }

      return response.data as IServerDeleteResponse;
    } catch (error: any) {
      const status = error?.status;

      if (error instanceof APIError) {
        switch (status) {
          case 400:
            throw new ServerDeleteValidationError(error.message || 'Invalid server ID');
          case 401:
            throw new ServerDeleteUnauthorizedError(error.message || 'Unauthorized');
          case 404:
            throw new ServerDeleteNotFoundError(error.message || 'Server not found');
          case 500:
            throw new ServerDeleteServerError(error.message || 'Server error');
          default:
            throw new ServerDeleteError(error.message || 'Unexpected error');
        }
      }

      throw new ServerDeleteError(error.message || 'An unexpected error occurred');
    }
  }
}
