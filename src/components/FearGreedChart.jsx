import { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import './FearGreedChart.css';

function FearGreedChart({ history }) {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: '#ffffff' },
        textColor: '#333',
      },
      grid: {
        vertLines: { color: '#f0f0f0' },
        horzLines: { color: '#f0f0f0' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
      rightPriceScale: {
        scaleMargins: {
          top: 0.1,
          bottom: 0.1,
        },
      },
    });

    chartRef.current = chart;

    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
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
    if (!chartRef.current || !history) return;

    // Create area series
    const areaSeries = chartRef.current.addAreaSeries({
      topColor: 'rgba(102, 126, 234, 0.4)',
      bottomColor: 'rgba(102, 126, 234, 0.0)',
      lineColor: '#667eea',
      lineWidth: 2,
    });

    // Transform history data
    const data = history.map(item => ({
      time: item.timestamp,
      value: item.value,
    }));

    areaSeries.setData(data);

    // Add reference lines
    const extremeFearLine = chartRef.current.addLineSeries({
      color: '#d32f2f',
      lineWidth: 1,
      lineStyle: 2,
      priceLineVisible: false,
    });
    extremeFearLine.setData([
      { time: history[0].timestamp, value: 25 },
      { time: history[history.length - 1].timestamp, value: 25 },
    ]);

    const extremeGreedLine = chartRef.current.addLineSeries({
      color: '#388e3c',
      lineWidth: 1,
      lineStyle: 2,
      priceLineVisible: false,
    });
    extremeGreedLine.setData([
      { time: history[0].timestamp, value: 75 },
      { time: history[history.length - 1].timestamp, value: 75 },
    ]);

    chartRef.current.timeScale().fitContent();
  }, [history]);

  return (
    <div className="fear-greed-chart">
      <h3>Historical Trend (30 Days)</h3>
      <div ref={chartContainerRef} className="chart-container"></div>
    </div>
  );
}

export default FearGreedChart;
