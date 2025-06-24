import type { IServerActionParams, IServerActionResponse } from '../../../types/windows/server-action';
import {
  ServerActionError,
  ServerActionValidationError,
  ServerActionUnauthorizedError,
  ServerActionNotFoundError,
  ServerActionServerError,
} from './errors';
import { Windows } from '../windows';
import { APIError } from '../../exception';

export class ServerAction {
  constructor(private windows: Windows) {}

  async execute(serverId: string, params: IServerActionParams): Promise<IServerActionResponse> {
    try {
      const response = await this.windows.client._request({
        method: 'POST',
        endpoint: `/my/trading/windows-servers/actions/${serverId}`,
        data: params,
      });

      if (!response?.ok) {
        throw new ServerActionError(response?.msg || 'Server action failed');
      }

      return response.data as IServerActionResponse;
    } catch (error: any) {
      const status = error?.status;

      if (error instanceof APIError) {
        switch (status) {
          case 400:
            throw new ServerActionValidationError(error.message || 'Invalid action');
          case 401:
            throw new ServerActionUnauthorizedError(error.message || 'Unauthorized');
          case 404:
            throw new ServerActionNotFoundError(error.message || 'Server not found');
          case 500:
            throw new ServerActionServerError(error.message || 'Server error');
          default:
            throw new ServerActionError(error.message || 'Unexpected error');
        }
      }

      throw new ServerActionError(error.message || 'An unexpected error occurred');
    }
  }
}
