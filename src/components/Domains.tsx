import React, { useState } from 'react';
import { POPULAR_TLDS, DomainTld } from '../data';
import { Search, Loader2, CheckCircle, Globe, ShieldCheck } from 'lucide-react';

interface DomainsProps {
  currency: 'USD' | 'EUR' | 'INR';
}

export default function Domains({ currency }: DomainsProps) {
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [result, setResult] = useState<{ domainName: string; available: boolean; tldUsed: string; price: number } | null>(null);

  // Currency multiplier matches Services
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

  const handleDomainSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query || query.trim().length === 0) return;

    setSearching(true);
    setResult(null);

    // Simulate real lookup sequence across global registrars
    setTimeout(() => {
      // Clean query structure
      let cleanQuery = query.trim().toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, '');
      if (!cleanQuery.includes('.')) {
        cleanQuery = cleanQuery + '.com';
      }

      const parsedTld = '.' + cleanQuery.split('.').pop();
      const matchedTldSpec = POPULAR_TLDS.find(t => t.name === parsedTld) || { name: '.com', priceUSD: 8.99 };

      setResult({
        domainName: cleanQuery,
        available: !cleanQuery.startsWith('google') && !cleanQuery.startsWith('shironexcloud'),
        tldUsed: parsedTld,
        price: matchedTldSpec.priceUSD
      });
      setSearching(false);
    }, 1200);
  };

  const selectTldExtension = (tld: string) => {
    let base = query.trim().split('.')[0] || 'myserver';
    setQuery(base + tld);
  };

  return (
    <section id="domain-search" className="py-20 px-4 md:px-8 bg-[#040406] border-t border-zinc-900/60 scroll-mt-20 relative">
      <div className="absolute top-1/3 right-1/4 w-[320px] h-[320px] bg-purple-700/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-purple-950/40 text-purple-400 text-[10px] font-mono tracking-widest uppercase border border-purple-800/10 px-4 py-1.5 rounded-full">
            <Globe className="w-3.5 h-3.5 text-purple-400" />
            <span>ICANN Approved Domain Registrar</span>
          </div>
          <h2 className="font-display text-2xl md:text-4xl font-black text-white leading-tight tracking-tight">
            Claim Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">Custom Server IP</span>
          </h2>
          <p className="text-zinc-400 text-xs md:text-sm font-sans max-w-lg mx-auto">
            Replace complex numerical IP ports with a custom branded domain pointing directly to your Minecraft hypervisor or VPS node.
          </p>
        </div>

        {/* Large Domain Search Container */}
        <div className="max-w-3xl mx-auto bg-[#07070c]/70 border border-zinc-900 rounded-[28px] p-6 md:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md">
          
          <form onSubmit={handleDomainSearch} className="space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="search your perfect domain, e.g. playshironex.com"
                  className="w-full bg-zinc-950 border border-zinc-900 hover:border-zinc-850 focus:border-purple-500 rounded-2xl pl-12 pr-4 py-4 text-xs md:text-sm text-white placeholder-zinc-500 font-sans tracking-wide outline-none transition duration-200"
                />
              </div>
              <button
                type="submit"
                disabled={searching}
                className="px-8 py-4 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                {searching ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-purple-250" />
                    <span>Searching...</span>
                  </>
                ) : (
                  <span>Search Domain</span>
                )}
              </button>
            </div>
          </form>

          {/* Lookup Results Display */}
          {result && (
            <div className="mt-8 p-5 bg-[#090910] border border-zinc-900 rounded-2xl animate-fade-in flex flex-col md:flex-row items-center justify-between gap-4 text-left">
              <div className="flex items-center gap-3">
                <CheckCircle className={`w-6 h-6 shrink-0 ${result.available ? 'text-emerald-400' : 'text-rose-500'}`} />
                <div>
                  <h4 className="text-sm font-bold text-white font-mono break-all">{result.domainName}</h4>
                  <p className="text-[11px] text-zinc-500 font-sans">
                    {result.available 
                      ? 'Congratulations! This domain name is fully unclaimed and ready to register.' 
                      : 'Sorry, this domain address is registered. Try searching alternate suffixes.'}
                  </p>
                </div>
              </div>

              {result.available && (
                <div className="flex items-center gap-4 shrink-0 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-zinc-900 pt-3 md:pt-0">
                  <div className="text-right">
                    <span className="text-[10px] text-zinc-500 block">Registration price</span>
                    <strong className="text-emerald-400 text-md font-black font-mono">{getPriceFormatted(result.price)}<span className="text-[10px] text-zinc-500 font-bold">/yr</span></strong>
                  </div>
                  <a
                    href="https://panel.shironex.fun/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-[10px] uppercase tracking-wider text-center cursor-pointer transition active:scale-95 shadow-md shadow-emerald-950/20"
                  >
                    Register
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Popular TLDs Horizontal Pills */}
          <div className="mt-8 space-y-3 pt-6 border-t border-zinc-900/60">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block text-center sm:text-left">Popular extensions available right now:</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {POPULAR_TLDS.map((tld, idx) => (
                <button
                  key={idx}
                  onClick={() => selectTldExtension(tld.name)}
                  className="bg-zinc-950 border border-zinc-900 hover:border-purple-500/25 rounded-2xl p-3 text-center transition duration-200 cursor-pointer active:scale-95 flex flex-col items-center justify-between group"
                  id={`tld-opt-${idx}`}
                >
                  <span className="font-display font-black text-xs text-zinc-300 group-hover:text-purple-400 transition-colors">{tld.name}</span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="font-mono text-[9px] font-bold text-zinc-500">{getPriceFormatted(tld.priceUSD)}</span>
                    {tld.promo && (
                      <span className="bg-purple-500/15 border border-purple-500/30 text-purple-400 text-[7px] font-extrabold uppercase px-1 rounded-md shrink-0 scale-90">
                        SALE
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
