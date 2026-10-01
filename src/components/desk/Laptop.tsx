'use client';

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import Image from 'next/image';
import { experiences } from '@/data/experience';
import { experienceWindows } from '@/data/experienceDetail';
import { clamp, fmtHour, nyHour } from '@/lib/desk/util';
import { useDesk } from './DeskContext';
import JobWindow from './JobWindow';
import AboutWindow from './AboutWindow';

export interface LaptopHandle {
  /** handle Escape; returns true if something closed */
  escape(): boolean;
}

interface Props {
  skyActive: boolean;
  onLidOpen(open: boolean): void;
  onOpenSky(): void;
}

type Win = { kind: 'job'; slug: string } | { kind: 'about' } | null;

/**
 * The laptop: a single continuous rotateX lid (closed at -110deg showing the stickers, open at 0deg),
 * scroll-driven on desktop with an rAF lerp, tap-to-open on phone, and a FLIP zoom that commits the
 * zoomed size to real layout so the screen's text rasterizes sharp.
 */
const Laptop = forwardRef<LaptopHandle, Props>(function Laptop({ skyActive, onLidOpen, onOpenSky }, ref) {
  const { scene, reduced, lockScroll, openLightbox } = useDesk();
  const lap = useRef<HTMLDivElement>(null), lid = useRef<HTMLDivElement>(null), screen = useRef<HTMLDivElement>(null);
  const lidface = useRef<HTMLButtonElement>(null), hint = useRef<HTMLDivElement>(null), veil = useRef<HTMLDivElement>(null);
  const zoomBtn = useRef<HTMLButtonElement>(null), winX = useRef<HTMLButtonElement>(null);
  const st = useRef({ scrollP: 0, lidCur: 0, manualOpen: false, focusOn: false, lidRaf: 0, animT: 0, wasOpen: false,
    zoomed: null as null | { s: number; tx: number; ty: number; committed: boolean } });
  const sceneRef = useRef(scene); sceneRef.current = scene;
  const reducedRef = useRef(reduced); reducedRef.current = reduced;
  const skyRef = useRef(skyActive); skyRef.current = skyActive;
  const [win, setWin] = useState<Win>(null);
  const [zoomUi, setZoomUi] = useState(false);
  const [clock, setClock] = useState('');

  useEffect(() => { const tick = () => setClock(fmtHour(nyHour())); tick(); const t = setInterval(tick, 30000); return () => clearInterval(t); }, []);

  const lidTarget = () => (st.current.manualOpen || st.current.focusOn) ? 1 : st.current.scrollP;
  const syncFlat = useCallback(() => { lap.current?.classList.toggle('flat', st.current.lidCur >= 0.999 && !lid.current?.classList.contains('anim')); }, []);
  const applyLid = useCallback((p: number) => {
    const s = st.current;
    lid.current?.style.setProperty('--a', (-110 + p * 110).toFixed(2) + 'deg');
    const open = p > 0.6;
    if (open !== s.wasOpen) { s.wasOpen = open; onLidOpen(open); }
    if (screen.current) screen.current.inert = !open;
    if (lidface.current) { lidface.current.disabled = open; lidface.current.tabIndex = open ? -1 : 0; }
    hint.current?.classList.toggle('gone', p > 0.12 || s.manualOpen);
    syncFlat();
  }, [onLidOpen, syncFlat]);
  const lidTick = useCallback(() => {
    const s = st.current, t = lidTarget();
    s.lidCur += (t - s.lidCur) * (reducedRef.current ? 1 : 0.16); if (Math.abs(t - s.lidCur) < 0.002) s.lidCur = t;
    applyLid(s.lidCur); s.lidRaf = s.lidCur !== t ? requestAnimationFrame(lidTick) : 0;
  }, [applyLid]);
  const updateLid = useCallback((anim: boolean) => {
    const s = st.current;
    if (anim) {
      cancelAnimationFrame(s.lidRaf); s.lidRaf = 0; lid.current?.classList.add('anim'); s.lidCur = lidTarget(); applyLid(s.lidCur);
      clearTimeout(s.animT); s.animT = window.setTimeout(() => { lid.current?.classList.remove('anim'); syncFlat(); }, reducedRef.current ? 0 : 1000);
    } else if (!s.lidRaf) s.lidRaf = requestAnimationFrame(lidTick);
  }, [applyLid, lidTick, syncFlat]);

  const applyBase = useCallback(() => {
    const sc = sceneRef.current, l = lap.current; if (!l) return;
    l.style.left = sc.pctX(sc.lapVB.x); l.style.top = sc.pctY(sc.lapVB.y); l.style.width = sc.pctX(sc.lapVB.w);
    l.style.fontSize = (sc.lapVB.w / sc.vbW * 100 * 0.033) + 'cqw';
  }, []);

  /** FLIP: animate with a transform, then commit the zoomed size to real layout so text rasterizes sharp. */
  const setFocus = useCallback((on: boolean) => {
    const s = st.current, l = lap.current, sceneEl = l?.parentElement; if (!l || !sceneEl || on === s.focusOn) return;
    s.focusOn = on; if (veil.current) veil.current.hidden = !on; l.classList.toggle('focus', on); setZoomUi(on);
    const sc = sceneRef.current, sw = sceneEl.clientWidth, sh = sceneEl.clientHeight, k = sw / sc.vbW;
    const b = { l: sc.lapVB.x * k, t: sc.lapVB.y * k, w: sc.lapVB.w * k, h: sc.lapVB.w * 0.92 * k };
    if (on) {
      const sz = sc.phone ? Math.min(1.72, (sw - 12) / b.w) : Math.min(2.1, (sh * 0.88) / b.h), tx = sw / 2 - (b.l + b.w / 2), ty = sh * 0.5 - (b.t + b.h / 2);
      s.zoomed = { s: sz, tx, ty, committed: false };
      l.style.transform = `translate(${tx.toFixed(1)}px,${ty.toFixed(1)}px) scale(${sz.toFixed(4)})`;
      const commit = () => {
        if (!s.focusOn || !s.zoomed || s.zoomed.committed) return;
        const nw = b.w * sz, nh = b.h * sz, cx = b.l + b.w / 2 + tx, cy = b.t + b.h / 2 + ty;
        l.style.transition = 'none'; l.style.left = ((cx - nw / 2) / sw * 100) + '%'; l.style.top = ((cy - nh / 2) / sh * 100) + '%';
        l.style.width = (nw / sw * 100) + '%'; l.style.fontSize = (nw / sw * 100 * 0.033) + 'cqw'; l.style.transform = 'none';
        void l.offsetWidth; l.style.transition = ''; s.zoomed.committed = true;
      };
      if (reducedRef.current) commit(); else setTimeout(commit, 730);
    } else {
      if (s.zoomed && s.zoomed.committed) { l.style.transition = 'none'; applyBase(); l.style.transform = `translate(${s.zoomed.tx.toFixed(1)}px,${s.zoomed.ty.toFixed(1)}px) scale(${s.zoomed.s.toFixed(4)})`; void l.offsetWidth; l.style.transition = ''; }
      s.zoomed = null; requestAnimationFrame(() => { l.style.transform = ''; });
    }
    updateLid(true);
  }, [applyBase, updateLid]);

  const openLaptop = useCallback(() => { st.current.manualOpen = true; updateLid(true); if (sceneRef.current.phone) setTimeout(() => setFocus(true), 520); }, [setFocus, updateLid]);
  const closeLid = useCallback(() => {
    const s = st.current; s.manualOpen = false; if (s.focusOn) setFocus(false);
    if (s.scrollP > 0.6) { window.scrollTo({ top: 0, behavior: reducedRef.current ? 'auto' : 'smooth' }); updateLid(false); } else updateLid(true);
    setTimeout(() => lidface.current?.focus({ preventScroll: true }), 1000);
  }, [setFocus, updateLid]);

  // layout: re-place the laptop when the scene changes; keep the zoom if it was on
  useEffect(() => {
    const s = st.current, l = lap.current; if (!l) return;
    const wasZ = s.focusOn;
    if (s.focusOn) { s.focusOn = false; s.zoomed = null; l.classList.remove('focus'); if (veil.current) veil.current.hidden = true; l.style.transition = 'none'; l.style.transform = ''; }
    applyBase(); void l.offsetWidth; l.style.transition = '';
    if (hint.current) { hint.current.style.top = scene.pctY(scene.phone ? scene.AY(scene.L.laptop.y) - 36 : scene.AY(scene.L.laptop.y) + scene.L.laptop.w * 0.3 + 22); }
    if (wasZ) setFocus(true);
  }, [scene, applyBase, setFocus]);

  // scroll-to-open on desktop; initial closed state
  useEffect(() => {
    applyLid(0);
    const onScroll = () => { if (sceneRef.current.phone || skyRef.current) return; st.current.scrollP = clamp(window.scrollY / (window.innerHeight * 0.55), 0, 1); updateLid(false); };
    const onVis = () => { if (!document.hidden && st.current.lidCur !== lidTarget()) updateLid(false); };
    addEventListener('scroll', onScroll, { passive: true }); document.addEventListener('visibilitychange', onVis);
    return () => { removeEventListener('scroll', onScroll); document.removeEventListener('visibilitychange', onVis); cancelAnimationFrame(st.current.lidRaf); };
  }, [applyLid, updateLid]);

  const phoneSheet = scene.phone && win !== null;
  useEffect(() => { lockScroll('laptop', phoneSheet); return () => lockScroll('laptop', false); }, [phoneSheet, lockScroll]);

  const openWin = useCallback((w: Win) => {
    setWin(w);
    if (!sceneRef.current.phone && !st.current.focusOn) setFocus(true);
    setTimeout(() => winX.current?.focus({ preventScroll: true }), sceneRef.current.phone || reducedRef.current ? 60 : 800);
  }, [setFocus]);
  const closeWin = useCallback(() => { setWin(null); if (!sceneRef.current.phone) setTimeout(() => lap.current?.querySelector<HTMLButtonElement>('.app')?.focus({ preventScroll: true }), 0); }, []);

  useImperativeHandle(ref, () => ({
    escape() {
      if (win) { closeWin(); return true; }
      if (st.current.focusOn) { setFocus(false); return true; }
      return false;
    },
  }), [win, closeWin, setFocus]);

  const photosOf = (slug: string) => experienceWindows[slug]?.photos ?? [];
  const jobSlug = win?.kind === 'job' ? win.slug : null;
  const jobTitle = jobSlug ? experiences.find((e) => e.slug === jobSlug)?.company : 'about.txt';

  const windowBody = (
    <div className={win ? 'win on' : 'win'} id="win">
      <div className="wbar">
        <button ref={winX} id="winX" style={{ background: '#ff5f57' }} aria-label="Close window" onClick={closeWin} />
        <button style={{ background: '#febc2e' }} tabIndex={-1} aria-hidden="true" />
        <button style={{ background: '#28c840' }} tabIndex={-1} aria-hidden="true" />
        <span className="t">{jobTitle}</span>
      </div>
      {win?.kind === 'about' ? (
        <div className="jwin"><div className="jbody txt" tabIndex={0}><AboutWindow /></div></div>
      ) : (
        <div className="jwin">
          <aside className="jside">
            <small>Experience</small>
            {experiences.map((e) => (
              <button key={e.slug} type="button" aria-current={jobSlug === e.slug} onClick={() => openWin({ kind: 'job', slug: e.slug })}>
                <b><Image src={e.logo} alt="" width={24} height={24} /></b>{e.short}
              </button>
            ))}
          </aside>
          {experiences.map((e) => (
            <div key={e.slug} className="jbody" tabIndex={0} hidden={jobSlug !== e.slug}>
              <JobWindow slug={e.slug} onPhoto={(i) => openLightbox(photosOf(e.slug), i)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="veil" ref={veil} hidden onClick={() => setFocus(false)} />
      <div className="laptop" id="laptop" ref={lap}>
        <div className="lid" id="lid" ref={lid}>
          <div className="screen" id="screen" ref={screen}>
            <div className="os">
              <div className="mbar">
                <b>davidOS</b><span className="sp" /><span suppressHydrationWarning>{clock}</span>
                <button ref={zoomBtn} type="button" aria-label={zoomUi ? 'Zoom back out' : 'Zoom in on the screen'} title="zoom" onClick={() => setFocus(!st.current.focusOn)}>{zoomUi ? '⇱' : '⇲'}</button>
                <button type="button" aria-label="Close the laptop" title="close lid" onClick={closeLid}>&#9662;</button>
              </div>
              <div className="apps">
                {experiences.map((e) => (
                  <button key={e.slug} className="app" type="button" aria-label={`Open ${e.company}: ${experienceWindows[e.slug]?.role ?? ''}`} onClick={() => openWin({ kind: 'job', slug: e.slug })}>
                    <i><Image src={e.logo} alt="" width={48} height={48} /></i>
                    <span>{e.short}</span>
                    <em>{experienceWindows[e.slug]?.when.slice(-4)}</em>
                  </button>
                ))}
                <button className="app" type="button" aria-label="Open about.txt" onClick={() => openWin({ kind: 'about' })}>
                  <i className="txtico" aria-hidden="true"><span>txt</span></i>
                  <span>about.txt</span>
                  <em>me</em>
                </button>
              </div>
              <div className="dock">
                <button type="button" onClick={onOpenSky}><b style={{ background: '#f2c879' }} />night sky</button>
              </div>
              {!phoneSheet && windowBody}
            </div>
          </div>
          <button className="lidface" id="lidface" ref={lidface} type="button" aria-label="Open the laptop. Stickers on the lid: LinkedIn, Citizens, Generate, Amazon" onClick={() => { if (!lidface.current?.disabled) openLaptop(); }}>
            {experiences.map((e, i) => (
              <span key={e.slug} className={`stk stk${i + 1}`}><Image src={e.logo} alt={e.short} width={64} height={64} /></span>
            ))}
          </button>
        </div>
        <div className="deck"><div className="keys" /><div className="pad" /></div>
      </div>
      <div className="scrollhint" id="scrollhint" ref={hint}>
        {scene.phone ? "tap the laptop: where I've worked" : "scroll to open the laptop: where I've worked"}<span>&#8964;</span>
      </div>
      {phoneSheet && (
        <div id="osFull" className="on" role="dialog" aria-label="davidOS">
          <div className="mbar"><b>davidOS</b><span className="sp" /><span>{clock}</span><button type="button" aria-label="Back to the desk" onClick={closeWin}>&#10005;</button></div>
          <div className="host">{windowBody}</div>
        </div>
      )}
    </>
  );
});

export default Laptop;
