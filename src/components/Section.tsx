import type { ReactNode } from 'react';
import GlassCard, { GlassInner } from './GlassCard';

type Tint = 'emerald' | 'green' | 'teal' | 'cyan' | 'blue' | 'purple' | 'orange' | 'none';

/** Consistent page column used by all routes. */
export function Page({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8">
      {children}
    </div>
  );
}

/**
 * Page hero inside a glass shell so title/subtitle stay readable on the blob bg.
 * H1 always uses the brand gradient.
 * `backdrop` fills the card behind content (e.g. Strands) — clipped by the card, under GlassInner.
 */
export function PageHero({
  title,
  subtitle,
  meta,
  belowTitle,
  icon,
  tint = 'emerald',
  backdrop,
  children,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  meta?: ReactNode;
  /** Content directly under the H1 (e.g. mission line), before subtitle. */
  belowTitle?: ReactNode;
  icon?: ReactNode;
  tint?: Tint;
  backdrop?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <GlassCard tint={tint}>
      {backdrop ? (
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
          {backdrop}
        </div>
      ) : null}

      <header className="relative z-10 p-6 sm:p-8 text-center">
        {icon ? (
          <div className="text-4xl sm:text-5xl mb-3 leading-none" aria-hidden="true">
            {icon}
          </div>
        ) : null}

        <h1 className="section-title title-gradient tracking-tight">{title}</h1>

        {meta ? (
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{meta}</p>
        ) : null}

        {belowTitle ? <div className="relative z-10 mt-5">{belowTitle}</div> : null}

        {subtitle ? (
          <div
            className="hero-subtitle relative z-10 mt-5 p-4 sm:p-5 text-left sm:text-center rounded-xl"
            style={{ backgroundColor: 'var(--hero-subtitle-bg)' }}
          >
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-100 leading-relaxed">
              {subtitle}
            </p>
          </div>
        ) : null}

        {children ? <div className="relative z-10 mt-6">{children}</div> : null}
      </header>
    </GlassCard>
  );
}

/**
 * One draft section = one outer glass shell.
 * `icon` gives each section a distinct visual mark (avoid repeating the same emoji).
 */
export function Section({
  tint = 'emerald',
  title,
  icon,
  children,
  actions,
}: {
  tint?: Tint;
  title?: ReactNode;
  icon?: ReactNode;
  children: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <GlassCard tint={tint}>
      <div className="relative z-10 p-5 sm:p-7 md:p-8">
        {icon || title ? (
          <div className="text-center mb-6">
            {icon ? (
              <div className="text-4xl mb-2 leading-none" aria-hidden="true">
                {icon}
              </div>
            ) : null}
            {title ? (
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {title}
              </h2>
            ) : null}
          </div>
        ) : null}

        <div className="space-y-4">{children}</div>

        {actions ? (
          <div className="mt-7 flex flex-wrap justify-center gap-3">{actions}</div>
        ) : null}
      </div>
    </GlassCard>
  );
}

/** Frosted inner content cell — translucent so outer card tint stays visible. */
export function Block({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <GlassInner className={`p-5 sm:p-6 ${className}`.trim()}>{children}</GlassInner>;
}
