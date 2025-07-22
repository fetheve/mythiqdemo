import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  BarChart3,
  Calendar,
  Download,
  Filter,
  Info,
  Zap,
  Settings,
  Target,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';
import OEEHeroPanel from './OEEHeroPanel';
import OEETrends from './OEETrends';
import LossAnalysis from './LossAnalysis';
import EquipmentStatus from './EquipmentStatus';
import ProductionMetrics from './ProductionMetrics';
import AlertsPanel from './AlertsPanel';
import ComparativeAnalytics from './ComparativeAnalytics';
import MaintenanceInsights from './MaintenanceInsights';

export default function OEEAnalytics() {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('24h');
  const [selectedFacility, setSelectedFacility] = useState('all');

  const oeeData = {
    overall: 76.2,
    availability: 85.6,
    performance: 71.3,
    quality: 92.1,
    target: 85.0,
    industryAverage: 78.5
  };

  const facilities = [
    { id: 'all', name: 'All Facilities' },
    { id: 'detroit', name: 'Detroit Manufacturing' },
    { id: 'austin', name: 'Austin Production' },
    { id: 'phoenix', name: 'Phoenix Assembly' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">OEE Analytics</h1>
          <p className="text-gray-400">Overall Equipment Effectiveness monitoring and analysis</p>
        </div>
        <div className="flex space-x-3">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={selectedFacility}
              onChange={(e) => setSelectedFacility(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {facilities.map(facility => (
                <option key={facility.id} value={facility.id}>{facility.name}</option>
              ))}
            </select>
          </div>
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-800 rounded-xl border border-gray-700">
        <div className="flex border-b border-gray-700">
          {[
            { id: 'overview', name: 'Overview', icon: BarChart3 },
            { id: 'trends', name: 'Trends', icon: TrendingUp },
            { id: 'losses', name: 'Loss Analysis', icon: AlertTriangle },
            { id: 'comparative', name: 'Comparative', icon: Activity },
            { id: 'maintenance', name: 'Maintenance', icon: Settings },
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
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* OEE Hero Panel */}
              <OEEHeroPanel data={oeeData} />
              
              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Trends and Loss Analysis */}
                <div className="lg:col-span-2 space-y-8">
                  <OEETrends timeRange={timeRange} data={oeeData} />
                  <LossAnalysis />
                </div>
                
                {/* Right Sidebar */}
                <div className="space-y-8">
                  <EquipmentStatus />
                  <AlertsPanel />
                </div>
              </div>
              
              {/* Production Metrics */}
              <ProductionMetrics />
            </div>
          )}

          {activeTab === 'trends' && (
            <div className="space-y-8">
              <OEETrends timeRange={timeRange} data={oeeData} expanded />
              <ProductionMetrics />
            </div>
          )}

          {activeTab === 'losses' && (
            <div className="space-y-8">
              <LossAnalysis expanded />
            </div>
          )}

          {activeTab === 'comparative' && (
            <ComparativeAnalytics />
          )}

          {activeTab === 'maintenance' && (
            <MaintenanceInsights />
          )}
        </div>
      </div>
    </div>
  );
}