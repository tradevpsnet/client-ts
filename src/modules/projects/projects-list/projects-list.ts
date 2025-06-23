import {
  ProjectListError,
  ProjectListServerError,
  ProjectListUnauthorizedError,
  ProjectListValidationError,
} from './errors';
import { Projects } from '../projects';
import { APIError } from '../../exception';
import { IListProjectsResponse, IProjectListQueryParams } from '../../../types/projects/projects-list';

function buildQueryParams(params: IProjectListQueryParams): string {
  const searchParams = new URLSearchParams();
  for (const key in params) {
    const typedKey = key as keyof IProjectListQueryParams;
    const value = params[typedKey];
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  }
  return searchParams.toString();
}

export class ProjectsList {
  constructor(private projects: Projects) {}

  async execute(params: IProjectListQueryParams = {}): Promise<IListProjectsResponse> {
    try {
      const query = buildQueryParams(params);
      const endpoint = `my/projects${query ? '?' + query : ''}`;

      const response = await this.projects.client._request({
        method: 'GET',
        endpoint,
      });

      if (!response?.ok) {
        throw new ProjectListError(response?.msg || 'Failed to fetch projects');
      }

      return response as IListProjectsResponse;
    } catch (error: any) {
      const status = error?.status;

      if (error instanceof APIError) {
        switch (status) {
          case 400:
            throw new ProjectListValidationError(error.message || 'Invalid request parameters');
          case 401:
            throw new ProjectListUnauthorizedError(error.message || 'Unauthorized');
          case 500:
            throw new ProjectListServerError(error.message || 'Internal server error');
          default:
            throw new ProjectListError(error.message || 'Unexpected error');
        }
      }

      throw new ProjectListError(error.message || 'An unexpected error occurred');
    }
  }
}
