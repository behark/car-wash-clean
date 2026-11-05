import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BookingCta from '@/components/BookingCta'
import { siteConfig } from '@/lib/siteConfig'

export const metadata: Metadata = siteConfig.booking.onlineEnabled
  ? {
      title: 'Varaa aika – Autopesu Helsingissä',
      description:
        'Varaa autopesuaika verkossa 2 minuutissa. Käsinpesut, vahaukset, sisäpuhdistukset ja renkaiden vaihto Helsingissä. Kiilto & Loisto, Läkkisepäntie 15.',
    }
  : {
      title: 'Ajanvaraus – Autopesu Helsingissä',
      description: `${siteConfig.booking.notice} Soita ${siteConfig.phone.display}. Kiilto & Loisto, Läkkisepäntie 15, Helsinki.`,
    }

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  if (siteConfig.booking.onlineEnabled) return children

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50 px-4 pb-16 pt-32">
        <div className="mx-auto max-w-2xl rounded-2xl bg-gold-400 p-6 text-center text-navy-900 shadow-xl sm:p-10">
          <h1 className="mb-4 text-2xl font-bold sm:text-3xl">{siteConfig.booking.notice}</h1>
          <p className="mb-8 text-base sm:text-lg">
            Verkkoajanvaraus on tilapäisesti pois käytöstä. Soita tai lähetä meille WhatsApp-viesti, niin sovimme sinulle
            sopivan ajan.
          </p>
          <div className="rounded-xl bg-navy-900 p-3">
            <BookingCta size="lg">Varaa aika</BookingCta>
          </div>
          <p className="mt-6 text-2xl font-bold">{siteConfig.phone.display}</p>
          <ul className="mt-4 space-y-1 text-sm sm:text-base">
            {siteConfig.hours.map((hour) => (
              <li key={hour.label}>
                {hour.label}: {hour.value}
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  )
}
