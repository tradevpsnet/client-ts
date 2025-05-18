export interface ICalendarQueryParams {
  per_page?: number;
  page?: number;
  search?: string;
  sort_by?: 'time' | 'name' | 'importance' | 'impact' | 'country' | 'currency' | 'sector';
  sort_direction?: 'asc' | 'desc';
  importance?: string;
  impact?: string;
  country?: string;
  currency?: string;
  sector?: string;
  type?: string;
  multiplier?: string;
  time_mode?: string;
  unit?: string;
  frequency?: string;
  date_from?: string;
  date_to?: string;
}


export type ICalendarEvent = {
  id: string;
  event_id: number;
  code: string;
  name: string;
  importance: number;
  impact: number;
  frequency: number;
  sector: number;
  source: string;
  type: number;
  multiplier: number;
  time_mode: number;
  period: string;
  unit: number;
  time: string;
  currency: string;
  country: string;
  previous: string;
  forecast: string;
  actual: string;
  flag: string;
  created_at: string;
  updated_at: string;
}

export type ICalendarResponse = {
  ok: boolean;
  msg: string;
  data: ICalendarEvent[];
}
