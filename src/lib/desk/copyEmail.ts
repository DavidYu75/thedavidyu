import { contact } from '@/data/contact';

/** Writes the email address to the clipboard. Resolves false when the browser refuses. */
export async function copyEmail(): Promise<boolean> {
  try { await navigator.clipboard.writeText(contact.email); return true; } catch { return false; }
}

/** Selects an element's text so the visitor can copy it by hand. */
export function selectText(el: Element | null | undefined) {
  if (!el) return;
  try { const r = document.createRange(); r.selectNodeContents(el); const s = getSelection(); s?.removeAllRanges(); s?.addRange(r); } catch { /* ignore */ }
}
