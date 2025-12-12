import SiteHeader from '@/components/site/SiteHeader'
import Hero from '@/components/home/Hero'
import ManifestoSection from '@/components/home/ManifestoSection'
import ContactSection from '@/components/home/ContactSection'

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <ManifestoSection />
        <ContactSection />
      </main>
    </>
  )
}
