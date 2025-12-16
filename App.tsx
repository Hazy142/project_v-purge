import React, { useState, useEffect, useCallback } from 'react';
import { Terminal } from './components/Terminal';
import { StatPanel } from './components/StatPanel';
import { NetworkGraph } from './components/NetworkGraph';
import { LogEntry, ScraperStats, TrendData } from './types';
import { fetchGamingTrends, analyzeTargetCraving } from './services/perplexityService';
import { Terminal as TerminalIcon, Search, Skull, Lock, Zap } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

// Mock chart data generator
const generateChartData = () => {
  return Array.from({ length: 20 }).map((_, i) => ({
    name: i.toString(),
    ingested: Math.floor(Math.random() * 100) + 50,
    rejected: Math.floor(Math.random() * 30) + 10,
  }));
};

const App: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [stats, setStats] = useState<ScraperStats>({
    profilesIngested: 14023,
    proxiesActive: 842,
    botsTrapped: 3120,
    dataVolumeMB: 1240.5,
    rpm: 450
  });
  const [trends, setTrends] = useState<TrendData[]>([]);
  const [loadingTrends, setLoadingTrends] = useState(false);
  const [isPurgeActive, setIsPurgeActive] = useState(true);

  // Initial System Boot Log
  useEffect(() => {
    addLog('System', 'Initializing V-PURGE v5.2...', 'info');
    addLog('System', 'Connecting to Soul_Algorithm_XML...', 'success');
    addLog('System', 'Master Lai Jainyu Detected. Access Granted.', 'success');
    addLog('LXCrawler', 'Swarm deployment initialized. Target: Discord/Reddit/Fortnite_LFG', 'info');
  }, []);

  // Fetch Perplexity Trends
  useEffect(() => {
    const getTrends = async () => {
      setLoadingTrends(true);
      addLog('Fusion', 'Requesting Grounded Intelligence from Perplexity Sonar Swarm...', 'info');
      const data = await fetchGamingTrends();
      if (data.length > 0) {
        setTrends(data);
        addLog('Fusion', 'Intelligence Feed Updated with Real-Time Perplexity Data.', 'success');

        // Simulate deeper analysis on the first item found
        if (data[0] && data[0].snippet) {
             addLog('Profiler', 'Analyzing Target Craving on Trend #1...', 'info');
             analyzeTargetCraving(data[0].snippet).then(analysis => {
                 addLog('Profiler', `Analysis Result: ${analysis.slice(0, 100)}...`, 'success');
             });
        }

      } else {
         addLog('Fusion', 'Perplexity Intelligence Fetch Failed. Retrying...', 'error');
      }
      setLoadingTrends(false);
    };
    getTrends();
    // Refresh trends every 5 minutes
    const interval = setInterval(getTrends, 300000); 
    return () => clearInterval(interval);
  }, []);

  const addLog = useCallback((module: LogEntry['module'], message: string, status: LogEntry['status']) => {
    setLogs(prev => {
      const newLog: LogEntry = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second:'2-digit' }),
        module,
        message,
        status
      };
      return [...prev.slice(-49), newLog]; // Keep last 50 logs
    });
  }, []);

  // Simulation Loop
  useEffect(() => {
    if (!isPurgeActive) return;

    const interval = setInterval(() => {
      // Randomly update stats
      setStats(prev => ({
        profilesIngested: prev.profilesIngested + Math.floor(Math.random() * 5),
        proxiesActive: 800 + Math.floor(Math.random() * 100),
        botsTrapped: prev.botsTrapped + (Math.random() > 0.7 ? 1 : 0),
        dataVolumeMB: prev.dataVolumeMB + 0.05,
        rpm: 400 + Math.floor(Math.random() * 100)
      }));

      // Randomly add logs
      const rand = Math.random();
      if (rand > 0.8) {
        const platforms = ['Discord', 'Reddit', 'EpicGamesForum', 'Telegram'];
        const platform = platforms[Math.floor(Math.random() * platforms.length)];
        addLog('LXCrawler', `Scraped batch from ${platform}. IP Rotated.`, 'info');
      } else if (rand > 0.95) {
        addLog('Honeypot', 'T.2 Gateway triggered. Analyst bot blocked.', 'warning');
      } else if (rand > 0.9) {
        addLog('Fusion', 'Identity Match: ID_9921 -> Epic_Handle_X', 'success');
      }

    }, 1500);

    return () => clearInterval(interval);
  }, [isPurgeActive, addLog]);

  return (
    <div className="min-h-screen bg-black text-gray-300 font-sans selection:bg-soul-purple selection:text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-800 bg-purge-black p-4 flex justify-between items-center sticky top-0 z-50 backdrop-blur-sm bg-opacity-90">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-900 to-black border border-soul-purple rounded flex items-center justify-center animate-pulse-fast">
            <Skull className="text-soul-purple" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold font-mono tracking-tight text-white">
              V-PURGE <span className="text-soul-purple">PROFILER</span>
            </h1>
            <div className="text-[10px] text-gray-500 font-mono tracking-widest">
              V5.2 // TRIPLE-THREAT ACQUISITION LAYER
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6">
           <div className="hidden md:flex flex-col items-end">
              <span className="text-[10px] text-gray-400">SESSION ID</span>
              <span className="font-mono text-xs text-white">LX-8892-ALPHA</span>
           </div>
           <button 
             onClick={() => setIsPurgeActive(!isPurgeActive)}
             className={`px-4 py-2 rounded-sm border font-mono text-xs font-bold transition-all ${isPurgeActive ? 'border-red-900 bg-red-900/10 text-red-500 hover:bg-red-900/20' : 'border-green-900 bg-green-900/10 text-green-500 hover:bg-green-900/20'}`}
           >
             {isPurgeActive ? 'HALT INGESTION' : 'RESUME SWARM'}
           </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 grid grid-cols-1 lg:grid-cols-12 gap-4 overflow-hidden">
        
        {/* Left Col: Logs & Controls (A.1 Mass Scraper) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
           {/* Controls Card */}
           <div className="bg-purge-gray border border-gray-800 p-4 rounded-sm">
              <h2 className="text-xs font-bold text-gray-500 mb-3 flex items-center gap-2">
                <Lock size={14} /> T.2 EVASION PROTOCOLS
              </h2>
              <div className="space-y-3">
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Residential Proxies</span>
                    <span className="text-green-500 font-mono text-xs">[ACTIVE]</span>
                 </div>
                 <div className="w-full bg-gray-900 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-green-600 h-full w-[92%]"></div>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Honeypot Gateway</span>
                    <span className="text-green-500 font-mono text-xs">[ARMED]</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">User-Agent Rotation</span>
                    <span className="text-yellow-500 font-mono text-xs">[HIGH VELOCITY]</span>
                 </div>
              </div>
           </div>

           {/* Terminal */}
           <div className="flex-1 min-h-[400px]">
              <Terminal logs={logs} title="LXCrawler v1.1 // STDOUT" />
           </div>
        </div>

        {/* Middle Col: Stats & Visualization (A.2 & A.3) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
           <StatPanel stats={stats} />
           
           {/* Chart Area */}
           <div className="bg-purge-gray border border-gray-800 p-4 rounded-sm h-[300px] flex flex-col">
              <div className="flex justify-between mb-2">
                <h3 className="text-xs font-bold text-gray-500">INGESTION VELOCITY vs REJECTION</h3>
                <div className="flex gap-4 text-[10px]">
                  <span className="flex items-center gap-1"><div className="w-2 h-2 bg-soul-purple rounded-full"></div> Ingested</span>
                  <span className="flex items-center gap-1"><div className="w-2 h-2 bg-red-500 rounded-full"></div> Filtered</span>
                </div>
              </div>
              <div className="flex-1 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={generateChartData()}>
                    <defs>
                      <linearGradient id="colorIngest" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#bf00ff" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#bf00ff" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorReject" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                    <XAxis dataKey="name" hide />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#111', borderColor: '#333' }}
                      itemStyle={{ color: '#fff', fontSize: '12px', fontFamily: 'monospace' }}
                    />
                    <Area type="monotone" dataKey="ingested" stroke="#bf00ff" fillOpacity={1} fill="url(#colorIngest)" strokeWidth={2} />
                    <Area type="monotone" dataKey="rejected" stroke="#ef4444" fillOpacity={1} fill="url(#colorReject)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
           </div>

           {/* Fusion Map */}
           <div className="flex-1 bg-purge-gray border border-gray-800 p-4 rounded-sm flex flex-col">
              <h3 className="text-xs font-bold text-gray-500 mb-2">CREDENTIAL FUSION LAYER</h3>
              <div className="flex-1 relative">
                <NetworkGraph />
              </div>
           </div>
        </div>

        {/* Right Col: Gemini Intelligence (Phase 1 Goal) */}
        <div className="lg:col-span-3 bg-purge-gray border border-gray-800 flex flex-col rounded-sm overflow-hidden">
           <div className="p-3 bg-gray-900 border-b border-gray-800 flex items-center justify-between">
              <span className="text-xs font-bold text-soul-purple flex items-center gap-2">
                <Zap size={14} /> INTELLIGENCE FEED
              </span>
              {loadingTrends && <span className="text-[10px] animate-pulse text-gray-400">UPDATING...</span>}
           </div>
           
           <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="text-[10px] text-gray-500 mb-2 uppercase tracking-wide">
                Live Data from Surface Web (Perplexity Sonar)
              </div>
              
              {trends.length === 0 && !loadingTrends && (
                <div className="text-center py-10 text-gray-600 text-xs">
                  WAITING FOR SWARM DATA...
                </div>
              )}

              {trends.map((trend, idx) => (
                <div key={idx} className="bg-black border border-gray-800 p-3 rounded-sm hover:border-soul-purple transition-colors group">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] text-blue-400 border border-blue-900/50 px-1 rounded bg-blue-900/10">
                      {trend.source || "WEB"}
                    </span>
                    <a href={trend.url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                      <Search size={12} />
                    </a>
                  </div>
                  <h4 className="text-sm font-semibold text-gray-200 mb-2 group-hover:text-soul-purple transition-colors">
                    {trend.title}
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                    {trend.snippet}
                  </p>
                </div>
              ))}
              
              <div className="border-t border-gray-800 pt-4 mt-4">
                 <h4 className="text-xs font-bold text-gray-500 mb-2">MASTER'S STUDY CONTEXT</h4>
                 <div className="text-[10px] text-gray-400 font-mono space-y-1">
                    <div className="flex justify-between">
                       <span>Target Age:</span> <span className="text-white">12-25</span>
                    </div>
                    <div className="flex justify-between">
                       <span>Craving Metric:</span> <span className="text-red-500">HIGH</span>
                    </div>
                    <div className="flex justify-between">
                       <span>Currency:</span> <span className="text-white">V-Bucks/Gems</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

      </main>
    </div>
  );
};

export default App;