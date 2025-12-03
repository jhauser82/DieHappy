# Die Happy 💰

An interactive financial charting platform designed for people with little or no finance background. Empowering everyday people to take control of their finances and learn how to invest in ways that fit their lifestyle.

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Features

- TradingView-style interactive stock charts
- Multiple chart types (Candlestick, Line, Area)
- Customizable timeframes (1D to 5Y)
- Technical indicators (SMA, EMA, Volume)
- Real-time price updates
- Popular stocks watchlist
- Clean, intuitive interface

## Tech Stack

- React + Vite
- Lightweight Charts (TradingView library)
- Modern CSS with responsive design

## Data Source

Uses real-time market data from Yahoo Finance API. The app fetches live stock prices, historical data, and volume information directly from Yahoo Finance's public endpoints.

If Yahoo Finance API is unavailable, the app automatically falls back to mock data to ensure uninterrupted functionality.
