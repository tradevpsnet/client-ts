export type IRegionsParams = {}

export type IRegion = {
  id: number;
  label: string;
  icon: string;
}

export type IRegionsResponse = {
  ok: boolean;
  msg: string;
  data: IRegion[];
}
