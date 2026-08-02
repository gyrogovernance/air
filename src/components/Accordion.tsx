import { useEffect, useId, useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

type AccordionProps = {
  id: string;
  title: ReactNode;
  subtitle?: ReactNode;
  defaultOpen?: boolean;
  children: ReactNode;
};

/** Independent disclosure panel. Opens when URL hash matches `id`. */
export default function Accordion({
  id,
  title,
  subtitle,
  defaultOpen = false,
  children,
}: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (hash === id) {
        setOpen(true);
        requestAnimationFrame(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }
    };

    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, [id]);

  return (
    <div
      id={id}
      className="rounded-xl border border-emerald-400/20 bg-white/40 dark:bg-black/20 scroll-mt-28"
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left sm:px-5"
      >
        <span className="min-w-0 flex-1">
          <span className="block text-base font-extrabold tracking-tight text-gray-900 dark:text-gray-50 sm:text-lg">
            {title}
          </span>
          {subtitle ? (
            <span className="mt-1 block text-sm leading-snug text-gray-600 dark:text-gray-300">
              {subtitle}
            </span>
          ) : null}
        </span>
        <span
          aria-hidden="true"
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-700 transition-transform dark:bg-emerald-400/10 dark:text-emerald-400 ${
            open ? 'rotate-180' : ''
          }`}
        >
          <ChevronDown className="h-5 w-5" strokeWidth={2.25} />
        </span>
      </button>

      {open ? (
        <div
          id={panelId}
          className="border-t border-emerald-400/15 px-4 pb-4 pt-3 sm:px-5 sm:pb-5"
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
