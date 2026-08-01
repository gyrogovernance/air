import { Link, NavLink } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import MobileMenu from './MobileMenu';

const navLinks = [
  { to: '/', label: 'Home', emoji: '🏠' },
  { to: '/about', label: 'About', emoji: 'ℹ️' },
  { to: '/infrastructure', label: 'Infrastructure', emoji: '🧭' },
  { to: '/craft', label: 'Craft', emoji: '🛠️' },
  { to: '/superintelligence', label: 'Superintelligence', emoji: '✨' },
];

export default function Navbar() {
  return (
    <header className="glass-nav-shell w-full max-w-4xl mx-auto px-4 sm:px-6" role="banner">
      <div className="glass-nav">
        <div className="w-full px-4 sm:px-5">
          <div className="flex justify-between items-center h-16">
            <Link
              to="/"
              className="flex items-center gap-2.5 focus:outline-none rounded-full hover:opacity-80 transition-opacity"
              aria-label="AIR - Home"
            >
              <div className="w-9 h-9 bg-emerald-600 dark:bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-sm">
                <Leaf className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                AIR
              </span>
            </Link>

            <div className="flex items-center gap-3 sm:gap-5">
              <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="Main navigation">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>

              <ThemeToggle />

              <Link
                to="/superintelligence"
                className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-bold rounded-full bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 hover:brightness-110 text-white shadow-lg transition-all"
              >
                Join us
              </Link>

              <MobileMenu links={navLinks} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
