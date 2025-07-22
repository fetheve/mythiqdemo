import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Target, BarChart3 } from 'lucide-react';

interface OEETrendsProps {
  timeRange: string;
  data: {
    overall: number;
    target: number;
    industryAverage: number;
  };
  expanded?: boolean;
}

export default function OEETrends({ timeRange, data, expanded = false }: OEETrendsProps) {
  const [selectedMetric, setSelectedMetric] = useState('oee');

  // Generate sample trend data based on time range
  const generateTrendData = () => {
    const points = timeRange === '24h' ? 24 : timeRange === '7d' ? 7 : 30;
    return Array.from({ length: points }, (_, i) => ({
      time: i,
      oee: 70 + Math.random() * 20,
      availability: 80 + Math.random() * 15,
      performance: 65 + Math.random() * 25,
      quality: 85 + Math.random() * 15,
      target: data.target,
      industry: data.industryAverage
    }));
  };

  const trendData = generateTrendData();
  const currentValue = trendData[trendData.length - 1]?.[selectedMetric as keyof typeof trendData[0]] || 0;
  const previousValue = trendData[trendData.length - 2]?.[selectedMetric as keyof typeof trendData[0]] || 0;
  const trend = currentValue - previousValue;

  const metrics = [
    { key: 'oee', name: 'OEE', color: '#14b8a6', unit: '%' },
    { key: 'availability', name: 'Availability', color: '#3b82f6', unit: '%' },
    { key: 'performance', name: 'Performance', color: '#8b5cf6', unit: '%' },
    { key: 'quality', name: 'Quality', color: '#10b981', unit: '%' }
  ];

  const getTimeLabel = (index: number) => {
    if (timeRange === '24h') return `${index}:00`;
    if (timeRange === '7d') return `Day ${index + 1}`;
    return `Week ${index + 1}`;
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">OEE Trends</h3>
          <p className="text-gray-400">Performance trends over time with benchmarks</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            {metrics.map(metric => (
              <option key={metric.key} value={metric.key}>{metric.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Trend Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-700/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <BarChart3 className="w-4 h-4 text-teal-400" />
            <span className="text-sm text-gray-400">Current</span>
          </div>
          <div className="text-2xl font-bold text-white">{currentValue.toFixed(1)}%</div>
        </div>
        
        <div className="bg-gray-700/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            {trend >= 0 ? (
              <TrendingUp className="w-4 h-4 text-green-400" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-400" />
            )}
            <span className="text-sm text-gray-400">Trend</span>
          </div>
          <div className={`text-2xl font-bold ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {trend >= 0 ? '+' : ''}{trend.toFixed(1)}%
          </div>
        </div>
        
        <div className="bg-gray-700/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-gray-400">Target</span>
          </div>
          <div className="text-2xl font-bold text-amber-400">{data.target}%</div>
        </div>
        
        <div className="bg-gray-700/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <BarChart3 className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-400">Industry</span>
          </div>
          <div className="text-2xl font-bold text-blue-400">{data.industryAverage}%</div>
        </div>
      </div>

      {/* Chart Area */}
      <div className="relative h-80 bg-gray-900 rounded-lg p-4">
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
          {/* Target Line */}
          <line
            x1="0%"
            y1={`${100 - data.target}%`}
            x2="100%"
            y2={`${100 - data.target}%`}
            stroke="#f59e0b"
            strokeWidth="2"
            strokeDasharray="5,5"
            className="opacity-60"
          />
          
          {/* Industry Average Line */}
          <line
            x1="0%"
            y1={`${100 - data.industryAverage}%`}
            x2="100%"
            y2={`${100 - data.industryAverage}%`}
            stroke="#3b82f6"
            strokeWidth="2"
            strokeDasharray="3,3"
            className="opacity-60"
          />

          {/* Main Trend Line */}
          <polyline
            points={trendData.map((point, i) => {
              const x = (i / (trendData.length - 1)) * 100;
              const value = point[selectedMetric as keyof typeof point] as number;
              const y = 100 - value;
              return `${x},${y}`;
            }).join(' ')}
            fill="none"
            stroke={metrics.find(m => m.key === selectedMetric)?.color || '#14b8a6'}
            strokeWidth="3"
            className="opacity-80"
          />
          
          {/* Data Points */}
          {trendData.map((point, i) => {
            const x = (i / (trendData.length - 1)) * 100;
            const value = point[selectedMetric as keyof typeof point] as number;
            const y = 100 - value;
            
            return (
              <circle
                key={i}
                cx={`${x}%`}
                cy={`${y}%`}
                r="4"
                fill={metrics.find(m => m.key === selectedMetric)?.color || '#14b8a6'}
                className="cursor-pointer hover:r-6 transition-all"
              />
            );
          })}
        </svg>

        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400 -ml-8">
          {Array.from({ length: 6 }, (_, i) => (
            <span key={i}>{100 - (i * 20)}%</span>
          ))}
        </div>

        {/* X-axis labels */}
        <div className="absolute bottom-0 left-0 w-full flex justify-between text-xs text-gray-400 -mb-6">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i}>{getTimeLabel(Math.floor(i * (trendData.length - 1) / 4))}</span>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 mt-6">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-teal-400"></div>
          <span className="text-sm text-gray-400">Current Metric</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-0.5 bg-amber-400"></div>
          <span className="text-sm text-gray-400">Target ({data.target}%)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-0.5 bg-blue-400"></div>
          <span className="text-sm text-gray-400">Industry Avg ({data.industryAverage}%)</span>
        </div>
      </div>

      {expanded && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Shift Breakdown */}
          <div className="bg-gray-700/50 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-white mb-4">Shift Performance</h4>
            <div className="space-y-3">
              {[
                { shift: 'Day Shift', oee: 78.2, color: 'bg-green-500' },
                { shift: 'Evening Shift', oee: 74.8, color: 'bg-amber-500' },
                { shift: 'Night Shift', oee: 71.5, color: 'bg-red-500' }
              ].map((shift, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-300">{shift.shift}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-20 bg-gray-600 rounded-full h-2">
                      <div 
                        className={`${shift.color} h-2 rounded-full`}
                        style={{ width: `${shift.oee}%` }}
                      ></div>
                    </div>
                    <span className="text-white font-medium w-12">{shift.oee}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Summary */}
          <div className="bg-gray-700/50 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-white mb-4">Weekly Summary</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Best Day</span>
                <span className="text-green-400 font-medium">Tuesday (82.1%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Worst Day</span>
                <span className="text-red-400 font-medium">Friday (68.3%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Average</span>
                <span className="text-white font-medium">76.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Improvement</span>
                <span className="text-teal-400 font-medium">+2.3% vs last week</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}