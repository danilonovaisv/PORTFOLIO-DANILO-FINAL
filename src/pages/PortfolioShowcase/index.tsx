import React from 'react';
import './PortfolioShowcase.less';

const PortfolioShowcase: React.FC = () => {
  return (
    <div className="portfolio-showcase">
      {/* 其他内容如背景图、3D模型等 */}
      <div className="hero-content">
        <div className="hero-text">
          <span className="portfolio-title">portfólio</span>
          <span className="showcase-title">showcase</span>
        </div>
        <button className="cta-button">
          vamos trabalhar juntos
        </button>
      </div>
    </div>
  );
};

export default PortfolioShowcase;