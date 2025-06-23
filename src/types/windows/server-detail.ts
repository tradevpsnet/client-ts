export type IServerDetailResponse = {
  ok: boolean;
  msg: string;
  data: {
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
    auto_scale_cpu: number | null;
    auto_scale_memory: number | null;
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
  };
}
