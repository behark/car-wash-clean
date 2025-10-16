'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { siteConfig } from '@/lib/siteConfig'
import { CheckCircle, Award, Users, Clock, Shield, Heart } from 'lucide-react'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 text-white py-16 sm:py-20 lg:py-24">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
          </div>
          
          <div className="relative container mx-auto px-4 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Meistä
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-purple-100 max-w-3xl mx-auto px-4">
              {siteConfig.tagline}
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-12 mb-12">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
                  Tarinамme
                </h2>
                <div className="prose prose-lg max-w-none text-slate-700 space-y-4">
                  <p>
                    <strong>{siteConfig.name}</strong> on perustettu vuonna 2010 intohimosta autojen hoitoon ja 
                    asiakaspalveluun. Olemme kasvaneet pienestä perheyritыksestä Helsingin luotetuimmaksi 
                    autopesupalveluksi.
                  </p>
                  <p>
                    Yli {siteConfig.features.years} vuoden kokemuksella olemme palvelleet yli {siteConfig.features.customers} 
                    tyytyväistä asiakasta. Jokainen auto on meille tärkeä, ja tarjoamme sille ansaitsemansa 
                    huolellisen ja ammattimaisen hoidon.
                  </p>
                  <p>
                    Käytämme vain laadukkaita tuotteita ja moderneja menetelmiä varmistaaksemme parhaan 
                    mahdollisen tuloksen jokaiselle asiakkaallemme. Tiimimme koostuu koulutetuista 
                    ammattilaisista, jotka rakastavat työtään.
                  </p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
                <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">
                    {siteConfig.features.years}
                  </div>
                  <div className="text-sm text-slate-600">Vuotta kokemusta</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">
                    {siteConfig.features.customers}
                  </div>
                  <div className="text-sm text-slate-600">Tyytyväistä asiakasta</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">
                    {siteConfig.features.rating}
                  </div>
                  <div className="text-sm text-slate-600">⭐ Keskiarvo</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">100%</div>
                  <div className="text-sm text-slate-600">Tyytyväisyystakuu</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                Arvomme
              </h2>
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
                Nämä periaatteet ohjaavat työtämme joka päivä
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 sm:p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Laatu</h3>
                <p className="text-slate-700">
                  Käytämme vain parhaita tuotteita ja menetelmiä varmistaaksemme huippuluokan tuloksen.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 sm:p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Intohimo</h3>
                <p className="text-slate-700">
                  Rakastamme sitä mitä teemme, ja se näkyy jokaisen auton lopputuloksessa.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 sm:p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Asiakaspalvelu</h3>
                <p className="text-slate-700">
                  Asiakkaamme ovat meille tärkein prioriteetti. Kuuntelemme ja vastaamme tarpeisiin.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 sm:p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Luotettavuus</h3>
                <p className="text-slate-700">
                  Pidämme lupauksemme ja aikataulumme. Voit luottaa meihin.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 sm:p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Turvallisuus</h3>
                <p className="text-slate-700">
                  Autosi on turvassa käsissämme. Vakuutukset ja sertifikaatit kunnossa.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 sm:p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Ympäristö</h3>
                <p className="text-slate-700">
                  Käytämme ympäristöystävällisiä tuotteita ja vedensäästömenetelmiä.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                Sertifikaatit & Pätevyydet
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto">
              {siteConfig.certifications.map((cert, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm text-center hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-6 h-6 text-purple-600" />
                  </div>
                  <p className="text-sm font-medium text-slate-700">{cert}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 bg-gradient-to-br from-purple-600 to-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
              Haluatko tietää lisää?
            </h2>
            <p className="text-base sm:text-lg text-purple-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Ota yhteyttä tai tule käymään! Olemme valmiina palvelemaan sinua.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center bg-white text-purple-600 font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-purple-50 transition-colors"
              >
                Ota yhteyttä
              </a>
              <a
                href="/booking"
                className="inline-flex items-center justify-center bg-purple-500/20 backdrop-blur-md border border-white/20 hover:bg-purple-500/30 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-colors"
              >
                Varaa aika
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
