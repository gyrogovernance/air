import type { CSSProperties, ReactNode } from 'react';

type GlassTint = 'blue' | 'green' | 'teal' | 'cyan' | 'purple' | 'orange' | 'none';

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  tint?: GlassTint;
  translucent?: boolean;
  style?: CSSProperties;
};

/** Outer section shell with tinted glass and large radius. Put GlassInner blocks inside. */
export default function GlassCard({
  children,
  className = '',
  tint = 'none',
  translucent = false,
  style,
}: GlassCardProps) {
  const tintClass = tint === 'none' ? '' : `glass-card-${tint}`;
  const translucentClass = translucent ? 'glass-card-translucent' : '';

  return (
    <div
      className={`glass-card rounded-[2rem] ${tintClass} ${translucentClass} ${className}`.trim()}
      style={style}
    >
      {children}
    </div>
  );
}

type GlassInnerProps = {
  children: ReactNode;
  className?: string;
};

/** Inner content block with no glass blur, lower radius, and opacity suited to readable text. */
export function GlassInner({ children, className = '' }: GlassInnerProps) {
  return (
    <div className={`glass-card-inner rounded-xl ${className}`.trim()}>
      {children}
    </div>
  );
}
