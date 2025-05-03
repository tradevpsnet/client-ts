import type { ILogoutResponse } from '../../../types/auth/logout'
import {
  LogoutError,
  LogoutNotFoundError,
  LogoutServerError,
  LogoutUnauthorizedError,
  LogoutValidationError,
} from './errors';
import { Auth } from '../auth';

export class Logout {
  constructor(private auth: Auth) {}

  async execute(): Promise<ILogoutResponse> {
    try {
      const response = await this.auth.client._request({
        method: 'POST',
        endpoint: '/auth/logout',
      });

      if (!response?.ok) {
        throw new LogoutError(response?.message || 'Logout failed');
      }

      return response.data as ILogoutResponse;
    } catch (error: any) {
      const status = error?.status;

      switch (status) {
        case 400:
          throw new LogoutValidationError(error.message || 'Invalid request');
        case 401:
          throw new LogoutUnauthorizedError(error.message || 'Unauthorized');
        case 404:
          throw new LogoutNotFoundError(error.message || 'Not found');
        case 500:
          throw new LogoutServerError(error.message || 'Server error');
        default:
          throw new LogoutError(error.message || 'Unexpected error');
      }
    }
  }
}
