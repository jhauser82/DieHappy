// Generate realistic mock stock data
export function generateMockData(symbol, timeframe) {
  const stockInfo = {
    AAPL: { name: 'Apple Inc.', basePrice: 178.50 },
    MSFT: { name: 'Microsoft Corporation', basePrice: 378.90 },
    GOOGL: { name: 'Alphabet Inc.', basePrice: 140.25 },
    AMZN: { name: 'Amazon.com Inc.', basePrice: 151.80 },
    TSLA: { name: 'Tesla Inc.', basePrice: 242.15 },
    NVDA: { name: 'NVIDIA Corporation', basePrice: 495.20 },
    META: { name: 'Meta Platforms Inc.', basePrice: 338.75 },
    SPY: { name: 'S&P 500 ETF Trust', basePrice: 455.30 },
  };

  const info = stockInfo[symbol] || { name: symbol, basePrice: 100 };
  const dataPoints = getDataPointsForTimeframe(timeframe);
  const basePrice = info.basePrice;

  const candles = [];
  const line = [];
  const volume = [];

  let currentPrice = basePrice;
  const now = Date.now() / 1000;
  const interval = getIntervalForTimeframe(timeframe);

  for (let i = 0; i < dataPoints; i++) {
    const time = now - (dataPoints - i) * interval;
    
    // Random walk with slight upward bias
    const change = (Math.random() - 0.48) * (basePrice * 0.02);
    currentPrice += change;
    
    const open = currentPrice;
    const close = currentPrice + (Math.random() - 0.5) * (basePrice * 0.01);
    const high = Math.max(open, close) + Math.random() * (basePrice * 0.005);
    const low = Math.min(open, close) - Math.random() * (basePrice * 0.005);
    
    candles.push({
      time: Math.floor(time),
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
    });

    line.push({
      time: Math.floor(time),
      value: parseFloat(close.toFixed(2)),
    });

    volume.push({
      time: Math.floor(time),
      value: Math.floor(Math.random() * 10000000 + 5000000),
      color: close >= open ? 'rgba(38, 166, 154, 0.5)' : 'rgba(239, 83, 80, 0.5)',
    });

    currentPrice = close;
  }

  const lastPrice = candles[candles.length - 1].close;
  const firstPrice = candles[0].open;
  const change = lastPrice - firstPrice;
  const changePercent = (change / firstPrice) * 100;

  return {
    candles,
    line,
    volume,
    info: {
      name: info.name,
      price: lastPrice,
      change,
      changePercent,
    },
  };
}

function getDataPointsForTimeframe(timeframe) {
  const map = {
    '1D': 78,    // 5-min intervals
    '5D': 390,   // 5-min intervals
    '1M': 30,    // daily
    '3M': 90,    // daily
    '6M': 180,   // daily
    '1Y': 365,   // daily
    '5Y': 260,   // weekly
  };
  return map[timeframe] || 100;
}

function getIntervalForTimeframe(timeframe) {
  const map = {
    '1D': 300,        // 5 minutes
    '5D': 300,        // 5 minutes
    '1M': 86400,      // 1 day
    '3M': 86400,      // 1 day
    '6M': 86400,      // 1 day
    '1Y': 86400,      // 1 day
    '5Y': 604800,     // 1 week
  };
  return map[timeframe] || 86400;
}
