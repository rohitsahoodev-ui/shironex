import { HostingPlan, LocationNode, ServerInstance, ServerFile, PluginItem } from '../types';

export const LOCATION_NODES: LocationNode[] = [
  { code: 'FRA', name: 'Frankfurt', country: 'Germany 🇩🇪', pingMs: 14, x: 50, y: 31, status: 'optimal' },
  { code: 'LND', name: 'London', country: 'United Kingdom 🇬🇧', pingMs: 22, x: 47, y: 28, status: 'optimal' },
  { code: 'HEL', name: 'Helsinki', country: 'Finland 🇫🇮', pingMs: 38, x: 54, y: 22, status: 'good' },
  { code: 'LAX', name: 'Los Angeles', country: 'United States 🇺🇸', pingMs: 110, x: 18, y: 40, status: 'fair' },
  { code: 'VIR', name: 'Virginia', country: 'United States 🇺🇸', pingMs: 82, x: 28, y: 36, status: 'good' },
  { code: 'SGP', name: 'Singapore', country: 'Singapore 🇸🇬', pingMs: 5, x: 74, y: 62, status: 'optimal' },
];

export const HOSTING_PLANS: HostingPlan[] = [
  // Minecraft Plans
  {
    id: 'mc-dirt',
    type: 'minecraft',
    name: 'Dirt Plan',
    price: 2.50,
    ram: '2 GB',
    cpu: '1 vCPU (AMD Ryzen)',
    disk: '15 GB NVMe SSD',
    features: ['DDoS Protection', 'Instant Setup', '99.9% Uptime SLA', 'Full SFTP Access', 'Pterodactyl Panel'],
  },
  {
    id: 'mc-iron',
    type: 'minecraft',
    name: 'Iron Plan',
    price: 5.00,
    ram: '4 GB',
    cpu: '2 vCPU (AMD Ryzen)',
    disk: '30 GB NVMe SSD',
    popular: true,
    features: ['DDoS Protection', 'Instant Setup', '99.9% Uptime SLA', 'Full SFTP Access', 'Pterodactyl Panel', 'Automated Backups'],
  },
  {
    id: 'mc-gold',
    type: 'minecraft',
    name: 'Gold Plan',
    price: 10.00,
    ram: '8 GB',
    cpu: '4 vCPU (AMD Ryzen)',
    disk: '60 GB NVMe SSD',
    features: ['DDoS Protection', 'Instant Setup', '99.9% Uptime SLA', 'Full SFTP Access', 'Pterodactyl Panel', 'Automated Backups', 'Dedicated IP Option'],
  },
  {
    id: 'mc-diamond',
    type: 'minecraft',
    name: 'Diamond Plan',
    price: 15.00,
    ram: '12 GB',
    cpu: '4 vCPU (Ryzen 9 7950X)',
    disk: '90 GB NVMe SSD',
    features: ['DDoS Protection', 'Instant Setup', '99.9% Uptime SLA', 'Full SFTP Access', 'Pterodactyl Panel', 'Free Dedicated IP', 'Priority Support'],
  },

  // VPS Plans
  {
    id: 'vps-nano',
    type: 'vps',
    name: 'KVM Nano',
    price: 3.00,
    ram: '1 GB',
    cpu: '1 vCPU Core',
    disk: '20 GB NVMe SSD',
    features: ['1 Gbps Bandwidth', 'Dedicated IPv4 & IPv6', 'Full Root SSH Access', 'KVM Virtualization', 'Instance Rebuilds'],
  },
  {
    id: 'vps-starter',
    type: 'vps',
    name: 'KVM Starter',
    price: 6.00,
    ram: '2 GB',
    cpu: '2 vCPU Cores',
    disk: '40 GB NVMe SSD',
    popular: true,
    features: ['1 Gbps Bandwidth', 'Dedicated IPv4 & IPv6', 'Full Root SSH Access', 'KVM Virtualization', 'Instance Rebuilds', '1 Automated Snapshot'],
  },
  {
    id: 'vps-medium',
    type: 'vps',
    name: 'KVM Pro',
    price: 12.00,
    ram: '4 GB',
    cpu: '4 vCPU Cores',
    disk: '80 GB NVMe SSD',
    features: ['2 Gbps Bandwidth', 'Dedicated IPv4 & IPv6', 'Full Root SSH Access', 'KVM Virtualization', 'Instance Rebuilds', '3 Automated Snapshots', 'Custom ISO upload'],
  },

  // Bot Plans
  {
    id: 'bot-hobby',
    type: 'bot',
    name: 'Hobbyist Bot',
    price: 1.00,
    ram: '512 MB',
    cpu: '0.5 vCPU Core',
    disk: '5 GB NVMe SSD',
    features: ['Node.js, Python, Java, Go', '24/7 PM2 Autostart', 'GitHub Webhook Sync', 'Live Console Access'],
  },
  {
    id: 'bot-pro',
    type: 'bot',
    name: 'Pro Bot',
    price: 2.50,
    ram: '2 GB',
    cpu: '1 vCPU Core',
    disk: '15 GB NVMe SSD',
    popular: true,
    features: ['Node.js, Python, Java, Go', '24/7 PM2 Autostart', 'GitHub Webhook Sync', 'Live Console & Multi-Process', 'Database Config (MySQL/Redis)'],
  },

  // Dedicated Plans
  {
    id: 'dedi-ryzen',
    type: 'dedicated',
    name: 'Ryzen Power',
    price: 49.00,
    ram: '64 GB DDR5',
    cpu: 'AMD Ryzen 5 7600 (6c/12t)',
    disk: '1 TB NVMe SSD',
    features: ['10 Gbps Unmetered', 'Full IPMI / iLO Access', 'DDoS Corero Filtering', 'Custom Partitioning', '5 Usable IPv4 Address Block'],
  },
  {
    id: 'dedi-beast',
    type: 'dedicated',
    name: 'The Beast',
    price: 89.00,
    ram: '128 GB DDR5',
    cpu: 'AMD Ryzen 9 7950X (16c/32t)',
    disk: '2 TB NVMe SSD Raid 1',
    popular: true,
    features: ['10 Gbps Unmetered', 'Full IPMI / iLO Access', 'DDoS Corero Filtering', 'Custom Partitioning', '13 Usable IPv4 Address Block', 'Premium VLAN routing'],
  }
];

