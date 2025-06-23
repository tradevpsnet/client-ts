import { Client, ICalendarQueryParams } from "../../client";
import { Calendar } from "./calender/calendar";
export class Marketplace {
  constructor(readonly client: Client) {}
    async calendar(query?: ICalendarQueryParams) {
      return new Calendar(this).fetch(query);
    }
}