import React, { useState } from 'react';
import { AlertTriangle, Clock, Wrench, XCircle, BarChart3 } from 'lucide-react';

interface LossAnalysisProps {
  expanded?: boolean;
}

export default function LossAnalysis({ expanded = false }: LossAnalysisProps) {
  const [activeTab, setActiveTab] = useState('availability');

  const lossData = {
    availability: [
      { type: 'Unplanned Downtime', duration: 220, percentage: 45, color: 'bg-red-500' },
      { type: 'Setup/Changeover', duration: 135, percentage: 28, color: 'bg-orange-500' },
      { type: 'Scheduled Maintenance', duration: 95, percentage: 19, color: 'bg-amber-500' },
      { type: 'Material Shortage', duration: 40, percentage: 8, color: 'bg-yellow-500' }
    ],
    performance: [
      { type: 'Slow Cycles', duration: 180, percentage: 38, color: 'bg-purple-500' },
      { type: 'Idling/Minor Stops', duration: 165, percentage: 35, color: 'bg-indigo-500' },
      { type: 'Reduced Speed', duration: 85, percentage: 18, color: 'bg-blue-500' },
      { type: 'Startup Losses', duration: 42, percentage: 9, color: 'bg-cyan-500' }
    ],
    quality: [
      { type: 'Scrap/Defects', duration: 95, percentage: 52, color: 'bg-pink-500' },
      { type: 'Rework', duration: 55, percentage: 30, color: 'bg-rose-500' },
      { type: 'Startup Rejects', duration: 33, percentage: 18, color: 'bg-red-400' }
    ]
  };

  const tabs = [
    { id: 'availability', name: 'Availability Losses', icon: Clock, color: 'text-red-400' },
    { id: 'performance', name: 'Performance Losses', icon: BarChart3, color: 'text-purple-400' },
    { id: 'quality', name: 'Quality Losses', icon: XCircle, color: 'text-pink-400' }
  ];

  const currentData = lossData[activeTab as keyof typeof lossData];
  const totalLoss = currentData.reduce((sum, item) => sum + item.duration, 0);

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">Loss Analysis</h3>
          <p className="text-gray-400">Pareto breakdown of production losses</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-red-400">{totalLoss} min</div>
          <div className="text-sm text-gray-400">Total Loss Today</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-700 rounded-lg p-1 mb-6">
        {tabs.map((tab) => {
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
              <Icon className={`w-4 h-4 ${activeTab === tab.id ? tab.color : ''}`} />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* Pareto Chart */}
      <div className="mb-6">
        <div className="flex items-end space-x-2 h-48 bg-gray-900 rounded-lg p-4">
          {currentData.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full flex flex-col justify-end h-full">
                <div
                  className={`${item.color} rounded-t transition-all duration-500 hover:opacity-80 cursor-pointer relative group`}
                  style={{ height: `${item.percentage * 2}%` }}
                >
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 border border-gray-600 rounded-lg p-2 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                    <div className="font-medium">{item.type}</div>
                    <div className="text-gray-400">{item.duration} minutes ({item.percentage}%)</div>
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-400 mt-2 text-center">
                {item.type.split(' ')[0]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Loss Details */}
      <div className="space-y-3">
        {currentData.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700/70 transition-colors">
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded ${item.color}`}></div>
              <div>
                <div className="text-white font-medium">{item.type}</div>
                <div className="text-gray-400 text-sm">{item.percentage}% of total losses</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white font-bold">{item.duration} min</div>
              <div className="text-gray-400 text-sm">Today</div>
            </div>
          </div>
        ))}
      </div>

      {expanded && (
        <div className="mt-8 space-y-6">
          {/* Root Cause Analysis */}
          <div className="bg-gray-700/50 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-white mb-4">Root Cause Analysis</h4>
            <div className="space-y-3">
              {[
                { cause: 'Bearing failure on Line 2', impact: '180 min', frequency: '3x this week', severity: 'high' },
                { cause: 'Material quality issues', impact: '95 min', frequency: '2x this week', severity: 'medium' },
                { cause: 'Operator training gap', impact: '65 min', frequency: '5x this week', severity: 'medium' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-600/50 rounded">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className={`w-4 h-4 ${
                      item.severity === 'high' ? 'text-red-400' : 'text-amber-400'
                    }`} />
                    <div>
                      <div className="text-white font-medium">{item.cause}</div>
                      <div className="text-gray-400 text-sm">{item.frequency}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold">{item.impact}</div>
                    <div className="text-gray-400 text-sm">Impact</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Improvement Opportunities */}
          <div className="bg-gray-700/50 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-white mb-4">Improvement Opportunities</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { 
                  title: 'Predictive Maintenance', 
                  description: 'Implement vibration monitoring for early bearing failure detection',
                  potential: '120 min/week',
                  effort: 'Medium'
                },
                { 
                  title: 'Quick Changeover', 
                  description: 'SMED implementation for setup time reduction',
                  potential: '85 min/week',
                  effort: 'High'
                },
                { 
                  title: 'Operator Training', 
                  description: 'Enhanced training program for quality procedures',
                  potential: '45 min/week',
                  effort: 'Low'
                },
                { 
                  title: 'Material Inspection', 
                  description: 'Incoming material quality checks',
                  potential: '60 min/week',
                  effort: 'Low'
                }
              ].map((opportunity, index) => (
                <div key={index} className="bg-gray-600/50 rounded p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-white font-medium">{opportunity.title}</h5>
                    <span className={`text-xs px-2 py-1 rounded ${
                      opportunity.effort === 'Low' ? 'bg-green-600 text-white' :
                      opportunity.effort === 'Medium' ? 'bg-amber-600 text-white' : 'bg-red-600 text-white'
                    }`}>
                      {opportunity.effort} Effort
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{opportunity.description}</p>
                  <div className="text-teal-400 font-medium text-sm">Potential: {opportunity.potential}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}