export const INITIAL_SERVERS: ServerInstance[] = [
  {
    id: 'srv-mc-survival',
    name: 'Shironex Community Survival 1.21',
    type: 'minecraft',
    status: 'online',
    ram: 6,
    cpu: 45,
    disk: 22,
    location: 'Singapore (SGP)',
    ip: '139.99.123.45',
    port: 25565,
    maxPlayers: 100,
    onlinePlayers: 34,
    uptime: '15d 4h 12m'
  },
  {
    id: 'srv-vps-web',
    name: 'Main API Webserver',
    type: 'vps',
    status: 'online',
    ram: 2.4,
    cpu: 18,
    disk: 15.5,
    location: 'Frankfurt (FRA)',
    ip: '45.137.9.88',
    port: 22,
    uptime: '47d 18h 5m'
  },
  {
    id: 'srv-bot-discord',
    name: 'Shironex Tickets Bot & Moderation',
    type: 'bot',
    status: 'online',
    ram: 0.8,
    cpu: 4,
    disk: 1.2,
    location: 'London (LND)',
    ip: '185.242.112.5',
    port: 3000,
    uptime: '9d 1h 22m'
  },
  {
    id: 'srv-mc-bungee',
    name: 'Hub Lobby proxy [Bungee]',
    type: 'minecraft',
    status: 'offline',
    ram: 0,
    cpu: 0,
    disk: 3.5,
    location: 'Virginia (VIR)',
    ip: '209.58.17.112',
    port: 25577,
    maxPlayers: 500,
    onlinePlayers: 0,
  }
];

export const MOCK_PLUGINS: PluginItem[] = [
  { id: 'p-essx', name: 'EssentialsX', version: '2.20.1', downloads: '4.8M', category: 'Spigot', description: 'Provides essential commands, teleportation, warps, kits, custom economy, and chat formatting.', installed: true },
  { id: 'p-we', name: 'WorldEdit', version: '7.3.0', downloads: '8.2M', category: 'Paper', description: 'In-game broad-scale map editing tool allowing creation, replacement, and copying of selected regions.', installed: true },
  { id: 'p-vault', name: 'Vault', version: '1.7.3', downloads: '11.5M', category: 'System', description: 'Essential permission, chat, and economy API bridge linking various third-party plugins securely.', installed: true },
  { id: 'p-dyn', name: 'Dynmap', version: '3.6', downloads: '1.2M', category: 'Paper', description: 'Creates a real-time web-based interactive map of your Minecraft worlds viewable in any browser.', installed: false },
  { id: 'p-lp', name: 'LuckPerms', version: '5.4.102', downloads: '3.6M', category: 'Security', description: 'Extremely advanced permissions manager utilizing an intuitive Web editor interface to handle user ranks.', installed: false },
  { id: 'p-gmc', name: 'GeyserMC', version: '2.3.0', downloads: '950K', category: 'System', description: 'Enables Bedrock Edition players (mobile, console) to join your Java Edition server without client mods.', installed: false },
];

