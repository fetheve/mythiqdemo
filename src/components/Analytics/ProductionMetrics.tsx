import React from 'react';
import { Package, TrendingUp, DollarSign, Target, Clock, BarChart3 } from 'lucide-react';

export default function ProductionMetrics() {
  const metrics = [
    {
      title: 'Units Produced',
      value: '2,847',
      target: '3,200',
      percentage: 89,
      change: '+12%',
      trend: 'up',
      icon: Package,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500',
      period: 'Today'
    },
    {
      title: 'Throughput Efficiency',
      value: '68%',
      target: '75%',
      percentage: 91,
      change: '+5%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-green-400',
      bgColor: 'bg-green-500',
      period: 'Current Shift'
    },
    {
      title: 'Yield Rate',
      value: '94.2%',
      target: '96%',
      percentage: 98,
      change: '-1.2%',
      trend: 'down',
      icon: Target,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500',
      period: 'This Week'
    },
    {
      title: 'Cost of Downtime',
      value: '$4,200',
      target: '$3,000',
      percentage: 140,
      change: '+$800',
      trend: 'down',
      icon: DollarSign,
      color: 'text-red-400',
      bgColor: 'bg-red-500',
      period: 'Today'
    }
  ];

  const shiftMetrics = [
    { shift: 'Day Shift', units: 1247, efficiency: 72, yield: 95.1, downtime: '$1,200' },
    { shift: 'Evening Shift', units: 1156, efficiency: 68, yield: 93.8, downtime: '$1,800' },
    { shift: 'Night Shift', units: 444, efficiency: 65, yield: 92.5, downtime: '$1,200' }
  ];

  return (
    <div className="space-y-8">
      {/* Main Production Metrics */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Production Metrics</h3>
            <p className="text-gray-400">Key performance indicators and targets</p>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-teal-400" />
            <span className="text-sm text-gray-400">Real-time</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className="bg-gray-700/50 rounded-xl p-6 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r from-gray-600 to-gray-700 group-hover:from-${metric.bgColor.split('-')[1]}-600 group-hover:to-${metric.bgColor.split('-')[1]}-700 transition-all duration-300`}>
                    <Icon className={`w-6 h-6 ${metric.color}`} />
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    metric.trend === 'up' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                  }`}>
                    {metric.change}
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                    <div className="text-sm text-gray-400">{metric.title}</div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Target: {metric.target}</span>
                      <span className="text-gray-400">{metric.period}</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div
                        className={`${metric.bgColor} h-2 rounded-full transition-all duration-1000 relative overflow-hidden`}
                        style={{ width: `${Math.min(metric.percentage, 100)}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Shift Performance Breakdown */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Shift Performance</h3>
            <p className="text-gray-400">Production metrics by shift</p>
          </div>
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
            View Details
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-gray-400 font-medium py-3 px-4">Shift</th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">Units Produced</th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">Efficiency</th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">Yield Rate</th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">Downtime Cost</th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">Performance</th>
              </tr>
            </thead>
            <tbody>
              {shiftMetrics.map((shift, index) => (
                <tr key={index} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-amber-500' : 'bg-purple-500'
                      }`}></div>
                      <span className="text-white font-medium">{shift.shift}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-white font-medium">{shift.units.toLocaleString()}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-16 bg-gray-600 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            shift.efficiency >= 70 ? 'bg-green-500' : 'bg-amber-500'
                          }`}
                          style={{ width: `${shift.efficiency}%` }}
                        ></div>
                      </div>
                      <span className="text-white font-medium w-10">{shift.efficiency}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-white font-medium">{shift.yield}%</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-red-400 font-medium">{shift.downtime}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <BarChart3 className={`w-4 h-4 ${
                        shift.efficiency >= 70 ? 'text-green-400' : 'text-amber-400'
                      }`} />
                      <span className={`text-sm font-medium ${
                        shift.efficiency >= 70 ? 'text-green-400' : 'text-amber-400'
                      }`}>
                        {shift.efficiency >= 70 ? 'Good' : 'Needs Attention'}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Production Timeline */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Production Timeline</h3>
            <p className="text-gray-400">Recent production events and milestones</p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { time: '14:30', event: 'Batch 2847 completed - 500 units', type: 'success', icon: Package },
            { time: '14:15', event: 'Quality inspection passed - Line 2', type: 'success', icon: Target },
            { time: '14:00', event: 'Production target 90% achieved', type: 'info', icon: TrendingUp },
            { time: '13:45', event: 'Shift changeover completed', type: 'info', icon: Clock },
            { time: '13:30', event: 'Downtime event resolved - $800 impact', type: 'warning', icon: DollarSign }
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-center space-x-4 p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
                <div className="flex items-center space-x-2 text-sm text-gray-400 w-16">
                  <Clock className="w-3 h-3" />
                  <span>{item.time}</span>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  item.type === 'success' ? 'bg-green-500/20 text-green-400' :
                  item.type === 'warning' ? 'bg-amber-500/20 text-amber-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm">{item.event}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}