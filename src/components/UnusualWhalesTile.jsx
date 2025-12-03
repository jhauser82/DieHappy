import './UnusualWhalesTile.css';

function UnusualWhalesTile() {
  const etfData = {
    ticker: "NANC",
    name: "Unusual Whales Democratic ETF",
    price: 28.45,
    change: 0.67,
    changePercent: 2.41,
    volume: "1.2M",
    aum: "$45M",
  };

  const topHoldings = [
    { ticker: "NVDA", weight: "8.2%" },
    { ticker: "MSFT", weight: "7.5%" },
    { ticker: "AAPL", weight: "6.8%" },
    { ticker: "GOOGL", weight: "5.9%" },
    { ticker: "AMZN", weight: "5.4%" },
  ];

  return (
    <a 
      href="https://unusualwhales.com/etf/nanc" 
      target="_blank" 
      rel="noopener noreferrer"
      className="whales-tile-link"
    >
      <div className="whales-tile">
        <div className="tile-main">
          <div className="tile-left">
            <div className="tile-title">
              <h3>🐋 {etfData.ticker}</h3>
              <p>{etfData.name}</p>
            </div>
            <div className="tile-price">
              <span className="price">${etfData.price}</span>
              <span className={`change ${etfData.change >= 0 ? 'positive' : 'negative'}`}>
                {etfData.change >= 0 ? '+' : ''}{etfData.changePercent}%
              </span>
            </div>
          </div>

          <div className="tile-stats">
            <div className="stat">
              <span className="label">Volume</span>
              <span className="value">{etfData.volume}</span>
            </div>
            <div className="stat">
              <span className="label">AUM</span>
              <span className="value">{etfData.aum}</span>
            </div>
          </div>

          <div className="tile-holdings">
            <h4>Top 5 Holdings</h4>
            <div className="holdings-inline">
              {topHoldings.map((holding, idx) => (
                <span key={idx} className="holding-chip">
                  {holding.ticker} <strong>{holding.weight}</strong>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

export default UnusualWhalesTile;
