import './Footer.css';

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Die Happy 💰</h4>
          <p>
            Empowering everyday investors with professional-grade tools and insights. 
            Control your own Destiny.
          </p>
        </div>
        <div className="footer-section">
          <h4>Legal</h4>
          <p className="footer-disclaimer">
            © 2024 Die Happy. Not financial advice. Invest at your own risk.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
