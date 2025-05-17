import type { IServerDeployParams, IServerDeployResponse } from '../../../types/windows/server-deploy';
import {
  ServerDeployError,
  ServerDeployNotFoundError,
  ServerDeployServerError,
  ServerDeployUnauthorizedError,
  ServerDeployValidationError,
} from './errors';
import { Windows } from '../windows';
import { APIError } from '../../exception';

export class ServerDeploy {
  constructor(private windows: Windows) {}

  async execute(params: IServerDeployParams): Promise<IServerDeployResponse> {
    try {
      const response = await this.windows.client._request({
        method: 'POST',
        endpoint: '/my/trading/windows-servers',
        data: params,
      });

      if (!response?.ok) {
        throw new ServerDeployError(response?.msg || 'Server deployment failed');
      }

      return response.data as IServerDeployResponse;
    } catch (error: any) {
      const status = error?.status;

      if (error instanceof APIError) {
        switch (status) {
          case 400:
            throw new ServerDeployValidationError(error.message || 'Invalid server config');
          case 401:
            throw new ServerDeployUnauthorizedError(error.message || 'Unauthorized');
          case 404:
            throw new ServerDeployNotFoundError(error.message || 'Endpoint not found');
          case 500:
            throw new ServerDeployServerError(error.message || 'Server error');
          default:
            throw new ServerDeployError(error.message || 'Unexpected error');
        }
      }

      throw new ServerDeployError(error.message || 'An unexpected error occurred');
    }
  }
}
