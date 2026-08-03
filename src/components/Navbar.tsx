import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import MobileMenu from './MobileMenu';
import AirLogo from './AirLogo';
import { isNavItemActive, navLinks, type NavItem } from '../lib/nav';

function DesktopNavItem({ item }: { item: NavItem }) {
  const location = useLocation();
  const hasChildren = Boolean(item.children?.length);
  const active = isNavItemActive(item, location.pathname);

  if (!hasChildren) {
    return (
      <NavLink
        to={item.to}
        end={item.to === '/'}
        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
      >
        {item.label}
      </NavLink>
    );
  }

  return (
    <div className="nav-dropdown relative">
      <NavLink
        to={item.to}
        className={`nav-link inline-flex items-center gap-1 ${active ? 'active' : ''}`}
        aria-haspopup="menu"
      >
        {item.label}
        <ChevronDown className="w-3.5 h-3.5 opacity-70" aria-hidden="true" />
      </NavLink>

      <div className="nav-dropdown-panel" role="menu" aria-label={`${item.label} submenu`}>
        {item.children!.map((child) => (
          <NavLink
            key={child.to}
            to={child.to}
            role="menuitem"
            className={({ isActive }) => `nav-dropdown-link ${isActive ? 'active' : ''}`}
          >
            {child.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

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
              <AirLogo size={36} className="shrink-0" />
              <span className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                AIR
              </span>
            </Link>

            <div className="flex items-center gap-3 sm:gap-5">
              <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="Main navigation">
                {navLinks.map((link) => (
                  <DesktopNavItem key={link.to} item={link} />
                ))}
              </nav>

              <ThemeToggle />

              <Link
                to="/superintelligence"
                className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-bold rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 hover:brightness-110 text-white shadow-lg transition-all"
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
