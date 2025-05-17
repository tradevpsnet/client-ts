import { Client } from "../../client";
import { ProjectsList } from "./projects-list/projects-list";
import { ProjectDeploy } from "./project-deploy/project-deploy";
import { IProjectCreateParams } from "../../types/projects/project-deploy";
import { IProjectListQueryParams } from "../../types/projects/projects-list";
export class Projects {
  constructor(readonly client: Client) { }


  async project_deploy(payload: IProjectCreateParams) {
    return new ProjectDeploy(this).execute(payload);
  }

  async projects_list(query?: IProjectListQueryParams) {
    return new ProjectsList(this).execute(query);
  }
}
