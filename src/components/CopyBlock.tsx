import { useCallback, useState } from 'react';

type CopyBlockProps = {
  title?: string;
  text: string;
  buttonLabel: string;
  previewMaxHeight?: string;
  /** When false, only the copy button is shown (content already visible elsewhere). */
  showPreview?: boolean;
};

/** Read-only preview with one-click clipboard copy. */
export default function CopyBlock({
  title,
  text,
  buttonLabel,
  previewMaxHeight = '12rem',
  showPreview = true,
}: CopyBlockProps) {
  const [copied, setCopied] = useState(false);
  const ready = Boolean(text.trim());

  const copy = useCallback(async () => {
    if (!ready) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard may be unavailable outside a secure context.
    }
  }, [ready, text]);

  return (
    <div className="space-y-2">
      {title ? (
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{title}</p>
      ) : null}

      <button
        type="button"
        onClick={copy}
        disabled={!ready}
        className="btn-outline text-sm disabled:cursor-not-allowed disabled:opacity-60"
      >
        {copied ? 'Copied' : buttonLabel}
      </button>

      {!ready ? (
        <p className="text-xs text-red-600 dark:text-red-400">Content unavailable.</p>
      ) : null}
      {ready && showPreview ? (
        <pre
          className="overflow-auto whitespace-pre-wrap rounded-lg border border-blue-400/20 bg-white/50 p-3 font-mono text-xs leading-relaxed text-gray-700 dark:bg-black/25 dark:text-gray-200 sm:text-sm"
          style={{ maxHeight: previewMaxHeight }}
        >
          {text}
        </pre>
      ) : null}
    </div>
  );
}
