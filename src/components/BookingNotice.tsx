import { siteConfig } from '@/lib/siteConfig'

/** Yellow notice shown while online booking is off. */
export default function BookingNotice({ className = '' }: { className?: string }) {
  if (siteConfig.booking.onlineEnabled) return null

  return (
    <p className={`inline-block rounded-xl bg-gold-400 px-4 py-2 text-sm font-semibold text-navy-900 sm:text-base ${className}`}>
      {siteConfig.booking.notice}
    </p>
  )
}
