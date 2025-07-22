import React, { useState } from 'react';
import { 
  Plus, 
  Settings, 
  Eye, 
  Cpu, 
  Radio, 
  Thermometer, 
  Activity, 
  Zap,
  AlertTriangle,
  CheckCircle,
  Package,
  Wrench,
  Camera,
  Gauge,
  MoreVertical,
  MapPin,
  Info
} from 'lucide-react';

interface Sensor {
  id: string;
  name: string;
  type: 'temperature' | 'vibration' | 'pressure' | 'flow' | 'vision' | 'proximity';
  status: 'online' | 'offline' | 'warning';
  value: string;
  unit: string;
  lastUpdate: string;
}

interface WorkCenter {
  id: string;
  name: string;
  type: 'cnc' | 'assembly' | 'welding' | 'packaging' | 'quality' | 'painting';
  status: 'operational' | 'maintenance' | 'offline';
  sensors: Sensor[];
  position: { x: number; y: number };
  digitalizationLevel: number;
  oee: number;
}

interface SensorKit {
  id: string;
  name: string;
  description: string;
  sensors: string[];
  price: number;
  installationTime: string;
  compatibility: string[];
}

export default function ProductionLineVisualization() {
  const [selectedWorkCenter, setSelectedWorkCenter] = useState<WorkCenter | null>(null);
  const [showSensorKits, setShowSensorKits] = useState(false);
  const [selectedKit, setSelectedKit] = useState<SensorKit | null>(null);

  const workCenters: WorkCenter[] = [
    {
      id: '1',
      name: 'CNC Machining Center',
      type: 'cnc',
      status: 'operational',
      position: { x: 50, y: 10 },
      digitalizationLevel: 85,
      oee: 87.3,
      sensors: [
        { id: '1', name: 'Spindle Temperature', type: 'temperature', status: 'online', value: '68', unit: '°C', lastUpdate: '2 min ago' },
        { id: '2', name: 'Vibration Monitor', type: 'vibration', status: 'online', value: '0.02', unit: 'mm/s', lastUpdate: '1 min ago' },
        { id: '3', name: 'Coolant Pressure', type: 'pressure', status: 'warning', value: '2.1', unit: 'bar', lastUpdate: '3 min ago' }
      ]
    },
    {
      id: '2',
      name: 'Assembly Station A',
      type: 'assembly',
      status: 'operational',
      position: { x: 50, y: 25 },
      digitalizationLevel: 60,
      oee: 78.9,
      sensors: [
        { id: '4', name: 'Torque Sensor', type: 'pressure', status: 'online', value: '45', unit: 'Nm', lastUpdate: '1 min ago' },
        { id: '5', name: 'Vision System', type: 'vision', status: 'online', value: 'OK', unit: '', lastUpdate: '30 sec ago' }
      ]
    },
    {
      id: '3',
      name: 'Welding Station',
      type: 'welding',
      status: 'maintenance',
      position: { x: 50, y: 40 },
      digitalizationLevel: 40,
      oee: 65.2,
      sensors: [
        { id: '6', name: 'Arc Temperature', type: 'temperature', status: 'offline', value: '--', unit: '°C', lastUpdate: '15 min ago' }
      ]
    },
    {
      id: '4',
      name: 'Quality Control',
      type: 'quality',
      status: 'operational',
      position: { x: 50, y: 55 },
      digitalizationLevel: 95,
      oee: 94.1,
      sensors: [
        { id: '7', name: 'Dimensional Scanner', type: 'vision', status: 'online', value: 'Pass', unit: '', lastUpdate: '1 min ago' },
        { id: '8', name: 'Surface Roughness', type: 'proximity', status: 'online', value: '1.2', unit: 'μm', lastUpdate: '2 min ago' },
        { id: '9', name: 'Weight Scale', type: 'pressure', status: 'online', value: '2.45', unit: 'kg', lastUpdate: '1 min ago' }
      ]
    },
    {
      id: '5',
      name: 'Packaging Line',
      type: 'packaging',
      status: 'operational',
      position: { x: 50, y: 70 },
      digitalizationLevel: 30,
      oee: 72.6,
      sensors: [
        { id: '10', name: 'Conveyor Speed', type: 'flow', status: 'online', value: '1.2', unit: 'm/s', lastUpdate: '1 min ago' }
      ]
    },
    {
      id: '6',
      name: 'Paint Booth',
      type: 'painting',
      status: 'offline',
      position: { x: 50, y: 85 },
      digitalizationLevel: 20,
      oee: 0,
      sensors: []
    }
  ];

  const sensorKits: SensorKit[] = [
    {
      id: '1',
      name: 'Basic Digitalization Kit',
      description: 'Essential sensors for basic monitoring and data collection',
      sensors: ['Temperature Sensor', 'Vibration Monitor', 'Proximity Sensor'],
      price: 2500,
      installationTime: '2-4 hours',
      compatibility: ['cnc', 'assembly', 'welding']
    },
    {
      id: '2',
      name: 'Advanced Vision Kit',
      description: 'Computer vision system for quality control and defect detection',
      sensors: ['4K Vision Camera', 'LED Lighting System', 'Edge Processing Unit'],
      price: 8500,
      installationTime: '1-2 days',
      compatibility: ['quality', 'assembly', 'packaging']
    },
    {
      id: '3',
      name: 'Predictive Maintenance Kit',
      description: 'Comprehensive monitoring for predictive maintenance',
      sensors: ['Vibration Sensor', 'Temperature Array', 'Current Monitor', 'Oil Analysis Sensor'],
      price: 5200,
      installationTime: '4-6 hours',
      compatibility: ['cnc', 'welding', 'painting']
    },
    {
      id: '4',
      name: 'Environmental Monitoring Kit',
      description: 'Monitor environmental conditions and compliance',
      sensors: ['Air Quality Sensor', 'Humidity Monitor', 'Noise Level Meter', 'Pressure Sensor'],
      price: 3200,
      installationTime: '2-3 hours',
      compatibility: ['painting', 'welding', 'quality']
    }
  ];

  const getSensorIcon = (type: string) => {
    switch (type) {
      case 'temperature': return Thermometer;
      case 'vibration': return Activity;
      case 'pressure': return Gauge;
      case 'flow': return Zap;
      case 'vision': return Camera;
      case 'proximity': return Radio;
      default: return Cpu;
    }
  };

  const getWorkCenterIcon = (type: string) => {
    switch (type) {
      case 'cnc': return Settings;
      case 'assembly': return Wrench;
      case 'welding': return Zap;
      case 'packaging': return Package;
      case 'quality': return Eye;
      case 'painting': return Activity;
      default: return Settings;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': case 'online': return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'warning': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'maintenance': case 'offline': return 'text-red-400 bg-red-500/10 border-red-500/20';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getDigitalizationColor = (level: number) => {
    if (level >= 80) return 'from-green-500 to-emerald-500';
    if (level >= 60) return 'from-blue-500 to-cyan-500';
    if (level >= 40) return 'from-amber-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  const handleAddSensorKit = (workCenterId: string, kitId: string) => {
    // In a real application, this would make an API call
    console.log(`Adding sensor kit ${kitId} to work center ${workCenterId}`);
    setShowSensorKits(false);
    setSelectedKit(null);
    // Show success notification
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Production Line Visualization</h1>
          <p className="text-gray-400">Interactive view of work centers, sensors, and digitalization opportunities</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Eye className="w-4 h-4" />
            <span>View Mode</span>
          </button>
          <button 
            onClick={() => setShowSensorKits(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Sensors</span>
          </button>
        </div>
      </div>

      {/* Production Line Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Production Line View */}
        <div className="lg:col-span-3">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Production Line Layout</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span>Operational</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                  <span>Maintenance</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <span>Offline</span>
                </div>
              </div>
            </div>

            {/* Production Line Canvas */}
            <div className="relative bg-gray-900 rounded-lg h-96 overflow-hidden">
              {/* Grid Background */}
              <div className="absolute inset-0 opacity-20">
                <div className="w-full h-full" style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                  backgroundSize: '30px 30px'
                }}></div>
              </div>

              {/* Work Centers */}
              {workCenters.map((workCenter) => {
                const WorkCenterIcon = getWorkCenterIcon(workCenter.type);
                return (
                  <div
                    key={workCenter.id}
                    className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110 ${
                      selectedWorkCenter?.id === workCenter.id ? 'scale-110 z-10' : ''
                    }`}
                    style={{
                      left: `${workCenter.position.x}%`,
                      top: `${workCenter.position.y}%`
                    }}
                    onClick={() => setSelectedWorkCenter(workCenter)}
                  >
                    <div className={`w-20 h-20 rounded-xl border-2 flex items-center justify-center relative ${
                      workCenter.status === 'operational' ? 'bg-emerald-400/30 border-emerald-400/70 shadow-lg shadow-emerald-400/20' :
                      workCenter.status === 'maintenance' ? 'bg-amber-400/30 border-amber-400/70 shadow-lg shadow-amber-400/20' :
                      'bg-rose-400/30 border-rose-400/70 shadow-lg shadow-rose-400/20'
                    }`}>
                      <WorkCenterIcon className="w-8 h-8 text-white" />
                      
                      {/* Sensor Count Badge */}
                      <div className="absolute -top-3 -right-3 w-7 h-7 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg">
                        {workCenter.sensors.length}
                      </div>

                      {/* Digitalization Level Indicator */}
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-gray-600 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${getDigitalizationColor(workCenter.digitalizationLevel)} transition-all duration-500 shadow-sm`}
                          style={{ width: `${workCenter.digitalizationLevel}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="text-center mt-4">
                      <div className="text-sm font-medium text-white truncate max-w-24">{workCenter.name}</div>
                      <div className="text-xs text-gray-400">{workCenter.digitalizationLevel}% Digital</div>
                    </div>
                  </div>
                );
              })}

              {/* Flow Arrows */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <marker id="arrowhead" markerWidth="12" markerHeight="8" refX="10" refY="4" orient="auto">
                    <polygon points="0 0, 12 4, 0 8" fill="#22d3ee" />
                  </marker>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                {/* Flow arrows between work centers with proper spacing */}
                <line x1="50%" y1="15%" x2="50%" y2="20%" stroke="#22d3ee" strokeWidth="4" markerEnd="url(#arrowhead)" filter="url(#glow)" opacity="0.9" />
                <line x1="50%" y1="30%" x2="50%" y2="35%" stroke="#22d3ee" strokeWidth="4" markerEnd="url(#arrowhead)" filter="url(#glow)" opacity="0.9" />
                <line x1="50%" y1="45%" x2="50%" y2="50%" stroke="#22d3ee" strokeWidth="4" markerEnd="url(#arrowhead)" filter="url(#glow)" opacity="0.9" />
                <line x1="50%" y1="60%" x2="50%" y2="65%" stroke="#22d3ee" strokeWidth="4" markerEnd="url(#arrowhead)" filter="url(#glow)" opacity="0.9" />
                <line x1="50%" y1="75%" x2="50%" y2="80%" stroke="#22d3ee" strokeWidth="4" markerEnd="url(#arrowhead)" filter="url(#glow)" opacity="0.9" />
                
                {/* Animated flow indicators */}
                <circle r="3" fill="#22d3ee" opacity="0.8">
                  <animateMotion dur="3s" repeatCount="indefinite" path="M 50,60 L 50,240 L 50,320 L 50,400 L 50,480">
                    <animate attributeName="opacity" values="0.8;0.3;0.8" dur="3s" repeatCount="indefinite"/>
                  </animateMotion>
                </circle>
              </svg>
            </div>
          </div>
        </div>

        {/* Work Center Details Panel */}
        <div className="space-y-6">
          {selectedWorkCenter ? (
            <>
              {/* Work Center Info */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">{selectedWorkCenter.name}</h3>
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm border shadow-lg ${getStatusColor(selectedWorkCenter.status)}`}>
                    {selectedWorkCenter.status === 'operational' ? <CheckCircle className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                    <span className="capitalize">{selectedWorkCenter.status}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-gray-400 text-sm">OEE</div>
                      <div className="text-white text-xl font-bold">{selectedWorkCenter.oee}%</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Digitalization</div>
                      <div className="text-white text-xl font-bold">{selectedWorkCenter.digitalizationLevel}%</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-gray-400 text-sm mb-2">Digitalization Progress</div>
                    <div className="w-full bg-gray-600 rounded-full h-3 shadow-inner">
                      <div 
                        className={`h-3 rounded-full bg-gradient-to-r ${getDigitalizationColor(selectedWorkCenter.digitalizationLevel)} transition-all duration-500 shadow-sm`}
                        style={{ width: `${selectedWorkCenter.digitalizationLevel}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sensors List */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-white">Installed Sensors</h4>
                  <span className="text-sm text-gray-400">{selectedWorkCenter.sensors.length} sensors</span>
                </div>

                {selectedWorkCenter.sensors.length > 0 ? (
                  <div className="space-y-3">
                    {selectedWorkCenter.sensors.map((sensor) => {
                      const SensorIcon = getSensorIcon(sensor.type);
                      return (
                        <div key={sensor.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${getStatusColor(sensor.status)}`}>
                              <SensorIcon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-white text-sm font-medium">{sensor.name}</div>
                              <div className="text-gray-400 text-xs">{sensor.lastUpdate}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-white font-medium">{sensor.value} {sensor.unit}</div>
                            <div className={`text-xs ${
                              sensor.status === 'online' ? 'text-green-400' :
                              sensor.status === 'warning' ? 'text-amber-400' : 'text-red-400'
                            }`}>
                              {sensor.status}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Radio className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                    <h4 className="text-white font-medium mb-2">No Sensors Installed</h4>
                    <p className="text-gray-400 text-sm mb-4">This work center needs digitalization</p>
                    <button 
                      onClick={() => setShowSensorKits(true)}
                      className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                      Add Sensor Kit
                    </button>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h4 className="text-lg font-semibold text-white mb-4">Quick Actions</h4>
                <div className="space-y-2">
                  <button 
                    onClick={() => setShowSensorKits(true)}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Sensor Kit</span>
                  </button>
                  <button className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center space-x-2">
                    <Settings className="w-4 h-4" />
                    <span>Configure Sensors</span>
                  </button>
                  <button className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span>View Analytics</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="text-center py-12">
                <MapPin className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Select a Work Center</h3>
                <p className="text-gray-400 text-sm">Click on any work center in the production line to view details and manage sensors</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sensor Kits Modal */}
      {showSensorKits && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl border border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div>
                <h2 className="text-2xl font-bold text-white">Sensor Kits Catalog</h2>
                <p className="text-gray-400">Choose a sensor kit to digitalize your work center</p>
              </div>
              <button
                onClick={() => setShowSensorKits(false)}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sensorKits.map((kit) => (
                  <div key={kit.id} className="bg-gray-700/50 rounded-xl p-6 border border-gray-600/30 hover:border-teal-500/30 transition-all duration-300 cursor-pointer"
                       onClick={() => setSelectedKit(kit)}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white">{kit.name}</h3>
                      <div className="text-2xl font-bold text-cyan-400">${kit.price.toLocaleString()}</div>
                    </div>

                    <p className="text-gray-300 text-sm mb-4">{kit.description}</p>

                    <div className="space-y-3 mb-4">
                      <div>
                        <div className="text-gray-400 text-xs uppercase tracking-wide mb-1">Included Sensors</div>
                        <div className="flex flex-wrap gap-1">
                          {kit.sensors.map((sensor, index) => (
                            <span key={index} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded shadow-sm">
                              {sensor}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-400">Installation Time</div>
                          <div className="text-white font-medium">{kit.installationTime}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Compatibility</div>
                          <div className="text-white font-medium">{kit.compatibility.length} types</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (selectedWorkCenter) {
                            handleAddSensorKit(selectedWorkCenter.id, kit.id);
                          }
                        }}
                        disabled={!selectedWorkCenter || !kit.compatibility.includes(selectedWorkCenter?.type || '')}
                        className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm transition-all duration-300 shadow-lg"
                      >
                        Install Kit
                      </button>
                      <button className="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white px-4 py-2 rounded-lg text-sm transition-all duration-300 shadow-lg">
                        <Info className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {selectedWorkCenter && (
                <div className="mt-6 p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 rounded-lg shadow-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Info className="w-4 h-4 text-cyan-400" />
                    <span className="text-cyan-400 font-medium">Selected Work Center: {selectedWorkCenter.name}</span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Compatible kits are highlighted. Installation will be scheduled during the next maintenance window.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}