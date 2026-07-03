import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Palvelut ja hinnasto – Autopesut, vahaukset ja renkaat',
  description:
    'Autopesupalvelut Helsingissä: käsinpesu alk. 25€, vahaukset, sisäpuhdistus, maalipinnan kiillotus, renkaiden vaihto ja rengashotelli. Katso hinnasto.',
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
