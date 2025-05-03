import type { IForgetPasswordResponse, IForgetPasswordParams } from '../../../types/auth/forget-password';
import {
  ForgetPasswordError,
  ForgetPasswordNotFoundError,
  ForgetPasswordServerError,
  ForgetPasswordUnauthorizedError,
  ForgetPasswordValidationError,
} from './errors';
import { Auth } from '../auth';

export class ForgetPassword {
  constructor(private auth: Auth) {}

  async execute({ email }: IForgetPasswordParams): Promise<IForgetPasswordResponse> {
    try {
      const response = await this.auth.client._request({
        method: 'POST',
        endpoint: '/auth/forgot-password',
        data: { email },
      });

      if (!response?.ok) {
        throw new ForgetPasswordError(response?.message || 'Send email failed');
      }

      return response.data as IForgetPasswordResponse;
    } catch (error: any) {
      const status = error?.status;

      switch (status) {
        case 400:
          throw new ForgetPasswordValidationError(error.message || 'Invalid email');
        case 401:
          throw new ForgetPasswordUnauthorizedError(error.message || 'Unauthorized');
        case 404:
          throw new ForgetPasswordNotFoundError(error.message || 'Not found');
        case 500:
          throw new ForgetPasswordServerError(error.message || 'Server error');
        default:
          throw new ForgetPasswordError(error.message || 'Unexpected error');
      }
    }
  }
}
