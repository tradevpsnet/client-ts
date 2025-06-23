import type { Client } from "../../client";
import { News } from "./news/news";

export class AI {
  private _news?: News;

  constructor(readonly client: Client) {}

  get news(): News {
    if (!this._news) {
      this._news = new News(this);
    }
    return this._news;
  }
}
