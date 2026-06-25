import React from 'react';
import { Shield, Zap, Globe, Sparkles, Terminal, ChevronRight, Gamepad2, Layers, Cpu, HeartHandshake } from 'lucide-react';

interface HeroProps {
  onDeployClick: (category: 'minecraft' | 'vps' | 'bot') => void;
  scrollToSection: (id: string) => void;
}

export default function Hero({ onDeployClick, scrollToSection }: HeroProps) {
  const categories = [
    { label: 'Game Servers', icon: Gamepad2, targetId: 'minecraft-pricing' },
    { label: 'Cloud VPS', icon: Cpu, targetId: 'vps-pricing' },
    { label: 'Discord Bots', icon: Terminal, targetId: 'bot-pricing' },
    { label: 'Special Deals', icon: Sparkles, targetId: 'minecraft-pricing' }
  ];

  return (
    <section id="hero-section" className="relative pt-24 pb-20 px-4 md:px-8 bg-[#040406] cosmic-grid overflow-hidden">
      
      {/* Radiant Glow Lights */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[450px] h-[450px] bg-purple-700/10 rounded-full filter blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/4 right-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-indigo-700/10 rounded-full filter blur-[90px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 text-left">
        
        {/* Left Column Text details */}
        <div className="lg:col-span-7 space-y-7">
          
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-950/40 via-indigo-950/40 to-black/30 border border-purple-500/20 rounded-full px-4.5 py-1.5 text-xs text-purple-300 font-extrabold uppercase tracking-widest backdrop-blur-md shadow-lg shadow-purple-950/10">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping shrink-0" />
            <span className="flex items-center gap-1.5 font-mono text-[10px]">
              <Shield className="w-3.5 h-3.5 text-purple-400" />
              1.2 Tbit Layer-4 Shield Mitigations Active
            </span>
          </div>

          {/* Majestic Header */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
            Host your own <br />
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-500 font-extrabold pr-2">
              Minecraft
            </span>
            <span className="text-white">Servers</span>
          </h1>

          {/* Subtitle */}
          <p className="text-zinc-350 text-sm sm:text-base lg:text-[15px] font-sans font-normal max-w-xl leading-relaxed">
            Experience lightning-fast performance, unbeatable reliability, and 24/7 support for all your favorite games.
          </p>

          {/* Category Pill select deck */}
          <div className="space-y-3">
            <span className="text-[10px] font-mono font-extrabold text-zinc-500 uppercase tracking-widest block">Choose Your Infrastructure Tier:</span>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToSection(cat.targetId)}
                  className="flex items-center gap-2 px-4 py-2 bg-zinc-950/70 border border-zinc-850 hover:border-purple-500/40 rounded-full text-xs font-bold text-zinc-300 hover:text-white hover:bg-zinc-900 transition-all cursor-pointer shadow-sm group"
                  id={`cat-pill-${idx}`}
                >
                  <cat.icon className="w-3.5 h-3.5 text-purple-400 group-hover:scale-110 transition-transform" />
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-3">
            <button
              onClick={() => scrollToSection('minecraft-pricing')}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-purple-950/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer filter hover:brightness-110 border border-purple-500/20"
              id="hero-get-started-btn"
            >
              <span>Get Started</span>
              <ChevronRight className="w-4 h-4 text-purple-200" />
            </button>
            <button
              onClick={() => scrollToSection('features-section')}
              className="px-8 py-4 bg-zinc-950/80 border border-zinc-850 hover:border-zinc-700 hover:bg-zinc-900 text-zinc-300 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
              id="hero-learn-more-btn"
            >
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              <span>Learn More</span>
            </button>
          </div>

        </div>

        {/* Right Column: Premium Minecraft Game Banner Card with floating indicators */}
        <div className="lg:col-span-5 relative mt-6 lg:mt-0">
          
          {/* Card Frame with neon purple glow */}
          <div className="relative group overflow-hidden rounded-[24px] bg-[#0c0c12]/80 border border-purple-900/20 p-3 h-[420px] shadow-2xl transition duration-500 hover:border-purple-500/30 glow-purple flex flex-col justify-end">
            
            {/* Rich Minecraft block thematic gradient/image backdrop */}
            <div className="absolute inset-0 z-0 bg-cover bg-center mix-blend-overlay transition duration-700 group-hover:scale-105" 
                 style={{ 
                   backgroundImage: `linear-gradient(to bottom, rgba(5, 5, 8, 0.4) 0%, rgba(4, 4, 6, 0.95) 100%), url('https://images.unsplash.com/photo-1607988795691-3d0147b43231?auto=format&fit=crop&w=800&q=80')` 
                 }}
            />

            {/* Simulated floating isometric game structure artwork/glorious vector gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 via-transparent to-indigo-500/20 opacity-70 pointer-events-none z-0" />

            {/* Glowing floating block outline helper */}
            <div className="absolute top-10 left-10 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-transparent filter blur-md pointer-events-none" />

            {/* Top right - Floating specs tag */}
            <div className="absolute top-5 right-5 z-20 flex items-center gap-1.5 bg-black/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-zinc-850 shadow-lg text-[9px] font-bold text-indigo-300 uppercase tracking-widest font-mono">
              <Cpu className="w-3.5 h-3.5 text-purple-400" />
              <span>AMD RYZEN 9 7950X</span>
            </div>

            {/* Floating Price Badge */}
            <div className="absolute top-1/3 left-6 z-20 transform -translate-y-1/2 p-4 bg-zinc-950/95 backdrop-blur-md border border-purple-500/30 rounded-2xl shadow-2xl flex flex-col items-start space-y-1 scale-95 md:scale-100 hover:scale-105 transition-all">
              <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest font-extrabold">Starting Minecraft Spec</span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-white font-display">$1.50</span>
                <span className="text-[10px] text-zinc-500 font-semibold">/mo</span>
              </div>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-purple-500/10 text-[8px] text-purple-400 font-bold border border-purple-500/20 uppercase tracking-widest">
                Lowest latency
              </span>
            </div>

            {/* Card Content with absolute glass overlay */}
            <div className="relative z-10 w-full p-5 bg-black/45 border border-zinc-800/40 rounded-[18px] backdrop-blur-md space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <span className="inline-block bg-purple-500/20 border border-purple-500/40 text-purple-200 text-[8px] uppercase tracking-widest font-black px-2 py-0.5 rounded">
                    Bestseller Spec
                  </span>
                  <h3 className="text-md font-black text-white font-display tracking-wide">Shironex Minecraft Node</h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-zinc-400 block font-mono">DDR5 RAM Allocation</span>
                  <span className="text-xs font-black text-white font-mono">8 GB ECC Memory</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] text-zinc-350 font-mono py-1 border-t border-b border-zinc-900/60">
                <div className="flex items-center gap-1.5 text-left">
                  <span className="w-1 h-1 bg-purple-400 rounded-full" />
                  <span>Unmetered CPU Slots</span>
                </div>
                <div className="flex items-center gap-1.5 text-left">
                  <span className="w-1 h-1 bg-purple-400 rounded-full" />
                  <span>Unlimited SSD Ports</span>
                </div>
              </div>

              <button
                onClick={() => onDeployClick('minecraft')}
                className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold text-xs uppercase tracking-widest transition duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                id="hero-banner-deploy-action"
              >
                <span>Deploy Server Now</span>
                <ChevronRight className="w-4 h-4 text-purple-250 animate-pulse" />
              </button>
            </div>

          </div>

          {/* Background decorative absolute elements */}
          <div className="absolute -bottom-5 -right-3 -z-10 w-24 h-24 bg-gradient-to-tr from-indigo-600/30 to-purple-500/10 rounded-full filter blur-xl pointer-events-none" />
        </div>

      </div>

    </section>
  );
}
