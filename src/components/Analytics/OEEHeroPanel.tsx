import React, { useState } from 'react';
import { Info, ArrowUp, ArrowDown, Minus, Target } from 'lucide-react';

interface OEEHeroPanelProps {
  data: {
    overall: number;
    availability: number;
    performance: number;
    quality: number;
    target: number;
    industryAverage: number;
  };
}

export default function OEEHeroPanel({ data }: OEEHeroPanelProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const getMetricTrend = (value: number, benchmark: number = 80) => {
    if (value > benchmark + 2) return { icon: ArrowUp, color: 'text-green-400', bg: 'bg-green-500/10' };
    if (value < benchmark - 2) return { icon: ArrowDown, color: 'text-red-400', bg: 'bg-red-500/10' };
    return { icon: Minus, color: 'text-amber-400', bg: 'bg-amber-500/10' };
  };

  const availabilityTrend = getMetricTrend(data.availability, 85);
  const performanceTrend = getMetricTrend(data.performance, 75);
  const qualityTrend = getMetricTrend(data.quality, 90);

  const circumference = 2 * Math.PI * 120;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (data.overall / 100) * circumference;

  return (
    <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-blue-500/20"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Overall Equipment Effectiveness</h2>
            <p className="text-gray-400">Real-time OEE performance across all facilities</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-gray-400">Target</div>
              <div className="text-lg font-bold text-teal-400">{data.target}%</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">Industry Avg</div>
              <div className="text-lg font-bold text-blue-400">{data.industryAverage}%</div>
            </div>
          </div>
        </div>

        {/* Main OEE Display */}
        <div className="flex items-center justify-center mb-12">
          <div className="relative">
            {/* Circular Progress Ring */}
            <svg className="w-64 h-64 transform -rotate-90" viewBox="0 0 256 256">
              {/* Background Circle */}
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-gray-700"
              />
              {/* Progress Circle */}
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="url(#oeeGradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-1000 ease-out"
              />
              {/* Gradient Definition */}
              <defs>
                <linearGradient id="oeeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#14b8a6" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Center Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl font-bold text-white mb-2">{data.overall}%</div>
                <div className="text-lg text-gray-400 font-medium">OEE Score</div>
                <div className={`inline-flex items-center space-x-1 mt-2 px-2 py-1 rounded-full text-xs ${
                  data.overall >= data.target ? 'bg-green-500/10 text-green-400' : 'bg-amber-500/10 text-amber-400'
                }`}>
                  <Target className="w-3 h-3" />
                  <span>{data.overall >= data.target ? 'Above Target' : 'Below Target'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-metrics with Arrows */}
        <div className="relative">
          {/* Connecting Arrows - positioned to flow from center bottom of each card upward to the circle */}
          <div className="absolute -top-16 inset-x-0 flex justify-center pointer-events-none z-20">
            <svg className="w-full h-16" viewBox="0 0 100 64">
              {/* Left Arrow - from left card center upward to circle */}
              <defs>
                <filter id="glowLeft" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <linearGradient id="arrowGradientLeft" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.8"/>
                  <stop offset="100%" stopColor="#06d6a0" stopOpacity="1"/>
                </linearGradient>
              </defs>
              <line
                x1="16.67"
                y1="64"
                x2="16.67"
                y2="8"
                stroke="url(#arrowGradientLeft)"
                strokeWidth="3"
                filter="url(#glowLeft)"
                className="opacity-80"
              />
              <polygon
                points="14,12 16.67,4 19.34,12"
                fill="url(#arrowGradientLeft)"
                filter="url(#glowLeft)"
                className="opacity-80"
              />
              
              {/* Center Arrow - straight vertical from center card upward */}
              <defs>
                <filter id="glowCenter" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <linearGradient id="arrowGradientCenter" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.8"/>
                  <stop offset="100%" stopColor="#06d6a0" stopOpacity="1"/>
                </linearGradient>
              </defs>
              <line
                x1="50"
                y1="64"
                x2="50"
                y2="8"
                stroke="url(#arrowGradientCenter)"
                strokeWidth="3"
                filter="url(#glowCenter)"
                className="opacity-80"
              />
              <polygon
                points="47,12 50,4 53,12"
                fill="url(#arrowGradientCenter)"
                filter="url(#glowCenter)"
                className="opacity-80"
              />
              
              {/* Right Arrow - from right card center upward */}
              <defs>
                <filter id="glowRight" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <linearGradient id="arrowGradientRight" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.8"/>
                  <stop offset="100%" stopColor="#06d6a0" stopOpacity="1"/>
                </linearGradient>
              </defs>
              <line
                x1="83.33"
                y1="64"
                x2="83.33"
                y2="8"
                stroke="url(#arrowGradientRight)"
                strokeWidth="3"
                filter="url(#glowRight)"
                className="opacity-80"
              />
              <polygon
                points="80.66,12 83.33,4 86,12"
                fill="url(#arrowGradientRight)"
                filter="url(#glowRight)"
                className="opacity-80"
              />
            </svg>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-3 gap-8 pt-16 relative">

            {/* Availability */}
            <div className="bg-gray-700/50 rounded-xl p-6 border-2 border-teal-500/30 hover:border-teal-500/50 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Availability</h3>
                <div className={`p-2 rounded-lg ${availabilityTrend.bg}`}>
                  <availabilityTrend.icon className={`w-4 h-4 ${availabilityTrend.color}`} />
                </div>
              </div>
              <div className="text-3xl font-bold text-teal-400 mb-2">{data.availability}%</div>
              <div className="text-sm text-gray-400">Equipment uptime and availability</div>
              <div className="mt-4 w-full bg-gray-600 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-teal-500 to-teal-400 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${data.availability}%` }}
                ></div>
              </div>
            </div>

            {/* Performance */}
            <div className="bg-gray-700/50 rounded-xl p-6 border-2 border-teal-500/30 hover:border-teal-500/50 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Performance</h3>
                <div className={`p-2 rounded-lg ${performanceTrend.bg}`}>
                  <performanceTrend.icon className={`w-4 h-4 ${performanceTrend.color}`} />
                </div>
              </div>
              <div className="text-3xl font-bold text-teal-400 mb-2">{data.performance}%</div>
              <div className="text-sm text-gray-400">Speed and efficiency metrics</div>
              <div className="mt-4 w-full bg-gray-600 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-teal-500 to-teal-400 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${data.performance}%` }}
                ></div>
              </div>
            </div>

            {/* Quality */}
            <div className="bg-gray-700/50 rounded-xl p-6 border-2 border-teal-500/30 hover:border-teal-500/50 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Quality</h3>
                <div className={`p-2 rounded-lg ${qualityTrend.bg}`}>
                  <qualityTrend.icon className={`w-4 h-4 ${qualityTrend.color}`} />
                </div>
              </div>
              <div className="text-3xl font-bold text-teal-400 mb-2">{data.quality}%</div>
              <div className="text-sm text-gray-400">Product quality and yield</div>
              <div className="mt-4 w-full bg-gray-600 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-teal-500 to-teal-400 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${data.quality}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Formula Tooltip */}
        <div className="flex items-center justify-center mt-8">
          <div 
            className="relative"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
              <Info className="w-4 h-4" />
              <span className="text-sm">How is OEE calculated?</span>
            </button>
            
            {showTooltip && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-900 border border-gray-600 rounded-lg p-4 text-sm text-white whitespace-nowrap z-10">
                <div className="font-medium mb-2">OEE = Availability × Performance × Quality</div>
                <div className="text-gray-400">
                  {data.availability}% × {data.performance}% × {data.quality}% = {data.overall}%
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}