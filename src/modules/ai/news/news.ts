import type { AI } from "../ai";
import { IDailyNewsParams, IWeeklyNewsParams } from "../../../client";
import { DailyNews } from "./daily/daily-analysis";
import { WeeklyNews } from "./weekly/weekly-analysis";

export class News {
  constructor(readonly ai: AI) {}

  async weeklyAnalysis(params: IWeeklyNewsParams) {
    return new WeeklyNews(this).execute(params);
  }

  async dailyAnalysis(params: IDailyNewsParams) {
    return new DailyNews(this).execute(params);
  }
}
