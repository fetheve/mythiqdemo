import React, { useState } from 'react';
import { BarChart3, TrendingUp, Award, Target } from 'lucide-react';

export default function ComparativeAnalytics() {
  const [compareBy, setCompareBy] = useState('lines');

  const comparisonData = {
    lines: [
      { name: 'Line 1', oee: 81.2, availability: 88.5, performance: 75.2, quality: 98.1, rank: 1 },
      { name: 'Line 2', oee: 76.8, availability: 85.3, performance: 71.8, quality: 95.4, rank: 2 },
      { name: 'Line 3', oee: 68.4, availability: 82.1, performance: 60.2, quality: 92.8, rank: 4 },
      { name: 'Line 4', oee: 73.9, availability: 89.2, performance: 68.5, quality: 96.2, rank: 3 }
    ],
    shifts: [
      { name: 'Day Shift', oee: 78.2, availability: 87.1, performance: 72.5, quality: 96.8, rank: 1 },
      { name: 'Evening Shift', oee: 74.8, availability: 84.3, performance: 69.2, quality: 94.2, rank: 2 },
      { name: 'Night Shift', oee: 71.5, availability: 81.7, performance: 66.8, quality: 92.1, rank: 3 }
    ],
    facilities: [
      { name: 'Detroit Manufacturing', oee: 87.3, availability: 92.1, performance: 78.4, quality: 97.2, rank: 1 },
      { name: 'Austin Production', oee: 76.2, availability: 85.6, performance: 71.3, quality: 94.8, rank: 2 },
      { name: 'Phoenix Assembly', oee: 68.9, availability: 79.2, performance: 65.1, quality: 91.3, rank: 3 }
    ]
  };

  const currentData = comparisonData[compareBy as keyof typeof comparisonData];

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'text-yellow-400 bg-yellow-500/10';
      case 2: return 'text-gray-300 bg-gray-500/10';
      case 3: return 'text-amber-600 bg-amber-500/10';
      default: return 'text-gray-400 bg-gray-500/10';
    }
  };

  const getPerformanceColor = (value: number, threshold: number = 75) => {
    if (value >= threshold + 10) return 'text-green-400';
    if (value >= threshold) return 'text-amber-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-8">
      {/* Header and Controls */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Comparative Analytics</h3>
            <p className="text-gray-400">Performance comparison across different dimensions</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-400 text-sm">Compare by:</span>
            <select
              value={compareBy}
              onChange={(e) => setCompareBy(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="lines">Production Lines</option>
              <option value="shifts">Shifts</option>
              <option value="facilities">Facilities</option>
            </select>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Rankings Table */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <Award className="w-5 h-5 text-yellow-400" />
              <span>Performance Rankings</span>
            </h4>
            
            <div className="space-y-3">
              {currentData.map((item, index) => (
                <div key={index} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${getRankColor(item.rank)}`}>
                        #{item.rank}
                      </div>
                      <div>
                        <h5 className="text-white font-medium">{item.name}</h5>
                        <p className="text-gray-400 text-sm">Overall OEE: {item.oee}%</p>
                      </div>
                    </div>
                    <div className={`text-2xl font-bold ${getPerformanceColor(item.oee)}`}>
                      {item.oee}%
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center">
                      <div className={`text-sm font-medium ${getPerformanceColor(item.availability, 85)}`}>
                        {item.availability}%
                      </div>
                      <div className="text-xs text-gray-400">Availability</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-sm font-medium ${getPerformanceColor(item.performance, 70)}`}>
                        {item.performance}%
                      </div>
                      <div className="text-xs text-gray-400">Performance</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-sm font-medium ${getPerformanceColor(item.quality, 90)}`}>
                        {item.quality}%
                      </div>
                      <div className="text-xs text-gray-400">Quality</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Chart */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-teal-400" />
              <span>Performance Comparison</span>
            </h4>
            
            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="space-y-4">
                {currentData.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium text-sm">{item.name}</span>
                      <span className="text-gray-400 text-sm">{item.oee}%</span>
                    </div>
                    <div className="relative">
                      <div className="w-full bg-gray-600 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full transition-all duration-1000 ${
                            item.oee >= 80 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                            item.oee >= 70 ? 'bg-gradient-to-r from-amber-500 to-orange-500' :
                            'bg-gradient-to-r from-red-500 to-pink-500'
                          }`}
                          style={{ width: `${item.oee}%` }}
                        ></div>
                      </div>
                      {/* Target line */}
                      <div className="absolute top-0 left-3/4 w-0.5 h-3 bg-white opacity-60"></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-600">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>0%</span>
                  <span>Target: 75%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Comparison Table */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-semibold text-white">Detailed Performance Metrics</h4>
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
            Export Data
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-gray-400 font-medium py-3 px-4">Rank</th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">{compareBy.charAt(0).toUpperCase() + compareBy.slice(1, -1)}</th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">OEE</th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">Availability</th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">Performance</th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">Quality</th>
                <th className="text-left text-gray-400 font-medium py-3 px-4">Trend</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr key={index} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                  <td className="py-4 px-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${getRankColor(item.rank)}`}>
                      #{item.rank}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-white font-medium">{item.name}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`font-bold ${getPerformanceColor(item.oee)}`}>
                      {item.oee}%
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`font-medium ${getPerformanceColor(item.availability, 85)}`}>
                      {item.availability}%
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`font-medium ${getPerformanceColor(item.performance, 70)}`}>
                      {item.performance}%
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`font-medium ${getPerformanceColor(item.quality, 90)}`}>
                      {item.quality}%
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className={`w-4 h-4 ${
                        item.rank <= 2 ? 'text-green-400' : 'text-red-400'
                      }`} />
                      <span className={`text-sm font-medium ${
                        item.rank <= 2 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {item.rank <= 2 ? '+2.3%' : '-1.5%'}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
          <Target className="w-5 h-5 text-blue-400" />
          <span>Performance Insights</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <h5 className="text-green-400 font-medium mb-2">Top Performer</h5>
            <p className="text-white font-bold text-lg">{currentData[0].name}</p>
            <p className="text-gray-400 text-sm">Consistently exceeds targets with {currentData[0].oee}% OEE</p>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
            <h5 className="text-amber-400 font-medium mb-2">Needs Attention</h5>
            <p className="text-white font-bold text-lg">{currentData[currentData.length - 1].name}</p>
            <p className="text-gray-400 text-sm">Below target with {currentData[currentData.length - 1].oee}% OEE</p>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h5 className="text-blue-400 font-medium mb-2">Improvement Opportunity</h5>
            <p className="text-white font-bold text-lg">Performance Gap</p>
            <p className="text-gray-400 text-sm">
              {(currentData[0].oee - currentData[currentData.length - 1].oee).toFixed(1)}% difference between best and worst
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}