// Mock market news data
// In production, integrate with APIs like:
// - Alpha Vantage News API
// - Finnhub News API
// - NewsAPI.org
// - Benzinga News API

export async function fetchMarketNews() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const mockNews = [
    {
      title: "China Announces Major Economic Stimulus Package",
      summary: "Chinese government unveiled a $1.4 trillion stimulus plan targeting infrastructure and technology sectors. Markets rally on hopes of global economic boost and increased demand for commodities.",
      source: "South China Morning Post",
      timeAgo: "3 days ago",
      impact: "positive",
      tickers: ["FXI", "BABA", "JD", "KWEB"],
      image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=400&fit=crop"
    },
    {
      title: "Quantum Computing Breakthrough Sends Tech Stocks Soaring",
      summary: "IBM and Google announce major quantum computing advances that could revolutionize drug discovery and AI. Tech sector sees broad gains as investors bet on the quantum future.",
      source: "MIT Technology Review",
      timeAgo: "3 days ago",
      impact: "positive",
      tickers: ["IBM", "GOOGL", "IONQ", "RGTI"],
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=400&fit=crop"
    },
    {
      title: "Federal Reserve Signals Potential Rate Cut in Q2 2025",
      summary: "Fed Chair Jerome Powell indicated that inflation has cooled sufficiently to consider rate cuts, potentially boosting equity markets. Investors are pricing in a 75% probability of a 25 basis point cut.",
      source: "Reuters",
      timeAgo: "2 hours ago",
      impact: "positive",
      tickers: ["SPY", "QQQ", "DIA"],
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop",
      url: "https://www.reuters.com/markets/"
    },
    {
      title: "Tech Giants Report Strong Q4 Earnings, Beat Expectations",
      summary: "Major technology companies including Apple, Microsoft, and Google parent Alphabet reported earnings that exceeded analyst expectations, driven by AI investments and cloud computing growth.",
      source: "CNBC",
      timeAgo: "4 hours ago",
      impact: "positive",
      tickers: ["AAPL", "MSFT", "GOOGL"],
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=400&fit=crop"
    },
    {
      title: "Oil Prices Surge 8% on Middle East Supply Concerns",
      summary: "Crude oil futures jumped to $85 per barrel amid geopolitical tensions affecting major shipping routes. Energy sector stocks rallied in response to the supply disruption fears.",
      source: "Bloomberg",
      timeAgo: "5 hours ago",
      impact: "negative",
      tickers: ["XLE", "USO", "CL=F"],
      image: "https://images.unsplash.com/photo-1545262810-77515befe149?w=800&h=400&fit=crop"
    },
    {
      title: "Bitcoin Breaks $70,000 as Institutional Adoption Accelerates",
      summary: "Cryptocurrency markets rallied as major financial institutions announced expanded crypto trading services. Bitcoin ETFs saw record inflows of $2.1 billion this week.",
      source: "CoinDesk",
      timeAgo: "6 hours ago",
      impact: "positive",
      tickers: ["BTC-USD", "COIN", "MSTR"],
      image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&h=400&fit=crop"
    },
    {
      title: "Manufacturing Data Shows Unexpected Contraction",
      summary: "ISM Manufacturing Index fell to 47.2, below the 50 threshold indicating contraction. The decline raises concerns about economic growth and potential recession risks.",
      source: "MarketWatch",
      timeAgo: "8 hours ago",
      impact: "negative",
      tickers: ["SPY", "IWM", "XLI"],
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop"
    },
    {
      title: "AI Chip Demand Drives NVIDIA to New All-Time High",
      summary: "NVIDIA shares surged 12% after announcing a $50 billion AI chip deal with major cloud providers. The company's data center revenue is projected to double year-over-year.",
      source: "The Wall Street Journal",
      timeAgo: "1 day ago",
      impact: "positive",
      tickers: ["NVDA", "AMD", "SMCI"],
      image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&h=400&fit=crop"
    },
    {
      title: "Housing Market Cools as Mortgage Rates Rise to 7.5%",
      summary: "Existing home sales dropped 8% month-over-month as higher mortgage rates dampen buyer demand. Real estate and homebuilder stocks declined in afternoon trading.",
      source: "Financial Times",
      timeAgo: "1 day ago",
      impact: "negative",
      tickers: ["XHB", "ITB", "DHI"],
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop"
    },
    {
      title: "Electric Vehicle Sales Exceed Expectations in Q4",
      summary: "Global EV sales grew 35% year-over-year, led by strong demand in China and Europe. Tesla, Rivian, and traditional automakers all reported increased deliveries.",
      source: "Automotive News",
      timeAgo: "1 day ago",
      impact: "positive",
      tickers: ["TSLA", "RIVN", "F", "GM"],
      image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=400&fit=crop"
    },
    {
      title: "Dollar Weakens Against Major Currencies on Rate Cut Speculation",
      summary: "The U.S. Dollar Index fell 1.2% as traders anticipate Fed rate cuts. A weaker dollar could benefit multinational corporations and emerging market assets.",
      source: "Forex.com",
      timeAgo: "2 days ago",
      impact: "neutral",
      tickers: ["DXY", "UUP", "EEM"],
      image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=400&fit=crop"
    },
    {
      title: "Retail Sales Beat Forecasts, Consumer Spending Remains Strong",
      summary: "December retail sales rose 0.8%, exceeding economist predictions of 0.4% growth. The data suggests consumer resilience despite higher interest rates and inflation concerns.",
      source: "Commerce Department",
      timeAgo: "2 days ago",
      impact: "positive",
      tickers: ["XRT", "AMZN", "WMT", "TGT"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop"
    }
  ];

  return mockNews;
}
