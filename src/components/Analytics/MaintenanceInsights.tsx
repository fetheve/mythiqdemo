import React, { useState } from 'react';
import { 
  Wrench, 
  Calendar, 
  AlertTriangle, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  Settings,
  BarChart3
} from 'lucide-react';

export default function MaintenanceInsights() {
  const [activeTab, setActiveTab] = useState('predictive');

  const maintenanceData = {
    predictive: [
      {
        machine: 'CNC Mill #3',
        prediction: 'Bearing failure predicted',
        confidence: 87,
        timeToFailure: '4-6 hours',
        severity: 'critical',
        recommendation: 'Schedule immediate bearing replacement'
      },
      {
        machine: 'Hydraulic Press #5',
        prediction: 'Seal degradation detected',
        confidence: 72,
        timeToFailure: '2-3 days',
        severity: 'warning',
        recommendation: 'Plan seal replacement during next scheduled downtime'
      },
      {
        machine: 'Conveyor Belt #2',
        prediction: 'Motor vibration anomaly',
        confidence: 65,
        timeToFailure: '1-2 weeks',
        severity: 'info',
        recommendation: 'Monitor vibration levels, schedule inspection'
      }
    ],
    schedule: [
      {
        machine: 'Laser Cutter #02',
        type: 'Preventive Maintenance',
        scheduled: '2025-01-15 14:00',
        duration: '2 hours',
        status: 'upcoming',
        technician: 'Mike Johnson'
      },
      {
        machine: 'Welding Station #03',
        type: 'Calibration',
        scheduled: '2025-01-15 16:00',
        duration: '1 hour',
        status: 'upcoming',
        technician: 'Sarah Chen'
      },
      {
        machine: 'CNC Mill #12',
        type: 'Filter Replacement',
        scheduled: '2025-01-16 09:00',
        duration: '30 minutes',
        status: 'scheduled',
        technician: 'Tom Wilson'
      }
    ],
    history: [
      {
        machine: 'Packaging Line #01',
        type: 'Emergency Repair',
        completed: '2025-01-14 11:30',
        duration: '3.5 hours',
        cost: '$2,400',
        oeeBefore: 68.2,
        oeeAfter: 84.7,
        impact: '+16.5%'
      },
      {
        machine: 'Press Machine #04',
        type: 'Scheduled Maintenance',
        completed: '2025-01-13 15:00',
        duration: '2 hours',
        cost: '$800',
        oeeBefore: 76.1,
        oeeAfter: 82.3,
        impact: '+6.2%'
      }
    ]
  };

  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case 'critical':
        return { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' };
      case 'warning':
        return { color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' };
      default:
        return { color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' };
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'upcoming':
        return { color: 'text-amber-400', bg: 'bg-amber-500/10' };
      case 'scheduled':
        return { color: 'text-blue-400', bg: 'bg-blue-500/10' };
      case 'completed':
        return { color: 'text-green-400', bg: 'bg-green-500/10' };
      default:
        return { color: 'text-gray-400', bg: 'bg-gray-500/10' };
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Maintenance Insights</h3>
            <p className="text-gray-400">Predictive maintenance and scheduling optimization</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-teal-400">$12.4K</div>
              <div className="text-sm text-gray-400">Savings This Month</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-400">94.2%</div>
              <div className="text-sm text-gray-400">Prediction Accuracy</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-700 rounded-lg p-1">
          {[
            { id: 'predictive', name: 'Predictive Alerts', icon: AlertTriangle },
            { id: 'schedule', name: 'Maintenance Schedule', icon: Calendar },
            { id: 'history', name: 'Maintenance History', icon: Clock }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 justify-center ${
                  activeTab === tab.id
                    ? 'bg-gray-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'predictive' && (
        <div className="space-y-6">
          {/* Predictive Alerts */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <span>Predictive Maintenance Alerts</span>
            </h4>

            <div className="space-y-4">
              {maintenanceData.predictive.map((alert, index) => {
                const config = getSeverityConfig(alert.severity);
                return (
                  <div key={index} className={`p-4 rounded-lg border ${config.bg} ${config.border}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h5 className="text-white font-medium">{alert.machine}</h5>
                        <p className={`text-sm ${config.color} font-medium`}>{alert.prediction}</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${config.color}`}>{alert.confidence}%</div>
                        <div className="text-xs text-gray-400">Confidence</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-gray-400 text-sm">Time to Failure</div>
                        <div className="text-white font-medium">{alert.timeToFailure}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Severity</div>
                        <div className={`font-medium capitalize ${config.color}`}>{alert.severity}</div>
                      </div>
                    </div>

                    <div className="bg-gray-700/50 rounded p-3">
                      <div className="text-gray-400 text-sm mb-1">Recommendation</div>
                      <div className="text-white text-sm">{alert.recommendation}</div>
                    </div>

                    <div className="flex space-x-2 mt-4">
                      <button className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded text-sm transition-colors">
                        Schedule Maintenance
                      </button>
                      <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Maintenance ROI */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span>Maintenance ROI</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <h5 className="text-green-400 font-medium mb-2">Cost Avoidance</h5>
                <div className="text-2xl font-bold text-white mb-1">$45.2K</div>
                <div className="text-gray-400 text-sm">This quarter</div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h5 className="text-blue-400 font-medium mb-2">Downtime Reduction</h5>
                <div className="text-2xl font-bold text-white mb-1">32%</div>
                <div className="text-gray-400 text-sm">vs. reactive maintenance</div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                <h5 className="text-purple-400 font-medium mb-2">Equipment Life</h5>
                <div className="text-2xl font-bold text-white mb-1">+18%</div>
                <div className="text-gray-400 text-sm">Extended lifespan</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'schedule' && (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-semibold text-white flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-blue-400" />
              <span>Maintenance Schedule</span>
            </h4>
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
              Schedule New
            </button>
          </div>

          <div className="space-y-4">
            {maintenanceData.schedule.map((item, index) => {
              const config = getStatusConfig(item.status);
              return (
                <div key={index} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600/30">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h5 className="text-white font-medium">{item.machine}</h5>
                      <p className="text-gray-400 text-sm">{item.type}</p>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${config.bg} ${config.color}`}>
                      {item.status}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-gray-400 text-sm">Scheduled</div>
                      <div className="text-white font-medium">{item.scheduled}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Duration</div>
                      <div className="text-white font-medium">{item.duration}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Technician</div>
                      <div className="text-white font-medium">{item.technician}</div>
                    </div>
                  </div>

                  <div className="flex space-x-2 mt-4">
                    <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition-colors">
                      Reschedule
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-semibold text-white flex items-center space-x-2">
              <Clock className="w-5 h-5 text-gray-400" />
              <span>Maintenance History</span>
            </h4>
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
              Export Report
            </button>
          </div>

          <div className="space-y-4">
            {maintenanceData.history.map((item, index) => (
              <div key={index} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600/30">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h5 className="text-white font-medium">{item.machine}</h5>
                    <p className="text-gray-400 text-sm">{item.type}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold">{item.cost}</div>
                    <div className="text-gray-400 text-sm">Total Cost</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <div className="text-gray-400 text-sm">Completed</div>
                    <div className="text-white font-medium">{item.completed}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Duration</div>
                    <div className="text-white font-medium">{item.duration}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">OEE Before</div>
                    <div className="text-red-400 font-medium">{item.oeeBefore}%</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">OEE After</div>
                    <div className="text-green-400 font-medium">{item.oeeAfter}%</div>
                  </div>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 font-medium">
                      OEE Improvement: {item.impact}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}