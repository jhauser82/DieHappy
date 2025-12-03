import { useEffect, useState } from 'react';
import { fetchMultipleQuotes } from '../services/yahooFinance';
import './Sidebar.css';

const majorIndices = [
  { symbol: '^GSPC', name: 'S&P 500' },
  { symbol: '^DJI', name: 'Dow Jones' },
  { symbol: '^IXIC', name: 'NASDAQ' },
  { symbol: '^RUT', name: 'Russell 2000' },
  { symbol: '^VIX', name: 'VIX (Volatility)' },
  { symbol: 'GC=F', name: 'Gold' },
  { symbol: 'CL=F', name: 'Crude Oil' },
  { symbol: 'BTC-USD', name: 'Bitcoin' },
];

const timeframes = ['1D', '5D', '1M', '3M', '6M', '1Y', '5Y'];
const chartTypes = [
  { value: 'candlestick', label: 'Candlestick' },
  { value: 'line', label: 'Line' },
  { value: 'area', label: 'Area' },
];

function Sidebar({ 
  selectedSymbol, 
  setSelectedSymbol, 
  timeframe, 
  setTimeframe,
  chartType,
  setChartType,
  indicators,
  toggleIndicator 
}) {
  const [marketData, setMarketData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMarketData = async () => {
      try {
        const symbols = majorIndices.map(idx => idx.symbol);
        const quotes = await fetchMultipleQuotes(symbols);
        setMarketData(quotes);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load market data:', error);
        // Use mock data as fallback
        const mockData = {};
        majorIndices.forEach(idx => {
          const basePrice = Math.random() * 1000 + 100;
          const change = (Math.random() - 0.5) * 50;
          mockData[idx.symbol] = {
            price: basePrice,
            change: change,
            changePercent: (change / basePrice) * 100,
          };
        });
        setMarketData(mockData);
        setLoading(false);
      }
    };

    loadMarketData();
    // Refresh every 60 seconds
    const interval = setInterval(loadMarketData, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="sidebar">
      <section className="sidebar-section">
        <h3>Market Summary</h3>
        <div className="market-list">
          {loading ? (
            <div className="loading-text">Loading...</div>
          ) : (
            majorIndices.map(index => {
              const data = marketData[index.symbol] || {};
              const isPositive = (data.change || 0) >= 0;
              
              return (
                <button
                  key={index.symbol}
                  className={`market-item ${selectedSymbol === index.symbol ? 'active' : ''}`}
                  onClick={() => setSelectedSymbol(index.symbol)}
                >
                  <div className="market-header">
                    <span className="symbol">{index.name}</span>
                    <span className={`change ${isPositive ? 'positive' : 'negative'}`}>
                      {isPositive ? '+' : ''}{data.changePercent?.toFixed(2) || '0.00'}%
                    </span>
                  </div>
                  <div className="market-details">
                    <span className="price">{data.price?.toFixed(2) || '---'}</span>
                    <span className={`change-value ${isPositive ? 'positive' : 'negative'}`}>
                      {isPositive ? '+' : ''}{data.change?.toFixed(2) || '0.00'}
                    </span>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </section>

      <section className="sidebar-section">
        <h3>Timeframe</h3>
        <div className="timeframe-buttons">
          {timeframes.map(tf => (
            <button
              key={tf}
              className={`timeframe-btn ${timeframe === tf ? 'active' : ''}`}
              onClick={() => setTimeframe(tf)}
            >
              {tf}
            </button>
          ))}
        </div>
      </section>

      <section className="sidebar-section">
        <h3>Chart Type</h3>
        <div className="chart-type-buttons">
          {chartTypes.map(type => (
            <button
              key={type.value}
              className={`chart-type-btn ${chartType === type.value ? 'active' : ''}`}
              onClick={() => setChartType(type.value)}
            >
              {type.label}
            </button>
          ))}
        </div>
      </section>

      <section className="sidebar-section">
        <h3>Indicators</h3>
        <div className="indicators">
          <label className="indicator-item">
            <input
              type="checkbox"
              checked={indicators.sma}
              onChange={() => toggleIndicator('sma')}
            />
            <span>SMA (20)</span>
          </label>
          <label className="indicator-item">
            <input
              type="checkbox"
              checked={indicators.ema}
              onChange={() => toggleIndicator('ema')}
            />
            <span>EMA (12)</span>
          </label>
          <label className="indicator-item">
            <input
              type="checkbox"
              checked={indicators.volume}
              onChange={() => toggleIndicator('volume')}
            />
            <span>Volume</span>
          </label>
        </div>
      </section>
    </aside>
  );
}

export default Sidebar;
