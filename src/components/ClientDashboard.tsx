import React, { useState, useEffect, useRef } from 'react';
import { ServerInstance, ConsoleLog, ServerFile, PluginItem } from '../types';
import { MOCK_FILES, MOCK_PLUGINS } from '../data/mockData';
import { 
  Server, Cpu, HardDrive, Terminal, Play, Square, RefreshCw, 
  Folder, File, Settings, Users, Save, Plus, Trash2, 
  Download, Archive, Check, Globe, HelpCircle, Loader2, PlayCircle
} from 'lucide-react';

interface ClientDashboardProps {
  servers: ServerInstance[];
  setServers: React.Dispatch<React.SetStateAction<ServerInstance[]>>;
}

export default function ClientDashboard({ servers, setServers }: ClientDashboardProps) {
  const [selectedSrvId, setSelectedSrvId] = useState<string>(servers[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'console' | 'files' | 'plugins' | 'backups' | 'players'>('console');
  
  // Server-specific terminal logs container
  const [serverLogs, setServerLogs] = useState<Record<string, ConsoleLog[]>>({});
  const [terminalInput, setTerminalInput] = useState('');
  
  // File System Manager States
  const [currentFiles, setCurrentFiles] = useState<ServerFile[]>(MOCK_FILES);
  const [openFile, setOpenFile] = useState<ServerFile | null>(null);
  const [fileEditorText, setFileEditorText] = useState('');
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);

  // Plugins Installer States
  const [plugins, setPlugins] = useState<PluginItem[]>(MOCK_PLUGINS);

  // Backup archiving
  const [backups, setBackups] = useState<Array<{ id: string; name: string; size: string; date: string }>>([
    { id: 'b-1', name: 'Automatic Pre-Upgrade Backup', size: '124 MB', date: '2026-06-18' },
    { id: 'b-2', name: 'Survival State Day 100', size: '280 MB', date: '2026-06-12' },
  ]);
  const [backupName, setBackupName] = useState('');

  // Connected Players List (Minecraft specific)
  const [players, setPlayers] = useState<Array<{ uuid: string; name: string; ping: number }>>([
    { uuid: '0ab-12', name: 'Alex_Pro32', ping: 12 },
    { uuid: 'df3-8c', name: 'CraftMaster99', ping: 25 },
    { uuid: 'ef4-91', name: 'VanillaGamer', ping: 48 },
    { uuid: 'bc2-10', name: 'Sg_Ping_King', ping: 5 },
  ]);

  const logsEndRef = useRef<HTMLDivElement>(null);
  const activeSrv = servers.find(s => s.id === selectedSrvId) || servers[0];

  // Auto-scroll terminal
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [serverLogs, selectedSrvId, activeTab]);

  // Handle default initial console logs for each server on discovery
  useEffect(() => {
    if (!activeSrv) return;
    const srvId = activeSrv.id;

    if (!serverLogs[srvId]) {
      const stamp = () => new Date().toLocaleTimeString();
      const initialLogs: ConsoleLog[] = [
        { timestamp: stamp(), type: 'info', message: `Initializing Pterodactyl container mapping on ${activeSrv.ip}...` },
        { timestamp: stamp(), type: 'info', message: 'LXC hypervisor virtualization completed successfully.' },
        { timestamp: stamp(), type: 'info', message: `Mounting NVMe virtual storage block... Size: ${activeSrv.disk} GB` },
      ];

      if (activeSrv.status === 'online') {
        initialLogs.push(
          { timestamp: stamp(), type: 'info', message: 'Allocating listening sockets and firewall routing rules...' },
          { timestamp: stamp(), type: 'info', message: `Server system listening on port ${activeSrv.port}!` },
          { timestamp: stamp(), type: 'info', message: 'Standard kernel bootstrap done (0.421s). Console terminal operational.' }
        );
        if (activeSrv.type === 'minecraft') {
          initialLogs.push(
            { timestamp: stamp(), type: 'info', message: '[Minecraft Server] Spigot Jar identified. Loading worlds default configurations.' },
            { timestamp: stamp(), type: 'info', message: '[Minecraft Server] Done! Type /help or /commands for active macros.' }
          );
        } else if (activeSrv.type === 'vps') {
          initialLogs.push(
            { timestamp: stamp(), type: 'info', message: '[System Alert] SSH service successfully bounded on port 22.' },
            { timestamp: stamp(), type: 'info', message: 'Ubuntu 24.04 LTS ready for user login credentials.' }
          );
        }
      } else {
        initialLogs.push(
          { timestamp: stamp(), type: 'warn', message: 'Container status is OFFLINE. Select [Start Node] to trigger boot.' }
        );
      }

      setServerLogs(prev => ({ ...prev, [srvId]: initialLogs }));
    }
  }, [selectedSrvId]);

  // Live Stats simulator ticker
  useEffect(() => {
    const statTicker = setInterval(() => {
      setServers((prevServers) => 
        prevServers.map((srv) => {
          if (srv.status !== 'online') return { ...srv, cpu: 0, ram: 0 };
          
          // Moderate natural shifts in cpu and ram metrics
          const cpuDelta = (Math.random() * 8) - 4;
          const ramDelta = (Math.random() * 0.1) - 0.05;
          
          const maxRamAllocated = srv.id.includes('vps') ? 4 : 8; // dummy max thresholds
          const nextCpu = Math.min(100, Math.max(1, +(srv.cpu + cpuDelta).toFixed(1)));
          const nextRam = Math.min(srv.id.includes('vps') ? 2 : 6, Math.max(0.2, +(srv.ram + ramDelta).toFixed(2)));

          return {
            ...srv,
            cpu: nextCpu,
            ram: nextRam
          };
        })
      );
    }, 3000);

    return () => clearInterval(statTicker);
  }, []);

  const addLogMessage = (srvId: string, message: string, type: 'info' | 'warn' | 'error' | 'command' = 'info') => {
    const stamp = new Date().toLocaleTimeString();
    setServerLogs(prev => {
      const currentSrvLogs = prev[srvId] || [];
      return {
        ...prev,
        [srvId]: [...currentSrvLogs, { timestamp: stamp, type, message }]
      };
    });
  };

  // Node controls: Start / Stop / Restart
  const handleServerAction = (action: 'start' | 'stop' | 'restart') => {
    if (!activeSrv) return;
    const srvId = activeSrv.id;

    if (action === 'stop') {
      if (activeSrv.status === 'offline') return;
      
      setServers(prev => prev.map(s => s.id === srvId ? { ...s, status: 'stopping' } : s));
      addLogMessage(srvId, 'Received system poweroff request... Terminating children sockets.', 'warn');
      
      setTimeout(() => {
        setServers(prev => prev.map(s => s.id === srvId ? { ...s, status: 'offline', cpu: 0, ram: 0, onlinePlayers: 0 } : s));
        addLogMessage(srvId, 'LXC virtualization thread terminated successfully. Node is OFFLINE.', 'error');
      }, 1500);

    } else if (action === 'start') {
      if (activeSrv.status === 'online') return;

      setServers(prev => prev.map(s => s.id === srvId ? { ...s, status: 'starting' } : s));
      addLogMessage(srvId, 'Triggering virtual hypervisor hardware bootstrap sequence...', 'info');

      setTimeout(() => {
        setServers(prev => prev.map(s => s.id === srvId ? { ...s, status: 'online', cpu: 22, ram: 1.5, onlinePlayers: 0 } : s));
        addLogMessage(srvId, 'System core bounded successfully! Operational metrics listening.', 'info');
        if (activeSrv.type === 'minecraft') {
          addLogMessage(srvId, '[Spigot Launcher] Server initialization successfully completed! Playing port 25565.', 'info');
        }
      }, 2000);

    } else if (action === 'restart') {
      addLogMessage(srvId, 'Triggering server warm-rebuild routine...', 'warn');
      handleServerAction('stop');
      setTimeout(() => {
        handleServerAction('start');
      }, 1800);
    }
  };

  // Command prompt handler
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim() || !activeSrv) return;
    const srvId = activeSrv.id;
    const cmd = terminalInput.trim();

    // Log the user typed command
    addLogMessage(srvId, `> ${cmd}`, 'command');
    setTerminalInput('');

    // Handle command outputs inside sandbox
    setTimeout(() => {
      const lowerCmd = cmd.toLowerCase();
      if (lowerCmd === '/help' || lowerCmd === '/commands' || lowerCmd === 'help') {
        addLogMessage(srvId, '=== Shironex Console Help Menu ===', 'info');
        addLogMessage(srvId, '/status - Display system kernel memory map and loads', 'info');
        addLogMessage(srvId, '/plugins - Lists active Java Spigot plugins', 'info');
        addLogMessage(srvId, '/say <message> - Echo messages out to system console log', 'info');
        addLogMessage(srvId, '/op <username> - Elevate username credentials to Admin operator', 'info');
        addLogMessage(srvId, '/clear - Wipe terminal log console', 'info');
        addLogMessage(srvId, '/stop - Gracefully stop virtual server threads', 'info');
      } else if (lowerCmd === '/status') {
        addLogMessage(srvId, `[Syslog] Uptime CPU state: ${activeSrv.cpu}%, RAM capacity active: ${activeSrv.ram} GB / Max assigned`, 'info');
        addLogMessage(srvId, `[Syslog] Storage NVMe mapping: ${activeSrv.disk} GB write limits, IO blocks optimized.`, 'info');
      } else if (lowerCmd === '/plugins') {
        const activePlugNames = plugins.filter(p => p.installed).map(p => p.name).join(', ');
        addLogMessage(srvId, `Installed plugins jar active: [${activePlugNames || 'None'}]`, 'info');
      } else if (lowerCmd.startsWith('/say ')) {
        const sayMsg = cmd.substring(5);
        addLogMessage(srvId, `[Console Broadcast] ${sayMsg}`, 'warn');
      } else if (lowerCmd.startsWith('/op ')) {
        const opUser = cmd.substring(4);
        addLogMessage(srvId, `[Console Alert] Elevated ${opUser} UUID to Server Operator rank.`, 'info');
      } else if (lowerCmd === '/clear') {
        setServerLogs(prev => ({ ...prev, [srvId]: [] }));
      } else if (lowerCmd === '/stop') {
        handleServerAction('stop');
      } else {
        addLogMessage(srvId, `Unknown command: "${cmd}". Type /help for available options.`, 'error');
      }
    }, 450);
  };

  // Code editor saves
  const saveFileContent = () => {
    if (!openFile) return;
    
    // Save content to our currentFiles tree
    const updateTreeRecurse = (nodes: ServerFile[]): ServerFile[] => {
      return nodes.map(node => {
        if (node.id === openFile.id) {
          return { ...node, content: fileEditorText };
        }
        if (node.children) {
          return { ...node, children: updateTreeRecurse(node.children) };
        }
        return node;
      });
    };

    setCurrentFiles(prev => updateTreeRecurse(prev));
    setOpenFile(null);
    addLogMessage(activeSrv.id, `File successfully saved down: /${openFile.name}`, 'info');
  };

  const handlePluginInstallToggle = (pluginId: string) => {
    setPlugins(prev => prev.map(p => {
      if (p.id === pluginId) {
        const nextState = !p.installed;
        addLogMessage(
          activeSrv.id, 
          nextState 
            ? `[System] Installed package: ${p.name}.jar (${p.version})` 
            : `[System] Removed plugin config folder: /plugins/${p.name}/`,
          nextState ? 'info' : 'warn'
        );
        return { ...p, installed: nextState };
      }
      return p;
    }));
  };

  const createBackup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!backupName.trim()) return;

    const newBackup = {
      id: `back-${Date.now()}`,
      name: backupName.trim(),
      size: `${(Math.random() * 150 + 50).toFixed(1)} MB`,
      date: new Date().toISOString().split('T')[0],
    };

    setBackups(prev => [newBackup, ...prev]);
    setBackupName('');
    addLogMessage(activeSrv.id, `Archive created: "${newBackup.name}" Snapshot size: ${newBackup.size}`, 'info');
  };

  // Kick Online Player
  const kickPlayerStr = (name: string) => {
    setPlayers(prev => prev.filter(p => p.name !== name));
    addLogMessage(activeSrv.id, `Kicked player from console: "${name}" connection closed.`, 'warn');
  };

  // Breadcrumbs helper
  const navigateFilesDown = (node: ServerFile) => {
    if (node.type === 'folder' && node.children) {
      setCurrentFiles(node.children);
    } else if (node.type === 'file') {
      setOpenFile(node);
      setFileEditorText(node.content || '');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 text-left">
      
      {/* Real Live Panel Link Notice Banner */}
      <div className="mb-8 relative group" id="live-panel-banner">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 rounded-2xl blur opacity-35 group-hover:opacity-60 transition duration-700 animate-pulse"></div>
        <div className="relative bg-[#07070a] border border-[#2d1b4e]/40 rounded-2xl p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-5 text-left">
          <div className="flex items-start md:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-zinc-950 p-2 flex items-center justify-center border border-zinc-800 shrink-0 shadow-xl">
              <img
                src="https://cdn.discordapp.com/icons/1514659760538914936/a_4ef6e3637bc7a5be3cf9d036ea240d4d.gif?size=2048"
                referrerPolicy="no-referrer"
                alt="ShironexCloud Logo"
                className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(139,92,246,0.4)]"
              />
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-extrabold text-white tracking-wide font-display">ShironexCloud Live Pterodactyl Nodes</span>
                <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full px-2 py-0.5 text-[9px] uppercase font-bold tracking-wider animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Online System
                </span>
              </div>
              <p className="text-zinc-400 text-xs max-w-xl font-sans leading-relaxed">
                Connect and manage high-performance Game VPS resources, custom Discord bots, virtual Minecraft servers, and physical dedicated clusters directly on our real live deployment panel.
              </p>
            </div>
          </div>
          <a
            href="https://panel.shironex.fun/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition duration-350 flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-lg shadow-violet-950/40 border border-violet-500/20 active:scale-95 text-center"
            id="btn-live-panel-redirect"
          >
            <span>Open Real Panel</span>
            <Globe className="w-4 h-4 text-violet-200 animate-pulse" />
          </a>
        </div>
      </div>

      {/* Title Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-900 pb-5 mb-8 gap-4">
        <div>
          <h1 className="font-display text-2xl font-black text-white uppercase tracking-wider">Shironex Console Area</h1>
          <p className="text-zinc-500 font-sans text-xs mt-0.5">Dual multiplex clusters. Fast, isolated, containerized, direct shell actions.</p>
        </div>

        <div className="flex gap-2">
          {/* Active Servers selectors dropdown */}
          <div className="flex items-center gap-2 bg-zinc-950 px-3.5 py-2 border border-zinc-900 rounded-xl">
            <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500">server selection</span>
            <select
              value={selectedSrvId}
              onChange={(e) => setSelectedSrvId(e.target.value)}
              className="bg-[#0b0b0f] border-0 text-xs font-bold text-violet-400 focus:outline-none focus:ring-0 cursor-pointer"
              id="dashboard-srv-select"
            >
              {servers.map((srv) => (
                <option key={srv.id} value={srv.id} className="bg-[#0b0b0f] text-gray-200">
                  {srv.name} ({srv.location.split(' ')[0]})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Server Details Sidebar Node */}
        <div className="lg:col-span-4 bg-[#0a0a0f] border border-zinc-800 rounded-2xl p-5 space-y-6 relative overflow-hidden h-fit">
          <div className="absolute top-0 right-0 w-24 h-24 bg-violet-600/5 rounded-full filter blur-xl"></div>

          {activeSrv ? (
            <div className="space-y-6 text-left">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-widest">Active Instance Details</span>
                  <span className={`px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded border ${
                    activeSrv.status === 'online'
                      ? 'bg-emerald-950/40 border-emerald-900/60 text-emerald-400'
                      : activeSrv.status === 'offline'
                      ? 'bg-rose-950/40 border-rose-900/60 text-rose-400'
                      : 'bg-amber-950/40 border-amber-900/60 text-amber-400 animate-pulse'
                  }`} id="srv-state-badge">
                    {activeSrv.status}
                  </span>
                </div>
                <h2 className="text-md font-bold text-white tracking-wide">{activeSrv.name}</h2>
                <code className="text-xs text-zinc-400 font-mono bg-zinc-950 px-2.5 py-1 rounded inline-block border border-zinc-900">
                  {activeSrv.ip}:{activeSrv.port}
                </code>
              </div>

              {/* Server controls */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleServerAction('start')}
                  disabled={activeSrv.status === 'online' || activeSrv.status === 'starting'}
                  className="py-2.5 bg-emerald-950/40 border border-emerald-900 hover:bg-emerald-900/40 disabled:opacity-30 disabled:hover:bg-transparent text-emerald-400 rounded-xl text-xs font-semibold uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1.5 focus:outline-none"
                  id="srv-btn-start"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Start</span>
                </button>
                <button
                  onClick={() => handleServerAction('stop')}
                  disabled={activeSrv.status === 'offline' || activeSrv.status === 'stopping'}
                  className="py-2.5 bg-rose-950/40 border border-rose-900 hover:bg-rose-900/40 disabled:opacity-30 disabled:hover:bg-transparent text-rose-400 rounded-xl text-xs font-semibold uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1.5 focus:outline-none"
                  id="srv-btn-stop"
                >
                  <Square className="w-3.5 h-3.5" />
                  <span>Stop</span>
                </button>
                <button
                  onClick={() => handleServerAction('restart')}
                  disabled={activeSrv.status === 'offline'}
                  className="py-2.5 bg-violet-950/40 border border-violet-900 hover:bg-violet-900/40 disabled:opacity-30 disabled:hover:bg-transparent text-violet-400 rounded-xl text-xs font-semibold uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1.5 focus:outline-none"
                  id="srv-btn-restart"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reboot</span>
                </button>
              </div>

              {/* Specs gauges */}
              <div className="space-y-4 pt-4 border-t border-zinc-900">
                {/* Gauge CPU */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400 font-mono uppercase text-[10px]">Virtual Processor load</span>
                    <strong className="text-zinc-200">{activeSrv.cpu}%</strong>
                  </div>
                  <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden border border-zinc-900">
                    <div 
                      className="bg-violet-500 h-full rounded-full transition-all duration-1000" 
                      style={{ width: `${activeSrv.cpu}%` }}
                    ></div>
                  </div>
                </div>

                {/* Gauge RAM */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400 font-mono uppercase text-[10px]">Memory Allocated Alloc</span>
                    <strong className="text-zinc-200">{activeSrv.ram} GB</strong>
                  </div>
                  <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden border border-zinc-900">
                    <div 
                      className="bg-indigo-500 h-full rounded-full transition-all duration-1000" 
                      style={{ width: `${(activeSrv.ram / 8) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Static Storage */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400 font-mono uppercase text-[10px]">NVMe Array Blocks Read</span>
                    <strong className="text-zinc-200">{activeSrv.disk} GB</strong>
                  </div>
                  <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden border border-zinc-900">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
              </div>

              {/* Dynamic Metadata Details */}
              <div className="p-3.5 bg-zinc-950 rounded-xl border border-zinc-900 text-xs text-gray-400 space-y-2">
                <div className="flex justify-between">
                  <span>Routing Cluster:</span>
                  <span className="text-white font-semibold font-mono text-[10px]">{activeSrv.location}</span>
                </div>
                {activeSrv.uptime && (
                  <div className="flex justify-between">
                    <span>Uptime Tracker:</span>
                    <span className="text-white font-semibold font-mono text-[10px]">{activeSrv.uptime}</span>
                  </div>
                )}
                {activeSrv.maxPlayers && (
                  <div className="flex justify-between">
                    <span>Players Online:</span>
                    <span className="text-emerald-400 font-bold font-mono text-[10px]">
                      {players.length} / {activeSrv.maxPlayers}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-10">No servers deployed yet. Order plans on website first.</div>
          )}
        </div>

        {/* Right Active Dashboard Tabs Viewport */}
        <div className="lg:col-span-8 bg-[#0a0a0f] border border-zinc-800 rounded-2xl flex flex-col min-h-[500px]">
          
          {/* Tabs header row */}
          <div className="flex flex-wrap border-b border-zinc-900 bg-zinc-950/80 rounded-t-2xl px-4 py-2 gap-1">
            <button
              onClick={() => setActiveTab('console')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 cursor-pointer focus:outline-none ${
                activeTab === 'console' ? 'bg-[#0a0a0f] text-white border-b-2 border-violet-500' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Console Log</span>
            </button>
            <button
              onClick={() => setActiveTab('files')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 cursor-pointer focus:outline-none ${
                activeTab === 'files' ? 'bg-[#0a0a0f] text-white border-b-2 border-violet-500' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Folder className="w-3.5 h-3.5" />
              <span>SFTP Files</span>
            </button>
            <button
              onClick={() => setActiveTab('plugins')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 cursor-pointer focus:outline-none ${
                activeTab === 'plugins' ? 'bg-[#0a0a0f] text-white border-b-2 border-violet-500' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Plugins manager</span>
            </button>
            <button
              onClick={() => setActiveTab('backups')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 cursor-pointer focus:outline-none ${
                activeTab === 'backups' ? 'bg-[#0a0a0f] text-white border-b-2 border-violet-500' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Archive className="w-3.5 h-3.5" />
              <span>System Backups</span>
            </button>
            {activeSrv?.type === 'minecraft' && (
              <button
                onClick={() => setActiveTab('players')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 cursor-pointer focus:outline-none ${
                  activeTab === 'players' ? 'bg-[#0a0a0f] text-white border-b-2 border-violet-500' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Player lists</span>
              </button>
            )}
          </div>

          {/* Active View Blocks overlay */}
          <div className="p-6 flex-1 flex flex-col justify-between">
            
            {/* TABS 1: CONSOLE WRAPPER */}
            {activeTab === 'console' && (
              <div className="flex-1 flex flex-col h-full space-y-4">
                <div className="flex-1 bg-black rounded-lg border border-zinc-900 p-4 font-mono text-xs overflow-y-auto text-left h-72 space-y-1 sticky">
                  {serverLogs[activeSrv?.id] && serverLogs[activeSrv.id].length > 0 ? (
                    serverLogs[activeSrv.id].map((log, index) => (
                      <div key={index} className="leading-relaxed">
                        <span className="text-zinc-600">[{log.timestamp}]</span>{' '}
                        {log.type === 'error' ? (
                          <span className="text-rose-500 font-bold">[ERR/SHUTDOWN]: {log.message}</span>
                        ) : log.type === 'warn' ? (
                          <span className="text-amber-400 font-bold">[WARN/SYSALERT]: {log.message}</span>
                        ) : log.type === 'command' ? (
                          <span className="text-violet-400 font-semibold">{log.message}</span>
                        ) : (
                          <span className="text-zinc-300 font-light">[INFO/SYSTEM]: {log.message}</span>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-zinc-600 italic">No terminal outputs bounded logs...</div>
                  )}
                  <div ref={logsEndRef}></div>
                </div>

                {/* Shell input trigger */}
                <form onSubmit={handleTerminalSubmit} className="flex gap-2.5">
                  <input
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    disabled={activeSrv?.status !== 'online'}
                    placeholder={activeSrv?.status === 'online' ? "Provide command (e.g. /help, /say Hello, /status, /plugins)..." : "Terminal inactive while server is offline."}
                    className="flex-1 bg-black border border-zinc-800 focus:border-violet-600 rounded-xl px-4 py-3 text-xs text-emerald-400 font-mono transition focus:outline-none placeholder-zinc-600"
                    id="console-terminal-input"
                  />
                  <button
                    type="submit"
                    disabled={activeSrv?.status !== 'online' || !terminalInput.trim()}
                    className="px-5 bg-gradient-to-r from-violet-600 to-fuchsia-600 disabled:opacity-40 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
                    id="console-terminal-submit"
                  >
                    Send
                  </button>
                </form>
              </div>
            )}

            {/* TABS 2: SFTP FILE MANAGER */}
            {activeTab === 'files' && (
              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-zinc-900/60">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">Directory: /home/minecraft</h3>
                  <button
                    onClick={() => setCurrentFiles(MOCK_FILES)}
                    className="text-[10px] text-violet-400 mt-1 font-semibold hover:underline bg-transparent"
                  >
                    Root Directory
                  </button>
                </div>

                {/* List items directory */}
                <div className="grid grid-cols-1 gap-2 bg-zinc-950 p-2.5 border border-zinc-900 rounded-xl h-64 overflow-y-auto">
                  {currentFiles.map((node) => (
                    <button
                      key={node.id}
                      onClick={() => navigateFilesDown(node)}
                      className="w-full flex items-center justify-between p-2.5 hover:bg-[#0c0c12]/85 focus:outline-none rounded-lg text-xs hover:border-violet-950/20 text-left cursor-pointer border border-transparent transition"
                      id={`file-node-${node.id}`}
                    >
                      <div className="flex items-center gap-3">
                        {node.type === 'folder' ? (
                          <Folder className="w-4 h-4 text-violet-400" />
                        ) : (
                          <File className="w-4 h-4 text-indigo-400" />
                        )}
                        <span className="text-gray-300 font-mono">{node.name}</span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-[10px] text-zinc-500 font-mono">
                        {node.size && <span>{node.size}</span>}
                        <span className="uppercase text-[9px] text-zinc-600 font-bold">{node.type}</span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-[10px] text-gray-500">
                  <PlayCircle className="w-3.5 h-3.5 text-violet-400" />
                  <span>Click on `.properties`, `.json`, or `.yml` configs to open them in our interactive code editor.</span>
                </div>
              </div>
            )}

            {/* TABS 3: PLUGINS INSTALLER */}
            {activeTab === 'plugins' && (
              <div className="flex-1 space-y-4">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 pb-2 border-b border-zinc-900/60">Paper/Spigot Plugins Marketplace</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-72 overflow-y-auto pr-1">
                  {plugins.map((plugin) => (
                    <div key={plugin.id} className="bg-zinc-950 border border-zinc-900 rounded-xl p-4 flex flex-col justify-between text-left">
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-start">
                          <h4 className="text-xs font-bold text-gray-100">{plugin.name}</h4>
                          <span className="bg-violet-950/40 border border-violet-900/30 text-violet-400 text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                            {plugin.category}
                          </span>
                        </div>
                        <p className="text-[10px] text-zinc-400 leading-normal line-clamp-2">{plugin.description}</p>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-zinc-900 mt-2">
                        <span className="text-[9px] font-mono text-zinc-500">Downloads: {plugin.downloads}</span>
                        <button
                          onClick={() => handlePluginInstallToggle(plugin.id)}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wide cursor-pointer transition ${
                            plugin.installed 
                              ? 'bg-emerald-950/40 border border-emerald-900 text-emerald-400' 
                              : 'bg-zinc-900 hover:bg-zinc-800 text-gray-300'
                          }`}
                          id={`plugin-btn-toggle-${plugin.id}`}
                        >
                          {plugin.installed ? 'Config Active' : 'Install Jar'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TABS 4: SYSTEM BACKUPS */}
            {activeTab === 'backups' && (
              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-zinc-900/60">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">Restore points snapshots</h3>
                  <span className="text-[10px] font-mono text-zinc-500">{backups.length} snapshots total</span>
                </div>

                {/* Create Backup trigger bar */}
                <form onSubmit={createBackup} className="flex gap-2.5 bg-zinc-950/60 p-3 rounded-xl border border-zinc-900/60 items-center">
                  <input
                    type="text"
                    value={backupName}
                    onChange={(e) => setBackupName(e.target.value)}
                    required
                    placeholder="E.g. Survival Day 50 snapshot label"
                    className="flex-1 bg-black border border-zinc-850 focus:border-violet-600 rounded-xl px-3 py-2 text-xs text-gray-200 transition focus:outline-none font-sans"
                    id="backup-input-name"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-[10px] font-bold uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5"
                    id="backup-btn-submit"
                  >
                    <Archive className="w-3.5 h-3.5" />
                    <span>Create Archive</span>
                  </button>
                </form>

                <div className="space-y-2.5 max-h-56 overflow-y-auto">
                  {backups.map((bk) => (
                    <div key={bk.id} className="flex justify-between items-center p-3 bg-zinc-950 border border-zinc-900 rounded-xl text-xs text-left">
                      <div className="space-y-0.5">
                        <h4 className="font-semibold text-gray-200">{bk.name}</h4>
                        <div className="flex gap-3 text-[10px] text-zinc-500">
                          <span>Size: {bk.size}</span>
                          <span>Created: {bk.date}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => addLogMessage(activeSrv.id, `Triggered server recovery from backup snapshot: ${bk.name}...`, 'warn')}
                        className="px-3.5 py-1.5 bg-zinc-900 border border-zinc-850 hover:bg-zinc-850 text-gray-400 hover:text-white rounded-lg text-[10px] font-medium transition cursor-pointer"
                        id={`backup-restore-${bk.id}`}
                      >
                        Restore State
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TABS 5: PLAYERS LISTS (MC Specific) */}
            {activeTab === 'players' && activeSrv?.type === 'minecraft' && (
              <div className="flex-1 space-y-4">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 pb-2 border-b border-zinc-900/60">Connected players sessions</h3>
                
                <div className="space-y-2.5 max-h-72 overflow-y-auto">
                  {players.length > 0 ? (
                    players.map((plr) => (
                      <div key={plr.uuid} className="flex justify-between items-center p-3 bg-zinc-950 border border-zinc-900 rounded-xl text-xs text-left">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-violet-950 border border-violet-800 flex items-center justify-center font-display text-[10px] text-violet-400 font-extrabold uppercase">
                            {plr.name.substring(0, 2)}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-200">{plr.name}</h4>
                            <span className="text-[9px] font-mono text-zinc-500">UUID: {plr.uuid}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right text-[10px] font-mono">
                            <span className="text-emerald-400 font-bold">{plr.ping} ms </span>
                            <span className="text-zinc-500">ping</span>
                          </div>
                          <button
                            onClick={() => kickPlayerStr(plr.name)}
                            className="px-2.5 py-1.5 bg-rose-950/30 border border-rose-900/20 hover:bg-rose-900/30 text-rose-400 rounded-lg text-[10px] font-semibold transition cursor-pointer"
                            id={`player-kick-${plr.uuid}`}
                          >
                            Kick player
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10 text-zinc-500 text-xs italic">All players disconnected. Server logs ready.</div>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

      {/* INLINE POPUP: File Editor dialogue editor */}
      {openFile && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 flex items-center justify-center p-4">
          <div className="bg-[#0c0c11] border border-zinc-800 rounded-2xl w-full max-w-2xl p-6 text-left shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Configuration editor (SFTP)</span>
                <h3 className="text-sm font-bold text-white mt-0.5 font-mono">/{openFile.name}</h3>
              </div>
              
              <button 
                onClick={() => setOpenFile(null)}
                className="text-gray-400 hover:text-white text-xs font-semibold focus:outline-none cursor-pointer bg-zinc-900 px-3 py-1 rounded"
              >
                Close Editor
              </button>
            </div>

            <textarea
              rows={16}
              value={fileEditorText}
              onChange={(e) => setFileEditorText(e.target.value)}
              className="w-full bg-black border border-zinc-900 rounded-xl px-4 py-3.5 font-mono text-[11px] text-indigo-300 focus:outline-none focus:border-violet-600 focus:ring-0 leading-relaxed resize-y"
              id="editor-textarea"
            />

            <div className="flex justify-between items-center pt-3 border-t border-zinc-900">
              <div className="text-[10px] text-zinc-500 font-mono">
                <span>Character length: {fileEditorText.length} </span>
                <span className="text-zinc-600">|</span>
                <span> Syntax: Standard properties yaml formatting</span>
              </div>

              <button
                onClick={saveFileContent}
                className="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer shadow-lg transition focus:outline-none flex items-center gap-1.5"
                id="editor-btn-save"
              >
                <Save className="w-4 h-4" />
                <span>Save Config</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
