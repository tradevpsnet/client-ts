export type IWeeklyNewsParams = {
  date_from: string;
  date_to: string;
  spoken_language: string;
  ai_model: string;
  format: 'json' | string;
}
export type IWeeklyNewsResponse = {
  period: string;
  summarize: string;
  sentiment: string;
  forecast_misses: string;
  top_5_predicted_assets: string;
}
