import { useEffect, useRef } from 'react';
import './FearGreedGauge.css';

function FearGreedGauge({ value, rating, timestamp }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 35;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw gauge background arc
    const startAngle = Math.PI;
    const endAngle = 2 * Math.PI;

    // Color segments
    const segments = [
      { start: 0, end: 25, color: '#d32f2f' },    // Extreme Fear
      { start: 25, end: 45, color: '#f57c00' },   // Fear
      { start: 45, end: 55, color: '#fbc02d' },   // Neutral
      { start: 55, end: 75, color: '#7cb342' },   // Greed
      { start: 75, end: 100, color: '#388e3c' },  // Extreme Greed
    ];

    segments.forEach(segment => {
      const segmentStart = startAngle + (segment.start / 100) * Math.PI;
      const segmentEnd = startAngle + (segment.end / 100) * Math.PI;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, segmentStart, segmentEnd);
      ctx.lineWidth = 10;
      ctx.strokeStyle = segment.color;
      ctx.stroke();
    });

    // Draw needle
    const needleAngle = startAngle + (value / 100) * Math.PI;
    const needleLength = radius - 15;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
      centerX + needleLength * Math.cos(needleAngle),
      centerY + needleLength * Math.sin(needleAngle)
    );
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 4, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

  }, [value]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fear-greed-gauge">
      <div className="indicator-header">
        <h4>Fear & Greed</h4>
        <span className="indicator-info">Market Sentiment</span>
      </div>
      <div className="indicator-value" style={{ 
        color: value <= 25 ? '#d32f2f' : 
               value <= 45 ? '#f57c00' : 
               value <= 55 ? '#fbc02d' : 
               value <= 75 ? '#7cb342' : '#388e3c' 
      }}>
        {value}
      </div>
      <div className="indicator-label">{rating}</div>
      <canvas ref={canvasRef} width="100" height="50"></canvas>
    </div>
  );
}

export default FearGreedGauge;
