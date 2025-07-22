import React from 'react';
import { 
  Settings, 
  Wrench, 
  Zap, 
  Package, 
  Eye, 
  Activity,
  CheckCircle,
  AlertTriangle,
  Clock,
  Plus,
  Radio
} from 'lucide-react';

interface WorkCenterCardProps {
  workCenter: {
    id: string;
    name: string;
    type: string;
    status: string;
    digitalizationLevel: number;
    oee: number;
    sensors: any[];
  };
  onAddSensors: () => void;
  onViewDetails: () => void;
}

export default function WorkCenterCard({ workCenter, onAddSensors, onViewDetails }: WorkCenterCardProps) {
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

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'operational':
        return { 
          color: 'text-green-400', 
          bg: 'bg-green-500/10 border-green-500/20',
          icon: CheckCircle
        };
      case 'maintenance':
        return { 
          color: 'text-amber-400', 
          bg: 'bg-amber-500/10 border-amber-500/20',
          icon: AlertTriangle
        };
      case 'offline':
        return { 
          color: 'text-red-400', 
          bg: 'bg-red-500/10 border-red-500/20',
          icon: AlertTriangle
        };
      default:
        return { 
          color: 'text-gray-400', 
          bg: 'bg-gray-500/10 border-gray-500/20',
          icon: Clock
        };
    }
  };

  const getDigitalizationColor = (level: number) => {
    if (level >= 80) return 'from-green-500 to-emerald-500';
    if (level >= 60) return 'from-blue-500 to-cyan-500';
    if (level >= 40) return 'from-amber-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  const WorkCenterIcon = getWorkCenterIcon(workCenter.type);
  const statusConfig = getStatusConfig(workCenter.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-teal-500/30 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl flex items-center justify-center">
            <WorkCenterIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{workCenter.name}</h3>
            <p className="text-gray-400 text-sm capitalize">{workCenter.type} Station</p>
          </div>
        </div>
        <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs border ${statusConfig.bg} ${statusConfig.color}`}>
          <StatusIcon className="w-3 h-3" />
          <span className="capitalize">{workCenter.status}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="text-xl font-bold text-white">{workCenter.oee}%</div>
          <div className="text-xs text-gray-400">OEE</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-teal-400">{workCenter.digitalizationLevel}%</div>
          <div className="text-xs text-gray-400">Digital</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-blue-400">{workCenter.sensors.length}</div>
          <div className="text-xs text-gray-400">Sensors</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-400">Digitalization Progress</span>
          <span className="text-white font-medium">{workCenter.digitalizationLevel}%</span>
        </div>
        <div className="w-full bg-gray-600 rounded-full h-2">
          <div 
            className={`h-2 rounded-full bg-gradient-to-r ${getDigitalizationColor(workCenter.digitalizationLevel)} transition-all duration-500`}
            style={{ width: `${workCenter.digitalizationLevel}%` }}
          ></div>
        </div>
      </div>

      <div className="flex space-x-2">
        <button 
          onClick={onViewDetails}
          className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center justify-center space-x-2"
        >
          <Eye className="w-4 h-4" />
          <span>View Details</span>
        </button>
        <button 
          onClick={onAddSensors}
          className="flex-1 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center justify-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Sensors</span>
        </button>
      </div>
    </div>
  );
}