'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import '@/styles/desk.css';
import { contact } from '@/data/contact';
import { computeScene, PHONE_QUERY, Scene } from '@/lib/desk/layout';
import { renderWindowSky } from '@/lib/desk/skyline';
import { createBall, BallEngine } from '@/lib/desk/ball';
import { rng } from '@/lib/desk/util';
import { DeskCtx, defaultScene } from './DeskContext';
import Laptop, { LaptopHandle } from './Laptop';
import SkyView, { SkyHandle } from './SkyView';
import MatchaBowl from './MatchaBowl';
import NowPlaying, { NowPlayingHandle } from './NowPlaying';
import ContactNotes from './ContactNotes';
import DeskCard from './DeskCard';
import Lightbox, { LightboxImage } from './Lightbox';

/** 40 small stars in the window, placed once with a fixed seed so server and client agree. */
const WINDOW_STARS = (() => { const R = rng(7); return Array.from({ length: 40 }, () => ({ cx: (R() * 520).toFixed(0), cy: (R() * 150).toFixed(0), r: (0.7 + R() * 1.1).toFixed(1), delay: (R() * 3).toFixed(1) + 's', op: (0.4 + R() * 0.6).toFixed(2) })); })();

/**
 * David's desk at night: the whole home page. Renders the room (SVG), the laptop, the bowl, the
 * headphones, the ball, the post-its and the neon sign, and hands the window to the night sky.
 */
