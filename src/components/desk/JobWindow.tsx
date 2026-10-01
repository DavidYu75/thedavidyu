'use client';

import Image from 'next/image';
import { experiences } from '@/data/experience';
import { experienceWindows } from '@/data/experienceDetail';

/** The body of one davidOS experience window. Rendered for every job so the text is in the DOM; only the open one is shown. */
export default function JobWindow({ slug, onPhoto }: { slug: string; onPhoto(index: number): void }) {
  const job = experiences.find((e) => e.slug === slug);
  const w = experienceWindows[slug];
  if (!job || !w) return null;
  return (
    <>
      <header className="jhead">
        <div className="jbadge"><Image src={job.logo} alt="" width={64} height={64} /></div>
        <div>
          <p className="co">{job.company}</p>
          <h3>{w.role}</h3>
          <p className="jmeta">{w.when}{w.where ? ` · ${w.where}` : ''}</p>
        </div>
      </header>
      {w.photos.length > 0 && (
        <div className="jphotos" aria-label="Photos">
          {w.photos.map((p, i) => (
            <button key={p.url} className="ph" type="button" aria-label={`Photo: ${p.caption}`} onClick={() => onPhoto(i)}>
              <span className="im"><Image src={p.url} alt={p.caption} fill sizes="220px" style={{ objectFit: 'cover' }} /></span>
              <span>{p.caption}</span>
            </button>
          ))}
        </div>
      )}
      {w.lead && <p><b>{w.lead}</b></p>}
      <h4>Built</h4>
      <ul>{w.built.map((b) => <li key={b}>{b}</li>)}</ul>
      <h4>Outcomes</h4>
      <ul>{w.outcomes.map((b) => <li key={b}>{b}</li>)}</ul>
      <h4>Tech</h4>
      <div className="chips">{w.tech.map((t) => <span key={t}>{t}</span>)}</div>
    </>
  );
}
