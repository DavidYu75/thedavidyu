'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { contact } from '@/data/contact';
import CopyEmail from './CopyEmail';

/** The contact card the neon sign opens (a bottom sheet on phone). */
export default function DeskCard({ open, onClose }: { open: boolean; onClose(): void }) {
  const x = useRef<HTMLButtonElement>(null);
  useEffect(() => { if (open) setTimeout(() => x.current?.focus(), 30); }, [open]);
  return (
    <aside className="card" id="card" role="dialog" aria-labelledby="cardTitle" hidden={!open}>
      <div className="grab" />
      <button ref={x} className="x" type="button" aria-label="Close" onClick={onClose}>&times;</button>
      <div className="k">Hi</div>
      <h2 id="cardTitle">{contact.name}</h2>
      <div>
        <Image className="ava" src={contact.avatar} alt="David at night in NYC" width={56} height={56} />
        <p>{contact.blurb}</p>
        <p>{contact.traits.map((t) => <span key={t} className="chip">{t}</span>)}</p>
        <div className="emailrow"><span className="email">{contact.email}</span><CopyEmail className="btn" label="copy" /></div>
        <div className="links">
          <a href={contact.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
    </aside>
  );
}
