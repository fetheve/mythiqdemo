import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity, Zap } from 'lucide-react';

interface DataVisualizationProps {
  dateRange: string;
  selectedMetric: string;
}

export default function DataVisualization({ dateRange, selectedMetric }: DataVisualizationProps) {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // Generate sample data based on date range
  const generateData = () => {
    const points = dateRange === '1h' ? 12 : dateRange === '24h' ? 24 : dateRange === '7d' ? 7 : 30;
    return Array.from({ length: points }, (_, i) => ({
      time: i,
      throughput: 80 + Math.random() * 40,
      quality: 90 + Math.random() * 10,
      latency: 50 + Math.random() * 100,
      errors: Math.random() * 5
    }));
  };

  const [data] = useState(generateData());

  const metrics = [
    { 
      key: 'throughput', 
      name: 'Data Throughput', 
      color: 'text-teal-400', 
      bgColor: 'bg-teal-600',
      unit: 'MB/s',
      icon: Activity
    },
    { 
      key: 'quality', 
      name: 'Quality Score', 
      color: 'text-green-400', 
      bgColor: 'bg-green-600',
      unit: '%',
      icon: TrendingUp
    },
    { 
      key: 'latency', 
      name: 'Latency', 
      color: 'text-blue-400', 
      bgColor: 'bg-blue-600',
      unit: 'ms',
      icon: Zap
    },
    { 
      key: 'errors', 
      name: 'Error Rate', 
      color: 'text-red-400', 
      bgColor: 'bg-red-600',
      unit: '%',
      icon: TrendingDown
    }
  ];

  const getDisplayMetrics = () => {
    if (selectedMetric === 'all') return metrics;
    return metrics.filter(m => m.key === selectedMetric);
  };

  const displayMetrics = getDisplayMetrics();

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Real-time Data Visualization</h3>
        <div className="flex items-center space-x-4">
          {displayMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.key} className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${metric.bgColor}`}></div>
                <span className={`text-sm ${metric.color}`}>{metric.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chart Area */}
      <div className="relative h-80 bg-gray-900 rounded-lg p-4 overflow-hidden">
        {/* Grid Lines */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="absolute w-full border-t border-gray-600"
              style={{ top: `${(i * 100) / 5}%` }}
            />
          ))}
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="absolute h-full border-l border-gray-600"
              style={{ left: `${(i * 100) / 7}%` }}
            />
          ))}
        </div>

        {/* Chart Lines */}
        <svg className="absolute inset-0 w-full h-full">
          {displayMetrics.map((metric, metricIndex) => {
            const points = data.map((point, i) => {
              const x = (i / (data.length - 1)) * 100;
              const value = point[metric.key as keyof typeof point] as number;
              const maxValue = metric.key === 'quality' ? 100 : metric.key === 'latency' ? 150 : metric.key === 'errors' ? 5 : 120;
              const y = 100 - (value / maxValue) * 100;
              return `${x},${y}`;
            }).join(' ');

            return (
              <g key={metric.key}>
                {/* Line */}
                <polyline
                  points={points}
                  fill="none"
                  stroke={metric.bgColor.replace('bg-', '#')}
                  strokeWidth="2"
                  className="opacity-80"
                  style={{
                    stroke: metric.key === 'teal' ? '#14b8a6' :
                           metric.key === 'green' ? '#22c55e' :
                           metric.key === 'blue' ? '#3b82f6' : '#ef4444'
                  }}
                />
                
                {/* Data Points */}
                {data.map((point, i) => {
                  const x = (i / (data.length - 1)) * 100;
                  const value = point[metric.key as keyof typeof point] as number;
                  const maxValue = metric.key === 'quality' ? 100 : metric.key === 'latency' ? 150 : metric.key === 'errors' ? 5 : 120;
                  const y = 100 - (value / maxValue) * 100;
                  
                  return (
                    <circle
                      key={i}
                      cx={`${x}%`}
                      cy={`${y}%`}
                      r="4"
                      className={`${metric.bgColor.replace('bg-', 'fill-')} cursor-pointer hover:r-6 transition-all`}
                      onMouseEnter={() => setHoveredPoint(i)}
                      onMouseLeave={() => setHoveredPoint(null)}
                      style={{
                        fill: metric.key === 'throughput' ? '#14b8a6' :
                              metric.key === 'quality' ? '#22c55e' :
                              metric.key === 'latency' ? '#3b82f6' : '#ef4444'
                      }}
                    />
                  );
                })}
              </g>
            );
          })}
        </svg>

        {/* Tooltip */}
        {hoveredPoint !== null && (
          <div className="absolute bg-gray-700 border border-gray-600 rounded-lg p-3 pointer-events-none z-10"
               style={{ 
                 left: `${(hoveredPoint / (data.length - 1)) * 100}%`,
                 top: '10px',
                 transform: 'translateX(-50%)'
               }}>
            <div className="text-white text-sm font-medium mb-2">
              {dateRange === '1h' ? `${hoveredPoint * 5} min ago` :
               dateRange === '24h' ? `${hoveredPoint} hours ago` :
               dateRange === '7d' ? `${hoveredPoint + 1} days ago` :
               `${hoveredPoint + 1} days ago`}
            </div>
            {displayMetrics.map((metric) => (
              <div key={metric.key} className="flex items-center justify-between space-x-3">
                <span className={`text-xs ${metric.color}`}>{metric.name}:</span>
                <span className="text-white text-xs font-medium">
                  {(data[hoveredPoint][metric.key as keyof typeof data[0]] as number).toFixed(1)}{metric.unit}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400 -ml-8">
          {Array.from({ length: 6 }, (_, i) => (
            <span key={i}>{100 - (i * 20)}</span>
          ))}
        </div>

        {/* X-axis labels */}
        <div className="absolute bottom-0 left-0 w-full flex justify-between text-xs text-gray-400 -mb-6">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i}>
              {dateRange === '1h' ? `${i * 15}m` :
               dateRange === '24h' ? `${i * 6}h` :
               dateRange === '7d' ? `${i * 2}d` :
               `${i * 8}d`}
            </span>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {displayMetrics.map((metric) => {
          const values = data.map(d => d[metric.key as keyof typeof d] as number);
          const avg = values.reduce((a, b) => a + b, 0) / values.length;
          const trend = values[values.length - 1] - values[0];
          const Icon = metric.icon;
          
          return (
            <div key={metric.key} className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon className={`w-4 h-4 ${metric.color}`} />
                <span className="text-gray-300 text-sm">{metric.name}</span>
              </div>
              <div className="text-white text-lg font-bold">
                {avg.toFixed(1)}{metric.unit}
              </div>
              <div className={`text-xs flex items-center space-x-1 ${
                trend > 0 ? 'text-green-400' : trend < 0 ? 'text-red-400' : 'text-gray-400'
              }`}>
                {trend > 0 ? <TrendingUp className="w-3 h-3" /> : 
                 trend < 0 ? <TrendingDown className="w-3 h-3" /> : null}
                <span>{Math.abs(trend).toFixed(1)}{metric.unit}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}