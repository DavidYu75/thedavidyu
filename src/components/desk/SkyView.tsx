'use client';

import { forwardRef, useCallback, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { projects } from '@/data/projects';
import { projectPanels } from '@/data/projectDetail';
import { projectStars, starGroups } from '@/data/sky';
import { hobbies, SUMMER_TRIANGLE } from '@/data/hobbies';
import { contact } from '@/data/contact';
import { createSky, SkyEngine, SkyStar, SkyStarInput } from '@/lib/desk/sky';
import { clamp } from '@/lib/desk/util';
import { useDesk } from './DeskContext';
import ProjectPanel from './ProjectPanel';
import CopyEmail from './CopyEmail';

export interface SkyHandle {
  escape(): boolean;
  closeAll(): void;
  layout(): void;
  pan(key: string): void;
}

const STARS: SkyStarInput[] = [
  ...projectStars.map((s) => { const p = projects.find((x) => x.slug === s.slug)!; return { id: s.slug, name: s.name, full: p.title, kind: 'project' as const, when: p.year, col: s.col, d: s.d, m: s.m }; }),
  ...hobbies.map((h) => ({ id: h.id, name: h.name, full: h.full, kind: 'hobby' as const, col: h.col, d: h.d, m: h.m })),
];
const KIND = { project: 'Something I built', hobby: 'Off hours' };
const PANEL_W = 472;

/** The night sky: a full-screen view that the desk window zooms into. */
const SkyView = forwardRef<SkyHandle, { active: boolean; onBack(): void }>(function SkyView({ active, onBack }, ref) {
  const { reduced, openLightbox } = useDesk();
  const root = useRef<HTMLDivElement>(null), canvas = useRef<HTMLCanvasElement>(null), layer = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLDivElement>(null), comet = useRef<HTMLDivElement>(null), card = useRef<HTMLElement>(null), panel = useRef<HTMLElement>(null);
  const eng = useRef<SkyEngine | null>(null);
  const reducedRef = useRef(reduced); reducedRef.current = reduced;
  const [selected, setSelected] = useState<SkyStar | null>(null);
  const [eggOpen, setEggOpen] = useState(false);
  const [phone, setPhone] = useState(false);
  const selRef = useRef(selected); selRef.current = selected;

  const placeCard = useCallback(() => {
    const s = selRef.current, c = card.current, e = eng.current; if (!s || !c || !e || s.kind !== 'hobby') return;
    if (e.phone) { c.style.left = ''; c.style.top = ''; return; }
    const p = e.pos(s.id); if (!p) return;
    const W = e.width, H = e.height, cw = c.offsetWidth, ch = c.offsetHeight;
    const left = p.x + 34 + cw < W - 16 ? p.x + 34 : p.x - 34 - cw;
    c.style.left = clamp(left, 16, W - cw - 16) + 'px'; c.style.top = clamp(p.y - 48, 16, H - ch - 16) + 'px';
  }, []);

  const close = useCallback(() => {
    const e = eng.current, s = selRef.current;
    if (!s) return;
    const had = !!(card.current?.contains(document.activeElement) || panel.current?.contains(document.activeElement));
    setSelected(null); e?.select(null); e?.setInset(0);
    if (had) layer.current?.querySelector<HTMLButtonElement>(`[data-star="${s.id}"]`)?.focus({ preventScroll: true });
  }, []);
  const closeEgg = useCallback(() => { setEggOpen(false); eng.current?.setEggOpen(false); }, []);

  useEffect(() => {
    if (!canvas.current || !layer.current || !label.current || !comet.current) return;
    const e = createSky({
      canvas: canvas.current, layer: layer.current, label: label.current, comet: comet.current,
      stars: STARS, groups: starGroups, triangle: SUMMER_TRIANGLE, panelWidth: PANEL_W,
      reduced: () => reducedRef.current, nightF: () => 1,
      onOpen: (s, kbd) => {
        setSelected(s); e.select(s.id); e.setInset(s.kind === 'project' ? PANEL_W : 0);
        if (s.kind === 'project' && panel.current) panel.current.scrollTop = 0;
        if (kbd) setTimeout(() => (s.kind === 'project' ? panel.current?.querySelector<HTMLElement>('.pp-title') : card.current?.querySelector<HTMLElement>('h2'))?.focus({ preventScroll: true }), 30);
      },
      onEggStart: () => { setSelected(null); e.select(null); e.setInset(0); },
      onEggShown: () => setEggOpen(true),
      onTap: () => { setSelected(null); e.select(null); e.setInset(0); },
    });
    eng.current = e;
    return () => { e.destroy(); eng.current = null; };
  }, []);

  // run only while the sky is open
  useEffect(() => {
    const e = eng.current; if (!e) return;
    if (!active) { e.stop(); return; }
    e.layout(); setPhone(e.phone); e.start();
    const onResize = () => { e.layout(); setPhone(e.phone); placeCard(); };
    const onVis = () => { if (document.hidden) e.stop(); else e.start(); };
    let rt = 0; const onR = () => { clearTimeout(rt); rt = window.setTimeout(onResize, 150); };
    addEventListener('resize', onR); document.addEventListener('visibilitychange', onVis);
    return () => { removeEventListener('resize', onR); document.removeEventListener('visibilitychange', onVis); e.stop(); };
  }, [active, placeCard]);

  useLayoutEffect(() => { placeCard(); }, [selected, placeCard]);

  useImperativeHandle(ref, () => ({
    escape() { if (eggOpen) { closeEgg(); return true; } if (selected) { close(); return true; } return false; },
    closeAll() { closeEgg(); if (selRef.current) close(); eng.current?.hover(null); },
    layout() { eng.current?.layout(); placeCard(); },
    pan(key) { eng.current?.pan(key); },
  }), [eggOpen, selected, close, closeEgg, placeCard]);

  const star = (id: string) => eng.current?.byId[id];
  const relatedOf = (id: string) => (star(id)?.rel ?? []).map((r) => ({ id: r.to, name: star(r.to)?.name ?? r.to }));
  const activateRelated = (id: string) => eng.current?.click(id, true);
  const hobby = selected?.kind === 'hobby' ? hobbies.find((h) => h.id === selected.id) : null;
  const projectOpen = selected?.kind === 'project' ? selected.id : null;

  return (
    <div id="skyView" ref={root} className={active ? 'on' : ''} aria-hidden={!active}>
      <canvas id="skyCv" ref={canvas} aria-hidden="true" />
      <button id="skyBack" type="button" onClick={onBack}><span aria-hidden="true">&#8592;</span> back to the desk</button>
      <header id="skyHero">
        <p className="eyebrow">40.71&deg; N, 74.01&deg; W <span aria-hidden="true">&middot;</span> stars visible tonight: <span className="n">{STARS.length}</span></p>
        <h1>Out the <i>window</i></h1>
        <p className="intro">You can&apos;t see stars in New York, so I made my own. The bright ones are things I built.</p>
        <ul className="legend" aria-label="How to read the sky">
          <li><svg viewBox="0 0 18 14" aria-hidden="true"><path d="M9 0L10 6 16 7 10 8 9 14 8 8 2 7 8 6Z" fill="#fff4e0" /></svg>bright ones: things I built</li>
          <li><svg viewBox="0 0 18 14" aria-hidden="true"><circle cx="9" cy="7" r="6" fill="#d6c6ff" opacity=".18" /><circle cx="9" cy="7" r="2.4" fill="#e8ddff" opacity=".6" /></svg>soft ones: off hours <em>(three are hiding something)</em></li>
          <li><em>hover a star for its name, click it for the story, drag the sky</em></li>
        </ul>
      </header>
      <div id="skyStars" ref={layer} role="group" aria-label="The sky. Each star opens a card.">
        <div id="skyLabel" ref={label} aria-hidden="true"><b /><small /></div>
        {STARS.map((s) => (
          <button key={s.id} type="button" className="star" data-star={s.id}
            aria-label={`${s.full || s.name}. ${KIND[s.kind]}${s.when ? ', ' + s.when : ''}.`}
            aria-expanded={selected?.id === s.id}
            onPointerEnter={(e) => { if (e.pointerType === 'mouse') eng.current?.hover(s.id); }}
            onPointerLeave={(e) => { if (e.pointerType === 'mouse') eng.current?.hover(null); }}
            onFocus={() => eng.current?.hover(s.id)} onBlur={() => eng.current?.hover(null)}
            onClick={(e) => eng.current?.click(s.id, e.detail === 0)} />
        ))}
      </div>

      <section id="skyCard" ref={card} role="dialog" aria-labelledby="scTitle" hidden={!hobby}>
        <button className="sx" type="button" aria-label="Close card" onClick={close}>&times;</button>
        {hobby && (
          <>
            <p className="kicker">Off hours</p>
            <h2 id="scTitle" tabIndex={-1}>{hobby.full}</h2>
            <p className="txt">{hobby.text}</p>
            {relatedOf(hobby.id).length > 0 && (
              <div className="rel"><div><b>See also</b>{relatedOf(hobby.id).map((r, i, a) => (
                <span key={r.id}><button type="button" aria-label={`Open ${r.name}`} onClick={() => activateRelated(r.id)}>{r.name}</button>{i < a.length - 1 ? ', ' : ''}</span>
              ))}</div></div>
            )}
          </>
        )}
      </section>

      <aside id="projPanel" ref={panel} role="dialog" aria-label="Project" hidden={!projectOpen}>
        <div className="pp-handle" aria-hidden="true" />
        <button className="sx" type="button" aria-label="Close project" onClick={close}>&times;</button>
        {projectStars.map((s) => (
          <div key={s.slug} hidden={projectOpen !== s.slug}>
            <ProjectPanel slug={s.slug} related={relatedOf(s.slug)} onRelated={activateRelated}
              onImage={(i) => openLightbox(projectPanels[s.slug].images, i)} />
          </div>
        ))}
      </aside>

      <div id="comet" ref={comet} aria-hidden="true">you found it<small>{contact.email}</small></div>
      <div id="egg" role="status" hidden={!eggOpen}>
        <button className="sx" type="button" aria-label="Close" onClick={closeEgg}>&times;</button>
        <Image src={contact.avatar} alt="David at night in New York City" width={68} height={68} />
        <h3>You found my summer triangle.</h3>
        <p className="t">Matcha, volleyball, music. Most people in New York never look up, so thanks for looking.</p>
        <span className="email-row"><span className="semail">{contact.email}</span><CopyEmail className="copy" label="Copy" /></span>
      </div>
      <span hidden>{phone ? 'phone' : 'desktop'}</span>
    </div>
  );
});

export default SkyView;
