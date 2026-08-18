import React, { useState, useEffect } from 'react';
import { SensorNode } from '../../types';
import {
  Globe,
  Radio,
  Wifi,
  Activity,
  AlertTriangle,
  RefreshCw,
  Zap,
  ArrowRight,
  Shield,
} from 'lucide-react';

interface L2SensorsScreenProps {
  onAddLog: (type: any, text: string, subtext?: string) => void;
}

const initialSensors: SensorNode[] = [
  {
    id: 'sensor-09-jp',
    code: 'Sensor_09_JP',
    region: 'APAC_NORTH',
    location: 'Tokyo, Japan (Equinix TY3)',
    status: 'ONLINE',
    latency: 18.2,
    jitter: 0.12,
    packetLoss: 0.0,
    throughput: '1.42 GB/s',
    coords: { x: 82, y: 38 },
  },
  {
    id: 'sensor-12-us',
    code: 'Sensor_12_US',
    region: 'US_EAST',
    location: 'Secaucus, NJ (NY4)',
    status: 'ONLINE',
    latency: 1.15,
    jitter: 0.02,
    packetLoss: 0.0,
    throughput: '4.88 GB/s',
    coords: { x: 28, y: 34 },
  },
  {
    id: 'sensor-03-uk',
    code: 'Sensor_03_UK',
    region: 'EUROPE_WEST',
    location: 'London, UK (LD4 Slough)',
    status: 'ONLINE',
    latency: 8.4,
    jitter: 0.05,
    packetLoss: 0.0,
    throughput: '2.95 GB/s',
    coords: { x: 48, y: 26 },
  },
  {
    id: 'sensor-07-eu',
    code: 'Sensor_07_EU',
    region: 'EUROPE_CENTRAL',
    location: 'Frankfurt, Germany (FR2)',
    status: 'ONLINE',
    latency: 9.8,
    jitter: 0.08,
    packetLoss: 0.0,
    throughput: '3.10 GB/s',
    coords: { x: 52, y: 28 },
  },
  {
    id: 'sensor-01-sg',
    code: 'Sensor_01_SG',
    region: 'APAC_SOUTH',
    location: 'Singapore (SG1)',
    status: 'ONLINE',
    latency: 24.1,
    jitter: 0.22,
    packetLoss: 0.0,
    throughput: '1.80 GB/s',
    coords: { x: 76, y: 56 },
  },
  {
    id: 'sensor-05-br',
    code: 'Sensor_05_BR',
    region: 'LATAM_EAST',
    location: 'São Paulo, Brazil (SP2)',
    status: 'ONLINE',
    latency: 68.4,
    jitter: 0.85,
    packetLoss: 0.01,
    throughput: '0.92 GB/s',
    coords: { x: 36, y: 72 },
  },
];

