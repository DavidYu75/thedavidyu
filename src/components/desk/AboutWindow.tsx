'use client';

import { aboutTxt } from '@/data/about';

/** about.txt on the davidOS desktop: a plain-text window styled like a text editor. */
export default function AboutWindow() {
  return (
    <div className="txtwin">
      <div className="txtgut" aria-hidden="true">{aboutTxt.map((_, i) => <span key={i}>{i + 1}</span>)}</div>
      <div className="txtbody">
        {aboutTxt.map((p, i) => <p key={i}>{p}</p>)}
        <p className="txtcursor" aria-hidden="true">&#9608;</p>
      </div>
    </div>
  );
}
