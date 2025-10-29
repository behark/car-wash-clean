import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Käyttöehdot | Kiilto & Loisto Autopesu',
  description: 'Kiilto & Loisto Autopesun palvelun käyttöehdot, varausehdot ja peruutuskäytännöt.',
}

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-silver-50 to-white py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-display font-bold text-navy-900 mb-4">
              Käyttöehdot
            </h1>
            <p className="text-silver-600">
              Voimassa {new Date().toLocaleDateString('fi-FI')} alkaen
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">1. Yleistä</h2>
              <p className="mb-4">
                Nämä käyttöehdot koskevat Kiilto & Loisto Autopesun (y-tunnus: 1234567-8)
                tarjoamia autopesu- ja huoltopalveluita sekä verkkovarausjärjestelmän käyttöä.
                Varaamalla ajan tai käyttämällä palveluitamme, hyväksyt nämä käyttöehdot.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">2. Palvelut</h2>
              <h3 className="text-xl font-semibold text-navy-800 mb-3">2.1 Palveluvalikoima</h3>
              <p className="mb-4">Tarjoamme seuraavia palveluita:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Käsinpesut ja vahauskäsittelyt</li>
                <li>Sisäpuhdistukset</li>
                <li>Maalipinnan kiillotukset</li>
                <li>Renkaiden vaihdot ja säilytys</li>
                <li>Lisäpalvelut (moottoripesu, otsonointi, penkkien pesu)</li>
              </ul>

              <h3 className="text-xl font-semibold text-navy-800 mb-3">2.2 Palvelun laajuus</h3>
              <p className="mb-4">
                Palveluiden tarkka sisältö on kuvattu palveluhinnastossamme.
                Pidätämme oikeuden tehdä pieniä muutoksia palveluiden sisältöön
                laadun parantamiseksi ilman erillistä ilmoitusta.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">3. Varaukset</h2>
              <h3 className="text-xl font-semibold text-navy-800 mb-3">3.1 Varauksen tekeminen</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Varaukset tehdään verkkovarausjärjestelmän kautta tai puhelimitse</li>
                <li>Varaus on sitova, kun saat vahvistuksen sähköpostilla</li>
                <li>Varauksen yhteydessä annettujen tietojen tulee olla oikeita</li>
                <li>Pidätämme oikeuden vahvistaa varauksen puhelimitse</li>
              </ul>

              <h3 className="text-xl font-semibold text-navy-800 mb-3">3.2 Saapuminen</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Saavu paikalle viimeistään varattuun aikaan</li>
                <li>Yli 15 minuuttia myöhästyneitä varauksia ei voida taata</li>
                <li>Ajoneuvon tulee olla siirtokelpoinen ja rekisteröity</li>
                <li>Ilmoita erikoisvarusteista (kattoboksi, vetokoukku) etukäteen</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">4. Peruutukset ja muutokset</h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <h3 className="text-xl font-semibold text-navy-800 mb-3">Peruutusehdot:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Maksuton peruutus viimeistään 24 tuntia ennen varattua aikaa</li>
                  <li>12-24 tuntia ennen: 50% peruutusmaksu</li>
                  <li>Alle 12 tuntia ennen: 100% peruutusmaksu</li>
                  <li>Saapumatta jättäminen: 100% veloitus</li>
                </ul>
              </div>
              <p>
                Peruutukset tulee tehdä puhelimitse numeroon +358 44 960 8148
                tai sähköpostilla osoitteeseen Info@kiiltoloisto.fi.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">5. Hinnoittelu ja maksuehdot</h2>
              <h3 className="text-xl font-semibold text-navy-800 mb-3">5.1 Hinnat</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Hinnat sisältävät arvonlisäveron 25,5%</li>
                <li>Hinnat ovat voimassa toistaiseksi</li>
                <li>Pidätämme oikeuden hinnanmuutoksiin</li>
                <li>Erikoisajoneuvot ja -työt hinnoitellaan erikseen</li>
              </ul>

              <h3 className="text-xl font-semibold text-navy-800 mb-3">5.2 Maksaminen</h3>
              <p className="mb-4">Hyväksymme seuraavat maksutavat:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Käteinen</li>
                <li>Pankkikortit (Visa, Mastercard)</li>
                <li>MobilePay</li>
                <li>Laskutus (yritysasiakkaat sopimuksen mukaan)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">6. Vastuu ja vakuutukset</h2>
              <h3 className="text-xl font-semibold text-navy-800 mb-3">6.1 Asiakkaan vastuu</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Asiakas vastaa ajoneuvossa olevista henkilökohtaisista tavaroista</li>
                <li>Arvoesineet tulee poistaa ajoneuvosta ennen pesua</li>
                <li>Asiakas ilmoittaa ajoneuvon erityispiirteistä ja vioista etukäteen</li>
                <li>Asiakas vastaa väärien tietojen aiheuttamista vahingoista</li>
              </ul>

              <h3 className="text-xl font-semibold text-navy-800 mb-3">6.2 Palveluntarjoajan vastuu</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Vastaamme työssämme aiheuttamistamme välittömistä vahingoista</li>
                <li>Vastuumme rajoittuu palvelun arvoon</li>
                <li>Emme vastaa välillisistä vahingoista</li>
                <li>Meillä on voimassa oleva vastuuvakuutus</li>
              </ul>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-semibold mb-2">Huomio:</p>
                <p>
                  Emme vastaa normaaleista käyttövahingoista, kuten kivien aiheuttamista
                  naarmuista, ruosteesta johtuvista vaurioista tai ajoneuvon rakenteellisista
                  vioista johtuvista vahingoista.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">7. Takuu ja reklamaatiot</h2>
              <h3 className="text-xl font-semibold text-navy-800 mb-3">7.1 Tyytyväisyystakuu</h3>
              <p className="mb-4">
                Tarjoamme 100% tyytyväisyystakuun palveluillemme. Jos et ole tyytyväinen
                saamaasi palveluun, ilmoita siitä välittömästi henkilökunnallemme.
              </p>

              <h3 className="text-xl font-semibold text-navy-800 mb-3">7.2 Reklamaatiot</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Näkyvät virheet tulee reklamoida heti palvelun jälkeen</li>
                <li>Piilevät virheet 7 vuorokauden kuluessa</li>
                <li>Reklamaatio tehdään kirjallisesti (sähköposti/kirje)</li>
                <li>Korjaamme virheellisen työn veloituksetta</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">8. Henkilötietojen käsittely</h2>
              <p className="mb-4">
                Käsittelemme henkilötietoja tietosuojaselosteen mukaisesti.
                Tietosuojaseloste on luettavissa verkkosivuillamme osoitteessa{' '}
                <Link href="/privacy" className="text-gold-600 hover:underline">
                  www.kiiltoloisto.fi/privacy
                </Link>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">9. Force Majeure</h2>
              <p className="mb-4">
                Emme vastaa viivästyksistä tai vahingoista, jotka johtuvat ylivoimaisesta
                esteestä (force majeure), kuten:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Luonnonkatastrofit</li>
                <li>Viranomaismääräykset</li>
                <li>Lakot tai työsulut</li>
                <li>Sähkö- tai vesikatkokset</li>
                <li>Merkittävät laiteviat</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">10. Riidanratkaisu</h2>
              <p className="mb-4">
                Mahdolliset erimielisyydet pyrimme ensisijaisesti ratkaisemaan
                neuvottelemalla. Mikäli sopuun ei päästä:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Kuluttaja-asiakkaat voivat saattaa asian kuluttajariitalautakunnan käsiteltäväksi</li>
                <li>Yritysasiakkaiden kanssa riidat ratkaistaan Helsingin käräjäoikeudessa</li>
                <li>Sopimukseen sovelletaan Suomen lakia</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">11. Ehtojen muuttaminen</h2>
              <p className="mb-4">
                Pidätämme oikeuden muuttaa näitä käyttöehtoja. Merkittävistä muutoksista
                ilmoitamme verkkosivuillamme vähintään 30 päivää ennen muutosten voimaantuloa.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">12. Yhteystiedot</h2>
              <div className="bg-gold-50 p-6 rounded-lg">
                <p className="mb-2"><strong>Kiilto & Loisto Autopesu</strong></p>
                <p className="mb-2">Y-tunnus: 1234567-8</p>
                <p className="mb-2">Osoite: Läkkisepäntie 15, 00620 Helsinki</p>
                <p className="mb-2">Puhelin: +358 44 960 8148</p>
                <p className="mb-2">Sähköposti: Info@kiiltoloisto.fi</p>
                <p className="mb-2">Aukioloajat: Ma-Pe 8-18, La 10-16, Su Suljettu</p>
              </div>
            </section>
          </div>

          {/* Back to home button */}
          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-900 font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Palaa etusivulle
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}