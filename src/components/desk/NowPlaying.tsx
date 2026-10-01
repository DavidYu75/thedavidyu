'use client';

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { NOW_PLAYING, spotifyTrackUrl } from '@/data/nowPlaying';
import { useDesk } from './DeskContext';

export interface NowPlayingHandle { escape(): boolean }

/** The parts of Spotify's iFrame API this widget uses. https://developer.spotify.com/documentation/embeds */
interface SpotifyController {
  addListener(event: 'playback_update', cb: (e: { data: { isPaused: boolean; position: number; duration: number } }) => void): void;
  pause(): void;
  destroy(): void;
}
interface SpotifyIFrameAPI {
  createController(el: HTMLElement, opts: { uri: string; width: string; height: number }, cb: (c: SpotifyController) => void): void;
}
declare global { interface Window { onSpotifyIframeApiReady?: (api: SpotifyIFrameAPI) => void } }

/** After this long without a player, give up on this attempt and show the track link; the next open tries again. */
const SLOW_LOAD = 8000;
let apiPromise: Promise<SpotifyIFrameAPI> | null = null, apiReady = false;
/** Loads Spotify's iFrame API once. Rejects on a script error, so a later open can retry. */
function loadSpotifyApi(): Promise<SpotifyIFrameAPI> {
  if (!apiPromise) {
    const p: Promise<SpotifyIFrameAPI> = new Promise((resolve, reject) => {
      window.onSpotifyIframeApiReady = (api) => { apiReady = true; resolve(api); };
      const s = document.createElement('script');
      s.src = 'https://open.spotify.com/embed/iframe-api/v1'; s.async = true;
      s.onerror = () => { s.remove(); if (apiPromise === p) apiPromise = null; reject(new Error('Spotify embed API failed to load')); };
      document.body.appendChild(s);
    });
    apiPromise = p;
  }
  return apiPromise;
}

const NS = 'http://www.w3.org/2000/svg';

/** The "currently listening to" card the headphones open: Spotify's own player for David's pick. */
const NowPlaying = forwardRef<NowPlayingHandle>(function NowPlaying(_, ref) {
  const { scene, reduced } = useDesk();
  const [open, setOpen] = useState(false), [playing, setPlaying] = useState(false), [failed, setFailed] = useState(false);
  const host = useRef<HTMLDivElement>(null), ctrl = useRef<SpotifyController | null>(null), closeBtn = useRef<HTMLButtonElement>(null);
  const mounting = useRef(false), attempt = useRef(0), slowT = useRef(0), alive = useRef(true), notesT = useRef(0);
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

  // the headphones bop and the notes float while Spotify reports the track is playing
  useEffect(() => {
    phones()?.classList.toggle('playing', playing);
    clearInterval(notesT.current);
    if (playing) notesT.current = window.setInterval(() => spawnNotes(1), 900);
    return () => clearInterval(notesT.current);
  }, [playing, spawnNotes]);

  // One player, created on first open. Each try is numbered: a try that times out is abandoned, and anything
  // it produces later (a controller, an error) is ignored or destroyed, so a retry starts clean.
  const mountPlayer = useCallback(() => {
    if (ctrl.current || mounting.current || !host.current) return;
    const id = ++attempt.current; mounting.current = true; setFailed(false);
    const el = document.createElement('div'); host.current.replaceChildren(el);
    const abandon = () => {
      if (attempt.current !== id) return;
      attempt.current++; mounting.current = false; clearTimeout(slowT.current);
      if (!apiReady) apiPromise = null; // the script never became ready; load it again next time
      if (alive.current) setFailed(true);
    };
    slowT.current = window.setTimeout(abandon, SLOW_LOAD);
    loadSpotifyApi().then((api) => {
      if (attempt.current !== id || !alive.current) return;
      api.createController(el, { uri: `spotify:track:${NOW_PLAYING.spotifyId}`, width: '100%', height: 80 }, (c) => {
        if (attempt.current !== id || !alive.current) { c.destroy(); return; }
        clearTimeout(slowT.current); mounting.current = false; ctrl.current = c; setFailed(false);
        c.addListener('playback_update', (e) => {
          if (!alive.current) return;
          const on = !e.data.isPaused && !(e.data.duration > 0 && e.data.position >= e.data.duration);
          // playback that starts after the card was closed (e.g. a buffered play) gets stopped
          if (on && !openRef.current) { c.pause(); return; }
          setPlaying(on);
        });
      });
    }).catch(abandon);
  }, []);

  const openNp = useCallback(() => {
    setOpen(true); mountPlayer(); phones()?.setAttribute('aria-expanded', 'true');
    setTimeout(() => closeBtn.current?.focus({ preventScroll: true }), 40);
  }, [mountPlayer]);
  const closeNp = useCallback(() => {
    ctrl.current?.pause(); setPlaying(false); setOpen(false);
    const p = phones(); p?.setAttribute('aria-expanded', 'false'); (p as HTMLElement | null)?.focus?.({ preventScroll: true });
  }, []);

  useEffect(() => {
    alive.current = true;
    const p = phones(); if (!p) return;
    const onClick = () => { bop(); spawnNotes(4); if (openRef.current) closeNp(); else openNp(); };
    p.addEventListener('click', onClick);
    return () => {
      alive.current = false; attempt.current++; mounting.current = false; clearTimeout(slowT.current);
      p.removeEventListener('click', onClick);
      ctrl.current?.destroy(); ctrl.current = null;
    };
  }, [closeNp, openNp, spawnNotes]);

  useImperativeHandle(ref, () => ({ escape() { if (open) { closeNp(); return true; } return false; } }), [open, closeNp]);

  const url = spotifyTrackUrl(NOW_PLAYING.spotifyId);
  const { L, AX, AY, pctX, pctY } = scene;
  // keep the card inside the scene when it's narrow; --np-min (desk.css) is the width Spotify's player needs
  const left = `min(${pctX(AX(L.np))}, calc(100% - max(var(--np-min), ${pctX(L.np.w)}) - 12px))`;
  return (
    <section className={`np${open ? ' on' : ''}${playing ? ' playing' : ''}${failed ? ' failed' : ''}`} role="dialog" aria-label="Currently listening to"
      style={{ left, top: pctY(AY(L.np.y)), width: pctX(L.np.w) }}>
      <button ref={closeBtn} className="npx" type="button" aria-label="Close" onClick={closeNp}>&times;</button>
      <div className="np-head">
        <span className="np-k">currently listening to</span>
        <span className="eq" aria-hidden="true"><i /><i /><i /><i /><i /></span>
      </div>
      <div className="np-player" ref={host} />
      <a className="np-open" href={url} target="_blank" rel="noopener noreferrer">{NOW_PLAYING.title} · {NOW_PLAYING.artist} &#8599;</a>
    </section>
  );
});

export default NowPlaying;
