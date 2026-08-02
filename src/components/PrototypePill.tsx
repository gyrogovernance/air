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

const VOLUNTARY_COPY =
  'Contributions to AIR are made on a voluntary basis, with no compensation, unless a separate written agreement explicitly states otherwise.';

/** Notice pill for open-enrollment / unpaid contribution surfaces. */
export function VoluntaryPill() {
  return (
    <span
      className="inline-flex max-w-xl text-center px-3 py-1.5 text-xs font-semibold leading-snug rounded-full border border-emerald-500/35 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200"
      role="note"
    >
      {VOLUNTARY_COPY}
    </span>
  );
}
