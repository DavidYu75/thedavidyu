'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export interface LightboxImage { url: string; caption: string }

export default function Lightbox({ images, index, onIndex, onClose }: {
  images: LightboxImage[] | null;
  index: number;
  onIndex(i: number): void;
  onClose(): void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => { if (images) setTimeout(() => closeRef.current?.focus(), 40); }, [images]);
  if (!images) return null;
  const p = images[index], n = images.length;
  return (
    <div id="lb" className="on" role="dialog" aria-label="Photo" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <button ref={closeRef} className="lbx" type="button" aria-label="Close photo" onClick={onClose}>&#10005;</button>
      <figure className="lbfig">
        <div className="lbim"><Image src={p.url} alt={p.caption} fill sizes="92vw" style={{ objectFit: 'contain' }} /></div>
        <figcaption>{p.caption}</figcaption>
      </figure>
      <div className="lbnav">
        <button type="button" aria-label="Previous photo" disabled={n < 2} onClick={() => onIndex((index - 1 + n) % n)}>&#8592;</button>
        <span>{index + 1} / {n}</span>
        <button type="button" aria-label="Next photo" disabled={n < 2} onClick={() => onIndex((index + 1) % n)}>&#8594;</button>
      </div>
    </div>
  );
}
