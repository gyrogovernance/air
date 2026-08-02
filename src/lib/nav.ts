export type NavItem = {
  to: string;
  label: string;
  emoji: string;
  children?: NavItem[];
};

export const navLinks: NavItem[] = [
  { to: '/', label: 'Home', emoji: '🏠' },
  { to: '/about', label: 'About', emoji: 'ℹ️' },
  {
    to: '/infrastructure',
    label: 'Infrastructure',
    emoji: '🧭',
    children: [
      { to: '/protocols', label: 'Protocols', emoji: '📜' },
      { to: '/craft', label: 'Craft', emoji: '🛩️' },
      { to: '/superintelligence', label: 'Superintelligence', emoji: '✨' },
    ],
  },
];

/** True when pathname is this item or any of its children. */
export function isNavItemActive(item: NavItem, pathname: string): boolean {
  if (item.to === '/') return pathname === '/';
  if (pathname === item.to || pathname.startsWith(`${item.to}/`)) return true;
  return item.children?.some((child) => isNavItemActive(child, pathname)) ?? false;
}
