import axios from 'axios';

// CNN Fear & Greed Index API (via alternative endpoint)
const FEAR_GREED_API = 'https://production.dataviz.cnn.io/index/fearandgreed/graphdata';

export async function fetchFearGreedIndex() {
  try {
    const response = await axios.get(FEAR_GREED_API);
    const data = response.data;
    
    // Parse CNN's response format
    const currentValue = Math.round(data.fear_and_greed.score);
    const currentRating = data.fear_and_greed.rating;
    const timestamp = Math.floor(new Date(data.fear_and_greed.timestamp).getTime() / 1000);
    
    // Parse historical data
    const history = data.fear_and_greed_historical.data.map(item => ({
      timestamp: Math.floor(new Date(item.x).getTime() / 1000),
      value: Math.round(item.y),
      rating: getRating(Math.round(item.y)),
    }));
    
    return {
      current: {
        value: currentValue,
        rating: currentRating,
        timestamp: timestamp,
      },
      previousDay: history.length > 1 ? {
        value: history[history.length - 2].value,
        rating: history[history.length - 2].rating,
      } : null,
      lastWeek: history.length > 7 ? {
        value: history[history.length - 8].value,
        rating: history[history.length - 8].rating,
      } : null,
      lastMonth: history.length > 30 ? {
        value: history[0].value,
        rating: history[0].rating,
      } : null,
      history,
    };
  } catch (error) {
    console.error('Error fetching Fear & Greed Index:', error);
    return generateMockFearGreedData();
  }
}

function generateMockFearGreedData() {
  const now = Math.floor(Date.now() / 1000);
  const dayInSeconds = 86400;

  // Generate current value with some randomness
  const currentValue = Math.floor(Math.random() * 40) + 40; // 40-80 range
  const currentRating = getRating(currentValue);

  // Generate historical data (30 days)
  const history = [];
  let value = currentValue;
  
  for (let i = 30; i >= 0; i--) {
    // Random walk with mean reversion
    const change = (Math.random() - 0.5) * 10;
    value = Math.max(0, Math.min(100, value + change));
    
    // Slight mean reversion to 50
    value += (50 - value) * 0.05;
    
    history.push({
      timestamp: now - (i * dayInSeconds),
      value: Math.round(value),
      rating: getRating(Math.round(value)),
    });
  }

  return {
    current: {
      value: currentValue,
      rating: currentRating,
      timestamp: now,
    },
    previousDay: {
      value: history[history.length - 2].value,
      rating: history[history.length - 2].rating,
    },
    lastWeek: {
      value: history[history.length - 8].value,
      rating: history[history.length - 8].rating,
    },
    lastMonth: {
      value: history[0].value,
      rating: history[0].rating,
    },
    history,
  };
}

function getRating(value) {
  if (value <= 25) return 'Extreme Fear';
  if (value <= 45) return 'Fear';
  if (value <= 55) return 'Neutral';
  if (value <= 75) return 'Greed';
  return 'Extreme Greed';
}

// For production use with RapidAPI:
export async function fetchFearGreedIndexFromAPI() {
  try {
    const response = await axios.get(FEAR_GREED_API, {
      headers: {
        'X-RapidAPI-Key': 'YOUR_API_KEY_HERE',
        'X-RapidAPI-Host': 'fear-and-greed-index.p.rapidapi.com'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}
