import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Tietosuojaseloste | Kiilto & Loisto Autopesu',
  description: 'Kiilto & Loisto Autopesun tietosuojaseloste ja evästekäytännöt. Lue miten käsittelemme asiakkaidemme tietoja turvallisesti ja vastuullisesti.',
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-silver-50 to-white py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-display font-bold text-navy-900 mb-4">
              Tietosuojaseloste
            </h1>
            <p className="text-silver-600">
              Päivitetty viimeksi: {new Date().toLocaleDateString('fi-FI')}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">1. Rekisterinpitäjä</h2>
              <div className="bg-silver-50 p-4 rounded-lg">
                <p className="mb-2"><strong>Yritys:</strong> Kiilto & Loisto Autopesu</p>
                <p className="mb-2"><strong>Y-tunnus:</strong> 1234567-8</p>
                <p className="mb-2"><strong>Osoite:</strong> Läkkisepäntie 15, 00620 Helsinki</p>
                <p className="mb-2"><strong>Puhelin:</strong> +358 44 960 8148</p>
                <p className="mb-2"><strong>Sähköposti:</strong> Info@kiiltoloisto.fi</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">2. Henkilötietojen käyttötarkoitus</h2>
              <p className="mb-4">Käsittelemme henkilötietojasi seuraaviin tarkoituksiin:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Autopesun varausten käsittely ja hallinta</li>
                <li>Asiakaspalvelun tarjoaminen</li>
                <li>Laskutus ja maksujen käsittely</li>
                <li>Palveluidemme kehittäminen</li>
                <li>Markkinointi asiakassuhteen perusteella</li>
                <li>Lakisääteisten velvoitteiden noudattaminen</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">3. Käsiteltävät henkilötiedot</h2>
              <p className="mb-4">Keräämme ja käsittelemme seuraavia henkilötietoja:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Nimi ja yhteystiedot (puhelinnumero, sähköpostiosoite)</li>
                <li>Ajoneuvon tiedot (rekisterinumero, merkki, malli)</li>
                <li>Varaushistoria ja käytetyt palvelut</li>
                <li>Maksutiedot (ei tallenneta korttitietoja)</li>
                <li>Asiakaspalautteet ja yhteydenotot</li>
                <li>Evästeiden kautta kerätyt tiedot</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">4. Tietojen säilytysaika</h2>
              <p className="mb-4">
                Säilytämme henkilötietojasi vain niin kauan kuin on tarpeen yllä mainittujen
                käyttötarkoitusten toteuttamiseksi. Pääsääntöisesti tiedot säilytetään:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Aktiiviset asiakkaat: Asiakassuhteen keston ajan</li>
                <li>Passiiviset asiakkaat: 3 vuotta viimeisestä asioinnista</li>
                <li>Kirjanpitoaineisto: 6 vuotta kirjanpitolain mukaisesti</li>
                <li>Markkinointiluvat: Kunnes lupa perutaan</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">5. Tietojen luovuttaminen</h2>
              <p className="mb-4">
                Emme myy tai vuokraa henkilötietojasi kolmansille osapuolille.
                Voimme luovuttaa tietoja seuraavissa tapauksissa:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Viranomaisille lakisääteisten velvoitteiden täyttämiseksi</li>
                <li>Palveluntarjoajillemme (esim. kirjanpito, IT-palvelut) salassapitosopimuksen puitteissa</li>
                <li>Maksunvälittäjille maksujen käsittelyä varten</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">6. Tietoturva</h2>
              <p className="mb-4">
                Huolehdimme henkilötietojesi turvallisuudesta seuraavilla toimenpiteillä:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>SSL-salaus kaikessa tiedonsiirrossa</li>
                <li>Pääsynhallinta ja käyttöoikeuksien rajaus</li>
                <li>Säännölliset tietoturvapäivitykset</li>
                <li>Henkilökunnan tietosuojakoulutus</li>
                <li>Fyysinen turvallisuus toimitiloissamme</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">7. Evästeet</h2>
              <p className="mb-4">
                Käytämme verkkosivustollamme evästeitä parantaaksemme käyttökokemusta.
                Evästeet ovat pieniä tekstitiedostoja, jotka tallentuvat laitteellesi.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <h3 className="font-bold mb-2">Käyttämämme evästetyypit:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Välttämättömät evästeet:</strong> Sivuston toiminnan kannalta oleelliset</li>
                  <li><strong>Analytiikkaevästeet:</strong> Sivuston käytön analysointi (Google Analytics)</li>
                  <li><strong>Toiminnalliset evästeet:</strong> Käyttäjäasetusten muistaminen</li>
                </ul>
              </div>
              <p>
                Voit hallita evästeasetuksia selaimesi asetuksista tai estää evästeiden käytön kokonaan.
                Huomaa, että tämä voi vaikuttaa sivuston toiminnallisuuteen.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">8. Rekisteröidyn oikeudet</h2>
              <p className="mb-4">Sinulla on EU:n tietosuoja-asetuksen mukaisesti seuraavat oikeudet:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Tarkastusoikeus:</strong> Oikeus tarkastaa itseäsi koskevat tiedot</li>
                <li><strong>Oikaisuoikeus:</strong> Oikeus vaatia virheellisten tietojen korjaamista</li>
                <li><strong>Poisto-oikeus:</strong> Oikeus vaatia tietojen poistamista</li>
                <li><strong>Käsittelyn rajoittaminen:</strong> Oikeus rajoittaa tietojen käsittelyä</li>
                <li><strong>Siirto-oikeus:</strong> Oikeus saada tiedot siirrettävässä muodossa</li>
                <li><strong>Vastustamisoikeus:</strong> Oikeus vastustaa tietojen käsittelyä</li>
                <li><strong>Suoramarkkinointi:</strong> Oikeus kieltää suoramarkkinointi</li>
              </ul>
              <p className="mt-4">
                Voit käyttää oikeuksiasi ottamalla yhteyttä meihin sähköpostilla: Info@kiiltoloisto.fi
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">9. Valitusoikeus</h2>
              <p className="mb-4">
                Jos koet, että henkilötietojasi on käsitelty tietosuojalainsäädännön vastaisesti,
                sinulla on oikeus tehdä valitus tietosuojavaltuutetulle:
              </p>
              <div className="bg-silver-50 p-4 rounded-lg">
                <p className="mb-2"><strong>Tietosuojavaltuutetun toimisto</strong></p>
                <p className="mb-2">Käyntiosoite: Ratapihantie 9, 6. krs, 00520 Helsinki</p>
                <p className="mb-2">Postiosoite: PL 800, 00521 Helsinki</p>
                <p className="mb-2">Puhelin: 029 56 66700</p>
                <p>Sähköposti: tietosuoja@om.fi</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">10. Muutokset tietosuojaselosteeseen</h2>
              <p>
                Pidätämme oikeuden päivittää tätä tietosuojaselostetta tarvittaessa.
                Merkittävistä muutoksista ilmoitamme asiakkaillemme sähköpostitse.
                Suosittelemme tutustumaan tietosuojaselosteeseen säännöllisesti.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">11. Yhteystiedot</h2>
              <p className="mb-4">
                Kaikissa tietosuojaan liittyvissä kysymyksissä voit ottaa meihin yhteyttä:
              </p>
              <div className="bg-gold-50 p-6 rounded-lg">
                <p className="mb-2"><strong>Sähköposti:</strong> Info@kiiltoloisto.fi</p>
                <p className="mb-2"><strong>Puhelin:</strong> +358 44 960 8148</p>
                <p className="mb-2"><strong>Postiosoite:</strong> Kiilto & Loisto Autopesu, Läkkisepäntie 15, 00620 Helsinki</p>
                <p className="mt-4 text-sm text-silver-600">
                  Vastaamme tiedusteluihisi 30 päivän kuluessa yhteydenotosta.
                </p>
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