export const L2SensorsScreen: React.FC<L2SensorsScreenProps> = ({ onAddLog }) => {
  const [sensors, setSensors] = useState<SensorNode[]>(initialSensors);
  const [activeSensor, setActiveSensor] = useState<SensorNode>(initialSensors[1]);
  const [isSimulatingFailure, setIsSimulatingFailure] = useState(false);

  // Micro jitter updates
  useEffect(() => {
    const timer = setInterval(() => {
      setSensors((prev) =>
        prev.map((s) => ({
          ...s,
          latency: Number((s.latency + (Math.random() - 0.5) * 0.1).toFixed(2)),
        }))
      );
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const triggerReroute = (sensorCode: string) => {
    onAddLog('WARN', `Simulating failover packet reroute on ${sensorCode}...`);
    setIsSimulatingFailure(true);
    setSensors((prev) =>
      prev.map((s) => (s.code === sensorCode ? { ...s, status: 'DEGRADED' } : s))
    );

    setTimeout(() => {
      onAddLog('OK', `Auto-rerouting established via Sensor_12_US (Backup Gateway)`);
      setTimeout(() => {
        setSensors((prev) =>
          prev.map((s) => (s.code === sensorCode ? { ...s, status: 'ONLINE' } : s))
        );
        setIsSimulatingFailure(false);
        onAddLog('OK', `${sensorCode} operational integrity restored.`);
      }, 2000);
    }, 1500);
  };

  return (
    <div id="screen-l2-sensors" className="w-full space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono-tech text-[#98cbff] uppercase tracking-widest px-2 py-0.5 rounded bg-[#98cbff]/10 border border-[#98cbff]/20 font-semibold">
              L2 // TELEMETRY & GLOBAL RADAR
            </span>
            <span className="text-xs font-mono-tech text-[#88919d]">
              ACTIVE_FEEDS: {sensors.filter((s) => s.status === 'ONLINE').length}/{sensors.length}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-mono-tech text-[#e5e2e1] tracking-tight">
            GLOBAL_SENSOR_NETWORK
          </h2>
          <p className="text-sm text-[#88919d] mt-1">
            Millisecond financial feed ingesters co-located at direct exchange cross-connects.
          </p>
        </div>

        <button
          onClick={() => triggerReroute('Sensor_09_JP')}
          disabled={isSimulatingFailure}
          className="bg-white/5 hover:bg-white/10 border border-[#ffb4ab]/40 text-[#ffb4ab] px-4 py-2 rounded-xl text-xs font-mono-tech font-bold transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <AlertTriangle className="w-4 h-4" />
          <span>TEST_JP_REROUTE_EVENT</span>
        </button>
      </div>

      {/* Global Interactive Radar Map View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Radar Graphic Container */}
        <div className="lg:col-span-8 glass-card p-6 sm:p-8 rounded-2xl border border-white/10 relative overflow-hidden flex flex-col justify-between min-h-[420px]">
          {/* Radar background circles & grid */}
          <div className="absolute inset-0 opacity-15 pointer-events-none flex items-center justify-center">
            <div className="w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] rounded-full border border-[#98cbff] flex items-center justify-center">
              <div className="w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] rounded-full border border-[#98cbff] flex items-center justify-center">
                <div className="w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] rounded-full border border-[#98cbff]" />
              </div>
            </div>
            {/* Radar line sweep */}
            <div className="absolute w-[300px] sm:w-[450px] h-[1px] bg-gradient-to-r from-transparent via-[#98cbff] to-transparent animate-radar" />
          </div>

          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2 font-mono-tech text-xs text-[#88919d]">
              <Radio className="w-4 h-4 text-[#4edea3] animate-pulse" />
              <span>RADAR_TELEMETRY: SYNCHRONIZED</span>
            </div>
            <span className="text-[11px] font-mono-tech text-[#98cbff] px-2 py-0.5 rounded bg-black/50 border border-white/10">
              CROSS_CONNECT: DIRECT_FIBER
            </span>
          </div>

          {/* Interactive Node Coordinates on the Visual Canvas */}
          <div className="relative w-full h-64 sm:h-72 my-4 z-10 bg-black/20 rounded-xl border border-white/5 overflow-hidden">
            {/* World grid line styling */}
            <div className="absolute inset-0 bg-[radial-gradient(#98cbff_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

            {sensors.map((sensor) => {
              const isSelected = activeSensor.id === sensor.id;
              const isDegraded = sensor.status === 'DEGRADED';

              return (
                <div
                  key={sensor.id}
                  onClick={() => setActiveSensor(sensor)}
                  style={{ left: `${sensor.coords.x}%`, top: `${sensor.coords.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                >
                  <div className="relative flex items-center justify-center">
                    {/* Ring ping */}
                    <div
                      className={`absolute w-8 h-8 rounded-full animate-ping opacity-30 ${
                        isDegraded ? 'bg-[#ffb4ab]' : 'bg-[#4edea3]'
                      }`}
                    />
                    {/* Node pip */}
                    <div
                      className={`w-3.5 h-3.5 rounded-full border-2 transition-all ${
                        isSelected
                          ? 'scale-125 border-white bg-[#98cbff] shadow-[0_0_12px_#98cbff]'
                          : isDegraded
                          ? 'border-[#ffb4ab] bg-[#ffb4ab]'
                          : 'border-[#4edea3] bg-[#003824]'
                      }`}
                    />
                  </div>

                  {/* Tooltip on hover */}
                  <div
                    className={`absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-[#0e0e0e] border border-white/20 text-[10px] font-mono-tech transition-opacity ${
                      isSelected
                        ? 'opacity-100 text-[#98cbff]'
                        : 'opacity-0 group-hover:opacity-100 text-[#bec7d4]'
                    }`}
                  >
                    {sensor.code} ({sensor.latency}ms)
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 z-10 pt-4 border-t border-white/5 font-mono-tech text-xs text-[#88919d]">
            <span>TOTAL BANDWIDTH: 15.07 GB/S</span>
            <span className="text-[#4edea3]">ZERO_PACKET_LOSS PROTOCOL</span>
          </div>
        </div>

        {/* Selected Sensor Detailed Panel */}
        <div className="lg:col-span-4 glass-card p-6 sm:p-8 rounded-2xl border border-white/10 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-tech text-[#88919d] tracking-widest uppercase">
                SENSOR_PROFILE
              </span>
              <span
                className={`text-[10px] font-mono-tech px-2 py-0.5 rounded-full font-bold ${
                  activeSensor.status === 'ONLINE'
                    ? 'bg-[#4edea3]/10 text-[#4edea3] border border-[#4edea3]/30'
                    : 'bg-[#ffb4ab]/10 text-[#ffb4ab] border border-[#ffb4ab]/30'
                }`}
              >
                {activeSensor.status}
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-bold font-mono-tech text-[#e5e2e1] mb-1">
                {activeSensor.code}
              </h3>
              <p className="text-xs text-[#bec7d4] font-sans">
                {activeSensor.location}
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/5 font-mono-tech text-xs">
              <div className="flex justify-between items-center text-[#88919d]">
                <span>REGION_TAG</span>
                <span className="text-[#e5e2e1]">{activeSensor.region}</span>
              </div>
              <div className="flex justify-between items-center text-[#88919d]">
                <span>ROUNDTRIP_PING</span>
                <span className="text-[#4edea3] font-bold text-sm">
                  {activeSensor.latency} ms
                </span>
              </div>
              <div className="flex justify-between items-center text-[#88919d]">
                <span>JITTER_DEVIATION</span>
                <span className="text-[#98cbff]">{activeSensor.jitter} ms</span>
              </div>
              <div className="flex justify-between items-center text-[#88919d]">
                <span>THROUGHPUT</span>
                <span className="text-[#e5e2e1]">{activeSensor.throughput}</span>
              </div>
              <div className="flex justify-between items-center text-[#88919d]">
                <span>PACKET_LOSS</span>
                <span className="text-[#4edea3]">0.000%</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 space-y-3">
            <button
              onClick={() => triggerReroute(activeSensor.code)}
              className="w-full bg-[#98cbff] text-[#003354] hover:bg-[#cfe5ff] py-2.5 rounded-xl font-mono-tech text-xs font-bold transition-all shadow-[0_0_12px_rgba(152,203,255,0.2)] cursor-pointer"
            >
              RUN_DIAGNOSTIC_TRACE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
