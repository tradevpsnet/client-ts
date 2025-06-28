import type { IServerScaleParams, IServerScaleResponse } from '../../../types/windows/scale';
import {
  ServerScaleError,
  ServerScaleNotFoundError,
  ServerScaleServerError,
  ServerScaleUnauthorizedError,
  ServerScaleValidationError,
} from './errors';
import { Windows } from '../windows';
import { APIError } from '../../exception';

export class ServerScale {
  constructor(private windows: Windows) {}

  async execute(serverId: string, params: IServerScaleParams): Promise<IServerScaleResponse> {
    try {
      const response = await this.windows.client._request({
        method: 'POST',
        endpoint: `/my/trading/windows-servers/scale/${serverId}`,
        data: params,
      });

      if (!response?.ok) {
        throw new ServerScaleError(response?.msg || 'Server change password failed');
      }

      return response.data as IServerScaleResponse;
    } catch (error: any) {
      const status = error?.status;

      if (error instanceof APIError) {
        switch (status) {
          case 400:
            throw new ServerScaleValidationError(error.message || 'Invalid server ID');
          case 401:
            throw new ServerScaleUnauthorizedError(error.message || 'Unauthorized');
          case 404:
            throw new ServerScaleNotFoundError(error.message || 'Server not found');
          case 500:
            throw new ServerScaleServerError(error.message || 'Server error');
          default:
            throw new ServerScaleError(error.message || 'Unexpected error');
        }
      }

      throw new ServerScaleError(error.message || 'An unexpected error occurred');
    }
  }
}
