import { useEffect, useState } from 'react';
import { fetchMultipleQuotes } from '../services/yahooFinance';
import './StockTicker.css';

function StockTicker() {
  const [stocks, setStocks] = useState([]);
  const tickerSymbols = ['^GSPC', '^DJI', '^IXIC', 'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'NVDA', 'META', 'BTC-USD', 'GC=F'];

  useEffect(() => {
    const loadStocks = async () => {
      try {
        const quotes = await fetchMultipleQuotes(tickerSymbols);
        const stockArray = Object.values(quotes);
        setStocks(stockArray);
      } catch (error) {
        // Fallback to mock data
        const mockStocks = tickerSymbols.map(symbol => ({
          symbol,
          price: Math.random() * 1000 + 100,
          change: (Math.random() - 0.5) * 20,
          changePercent: (Math.random() - 0.5) * 5,
        }));
        setStocks(mockStocks);
      }
    };

    loadStocks();
    const interval = setInterval(loadStocks, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Duplicate stocks for seamless loop
  const displayStocks = [...stocks, ...stocks];

  return (
    <div className="stock-ticker-container">
      <div className="ticker-track">
        {displayStocks.map((stock, index) => (
          <div key={index} className="ticker-item">
            <span className="ticker-symbol">{stock.symbol}</span>
            <span className="ticker-price">${stock.price?.toFixed(2)}</span>
            <span className={`ticker-change ${stock.change >= 0 ? 'positive' : 'negative'}`}>
              {stock.change >= 0 ? '▲' : '▼'} {Math.abs(stock.changePercent)?.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StockTicker;
