export type IProjectCreateParams = {
  name: string;
  url?: string;
  description?: string;
  type?: number;
  soft_limit?: number;
  hard_limit?: number;
};
export type IProjectCreateResponse = {
  ok: boolean;
  msg: string;
  data: {
    id: string;
    name: string;
    description: string | null;
    resources_count: number;
    url: string | null;
    type: number | null;
    charge: number;
    soft_limit: number | null;
    hard_limit: number | null;
    status: number;
    used_at: string | null;
    created_at: string;
    updated_at: string;
  };
};
