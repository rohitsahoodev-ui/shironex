import React from 'react';
import { Zap, ShieldAlert, Activity, Headphones, Cpu, Network, Server, HardDrive } from 'lucide-react';

export default function Features() {
  const coreFeatures = [
    {
      title: 'Instant Setup',
      desc: 'All nodes provision immediately after checkout. Game files and network configurations are completely bound in under 60 seconds.',
      icon: Zap,
      color: 'from-amber-600/20 to-orange-500/20 text-amber-400 border-amber-500/10'
    },
    {
      title: 'DDoS Protection',
      desc: 'Tiered 1.2 Tbit Corero mitigation systems protect your IP. Persistent and layered Layer-3/4/7 filter defenses run blockages automatically.',
      icon: ShieldAlert,
      color: 'from-purple-600/20 to-indigo-500/20 text-purple-400 border-purple-500/20'
    },
    {
      title: '99.9% Uptime',
      desc: 'Backed by official Service Level guarantees. Redundant fiber transit trunks and power utilities ensure continuous system workloads.',
      icon: Activity,
      color: 'from-emerald-600/20 to-teal-500/20 text-emerald-400 border-emerald-500/10'
    },
    {
      title: '24/7 Support',
      desc: 'Skip robotic AI widgets. Real system operators and game infrastructure administrators sit on standby in our community network.',
      icon: Headphones,
      color: 'from-pink-600/20 to-rose-500/20 text-pink-400 border-pink-500/10'
    }
  ];

  const advancedFeatures = [
    {
      title: 'Ryzen 9 7950X CPUs',
      desc: 'Uncapped physical processors operate high 4.5GHz+ base clock speeds. Say goodbye to game tick drop anomalies or server micro-stutters.',
      icon: Cpu,
      badge: 'Ryzen 9 7950X'
    },
    {
      title: 'NVMe SSD Storage',
      desc: 'Exclusively Gen4 solid state arrays configured under fast RAID setups. Read and write limits of 7,000MB/s eliminate long loading screens.',
      icon: HardDrive,
      badge: 'PCIe Gen4'
    },
    {
      title: 'Advanced Mitigations',
      desc: 'Customized in-panel firewall controls give you control. Tailor ports, secure connection endpoints, and filter traffic profiles safely.',
      icon: ShieldAlert,
      badge: 'Layer-7 Block'
    },
    {
      title: 'Instant Deployment',
      desc: 'Our cloud platform connects cleanly to host hypervisors. Create, format, delete, or redeploy packages instantly with single-click command controls.',
      icon: Zap,
      badge: '< 10 Seconds'
    },
    {
      title: 'Premium Network',
      desc: 'Equipped with triple high-tier carrier links including GTT, Level3, and Retro peering. Lower routing hops translates to a pristine ping.',
      icon: Network,
      badge: '10 Gbps Uplinks'
    },
    {
      title: 'Enterprise Hardware',
      desc: 'We utilize exclusively custom enterprise-tier bare-metal blades anchored in modern high-security Tier-III global data locations.',
      icon: Server,
      badge: 'DDR5 ECC RAM'
    }
  ];

  return (
    <div className="space-y-24">
      
      {/* 1. Core Feature Grid Section */}
      <section className="py-16 px-4 md:px-8 bg-[#040406] border-t border-zinc-900/40 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-purple-600/5 rounded-full filter blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Grid Layout of Core Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="group relative bg-[#09090e]/60 border border-zinc-905 rounded-[24px] p-6.5 hover:border-purple-500/30 hover:bg-zinc-950/80 transition-all duration-300 shadow-xl flex flex-col justify-between hover:scale-[1.01]"
                id={`core-feat-${idx}`}
              >
                <div className="space-y-4 text-left">
                  {/* Glassmorphic Icon Circle */}
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feat.color} flex items-center justify-center border shrink-0`}>
                    <feat.icon className="w-5.5 h-5.5" />
                  </div>
                  <h3 className="text-md font-extrabold text-white font-display tracking-wide">{feat.title}</h3>
                  <p className="text-zinc-400 text-xs leading-relaxed font-sans font-normal">
                    {feat.desc}
                  </p>
                </div>
                
                {/* Visual hover neon line indicator */}
                <div className="h-1 w-0 bg-purple-500 rounded-full transition-all duration-300 group-hover:w-1/3 mt-6"></div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 2. Advanced Features Section */}
      <section id="features-section" className="py-20 px-4 md:px-8 bg-[#040406] border-t border-zinc-900/60 scroll-mt-20 relative">
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/5 rounded-full filter blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Centered Heading with purple gradient text */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[10px] uppercase font-mono font-black text-purple-400 tracking-widest bg-purple-950/30 border border-purple-800/10 px-4 py-1.5 rounded-full">
              Ultimate Compute Architecture
            </span>
            <h2 className="font-display text-2xl md:text-4xl font-black text-white leading-tight tracking-tight">
              A Platform Engineered for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400">
                Premium Hardware Capacity
              </span>
            </h2>
            <p className="text-zinc-400 text-xs md:text-sm font-sans max-w-lg mx-auto">
              We skip standard reseller systems. All virtual compartments sit directly on enterprise hypervisors designed carefully for gaming latency and sustained work loads.
            </p>
          </div>

          {/* Feature matrix grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advancedFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="group bg-gradient-to-b from-[#09090e] to-[#050508] border border-zinc-900 rounded-[24px] p-6.5 text-left relative overflow-hidden flex flex-col justify-between hover:border-purple-500/20 hover:scale-[1.01] transition-all duration-350"
                id={`adv-feat-${idx}`}
              >
                {/* Absolute light aura */}
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-purple-600/5 rounded-full filter blur-xl group-hover:bg-purple-600/10 transition-colors pointer-events-none" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    {/* Glowing rounded icon */}
                    <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-purple-500/15 group-hover:border-purple-500/40 flex items-center justify-center transition-colors">
                      <feat.icon className="w-5 h-5 text-purple-400" />
                    </div>
                    {/* Specific dynamic spec tag */}
                    <span className="font-mono text-[9px] font-extrabold text-zinc-500 uppercase bg-zinc-950 px-2.5 py-1 rounded-md border border-zinc-900/60 transition-colors group-hover:text-purple-300">
                      {feat.badge}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-[14px] font-extrabold text-white font-display tracking-wide">{feat.title}</h3>
                    <p className="text-zinc-400 text-xs leading-relaxed font-sans font-light">
                      {feat.desc}
                    </p>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent w-full mt-6 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