export const MOCK_FILES: ServerFile[] = [
  {
    id: 'f-properties',
    name: 'server.properties',
    type: 'file',
    size: '1.2 KB',
    content: `# Minecraft server properties
generator-settings=
force-gamemode=false
allow-nether=true
enforce-whitelist=false
gamemode=survival
enable-query=false
player-idle-timeout=15
difficulty=hard
spawn-monsters=true
op-permission-level=4
pvp=true
snooper-enabled=true
level-type=DEFAULT
hardcore=false
enable-command-block=true
max-players=100
network-compression-threshold=256
resource-pack-sha1=
max-world-size=29999984
server-port=25565
server-ip=
spawn-npcs=true
allow-flight=false
level-name=world
view-distance=10
resource-pack=
spawn-animals=true
white-list=false
generate-structures=true
online-mode=true
max-build-height=256
prevent-proxy-connections=false
motd=\u00A7b\u2605 Shironex Host \u2605 \u00A7eOfficial Survival Server \u00A7d[1.21]`
  },
  {
    id: 'f-spigot',
    name: 'spigot.yml',
    type: 'file',
    size: '4.8 KB',
    content: `# This is the main configuration file for Spigot.
# As you can see, there's tons of settings in here to optimize performance.
config-version: 12
settings:
  save-user-cache-on-stop-only: false
  sample-count: 12
  bungeecord: false
  user-cache-size: 1000
  player-shuffle: 0
  debug: false
  timeout-time: 60
  restart-on-crash: true
  restart-script: ./start.sh
world-settings:
  default:
    verbose: false
    mob-spawn-range: 6
    growth:
      cactus-modifier: 100
      cane-modifier: 100
      melon-modifier: 100
      mushroom-modifier: 100
    entity-activation-range:
      animals: 32
      monsters: 32
      raiders: 48
      misc: 16
    ticks-per:
      hopper-transfer: 8
      hopper-check: 8
    merge-radius:
      item: 2.5
      exp: 3.0`
  },
  {
    id: 'f-whitelist',
    name: 'whitelist.json',
    type: 'file',
    size: '180 B',
    content: `[
  {
    "uuid": "452b4152-bf6d-4952-bda5-d0ff08f4c781",
    "name": "MinecraftGamer9"
  },
  {
    "uuid": "f7ab2c10-e71e-4518-8f85-abff4efcbcf3",
    "name": "AlexThePro"
  }
]`
  },
  {
    id: 'f-ops',
    name: 'ops.json',
    type: 'file',
    size: '220 B',
    content: `[
  {
    "uuid": "029fa210-99ef-4cde-bb12-9c12df88ab11",
    "name": "OwnerServer",
    "level": 4,
    "bypassesPlayerLimit": true
  }
]`
  },
  {
    id: 'dir-plugins',
    name: 'plugins',
    type: 'folder',
    children: [
      {
        id: 'f-ess-config',
        name: 'Essentials.jar',
        type: 'file',
        size: '1.4 MB',
        content: '[Binary File / Java Plugin jar archive]'
      },
      {
        id: 'f-we-jar',
        name: 'WorldEdit.jar',
        type: 'file',
        size: '2.8 MB',
        content: '[Binary File / Java Plugin jar archive]'
      },
      {
        id: 'f-vault-jar',
        name: 'Vault.jar',
        type: 'file',
        size: '304 KB',
        content: '[Binary File / Java Plugin jar archive]'
      }
    ]
  },
  {
    id: 'dir-logs',
    name: 'logs',
    type: 'folder',
    children: [
      {
        id: 'f-latest-log',
        name: 'latest.log',
        type: 'file',
        size: '42 KB',
        content: `[10:54:02 INFO]: Starting minecraft server version 1.21
[10:54:03 INFO]: Loading properties
[10:54:03 INFO]: Default game type: SURVIVAL
[10:54:04 INFO]: Generating keypair
[10:54:04 INFO]: Starting Minecraft server on *:25565
[10:54:05 INFO]: Preparing level "world"
[10:54:10 INFO]: Preparing start region for dimension minecraft:overworld
[10:54:15 INFO]: Preparing spawn area: 84%
[10:54:18 INFO]: Preparing spawn area: 100%
[10:54:20 INFO]: Time elapsed: 14812 ms
[10:54:20 INFO]: Done (15.541s)! For help, type "help"`
      }
    ]
  }
];
