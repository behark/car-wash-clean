import Link from 'next/link'
import { MessageCircle, Phone } from 'lucide-react'
import { siteConfig, whatsappUrl } from '@/lib/siteConfig'

interface BookingCtaProps {
  children: React.ReactNode
  /** Classes of the normal "Varaa aika" link (online booking on). */
  className?: string
  /** Added to the button group while online booking is off. */
  offClassName?: string
  size?: 'sm' | 'lg'
  /** Service name, pre-filled in the WhatsApp message. */
  service?: string
  /** Hide the call button where the phone number is already next to it. */
  whatsappOnly?: boolean
}

/**
 * Every booking button on the site. Online booking on: the normal /booking link.
 * Off (siteConfig.booking.onlineEnabled = false): yellow call + WhatsApp buttons.
 */
export default function BookingCta({
  children,
  className,
  offClassName = '',
  size = 'sm',
  service,
  whatsappOnly = false,
}: BookingCtaProps) {
  if (siteConfig.booking.onlineEnabled) {
    return (
      <Link href="/booking" className={className}>
        {children}
      </Link>
    )
  }

  const large = size === 'lg'
  const button = `inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-gold-400 font-bold text-navy-900 shadow-lg transition-colors hover:bg-gold-500 ${
    large ? 'px-6 py-4 text-base sm:text-lg' : 'px-4 py-3 text-sm'
  }`
  const icon = large ? 'h-5 w-5' : 'h-4 w-4'
  const message = service ? `Hei, haluaisin varata ajan palveluun: ${service}` : 'Hei, haluaisin varata ajan.'

  return (
    <div className={`flex flex-wrap justify-center gap-2 ${offClassName}`}>
      {!whatsappOnly && (
        <a href={`tel:${siteConfig.phone.tel}`} className={button}>
          <Phone className={icon} aria-hidden="true" />
          {large ? 'Varaa puhelimitse' : 'Soita'}
        </a>
      )}
      <a href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer" className={button}>
        <MessageCircle className={icon} aria-hidden="true" />
        {large ? 'Varaa WhatsAppilla' : 'WhatsApp'}
      </a>
    </div>
  )
}
