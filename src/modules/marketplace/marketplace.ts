import { Client, ICalendarQueryParams } from "../../client";
import { Calendar } from "./calender/calender";
export class Marketplace {
  constructor(readonly client: Client) {}
    async calender(query?: ICalendarQueryParams) {
      return new Calendar(this).fetch(query);
    }
}