import React, { useState } from 'react';
import { AutomationNode } from '../../types';
import {
  Cpu,
  Play,
  Pause,
  RotateCw,
  Zap,
  Activity,
  Plus,
  ArrowUpRight,
  Sparkles,
  Sliders,
  CheckCircle2,
  AlertCircle,
  Clock,
} from 'lucide-react';

interface L1NodesScreenProps {
  onAddLog: (type: any, text: string, subtext?: string) => void;
  onOpenDeployModal: () => void;
}

const initialNodes: AutomationNode[] = [
  {
    id: 'node-l1-01',
    name: 'LIQUIDITY_ARB_ROUTER',
    layer: 'L1.01 // EXECUTION',
    status: 'ACTIVE',
    latency: 0.84,
    throughput: 8420,
    memoryUsage: 28.4,
    loadPercentage: 42,
    uptime: '14d 08h 22m',
    description: 'High-frequency orderbook spread arbitrage executing micro-hedges across decentralized and tier-1 venues.',
  },
  {
    id: 'node-l1-02',
    name: 'HEDGE_PROTOCOL_SENTINEL',
    layer: 'L1.02 // RISK_MATRIX',
    status: 'ACTIVE',
    latency: 1.12,
    throughput: 4110,
    memoryUsage: 41.8,
    loadPercentage: 68,
    uptime: '99d 14h 05m',
    description: 'Autonomous delta-neutral hedging daemon mitigating tail-risk via dynamic synthetic options collars.',
  },
  {
    id: 'node-l1-03',
    name: 'MARKET_INEFFICIENCY_HUNTER',
    layer: 'L1.03 // ALPHA_GEN',
    status: 'ACTIVE',
    latency: 0.62,
    throughput: 12450,
    memoryUsage: 61.2,
    loadPercentage: 84,
    uptime: '04d 19h 40m',
    description: 'Real-time statistical anomaly detection engine ingesting millisecond tick data across global feeds.',
  },
  {
    id: 'node-l1-04',
    name: 'CROSS_VENUE_SETTLEMENT_GW',
    layer: 'L1.04 // SETTLEMENT',
    status: 'ACTIVE',
    latency: 2.45,
    throughput: 1890,
    memoryUsage: 19.5,
    loadPercentage: 24,
    uptime: '180d 02h 11m',
    description: 'Atomic cross-chain & institutional clearing gateway with zero-knowledge batch proof generation.',
  },
  {
    id: 'node-l1-05',
    name: 'YIELD_CURVE_REBALANCER',
    layer: 'L1.05 // TREASURY',
    status: 'STANDBY',
    latency: 3.18,
    throughput: 650,
    memoryUsage: 14.1,
    loadPercentage: 10,
    uptime: '02d 04h 12m',
    description: 'Dynamic liquidity pool optimizer rebalancing multi-collateral vaults according to stochastic curves.',
  },
  {
    id: 'node-l1-06',
    name: 'ANOMALOUS_SPREAD_DAMPENER',
    layer: 'L1.06 // VOLATILITY',
    status: 'ACTIVE',
    latency: 0.95,
    throughput: 5600,
    memoryUsage: 33.7,
    loadPercentage: 55,
    uptime: '42d 11h 50m',
    description: 'Flash-liquidity injection sub-module suppressing slippage spikes during macro news events.',
  },
];

