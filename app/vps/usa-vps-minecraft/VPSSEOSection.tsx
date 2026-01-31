"use client"

import { Server, Zap, Shield, Globe, TrendingUp, CheckCircle2 } from "lucide-react"
import Image from "next/image"
import vpsConfig from "../../config/sections/vpsSEO.json"
import type { VPSConfig } from "../../types/vps"

const config = vpsConfig as VPSConfig

export default function VPSSEOSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] "
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px]"
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10" />
        
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div
            className="space-y-8"
          >

            {/* H1 Title - SEO Critical */}
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight orbitron-font"
            >
              Hosting VPS Minecraft
            </h1>

            {/* Description */}
            <p
              className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-xl"
            >
              Un VPS puede ser usado para alojar tu propio servidor de Minecraft, brindándote control total sobre la configuración, mods y rendimiento del servidor. Ideal para jugadores que buscan una experiencia personalizada y estable.
            </p>


            {/* CTA Buttons */}
            <div
              className="flex flex-wrap gap-4"
            >
              <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-white shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/70 transition-all hover:scale-105 overflow-hidden">
                <a href="#planes" className="relative z-10 flex items-center gap-2">
                  Ver Planes
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              
              <a href="https://lobby.cprot.net/submitticket.php" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-xl font-bold text-white border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all hover:scale-105">
                Contactar Soporte
              </a>
            </div>

            {/* Trust Badges */}
            <div
              className="flex flex-wrap items-center gap-6 pt-4"
            >
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>Setup en 5 minutos</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>Soporte 24/7</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>Sin contratos</span>
              </div>
            </div>
          </div>

          {/* Right Visual - Server Illustration */}
          <div
            className="relative hidden lg:block"
          >
            {/* Main Server Image Container */}
            <div className="relative">
              {/* Glow Effect */}
              <div
                className="absolute inset-0"
              />
              
              {/* Server Image - ESTA ES LA QUE CREARÁS EN CANVA */}
              <div className="relative z-10 overflow-hidden border-none">
                <Image
                  src="/server-vps.png"
                  alt="Servidor VPS AMD Ryzen de alta performance"
                  width={600}
                  height={700}
                  priority
                  quality={90}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg className="w-full h-32 sm:h-40" viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="#000000"/>
        </svg>
      </div>
    </section>
  )
}