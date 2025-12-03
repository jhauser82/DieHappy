import { useEffect, useState } from 'react';
import { fetchFearGreedIndex } from '../services/fearGreedApi';
import { generateMarketIndicators } from '../utils/marketIndicators';
import './MarketIndicators.css';

function MarketIndicators() {
  const [indicators, setIndicators] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadIndicators = async () => {
      try {
        const fearGreed = await fetchFearGreedIndex();
        const otherIndicators = generateMarketIndicators();
        
        setIndicators({
          fearGreed: fearGreed.current,
          bigMac: otherIndicators.bigMac,
          sentiment: otherIndicators.sentiment,
          putCall: otherIndicators.putCall,
        });
        setLoading(false);
      } catch (error) {
        console.error('Failed to load indicators:', error);
        setLoading(false);
      }
    };

    loadIndicators();
    const interval = setInterval(loadIndicators, 5 * 60 * 1000); // Refresh every 5 min
    return () => clearInterval(interval);
  }, []);

  if (loading || !indicators) {
    return (
      <section className="market-indicators">
        <div className="loading-indicators">Loading market indicators...</div>
      </section>
    );
  }

  const getIndicatorColor = (value, type) => {
    if (type === 'fearGreed') {
      if (value <= 25) return '#d32f2f';
      if (value <= 45) return '#f57c00';
      if (value <= 55) return '#fbc02d';
      if (value <= 75) return '#7cb342';
      return '#388e3c';
    }
    if (type === 'sentiment') {
      return value > 50 ? '#7cb342' : '#ef5350';
    }
    if (type === 'putCall') {
      if (value < 0.7) return '#7cb342'; // Bullish
      if (value > 1.0) return '#ef5350'; // Bearish
      return '#fbc02d'; // Neutral
    }
    return '#667eea';
  };

  const getIndicatorLabel = (value, type) => {
    if (type === 'fearGreed') {
      if (value <= 25) return 'Extreme Fear';
      if (value <= 45) return 'Fear';
      if (value <= 55) return 'Neutral';
      if (value <= 75) return 'Greed';
      return 'Extreme Greed';
    }
    if (type === 'sentiment') {
      return value > 50 ? 'Bullish' : 'Bearish';
    }
    if (type === 'putCall') {
      if (value < 0.7) return 'Bullish';
      if (value > 1.0) return 'Bearish';
      return 'Neutral';
    }
    return '';
  };

  return (
    <section className="market-indicators">
      <a 
        href="https://edition.cnn.com/markets/fear-and-greed" 
        target="_blank" 
        rel="noopener noreferrer"
        className="indicator-link"
      >
        <div className="indicator-card">
          <div className="indicator-header">
            <h4>Fear & Greed</h4>
            <span className="indicator-info">Market Sentiment</span>
          </div>
          <div className="indicator-value" style={{ color: getIndicatorColor(indicators.fearGreed.value, 'fearGreed') }}>
            {indicators.fearGreed.value}
          </div>
          <div className="indicator-label">
            {indicators.fearGreed.rating}
          </div>
          <div className="mini-chart">
            <div 
              className="chart-bar" 
              style={{ 
                width: `${indicators.fearGreed.value}%`,
                backgroundColor: getIndicatorColor(indicators.fearGreed.value, 'fearGreed')
              }}
            />
          </div>
        </div>
      </a>

      <a 
        href="https://www.economist.com/big-mac-index" 
        target="_blank" 
        rel="noopener noreferrer"
        className="indicator-link"
      >
        <div className="indicator-card">
          <div className="indicator-header">
            <h4>Big Mac Index</h4>
            <span className="indicator-info">Currency Valuation</span>
          </div>
        <div className="indicator-value" style={{ color: '#667eea' }}>
          ${indicators.bigMac.value.toFixed(2)}
        </div>
        <div className="indicator-label">
          {indicators.bigMac.change >= 0 ? '+' : ''}{indicators.bigMac.change.toFixed(2)}% vs USD
        </div>
        <div className="mini-chart">
          <div 
            className="chart-bar" 
            style={{ 
              width: `${Math.min(Math.abs(indicators.bigMac.change) * 10, 100)}%`,
              backgroundColor: indicators.bigMac.change >= 0 ? '#7cb342' : '#ef5350'
            }}
          />
        </div>
        </div>
      </a>

      <a 
        href="https://www.aaii.com/sentimentsurvey" 
        target="_blank" 
        rel="noopener noreferrer"
        className="indicator-link"
      >
        <div className="indicator-card">
          <div className="indicator-header">
            <h4>Bull/Bear Sentiment</h4>
            <span className="indicator-info">Investor Outlook</span>
          </div>
        <div className="indicator-value" style={{ color: getIndicatorColor(indicators.sentiment.bullish, 'sentiment') }}>
          {indicators.sentiment.bullish}%
        </div>
        <div className="indicator-label">
          {getIndicatorLabel(indicators.sentiment.bullish, 'sentiment')} ({indicators.sentiment.bearish}% Bearish)
        </div>
        <div className="mini-chart sentiment-chart">
          <div 
            className="chart-bar bullish" 
            style={{ width: `${indicators.sentiment.bullish}%` }}
          />
          <div 
            className="chart-bar bearish" 
            style={{ width: `${indicators.sentiment.bearish}%` }}
          />
        </div>
        </div>
      </a>

      <a 
        href="https://www.cboe.com/tradable_products/vix/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="indicator-link"
      >
        <div className="indicator-card">
          <div className="indicator-header">
            <h4>Put/Call Ratio</h4>
            <span className="indicator-info">Options Activity</span>
          </div>
        <div className="indicator-value" style={{ color: getIndicatorColor(indicators.putCall.ratio, 'putCall') }}>
          {indicators.putCall.ratio.toFixed(2)}
        </div>
        <div className="indicator-label">
          {getIndicatorLabel(indicators.putCall.ratio, 'putCall')}
        </div>
        <div className="mini-chart">
          <div 
            className="chart-bar" 
            style={{ 
              width: `${Math.min(indicators.putCall.ratio * 50, 100)}%`,
              backgroundColor: getIndicatorColor(indicators.putCall.ratio, 'putCall')
            }}
          />
        </div>
        </div>
      </a>
    </section>
  );
}

export default MarketIndicators;
