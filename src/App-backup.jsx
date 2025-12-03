import { useState } from 'react';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import FearGreedDashboard from './components/FearGreedDashboard';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('stocks');
  const [selectedSymbol, setSelectedSymbol] = useState('AAPL');
  const [timeframe, setTimeframe] = useState('1D');
  const [chartType, setChartType] = useState('candlestick');
  const [indicators, setIndicators] = useState({
    sma: false,
    ema: false,
    volume: true,
  });

  const toggleIndicator = (indicator) => {
    setIndicators(prev => ({
      ...prev,
      [indicator]: !prev[indicator]
    }));
  };

  return (
    <div className="app">
      <header>
        <div className="header-content">
          <div>
            <h1>Die Happy 💰</h1>
            <p>Smart investing made simple</p>
          </div>
          <nav className="header-nav">
            <button 
              className={`nav-btn ${currentView === 'stocks' ? 'active' : ''}`}
              onClick={() => setCurrentView('stocks')}
            >
              Stocks
            </button>
            <button 
              className={`nav-btn ${currentView === 'sentiment' ? 'active' : ''}`}
              onClick={() => setCurrentView('sentiment')}
            >
              Market Sentiment
            </button>
          </nav>
        </div>
      </header>

      <div className="main-container">
        {currentView === 'stocks' ? (
          <>
            <Sidebar
              selectedSymbol={selectedSymbol}
              setSelectedSymbol={setSelectedSymbol}
              timeframe={timeframe}
              setTimeframe={setTimeframe}
              chartType={chartType}
              setChartType={setChartType}
              indicators={indicators}
              toggleIndicator={toggleIndicator}
            />
            
            <Dashboard
              symbol={selectedSymbol}
              timeframe={timeframe}
              chartType={chartType}
              indicators={indicators}
            />
          </>
        ) : (
          <FearGreedDashboard />
        )}
      </div>
    </div>
  );
}

export default App;
