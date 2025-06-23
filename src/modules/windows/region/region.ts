import type { IRegionsParams, IRegionsResponse } from '../../../types/windows/region';
import {
  GetRegionsError,
  GetRegionsNotFoundError,
  GetRegionsServerError,
  GetRegionsUnauthorizedError,
  GetRegionsValidationError,
} from './errors';
import { Windows } from '../windows';
import { APIError } from '../../exception';

export class Regions {
  constructor(private windows: Windows) {}

  async execute(params: IRegionsParams = {}): Promise<IRegionsResponse> {
    try {
      const response = await this.windows.client._request({
        method: 'GET',
        endpoint: '/my/trading/windows-servers/regions',
      });

      if (!response?.ok) {
        throw new GetRegionsError(response?.msg || 'Fetch regions failed');
      }

      return response as IRegionsResponse;
    } catch (error: any) {
      const status = error?.status;
      if (error instanceof APIError) {
        switch (status) {
          case 400:
            throw new GetRegionsValidationError(error.message || 'Invalid request');
          case 401:
            throw new GetRegionsUnauthorizedError(error.message || 'Unauthorized');
          case 404:
            throw new GetRegionsNotFoundError(error.message || 'Regions not found');
          case 500:
            throw new GetRegionsServerError(error.message || 'Server error');
          default:
            throw new GetRegionsError(error.message || 'Unexpected error');
        }
      }
      throw new GetRegionsError(error.message || 'An unexpected error occurred');
    }
  }
}
