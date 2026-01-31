import { Metadata } from 'next'
import FeaturesSection from "../../components/FeaturesSection"
import LocationsSection from "../../components/LocationsSection"
import VPSPricingSection from "./VPSPricingSection"
import OSSelectionSection from "../../components/vps/OSSelectionSection"
import FAQSection from "../../components/FAQSection"
import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import PanelShowcase from "../../components/PanelShowcase"
import VPSSEOSection from "./VPSSEOSection"

// ✅ METADATOS SEO OPTIMIZADOS
export const metadata: Metadata = {
  title: 'Hosting Minecraft VPS - Crear servidor ahora | Desde $3.99/mes',
  description: 'CPROT te ofrece el Hosting VPS perfecto para tu administrar propio servidor de Minecraft . Es una opcion excelente ya que te entregamos todas las herramientas necesarias...',
  keywords: [
    'vps minecraft',
    'minecraft vps',
    'vps miami',
    'miami vps',
    'vps gaming',
    'gaming vps',
    'minecraft server hosting',
    'hosting minecraft',
    'minecraft hosting',
    'best vps for minecraft',
  ],
  
  openGraph: {
    title: 'Hosting Minecraft VPS - Crear servidor ahora | Desde $3.99/mes',
    description: 'CPROT te ofrece el Hosting VPS perfecto para tu administrar propio servidor de Minecraft . Es una opcion excelente ya que te entregamos todas las herramientas necesarias...',
    url: 'https://cprot.com/vps/usa-vps-minecraft',
    siteName: 'CPROT Hosting',
    images: [
      {
        url: '/og-vps.jpg',
        width: 1200,
        height: 630,
        alt: 'Hosting Minecraft VPS | CPROT',
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Hosting Minecraft VPS - Desde $3.99/mes',
    description: 'CPROT te ofrece el Hosting VPS perfecto para tu administrar propio servidor de Minecraft',
    images: ['/og-vps.jpg'],
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  alternates: {
    canonical: 'https://cprot.com/vps/usa-vps-minecraft ',
  },
}

export default function VPSRyzenMiamiPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0b0f] transition-colors duration-300">
      <Navbar />
      <VPSSEOSection />
      <VPSPricingSection />
      <OSSelectionSection />
      <FAQSection />
      <PanelShowcase />
      <Footer />
    </div>
  )
}