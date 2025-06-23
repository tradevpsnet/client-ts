export type IServer = {
  id: string;
  name: string;
  project_id: string;
  admin_username: string | null;
  vm_class: string | null;
  provider: number;
  region: number;
  version: number;
  cpu: number;
  memory: number;
  disk: number;
  disk_type: string | null;
  auto_scale_cpu: boolean | null;
  auto_scale_memory: boolean | null;
  charge: number;
  soft_limit: number | null;
  hard_limit: number | null;
  ip: string;
  has_static_ip: boolean;
  ip_version: number | null;
  synced_at: string | null;
  status: number;
  created_at: string;
  updated_at: string;
}

export type IPagination = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  first_page_url: string;
  from: number;
  last_page_url: string;
  next_page_url: string | null;
  prev_page_url: string;
}
export type IListServersResponse = {
  ok: boolean;
  msg: string;
  data: IServer[];
  pagination: IPagination;
}

export type IServerListQueryParams = {
  date_from?: string;
  date_to?: string;
  per_page?: number;
  page?: number;
  search?: string;
  sort_by?: string;
  sort_direction?: string;
  status?: string;
  region?: string | null;
  project_id?: string | null;
  version?: string;
}