export const L1NodesScreen: React.FC<L1NodesScreenProps> = ({
  onAddLog,
  onOpenDeployModal,
}) => {
  const [nodes, setNodes] = useState<AutomationNode[]>(initialNodes);
  const [selectedNode, setSelectedNode] = useState<AutomationNode | null>(null);

  const toggleNodeStatus = (nodeId: string) => {
    setNodes((prev) =>
      prev.map((node) => {
        if (node.id === nodeId) {
          const nextStatus = node.status === 'ACTIVE' ? 'STANDBY' : 'ACTIVE';
          onAddLog(
            nextStatus === 'ACTIVE' ? 'OK' : 'WARN',
            `Pipeline node ${node.name} shifted to ${nextStatus}`
          );
          return {
            ...node,
            status: nextStatus,
          };
        }
        return node;
      })
    );
  };

  const restartNode = (node: AutomationNode) => {
    onAddLog('SYSTEM', `Rebooting pipeline node ${node.name}...`);
    setNodes((prev) =>
      prev.map((n) => (n.id === node.id ? { ...n, status: 'SYNCING' } : n))
    );
    setTimeout(() => {
      setNodes((prev) =>
        prev.map((n) => (n.id === node.id ? { ...n, status: 'ACTIVE' } : n))
      );
      onAddLog('OK', `Node ${node.name} re-synchronized successfully (Latency: 0.8ms)`);
    }, 1200);
  };

  const totalThroughput = nodes.reduce(
    (acc, n) => acc + (n.status === 'ACTIVE' ? n.throughput : 0),
    0
  );

  return (
    <div id="screen-l1-nodes" className="w-full space-y-8 animate-in fade-in duration-500">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono-tech text-[#4edea3] uppercase tracking-widest px-2 py-0.5 rounded bg-[#4edea3]/10 border border-[#4edea3]/20 font-semibold">
              L1 // AUTOMATION PIPELINES
            </span>
            <span className="text-xs font-mono-tech text-[#88919d]">
              TOTAL_NODES: {nodes.length}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-mono-tech text-[#e5e2e1] tracking-tight">
            ACTIVE_AUTOMATION_NODES
          </h2>
          <p className="text-sm text-[#88919d] mt-1 max-w-2xl">
            Autonomous high-frequency execution pipelines operating at sub-millisecond precision.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenDeployModal}
            className="bg-[#98cbff] text-[#003354] hover:bg-[#cfe5ff] px-4 py-2 rounded-xl text-xs font-mono-tech font-bold transition-all flex items-center gap-2 shadow-[0_0_12px_rgba(152,203,255,0.25)] cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>DEPLOY_PIPELINE</span>
          </button>
        </div>
      </div>

      {/* Overview Stat Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-xl border border-white/10">
          <span className="text-[11px] font-mono-tech text-[#88919d] block mb-1">AGGREGATE_OPS</span>
          <span className="text-xl md:text-2xl font-mono-tech font-bold text-[#98cbff]">
            {totalThroughput.toLocaleString()} /s
          </span>
        </div>
        <div className="glass-card p-4 rounded-xl border border-white/10">
          <span className="text-[11px] font-mono-tech text-[#88919d] block mb-1">MEDIAN_LATENCY</span>
          <span className="text-xl md:text-2xl font-mono-tech font-bold text-[#4edea3]">
            0.88 ms
          </span>
        </div>
        <div className="glass-card p-4 rounded-xl border border-white/10">
          <span className="text-[11px] font-mono-tech text-[#88919d] block mb-1">ACTIVE_WORKERS</span>
          <span className="text-xl md:text-2xl font-mono-tech font-bold text-[#e5e2e1]">
            {nodes.filter((n) => n.status === 'ACTIVE').length} / {nodes.length}
          </span>
        </div>
        <div className="glass-card p-4 rounded-xl border border-white/10">
          <span className="text-[11px] font-mono-tech text-[#88919d] block mb-1">ENGINE_INTEGRITY</span>
          <span className="text-xl md:text-2xl font-mono-tech font-bold text-[#4edea3]">
            OPTIMAL
          </span>
        </div>
      </div>

      {/* Nodes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nodes.map((node) => {
          const isActive = node.status === 'ACTIVE';
          const isSyncing = node.status === 'SYNCING';

          return (
            <div
              key={node.id}
              className={`glass-card p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                isActive
                  ? 'border-white/10 hover:border-[#98cbff]/40'
                  : 'border-white/5 opacity-75 hover:opacity-100'
              }`}
            >
              <div>
                {/* Layer & Status */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono-tech text-[#88919d] tracking-wider">
                    {node.layer}
                  </span>
                  <span
                    className={`text-[10px] font-mono-tech px-2 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                      isActive
                        ? 'bg-[#4edea3]/10 text-[#4edea3] border border-[#4edea3]/30'
                        : isSyncing
                        ? 'bg-[#98cbff]/10 text-[#98cbff] border border-[#98cbff]/30 animate-pulse'
                        : 'bg-white/5 text-[#88919d] border border-white/10'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isActive ? 'bg-[#4edea3]' : isSyncing ? 'bg-[#98cbff]' : 'bg-[#88919d]'
                      }`}
                    />
                    {node.status}
                  </span>
                </div>

                {/* Name */}
                <h3 className="font-mono-tech text-base font-bold text-[#e5e2e1] mb-2 tracking-tight">
                  {node.name}
                </h3>

                {/* Description */}
                <p className="text-xs text-[#bec7d4] leading-relaxed mb-6">
                  {node.description}
                </p>
              </div>

              {/* Metrics block */}
              <div className="space-y-3 pt-4 border-t border-white/5 font-mono-tech text-xs">
                <div className="flex justify-between items-center text-[#88919d]">
                  <span>LATENCY</span>
                  <span className="text-[#4edea3] font-semibold">{node.latency} ms</span>
                </div>
                <div className="flex justify-between items-center text-[#88919d]">
                  <span>THROUGHPUT</span>
                  <span className="text-[#98cbff]">{node.throughput.toLocaleString()} ops/s</span>
                </div>
                <div className="flex justify-between items-center text-[#88919d]">
                  <span>LOAD</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          node.loadPercentage > 75 ? 'bg-[#ffb4ab]' : 'bg-[#98cbff]'
                        }`}
                        style={{ width: `${node.loadPercentage}%` }}
                      />
                    </div>
                    <span>{node.loadPercentage}%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center text-[#88919d] text-[10px]">
                  <span>UPTIME</span>
                  <span>{node.uptime}</span>
                </div>

                {/* Actions */}
                <div className="pt-3 flex items-center gap-2">
                  <button
                    onClick={() => toggleNodeStatus(node.id)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-mono-tech font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      isActive
                        ? 'bg-white/5 hover:bg-white/10 text-[#bec7d4] border border-white/10'
                        : 'bg-[#4edea3] text-[#003824] hover:brightness-110'
                    }`}
                  >
                    {isActive ? (
                      <>
                        <Pause className="w-3 h-3" />
                        <span>PAUSE</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3 h-3" />
                        <span>RESUME</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => restartNode(node)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#88919d] hover:text-[#e5e2e1] border border-white/10 transition-colors cursor-pointer"
                    title="Re-sync node"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
