export type IDailyNewsParams = {
  date_from: string;
  date_to: string;
  spoken_language: string;
  ai_model: string;
  format: 'json' | string;
}
export type IDailyNewsResponse = {
  period: string;
  analysis: {
    confidence: string;
    impacted_assets: {
      asset: string;
      rationale: string;
    }[];
    news_item: string;
    sentiment: 'Bullish' | 'Bearish' | 'Neutral' | string;
    strategic_summary: string;
    trade_recommendation: {
      action: 'Buy' | 'Sell' | 'Hold' | string;
      asset: string;
      rationale: string;
    }[];
  }[];
  generated_at: string;
}
