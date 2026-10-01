'use client';

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import Image from 'next/image';
import { NOW_PLAYING } from '@/data/nowPlaying';
import { createLofi, Lofi } from '@/lib/desk/lofi';
import { useDesk } from './DeskContext';

export interface NowPlayingHandle { escape(): boolean }

const NS = 'http://www.w3.org/2000/svg';

/** The "now playing" card the headphones open, with a synthesized lo-fi loop behind the play button. */
const NowPlaying = forwardRef<NowPlayingHandle>(function NowPlaying(_, ref) {
  const { scene, reduced } = useDesk();
  const [open, setOpen] = useState(false), [playing, setPlaying] = useState(false);
  const lofi = useRef<Lofi | null>(null), prog = useRef<HTMLElement>(null), playBtn = useRef<HTMLButtonElement>(null);
  const raf = useRef(0), notesT = useRef(0);
  const reducedRef = useRef(reduced); reducedRef.current = reduced;
  const openRef = useRef(open); openRef.current = open;

  const phones = () => document.getElementById('gPhones');
  const spawnNotes = useCallback((n: number) => {
    if (reducedRef.current) return; const g = document.getElementById('notes'); if (!g) return;
    for (let i = 0; i < n; i++) {
      const t = document.createElementNS(NS, 'text'); t.setAttribute('class', 'mnote'); t.setAttribute('x', String(-30 + Math.random() * 60)); t.setAttribute('y', String(-60 - i * 4));
      t.textContent = i % 2 ? '♫' : '♪'; t.style.animationDelay = (i * 0.12) + 's'; g.appendChild(t); setTimeout(() => t.remove(), 1600);
    }
  }, []);
  const bop = () => { const b = document.getElementById('phonesBody'); if (!b) return; b.classList.remove('bop'); void (b as unknown as HTMLElement).getBoundingClientRect(); b.classList.add('bop'); };

  const runProgress = useCallback(() => {
    const l = lofi.current; if (!l) return;
    cancelAnimationFrame(raf.current);
    const loop = () => { if (prog.current) prog.current.style.width = ((l.elapsed() % l.LOOP) / l.LOOP * 100).toFixed(2) + '%'; raf.current = requestAnimationFrame(loop); };
    raf.current = requestAnimationFrame(loop);
  }, []);
  const setPlay = useCallback((on: boolean) => {
    if (!lofi.current) lofi.current = createLofi();
    const l = lofi.current;
    if (on) {
      try { l.start(); } catch { return; }
      runProgress(); notesT.current = window.setInterval(() => spawnNotes(1), 900);
    } else {
      l.stop(); cancelAnimationFrame(raf.current); raf.current = 0; clearInterval(notesT.current); if (prog.current) prog.current.style.width = '0%';
    }
    setPlaying(on); phones()?.classList.toggle('playing', on);
  }, [spawnNotes, runProgress]);

  const openNp = useCallback(() => { setOpen(true); phones()?.setAttribute('aria-expanded', 'true'); setTimeout(() => playBtn.current?.focus({ preventScroll: true }), 40); }, []);
  const closeNp = useCallback(() => { if (lofi.current?.running) setPlay(false); setOpen(false); const p = phones(); p?.setAttribute('aria-expanded', 'false'); (p as HTMLElement | null)?.focus?.({ preventScroll: true }); }, [setPlay]);

  useEffect(() => {
    const p = phones(); if (!p) return;
    const onClick = () => { bop(); spawnNotes(4); if (openRef.current) closeNp(); else openNp(); };
    p.addEventListener('click', onClick);
    const onVis = () => { if (document.hidden) { cancelAnimationFrame(raf.current); raf.current = 0; } else if (lofi.current?.running) runProgress(); };
    document.addEventListener('visibilitychange', onVis);
    return () => { p.removeEventListener('click', onClick); document.removeEventListener('visibilitychange', onVis); lofi.current?.stop(); cancelAnimationFrame(raf.current); clearInterval(notesT.current); };
  }, [closeNp, openNp, spawnNotes, runProgress]);

  useImperativeHandle(ref, () => ({ escape() { if (open) { closeNp(); return true; } return false; } }), [open, closeNp]);

  const { L, AX, AY, pctX, pctY } = scene;
  return (
    <section className={`np${open ? ' on' : ''}${playing ? ' playing' : ''}`} role="dialog" aria-label="Now playing"
      style={{ left: pctX(AX(L.np)), top: pctY(AY(L.np.y)), width: pctX(L.np.w) }}>
      <button className="npx" type="button" aria-label="Close" onClick={closeNp}>&times;</button>
      <div className={`art${playing ? ' spin' : ''}`}>
        {NOW_PLAYING.art ? <Image src={NOW_PLAYING.art} alt="Album art" width={80} height={80} />
          : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18a3 3 0 1 1-2-2.8V6l11-2v11a3 3 0 1 1-2-2.8V7.6l-7 1.3z" fill="#fff" /></svg>}
      </div>
      <div className="meta">
        <div className="tt">{NOW_PLAYING.title}</div>
        <div className="ar">{NOW_PLAYING.artist}</div>
        <div className="ph2">{NOW_PLAYING.placeholderNote}</div>
        <div className="row">
          <button ref={playBtn} className="play" type="button" aria-label={playing ? 'Pause' : 'Play'} aria-pressed={playing} onClick={() => setPlay(!playing)}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d={playing ? 'M6 5h4v14H6zM14 5h4v14h-4z' : 'M7 4l13 8-13 8z'} fill="currentColor" /></svg>
          </button>
          <div className="prog" aria-hidden="true"><i ref={prog} /></div>
          <div className="eq" aria-hidden="true"><i /><i /><i /><i /><i /></div>
        </div>
      </div>
    </section>
  );
});

export default NowPlaying;
