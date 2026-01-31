"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
  Cpu,
  MemoryStick,
  HardDrive,
  ChevronLeft,
  ChevronRight,
  Info,
  X,
  Shield,
  Zap,
  Headphones,
  ArrowUpDown,
  MapPin
} from "lucide-react"
import { useState, useRef, useEffect, useCallback, useMemo } from "react"
import Image from "next/image"
import vpsConfig from "../../config/sections/vps.json"
import type { VPSConfig } from "../../types/vps"
import { useCurrency } from "../ui/CurrencySelector"

const config = vpsConfig as VPSConfig

export default function VPSPricingSection() {
  const { convertPrice } = useCurrency()

  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const [selectedLocation, setSelectedLocation] = useState(config.locations[0].id)
  const [selectedCPU, setSelectedCPU] = useState(config.planTypes[0].id)
  const [detailsModal, setDetailsModal] = useState<string | null>(null)

  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  /* =======================
     MEMOS
  ======================= */

  const currentLocation = useMemo(
    () => config.locations.find(loc => loc.id === selectedLocation),
    [selectedLocation]
  )

  const availableCPUs = useMemo(
    () => currentLocation?.availableCpus || [],
    [currentLocation]
  )

  const currentPlans = useMemo(
    () => config.plans[selectedCPU] || config.plans[config.planTypes[0].id],
    [selectedCPU]
  )

  /* =======================
     HANDLERS
  ======================= */

  const handleCPUSelection = useCallback((cpuId: string) => {
    setSelectedCPU(cpuId)
    const currentLoc = config.locations.find(loc => loc.id === selectedLocation)

    if (currentLoc && !currentLoc.availableCpus.includes(cpuId)) {
      const compatibleLocation = config.locations.find(loc =>
        loc.availableCpus.includes(cpuId)
      )
      if (compatibleLocation) {
        setSelectedLocation(compatibleLocation.id)
      }
    }
  }, [selectedLocation])

  const handleLocationSelection = useCallback((locationId: string) => {
    setSelectedLocation(locationId)
    const newLocation = config.locations.find(loc => loc.id === locationId)

    if (newLocation && !newLocation.availableCpus.includes(selectedCPU)) {
      setSelectedCPU(newLocation.availableCpus[0])
    }
  }, [selectedCPU])

  /* =======================
     SCROLL OPTIMIZADO
  ======================= */

  useEffect(() => {
    const el = scrollContainerRef.current
    if (!el) return

    const updateScrollState = () => {
      setCanScrollLeft(el.scrollLeft > 0)
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
    }

    updateScrollState()
    el.addEventListener("scroll", updateScrollState, { passive: true })
    window.addEventListener("resize", updateScrollState)

    return () => {
      el.removeEventListener("scroll", updateScrollState)
      window.removeEventListener("resize", updateScrollState)
    }
  }, [currentPlans])

  const scroll = (dir: "left" | "right") => {
    scrollContainerRef.current?.scrollBy({
      left: dir === "left" ? -350 : 350,
      behavior: "smooth"
    })
  }

  /* =======================
     JSX
  ======================= */

  return (
    <section className="bg-black relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* TODO: TU JSX NO CAMBIA */}

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <p 
            className="text-gray-200 text-sm uppercase tracking-wider mb-2"
          >
            
          </p>
          <h1 
            className="text-4xl lg:text-5xl font-bold text-white mb-2"
          >
            Encuentra <span className="text-blue-500">nuestros planes</span>
          </h1>
        </div>

        {/* Filters */}
        <div
          className="mb-12 space-y-6"
        >
          {/* Location Filter */}
          <div className="flex flex-col">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">1. Ubicación</h2>
            <div className="flex flex-wrap gap-3">
              {config.locations.map((location) => {
                const hasAvailableCpus = location.availableCpus.length > 0
                const isSelected = selectedLocation === location.id
                
                return (
                  <button
                    key={location.id}
                    onClick={() => handleLocationSelection(location.id)}
                    disabled={!hasAvailableCpus}
                    aria-label={`Seleccionar ubicación ${location.displayName}`}
                    className={`flex items-center gap-2.5 px-5 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      isSelected
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105"
                        : hasAvailableCpus
                        ? "bg-gray-800/50 border border-gray-700/50 text-gray-300 hover:bg-gray-700/50 hover:border-gray-600"
                        : "bg-gray-800/20 border border-gray-800 text-gray-600 cursor-not-allowed opacity-50"
                    }`}
                  >
                    <Image
                      style={{width:"auto", height:"auto"}}
                      src={location.flag || "/placeholder.webp"}
                      alt={`Bandera de ${location.name}`}
                      width={24}
                      height={16}
                      className={`object-cover rounded ${!hasAvailableCpus ? 'opacity-50' : ''}`}
                      loading="lazy"
                    />
                    <span className="text-sm">{location.displayName}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* CPU Type Filter */}
          <div className="flex flex-col">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">2. Tipo de CPU</h2>
            <div className="flex flex-wrap gap-3">
              {config.planTypes.map((cpu) => {
                const isAvailable = availableCPUs.includes(cpu.id)
                const isSelected = selectedCPU === cpu.id
                
                return (
                  <button
                    key={cpu.id}
                    onClick={() => handleCPUSelection(cpu.id)}
                    disabled={!isAvailable}
                    aria-label={`Seleccionar CPU ${cpu.displayName}`}
                    className={`flex items-center gap-3 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      isSelected
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105"
                        : isAvailable
                        ? "bg-gray-800/50 border border-gray-700/50 text-gray-300 hover:bg-gray-700/50 hover:border-gray-600"
                        : "bg-gray-800/20 border border-gray-800 text-gray-600 cursor-not-allowed opacity-50"
                    }`}
                  >
                    <Image
                      src={cpu.image || "/placeholder.svg"}
                      alt={`Logo ${cpu.name}`}
                      width={28}
                      height={28}
                      className={`rounded object-contain ${!isAvailable ? 'opacity-50' : ''}`}
                      loading="lazy"
                    />
                    <span className="text-sm">{cpu.displayName}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
        
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">3. Elige tu Plan</h2>

        {/* Carousel Container */}
        <div className="relative mb-16">
          {/* Scroll Buttons - Desktop */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 w-12 h-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl shadow-blue-500/30 hover:bg-blue-700 hover:scale-110 transition-all"
              aria-label="Scroll izquierda"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 w-12 h-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl shadow-blue-500/30 hover:bg-blue-700 hover:scale-110 transition-all"
              aria-label="Scroll derecha"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide lg:px-2"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {currentPlans.map((plan, index) => (
              <motion.article
                key={plan.id}
                className="flex-shrink-0 w-[300px] snap-center group"
              >
                <div className="h-full bg-[#0a0a0a] to-black border border-gray-800 hover:border-blue-500/50 rounded-2xl p-6 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 relative overflow-hidden">
                  
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="mb-6">
                      <div className="flex items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-gray-800/80 border-gray-700 p-0 flex items-center justify-center">
                            <Image
                              src={plan.image || "/placeholder.svg"}
                              alt={`Plan ${plan.name}`}
                              width={48}
                              height={48}
                              className="object-contain"
                              loading="lazy"
                            />
                          </div>
                        </div>
                        <div className="p-0 ml-2">
                          <h3 className="text-2xl font-bold">{plan.name}</h3>
                        </div>
                      </div>
                      <p className="text-sm text-gray-300">
                        {plan.description}
                      </p>
                    </div>

                    {/* Specs */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Cpu className="w-4 h-4 text-blue-400" />
                          <span className="text-sm">CPU</span>
                        </div>
                        <span className="text-lg font-bold text-blue-400">{plan.cpu}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MemoryStick className="w-4 h-4 text-blue-400" />
                          <span className="text-sm">RAM</span>
                        </div>
                        <span className="text-lg font-bold text-blue-400">{plan.ram}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <HardDrive className="w-4 h-4 text-blue-400" />
                          <span className="text-sm">Storage</span>
                        </div>
                        <span className="text-lg font-bold text-blue-400">{plan.storage}</span>
                      </div>

                      {/* Additional Info */}
                      <div className="pt-3 border-t border-gray-800">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4" />
                          <span className="text-s font-bold">{plan.bandwidth} {plan.bandwidthDetail}</span>
                        </div>
                      </div>
                    </div>


                    {/* Price */}
                    <div className="mb-6">
                      {plan.oferta && (
                        <span className="px-0 py-0 bg-yellow-500/20 text-yellow-400 text-xs font-bold">
                          PROMOCION: {plan.oferta} PERMANENTE
                        </span>
                      )}
                      {plan.badge && (
                        <p className="text-sm text-gray-300 line-through mb-1">{plan.badge}</p>
                      )}
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-blue-500">{convertPrice(plan.price)}</span>
                        <span className="text-gray-400">{plan.period}</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <a 
                      href={plan.orderLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-xl font-bold transition-all duration-300 text-center no-underline flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-blue-500/30"
                    >
                      Deploy Now
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>

                    {/* Info Button */}
                    <button
                      onClick={() => setDetailsModal(plan.id)}
                      className="w-full mt-3 flex items-center justify-center gap-2 text-gray-300 hover:text-blue-400 transition-colors text-sm"
                    >
                      <Info className="w-4 h-4" />
                      Ver especificaciones completas
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* General Features Section */}
        <div
          className="border bg-[#0a0a0a] border-gray-800 rounded-2xl p-8 backdrop-blur-sm"
        >
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Características Incluidas en Todos los Planes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* DDoS Protection */}
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Proteccion AntiDDoS</h3>
                <p className="text-sm text-gray-400">Incluye protección básica de 100G. Protección adicional de 5Tbps Voxility disponible desde <span className="text-blue-400 font-semibold">€9.99/mes</span></p>
              </div>
            </div>

            {/* Uplink */}
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">2Gbps Uplink</h3>
                <p className="text-sm text-gray-400">Disfruta de velocidades ultrarrápidas en todos nuestros planes VPS.</p>
              </div>
            </div>

            {/* Professional Support */}
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <Headphones className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Soporte Profesional</h3>
                <p className="text-sm text-gray-400">Equipo técnico disponible <span className="text-blue-400 font-semibold">para todos los clientes</span> en menos de 1 hora.</p>
              </div>
            </div>

            {/* Upgrade/Downgrade */}
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <ArrowUpDown className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Flexibilidad Total</h3>
                <p className="text-sm text-gray-400">Aumenta o reduce recursos <span className="text-blue-400 font-semibold">sin costo adicional</span> según tus necesidades.</p>
              </div>
            </div>

            {/* Multiple Locations */}
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Excelente ubicacion</h3>
                <p className="text-sm text-gray-400">Servidores en <span className="text-blue-400 font-semibold">  Miami, FL.</span> con latencia mejorada a México, LATAM y Europa.</p>
              </div>
            </div>

            {/* NVMe Storage */}
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <HardDrive className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Almacenamiento NVMe</h3>
                <p className="text-sm text-gray-400">Discos <span className="text-blue-400 font-semibold">NVMe ultra-rápidos</span> para máxima velocidad de lectura/escritura</p>
              </div>
            </div>
          </div>
        </div>

        {/* Details Modal */}
        <AnimatePresence>
          {detailsModal && (
            <div
              onClick={() => setDetailsModal(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                {(() => {
                  const plan = currentPlans.find(p => p.id === detailsModal)
                  if (!plan) return null

                  return (
                    <>
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-xl bg-gray-800/80 border border-gray-700 p-3 flex items-center justify-center">
                            <Image
                              src={plan.image || "/placeholder.svg"}
                              alt={`Plan ${plan.name}`}
                              width={48}
                              height={48}
                              className="object-contain"
                            />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-1">{plan.name}</h3>
                            <p className="text-lg text-blue-400 font-bold">
                              {convertPrice(plan.price)}
                              <span className="text-sm text-gray-400 font-normal">{plan.period}</span>
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => setDetailsModal(null)}
                          className="p-2 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors flex-shrink-0"
                          aria-label="Cerrar detalles"
                        >
                          <X className="w-5 h-5 text-gray-400" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Cpu className="w-5 h-5 text-blue-400" />
                            <h4 className="text-sm font-semibold text-gray-200">Procesador</h4>
                          </div>
                          <p className="text-xl font-bold text-white mb-1">{plan.cpu}</p>
                          <p className="text-xs text-gray-400">{plan.cpuDetail}</p>
                        </div>

                        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <MemoryStick className="w-5 h-5 text-blue-400" />
                            <h4 className="text-sm font-semibold text-gray-200">Memoria RAM</h4>
                          </div>
                          <p className="text-xl font-bold text-white mb-1">{plan.ram}</p>
                          <p className="text-xs text-gray-400">{plan.ramDetail}</p>
                        </div>

                        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <HardDrive className="w-5 h-5 text-blue-400" />
                            <h4 className="text-sm font-semibold text-gray-300">Almacenamiento</h4>
                          </div>
                          <p className="text-xl font-bold text-white mb-1">{plan.storage}</p>
                          <p className="text-xs text-gray-400">{plan.storageDetail}</p>
                        </div>

                        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Zap className="w-5 h-5 text-blue-400" />
                            <h4 className="text-sm font-semibold text-gray-300">Ancho de Banda</h4>
                          </div>
                          <p className="text-xl font-bold text-white mb-1">{plan.bandwidth}</p>
                          <p className="text-xs text-gray-400">{plan.bandwidthDetail}</p>
                        </div>

                        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Shield className="w-5 h-5 text-blue-400" />
                            <h4 className="text-sm font-semibold text-gray-300">Protección DDoS</h4>
                          </div>
                          <p className="text-xl font-bold text-white mb-1">{plan.antiddos}</p>
                          <p className="text-xs text-gray-400">{plan.antiddosDetail}</p>
                        </div>

                        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                            <h4 className="text-sm font-semibold text-gray-300">Uplink</h4>
                          </div>
                          <p className="text-xl font-bold text-white mb-1">{plan.uplink}</p>
                          <p className="text-xs text-gray-400">{plan.uplinkDetail}</p>
                        </div>
                      </div>

                      <a 
                        href={plan.orderLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl font-bold transition-colors text-center no-underline flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                      >
                        Contratar YA
                        <ChevronRight className="w-5 h-5" />
                      </a>
                    </>
                  )
                })()}
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}