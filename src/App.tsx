import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Domains from './components/Domains';
import Features from './components/Features';
import Locations from './components/Locations';
import Footer from './components/Footer';
import { HelpCircle, ChevronDown, MessageSquare, ArrowRight, Shield, Zap, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const LOGO_URL = "https://cdn.discordapp.com/icons/1514659760538914936/a_4ef6e3637bc7a5be3cf9d036ea240d4d.gif?size=2048";

export default function App() {
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'INR'>('USD');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('Booting hypervisor interface...');

  // Progress preloader sequence to reflect high spec boot times
  useEffect(() => {
    const messages = [
      'Resolving secure endpoints...',
      'Matching SSL/DDoS edge certificates...',
      'Connecting to Shironex Cloud core hypervisors...',
      'Resolving 10 Gbps global transit networks...',
      'Allocating high-speed Ryzen 9 7950X compute nodes...',
      'Mounting NVMe virtual partitions...',
      'Synchronizing multi-tenant dashboard...',
      'ShironexCloud Secure Session Acquired!'
    ];

    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
          }, 350);
          return 100;
        }
        
        const next = prev + Math.floor(Math.random() * 8) + 4;
        const bounded = Math.min(100, next);

        const msgIndex = Math.min(
          messages.length - 1,
          Math.floor((bounded / 100) * messages.length)
        );
        setLoadingMessage(messages[msgIndex]);

        return bounded;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Smooth scroll to segment index
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Simulated server deployed success handler
  const handleDeployServer = (specs: {
    name: string;
    type: 'minecraft' | 'vps' | 'bot' | 'dedicated';
    ram: number;
    cpu: number;
    disk: number;
    price: number;
    location: string;
  }) => {
    console.log('Deploying customized node speculation:', specs);
  };

  const faqs = [
    {
      q: 'How fast is server provisioning on ShironexCloud?',
      a: 'All Minecraft plans, VPS nodes, and Discord bots provision instantly upon transaction verification on Frankfurt hypervisors. You can manage them in real-time with direct root shell commands.'
    },
    {
      q: 'Do you offer AMD Ryzen 9 physical hardware CPUs?',
      a: 'Yes. Our plans execute strictly on premium physical AMD Ryzen 9 clocked at high-performance 4.5GHz+ base clocks, eliminating sudden tick drops, stutters, or noisy neighbor anomalies.'
    },
    {
      q: 'What is the refund policy structure?',
      a: 'We provide an official 12-Hour Refund Promise across all Minecraft hosts, Bot slots, and standard Cloud VPS options. If you are not satisfied, raise a ticket inside our community Discord within 12 hours.'
    },
    {
      q: 'Is there direct database or console ports access?',
      a: 'Absolutely! Root SSH parameters, secure SFTP folders access, custom database creation, and full network route mappings are fully integrated into user configurations.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#040406] text-gray-100 flex flex-col font-sans antialiased overflow-x-hidden select-none">
      
      {/* 1. Animated preloader sequence */}
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              scale: 0.97,
              filter: 'blur(12px)',
              transition: { duration: 0.35, ease: 'easeInOut' }
            }}
            className="fixed inset-0 z-[999] bg-[#040406] flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-purple-600/10 filter blur-3xl pointer-events-none" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-indigo-600/5 filter blur-3xl pointer-events-none" />

            <div className="relative max-w-sm w-full space-y-8 flex flex-col items-center z-10">
              
              {/* Rotating outer frame */}
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
                  className="absolute inset-[-12px] rounded-full bg-gradient-to-tr from-purple-600 via-transparent to-indigo-500 opacity-60 blur-md"
                />
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="relative w-24 h-24 rounded-2xl bg-zinc-950 p-4 border border-zinc-850 flex items-center justify-center shadow-2xl"
                >
                  <img
                    src={LOGO_URL}
                    referrerPolicy="no-referrer"
                    alt="ShironexCloud Loading"
                    className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]"
                  />
                </motion.div>
              </div>

              {/* Loader description titles */}
              <div className="space-y-1.5">
                <motion.h2 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="font-display text-2xl font-black tracking-widest text-white uppercase"
                >
                  SHIRONEX<span className="text-purple-405 font-sans font-bold">CLOUD</span>
                </motion.h2>
                <p className="text-[10px] uppercase tracking-widest font-mono text-zinc-500 flex items-center justify-center gap-1">
                  <Shield className="w-3 h-3 text-purple-450" />
                  <span>High Compute Gaming Infrastructure</span>
                </p>
              </div>

              {/* Progress and indicators */}
              <div className="w-full space-y-4">
                <div className="w-full bg-zinc-950 rounded-full h-1.5 p-0.5 border border-zinc-900 overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-500 h-full rounded-full"
                    style={{ width: `${loadingProgress}%` }}
                  />
                </div>

                <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400">
                  <motion.div 
                    key={loadingMessage}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="capitalize text-zinc-400 flex items-center gap-1.5 h-4"
                  >
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                    <span>{loadingMessage}</span>
                  </motion.div>
                  <span className="font-bold text-purple-400">{loadingProgress}%</span>
                </div>
              </div>

              {/* System logs output terminal simulation */}
              <div className="w-full p-3.5 bg-black/95 rounded-xl border border-zinc-900 font-mono text-[9px] text-zinc-550 h-20 overflow-hidden relative text-left">
                <div className="space-y-1 select-none">
                  <div>[ SYSTEM ] Initializing ShironexCloud telemetry loop...</div>
                  <div>[ OK ] Loaded DDR5 ECC memory registers</div>
                  <div>[ OK ] Connect anycast edge routing nodes</div>
                  {loadingProgress > 45 && <div>[ OK ] Smart DDoS 1.2 Tbit shield filters enabled</div>}
                  {loadingProgress > 75 && <div>[ PROCESS ] Synchronized registrar namespaces</div>}
                  {loadingProgress > 90 && <div>[ OK ] Security tokens acquired. BOOT SUCCESSFUL.</div>}
                </div>
                <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-black to-transparent pointer-events-none" />
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Floating glass Header menu */}
      <Header
        currency={currency}
        setCurrency={setCurrency}
        scrollToSection={scrollToSection}
      />

      {/* 3. Main Page Content Sections */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <Hero 
          onDeployClick={(cat) => scrollToSection(`${cat}-pricing`)}
          scrollToSection={scrollToSection}
        />

        {/* Feature grid & Centered advanced specs cards */}
        <Features />

        {/* Minecraft plans, Bot plans, VPS pricing plans */}
        <Services 
          currency={currency}
          onDeployServer={handleDeployServer}
        />

        {/* Domain Search Section with Popular TLD pills */}
        <Domains 
          currency={currency}
        />

        {/* Real-time Status monitors and Latency testing speedtest */}
        <Locations />

        {/* Interactive FAQ list Section */}
        <section className="py-20 px-4 md:px-8 bg-[#040406] border-t border-zinc-900 scroll-mt-20">
          <div className="max-w-4xl mx-auto space-y-12">
            
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 bg-purple-950/45 border border-purple-800/10 rounded-full px-4.5 py-1.5 text-xs text-purple-300 font-bold uppercase tracking-wider">
                <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
                <span>Frequently Answered Details</span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-black text-white">
                Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">Questions</span>
              </h2>
            </div>

            {/* Accordion lists */}
            <div className="space-y-4 max-w-3xl mx-auto">
              {faqs.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div 
                    key={index}
                    className="bg-[#08080d]/80 border border-zinc-900 rounded-2xl p-5 hover:border-purple-500/25 text-left transition duration-200 cursor-pointer"
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    id={`faq-accordion-${index}`}
                  >
                    <div className="flex justify-between items-center gap-4">
                      <strong className="text-xs md:text-sm font-extrabold text-zinc-100">{faq.q}</strong>
                      <ChevronDown className={`w-4 h-4 text-purple-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </div>
                    
                    {isOpen && (
                      <p className="text-xs text-zinc-400 mt-3 leading-relaxed font-sans border-t border-zinc-900/60 pt-3">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Support with community Discord link banner */}
            <div className="bg-gradient-to-r from-[#0d0d17] to-[#040406] border border-zinc-900 rounded-[28px] p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-left relative overflow-hidden max-w-3xl mx-auto">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full filter blur-2xl pointer-events-none" />
              
              <div className="space-y-2 relative z-10">
                <div className="flex items-center gap-2 text-xs text-purple-400 font-extrabold uppercase font-mono tracking-widest">
                  <MessageSquare className="w-4 h-4 text-purple-400 animate-pulse" />
                  <span>Instant support</span>
                </div>
                <h3 className="text-[15px] font-black font-display text-white">Join the Community Discord</h3>
                <p className="text-xs text-zinc-400 max-w-md leading-relaxed font-sans">
                  Have unique custom requirements, need a targeted dedicated quote, or seeking billing support? Talk to our sysadmins today.
                </p>
              </div>

              <a
                href="https://discord.com/channels/1494365554385883397/1494365555594104982/1518519336971665459"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-md shadow-indigo-950/20 w-full md:w-auto text-center font-sans"
              >
                <span>Join Support Channel</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </section>

      </main>

      {/* Footer containing Terms, Privacy overlay dialogs */}
      <Footer 
        scrollToSection={scrollToSection}
      />

    </div>
  );
}
