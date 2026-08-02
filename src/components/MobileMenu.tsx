import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import GlassCard from './GlassCard';
import type { NavItem } from '../lib/nav';

type MobileMenuProps = {
  links: NavItem[];
};

/**
 * Mobile nav panel. Scroll locking only toggles overflow and never writes scroll
 * position, so React Router's <ScrollRestoration /> owns page scroll.
 */
export default function MobileMenu({ links }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = overflow;
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  const renderLink = (link: NavItem, nested = false) => (
    <NavLink
      key={link.to}
      to={link.to}
      end={link.to === '/'}
      onClick={closeMenu}
      className={({ isActive }) =>
        `px-6 py-3 text-base font-bold transition-all duration-200 ${
          nested ? 'pl-12 text-[0.95rem]' : ''
        } ${
          isActive
            ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-500/10'
            : 'text-gray-800 dark:text-gray-100 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-500/10'
        }`
      }
    >
      <div className="flex items-center">
        <span className={`${nested ? 'mr-2.5 text-lg' : 'mr-3 text-xl'}`}>{link.emoji}</span>
        <span>{link.label}</span>
      </div>
    </NavLink>
  );

  const menuContent = (
    <>
      {isOpen ? (
        <div
          className="fixed inset-0 z-[1100] md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      ) : null}

      <div
        className={`fixed top-20 inset-x-0 px-4 z-[1101] md:hidden transition-all duration-300 ease-in-out transform ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
        <GlassCard className="p-1 w-full" translucent>
          <nav className="flex flex-col py-4" role="navigation" aria-label="Mobile navigation">
            {links.map((link) => (
              <div key={link.to}>
                {renderLink(link)}
                {link.children?.map((child) => renderLink(child, true))}
              </div>
            ))}

            <div className="my-2 mx-6 border-t border-black/10 dark:border-white/15" />

            <Link
              to="/superintelligence"
              onClick={closeMenu}
              className="inline-flex items-center justify-center mx-6 my-2 px-6 py-3 text-base font-bold btn-primary"
            >
              Join us
            </Link>
          </nav>
        </GlassCard>
      </div>
    </>
  );

  return (
    <>
      <button
        className="md:hidden text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors relative z-[1020]"
        aria-label="Toggle mobile menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {mounted ? createPortal(menuContent, document.body) : null}
    </>
  );
}
