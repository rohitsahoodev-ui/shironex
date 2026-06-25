export interface CustomPlan {
  id: string;
  name: string;
  priceUSD: number;
  ram: string;
  cpu: string;
  disk: string;
  players?: string;
  popular?: boolean;
}

export const MINECRAFT_PLANS: CustomPlan[] = [
  { id: 'mc-dirt', name: 'Dirt Plan', priceUSD: 1.50, ram: '1 GB', cpu: '1 vCPU (Ryzen 9)', disk: '15 GB Gen4 NVMe', players: 'Unlimited Players' },
  { id: 'mc-stone', name: 'Stone Plan', priceUSD: 3.00, ram: '2 GB', cpu: '1 vCPU (Ryzen 9)', disk: '30 GB Gen4 NVMe', players: 'Unlimited Players' },
  { id: 'mc-copper', name: 'Copper Plan', priceUSD: 6.05, ram: '4 GB', cpu: '2 vCPU (Ryzen 9)', disk: '50 GB Gen4 NVMe', players: 'Unlimited Players', popular: true },
  { id: 'mc-emerald', name: 'Emerald Plan', priceUSD: 9.10, ram: '6 GB', cpu: '2 vCPU (Ryzen 9)', disk: '70 GB Gen4 NVMe', players: 'Unlimited Players' },
  { id: 'mc-iron', name: 'Iron Plan', priceUSD: 12.20, ram: '8 GB', cpu: '3 vCPU (Ryzen 9)', disk: '90 GB Gen4 NVMe', players: 'Unlimited Players' },
  { id: 'mc-lapis', name: 'Lapis Plan', priceUSD: 15.25, ram: '10 GB', cpu: '3 vCPU (Ryzen 9)', disk: '110 GB Gen4 NVMe', players: 'Unlimited Players' },
  { id: 'mc-gold', name: 'Gold Plan', priceUSD: 18.30, ram: '12 GB', cpu: '4 vCPU (Ryzen 9)', disk: '140 GB Gen4 NVMe', players: 'Unlimited Players' },
  { id: 'mc-diamond', name: 'Diamond Plan', priceUSD: 24.40, ram: '16 GB', cpu: '4 vCPU (Ryzen 9)', disk: '200 GB Gen4 NVMe', players: 'Unlimited Players' },
];

export const BOT_PLANS: CustomPlan[] = [
  { id: 'bot-basic', name: 'Basic Plan', priceUSD: 1.00, ram: '512 MB', cpu: '0.5 vCPU', disk: '5 GB NVMe' },
  { id: 'bot-starter', name: 'Starter Plan', priceUSD: 1.99, ram: '1 GB', cpu: '1.0 vCPU', disk: '10 GB NVMe' },
  { id: 'bot-advanced', name: 'Advanced Plan', priceUSD: 3.99, ram: '2 GB', cpu: '1.5 vCPU', disk: '15 GB NVMe', popular: true },
  { id: 'bot-premium', name: 'Premium Plan', priceUSD: 5.99, ram: '4 GB', cpu: '2.0 vCPU', disk: '25 GB NVMe' },
  { id: 'bot-elite', name: 'Elite Plan', priceUSD: 8.99, ram: '6 GB', cpu: '3.0 vCPU', disk: '40 GB NVMe' },
];

export const VPS_PLANS: CustomPlan[] = [
  { id: 'vps-starter', name: 'Starter VPS', priceUSD: 4.50, ram: '2 GB DDR5', cpu: '1 Core Ryzen 9', disk: '30 GB Gen4 NVMe' },
  { id: 'vps-advanced', name: 'Advanced VPS', priceUSD: 8.99, ram: '4 GB DDR5', cpu: '2 Cores Ryzen 9', disk: '60 GB Gen4 NVMe', popular: true },
  { id: 'vps-pro', name: 'Pro VPS', priceUSD: 17.50, ram: '8 GB DDR5', cpu: '4 Cores Ryzen 9', disk: '120 GB Gen4 NVMe' },
  { id: 'vps-elite', name: 'Elite VPS', priceUSD: 29.99, ram: '12 GB DDR5', cpu: '6 Cores Ryzen 9', disk: '200 GB Gen4 NVMe' },
  { id: 'vps-titan', name: 'Titan VPS', priceUSD: 49.99, ram: '16 GB DDR5', cpu: '8 Cores Ryzen 9', disk: '300 GB Gen4 NVMe' },
];

export interface DomainTld {
  name: string;
  priceUSD: number;
  promo?: boolean;
}

export const POPULAR_TLDS: DomainTld[] = [
  { name: '.com', priceUSD: 8.99, promo: true },
  { name: '.net', priceUSD: 10.50 },
  { name: '.in', priceUSD: 5.99, promo: true },
  { name: '.xyz', priceUSD: 1.25, promo: true },
  { name: '.tech', priceUSD: 1.99 },
  { name: '.online', priceUSD: 0.99, promo: true },
  { name: '.gg', priceUSD: 24.99 },
  { name: '.fun', priceUSD: 0.95, promo: true }
];

export const HARDWARE_FEATURES = [
  {
    title: 'Ryzen 9 7950X Core Power',
    desc: 'All nodes run on pristine physical AMD Ryzen 9 7950X series CPUs or Intel Core Raptor Lake platforms, maintaining 4.5GHz+ base clock speeds.',
    metric: '4.5GHz+'
  },
  {
    title: 'PCIe Gen4 Enterprise NVMe RAID',
    desc: 'Never suffer disk choke bottlenecks. We lease solely datacenter-grade PCIe Gen4 NVMe storage arrays configured under active hot-spare protection.',
    metric: '7,000 MB/s'
  },
  {
    title: 'Corero SmartWall Scrubbers',
    desc: 'Dual-stage filtering layers shield from deep volumetric Layer 3/4 amplification and persistent Layer 7 packet manipulation continuously.',
    metric: 'Tbit Shield'
  },
  {
    title: 'Isolated Virtualization Layers',
    desc: 'Configured strictly with custom hypervisor isolations. Hard ram and kernel container limitations safeguard individual server metrics.',
    metric: '100% Isolated'
  },
  {
    title: '10 Gbps Elite Transits',
    desc: 'Strategically integrated with multiple premium carrier links including GTT, Level3, Retro, and custom peering nodes directly to reduce ping.',
    metric: '10 Gbps Uplinks'
  },
  {
    title: 'Enterprise DDR5 ECC',
    desc: 'Armed with high-frequency DDR5 Error-Correcting Code RAM matrices to prevent random memory address corruption or service fault cycles.',
    metric: 'DDR5 ECC'
  }
];
