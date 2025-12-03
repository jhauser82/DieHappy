import './AboutPage.css';
import Footer from './Footer';

function AboutPage() {
  return (
    <div className="about-page">
      <div className="hero-section">
        <h1 className="hero-title">Power to the People</h1>
        <p className="hero-subtitle">
          Die Happy exists to democratize wealth-building by giving everyday people the same tools, data, and opportunities that Wall Street insiders have hoarded for decades. We provide free access to real-time market data, AI-powered opportunity analysis, congressional trading insights, and market sentiment indicators. No paywalls. No gatekeepers. No bullshit. The system is designed to keep you poor. We're here to help you beat it. Take Control. Every day you wait is another day the wealthy get wealthier while you fall further behind. The tools are here. The data is free. The opportunity is now. Start building wealth. Die happy.
        </p>
      </div>

      <section className="manifesto-section">
        <div className="stat-highlight">
          <h2>The Reality</h2>
          <div className="stats-grid">
            <div className="stat-box">
              <span className="stat-number">1%</span>
              <p>The wealthiest 1% own more wealth than the bottom 90% combined</p>
            </div>
            <div className="stat-box">
              <span className="stat-number">$50T</span>
              <p>Wealth transferred from the bottom 90% to the top 1% over the past 40 years</p>
            </div>
            <div className="stat-box">
              <span className="stat-number">10x</span>
              <p>The wealth gap has grown 10-fold since 1980, while wages stagnated</p>
            </div>
          </div>
        </div>

        <div className="charts-section">
          <div className="chart-item">
            <h2>Billionaire Wealth Explosion (2020-2024)</h2>
            <div className="tableau-container">
              <iframe 
                src="https://public.tableau.com/views/barbelltop12billionairewealthgain20202024/Dashboard1?:embed=y&:display_count=yes&:showVizHome=no"
                width="100%"
                height="600"
                frameBorder="0"
                allowFullScreen
                title="Billionaire Wealth Gains 2020-2024"
              />
            </div>
            <p className="chart-caption">
              While millions struggled during the pandemic, the world's richest individuals saw their wealth skyrocket.
            </p>
          </div>

          <div className="chart-item">
            <h2>The Racial Wealth Divide</h2>
            <div className="tableau-container">
              <iframe 
                src="https://public.tableau.com/views/TheRacialWealthDivideHasGrownOverThreeDecades/Dashboard1?:embed=y&:display_count=yes&:showVizHome=no"
                width="100%"
                height="600"
                frameBorder="0"
                allowFullScreen
                title="The Racial Wealth Divide"
              />
            </div>
            <p className="chart-caption">
              Systemic inequality has created massive wealth gaps across racial lines over three decades.
            </p>
          </div>
        </div>

        <p className="fight-message">This is why we fight.</p>

      </section>

      <Footer />
    </div>
  );
}

export default AboutPage;
