import { useEffect, useState } from 'react';
import FearGreedGauge from './FearGreedGauge';
import FearGreedChart from './FearGreedChart';
import { fetchFearGreedIndex } from '../services/fearGreedApi';
import './FearGreedDashboard.css';

function FearGreedDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const result = await fetchFearGreedIndex();
        setData(result);
        setError(null);
      } catch (err) {
        console.error('Failed to load Fear & Greed Index:', err);
        setError('Unable to load Fear & Greed Index data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
    
    // Refresh every 5 minutes
    const interval = setInterval(loadData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="fear-greed-dashboard">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading Fear & Greed Index...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fear-greed-dashboard">
        <div className="error-state">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fear-greed-dashboard">
      <header className="dashboard-header">
        <h2>Market Sentiment</h2>
        <p>The Fear & Greed Index measures market emotions and sentiment</p>
      </header>

      <div className="dashboard-grid">
        <section className="gauge-section">
          <FearGreedGauge 
            value={data.current.value} 
            rating={data.current.rating}
            timestamp={data.current.timestamp}
          />
          
          <div className="info-card">
            <h3>What does this mean?</h3>
            <p>
              The Fear & Greed Index analyzes market momentum, stock price strength, 
              market volatility, and other factors to determine if investors are too 
              bullish or bearish.
            </p>
            <div className="scale-guide">
              <div className="scale-item">
                <span className="dot extreme-fear"></span>
                <span>0-25: Extreme Fear</span>
              </div>
              <div className="scale-item">
                <span className="dot fear"></span>
                <span>26-45: Fear</span>
              </div>
              <div className="scale-item">
                <span className="dot neutral"></span>
                <span>46-55: Neutral</span>
              </div>
              <div className="scale-item">
                <span className="dot greed"></span>
                <span>56-75: Greed</span>
              </div>
              <div className="scale-item">
                <span className="dot extreme-greed"></span>
                <span>76-100: Extreme Greed</span>
              </div>
            </div>
          </div>
        </section>

        <section className="chart-section">
          <FearGreedChart history={data.history} />
        </section>
      </div>

      <section className="quick-stats">
        <div className="stat-card">
          <span className="stat-label">Previous Day</span>
          <span className="stat-value">{data.previousDay.value}</span>
          <span className="stat-rating">{data.previousDay.rating}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Last Week</span>
          <span className="stat-value">{data.lastWeek.value}</span>
          <span className="stat-rating">{data.lastWeek.rating}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Last Month</span>
          <span className="stat-value">{data.lastMonth.value}</span>
          <span className="stat-rating">{data.lastMonth.rating}</span>
        </div>
      </section>
    </div>
  );
}

export default FearGreedDashboard;
