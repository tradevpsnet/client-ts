import type {
  IWeeklyNewsParams,
  IWeeklyNewsResponse
} from '../../../../types/ai/news/weekly-analysis';
import {
  WeeklyNewsError,
  WeeklyNewsValidationError,
  WeeklyNewsUnauthorizedError,
  WeeklyNewsNotFoundError,
  WeeklyNewsServerError
} from './errors';
import { News } from '../news';
import { APIError } from '../../../exception';

export class WeeklyNews {
  constructor(private news: News) {}

  async execute(params: IWeeklyNewsParams): Promise<IWeeklyNewsResponse> {
    try {
      const response = await this.news.ai.client._request({
        method: 'POST',
        endpoint: '/news/weekly-analysis',
        data: params,
      });

      if (!response?.ok) {
        throw new WeeklyNewsError(response?.message || 'Weekly news analysis failed');
      }

      return response.data as IWeeklyNewsResponse;
    } catch (error: any) {
      const status = error?.status;
      if (error instanceof APIError) {
        switch (status) {
          case 400:
            throw new WeeklyNewsValidationError(error.message || 'Invalid parameters');
          case 401:
            throw new WeeklyNewsUnauthorizedError(error.message || 'Unauthorized');
          case 404:
            throw new WeeklyNewsNotFoundError(error.message || 'Endpoint not found');
          case 500:
            throw new WeeklyNewsServerError(error.message || 'Internal server error');
          default:
            throw new WeeklyNewsError(error.message || 'Unexpected error occurred');
        }
      }

      throw new WeeklyNewsError(error.message || 'An unknown error occurred');
    }
  }
}
