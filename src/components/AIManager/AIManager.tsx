import React, { useState } from 'react';
import { Brain, Play, Pause, RotateCcw, TrendingUp, Cpu, Eye, Zap, Settings } from 'lucide-react';
import { aiModels } from '../../data/mockData';
import AIModelCard from './AIModelCard';
import ModelPerformance from './ModelPerformance';
import ModelManagement from './ModelManagement';

export default function AIManager() {
  const [activeTab, setActiveTab] = useState('models');

  const deployedModels = aiModels.filter(model => model.status === 'deployed').length;
  const trainingModels = aiModels.filter(model => model.status === 'training').length;
  const averageAccuracy = aiModels.reduce((sum, model) => sum + model.accuracy, 0) / aiModels.length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">AI Manager</h1>
        <p className="text-gray-400">Model training, optimization, and deployment management</p>
      </div>

      {/* AI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-brain-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{aiModels.length}</div>
              <div className="text-sm text-gray-400">Total Models</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <Play className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">{deployedModels}</div>
              <div className="text-sm text-gray-400">Deployed</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center">
              <RotateCcw className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-400">{trainingModels}</div>
              <div className="text-sm text-gray-400">Training</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-teal-400">{averageAccuracy.toFixed(1)}%</div>
              <div className="text-sm text-gray-400">Avg Accuracy</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gray-800 rounded-xl border border-gray-700">
        <div className="flex border-b border-gray-700">
          {[
            { id: 'models', name: 'AI Models', icon: Brain },
            { id: 'management', name: 'Model Management', icon: Settings },
            { id: 'marketplace', name: 'Marketplace', icon: Zap },
            { id: 'performance', name: 'Performance', icon: TrendingUp },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-teal-400 border-b-2 border-teal-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        <div className="p-6">
          {activeTab === 'models' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {aiModels.map((model) => (
                <AIModelCard key={model.id} model={model} />
              ))}
            </div>
          )}

          {activeTab === 'management' && <ModelManagement />}

          {activeTab === 'marketplace' && (
            <div className="space-y-6">
              <div className="text-center py-12">
                <Zap className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">AI Marketplace</h3>
                <p className="text-gray-400 mb-6">Browse and deploy pre-trained AI models</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  {[
                    { name: 'Advanced Vision Pack', type: 'Vision Models', icon: Eye, models: 5 },
                    { name: 'Predictive Maintenance Suite', type: 'Predictive Models', icon: Cpu, models: 3 },
                    { name: 'Quality Control AI', type: 'Classification Models', icon: Brain, models: 7 },
                  ].map((pack, index) => {
                    const Icon = pack.icon;
                    return (
                      <div key={index} className="bg-gray-700 rounded-lg p-6 text-center hover:bg-gray-650 transition-colors cursor-pointer">
                        <Icon className="w-12 h-12 text-teal-400 mx-auto mb-3" />
                        <h4 className="font-semibold text-white mb-2">{pack.name}</h4>
                        <p className="text-gray-400 text-sm mb-3">{pack.type}</p>
                        <div className="text-teal-400 text-sm font-medium">{pack.models} Models</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'performance' && (
            <ModelPerformance models={aiModels} />
          )}
        </div>
      </div>
    </div>
  );
}