import { useEffect, useState } from 'react';
import { fetchMarketNews } from '../services/newsApi';
import StockTicker from './StockTicker';
import Footer from './Footer';
import './NewsPage.css';

function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const articles = await fetchMarketNews();
        setNews(articles);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load news:', error);
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  if (loading) {
    return (
      <div className="news-page">
        <StockTicker />
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading market news...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="news-page">
      <StockTicker />

      <div className="news-grid">
        {news.map((article, index) => (
          <a 
            key={index} 
            href={article.url || '#'} 
            target="_blank" 
            rel="noopener noreferrer"
            className="news-card-link"
          >
            <article className="news-card">
              <div className="news-rank">#{index + 1}</div>
              {article.image && (
                <div className="news-image">
                  <img src={article.image} alt={article.title} />
                </div>
              )}
              <div className="news-content">
                <h3>{article.title}</h3>
                <p className="news-summary">{article.summary}</p>
                <div className="news-meta">
                  <span className="news-source">{article.source}</span>
                  <span className="news-time">{article.timeAgo}</span>
                  <span className={`news-impact ${article.impact}`}>
                    {article.impact === 'positive' ? '📈' : article.impact === 'negative' ? '📉' : '➡️'} 
                    {article.impact}
                  </span>
                </div>
                {article.tickers && article.tickers.length > 0 && (
                  <div className="news-tickers">
                    {article.tickers.map(ticker => (
                      <span key={ticker} className="ticker-tag">{ticker}</span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          </a>
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default NewsPage;
