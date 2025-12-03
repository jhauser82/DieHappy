import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import MarketIndicators from './components/MarketIndicators';
import NewsPage from './components/NewsPage';
import MoonshotPage from './components/MoonshotPage';
import AboutPage from './components/AboutPage';
import UnusualWhalesTile from './components/UnusualWhalesTile';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('about');
  const [darkMode, setDarkMode] = useState(true);
  const [selectedSymbol, setSelectedSymbol] = useState('^GSPC');
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
    <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <header>
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-circle">
              <img 
                src="/monopoly-man.png" 
                alt="Die Happy Logo" 
                className="logo-image"
                onError={(e) => {
                  console.error('Logo failed to load');
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<span style="font-size: 3rem;">💰</span>';
                }}
              />
            </div>
            <div className="brand-info">
              <h1>Die Happy</h1>
              <p>Control your own Destiny</p>
            </div>
          </div>
          <nav className="header-nav">
            <button 
              className={`nav-btn ${currentView === 'stocks' ? 'active' : ''}`}
              onClick={() => setCurrentView('stocks')}
            >
              Markets
            </button>
            <button 
              className={`nav-btn ${currentView === 'news' ? 'active' : ''}`}
              onClick={() => setCurrentView('news')}
            >
              News
            </button>
            <button 
              className={`nav-btn ${currentView === 'moonshot' ? 'active' : ''}`}
              onClick={() => setCurrentView('moonshot')}
            >
              Moonshots
            </button>
            <button 
              className={`nav-btn ${currentView === 'about' ? 'active' : ''}`}
              onClick={() => setCurrentView('about')}
            >
              About
            </button>
          </nav>
        </div>
      </header>

      {currentView === 'stocks' && (
        <>
          <MarketIndicators />
          <div className="whales-section">
            <UnusualWhalesTile />
          </div>
        </>
      )}

      <div className="main-container">
        {currentView === 'stocks' && (
          <div className="main-content-wrapper">
            <div className="chart-wrapper">
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
                darkMode={darkMode}
              />
            </div>
            
            <footer>
              <div className="footer-content">
                <div className="footer-section">
                  <h4>Die Happy 💰</h4>
                  <p>
                    Empowering everyday investors with professional-grade tools and insights. 
                    Smart investing made simple.
                  </p>
                </div>
                <div className="footer-section">
                  <h4>Quick Links</h4>
                  <div className="footer-links">
                    <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('stocks'); }}>Markets</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('moonshot'); }}>Moonshots</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('news'); }}>News</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('about'); }}>About</a>
                  </div>
                </div>
                <div className="footer-section">
                  <h4>Legal</h4>
                  <div className="footer-links">
                    <a href="#">Terms of Service</a>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Disclaimer</a>
                  </div>
                </div>
              </div>
              <div className="footer-bottom">
                <p>© 2024 Die Happy. Not financial advice. Invest at your own risk.</p>
              </div>
            </footer>
          </div>
        )}
        
        {currentView === 'news' && <NewsPage />}
        {currentView === 'moonshot' && <MoonshotPage />}
        {currentView === 'about' && <AboutPage />}
      </div>
    </div>
  );
}

export default App;
