import { useState, type ReactNode } from 'react';

export type TabItem = {
  id: string;
  label: string;
  content: ReactNode;
};

type TabsProps = {
  items: TabItem[];
  label?: string;
};

/** Lightweight in-panel tabs for dense protocol content. */
export default function Tabs({ items, label = 'Sections' }: TabsProps) {
  const [active, setActive] = useState(items[0]?.id ?? '');
  const current = items.find((item) => item.id === active) ?? items[0];

  if (!current) return null;

  return (
    <div>
      <div
        role="tablist"
        aria-label={label}
        className="flex flex-wrap gap-1.5 border-b border-blue-400/20 pb-2"
      >
        {items.map((item) => {
          const selected = item.id === current.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(item.id)}
              className={`rounded-lg px-2.5 py-1.5 text-xs font-bold tracking-wide transition-colors ${
                selected
                  ? 'bg-blue-600 text-white dark:bg-blue-500'
                  : 'text-blue-900 hover:bg-blue-500/10 dark:text-blue-200'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <div role="tabpanel" className="pt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-200">
        {current.content}
      </div>
    </div>
  );
}
