import React from 'react';
import { MapPin, Activity, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import { Facility } from '../../types';

interface FacilityCardProps {
  facility: Facility;
}

export default function FacilityCard({ facility }: FacilityCardProps) {
  const statusConfig = {
    operational: { 
      color: 'text-green-400', 
      bgColor: 'status-success', 
      icon: CheckCircle,
      glow: 'hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]'
    },
    maintenance: { 
      color: 'text-amber-400', 
      bgColor: 'status-warning', 
      icon: AlertTriangle,
      glow: 'hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]'
    },
    offline: { 
      color: 'text-red-400', 
      bgColor: 'status-error', 
      icon: AlertTriangle,
      glow: 'hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]'
    },
  };

  const config = statusConfig[facility.status];
  const StatusIcon = config.icon;

  return (
    <div className={`card card-interactive group ${config.glow}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="icon-container-sm bg-gradient-to-r from-cyan-500 to-blue-500">
            <Activity className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-lg">{facility.name}</h3>
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <MapPin className="w-4 h-4" />
              <span>{facility.location}</span>
            </div>
          </div>
        </div>
        <div className={`${config.bgColor} flex items-center space-x-1`}>
          <StatusIcon className="w-3 h-3" />
          <span className="capitalize">{facility.status}</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="text-center group">
          <div className="text-2xl font-bold text-cyan-400 mb-1">{facility.oee}%</div>
          <div className="text-xs text-gray-400 uppercase tracking-wide">OEE</div>
          <div className="progress-bar mt-2">
            <div 
              className="progress-fill" 
              style={{ width: `${facility.oee}%` }}
            ></div>
          </div>
        </div>
        
        <div className="text-center group">
          <div className="text-2xl font-bold text-emerald-400 mb-1">{facility.productivity}%</div>
          <div className="text-xs text-gray-400 uppercase tracking-wide">Productivity</div>
          <div className="progress-bar mt-2">
            <div 
              className="progress-fill" 
              style={{ width: `${facility.productivity}%` }}
            ></div>
          </div>
        </div>
        
        <div className="text-center group">
          <div className="text-2xl font-bold text-amber-400 mb-1">{facility.defectRate}%</div>
          <div className="text-xs text-gray-400 uppercase tracking-wide">Defects</div>
          <div className="progress-bar mt-2">
            <div 
              className="progress-fill bg-gradient-to-r from-amber-500 to-red-500" 
              style={{ width: `${facility.defectRate * 10}%` }}
            ></div>
          </div>
        </div>
        
        <div className="text-center group">
          <div className="text-2xl font-bold text-blue-400 mb-1">
            {facility.activeDevices}/{facility.totalDevices}
          </div>
          <div className="text-xs text-gray-400 uppercase tracking-wide">Devices</div>
          <div className="progress-bar mt-2">
            <div 
              className="progress-fill" 
              style={{ width: `${(facility.activeDevices / facility.totalDevices) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Performance indicator */}
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Overall Performance</span>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-green-400 font-medium">+2.3%</span>
          </div>
        </div>
      </div>
    </div>
  );
}