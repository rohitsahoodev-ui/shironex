export interface ServerInstance {
  id: string;
  name: string;
  type: 'minecraft' | 'vps' | 'bot' | 'dedicated';
  status: 'online' | 'offline' | 'starting' | 'stopping';
  ram: number; // in GB
  cpu: number; // in cores or percentage
  disk: number; // in GB
  location: string;
  ip: string;
  port: number;
  maxPlayers?: number;
  onlinePlayers?: number;
  uptime?: string; // in seconds or custom format
}

export interface LocationNode {
  code: string;
  name: string;
  country: string;
  pingMs: number;
  x: number; // percentage X position for the SVG world map (0 to 100)
  y: number; // percentage Y position for the SVG world map (0 to 100)
  status: 'optimal' | 'good' | 'fair';
}

export interface HostingPlan {
  id: string;
  type: 'minecraft' | 'vps' | 'bot' | 'dedicated';
  name: string;
  price: number;
  ram: string;
  cpu: string;
  disk: string;
  features: string[];
  popular?: boolean;
}

export interface ConsoleLog {
  timestamp: string;
  type: 'info' | 'warn' | 'error' | 'command';
  message: string;
}

export interface ServerFile {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size?: string;
  content?: string;
  children?: ServerFile[];
}

export interface PluginItem {
  id: string;
  name: string;
  version: string;
  downloads: string;
  description: string;
  category: 'Spigot' | 'Paper' | 'System' | 'Security';
  installed: boolean;
}
