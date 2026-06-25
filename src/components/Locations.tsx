import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, CheckCircle2, Server, HelpCircle, Network, Cpu, RefreshCw } from 'lucide-react';

interface ClusterNode {
  name: string;
  type: string;
  tps: number;
  uptime: string;
  ping: number;
  status: 'operational' | 'degraded' | 'maintenance';
}

export default function StatusSection() {
  const [selectedRegion, setSelectedRegion] = useState('EU-West (Frankfurt)');
  const [pingTestMs, setPingTestMs] = useState<number | null>(null);
  const [pinging, setPinging] = useState(false);

  // Cluster monitoring nodes
  const clusterNodes: ClusterNode[] = [
    { name: 'FRA-AM5 Game Hypervisor (01)', type: 'Minecraft Core', tps: 20.0, uptime: '99.99%', ping: 12, status: 'operational' },
    { name: 'FRA-AM5 Game Hypervisor (02)', type: 'Minecraft Core', tps: 20.0, uptime: '100%', ping: 14, status: 'operational' },
    { name: 'SGP-RY9 VPS Hypervisor (01)', type: 'Virtual Dedicated KVM', tps: 19.98, uptime: '99.95%', ping: 68, status: 'operational' },
    { name: 'DAL-AM5 Bot Container (01)', type: 'Micro Isolated LXC', tps: 20.0, uptime: '100%', ping: 32, status: 'operational' },
    { name: 'HEL-RY9 Proxy Router (01)', type: 'Anycast Link Balancer', tps: 20.0, uptime: '100%', ping: 8, status: 'operational' },
  ];

  // Run dynamic latency updates to look live
  const [liveUptimeRatio, setLiveUptimeRatio] = useState(99.98);
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveUptimeRatio(prev => {
        const change = (Math.random() * 0.02 - 0.01);
        return +(Math.max(99.9, Math.min(100, prev + change))).toFixed(4);
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handlePingSpeedTest = (targetRegion: string, basePing: number) => {
    if (pinging) return;
    setPinging(true);
    setPingTestMs(null);
    setSelectedRegion(targetRegion);

    setTimeout(() => {
      const variance = Math.floor(Math.random() * 6) - 3;
      setPingTestMs(Math.max(2, basePing + variance));
      setPinging(false);
    }, 850);
  };

  return (
    <section id="status-monitor" className="py-20 px-4 md:px-8 bg-[#07070a] border-t border-zinc-900/60 scroll-mt-20 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-purple-950/40 text-purple-400 text-[10px] font-mono tracking-widest uppercase border border-purple-800/10 px-4 py-1.5 rounded-full">
            <Activity className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            <span>Real-time System Telemetry</span>
          </div>
          <h2 className="font-display text-2xl md:text-4xl font-black text-white leading-tight tracking-tight">
            Shironex Node <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">Status Monitor</span>
          </h2>
          <p className="text-zinc-400 text-xs md:text-sm font-sans max-w-lg mx-auto">
            Operational tracking across all local clusters. We maintain open APIs and active monitoring tables to review bandwidth, latency, and machine health transparently.
          </p>
        </div>

        {/* Global Overview Row and Green Status Indicators */}
        <div className="bg-[#0a0a0f]/60 border border-zinc-900 rounded-[24px] p-6.5 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden backdrop-blur-md">
          <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 w-full" />
          
          <div className="flex items-center gap-4 text-left">
            {/* Pulsating live green badge */}
            <div className="w-12 h-12 rounded-2xl bg-emerald-950/20 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0">
              <CheckCircle2 className="w-6 h-6 animate-pulse" />
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-display text-md font-black text-white">All Systems Operational</h3>
                <span className="inline-flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded-full animate-pulse">
                  LIVE
                </span>
              </div>
              <p className="text-zinc-400 text-xs font-sans">
                Our global edge networks, provisioning servers, container hosts, and API databases are performing without any anomalies.
              </p>
            </div>
          </div>

          <div className="flex gap-8 border-t md:border-t-0 border-zinc-900 pt-4 md:pt-0 w-full md:w-auto shrink-0 justify-around md:justify-end">
            <div className="text-left md:text-right">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest block font-mono">Global SLA</span>
              <strong className="text-white text-md font-display font-black font-mono">{liveUptimeRatio}%</strong>
            </div>
            <div className="text-left md:text-right">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest block font-mono">Backbones Limit</span>
              <strong className="text-white text-md font-display font-black font-mono">1.2 Tbps</strong>
            </div>
          </div>
        </div>

        {/* Specific hypervisor nodes stack */}
        <div className="max-w-5xl mx-auto space-y-4 text-left">
          <span className="text-[10px] font-mono font-extrabold text-zinc-500 uppercase tracking-widest ml-1 block">Active Machine Logs:</span>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {clusterNodes.map((node, idx) => (
              <div
                key={idx}
                className="bg-[#08080d]/80 border border-zinc-900 rounded-2xl p-5 hover:border-purple-500/20 transition-all flex items-center justify-between"
                id={`status-node-${idx}`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    {/* Live green dot indicator */}
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-emerald-950 flex shrink-0 animate-pulse" />
                    <h4 className="text-xs font-black text-white font-display tracking-wide">{node.name}</h4>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-zinc-500 font-mono">
                    <span>{node.type}</span>
                    <span>•</span>
                    <span className="text-purple-400">{node.tps} TPS</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-bold uppercase rounded-md px-2.5 py-0.5">
                    Operational
                  </span>
                  <span className="text-[9px] text-zinc-500 block font-mono mt-1">Uptime: {node.uptime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Interactive Ping Matrix Tool */}
        <div className="max-w-3xl mx-auto pt-10">
          <div className="bg-zinc-950/60 border border-zinc-900 rounded-[24px] p-6 md:p-8 space-y-6 text-left relative overflow-hidden backdrop-blur-md">
            <h3 className="font-display text-sm font-black text-white uppercase tracking-wider">Interactive Latency Prober</h3>
            <p className="text-zinc-400 text-xs font-sans">
              Test ICMP routing speeds from your browser directly to our nodes with our simulated round-trip packet generator. Select a target datacenter region:
            </p>

            <div className="flex flex-wrap gap-2">
              {[
                { name: 'Frankfurt (FRA)', base: 12 },
                { name: 'Singapore (SGP)', base: 64 },
                { name: 'Dallas (DAL)', base: 38 },
                { name: 'London (LND)', base: 19 },
                { name: 'Sydney (SYD)', base: 132 },
                { name: 'Helsinki (HEL)', base: 8 },
              ].map((loc, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePingSpeedTest(loc.name, loc.base)}
                  disabled={pinging}
                  className={`px-4 py-2 text-[11px] font-extrabold uppercase rounded-full border transition cursor-pointer ${
                    selectedRegion === loc.name 
                      ? 'bg-purple-600 border-purple-500 text-white shadow-md' 
                      : 'bg-zinc-900/60 border-zinc-850 text-zinc-300 hover:border-zinc-700'
                  }`}
                  id={`ping-loc-${idx}`}
                >
                  {loc.name}
                </button>
              ))}
            </div>

            {/* Test Results Output */}
            {pingTestMs !== null ? (
              <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-xl flex items-center justify-between text-xs font-mono animate-fade-in">
                <span className="text-zinc-400">Simulated round trip directly to {selectedRegion}:</span>
                <strong className="text-emerald-400 font-bold text-sm">{pingTestMs} ms</strong>
              </div>
            ) : pinging ? (
              <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-xl flex items-center justify-center gap-2 text-xs text-zinc-500 font-mono">
                <RefreshCw className="w-4 h-4 animate-spin text-purple-400" />
                <span>Generating ICMP package routing queries...</span>
              </div>
            ) : null}
          </div>
        </div>

      </div>
    </section>
  );
}
