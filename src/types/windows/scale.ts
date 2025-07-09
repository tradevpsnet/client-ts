export type IServerScaleResponse = {
  ok: boolean;
  msg: string;
  data: string;
}


export type IServerScaleParams = {
  cpu: number;
  memory: number;
  vm_class?: string;
}
