'use client';

import { useRef, useState } from 'react';
import { contact } from '@/data/contact';
import { useDesk } from './DeskContext';

/** Three post-its on the wall: LinkedIn, GitHub, and an Email note that copies the address. */
export default function ContactNotes() {
  const { scene } = useDesk();
  const [state, setState] = useState<'idle' | 'copied' | 'fallback'>('idle');
  const t = useRef(0);
  const { L, AX, AY, pctX, pctY, vbW } = scene;
  const style = (i: number) => {
    const [x, y, r] = L.notes[i];
    return { left: pctX(AX({ x: x - L.noteW / 2, y, a: 'L' })), top: pctY(AY(y) - L.noteW / 2), width: pctX(L.noteW), '--r': r + 'deg', '--pf': (L.noteW / vbW * 100 * 0.26) + 'cqw' } as React.CSSProperties;
  };
  const copy = () => {
    const done = () => { setState('copied'); clearTimeout(t.current); t.current = window.setTimeout(() => setState('idle'), 1800); };
    const fb = () => { setState('fallback'); setTimeout(() => { try { const a = document.querySelector('#emailNote .addr'); if (!a) return; const r = document.createRange(); r.selectNodeContents(a); const s = getSelection(); s?.removeAllRanges(); s?.addRange(r); } catch { /* ignore */ } }, 0); };
    try { navigator.clipboard.writeText(contact.email).then(done, fb); } catch { fb(); }
  };
  return (
    <nav className="postits" aria-label="Contact">
      <a className="postit c1" style={style(0)} href={contact.linkedin} target="_blank" rel="noopener noreferrer"><span className="tape" />LinkedIn<small>say hi &#8599;</small></a>
      <a className="postit c2" style={style(1)} href={contact.github} target="_blank" rel="noopener noreferrer"><span className="tape" />GitHub<small>the code &#8599;</small></a>
      <button className="postit c3" style={style(2)} type="button" id="emailNote" aria-label={`Copy my email address, ${contact.email}`} onClick={copy}>
        <span className="tape" />
        <span className="pl">{state === 'copied' ? 'copied!' : 'Email'}</span>
        {state === 'fallback' ? <small className="ps"><span className="addr">{contact.email}</span></small>
          : <small className="ps">{state === 'copied' ? 'see you soon' : 'tap to copy'}</small>}
      </button>
    </nav>
  );
}
