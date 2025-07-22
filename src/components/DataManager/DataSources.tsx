import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Settings, 
  MoreVertical, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  Database,
  Camera,
  Cpu,
  Radio,
  Server
} from 'lucide-react';

export default function DataSources() {
  const [searchTerm, setSearchTerm] = useState('');

  const dataSources = [
    {
      id: 1,
      name: 'CNC Machine #12',
      type: 'IoT Sensor',
      status: 'Active',
      dataQuality: 95,
      lastUpdate: 'Just now',
      actions: true
    },
    {
      id: 2,
      name: 'Vision System Zone B',
      type: 'Vision System',
      status: 'Degraded',
      dataQuality: 78,
      lastUpdate: '5 min ago',
      actions: true
    },
    {
      id: 3,
      name: 'Siemens PLC Line 3',
      type: 'Legacy System',
      status: 'Error',
      dataQuality: 45,
      lastUpdate: '45 min ago',
      actions: true
    },
    {
      id: 4,
      name: 'Pressure Sensors Assembly Line',
      type: 'IoT Sensor',
      status: 'Degraded',
      dataQuality: 82,
      lastUpdate: '2 min ago',
      actions: true
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'Degraded':
        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case 'Error':
        return <AlertTriangle className="w-4 h-4 text-red-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'IoT Sensor':
        return <Radio className="w-4 h-4 text-blue-400" />;
      case 'Vision System':
        return <Camera className="w-4 h-4 text-purple-400" />;
      case 'Legacy System':
        return <Server className="w-4 h-4 text-gray-400" />;
      default:
        return <Database className="w-4 h-4 text-teal-400" />;
    }
  };

  const getQualityColor = (quality: number) => {
    if (quality >= 90) return 'bg-green-500';
    if (quality >= 70) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const filteredSources = dataSources.filter(source =>
    source.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    source.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header and Search */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search sources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add Source</span>
          </button>
        </div>
      </div>

      {/* Data Sources Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Data Sources</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Data Quality
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Last Update
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredSources.map((source) => (
                <tr key={source.id} className="hover:bg-gray-750 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      {getTypeIcon(source.type)}
                      <span className="text-white font-medium">{source.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-300">{source.type}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(source.status)}
                      <span className={`text-sm ${
                        source.status === 'Active' ? 'text-green-400' :
                        source.status === 'Degraded' ? 'text-amber-400' : 'text-red-400'
                      }`}>
                        {source.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="w-16 bg-gray-600 rounded-full h-2">
                        <div
                          className={`${getQualityColor(source.dataQuality)} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${source.dataQuality}%` }}
                        ></div>
                      </div>
                      <span className="text-white text-sm font-medium">{source.dataQuality}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-300 text-sm">{source.lastUpdate}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors">
                        <Settings className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-700 flex items-center justify-between">
          <div className="text-sm text-gray-400">
            Showing {filteredSources.length} of {dataSources.length} sources
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors">
              Previous
            </button>
            <button className="px-3 py-1 bg-teal-600 text-white rounded">
              1
            </button>
            <button className="px-3 py-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors">
              2
            </button>
            <button className="px-3 py-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}