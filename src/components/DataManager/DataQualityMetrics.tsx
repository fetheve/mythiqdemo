import React from 'react';
import { AlertTriangle, CheckCircle, Clock, Eye } from 'lucide-react';

export default function DataQualityMetrics() {
  const qualityIssues = [
    {
      type: 'Critical',
      title: 'Temperature Spike',
      description: 'CNC Machine #12 - Abnormal temperature increase detected',
      timestamp: '2 min ago',
      severity: 'critical',
      status: 'Critical'
    },
    {
      type: 'Warning',
      title: 'Data Latency',
      description: 'Vision System Zone B - Data transmission delayed',
      timestamp: '5 min ago',
      severity: 'warning',
      status: 'Dismiss'
    },
    {
      type: 'Potential',
      title: 'Connection Lost',
      description: 'Sensor Array Line 3 - Intermittent connectivity issues',
      timestamp: '8 min ago',
      severity: 'potential',
      status: 'Dismiss'
    }
  ];

  const anomalyDetection = {
    title: 'Anomaly Detection',
    status: 'View All',
    items: qualityIssues
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Data Quality Metrics</h3>
        <button className="text-teal-400 text-sm hover:text-teal-300">View Details</button>
      </div>

      {/* Anomaly Detection Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-white font-medium">{anomalyDetection.title}</h4>
          <button className="text-teal-400 text-sm hover:text-teal-300">{anomalyDetection.status}</button>
        </div>

        <div className="space-y-3">
          {qualityIssues.map((issue, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-l-4 ${
                issue.severity === 'critical'
                  ? 'bg-red-900/20 border-red-500'
                  : issue.severity === 'warning'
                  ? 'bg-amber-900/20 border-amber-500'
                  : 'bg-blue-900/20 border-blue-500'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    {issue.severity === 'critical' ? (
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                    ) : issue.severity === 'warning' ? (
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                    ) : (
                      <Clock className="w-4 h-4 text-blue-400" />
                    )}
                    <span className={`text-sm font-medium ${
                      issue.severity === 'critical' ? 'text-red-400' :
                      issue.severity === 'warning' ? 'text-amber-400' : 'text-blue-400'
                    }`}>
                      {issue.type}: {issue.title}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{issue.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-xs">{issue.timestamp}</span>
                    <button className={`text-xs px-2 py-1 rounded ${
                      issue.status === 'Critical'
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                    }`}>
                      {issue.status}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quality Score Breakdown */}
      <div className="space-y-4">
        <h4 className="text-white font-medium">Quality Score Breakdown</h4>
        
        {[
          { name: 'Completeness', score: 98, color: 'bg-green-500' },
          { name: 'Accuracy', score: 94, color: 'bg-teal-500' },
          { name: 'Consistency', score: 91, color: 'bg-blue-500' },
          { name: 'Timeliness', score: 89, color: 'bg-amber-500' }
        ].map((metric, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-300 text-sm">{metric.name}</span>
              <span className="text-white text-sm font-medium">{metric.score}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className={`${metric.color} h-2 rounded-full transition-all duration-500`}
                style={{ width: `${metric.score}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}