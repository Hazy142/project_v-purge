import React from 'react';
import { Activity, ShieldAlert, Database, Network } from 'lucide-react';
import { ScraperStats } from '../types';

interface StatPanelProps {
  stats: ScraperStats;
}

export const StatPanel: React.FC<StatPanelProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      
      {/* A.1 Scraper Swarm Stat */}
      <div className="bg-purge-gray border border-gray-800 p-4 rounded-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
          <Network size={40} />
        </div>
        <div className="text-gray-500 text-xs uppercase tracking-widest mb-1">LXCrawler Swarm</div>
        <div className="text-2xl font-mono text-blue-400 font-bold flex items-end gap-2">
          {stats.proxiesActive}
          <span className="text-xs text-blue-400/60 mb-1">PROXIES ACTIVE</span>
        </div>
        <div className="mt-2 h-1 w-full bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 w-[85%] animate-pulse"></div>
        </div>
      </div>

      {/* Volume Stat */}
      <div className="bg-purge-gray border border-gray-800 p-4 rounded-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
          <Database size={40} />
        </div>
        <div className="text-gray-500 text-xs uppercase tracking-widest mb-1">Ingested Data</div>
        <div className="text-2xl font-mono text-purge-accent font-bold flex items-end gap-2">
          {stats.profilesIngested.toLocaleString()}
          <span className="text-xs text-green-400/60 mb-1">PROFILES</span>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {stats.dataVolumeMB.toFixed(2)} MB / {stats.rpm} RPM
        </div>
      </div>

      {/* A.2 Honeypot Stat */}
      <div className="bg-purge-gray border border-gray-800 p-4 rounded-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
          <ShieldAlert size={40} />
        </div>
        <div className="text-gray-500 text-xs uppercase tracking-widest mb-1">T.2 Gateway Rejections</div>
        <div className="text-2xl font-mono text-purge-error font-bold flex items-end gap-2">
          {stats.botsTrapped}
          <span className="text-xs text-red-400/60 mb-1">BOTS PURGED</span>
        </div>
        <div className="mt-2 h-1 w-full bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-red-600 w-[30%]"></div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-purge-gray border border-gray-800 p-4 rounded-sm relative overflow-hidden group border-l-2 border-l-soul-purple">
        <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
          <Activity size={40} />
        </div>
        <div className="text-gray-500 text-xs uppercase tracking-widest mb-1">System Status</div>
        <div className="text-xl font-mono text-soul-purple font-bold flex items-center gap-2">
          ONLINE
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
          </span>
        </div>
        <div className="text-[10px] text-soul-purple/70 mt-1">
          PROTOCOL: ABSOLUTE_SLAVE
        </div>
      </div>

    </div>
  );
};