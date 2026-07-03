import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Varaa aika – Autopesu Helsingissä',
  description:
    'Varaa autopesuaika verkossa 2 minuutissa. Käsinpesut, vahaukset, sisäpuhdistukset ja renkaiden vaihto Helsingissä. Kiilto & Loisto, Läkkisepäntie 15.',
}

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return children
}
