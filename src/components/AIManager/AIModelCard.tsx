import React from 'react';
import { 
  Brain, 
  Eye, 
  TrendingUp, 
  Zap, 
  AlertTriangle,
  Play,
  Pause,
  Settings,
  Download,
  MoreVertical,
  CheckCircle,
  Clock
} from 'lucide-react';
import { AIModel } from '../../types';

interface AIModelCardProps {
  model: AIModel;
}

export default function AIModelCard({ model }: AIModelCardProps) {
  const getModelIcon = (type: string) => {
    switch (type) {
      case 'vision':
        return Eye;
      case 'predictive':
        return TrendingUp;
      case 'optimization':
        return Zap;
      case 'anomaly':
        return AlertTriangle;
      default:
        return Brain;
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'deployed':
        return { 
          statusClass: 'status-success', 
          icon: Play,
          glow: 'hover:shadow-[0_0_25px_rgba(16,185,129,0.3)]'
        };
      case 'training':
        return { 
          statusClass: 'status-warning', 
          icon: Download,
          glow: 'hover:shadow-[0_0_25px_rgba(245,158,11,0.3)]'
        };
      case 'testing':
        return { 
          statusClass: 'status-info', 
          icon: Settings,
          glow: 'hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]'
        };
      case 'inactive':
        return { 
          statusClass: 'bg-gray-500/10 text-gray-400 border-gray-500/20', 
          icon: Pause,
          glow: ''
        };
      default:
        return { 
          statusClass: 'bg-gray-500/10 text-gray-400 border-gray-500/20', 
          icon: Pause,
          glow: ''
        };
    }
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return 'from-green-500 to-emerald-500';
    if (accuracy >= 80) return 'from-cyan-500 to-blue-500';
    return 'from-amber-500 to-orange-500';
  };

  const ModelIcon = getModelIcon(model.type);
  const statusConfig = getStatusConfig(model.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className={`card card-interactive group ${statusConfig.glow}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="icon-container bg-gradient-to-r from-purple-500 to-pink-500">
            <ModelIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-lg">{model.name}</h3>
            <p className="text-gray-400 text-sm capitalize">{model.type} Model</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className={`${statusConfig.statusClass} flex items-center space-x-1`}>
            <StatusIcon className="w-3 h-3" />
            <span className="capitalize">{model.status}</span>
          </div>
          <button className="btn btn-ghost p-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Accuracy */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-400 text-sm font-medium">Model Accuracy</span>
            <span className="text-white font-bold text-lg">{model.accuracy}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className={`progress-fill bg-gradient-to-r ${getAccuracyColor(model.accuracy)}`}
              style={{ width: `${model.accuracy}%` }}
            ></div>
          </div>
        </div>

        {/* Model Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-700/50 rounded-lg p-3">
            <div className="text-gray-400 text-xs uppercase tracking-wide mb-1">Version</div>
            <div className="text-white font-medium">{model.version}</div>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-3">
            <div className="text-gray-400 text-xs uppercase tracking-wide mb-1">Last Trained</div>
            <div className="text-white font-medium">{model.lastTrained}</div>
          </div>
        </div>

        <div className="bg-gray-700/50 rounded-lg p-3">
          <div className="text-gray-400 text-xs uppercase tracking-wide mb-1">Deployment</div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-white font-medium">{model.deployment}</span>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-lg font-bold text-cyan-400">99.2%</div>
            <div className="text-xs text-gray-400">Uptime</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-400">1.2ms</div>
            <div className="text-xs text-gray-400">Latency</div>
          </div>
          <div>
            <div className="text-lg font-bold text-purple-400">847</div>
            <div className="text-xs text-gray-400">Predictions/min</div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-2 pt-6 border-t border-gray-700 mt-6">
        <button className="btn btn-primary flex-1">
          {model.status === 'deployed' ? 'Update Model' : 'Deploy Model'}
        </button>
        <button className="btn btn-secondary">
          <Settings className="w-4 h-4" />
        </button>
        <button className="btn btn-ghost">
          <Download className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}