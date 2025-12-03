import axios from 'axios';

// Using Yahoo Finance API via RapidAPI or direct endpoints
const YAHOO_API_BASE = 'https://query1.finance.yahoo.com/v8/finance';

export async function fetchStockData(symbol, range = '1d', interval = '5m') {
  try {
    const url = `${YAHOO_API_BASE}/chart/${symbol}`;
    const params = {
      range,
      interval,
      includePrePost: false,
      events: 'div,split',
    };

    const response = await axios.get(url, { params });
    const result = response.data.chart.result[0];
    
    if (!result) {
      throw new Error('No data returned from Yahoo Finance');
    }

    const timestamps = result.timestamp;
    const quote = result.indicators.quote[0];
    const meta = result.meta;

    // Transform to our format
    const candles = timestamps.map((time, i) => ({
      time,
      open: quote.open[i] || quote.close[i],
      high: quote.high[i] || quote.close[i],
      low: quote.low[i] || quote.close[i],
      close: quote.close[i],
    })).filter(candle => candle.close !== null);

    const line = candles.map(candle => ({
      time: candle.time,
      value: candle.close,
    }));

    const volume = timestamps.map((time, i) => ({
      time,
      value: quote.volume[i] || 0,
      color: (quote.close[i] >= quote.open[i]) 
        ? 'rgba(38, 166, 154, 0.5)' 
        : 'rgba(239, 83, 80, 0.5)',
    })).filter(v => v.value > 0);

    // Calculate price change
    const currentPrice = meta.regularMarketPrice;
    const previousClose = meta.chartPreviousClose;
    const change = currentPrice - previousClose;
    const changePercent = (change / previousClose) * 100;

    return {
      candles,
      line,
      volume,
      info: {
        name: meta.longName || meta.shortName || symbol,
        price: currentPrice,
        change,
        changePercent,
        currency: meta.currency,
        exchangeName: meta.exchangeName,
      },
    };
  } catch (error) {
    console.error('Error fetching Yahoo Finance data:', error);
    throw error;
  }
}

export async function fetchQuote(symbol) {
  try {
    const url = `${YAHOO_API_BASE}/quote`;
    const params = {
      symbols: symbol,
    };

    const response = await axios.get(url, { params });
    const result = response.data.quoteResponse.result[0];

    if (!result) {
      throw new Error('No quote data returned');
    }

    return {
      symbol: result.symbol,
      name: result.longName || result.shortName,
      price: result.regularMarketPrice,
      change: result.regularMarketChange,
      changePercent: result.regularMarketChangePercent,
      volume: result.regularMarketVolume,
      marketCap: result.marketCap,
    };
  } catch (error) {
    console.error('Error fetching quote:', error);
    throw error;
  }
}

export async function fetchMultipleQuotes(symbols) {
  try {
    const url = `${YAHOO_API_BASE}/quote`;
    const params = {
      symbols: symbols.join(','),
    };

    const response = await axios.get(url, { params });
    const results = response.data.quoteResponse.result;

    if (!results || results.length === 0) {
      throw new Error('No quote data returned');
    }

    const quotes = {};
    results.forEach(result => {
      quotes[result.symbol] = {
        symbol: result.symbol,
        name: result.longName || result.shortName,
        price: result.regularMarketPrice,
        change: result.regularMarketChange,
        changePercent: result.regularMarketChangePercent,
        volume: result.regularMarketVolume,
      };
    });

    return quotes;
  } catch (error) {
    console.error('Error fetching multiple quotes:', error);
    throw error;
  }
}

// Map timeframes to Yahoo Finance range and interval
export function getYahooParams(timeframe) {
  const params = {
    '1D': { range: '1d', interval: '5m' },
    '5D': { range: '5d', interval: '15m' },
    '1M': { range: '1mo', interval: '1d' },
    '3M': { range: '3mo', interval: '1d' },
    '6M': { range: '6mo', interval: '1d' },
    '1Y': { range: '1y', interval: '1d' },
    '5Y': { range: '5y', interval: '1wk' },
  };

  return params[timeframe] || params['1D'];
}
