import {
  ProjectDeployError,
  ProjectDeployNotFoundError,
  ProjectDeployServerError,
  ProjectDeployUnauthorizedError,
  ProjectDeployValidationError,
} from './errors';
import { Projects } from '../projects';
import { APIError } from '../../exception';
import { IProjectCreateParams, IProjectCreateResponse } from '../../../types/projects/project-deploy';

export class ProjectDeploy {
  constructor(private projects: Projects) {}

  async execute(params: IProjectCreateParams): Promise<IProjectCreateResponse> {
    try {
      const response = await this.projects.client._request({
        method: 'POST',
        endpoint: '/my/projects',
        data: params,
      });

      if (!response?.ok) {
        throw new ProjectDeployError(response?.msg || 'Project deployment failed');
      }

      return response.data as IProjectCreateResponse;
    } catch (error: any) {
      const status = error?.status;

      if (error instanceof APIError) {
        switch (status) {
          case 400:
            throw new ProjectDeployValidationError(error.message || 'Invalid project config');
          case 401:
            throw new ProjectDeployUnauthorizedError(error.message || 'Unauthorized');
          case 404:
            throw new ProjectDeployNotFoundError(error.message || 'Endpoint not found');
          case 500:
            throw new ProjectDeployServerError(error.message || 'Server error');
          default:
            throw new ProjectDeployError(error.message || 'Unexpected error');
        }
      }

      throw new ProjectDeployError(error.message || 'An unexpected error occurred');
    }
  }
}
