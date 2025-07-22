import React, { useState } from 'react';
import { Search, Filter, Plus, RefreshCw, Wifi, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { devices } from '../../data/mockData';
import DeviceCard from './DeviceCard';
import DeviceHealth from './DeviceHealth';

export default function DeviceManager() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || device.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const deviceStats = {
    total: devices.length,
    online: devices.filter(d => d.status === 'online').length,
    warning: devices.filter(d => d.status === 'warning').length,
    error: devices.filter(d => d.status === 'error').length,
    offline: devices.filter(d => d.status === 'offline').length,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Device Manager</h1>
          <p className="text-gray-400">EdgeOps console for unified device monitoring and management</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <RefreshCw className="w-4 h-4" />
            <span>Sync Devices</span>
          </button>
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add Device</span>
          </button>
        </div>
      </div>

      {/* Device Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Wifi className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{deviceStats.total}</div>
              <div className="text-sm text-gray-400">Total Devices</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">{deviceStats.online}</div>
              <div className="text-sm text-gray-400">Online</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-400">{deviceStats.warning}</div>
              <div className="text-sm text-gray-400">Warning</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-red-400">{deviceStats.error}</div>
              <div className="text-sm text-gray-400">Error</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-400">{deviceStats.offline}</div>
              <div className="text-sm text-gray-400">Offline</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Device List */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search and Filter */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search devices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-8 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="all">All Status</option>
                  <option value="online">Online</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
                  <option value="offline">Offline</option>
                </select>
              </div>
            </div>
          </div>

          {/* Device Cards */}
          <div className="space-y-4">
            {filteredDevices.map((device) => (
              <DeviceCard key={device.id} device={device} />
            ))}
          </div>
        </div>

        {/* Device Health Overview */}
        <div>
          <DeviceHealth devices={devices} />
        </div>
      </div>
    </div>
  );
}