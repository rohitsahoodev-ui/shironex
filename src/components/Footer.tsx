import React, { useState } from 'react';
import { MessageSquare, Heart, ShieldAlert, FileText, Info, HelpCircle, X, ShieldCheck } from 'lucide-react';

interface FooterProps {
  scrollToSection: (id: string) => void;
}

export default function Footer({ scrollToSection }: FooterProps) {
  const [legalModal, setLegalModal] = useState<'terms' | 'privacy' | 'refund' | null>(null);

  return (
    <footer id="refund-legal" className="bg-[#040406] border-t border-zinc-900 px-4 lg:px-8 py-16 text-left text-zinc-400 text-xs font-sans relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
        
        {/* Brand Description Column */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8.5 h-8.5 rounded-lg bg-zinc-950 p-1.5 flex items-center justify-center border border-purple-500/10 shadow-md">
              <img
                src="https://cdn.discordapp.com/icons/1514659760538914936/a_4ef6e3637bc7a5be3cf9d036ea240d4d.gif?size=2048"
                referrerPolicy="no-referrer"
                alt="ShironexCloud Logo"
                className="w-full h-full object-contain filter drop-shadow-[0_0_6px_rgba(168,85,247,0.3)]"
              />
            </div>
            <span className="font-display text-sm font-black text-white tracking-wider uppercase">
              Shironex<span className="text-purple-400 font-sans font-bold">Cloud</span>
            </span>
          </div>
          
          <p className="max-w-xs text-zinc-500 leading-relaxed font-light text-[11px]">
            ShironexCloud provides server infrastructure, dedicated KVM machines, isolated container hosts, and low-latency Minecraft plans with smart protection systems.
          </p>

          {/* Refund policy assurance badge element */}
          <div 
            onClick={() => setLegalModal('refund')}
            className="inline-flex items-center gap-2.5 bg-purple-950/20 border border-purple-500/20 rounded-xl p-3 cursor-pointer hover:bg-purple-950/40 transition-colors text-[11px] max-w-xs text-left"
          >
            <ShieldCheck className="w-5 h-5 text-purple-400 shrink-0" />
            <div>
              <strong className="text-zinc-200 block text-[11px]">12-Hour Refund Promise</strong>
              <span className="text-zinc-500 text-[10px] block mt-0.5">Cancel item within 12 hours for a full transaction refund window.</span>
            </div>
          </div>
        </div>

        {/* Column 2 - Links */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="text-zinc-200 font-bold uppercase font-mono text-[10px] tracking-widest">Our Platform</h4>
          <ul className="space-y-2 text-[11px] font-medium">
            <li><button onClick={() => scrollToSection('minecraft-pricing')} className="hover:text-purple-400 transition cursor-pointer text-left">Minecraft Servers</button></li>
            <li><button onClick={() => scrollToSection('vps-pricing')} className="hover:text-purple-400 transition cursor-pointer text-left">Cloud VPS Servers</button></li>
            <li><button onClick={() => scrollToSection('bot-pricing')} className="hover:text-purple-400 transition cursor-pointer text-left">Discord Bot Hosting</button></li>
            <li><button onClick={() => scrollToSection('domain-search')} className="hover:text-purple-400 transition cursor-pointer text-left">Domain Registry</button></li>
          </ul>
        </div>

        {/* Column 3 - Corporate & Legal Info */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="text-zinc-200 font-bold uppercase font-mono text-[10px] tracking-widest">Legal & Policies</h4>
          <ul className="space-y-2 text-[11px] font-medium text-left">
            <li><button onClick={() => setLegalModal('terms')} className="hover:text-purple-400 transition cursor-pointer">Terms of Service</button></li>
            <li><button onClick={() => setLegalModal('privacy')} className="hover:text-purple-400 transition cursor-pointer">Privacy Policy</button></li>
            <li><button onClick={() => setLegalModal('refund')} className="hover:text-purple-400 transition cursor-pointer">Refund Policy (12 HR Window)</button></li>
            <li>
              <a 
                href="https://discord.com/channels/1494365554385883397/1494365555594104982/1518519336971665459" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-purple-400 text-indigo-400 transition inline-flex items-center gap-1"
              >
                Discord Support Channel <MessageSquare className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4 - Rapid Actions */}
        <div className="md:col-span-2 space-y-3">
          <h4 className="text-zinc-200 font-bold uppercase font-mono text-[10px] tracking-widest">Client Portal</h4>
          <div className="space-y-2">
            <a 
              href="https://panel.shironex.fun/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-block text-center py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-[10px] rounded-lg font-black tracking-wider uppercase transition cursor-pointer shadow-md"
              id="footer-client-btn"
            >
              Client Panel
            </a>
            <span className="text-[10px] text-zinc-600 block text-center">Fast shell console access</span>
          </div>
        </div>

      </div>

      <div className="mt-8 pt-6 border-t border-zinc-900 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-650 space-y-3 sm:space-y-0">
        <div>
          <span>© {new Date().getFullYear()} ShironexCloud Networks. All Rights Reserved. Minecraft is a trademark of Mojang Synergies AB.</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span>Shielded under Core DDoS Anycast Systems</span>
          <Heart className="w-3.5 h-3.5 text-purple-500 fill-purple-500" />
        </div>
      </div>

      {/* Pop-up Legal Modals */}
      {legalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80" onClick={() => setLegalModal(null)}></div>
          
          <div className="relative bg-[#0d0d12] border border-purple-900/30 w-full max-w-lg rounded-3xl p-6 md:p-8 shadow-2xl z-50 text-left overflow-hidden max-h-[85vh] flex flex-col">
            
            <div className="flex items-center justify-between border-b border-zinc-900 pb-4 shrink-0">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-400" />
                <h3 className="font-display text-sm font-black text-white uppercase tracking-wider">
                  {legalModal === 'terms' ? 'Terms of Service' : legalModal === 'privacy' ? 'Privacy Policy' : '12 Hour Refund Policy'}
                </h3>
              </div>
              <button onClick={() => setLegalModal(null)} className="text-zinc-500 hover:text-white transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content areas scrollable */}
            <div className="overflow-y-auto py-5 text-xs text-zinc-355 font-sans leading-relaxed space-y-4 pr-1">
              {legalModal === 'terms' && (
                <>
                  <p className="font-bold text-white text-xs">Welcome to ShironexCloud Hosting Terms of Service.</p>
                  <p>By registering or purchasing any game server, cloud VPS container, or discord bot hosting module, you agree to comply with the terms defined herein.</p>
                  <strong className="text-zinc-350 block mt-3 uppercase font-mono text-[10px] tracking-wider">1. Acceptable Usage Guidelines:</strong>
                  <p>All hosting nodes must be used strictly for their intended purposes. Cryptocurrency mining, distributed stress testing tools, network spoof attacks, or hosting illegal materials is strictly barred. Violations trigger automatic termination without refund rights.</p>
                  <strong className="text-zinc-350 block mt-3 uppercase font-mono text-[10px] tracking-wider">2. System Performance Thresholds:</strong>
                  <p>Our dedicated CPU, RAM, and PCIe Gen4 structures are hard-limited per client container to sustain total cluster performance parity. Abuse of hypervisor kernel channels triggers standard limitation algorithms automatically.</p>
                </>
              )}

              {legalModal === 'privacy' && (
                <>
                  <p className="font-bold text-white text-xs">ShironexCloud Privacy Protection Matrix.</p>
                  <p>We respect subscriber privacy data and operate strictly standard encrypted connections across all billing and client area databases.</p>
                  <strong className="text-zinc-350 block mt-3 uppercase font-mono text-[10px] tracking-wider">1. Logs We Store:</strong>
                  <p>We store standard diagnostic network latency values, account indicators, billing transaction addresses, and optional security cookies to streamline persistent browser sessions.</p>
                  <strong className="text-zinc-350 block mt-3 uppercase font-mono text-[10px] tracking-wider">2. Cookie Policy and Safe Sessions:</strong>
                  <p>We incorporate client-side local registers to hold chosen parameters like selected currency preferences or active server name tags.</p>
                </>
              )}

              {legalModal === 'refund' && (
                <>
                  <p className="font-bold text-white text-xs">Our 12-Hour Refund Guarantee Promise.</p>
                  <p>We strive to provide impeccable bare-metal compute slots, but if our services fall short, we support an elegant 12-hour refund policy window.</p>
                  <div className="bg-purple-950/20 border border-purple-500/20 rounded-xl p-3.5 space-y-1 my-3 text-[11px] text-zinc-400">
                    <strong className="text-white block">Official refund rules:</strong>
                    <p>• The request has to be fired inside 12 hours after the billing allocation transaction.</p>
                    <p>• Applies solely to Minecraft nodes, Bot slots, and Standard Cloud VPS servers.</p>
                    <p>• Customized bare-metal dedicated servers containing custom setup fees are excluded.</p>
                  </div>
                  <p>To request a refund, please join our Community Discord support channel, open a billing ticket, and communicate your transaction identifier. Our support sysadmins process requests instantly.</p>
                </>
              )}
            </div>

            <div className="border-t border-zinc-900 pt-4 shrink-0 flex justify-end">
              <button 
                onClick={() => setLegalModal(null)}
                className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold uppercase transition"
              >
                Close Window
              </button>
            </div>

          </div>
        </div>
      )}

    </footer>
  );
}
