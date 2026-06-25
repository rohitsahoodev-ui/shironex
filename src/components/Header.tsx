import React, { useState } from 'react';
import { Globe, ChevronDown, Check, LayoutDashboard, Menu, X, ShieldAlert } from 'lucide-react';

interface HeaderProps {
  currency: 'USD' | 'EUR' | 'INR';
  setCurrency: (c: 'USD' | 'EUR' | 'INR') => void;
  scrollToSection: (id: string) => void;
}

export default function Header({
  currency,
  setCurrency,
  scrollToSection,
}: HeaderProps) {
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const formatCurrency = (cur: string) => {
    switch (cur) {
      case 'EUR': return 'EUR (€)';
      case 'INR': return 'INR (₹)';
      default: return 'USD ($)';
    }
  };

  const navItems = [
    { label: 'Home', id: 'hero-section' },
    { label: 'Minecraft', id: 'minecraft-pricing' },
    { label: 'VPS', id: 'vps-pricing' },
    { label: 'Bot Hosting', id: 'bot-pricing' },
    { label: 'Domains', id: 'domain-search' },
    { label: 'Status', id: 'status-monitor' },
    { label: 'Legal / Refund', id: 'refund-legal' },
  ];

  return (
    <header className="sticky top-4 z-50 w-full px-4 max-w-7xl mx-auto">
      {/* Floating Glassmorphic Pill */}
      <div className="w-full bg-[#0a0a0f]/80 backdrop-blur-lg border border-purple-900/20 rounded-full px-5 md:px-7 py-3 flex items-center justify-between shadow-2xl shadow-purple-950/10">
        
        {/* Brand Logo on Left */}
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setMobileMenuOpen(false);
          }}
          className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
          id="btn-logo"
        >
          <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-zinc-950 p-1.5 border border-purple-500/20 shadow-md transform group-hover:scale-105 transition-all duration-300">
            <img
              src="https://cdn.discordapp.com/icons/1514659760538914936/a_4ef6e3637bc7a5be3cf9d036ea240d4d.gif?size=2048"
              referrerPolicy="no-referrer"
              alt="ShironexCloud Logo"
              className="w-full h-full object-contain filter drop-shadow-[0_0_6px_rgba(168,85,247,0.4)]"
            />
            <div className="absolute inset-0 rounded-full bg-purple-500 opacity-5 filter blur-sm group-hover:opacity-20 transition-opacity"></div>
          </div>
          <span className="font-display text-base font-black tracking-wider text-white uppercase group-hover:text-purple-300 transition-colors">
            Shironex<span className="text-purple-400 font-sans font-bold">Cloud</span>
          </span>
        </button>

        {/* Center Desktop Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-zinc-400 hover:text-purple-400 transition-colors text-[13px] font-semibold tracking-wide focus:outline-none cursor-pointer relative py-1 group"
              id={`nav-${item.id}`}
            >
              <span>{item.label}</span>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </nav>

        {/* Right Controls */}
        <div className="hidden md:flex items-center gap-3">
          {/* Currency Dropdown Selector */}
          <div className="relative">
            <button
              onClick={() => setCurrencyOpen(!currencyOpen)}
              className="flex items-center gap-1.5 border border-zinc-800/80 bg-zinc-950/90 px-3.5 py-2 rounded-full text-xs font-bold text-zinc-300 hover:text-white hover:border-purple-500/30 transition-all cursor-pointer shadow-md"
              id="header-currency-selector"
            >
              <Globe className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
              <span>{currency}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${currencyOpen ? 'rotate-180' : ''}`} />
            </button>

            {currencyOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setCurrencyOpen(false)}></div>
                <div className="absolute right-0 mt-2 z-50 w-32 bg-[#0d0d12]/95 border border-zinc-900 rounded-xl shadow-2xl overflow-hidden py-1.5 backdrop-blur-md">
                  {(['USD', 'EUR', 'INR'] as const).map((curr) => (
                    <button
                      key={curr}
                      onClick={() => {
                        setCurrency(curr);
                        setCurrencyOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs hover:bg-purple-950/40 font-bold transition flex items-center justify-between ${
                        currency === curr ? 'text-purple-400 bg-purple-950/20' : 'text-zinc-350'
                      }`}
                      id={`currency-item-${curr}`}
                    >
                      <span>{formatCurrency(curr)}</span>
                      {currency === curr && <Check className="w-3.5 h-3.5 text-purple-400 shrink-0" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Client Area pill Button */}
          <a
            href="https://panel.shironex.fun/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-full px-5 py-2 font-black text-xs uppercase tracking-widest flex items-center gap-2 cursor-pointer transition-all hover:scale-[1.03] active:scale-[0.97] shadow-lg shadow-purple-900/20"
            id="nav-client-portal"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Client Area</span>
          </a>
        </div>

        {/* Hamburger Mobile Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Mobile Currency toggle */}
          <button
            onClick={() => {
              const currentIdx = (['USD', 'EUR', 'INR'] as const).indexOf(currency);
              const currencies = ['USD', 'EUR', 'INR'] as const;
              setCurrency(currencies[(currentIdx + 1) % 3]);
            }}
            className="flex items-center justify-center border border-zinc-800 bg-zinc-950 px-3 py-1.5 rounded-full text-xs font-mono font-bold text-purple-400 cursor-pointer"
          >
            {currency}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 transition focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu content with gorgeous glass transition */}
      {mobileMenuOpen && (
        <>
          <div className="fixed inset-0 top-20 z-40 bg-black/60 backdrop-blur-sm lg:hidden" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="absolute top-16 left-4 right-4 z-50 bg-[#07070a]/95 border border-purple-900/20 rounded-3xl p-6 space-y-5 shadow-2xl flex flex-col lg:hidden backdrop-blur-lg">
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-purple-500">Navigation Nodes</span>
              <div className="grid grid-cols-2 gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      scrollToSection(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className="text-left px-3 py-2 bg-zinc-950 rounded-xl text-xs font-bold text-zinc-300 hover:text-purple-400 hover:bg-zinc-900 transition border border-zinc-900/65"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-900 flex flex-col gap-3">
              <a
                href="https://panel.shironex.fun/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full py-3.5 font-bold text-xs uppercase tracking-widest text-center shadow-lg shadow-purple-950/40 block"
              >
                Launch Client Panel
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
