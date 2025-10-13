import { Metadata } from 'next'
import EnhancedServicesPage from '../../components/EnhancedServicesPage'

export const metadata: Metadata = {
  title: 'Palvelut - Kiilto & Loisto',
  description: 'Kattava valikoima autopesupalveluita ammattilaisilta. Sisä- ja ulkopuhdistus, vaha-aukset, ja erikoispalvelut.',
}

export default function ServicesPage() {
  return <EnhancedServicesPage />
}