import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tietoa meistä – Helsinkiläinen autopesuyritys',
  description:
    'Kiilto & Loisto on helsinkiläinen autopesuyritys, jolla on yli 15 vuoden kokemus ja yli 500 tyytyväistä asiakasta. Tutustu tarinaamme.',
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
