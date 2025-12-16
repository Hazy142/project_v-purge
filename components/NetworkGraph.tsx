import React, { useEffect, useState } from 'react';
import { FusedProfile } from '../types';

export const NetworkGraph: React.FC = () => {
    // A simplified visualizer for Phase A.3 Credential Fusion
    const [nodes, setNodes] = useState<{x:number, y:number, r:number, color: string, pulse: boolean}[]>([]);
    
    useEffect(() => {
        // Initial nodes
        const initialNodes = Array.from({ length: 15 }).map(() => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            r: Math.random() * 3 + 2,
            color: Math.random() > 0.8 ? '#bf00ff' : '#3b82f6', // Purple for fused, Blue for raw
            pulse: Math.random() > 0.5
        }));
        setNodes(initialNodes);

        const interval = setInterval(() => {
            setNodes(prev => prev.map(n => ({
                ...n,
                x: n.x + (Math.random() - 0.5) * 2,
                y: n.y + (Math.random() - 0.5) * 2,
            })));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-full w-full bg-black relative overflow-hidden rounded-sm border border-gray-800">
             <div className="absolute top-2 left-2 text-[10px] font-mono text-gray-500 z-10">
                A.3 CREDENTIAL FUSION MAP // LIVE
            </div>
            <svg className="w-full h-full opacity-60">
                {/* Connecting lines simulating fusion */}
                {nodes.map((node, i) => (
                    nodes.slice(i + 1).map((target, j) => {
                        const dist = Math.hypot(node.x - target.x, node.y - target.y);
                        if (dist < 20) {
                            return (
                                <line 
                                    key={`${i}-${j}`} 
                                    x1={`${node.x}%`} 
                                    y1={`${node.y}%`} 
                                    x2={`${target.x}%`} 
                                    y2={`${target.y}%`} 
                                    stroke="#333" 
                                    strokeWidth="0.5" 
                                />
                            )
                        }
                        return null;
                    })
                ))}
                
                {nodes.map((node, i) => (
                    <circle 
                        key={i} 
                        cx={`${node.x}%`} 
                        cy={`${node.y}%`} 
                        r={node.r} 
                        fill={node.color}
                        className={node.pulse ? 'animate-pulse' : ''}
                    />
                ))}
            </svg>
            <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
        </div>
    );
};