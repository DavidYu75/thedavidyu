'use client';

import { useRef, useState } from 'react';
import { contact } from '@/data/contact';

/** Copies the email address; if the clipboard rejects, selects the address text next to the button instead. */
export default function CopyEmail({ className, label = 'copy' }: { className?: string; label?: string }) {
  const [text, setText] = useState(label);
  const t = useRef(0);
  const done = (msg: string) => { setText(msg); clearTimeout(t.current); t.current = window.setTimeout(() => setText(label), 1700); };
  const fallback = (btn: HTMLButtonElement) => {
    try {
      const span = btn.parentElement?.querySelector('.email, .semail'); if (!span) return;
      const r = document.createRange(); r.selectNodeContents(span); const s = getSelection(); s?.removeAllRanges(); s?.addRange(r); done('selected');
    } catch { /* ignore */ }
  };
  return (
    <button type="button" className={className} onClick={(e) => {
      const btn = e.currentTarget;
      try { navigator.clipboard.writeText(contact.email).then(() => done(label === 'Copy' ? 'Copied' : 'copied'), () => fallback(btn)); } catch { fallback(btn); }
    }}>{text}</button>
  );
}
