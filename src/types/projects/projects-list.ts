export type IProject = {
  id: string;
  name: string;
  description: string | null;
  resources_count: number;
  url: string | null;
  type: string | null;
  charge: number;
  soft_limit: number | null;
  hard_limit: number | null;
  status: number;
  used_at: string | null;
  created_at: string;
  updated_at: string;
};

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
  links: Record<string, unknown>;
};
export type IListProjectsResponse = {
  ok: boolean;
  msg: string;
  data: IProject[];
  pagination: IPagination;
}

export type IProjectListQueryParams = {
  search?: string;
  sort_by?: string;
  sort_direction?: string;
  page?: number;
  per_page?: number;
  date_from?: string;
  date_to?: string;
  type?: string | null;
  status?: string;
};

