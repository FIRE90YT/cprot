import { Metadata } from 'next';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TermsSections from './TermsSections';


export const metadata: Metadata = {
  title: 'CPROT LEGAL - Términos de Servicio',
  description: 'Aquí encontrarás los términos de servicio que rigen el uso de nuestros productos y servicios en CPROT. Lee detenidamente para entender tus derechos y responsabilidades al utilizar nuestra plataforma.',
  keywords: [
    'cprot legal',
    'cprot términos de servicio',
    'cprot tos',
    'cprot políticas',
    'cprot condiciones de uso',
    'cprot términos legales',
    'cprot servicio',
    'cprot términos y condiciones',
    'cprot acuerdo de usuario',
    'cprot',
  ],
  
  openGraph: {
    title: 'CPROT LEGAL - Términos de Servicio',
    description: 'Aquí encontrarás los términos de servicio que rigen el uso de nuestros productos y servicios en CPROT. Lee detenidamente para entender tus derechos y responsabilidades al utilizar nuestra plataforma.',
    url: 'https://cprot.com/terms-of-service',
    siteName: 'CPROT Legal',
    locale: 'es_MX',
    type: 'website',
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'CPROT LEGAL - Términos de Servicio',
    description: 'Aquí encontrarás los términos de servicio que rigen el uso de nuestros productos y servicios en CPROT. Lee detenidamente para entender tus derechos y responsabilidades al utilizar nuestra plataforma.',
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
    canonical: 'https://cprot.com/terms-of-service',
  },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0b0f] transition-colors duration-300">
      <Navbar />
      <TermsSections />
      <Footer />
    </div>
  )
}