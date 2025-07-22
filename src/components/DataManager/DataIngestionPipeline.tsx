import React from 'react';
import { Database, ArrowRight, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

interface DataIngestionPipelineProps {
  expanded?: boolean;
}

export default function DataIngestionPipeline({ expanded = false }: DataIngestionPipelineProps) {
  const pipelineStages = [
    {
      name: 'Sources',
      items: ['Sensors', 'Machines', 'Vision Systems', 'ERP/MES', 'Legacy Systems'],
      color: 'bg-blue-600',
      status: 'active'
    },
    {
      name: 'Data Ingestion',
      items: ['MQTT', 'OPC-UA', 'REST APIs', 'File Upload'],
      color: 'bg-teal-600',
      status: 'active'
    },
    {
      name: 'Data Processing',
      items: ['Validation', 'Transformation', 'Enrichment', 'Aggregation'],
      color: 'bg-green-600',
      status: 'active'
    },
    {
      name: 'Storage',
      items: ['Time Series DB', 'Data Lake', 'Cache Layer'],
      color: 'bg-purple-600',
      status: 'active'
    },
    {
      name: 'Analytics',
      items: ['Real-time Analytics', 'ML Models', 'Anomaly Detection'],
      color: 'bg-amber-600',
      status: 'warning'
    }
  ];

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Data Ingestion Pipeline</h3>
        <button className="text-teal-400 text-sm hover:text-teal-300">+ Add Source</button>
      </div>

      {/* Pipeline Flow */}
      <div className="relative">
        <div className="flex items-center justify-between space-x-4 overflow-x-auto pb-4">
          {pipelineStages.map((stage, index) => (
            <div key={stage.name} className="flex items-center space-x-4 min-w-0">
              {/* Stage */}
              <div className="flex-shrink-0">
                <div className={`${stage.color} rounded-lg p-4 min-w-[140px]`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium text-sm">{stage.name}</h4>
                    {stage.status === 'active' ? (
                      <CheckCircle className="w-4 h-4 text-white" />
                    ) : stage.status === 'warning' ? (
                      <AlertTriangle className="w-4 h-4 text-white" />
                    ) : (
                      <Clock className="w-4 h-4 text-white" />
                    )}
                  </div>
                  {expanded && (
                    <div className="space-y-1">
                      {stage.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="text-xs text-white opacity-80">
                          • {item}
                        </div>
                      ))}
                    </div>
                  )}
                  {!expanded && (
                    <div className="text-xs text-white opacity-80">
                      {stage.items.length} components
                    </div>
                  )}
                </div>
              </div>

              {/* Arrow */}
              {index < pipelineStages.length - 1 && (
                <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Pipeline Stats */}
      {expanded && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-gray-400 text-sm">Throughput</div>
            <div className="text-white text-xl font-bold">4.2 TB/day</div>
            <div className="text-green-400 text-xs">↑ 12% from yesterday</div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-gray-400 text-sm">Processing Latency</div>
            <div className="text-white text-xl font-bold">1.3s</div>
            <div className="text-green-400 text-xs">↓ 0.2s from average</div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="text-gray-400 text-sm">Error Rate</div>
            <div className="text-white text-xl font-bold">0.02%</div>
            <div className="text-red-400 text-xs">↑ 0.01% from yesterday</div>
          </div>
        </div>
      )}
    </div>
  );
}