import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-0 mt-8 border-t border-white/20 dark:border-white/10 bg-gray-950/80 backdrop-blur-xl text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-10 gap-x-8">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-white text-xl font-extrabold tracking-tight">AIR</span>
              <span className="text-emerald-400">🍃</span>
            </div>
            <p className="text-sm max-w-xs leading-relaxed">
              Alignment Infrastructure Routes for Independent Researchers and Engineers, 
              Offices of Community Safety, and AI Labs.
            </p>
            <p className="mt-4 text-xs text-gray-500">
              By{' '}
              <a
                href="http://gyrogovernance.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors"
              >
                Gyro Governance Lab
              </a>
              {' '}• 2026 • CC BY-SA 4.0
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-3">
            <div className="text-xs font-semibold tracking-widest text-gray-500 mb-4">EXPLORE</div>
            <div className="flex flex-col gap-y-2 text-sm">
              <Link to="/about" className="hover:text-gray-200 transition-colors">About AIR</Link>
              <Link to="/infrastructure" className="hover:text-gray-200 transition-colors">AI safety infrastructure</Link>
              <Link to="/craft" className="hover:text-gray-200 transition-colors">AIR-Craft tools &amp; datasets</Link>
              <Link to="/superintelligence" className="hover:text-gray-200 transition-colors">Collective Superintelligence Fellowship</Link>
            </div>
          </div>

          <div className="md:col-span-4">
            <div className="text-xs font-semibold tracking-widest text-gray-500 mb-4">LEGAL</div>
            <div className="flex flex-col gap-y-2 text-sm">
              <Link to="/privacy" className="hover:text-gray-200 transition-colors">Privacy Policy</Link>
              <Link to="/cookies" className="hover:text-gray-200 transition-colors">Cookie Policy</Link>
              <a href="https://gyrogovernance.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition-colors">
                Gyro Governance Lab
              </a>
            </div>

            <div className="mt-6 text-xs">
              <p>Aligned on Uniform Power Distribution</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
