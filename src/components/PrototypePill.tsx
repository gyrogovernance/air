/** Status marker for soft-launch / non-formal surfaces. */
export default function PrototypePill({ detail = false }: { detail?: boolean }) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 text-xs font-bold uppercase tracking-[1px] rounded-full border border-amber-500/35 bg-amber-500/10 text-amber-800 dark:text-amber-200"
      role="status"
    >
      {detail ? 'Prototype · Do Not Apply · Not a working process yet' : 'Prototype'}
    </span>
  );
}
