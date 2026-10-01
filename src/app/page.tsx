import type { Metadata } from 'next';
import { Caveat, DM_Mono, Figtree, IM_Fell_English, Pacifico } from 'next/font/google';
import DeskScene from '@/components/desk/DeskScene';
import { contact } from '@/data/contact';
import { experiences } from '@/data/experience';
import { projects } from '@/data/projects';

// The desk's faces, loaded only on the home page: a neon script for the name, a clean sans for cards, handwriting for the post-its,
// an old-style serif for the night sky and a mono for labels.
const pacifico = Pacifico({ subsets: ['latin'], weight: '400', variable: '--font-pacifico' })
const caveat = Caveat({ subsets: ['latin'], weight: ['500', '700'], variable: '--font-caveat' })
const figtree = Figtree({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-figtree' })
const fell = IM_Fell_English({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-fell' })
const dmMono = DM_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-dm-mono' })

export const metadata: Metadata = {
  title: 'David Yu',
  description: "David Yu's desk at night in New York: where he's worked (LinkedIn, Citizens, Generate, Amazon), what he's built, and a window onto the rest. CS at Northeastern, class of 2027.",
  openGraph: {
    title: 'David Yu',
    description: "A late-night desk in NYC. Open the laptop for where I've worked, look out the window for what I've built.",
    url: 'https://yudavid.dev',
    siteName: 'David Yu',
    images: [{ url: '/images/hero2.JPEG', width: 2048, height: 1536, alt: 'David Yu' }],
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'David Yu', description: "A late-night desk in NYC. Open the laptop for where I've worked, look out the window for what I've built." },
};

/**
 * The home page is David's desk at night. This server component renders the readable shell
 * (name, links, a plain index of experience and projects) so crawlers and link previews see it
 * before any JavaScript runs; DeskScene hydrates the room and every interaction.
 */
export default function Home() {
  return (
    <main className={`desk-main ${pacifico.variable} ${caveat.variable} ${figtree.variable} ${fell.variable} ${dmMono.variable}`}>
      <header className="sr-only">
        <h1>{contact.name}</h1>
        <p>{contact.blurb}</p>
        <p><a href={contact.github}>GitHub</a> <a href={contact.linkedin}>LinkedIn</a> <a href={`mailto:${contact.email}`}>{contact.email}</a></p>
        <h2>Experience</h2>
        <ul>{experiences.map((e) => <li key={e.slug}><a href={`/experience/${e.slug}`}>{e.title}</a>, {e.period}</li>)}</ul>
        <h2>Projects</h2>
        <ul>{projects.map((p) => <li key={p.slug}><a href={p.link}>{p.title}</a>: {p.description}</li>)}</ul>
      </header>
      <DeskScene />
    </main>
  );
}
