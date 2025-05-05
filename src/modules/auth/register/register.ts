import type { IRegisterResponse, IRegisterParams } from '../../../types/auth/register';
import {
  RegisterError,
  RegisterNotFoundError,
  RegisterServerError,
  RegisterUnauthorizedError,
  RegisterValidationError,
} from './errors';
import { Auth } from '../auth';
import { APIError } from '../../exception';

export class Register {
  constructor(private auth: Auth) { }

  async execute({ name, email, password }: IRegisterParams): Promise<IRegisterResponse> {
    try {
      const response = await this.auth.client._request({
        method: 'POST',
        endpoint: '/auth/register',
        data: { name, email, password },
      });

      if (!response?.ok) {
        throw new RegisterError(response?.message || 'Register failed');
      }

      return response.data as IRegisterResponse;
    } catch (error: any) {
      const status = error?.status;
      if (error instanceof APIError) {
        switch (status) {
          case 400:
            throw new RegisterValidationError(error.message || 'Invalid request');
          case 401:
            throw new RegisterUnauthorizedError(error.message || 'Unauthorized');
          case 404:
            throw new RegisterNotFoundError(error.message || 'Not found');
          case 500:
            throw new RegisterServerError(error.message || 'Server error');
          default:
            throw new RegisterError(error.message || 'Unexpected error');
        }
      }
      throw new RegisterError(error.message || 'An unexpected error occurred');
    }
  }
}
