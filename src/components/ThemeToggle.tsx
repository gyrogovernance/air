import React, { useEffect, useState } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';

type Theme = 'light' | 'dark' | 'system';

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('system');

  // Initialize theme from localStorage or system
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme && savedTheme !== 'system') {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      setTheme('system');
      applyTheme(systemPrefersDark ? 'dark' : 'light');
    }

    // Listen to system changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem('theme') === null || localStorage.getItem('theme') === 'system') {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const applyTheme = (mode: 'light' | 'dark') => {
    const root = document.documentElement;
    if (mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  const setAndApplyTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    
    if (newTheme === 'system') {
      localStorage.removeItem('theme');
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(systemPrefersDark ? 'dark' : 'light');
    } else {
      localStorage.setItem('theme', newTheme);
      applyTheme(newTheme as 'light' | 'dark');
    }
  };

  return (
    <div className="theme-toggle">
      <button
        onClick={() => setAndApplyTheme('light')}
        className={`theme-btn ${theme === 'light' ? 'active' : 'text-gray-500 dark:text-gray-400'}`}
        title="Light mode"
        aria-label="Light mode"
      >
        <Sun size={14} />
      </button>
      <button
        onClick={() => setAndApplyTheme('dark')}
        className={`theme-btn ${theme === 'dark' ? 'active' : 'text-gray-500 dark:text-gray-400'}`}
        title="Dark mode"
        aria-label="Dark mode"
      >
        <Moon size={14} />
      </button>
      <button
        onClick={() => setAndApplyTheme('system')}
        className={`theme-btn ${theme === 'system' ? 'active' : 'text-gray-500 dark:text-gray-400'}`}
        title="Auto (system)"
        aria-label="Auto (system)"
      >
        <Monitor size={14} />
      </button>
    </div>
  );
};

export default ThemeToggle;
