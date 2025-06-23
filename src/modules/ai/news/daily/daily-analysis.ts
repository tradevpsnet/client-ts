import type {
  IDailyNewsParams,
  IDailyNewsResponse
} from '../../../../types/ai/news/daily-analysis';
import {
  DailyNewsError,
  DailyNewsValidationError,
  DailyNewsUnauthorizedError,
  DailyNewsNotFoundError,
  DailyNewsServerError
} from './errors';
import { News } from '../news';
import { APIError } from '../../../exception';

export class DailyNews {
  constructor(private news: News) {}

  async execute(params: IDailyNewsParams): Promise<IDailyNewsResponse> {
    try {
      const response = await this.news.ai.client._request({
        method: 'POST',
        endpoint: '/news/daily-analysis',
        data: params,
      });

      if (!response?.ok) {
        throw new DailyNewsError(response?.message || 'Daily news analysis failed');
      }

      return response.data as IDailyNewsResponse;
    } catch (error: any) {
      const status = error?.status;
      if (error instanceof APIError) {
        switch (status) {
          case 400:
            throw new DailyNewsValidationError(error.message || 'Invalid parameters');
          case 401:
            throw new DailyNewsUnauthorizedError(error.message || 'Unauthorized');
          case 404:
            throw new DailyNewsNotFoundError(error.message || 'Endpoint not found');
          case 500:
            throw new DailyNewsServerError(error.message || 'Internal server error');
          default:
            throw new DailyNewsError(error.message || 'Unexpected error occurred');
        }
      }

      throw new DailyNewsError(error.message || 'An unknown error occurred');
    }
  }
}
