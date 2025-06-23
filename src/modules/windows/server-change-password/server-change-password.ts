import type { IServerChangePasswordResponse } from '../../../types/windows/change-password';
import {
  ServerChangePasswordError,
  ServerChangePasswordNotFoundError,
  ServerChangePasswordServerError,
  ServerChangePasswordUnauthorizedError,
  ServerChangePasswordValidationError,
} from './errors';
import { Windows } from '../windows';
import { APIError } from '../../exception';

export class ServerChangePassword {
  constructor(private windows: Windows) {}

  async execute(serverId: string): Promise<IServerChangePasswordResponse> {
    try {
      const response = await this.windows.client._request({
        method: 'POST',
        endpoint: `/my/trading/windows-servers/change-password/${serverId}`,
      });

      if (!response?.ok) {
        throw new ServerChangePasswordError(response?.msg || 'Server change password failed');
      }

      return response.data as IServerChangePasswordResponse;
    } catch (error: any) {
      const status = error?.status;

      if (error instanceof APIError) {
        switch (status) {
          case 400:
            throw new ServerChangePasswordValidationError(error.message || 'Invalid server ID');
          case 401:
            throw new ServerChangePasswordUnauthorizedError(error.message || 'Unauthorized');
          case 404:
            throw new ServerChangePasswordNotFoundError(error.message || 'Server not found');
          case 500:
            throw new ServerChangePasswordServerError(error.message || 'Server error');
          default:
            throw new ServerChangePasswordError(error.message || 'Unexpected error');
        }
      }

      throw new ServerChangePasswordError(error.message || 'An unexpected error occurred');
    }
  }
}
