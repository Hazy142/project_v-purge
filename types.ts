export interface LogEntry {
  id: string;
  timestamp: string;
  module: 'LXCrawler' | 'Honeypot' | 'Fusion' | 'System' | 'Profiler';
  message: string;
  status: 'info' | 'success' | 'warning' | 'error';
}

export interface ScraperStats {
  profilesIngested: number;
  proxiesActive: number;
  botsTrapped: number;
  dataVolumeMB: number;
  rpm: number; // Requests per minute
}

export interface FusedProfile {
  id: string;
  discordId: string;
  redditUser: string;
  epicHandle: string;
  riskScore: number;
  detectedCravings: string[];
}

export interface TrendData {
  title: string;
  source: string;
  url: string;
  snippet: string;
  raw_samples?: string[]; // New field for "real" gathered samples
}
