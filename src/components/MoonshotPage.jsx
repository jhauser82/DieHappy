import { useEffect, useState } from 'react';
import { analyzeMoonshotOpportunities } from '../services/moonshotAnalyzer';
import Footer from './Footer';
import './MoonshotPage.css';

function MoonshotPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedStock, setSelectedStock] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const analysis = await analyzeMoonshotOpportunities();
        setData(analysis);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load moonshot analysis:', error);
        setLoading(false);
      }
    };

    loadData();
    const interval = setInterval(loadData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !data) {
    return (
      <div className="moonshot-page">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Analyzing market opportunities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="moonshot-page">


      <div className="market-pulse">
        <h3>Market Pulse</h3>
        <div className="pulse-grid">
          <div className="pulse-item">
            <span className="pulse-label">Overall Sentiment</span>
            <span className="pulse-value bullish">{data.marketConditions.overall}</span>
          </div>
          <div className="pulse-item">
            <span className="pulse-label">Volatility</span>
            <span className="pulse-value">{data.marketConditions.volatility}</span>
          </div>
          <div className="pulse-item">
            <span className="pulse-label">Retail Sentiment</span>
            <span className="pulse-value bullish">{data.marketConditions.retailSentiment}</span>
          </div>
          <div className="pulse-item">
            <span className="pulse-label">Trending Now</span>
            <span className="pulse-value trending">{data.topTrending.join(', ')}</span>
          </div>
        </div>
      </div>

      <div className="opportunities-grid">
        {data.opportunities.map((opp, index) => (
          <div 
            key={opp.ticker} 
            className={`opportunity-card ${selectedStock === opp.ticker ? 'selected' : ''}`}
            onClick={() => setSelectedStock(selectedStock === opp.ticker ? null : opp.ticker)}
          >
            <div className="card-header">
              <div className="ticker-info">
                <h3>
                  {opp.ticker}
                  {opp.type === 'crypto' && <span className="crypto-badge">CRYPTO</span>}
                </h3>
                <span className="company-name">{opp.name}</span>
              </div>
              <div className="confidence-badge" style={{
                background: opp.confidence > 80 ? '#4caf50' : opp.confidence > 70 ? '#ff9800' : '#ff5722'
              }}>
                {opp.confidence}% Confidence
              </div>
            </div>

            <div className="price-section">
              <div className="price-item">
                <span className="label">Current</span>
                <span className="value">${opp.currentPrice.toFixed(2)}</span>
              </div>
              <div className="arrow">→</div>
              <div className="price-item">
                <span className="label">Target</span>
                <span className="value target">${opp.targetPrice.toFixed(2)}</span>
              </div>
              <div className="upside">
                <span className="upside-value">+{opp.upside}%</span>
                <span className="timeframe">{opp.timeframe}</span>
              </div>
            </div>

            <div className="metrics-grid">
              <div className="metric">
                <span className="metric-label">Reddit Buzz</span>
                <span className="metric-value">{(opp.redditMentions / 1000).toFixed(1)}k mentions</span>
              </div>
              <div className="metric">
                <span className="metric-label">Sentiment</span>
                <span className="metric-value">{opp.sentimentScore}/10</span>
              </div>
              <div className="metric">
                <span className="metric-label">Options Flow</span>
                <span className="metric-value">{opp.optionsActivity}</span>
              </div>
              <div className="metric">
                <span className="metric-label">Short Interest</span>
                <span className="metric-value">{opp.shortInterest}%</span>
              </div>
            </div>

            {selectedStock === opp.ticker && (
              <div className="expanded-details">
                <div className="thesis-section">
                  <h4>Investment Thesis</h4>
                  <p>{opp.thesis}</p>
                </div>

                <div className="catalysts-section">
                  <h4>Key Catalysts</h4>
                  <ul>
                    {opp.catalysts.map((catalyst, idx) => (
                      <li key={idx}>{catalyst}</li>
                    ))}
                  </ul>
                </div>

                <div className="technicals-section">
                  <h4>Technical Analysis</h4>
                  <div className="tech-grid">
                    <div><strong>RSI:</strong> {opp.technicals.rsi}</div>
                    <div><strong>MACD:</strong> {opp.technicals.macd}</div>
                    <div><strong>Support:</strong> ${opp.technicals.support}</div>
                    <div><strong>Resistance:</strong> ${opp.technicals.resistance}</div>
                  </div>
                </div>

                <div className="risk-section">
                  <span className={`risk-badge risk-${opp.risk.toLowerCase().replace('-', '')}`}>
                    Risk: {opp.risk}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="disclaimer-box">
        <strong>⚠️ DISCLAIMER:</strong> This analysis is for educational purposes only and should not be considered financial advice. 
        Reddit sentiment and social media trends are highly volatile and speculative. Always do your own research and never invest more than you can afford to lose.
      </div>

      <Footer />
    </div>
  );
}

export default MoonshotPage;
