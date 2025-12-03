// Generate mock market indicators
// In production, these would come from real APIs

export function generateMarketIndicators() {
  // Big Mac Index - measures currency valuation
  const bigMacValue = 5.15 + (Math.random() - 0.5) * 0.5;
  const bigMacChange = (Math.random() - 0.5) * 10;

  // Bull/Bear Sentiment - percentage of bullish investors
  const bullishPercent = Math.floor(Math.random() * 30) + 40; // 40-70%
  const bearishPercent = Math.floor(Math.random() * 30) + 20; // 20-50%
  const neutralPercent = 100 - bullishPercent - bearishPercent;

  // Put/Call Ratio - options trading indicator
  // < 0.7 = bullish, 0.7-1.0 = neutral, > 1.0 = bearish
  const putCallRatio = 0.5 + Math.random() * 0.8; // 0.5 to 1.3

  return {
    bigMac: {
      value: bigMacValue,
      change: bigMacChange,
    },
    sentiment: {
      bullish: bullishPercent,
      bearish: bearishPercent,
      neutral: neutralPercent,
    },
    putCall: {
      ratio: putCallRatio,
    },
  };
}

// For production use with real APIs:
export async function fetchBigMacIndex() {
  // Would fetch from The Economist's Big Mac Index API
  // or similar currency valuation service
  throw new Error('Not implemented');
}

export async function fetchSentimentData() {
  // Would fetch from AAII Sentiment Survey or similar
  // https://www.aaii.com/sentimentsurvey
  throw new Error('Not implemented');
}

export async function fetchPutCallRatio() {
  // Would fetch from CBOE or market data provider
  // http://www.cboe.com/data/
  throw new Error('Not implemented');
}
