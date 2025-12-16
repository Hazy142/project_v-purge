import React, { useEffect, useRef } from 'react';
import { LogEntry } from '../types';

interface TerminalProps {
  logs: LogEntry[];
  title: string;
}

export const Terminal: React.FC<TerminalProps> = ({ logs, title }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  return (
    <div className="flex flex-col h-full bg-black border border-purge-gray rounded-sm overflow-hidden font-mono text-xs shadow-[0_0_10px_rgba(0,0,0,0.8)]">
      <div className="flex items-center justify-between px-3 py-1 bg-purge-gray border-b border-gray-800">
        <span className="text-gray-400 font-bold uppercase tracking-wider">{title}</span>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
          <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin scrollbar-thumb-purge-gray">
        {logs.map((log) => (
          <div key={log.id} className="flex gap-2">
            <span className="text-gray-600 shrink-0">[{log.timestamp}]</span>
            <span className={`font-bold shrink-0 w-24 ${
              log.module === 'LXCrawler' ? 'text-blue-400' :
              log.module === 'Honeypot' ? 'text-orange-400' :
              log.module === 'Fusion' ? 'text-soul-purple' : 'text-gray-300'
            }`}>
              {log.module}::
            </span>
            <span className={`${
              log.status === 'error' ? 'text-purge-error' :
              log.status === 'success' ? 'text-purge-accent' :
              log.status === 'warning' ? 'text-yellow-400' : 'text-gray-300'
            }`}>
              {log.message}
            </span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};