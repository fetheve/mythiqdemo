import React from 'react';
import { 
  Package, 
  Clock, 
  DollarSign, 
  CheckCircle, 
  Info,
  Cpu,
  Camera,
  Thermometer,
  Activity,
  Radio,
  Gauge
} from 'lucide-react';

interface SensorKitCardProps {
  kit: {
    id: string;
    name: string;
    description: string;
    sensors: string[];
    price: number;
    installationTime: string;
    compatibility: string[];
  };
  isCompatible: boolean;
  onInstall: () => void;
  onViewDetails: () => void;
}

export default function SensorKitCard({ kit, isCompatible, onInstall, onViewDetails }: SensorKitCardProps) {
  const getSensorIcon = (sensorName: string) => {
    if (sensorName.toLowerCase().includes('temperature')) return Thermometer;
    if (sensorName.toLowerCase().includes('vibration')) return Activity;
    if (sensorName.toLowerCase().includes('camera') || sensorName.toLowerCase().includes('vision')) return Camera;
    if (sensorName.toLowerCase().includes('pressure') || sensorName.toLowerCase().includes('gauge')) return Gauge;
    if (sensorName.toLowerCase().includes('proximity') || sensorName.toLowerCase().includes('radio')) return Radio;
    return Cpu;
  };

  return (
    <div className={`bg-gray-700/50 rounded-xl p-6 border transition-all duration-300 ${
      isCompatible 
        ? 'border-teal-500/30 hover:border-teal-500/50 hover:bg-gray-700/70' 
        : 'border-gray-600/30 opacity-60'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Package className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{kit.name}</h3>
            {!isCompatible && (
              <span className="text-xs text-amber-400">Not compatible with selected work center</span>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-teal-400">${kit.price.toLocaleString()}</div>
          <div className="text-xs text-gray-400">One-time cost</div>
        </div>
      </div>

      <p className="text-gray-300 text-sm mb-4 leading-relaxed">{kit.description}</p>

      <div className="space-y-4 mb-6">
        <div>
          <div className="text-gray-400 text-xs uppercase tracking-wide mb-2">Included Sensors</div>
          <div className="grid grid-cols-1 gap-2">
            {kit.sensors.map((sensor, index) => {
              const SensorIcon = getSensorIcon(sensor);
              return (
                <div key={index} className="flex items-center space-x-2 p-2 bg-gray-600/50 rounded-lg">
                  <SensorIcon className="w-4 h-4 text-teal-400" />
                  <span className="text-white text-sm">{sensor}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <div>
              <div className="text-gray-400 text-xs">Installation Time</div>
              <div className="text-white text-sm font-medium">{kit.installationTime}</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-gray-400" />
            <div>
              <div className="text-gray-400 text-xs">Compatibility</div>
              <div className="text-white text-sm font-medium">{kit.compatibility.length} work center types</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex space-x-2">
        <button 
          onClick={onInstall}
          disabled={!isCompatible}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            isCompatible
              ? 'bg-teal-600 hover:bg-teal-700 text-white'
              : 'bg-gray-600 cursor-not-allowed text-gray-400'
          }`}
        >
          {isCompatible ? 'Install Kit' : 'Not Compatible'}
        </button>
        <button 
          onClick={onViewDetails}
          className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg text-sm transition-colors"
        >
          <Info className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}