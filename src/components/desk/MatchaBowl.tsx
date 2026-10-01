'use client';

import { useEffect, useRef } from 'react';
import { createBowl, BowlEngine } from '@/lib/desk/bowl';
import { useDesk } from './DeskContext';

/**
 * The whisk canvas over the bowl's rim (the bowl itself is drawn in the room SVG as #gBowl),
 * plus the foam meter and the "whisk it for me" button beside it.
 */
export default function MatchaBowl() {
  const { scene, reduced } = useDesk();
  const cv = useRef<HTMLCanvasElement>(null), fill = useRef<HTMLSpanElement>(null), lbl = useRef<HTMLSpanElement>(null), btn = useRef<HTMLButtonElement>(null);
  const eng = useRef<BowlEngine | null>(null);
  const reducedRef = useRef(reduced); reducedRef.current = reduced;

  useEffect(() => {
    const stage = document.getElementById('gBowl'), chasen = document.getElementById('chasen');
    if (!cv.current || !fill.current || !lbl.current || !btn.current || !stage) return;
    const e = createBowl({ canvas: cv.current, stage, meterFill: fill.current, meterLabel: lbl.current, button: btn.current, reduced: () => reducedRef.current });
    eng.current = e;
    const onChasen = () => e.auto();
    chasen?.addEventListener('click', onChasen);
    return () => { chasen?.removeEventListener('click', onChasen); e.destroy(); eng.current = null; };
  }, []);
  useEffect(() => { eng.current?.resize(); }, [scene]);

  const { L, AX, AY, pctX, pctY } = scene, b = L.bowl, side = 112 * b.s;
  const bx = AX(b), by = AY(b.y);
  return (
    <>
      <canvas ref={cv} className="bowlcv" id="bowl" tabIndex={0} role="img"
        aria-label="The matcha bowl, seen from above. Whisk it with quick zig-zags of your cursor or finger. With the keyboard, press the arrow keys to whisk or Enter to whisk it all at once."
        style={{ width: pctX(side), left: pctX(bx - side / 2), top: pctY(by - 40 * b.s - side / 2) }} />
      <div className={scene.phone ? 'wkui row' : 'wkui'} style={{ left: pctX(AX(L.wkui)), top: pctY(AY(L.wkui.y)) }}>
        <div className="meter"><span className="meter-bar" aria-hidden="true"><span className="meter-fill" ref={fill} /></span><span className="meter-label" ref={lbl} aria-live="polite">flat</span></div>
        <p className="hintl"><span className="mouse">zig-zag over the bowl to whisk</span><span className="touch">swipe back and forth on the bowl</span></p>
        <button className="btn" ref={btn} type="button">Whisk it for me</button>
      </div>
    </>
  );
}
