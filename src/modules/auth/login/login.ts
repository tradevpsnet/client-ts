import type { ILoginResponse, ILoginParams } from '../../../types/auth/login';
import {
  LoginError,
  LoginNotFoundError,
  LoginServerError,
  LoginUnauthorizedError,
  LoginValidationError,
} from './errors';
import { Auth } from '../auth';

export class Login {
  constructor(private auth: Auth) {}


  async execute({ email, password }: ILoginParams): Promise<ILoginResponse> {
    try {
      const response = await this.auth.client._request({
        method: 'POST',
        endpoint: '/auth/login',
        data: { email, password },
      });

      if (!response?.ok) {
        throw new LoginError(response?.message || 'Login failed');
      }

      return response.data as ILoginResponse;
    } catch (error: any) {
      const status = error?.status;

      switch (status) {
        case 400:
          throw new LoginValidationError(error.message || 'Invalid request');
        case 401:
          throw new LoginUnauthorizedError(error.message || 'Unauthorized');
        case 404:
          throw new LoginNotFoundError(error.message || 'Not found');
        case 500:
          throw new LoginServerError(error.message || 'Server error');
        default:
          throw new LoginError(error.message || 'Unexpected error');
      }
    }
  }
}