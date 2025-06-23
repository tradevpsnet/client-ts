import type {
  ICalendarQueryParams,
  ICalendarResponse,
} from '../../../types/marketplace/calendar';

import {
  CalendarError,
  CalendarValidationError,
  CalendarUnauthorizedError,
  CalendarServerError,
} from './errors';

import { Marketplace } from '../marketplace';
import { APIError } from '../../exception';

function buildQueryParams(params: ICalendarQueryParams): string {
  const searchParams = new URLSearchParams();
  for (const key in params) {
    const typedKey = key as keyof ICalendarQueryParams;
    const value = params[typedKey];
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  }
  return searchParams.toString();
}

export class Calendar {
  constructor(private marketplace: Marketplace) { }

  async fetch(params: ICalendarQueryParams = {}): Promise<ICalendarResponse> {
    try {
      const query = buildQueryParams(params);
      const endpoint = `/marketplace/calendar${query ? '?' + query : ''}`;

      const response = await this.marketplace.client._request({
        method: 'GET',
        endpoint,
      });

      if (!response?.ok) {
        throw new CalendarError(response?.msg || 'Failed to fetch calendar events');
      }

      return response as ICalendarResponse;
    } catch (error: any) {
      const status = error?.status;

      if (error instanceof APIError) {
        switch (status) {
          case 400:
            throw new CalendarValidationError(error.message || 'Invalid request parameters');
          case 401:
            throw new CalendarUnauthorizedError(error.message || 'Unauthorized');
          case 500:
            throw new CalendarServerError(error.message || 'Internal server error');
          default:
            throw new CalendarError(error.message || 'Unexpected error');
        }
      }

      throw new CalendarError(error.message || 'An unexpected error occurred');
    }
  }
}
