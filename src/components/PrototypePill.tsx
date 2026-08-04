/** Status marker for soft-launch / non-formal surfaces. */
export default function PrototypePill() {
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 text-xs font-bold uppercase tracking-[1px] rounded-full border border-green-500/35 bg-green-500/10 text-green-800 dark:text-green-200"
      role="status"
    >
      Beta
    </span>
  );
}