export default function DeskScene() {
  const [scene, setScene] = useState<Scene>(defaultScene);
  const [reduced, setReduced] = useState(false);
  const [lightsOff, setLightsOff] = useState(false);
  const [lidOpen, setLidOpen] = useState(false);
  const [skyActive, setSkyActive] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);
  const [lb, setLb] = useState<{ images: LightboxImage[]; index: number } | null>(null);
  const [winSky, setWinSky] = useState<string>('');
  const sceneEl = useRef<HTMLDivElement>(null), stageEl = useRef<HTMLDivElement>(null), svg = useRef<SVGSVGElement>(null);
  const chain = useRef<SVGGElement>(null), fring = useRef<SVGRectElement>(null), winG = useRef<SVGGElement>(null);
  const ballG = useRef<SVGGElement>(null), ballRot = useRef<SVGGElement>(null), ballSh = useRef<SVGEllipseElement>(null), ballTag = useRef<SVGGElement>(null);
  const laptop = useRef<LaptopHandle>(null), sky = useRef<SkyHandle>(null), np = useRef<NowPlayingHandle>(null);
  const ball = useRef<BallEngine | null>(null);
  const locks = useRef(new Set<string>()), kb = useRef(false), skyRef = useRef(false); skyRef.current = skyActive;
  const lbOpener = useRef<Element | null>(null);

  // viewport-driven layout
  useEffect(() => {
    const mq = matchMedia(PHONE_QUERY), rm = matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => { const el = sceneEl.current; setScene(computeScene(el?.clientWidth || innerWidth, el?.clientHeight || innerHeight, mq.matches)); };
    apply(); setReduced(rm.matches);
    let t = 0; const onResize = () => { clearTimeout(t); t = window.setTimeout(() => { apply(); if (skyRef.current) sky.current?.layout(); }, 150); };
    const onRM = (e: MediaQueryListEvent) => setReduced(e.matches);
    addEventListener('resize', onResize); mq.addEventListener('change', apply); rm.addEventListener('change', onRM);
    setWinSky(renderWindowSky(1));
    document.body.classList.add('desk-home');
    return () => { removeEventListener('resize', onResize); mq.removeEventListener('change', apply); rm.removeEventListener('change', onRM); document.body.classList.remove('desk-home', 'insky', 'modal'); };
  }, []);

  // volleyball
  useEffect(() => {
    if (!svg.current || !ballG.current || !ballRot.current || !ballSh.current || !ballTag.current) return;
    const b = createBall(svg.current, ballG.current, ballRot.current, ballSh.current, ballTag.current); ball.current = b;
    return () => { b.destroy(); ball.current = null; };
  }, []);
  useEffect(() => { const { L, AX, AY, vbW } = scene; ball.current?.home(AX(L.ball), AY(L.ball.y), L.ball.r, vbW); }, [scene]);

  const lockScroll = useCallback((key: string, on: boolean) => { if (on) locks.current.add(key); else locks.current.delete(key); document.body.classList.toggle('modal', locks.current.size > 0); }, []);
  const openLightbox = useCallback((images: LightboxImage[], index: number) => { lbOpener.current = document.activeElement; setLb({ images, index }); lockScroll('lightbox', true); }, [lockScroll]);
  const closeLightbox = useCallback(() => { setLb(null); lockScroll('lightbox', false); (lbOpener.current as HTMLElement | null)?.focus?.({ preventScroll: true }); }, [lockScroll]);

  // through the window and back
  const enterSky = useCallback(() => {
    if (skyRef.current) return;
    const el = sceneEl.current, w = winG.current; if (!el || !w) return;
    setCardOpen(false);
    const r = w.getBoundingClientRect(), sr = el.getBoundingClientRect();
    el.style.transformOrigin = `${r.left + r.width / 2 - sr.left}px ${r.top + r.height / 2 - sr.top}px`;
    el.style.setProperty('--fs', (sr.width / Math.max(1, r.width) * 1.25).toFixed(2));
    document.body.classList.add('insky'); if (stageEl.current) stageEl.current.inert = true;
    setSkyActive(true);
    setTimeout(() => document.getElementById('skyBack')?.focus({ preventScroll: true }), reduced ? 0 : 950);
  }, [reduced]);
  const leaveSky = useCallback(() => {
    if (!skyRef.current) return;
    sky.current?.closeAll(); setSkyActive(false); document.body.classList.remove('insky'); if (stageEl.current) stageEl.current.inert = false;
    setTimeout(() => { if (kb.current) (winG.current as unknown as HTMLElement)?.focus({ preventScroll: true }); }, reduced ? 0 : 1100);
  }, [reduced]);

  // keyboard: Escape order, arrow-key panning in the sky, Enter/Space on SVG buttons, focus ring for SVG buttons
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') kb.current = true;
      if (e.key === 'Escape') {
        if (lb) return closeLightbox();
        if (skyRef.current) { if (!sky.current?.escape()) leaveSky(); return; }
        if (cardOpen) return setCardOpen(false);
        if (np.current?.escape()) return;
        laptop.current?.escape(); return;
      }
      if (skyRef.current && e.key.startsWith('Arrow')) { const t = e.target as HTMLElement; if (t === document.body || t.id === 'skyView' || t.id === 'skyBack') { sky.current?.pan(e.key); e.preventDefault(); } }
    };
    const onPointer = () => { kb.current = false; };
    addEventListener('keydown', onKey); addEventListener('pointerdown', onPointer, true);
    return () => { removeEventListener('keydown', onKey); removeEventListener('pointerdown', onPointer, true); };
  }, [lb, cardOpen, closeLightbox, leaveSky]);
  useEffect(() => {
    const s = svg.current, ring = fring.current; if (!s || !ring) return;
    const onFocusIn = (e: FocusEvent) => {
      const t = (e.target as Element).closest('[role=button]'); if (!t || !kb.current) return;
      const r = t.getBoundingClientRect(), m = s.getScreenCTM()!.inverse(); const p = s.createSVGPoint();
      p.x = r.left; p.y = r.top; const a = p.matrixTransform(m); p.x = r.right; p.y = r.bottom; const b = p.matrixTransform(m);
      ring.setAttribute('x', String(a.x - 6)); ring.setAttribute('y', String(a.y - 6)); ring.setAttribute('width', String(b.x - a.x + 12)); ring.setAttribute('height', String(b.y - a.y + 12)); ring.setAttribute('visibility', 'visible');
    };
    const onFocusOut = () => ring.setAttribute('visibility', 'hidden');
    const onKey = (e: KeyboardEvent) => { const t = (e.target as Element).closest('[role=button]'); if ((e.key === 'Enter' || e.key === ' ') && t) { e.preventDefault(); t.dispatchEvent(new MouseEvent('click', { bubbles: true })); } };
    s.addEventListener('focusin', onFocusIn); s.addEventListener('focusout', onFocusOut); s.addEventListener('keydown', onKey);
    return () => { s.removeEventListener('focusin', onFocusIn); s.removeEventListener('focusout', onFocusOut); s.removeEventListener('keydown', onKey); };
  }, []);

  const toggleLamp = () => { const c = chain.current; c?.classList.add('pull'); setTimeout(() => c?.classList.remove('pull'), 200); setLightsOff((v) => !v); };

  const ctx = useMemo(() => ({ scene, reduced, lockScroll, openLightbox }), [scene, reduced, lockScroll, openLightbox]);
  const { L, vbW, vbH, AX, AY, deskY, lapVB } = scene;
  const wx = AX(L.win), wy = AY(L.win.y), lx = AX(L.lamp), ly = AY(L.lamp.y), bx = AX(L.bowl), by = AY(L.bowl.y);
  const lidH = L.laptop.w * 0.62, deckH = L.laptop.w * 0.3;
  const tr = (x: number, y: number, s = 1, r = 0) => `translate(${x} ${y})${s !== 1 ? ` scale(${s})` : ''}${r ? ` rotate(${r})` : ''}`;
  const grain = Array.from({ length: 7 }, (_, i) => { const y = 4 + i * 3.6; return `M0,${y} Q${vbW * 0.3},${y + 2} ${vbW * 0.55},${y - 1} T${vbW},${y + 1}`; });
  const sceneClass = ['scene', lightsOff ? 'off' : '', lidOpen ? 'lidopen' : '', skyActive ? 'fly' : ''].filter(Boolean).join(' ');

  return (
    <DeskCtx.Provider value={ctx}>
      <div className="stage" id="stage" ref={stageEl}>
        <div className="pin">
          <div className={sceneClass} id="scene" ref={sceneEl}>
            <svg id="svg" ref={svg} viewBox={`0 0 ${vbW} ${vbH}`} aria-label="David Yu's desk at night">
              <defs>
                <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#050818" /><stop offset=".62" stopColor="#0b1330" /><stop offset="1" stopColor="#141d45" /></linearGradient>
                <linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#232b4a" /><stop offset="1" stopColor="#151c33" /></linearGradient>
                <radialGradient id="ambGrad"><stop offset="0" stopColor="#ffb466" stopOpacity=".38" /><stop offset="1" stopColor="#ffb466" stopOpacity="0" /></radialGradient>
                <radialGradient id="poolGrad"><stop offset="0" stopColor="#ffd08a" stopOpacity=".55" /><stop offset="1" stopColor="#ffd08a" stopOpacity="0" /></radialGradient>
                <linearGradient id="coneGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffcf7a" stopOpacity=".28" /><stop offset="1" stopColor="#ffcf7a" stopOpacity="0" /></linearGradient>
                <radialGradient id="bulbGrad"><stop offset="0" stopColor="#fff2c8" stopOpacity=".9" /><stop offset="1" stopColor="#ffcf7a" stopOpacity="0" /></radialGradient>
                <radialGradient id="glowGrad"><stop offset="0" stopColor="#8fb6ff" stopOpacity=".4" /><stop offset="1" stopColor="#8fb6ff" stopOpacity="0" /></radialGradient>
                <radialGradient id="neonHalo"><stop offset="0" stopColor="#ff7bbf" stopOpacity=".35" /><stop offset="1" stopColor="#ff7bbf" stopOpacity="0" /></radialGradient>
                <radialGradient id="ballShade" cx=".35" cy=".3" r=".8"><stop offset=".4" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".38" /></radialGradient>
                <filter id="neonF" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="3" result="b1" /><feGaussianBlur in="SourceGraphic" stdDeviation="10" result="b2" /><feMerge><feMergeNode in="b2" /><feMergeNode in="b1" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                <filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="8" /></filter>
                <clipPath id="skyClip"><rect width="520" height="300" /></clipPath>
                <clipPath id="ballClip"><circle r="40" /></clipPath>
                <mask id="winMask" maskUnits="userSpaceOnUse"><rect width={vbW} height={vbH} fill="#fff" /><rect x={wx} y={wy} width={520 * L.win.s} height={300 * L.win.s} fill="#000" /></mask>
              </defs>

              <rect id="wall" width={vbW} height={vbH} fill="url(#wallGrad)" />
              <g id="gAmb" transform={tr(lx - 110 * L.lamp.s, ly - 190 * L.lamp.s, L.lamp.s)}><ellipse rx="420" ry="320" fill="url(#ambGrad)" /></g>

              {/* window */}
              <g id="gWindow" ref={winG} transform={tr(wx, wy, L.win.s)} tabIndex={0} role="button" aria-label="The window. Look outside: fly into the night sky where the projects live" onClick={enterSky}>
                <rect x="-14" y="-14" width="548" height="330" rx="6" fill="#2b3150" />
                <rect x="-8" y="-8" width="536" height="318" rx="3" fill="#1b2038" />
                <g clipPath="url(#skyClip)">
                  <rect width="520" height="300" fill="url(#skyGrad)" />
                  <g id="stars">{WINDOW_STARS.map((s, i) => <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="#fff" className="star-w" opacity={s.op} style={{ animationDelay: s.delay }} />)}</g>
                  <g id="moon" transform="translate(150 52)"><circle r="17" fill="#f5f1e3" filter="url(#soft)" opacity=".3" /><path d="M4,-16 A16,16 0 1,0 4,16 A12.5,12.5 0 1,1 4,-16Z" fill="#f5f1e3" /></g>
                  {winSky && <image id="winSky" x="0" y="0" width="520" height="300" preserveAspectRatio="none" href={winSky} />}
                  <polygon points="30,0 150,0 20,300 -60,300" fill="#fff" opacity=".045" />
                  <polygon points="180,0 210,0 90,300 60,300" fill="#fff" opacity=".035" />
                  <rect id="winGlass" width="520" height="300" fill="#fff" />
                </g>
                <rect x="255" y="-4" width="10" height="308" fill="#2b3150" />
                <rect x="-4" y="146" width="528" height="8" fill="#2b3150" />
                <rect x="-26" y="300" width="572" height="18" rx="3" fill="#3b4160" />
                <rect x="-26" y="316" width="572" height="6" fill="#2a2f48" />
                <g transform="translate(470 300)"><path d="M-16,0 L-12,-26 L12,-26 L16,0Z" fill="#b8654a" /><path d="M0,-26 C-6,-44 -22,-40 -20,-56 C-6,-52 -2,-40 0,-30 C2,-44 14,-54 22,-52 C20,-40 8,-34 0,-26Z" fill="#5f9a5a" /><path d="M0,-28 C-2,-46 -10,-60 -4,-70 C4,-62 4,-46 0,-28Z" fill="#7cb56f" /></g>
                <text id="lookOut" className="hand" x="60" y="346" fontSize="22" fill="#c9d6ee">look outside &#10022;</text>
              </g>

              {/* lamp */}
              <g id="gLamp" transform={tr(lx, ly, L.lamp.s)}>
                <polygon id="coneG" points="-128,-198 -52,-198 70,0 -360,0" fill="url(#coneGrad)" />
                <rect x="-5" y="-210" width="10" height="200" rx="3" fill="#2a2c33" />
                <path d="M0,-205 L-70,-235" stroke="#2a2c33" strokeWidth="10" strokeLinecap="round" />
                <g transform="translate(-78 -232) rotate(30)">
                  <path d="M-30,-14 L30,-14 L54,36 L-54,36Z" fill="#2f3138" />
                  <ellipse cx="0" cy="36" rx="54" ry="8" fill="#3d3f47" />
                  <g id="bulbG"><ellipse cx="0" cy="36" rx="46" ry="6" fill="#ffe9b3" /><circle cx="0" cy="44" r="46" fill="url(#bulbGrad)" /></g>
                </g>
                <g id="chain" ref={chain} tabIndex={0} role="button" aria-label={`Lamp pull chain. Room light is ${lightsOff ? 'off' : 'on'}`} onClick={toggleLamp}>
                  <line x1="-40" y1="-190" x2="-40" y2="-142" stroke="#c9c9cf" strokeWidth="2" strokeDasharray="3 2" /><circle cx="-40" cy="-138" r="6" fill="#d9d9df" /><circle cx="-40" cy="-138" r="14" fill="transparent" />
                </g>
                <rect x="-45" y="-14" width="90" height="14" rx="6" fill="#2a2c33" />
              </g>

              {/* desk */}
              <g id="gDesk" transform={tr(0, deskY)}>
                <rect id="deskFront" y="30" width={vbW} height={vbH} fill="#4a3121" />
                <rect id="deskTop" width={vbW} height="30" fill="#7a5236" />
                <rect id="deskEdge" y="28" width={vbW} height="4" fill="#5c3d28" />
                <g id="grain" stroke="#000" strokeOpacity=".12" fill="none">{grain.map((d, i) => <path key={i} d={d} />)}</g>
              </g>
              <g id="gPool" transform={tr(lx - 140 * L.lamp.s, deskY + 12, L.lamp.s)}><ellipse rx="320" ry="44" fill="url(#poolGrad)" /></g>
              <g id="gLapShadow"><ellipse id="lapShadow" fill="#000" opacity=".35" cx={lapVB.x + L.laptop.w / 2} cy={AY(L.laptop.y) + deckH + 2} rx={L.laptop.w * 0.62} ry="9" /></g>

              {/* volleyball */}
              <g id="gBall" ref={ballG} tabIndex={0} role="button" aria-label="Volleyball. Click to flick it, or drag and let go">
                <ellipse id="ballShadow" ref={ballSh} cx="0" cy="40" rx="34" ry="6" fill="#000" opacity=".35" />
                <g id="ballRot" ref={ballRot}>
                  <circle r="40" fill="#f3efe6" />
                  <g clipPath="url(#ballClip)" fill="none" strokeWidth="11" strokeLinecap="round">
                    <path d="M-44,-12 C-16,-34 16,-34 44,-12" stroke="#2c4d9d" /><path d="M-44,12 C-16,34 16,34 44,12" stroke="#f0c24a" />
                    <path d="M-30,-44 C-6,-12 -6,12 -30,44" stroke="#f0c24a" /><path d="M30,-44 C6,-12 6,12 30,44" stroke="#2c4d9d" />
                  </g>
                  <circle r="40" fill="url(#ballShade)" /><circle r="40" fill="none" stroke="#bdb5a5" strokeWidth="1.5" />
                </g>
              </g>
              <g id="ballTag" ref={ballTag} visibility="hidden" pointerEvents="none"><rect x="-70" y="-30" width="140" height="28" rx="14" fill="#1c1a17" /><text className="ui" y="-11" textAnchor="middle" fontSize="14" fontWeight="600" fill="#fff">Volleyball Player</text></g>

              {/* matcha bowl */}
              <g id="gBowl" transform={tr(bx, by, L.bowl.s)}>
                <ellipse cx="4" cy="2" rx="62" ry="12" fill="#000" opacity=".3" />
                <path d="M-62,-40 C-60,-8 -36,4 0,4 C36,4 60,-8 62,-40Z" fill="#bcb2a1" />
                <path d="M-62,-40 C-60,-8 -36,4 0,4 C36,4 60,-8 62,-40" fill="none" stroke="#8a7f6e" strokeWidth="1.5" />
                <path d="M-52,-30 C-48,-12 -30,-4 -8,-2" fill="none" stroke="#fff" strokeWidth="3" opacity=".22" strokeLinecap="round" />
                <ellipse cx="0" cy="-40" rx="62" ry="26" fill="#d9d1c2" />
                <ellipse cx="0" cy="-40" rx="56" ry="22" fill="#3a3324" />
                <ellipse cx="0" cy="-40" rx="62" ry="26" fill="none" stroke="#efe8da" strokeWidth="3" />
                <g id="steam" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M-16,-70 c-6,-9 6,-15 0,-24 c-5,-8 5,-14 0,-22" /><path d="M2,-74 c-6,-9 6,-15 0,-24 c-5,-8 5,-14 0,-22" /><path d="M19,-70 c-6,-9 6,-15 0,-24 c-5,-8 5,-14 0,-22" />
                </g>
                <g id="chasen" tabIndex={0} role="button" aria-label="Bamboo whisk. Click to whisk the bowl for me" transform="translate(66 -6) rotate(-28)">
                  <ellipse cx="0" cy="8" rx="30" ry="5" fill="#000" opacity=".25" />
                  <rect x="-4" y="-46" width="8" height="34" rx="3" fill="#d9c28c" /><rect x="-4.5" y="-30" width="9" height="2" fill="#a2844b" />
                  <path d="M-4,-12 L-18,20 M-2,-12 L-11,22 M0,-12 L0,23 M2,-12 L11,22 M4,-12 L18,20 M-3,-12 L-15,21 M3,-12 L15,21 M-1,-12 L-5,23 M1,-12 L5,23" stroke="#c9ad76" strokeWidth="1.4" strokeLinecap="round" />
                  <path d="M-4,-12 h8" stroke="#3a3222" strokeWidth="3" />
                </g>
              </g>

              {/* headphones */}
              <g id="gPhones" transform={tr(AX(L.phones), AY(L.phones.y), L.phones.s)} tabIndex={0} role="button" aria-label="Headphones. Click to see what is playing" aria-expanded="false">
                <ellipse cx="0" cy="0" rx="46" ry="7" fill="#000" opacity=".3" />
                <g id="phonesBody">
                  <path d="M-40,-22 C-40,-72 40,-72 40,-22" fill="none" stroke="#25272e" strokeWidth="10" strokeLinecap="round" />
                  <path d="M-40,-22 C-40,-64 40,-64 40,-22" fill="none" stroke="#3b3e47" strokeWidth="3" strokeLinecap="round" />
                  <rect x="-54" y="-32" width="26" height="34" rx="9" fill="#25272e" /><rect x="28" y="-32" width="26" height="34" rx="9" fill="#25272e" />
                  <rect x="-50" y="-28" width="18" height="26" rx="7" fill="#b8483b" /><rect x="32" y="-28" width="18" height="26" rx="7" fill="#b8483b" />
                </g>
                <g id="notes" />
              </g>

              <g id="gDark"><rect id="darkRect" width={vbW} height={vbH} fill="#040711" opacity=".66" mask="url(#winMask)" /></g>
              <g id="gGlow"><ellipse id="glowEl" fill="url(#glowGrad)" cx={lapVB.x + L.laptop.w / 2} cy={AY(L.laptop.y) - lidH * 0.5} rx={L.laptop.w * 1.2} ry={lidH * 1.3} /></g>

              {/* neon sign */}
              <g id="gNeon" transform={tr(AX(L.neon), AY(L.neon.y), L.neon.s)} tabIndex={0} role="button" aria-label={`Neon sign: ${contact.name}. Opens contact links`} onClick={() => setCardOpen(true)}>
                <ellipse cy="-10" rx="260" ry="120" fill="url(#neonHalo)" />
                <g id="neonGlowLayer"><text className="neon" textAnchor="middle" fontSize="64" fill="#ff8fc9" filter="url(#neonF)">{contact.name}</text></g>
                <text className="neon" textAnchor="middle" fontSize="64" fill="#ffe1f1">{contact.name}</text>
                <text className="ui" y="34" textAnchor="middle" fontSize="15" fill="#9fb3d6" letterSpacing=".08em">{contact.tagline}</text>
              </g>

              <rect id="fring" ref={fring} fill="none" stroke="#ffd166" strokeWidth="3" strokeDasharray="7 5" rx="10" visibility="hidden" pointerEvents="none" />
            </svg>

            <Laptop ref={laptop} skyActive={skyActive} onLidOpen={setLidOpen} onOpenSky={enterSky} />
            <MatchaBowl />
            <ContactNotes />
            <NowPlaying ref={np} />
          </div>
          <DeskCard open={cardOpen} onClose={() => setCardOpen(false)} />
        </div>
      </div>
      <SkyView ref={sky} active={skyActive} onBack={leaveSky} />
      <Lightbox images={lb?.images ?? null} index={lb?.index ?? 0} onIndex={(i) => setLb((v) => (v ? { ...v, index: i } : v))} onClose={closeLightbox} />
    </DeskCtx.Provider>
  );
}
