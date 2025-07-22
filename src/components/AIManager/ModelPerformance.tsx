import React from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { AIModel } from '../../types';

interface ModelPerformanceProps {
  models: AIModel[];
}

export default function ModelPerformance({ models }: ModelPerformanceProps) {
  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-700 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-semibold text-white">Best Performing</h3>
          </div>
          {models
            .sort((a, b) => b.accuracy - a.accuracy)
            .slice(0, 3)
            .map((model, index) => (
              <div key={model.id} className="flex items-center justify-between py-2">
                <span className="text-gray-300 text-sm">{model.name}</span>
                <span className="text-green-400 font-medium">{model.accuracy}%</span>
              </div>
            ))}
        </div>

        <div className="bg-gray-700 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-semibold text-white">Recently Active</h3>
          </div>
          {models
            .filter(model => model.status === 'training' || model.status === 'deployed')
            .slice(0, 3)
            .map((model, index) => (
              <div key={model.id} className="flex items-center justify-between py-2">
                <span className="text-gray-300 text-sm">{model.name}</span>
                <span className={`text-sm capitalize ${
                  model.status === 'deployed' ? 'text-green-400' : 'text-amber-400'
                }`}>
                  {model.status}
                </span>
              </div>
            ))}
        </div>

        <div className="bg-gray-700 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-semibold text-white">Model Types</h3>
          </div>
          {['vision', 'predictive', 'anomaly', 'optimization'].map((type) => {
            const count = models.filter(model => model.type === type).length;
            return (
              <div key={type} className="flex items-center justify-between py-2">
                <span className="text-gray-300 text-sm capitalize">{type}</span>
                <span className="text-blue-400 font-medium">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-gray-700 rounded-lg p-6">
        <h3 className="font-semibold text-white mb-6">Model Performance Metrics</h3>
        <div className="space-y-4">
          {models.map((model) => (
            <div key={model.id} className="flex items-center justify-between p-4 bg-gray-600 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                <div>
                  <div className="text-white font-medium">{model.name}</div>
                  <div className="text-gray-400 text-sm capitalize">{model.type} • {model.version}</div>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-white font-bold">{model.accuracy}%</div>
                  <div className="text-gray-400 text-xs">Accuracy</div>
                </div>
                <div className="text-center">
                  <div className={`font-bold ${
                    model.status === 'deployed' ? 'text-green-400' :
                    model.status === 'training' ? 'text-amber-400' : 'text-gray-400'
                  }`}>
                    {model.status === 'deployed' ? '24/7' :
                     model.status === 'training' ? 'Training' : 'Inactive'}
                  </div>
                  <div className="text-gray-400 text-xs">Status</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-bold">{model.lastTrained}</div>
                  <div className="text-gray-400 text-xs">Last Update</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}