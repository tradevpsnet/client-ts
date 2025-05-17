export type IServerDeployParams = {
  name: string;
  region: number;
  project_id: string;
  provider?: number;
  version?: number;
  cpu?: number;
  memory?: number;
  disk?: number;
  disk_type?: string;
  auto_scale_cpu?: boolean;
  auto_scale_memory?: boolean;
  has_static_ip?: boolean;
}

export type IServerDeployResponse = {
  ok: boolean;
  msg: string;
  data: {
    id: string;
    name: string;
    project_id: string;
    provider: number;
    region: number;
    version: number;
    status: number;
    created_at: string;
    updated_at: string;
  };
}
