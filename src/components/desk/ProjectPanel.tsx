'use client';

import Image from 'next/image';
import { projects } from '@/data/projects';
import { projectPanels } from '@/data/projectDetail';

export interface Related { id: string; name: string }

/** The four agents around "files on disk", with Discord on top: drawn in the panel's style since the project has no screenshots. */
function AgentsDiagram() {
  const A = (a: number) => `rgba(242,200,121,${a})`;
  const C: [number, number] = [200, 118];
  const ag: [number, number, string, string][] = [[62, 60, 'primary', 'runs the day'], [338, 60, 'coding', 'opens PRs'], [62, 176, 'content', 'research to video'], [338, 176, 'career', 'search, outreach']];
  return (
    <svg className="pp-diagram" viewBox="0 0 400 212" role="img" aria-label="Four agents (primary, coding, content, career) share files on disk and are controlled from Discord">
      {ag.map(([x, y]) => (
        <g key={`l${x}${y}`}>
          <line x1={x} y1={y} x2={C[0]} y2={C[1]} stroke={A(0.35)} strokeDasharray="3 4" />
          <line x1={x} y1={y} x2={200} y2={18} stroke={A(0.18)} />
        </g>
      ))}
      <rect x={150} y={96} width={100} height={44} rx={6} fill="rgba(8,13,27,.9)" stroke={A(0.7)} />
      <text x={200} y={114} textAnchor="middle" fontFamily="var(--font-dm-mono), monospace" fontSize={10} fill="#f2c879">files on disk</text>
      <text x={200} y={128} textAnchor="middle" fontFamily="var(--font-dm-mono), monospace" fontSize={8.5} fill="#94a0b8">memory, tasks, handoffs</text>
      <rect x={160} y={6} width={80} height={24} rx={12} fill="rgba(8,13,27,.9)" stroke={A(0.45)} />
      <text x={200} y={22} textAnchor="middle" fontFamily="var(--font-figtree), sans-serif" fontSize={11} fontWeight={600} fill="#eef1f8">Discord</text>
      {ag.map(([x, y, t, sub]) => (
        <g key={t}>
          <rect x={x - 46} y={y - 18} width={92} height={36} rx={8} fill="rgba(242,200,121,.06)" stroke={A(0.5)} />
          <text x={x} y={y - 2} textAnchor="middle" fontFamily="var(--font-figtree), sans-serif" fontSize={12} fontWeight={600} fill="#eef1f8">{t}</text>
          <text x={x} y={y + 11} textAnchor="middle" fontFamily="var(--font-dm-mono), monospace" fontSize={8.5} fill="#94a0b8">{sub}</text>
        </g>
      ))}
    </svg>
  );
}

/** One project's panel content. Rendered for every project so the text is in the DOM; only the open one is shown. */
export default function ProjectPanel({ slug, related, onRelated, onImage }: {
  slug: string;
  related: Related[];
  onRelated(id: string): void;
  onImage(index: number): void;
}) {
  const project = projects.find((p) => p.slug === slug), P = projectPanels[slug];
  if (!project || !P) return null;
  const list = (label: string, arr: string[]) => arr.length ? (<><h3>{label}</h3><ul>{arr.map((x) => <li key={x}>{x}</li>)}</ul></>) : null;
  return (
    <>
      <p className="kicker">Something I built &middot; {project.year}{P.kind ? ` · ${P.kind}` : ''}</p>
      <h2 tabIndex={-1} className="pp-title">{project.title}</h2>
      <p className="over">{P.overview}</p>
      {P.images.length > 0 ? (
        <div className="pp-imgs">
          {P.images.map((im, i) => (
            <button key={im.url} type="button" aria-label={`Open image: ${im.caption}`} onClick={() => onImage(i)}>
              <span className="im"><Image src={im.url} alt={im.caption} fill sizes="440px" style={{ objectFit: 'cover' }} /></span>
              <span>{im.caption}</span>
            </button>
          ))}
        </div>
      ) : P.diagram ? <AgentsDiagram /> : null}
      {list(P.doesLabel || 'What it does', P.does)}
      {list('The hard parts', P.hardParts)}
      {list('Also', P.also)}
      <h3>Tech</h3>
      <div className="pp-chips">{P.tech.map((t) => <span key={t}>{t}</span>)}</div>
      {P.githubUrl && <p><a className="go" href={P.githubUrl} target="_blank" rel="noopener noreferrer">See it on GitHub &#8599;</a></p>}
      {related.length > 0 && (
        <>
          <h3>Related</h3>
          <div className="pp-rel">{related.map((r) => <button key={r.id} type="button" onClick={() => onRelated(r.id)}>{r.name}</button>)}</div>
        </>
      )}
    </>
  );
}
