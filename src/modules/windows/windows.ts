import { Client } from "../../client";
import { IServerActionParams } from "../../types/windows/server-action";
import { IServerDeployParams } from "../../types/windows/server-deploy";
import { IServerListQueryParams } from "../../types/windows/servers-list";
import { Regions } from "./region/region";
import { ServerAction } from "./server-action/server-action";
import { ServerChangePassword } from "./server-change-password/server-change-password";
import { ServerDelete } from "./server-delete/server-delete";
import { ServerDeploy } from "./server-deploy/server-deploy";
import { ServerDetail } from "./server-detail/server-detail";
import { ServersList } from "./servers-list/servers-list";

export class Windows {
  constructor(readonly client: Client) {}

  async regions() {
    return new Regions(this).execute();
  }

  async server_action(serverId: string, params: IServerActionParams) {
    return new ServerAction(this).execute(serverId, params);
  }  

  async server_delete(serverId: string) {
    return new ServerDelete(this).execute(serverId);
  }

  async server_deploy(payload: IServerDeployParams) {
    return new ServerDeploy(this).execute(payload);
  }

  async server_detail(serverId: string) {
    return new ServerDetail(this).execute(serverId);
  }

  async servers_list(query?: IServerListQueryParams) {
    return new ServersList(this).execute(query);
  }

  async server_change_password(serverId: string) {
    return new ServerChangePassword(this).execute(serverId);
  }
}
