import React, { useState } from 'react';
import { 
  Database, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw, 
  Download, 
  Filter, 
  Search,
  Plus,
  Eye,
  Settings,
  Calendar,
  BarChart3,
  Activity,
  Zap
} from 'lucide-react';
import DataVisualization from './DataVisualization';
import DataIngestionPipeline from './DataIngestionPipeline';
import DataQualityMetrics from './DataQualityMetrics';
import DataSources from './DataSources';

export default function DataManager() {
  const [activeView, setActiveView] = useState('overview');
  const [dateRange, setDateRange] = useState('24h');
  const [selectedMetric, setSelectedMetric] = useState('all');

  const dataStats = {
    totalSources: 42,
    qualityScore: 94.2,
    anomalies: 7,
    dataProcessed: 4.2
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Data Manager</h1>
          <p className="text-gray-400">Real-time data ingestion, transformation, and visualization</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add Source</span>
          </button>
        </div>
      </div>

      {/* Data Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{dataStats.totalSources}</div>
                <div className="text-sm text-gray-400">Total Data Sources</div>
              </div>
            </div>
            <div className="text-xs bg-blue-900 text-blue-300 px-2 py-1 rounded">
              Active
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">{dataStats.qualityScore}%</div>
                <div className="text-sm text-gray-400">Data Quality Score</div>
              </div>
            </div>
            <div className="text-xs bg-green-900 text-green-300 px-2 py-1 rounded">
              Target: 95% or higher
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-red-400">{dataStats.anomalies}</div>
                <div className="text-sm text-gray-400">Anomalies (24h)</div>
              </div>
            </div>
            <div className="text-xs bg-red-900 text-red-300 px-2 py-1 rounded">
              Critical
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">{dataStats.dataProcessed} TB</div>
                <div className="text-sm text-gray-400">Data Processed (24h)</div>
              </div>
            </div>
            <div className="text-xs bg-purple-900 text-purple-300 px-2 py-1 rounded">
              Yesterday: 3.8 TB
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="1h">Last 1 Hour</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4 text-gray-400" />
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="all">All Metrics</option>
                <option value="throughput">Data Throughput</option>
                <option value="quality">Quality Score</option>
                <option value="latency">Latency</option>
                <option value="errors">Error Rate</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveView('overview')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeView === 'overview'
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:text-white'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveView('pipeline')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeView === 'pipeline'
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:text-white'
              }`}
            >
              Pipeline
            </button>
            <button
              onClick={() => setActiveView('sources')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeView === 'sources'
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:text-white'
              }`}
            >
              Sources
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg text-sm flex items-center space-x-2 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {activeView === 'overview' && (
        <div className="space-y-8">
          <DataVisualization dateRange={dateRange} selectedMetric={selectedMetric} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <DataQualityMetrics />
            <DataIngestionPipeline />
          </div>
        </div>
      )}

      {activeView === 'pipeline' && (
        <div className="space-y-8">
          <DataIngestionPipeline expanded />
          <DataQualityMetrics />
        </div>
      )}

      {activeView === 'sources' && (
        <DataSources />
      )}
    </div>
  );
}