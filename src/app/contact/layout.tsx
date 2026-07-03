import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Yhteystiedot – Ota yhteyttä',
  description:
    'Ota yhteyttä Autopesu Kiilto & Loistoon: Läkkisepäntie 15, 00620 Helsinki. Puh. 044 960 8148. Avoinna MA-PE 8-18, LA 10-16.',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
