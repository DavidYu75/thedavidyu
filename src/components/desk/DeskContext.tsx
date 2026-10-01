'use client';

import { createContext, useContext } from 'react';
import type { Scene } from '@/lib/desk/layout';
import { computeScene } from '@/lib/desk/layout';

export interface DeskState {
  /** viewBox, anchors and object positions for the current viewport */
  scene: Scene;
  reduced: boolean;
  /** register/unregister a reason to lock page scroll (body.modal) */
  lockScroll(key: string, on: boolean): void;
  openLightbox(images: { url: string; caption: string }[], index: number): void;
}

/** Server-render with the desktop composition; the client recomputes from the real viewport on mount. */
export const defaultScene = computeScene(1440, 900, false);

export const DeskCtx = createContext<DeskState>({
  scene: defaultScene,
  reduced: false,
  lockScroll: () => {},
  openLightbox: () => {},
});

export const useDesk = () => useContext(DeskCtx);
