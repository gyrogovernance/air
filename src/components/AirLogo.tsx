type AirLogoProps = {
  className?: string;
  /** Pixel size (square). */
  size?: number;
  /** `icon` → /icons.svg (UI marks); `logo` → /air_logo.svg (hero / brand). */
  variant?: 'icon' | 'logo';
  /** Empty when the wordmark is adjacent (decorative). */
  alt?: string;
};

/** Official AIR mark from `public/` — prefer this over emoji or Lucide leaf. */
export default function AirLogo({
  className,
  size = 36,
  variant = 'icon',
  alt = '',
}: AirLogoProps) {
  const src = variant === 'logo' ? '/air_logo.svg' : '/icons.svg';
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={className}
      decoding="async"
      draggable={false}
    />
  );
}
