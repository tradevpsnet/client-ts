export type ServerActionType = 'start' | 'stop' | 'restart';

export type IServerActionParams = {
  action: ServerActionType;
}

export type IServerActionResponse = {
  ok: boolean;
  msg: string;
  data: {
    id: string;
    status: number;
    updated_at: string;
  };
}
