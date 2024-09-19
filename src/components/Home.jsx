import React from 'react';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Header Section */}
      

      {/* Hero Section */}
      <section className="hero">
      <div className="hero-content">
        <h1>Farming Innovation at Your Fingertips</h1>
        <p>Empowering farmers with modern tools and technology</p>
        <button className="hero-btn">Explore Now</button>
      </div>
    </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <h2>Our Features</h2>
        <div className="features">
          <div className="feature">
            <h3>Feature 1</h3>
            <p>Advanced farming tools for crop management.</p>
          </div>
          <div className="feature">
            <h3>Feature 2</h3>
            <p>Local equipment sharing and renting.</p>
          </div>
          <div className="feature">
            <h3>Feature 3</h3>
            <p>Real-time weather forecasting and market pricing.</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          <p>© 2024 Krishi Sadhan. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
