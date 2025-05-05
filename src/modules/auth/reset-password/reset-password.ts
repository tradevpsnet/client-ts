import type { IResetPasswordResponse, IResetPasswordParams } from '../../../types/auth/reset-password';
import {
  ResetPasswordError,
  ResetPasswordNotFoundError,
  ResetPasswordServerError,
  ResetPasswordUnauthorizedError,
  ResetPasswordValidationError,
} from './errors';
import { Auth } from '../auth';
import { APIError } from '../../exception';

export class ResetPassword {
  constructor(private auth: Auth) { }

  async execute({
    email,
    code,
    password,
    password_confirmation,
  }: IResetPasswordParams): Promise<IResetPasswordResponse> {
    try {
      const response = await this.auth.client._request({
        method: 'POST',
        endpoint: '/auth/reset-password',
        data: {
          email,
          code,
          password,
          password_confirmation,
        },
      });

      if (!response?.ok) {
        throw new ResetPasswordError(response?.message || 'Reset password failed');
      }

      return response.data as IResetPasswordResponse;
    } catch (error: any) {
      const status = error?.status;
      if (error instanceof APIError) {
        switch (status) {
          case 400:
            throw new ResetPasswordValidationError(error.message || 'Validation error');
          case 401:
            throw new ResetPasswordUnauthorizedError(error.message || 'Unauthorized');
          case 404:
            throw new ResetPasswordNotFoundError(error.message || 'User not found');
          case 500:
            throw new ResetPasswordServerError(error.message || 'Server error');
          default:
            throw new ResetPasswordError(error.message || 'Unexpected error');
        }
      }
      throw new ResetPasswordError(error.message || 'An unexpected error occurred');
    }
  }
}
