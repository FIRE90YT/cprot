import { ReactNode } from "react"

export interface VPSPlan {
  antiddosDetail: ReactNode
  uplinkDetail: ReactNode
  uplink: ReactNode
  antiddos: ReactNode
  id: string
  name: string
  description?: string
  badge?: string
  image: string
  oferta: string
  cpu: string
  cpuDetail: string
  ram: string
  ramDetail: string
  storage: string
  storageDetail: string
  bandwidth?: string
  bandwidthDetail?: string
  price: string
  period: string
  orderLink: string
}

export interface VPSPlanType {
  id: string
  name: string
  displayName: string
  image: string
}

export interface VPSLocation {
  id: string
  name: string
  flag: string
  displayName: string
  availableCpus: string[]
}

export interface VPSHeader {
  badge: {
    text: string
  }
  title: string
  description: string
  description1: string
}

export interface VPSConfig {
  header: VPSHeader
  planTypes: VPSPlanType[]
  locations: VPSLocation[]
  plans: {
    [key: string]: VPSPlan[]
  }
}
