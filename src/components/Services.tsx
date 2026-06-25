import React, { useState } from 'react';
import { MINECRAFT_PLANS, BOT_PLANS, VPS_PLANS, CustomPlan } from '../data';
import { Check, Flame, Sliders, ShoppingCart, Info, CheckCircle2, ChevronRight, HelpCircle, Gamepad2, Terminal, Cpu, ShieldAlert, Zap, Layers } from 'lucide-react';

interface ServicesProps {
  currency: 'USD' | 'EUR' | 'INR';
  onDeployServer: (serverSpecs: {
    name: string;
    type: 'minecraft' | 'vps' | 'bot' | 'dedicated';
    ram: number;
    cpu: number;
    disk: number;
    price: number;
    location: string;
  }) => void;
}

export default function Services({ currency, onDeployServer }: ServicesProps) {
  const [checkoutModal, setCheckoutModal] = useState<CustomPlan | null>(null);
  const [checkoutCategory, setCheckoutCategory] = useState<'minecraft' | 'vps' | 'bot'>('minecraft');
  const [checkoutStep, setCheckoutStep] = useState<1 | 2>(1); // 1 = Review, 2 = Succeeded
  const [customServerName, setCustomServerName] = useState('');
  const [deployedIP, setDeployedIP] = useState('');

  // Currency tables
  const currencyRate = {
    USD: { symbol: '$', rate: 1 },
    EUR: { symbol: '€', rate: 0.92 },
    INR: { symbol: '₹', rate: 83.2 }
  };

  const getPriceFormatted = (priceInUsd: number) => {
    const symbol = currencyRate[currency].symbol;
    const rate = currencyRate[currency].rate;
    return `${symbol}${(priceInUsd * rate).toFixed(2)}`;
  };

  const handleOrderInitiation = (plan: CustomPlan, category: 'minecraft' | 'vps' | 'bot') => {
    setCheckoutModal(plan);
    setCheckoutCategory(category);
    setCheckoutStep(1);
    setCustomServerName(`Shironex-${plan.name.replace(/\s+/g, '-')}`);
  };

  const handleConfirmDeploy = () => {
    if (!checkoutModal) return;

    // Extract numeric values from description strings safely
    const ramSize = parseInt(checkoutModal.ram) || 2;
    const cpuCores = parseInt(checkoutModal.cpu) || 1;
    const diskSize = parseInt(checkoutModal.disk) || 25;

    // Fire actual app deployment simulation so dashboard matches in state
    onDeployServer({
      name: customServerName || checkoutModal.name,
      type: checkoutCategory,
      ram: ramSize,
      cpu: cpuCores,
      disk: diskSize,
      price: checkoutModal.priceUSD,
      location: 'Frankfurt (FRA)', // default nodes location
    });

    // Save temporary IP matching Minecraft guidelines
    setDeployedIP(`143.244.${Math.floor(Math.random() * 210 + 20)}.${Math.floor(Math.random() * 240 + 10)}:${checkoutCategory === 'minecraft' ? '25565' : checkoutCategory === 'vps' ? '22' : '3000'}`);
    setCheckoutStep(2);
  };

  return (
    <div className="space-y-24 bg-[#040406]">

      {/* 1. Minecraft Hosting Section - Horizontal List rows */}
      <section id="minecraft-pricing" className="py-20 px-4 md:px-8 bg-[#040406] border-t border-zinc-900/60 scroll-mt-20">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-purple-950/40 text-purple-400 text-[10px] font-mono tracking-widest uppercase border border-purple-800/10 px-4 py-1.5 rounded-full">
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>Multi-Tenant Game Containers</span>
            </div>
            <h2 className="font-display text-2xl md:text-4xl font-black text-white leading-tight tracking-tight">
              Flexible <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">Minecraft hosting</span> Plans
            </h2>
            <p className="text-zinc-400 text-xs md:text-sm font-sans max-w-lg mx-auto">
              Sustained 20.0 TPS outputs. Highly allocated ECC DDR5 memory strips and Ryzen cores keep modded worlds perfectly smooth.
            </p>
          </div>

          {/* Minecraft Horizontal rows list */}
          <div className="space-y-4">
            
            {/* Table Header line for Desktop sizes */}
            <div className="hidden lg:grid grid-cols-12 gap-4 px-8 py-3 text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest text-left">
              <div className="col-span-3">Tier Name / Spec</div>
              <div className="col-span-2">Memory Alloc</div>
              <div className="col-span-2">Ryzen Core</div>
              <div className="col-span-2">NVMe Storage</div>
              <div className="col-span-2 text-right">Price Monthly</div>
              <div className="col-span-1"></div>
            </div>

            {MINECRAFT_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`text-left bg-[#08080d]/80 border rounded-[18px] px-6 lg:px-8 py-5 flex flex-col lg:grid lg:grid-cols-12 lg:items-center gap-4 transition duration-300 relative overflow-hidden ${
                  plan.popular 
                    ? 'border-purple-500/35 shadow-lg shadow-purple-950/20 bg-gradient-to-r from-[#0d0d16] to-[#08080d]' 
                    : 'border-zinc-900 hover:border-zinc-800 hover:bg-[#0b0b12]'
                }`}
                id={`mc-row-${plan.id}`}
              >
                {/* Popular marker flash */}
                {plan.popular && (
                  <div className="absolute top-0 right-10 bg-gradient-to-r from-purple-600 to-indigo-600 text-[8px] font-mono font-extrabold text-white px-3 py-0.5 rounded-b-md uppercase tracking-wider">
                    Most Popular
                  </div>
                )}

                {/* Main Identity */}
                <div className="col-span-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-950/20 border border-purple-500/10 flex items-center justify-center text-purple-400 font-bold shrink-0">
                    <Gamepad2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-[15px] font-black text-white">{plan.name}</h3>
                    <span className="text-[10px] text-zinc-500 font-mono block">Minecraft Java & Bedrock</span>
                  </div>
                </div>

                {/* Specs Allocations */}
                <div className="col-span-2 flex items-center gap-2 lg:block">
                  <span className="text-[10px] font-mono text-zinc-500 block lg:hidden uppercase">RAM Allocation:</span>
                  <span className="text-sm font-bold text-white font-mono">{plan.ram}</span>
                </div>

                <div className="col-span-2 flex items-center gap-2 lg:block">
                  <span className="text-[10px] font-mono text-zinc-500 block lg:hidden uppercase">CPU Cores:</span>
                  <span className="text-xs text-zinc-300 font-sans">{plan.cpu}</span>
                </div>

                <div className="col-span-2 flex items-center gap-2 lg:block">
                  <span className="text-[10px] font-mono text-zinc-500 block lg:hidden uppercase">Disk Space:</span>
                  <span className="text-xs text-zinc-300 font-mono">{plan.disk}</span>
                </div>

                {/* Real-time convert Currency Price */}
                <div className="col-span-2 flex items-baseline justify-between lg:justify-end gap-1.5 lg:text-right mt-2 lg:mt-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-zinc-900/60">
                  <span className="text-[10px] font-mono text-zinc-500 block lg:hidden uppercase">Base price:</span>
                  <div>
                    <span className="text-md font-black text-white font-mono">{getPriceFormatted(plan.priceUSD)}</span>
                    <span className="text-[10px] text-zinc-500 font-bold">/mo</span>
                  </div>
                </div>

                {/* Order trigger Action button */}
                <div className="col-span-1 lg:text-right">
                  <button
                    onClick={() => handleOrderInitiation(plan, 'minecraft')}
                    className="w-full lg:w-auto px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-[11px] font-extrabold uppercase tracking-widest transition cursor-pointer active:scale-95 shadow-md shadow-purple-950/20 text-center"
                    id={`btn-deploy-mc-${plan.id}`}
                  >
                    Deploy
                  </button>
                </div>

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* 2. Bot Hosting Section - Glassmorphism cards with purple themes */}
      <section id="bot-pricing" className="py-20 px-4 md:px-8 bg-[#040406] border-t border-zinc-900/60 scroll-mt-20 relative">
        <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-fuchsia-600/5 rounded-full filter blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Header titles */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-purple-950/40 text-purple-400 text-[10px] font-mono tracking-widest uppercase border border-purple-800/10 px-4 py-1.5 rounded-full">
              <Terminal className="w-3.5 h-3.5" />
              <span>Isolated Runtime Containers</span>
            </div>
            <h2 className="font-display text-2xl md:text-4xl font-black text-white leading-tight tracking-tight">
              Express <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">Bot Hosting</span> plans
            </h2>
            <p className="text-zinc-400 text-xs md:text-sm font-sans max-w-lg mx-auto">
              Run custom Node.js, Python, JDA, or C# Discord bots 24/7/365 without timeouts, rate limits, or cold spin downs.
            </p>
          </div>

          {/* Bot pricing layout matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {BOT_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`bg-[#07070c]/70 border rounded-[22px] p-5.5 text-left flex flex-col justify-between transition duration-300 relative ${
                  plan.popular
                    ? 'border-purple-500/45 ring-1 ring-purple-500/25 bg-radial from-[#10101b] to-[#07070c] shadow-lg shadow-purple-950/10'
                    : 'border-zinc-900 hover:border-zinc-800 hover:scale-[1.01]'
                }`}
                id={`bot-card-${plan.id}`}
              >
                <div className="space-y-4">
                  
                  {/* Identity */}
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xs font-black text-white uppercase tracking-wider">{plan.name}</span>
                    <Terminal className="w-4 h-4 text-purple-400" />
                  </div>

                  {/* Price */}
                  <div>
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-2xl font-black text-white font-mono">{getPriceFormatted(plan.priceUSD)}</span>
                      <span className="text-[10px] text-zinc-500 font-bold">/mo</span>
                    </div>
                    <span className="text-[9px] text-zinc-500 font-mono block mt-0.5">Cancel anytime without penalty</span>
                  </div>

                  {/* Specifications and lists */}
                  <div className="space-y-2 pt-3 border-t border-zinc-900/60 text-[11px] text-zinc-350 font-mono">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-500">RAM Limit:</span>
                      <span className="text-white font-bold">{plan.ram}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-500">CPU Thread:</span>
                      <span className="text-white">{plan.cpu}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-500">Disk Alloc:</span>
                      <span className="text-white">{plan.disk}</span>
                    </div>
                  </div>

                </div>

                <button
                  onClick={() => handleOrderInitiation(plan, 'bot')}
                  className="w-full mt-6 py-2.5 bg-gradient-to-b from-zinc-900 to-zinc-950 hover:from-purple-600 hover:to-purple-700 text-zinc-300 hover:text-white border border-zinc-850 hover:border-purple-500/30 rounded-lg text-[10px] font-bold uppercase tracking-widest transition cursor-pointer text-center"
                >
                  Order Bot
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. VPS Hosting Section - Columns with Core, Memory, SSD and IPv4 details */}
      <section id="vps-pricing" className="py-20 px-4 md:px-8 bg-[#040406] border-t border-zinc-900/60 scroll-mt-20 relative">
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/5 rounded-full filter blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Title Headers */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-purple-950/40 text-purple-400 text-[10px] font-mono tracking-widest uppercase border border-purple-800/10 px-4 py-1.5 rounded-full">
              <Cpu className="w-3.5 h-3.5" />
              <span>Full KVM virtualization VPS</span>
            </div>
            <h2 className="font-display text-2xl md:text-4xl font-black text-white leading-tight tracking-tight">
              Elite <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">Cloud VPS Hosting</span> plans
            </h2>
            <p className="text-zinc-400 text-xs md:text-sm font-sans max-w-lg mx-auto">
              Equipped with dedicated IPv4 addresses, full root shell access, automated backup arrays, and unmetered network transfer pipes.
            </p>
          </div>

          {/* VPS Pricing Columns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {VPS_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`bg-[#07070c]/50 border rounded-[22px] p-6 text-left flex flex-col justify-between transition-all duration-300 ${
                  plan.popular
                    ? 'border-purple-500/40 bg-gradient-to-b from-[#0e0e1a]/80 to-[#07070c]/80 scale-[1.01]'
                    : 'border-zinc-900 hover:border-zinc-800 hover:scale-[1.01]'
                }`}
                id={`vps-card-${plan.id}`}
              >
                <div className="space-y-4">
                  
                  {/* Category Name */}
                  <div className="space-y-1">
                    <span className="text-[12px] font-display font-black text-white uppercase tracking-wider block">{plan.name}</span>
                    <span className="inline-flex items-center gap-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md font-mono">
                      KVM ROOT ACCESS
                    </span>
                  </div>

                  {/* Pricing Info */}
                  <div>
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-2xl font-black text-white font-mono">{getPriceFormatted(plan.priceUSD)}</span>
                      <span className="text-[11px] text-zinc-500 font-semibold">/mo</span>
                    </div>
                    <span className="text-[9px] font-mono text-zinc-500 block mt-0.5">1 IPv4 IP Included</span>
                  </div>

                  {/* Specifications and details */}
                  <div className="space-y-3.5 pt-4 border-t border-zinc-900/60 text-xs text-zinc-300 font-sans">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-purple-400 shrink-0" />
                      <div>
                        <span className="text-[9px] text-zinc-500 block font-mono uppercase leading-none">Compute</span>
                        <strong className="text-zinc-200 mt-0.5 block leading-none font-semibold text-xs">{plan.cpu}</strong>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-purple-400 shrink-0" />
                      <div>
                        <span className="text-[9px] text-zinc-500 block font-mono uppercase leading-none">DDR5 Speed</span>
                        <strong className="text-zinc-200 mt-0.5 block leading-none font-semibold text-xs">{plan.ram}</strong>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                      <div>
                        <span className="text-[9px] text-zinc-500 block font-mono uppercase leading-none">SSD Disk</span>
                        <strong className="text-zinc-200 mt-0.5 block leading-none font-semibold text-xs">{plan.disk}</strong>
                      </div>
                    </div>
                  </div>

                </div>

                <button
                  onClick={() => handleOrderInitiation(plan, 'vps')}
                  className="w-full mt-8 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition duration-200 hover:scale-[1.02] shadow-md shadow-purple-950/20 text-center"
                >
                  Deploy VPS
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Checkout review Dialog/Drawer modal */}
      {checkoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={() => setCheckoutModal(null)}></div>
          
          <div className="relative bg-[#0d0d12] border border-purple-900/30 w-full max-w-md rounded-[24px] p-6 md:p-8 shadow-2xl z-50 text-left overflow-hidden">
            
            {/* Visual background lights */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full filter blur-2xl pointer-events-none" />

            {checkoutStep === 1 ? (
              <div className="space-y-6">
                
                {/* Header Title */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase font-black text-purple-400 tracking-widest block">Review Hypervisor Package</span>
                  <h3 className="font-display text-lg font-black text-white">Shironex Allocation Module</h3>
                </div>

                <div className="space-y-3">
                  <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-900 space-y-3.5 text-xs">
                    
                    <div className="flex flex-col gap-1.5 border-b border-zinc-900/80 pb-3">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">Custom Instance Label</span>
                      <input
                        type="text"
                        value={customServerName}
                        onChange={(e) => setCustomServerName(e.target.value)}
                        placeholder="Write server label..."
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div className="flex justify-between border-b border-zinc-900/40 pb-2">
                      <span className="text-zinc-500">Tier Name:</span>
                      <strong className="text-white">{checkoutModal.name}</strong>
                    </div>

                    <div className="flex justify-between border-b border-zinc-900/40 pb-2">
                      <span className="text-zinc-500">CPU Thread Limit:</span>
                      <strong className="text-white">{checkoutModal.cpu}</strong>
                    </div>

                    <div className="flex justify-between border-b border-zinc-900/40 pb-2">
                      <span className="text-zinc-500">DDR5 RAM:</span>
                      <strong className="text-white">{checkoutModal.ram}</strong>
                    </div>

                    <div className="flex justify-between border-b border-zinc-900/40 pb-2">
                      <span className="text-zinc-500">Data Center Location:</span>
                      <strong className="text-purple-400 font-semibold">Frankfurt FRA-AM5</strong>
                    </div>

                    <div className="flex justify-between pt-1">
                      <span className="text-zinc-400 font-bold">Total price:</span>
                      <strong className="text-emerald-400 font-black text-sm">{getPriceFormatted(checkoutModal.priceUSD)}/mo</strong>
                    </div>

                  </div>

                  <div className="flex items-start gap-2 bg-purple-950/20 border border-purple-500/10 rounded-xl p-3 text-[11px] text-zinc-400 leading-relaxed font-sans">
                    <Info className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>Your allocation script loads immediately. No setup fees, no active contracts, terminate or downgrade anytime.</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => setCheckoutModal(null)}
                    className="py-3 bg-zinc-900 hover:bg-zinc-850 border border-zinc-850 hover:border-zinc-800 text-zinc-400 hover:text-white rounded-xl text-xs font-bold uppercase tracking-widest transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmDeploy}
                    className="py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-black uppercase tracking-widest transition cursor-pointer shadow-lg shadow-purple-950/40 border border-purple-500/20 active:scale-95"
                  >
                    Deploy Node
                  </button>
                </div>

              </div>
            ) : (
              <div className="space-y-6 text-center py-3">
                <div className="w-14 h-14 bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 animate-bounce" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-display text-md font-black text-white">Server Provisioned successfully!</h3>
                  <p className="text-zinc-400 text-xs leading-relaxed max-w-xs mx-auto font-sans font-light">
                    Your customized server node <strong className="text-emerald-400">{customServerName || checkoutModal.name}</strong> was successfully allocated on Frankfurt hypervisors.
                  </p>
                </div>

                <div className="bg-zinc-950 rounded-xl border border-zinc-900 p-3.5 max-w-xs mx-auto font-mono text-center">
                  <span className="text-[9px] text-zinc-500 uppercase tracking-widest block leading-none">Temporary routing address</span>
                  <code className="text-xs text-emerald-400 font-bold block mt-1.5 tracking-wide">{deployedIP}</code>
                </div>

                <div className="space-y-2.5 pt-2">
                  <a
                    href="https://panel.shironex.fun/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl font-black text-xs uppercase tracking-widest transition text-center shadow-md block"
                  >
                    Launch Live Console Panel
                  </a>
                  <button
                    onClick={() => setCheckoutModal(null)}
                    className="text-xs text-zinc-500 hover:text-white transition font-bold"
                  >
                    Stay on website
                  </button>
                </div>

              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
