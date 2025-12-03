import { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import { fetchStockData, getYahooParams } from '../services/yahooFinance';
import { generateMockData } from '../utils/mockData';
import './Dashboard.css';

function Dashboard({ symbol, timeframe, chartType, indicators }) {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);
  const [stockInfo, setStockInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLiveData, setIsLiveData] = useState(false);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Create chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: '#1e1e2e' },
        textColor: '#e0e0e0',
      },
      grid: {
        vertLines: { color: '#2a2a3e' },
        horzLines: { color: '#2a2a3e' },
      },
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    chartRef.current = chart;

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;

    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Remove old series
        if (seriesRef.current) {
          chartRef.current.removeSeries(seriesRef.current);
        }

        // Fetch real data from Yahoo Finance
        const yahooParams = getYahooParams(timeframe);
        const data = await fetchStockData(symbol, yahooParams.range, yahooParams.interval);
        
        setStockInfo(data.info);
        setIsLiveData(true);

        // Create appropriate series based on chart type
        let series;
        if (chartType === 'candlestick') {
          series = chartRef.current.addCandlestickSeries({
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderVisible: false,
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350',
          });
          series.setData(data.candles);
        } else if (chartType === 'line') {
          series = chartRef.current.addLineSeries({
            color: '#667eea',
            lineWidth: 2,
          });
          series.setData(data.line);
        } else if (chartType === 'area') {
          series = chartRef.current.addAreaSeries({
            topColor: 'rgba(102, 126, 234, 0.4)',
            bottomColor: 'rgba(102, 126, 234, 0.0)',
            lineColor: '#667eea',
            lineWidth: 2,
          });
          series.setData(data.line);
        }

        seriesRef.current = series;

        // Add volume if enabled
        if (indicators.volume && data.volume.length > 0) {
          const volumeSeries = chartRef.current.addHistogramSeries({
            color: '#26a69a',
            priceFormat: {
              type: 'volume',
            },
            priceScaleId: '',
          });
          volumeSeries.priceScale().applyOptions({
            scaleMargins: {
              top: 0.8,
              bottom: 0,
            },
          });
          volumeSeries.setData(data.volume);
        }

        chartRef.current.timeScale().fitContent();
        setLoading(false);
      } catch (err) {
        console.error('Failed to load stock data:', err);
        setError('Unable to fetch live data. Showing simulated data.');
        setIsLiveData(false);
        
        // Fallback to mock data
        const data = generateMockData(symbol, timeframe);
        setStockInfo(data.info);

        let series;
        if (chartType === 'candlestick') {
          series = chartRef.current.addCandlestickSeries({
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderVisible: false,
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350',
          });
          series.setData(data.candles);
        } else if (chartType === 'line') {
          series = chartRef.current.addLineSeries({
            color: '#667eea',
            lineWidth: 2,
          });
          series.setData(data.line);
        } else if (chartType === 'area') {
          series = chartRef.current.addAreaSeries({
            topColor: 'rgba(102, 126, 234, 0.4)',
            bottomColor: 'rgba(102, 126, 234, 0.0)',
            lineColor: '#667eea',
            lineWidth: 2,
          });
          series.setData(data.line);
        }

        seriesRef.current = series;

        if (indicators.volume) {
          const volumeSeries = chartRef.current.addHistogramSeries({
            color: '#26a69a',
            priceFormat: {
              type: 'volume',
            },
            priceScaleId: '',
          });
          volumeSeries.priceScale().applyOptions({
            scaleMargins: {
              top: 0.8,
              bottom: 0,
            },
          });
          volumeSeries.setData(data.volume);
        }

        chartRef.current.timeScale().fitContent();
        setLoading(false);
      }
    };

    loadData();
  }, [symbol, timeframe, chartType, indicators]);

  return (
    <main className="dashboard">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Loading market data...</p>
        </div>
      )}
      
      {error && (
        <div className="error-banner">
          {error}
        </div>
      )}
      
      {stockInfo && (
        <div className="stock-header">
          <div className="stock-title">
            <h2>
              {symbol}
              {isLiveData && <span className="live-badge">● LIVE</span>}
            </h2>
            <span className="stock-name">{stockInfo.name}</span>
          </div>
          <div className="stock-price">
            <span className="price">${stockInfo.price.toFixed(2)}</span>
            <span className={`change ${stockInfo.change >= 0 ? 'positive' : 'negative'}`}>
              {stockInfo.change >= 0 ? '+' : ''}{stockInfo.change.toFixed(2)} 
              ({stockInfo.changePercent >= 0 ? '+' : ''}{stockInfo.changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
      )}
      <div ref={chartContainerRef} className="chart-container" />
    </main>
  );
}

export default Dashboard;
