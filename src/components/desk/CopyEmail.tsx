'use client';

import { useRef, useState } from 'react';
import { copyEmail, selectText } from '@/lib/desk/copyEmail';

/** Copies the email address; if the clipboard rejects, selects the address text next to the button instead. */
export default function CopyEmail({ className, label = 'copy' }: { className?: string; label?: string }) {
  const [text, setText] = useState(label);
  const t = useRef(0);
  const done = (msg: string) => { setText(msg); clearTimeout(t.current); t.current = window.setTimeout(() => setText(label), 1700); };
  const fallback = (btn: HTMLButtonElement) => { selectText(btn.parentElement?.querySelector('.email, .semail')); done('selected'); };
  return (
    <button type="button" className={className} onClick={(e) => {
      const btn = e.currentTarget;
      copyEmail().then((ok) => (ok ? done(label === 'Copy' ? 'Copied' : 'copied') : fallback(btn)));
    }}>{text}</button>
  );
}
