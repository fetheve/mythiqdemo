import React from 'react';
import { TrendingUp, TrendingDown, Activity, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { facilities, alerts } from '../../data/mockData';
import MetricCard from '../Common/MetricCard';
import FacilityCard from '../Common/FacilityCard';
import AlertsPanel from '../Common/AlertsPanel';

export default function ExecutiveDashboard() {
  const overallOEE = facilities.reduce((sum, facility) => sum + facility.oee, 0) / facilities.length;
  const overallProductivity = facilities.reduce((sum, facility) => sum + facility.productivity, 0) / facilities.length;
  const averageDefectRate = facilities.reduce((sum, facility) => sum + facility.defectRate, 0) / facilities.length;
  const totalDevices = facilities.reduce((sum, facility) => sum + facility.totalDevices, 0);
  const activeDevices = facilities.reduce((sum, facility) => sum + facility.activeDevices, 0);

  const criticalAlerts = alerts.filter(alert => alert.type === 'critical' && !alert.acknowledged).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Executive Dashboard</h1>
        <p className="text-gray-400">Real-time overview of manufacturing operations across all facilities</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Overall OEE"
          value={`${overallOEE.toFixed(1)}%`}
          change={2.3}
          icon={Activity}
          color="teal"
        />
        <MetricCard
          title="Productivity"
          value={`${overallProductivity.toFixed(1)}%`}
          change={1.7}
          icon={TrendingUp}
          color="emerald"
        />
        <MetricCard
          title="Defect Rate"
          value={`${averageDefectRate.toFixed(1)}%`}
          change={-0.4}
          icon={TrendingDown}
          color="amber"
          inverse
        />
        <MetricCard
          title="Device Health"
          value={`${activeDevices}/${totalDevices}`}
          change={0}
          icon={CheckCircle}
          color="green"
          subtitle="Devices Online"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Facilities Status */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Facility Status</h2>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">Live Data</span>
              </div>
            </div>
            <div className="space-y-4">
              {facilities.map((facility) => (
                <FacilityCard key={facility.id} facility={facility} />
              ))}
            </div>
          </div>
        </div>

        {/* Alerts Panel */}
        <div>
          <AlertsPanel alerts={alerts.slice(0, 5)} showHeader />
        </div>
      </div>

      {/* Production Timeline */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-6">Production Timeline</h2>
        <div className="space-y-4">
          {[
            { time: '14:30', event: 'Line 1 - Quality check completed', status: 'success' },
            { time: '14:25', event: 'CNC Mill #3 - Maintenance alert triggered', status: 'warning' },
            { time: '14:20', event: 'Batch 2847 - Production started', status: 'info' },
            { time: '14:15', event: 'Vision system - Defect detected and resolved', status: 'warning' },
            { time: '14:10', event: 'Line 2 - Shift change completed', status: 'success' },
          ].map((item, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-400 w-20">
                <Clock className="w-4 h-4" />
                <span>{item.time}</span>
              </div>
              <div className={`w-3 h-3 rounded-full ${
                item.status === 'success' ? 'bg-green-400' :
                item.status === 'warning' ? 'bg-amber-400' : 'bg-blue-400'
              }`}></div>
              <div className="flex-1">
                <p className="text-white text-sm">{item.event}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}