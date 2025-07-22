import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Bot, 
  Eye, 
  Settings, 
  Play, 
  Pause, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  X,
  ExternalLink,
  Activity,
  Zap,
  Target,
  BarChart3,
  Database,
  Camera,
  Cpu,
  Wrench,
  Package,
  Users
} from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  description: string;
  valueProp: string;
  status: 'Running' | 'Paused' | 'In Dev';
  category: 'Quality' | 'Maintenance' | 'Planning';
  icon: React.ComponentType<any>;
  kpis: {
    primary: { label: string; value: string; trend?: string };
    secondary: { label: string; value: string; trend?: string };
    tertiary: { label: string; value: string; trend?: string };
  };
  connectedSystems: string[];
  lastActivity: string;
  uptime: string;
  tasksCompleted: number;
}

const agents: Agent[] = [
  {
    id: '1',
    name: 'Defect-to-ERP Agent',
    description: 'Automatically detects product defects using computer vision and updates ERP systems in real-time',
    valueProp: 'Reduces manual quality inspection time by 85% while maintaining 97% accuracy',
    status: 'Running',
    category: 'Quality',
    icon: Eye,
    kpis: {
      primary: { label: 'Defect Capture Accuracy', value: '97%', trend: '+2.1%' },
      secondary: { label: 'Batches Quarantined', value: '3,024', trend: '+156' },
      tertiary: { label: 'False Positives', value: '0.8%', trend: '-0.3%' }
    },
    connectedSystems: ['Keyence CV-X450F Camera', 'SAP ERP System', 'Quality Database', 'Alert System'],
    lastActivity: '2 minutes ago',
    uptime: '99.7%',
    tasksCompleted: 15847
  },
  {
    id: '2',
    name: 'Predictive Downtime Agent',
    description: 'Analyzes machine sensor data to predict equipment failures before they occur',
    valueProp: 'Prevents unplanned downtime by predicting failures 4-6 hours in advance',
    status: 'Running',
    category: 'Maintenance',
    icon: Wrench,
    kpis: {
      primary: { label: 'Failures Predicted', value: '12', trend: '+3' },
      secondary: { label: 'Downtime Avoided', value: '38 hrs', trend: '+12 hrs' },
      tertiary: { label: 'Prediction Accuracy', value: '94.2%', trend: '+1.8%' }
    },
    connectedSystems: ['Vibration Sensors', 'Temperature Monitors', 'SCADA System', 'Maintenance CMMS'],
    lastActivity: '5 minutes ago',
    uptime: '98.9%',
    tasksCompleted: 2847
  },
  {
    id: '3',
    name: 'JobStream Task Planner Agent',
    description: 'Optimizes task assignment and resource allocation across production lines in real-time',
    valueProp: 'Increases resource utilization by 18% through intelligent task scheduling',
    status: 'Running',
    category: 'Planning',
    icon: Users,
    kpis: {
      primary: { label: 'Tasks Assigned', value: '4,221', trend: '+287' },
      secondary: { label: 'Resource Utilization', value: '18%', trend: '+3.2%' },
      tertiary: { label: 'Schedule Efficiency', value: '92.4%', trend: '+5.1%' }
    },
    connectedSystems: ['MES System', 'Workforce Management', 'Production Scheduler', 'ERP Integration'],
    lastActivity: '1 minute ago',
    uptime: '99.1%',
    tasksCompleted: 8934
  }
];

export default function MyAgents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const categories = ['All', 'Quality', 'Maintenance', 'Planning'];

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || agent.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'Running':
        return { 
          color: 'text-green-400', 
          bg: 'bg-green-500/10', 
          border: 'border-green-500/20',
          icon: Play
        };
      case 'Paused':
        return { 
          color: 'text-amber-400', 
          bg: 'bg-amber-500/10', 
          border: 'border-amber-500/20',
          icon: Pause
        };
      case 'In Dev':
        return { 
          color: 'text-blue-400', 
          bg: 'bg-blue-500/10', 
          border: 'border-blue-500/20',
          icon: Settings
        };
      default:
        return { 
          color: 'text-gray-400', 
          bg: 'bg-gray-500/10', 
          border: 'border-gray-500/20',
          icon: Clock
        };
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Quality':
        return 'text-purple-400 bg-purple-500/10';
      case 'Maintenance':
        return 'text-orange-400 bg-orange-500/10';
      case 'Planning':
        return 'text-cyan-400 bg-cyan-500/10';
      default:
        return 'text-gray-400 bg-gray-500/10';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">My AI Agents</h3>
          <p className="text-gray-400">Active agents delivering measurable impact across your operations</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 font-medium">{agents.filter(a => a.status === 'Running').length} Active</span>
          </div>
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Bot className="w-4 h-4" />
            <span>Deploy New Agent</span>
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search agents by name or functionality..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <div className="flex space-x-1 bg-gray-700 rounded-lg p-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-teal-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Agent Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => {
          const statusConfig = getStatusConfig(agent.status);
          const StatusIcon = statusConfig.icon;
          const AgentIcon = agent.icon;
          
          return (
            <div
              key={agent.id}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-teal-500/30 transition-all duration-300 group cursor-pointer hover:shadow-lg hover:shadow-teal-500/10 hover:transform hover:scale-[1.02]"
              onClick={() => setSelectedAgent(agent)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <AgentIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white group-hover:text-teal-400 transition-colors">
                      {agent.name}
                    </h4>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(agent.category)}`}>
                        {agent.category}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${statusConfig.bg} ${statusConfig.border} border`}>
                  <StatusIcon className={`w-3 h-3 ${statusConfig.color}`} />
                  <span className={`text-xs font-medium ${statusConfig.color}`}>{agent.status}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">{agent.description}</p>

              {/* Value Proposition */}
              <div className="bg-teal-500/10 border border-teal-500/20 rounded-lg p-3 mb-4">
                <p className="text-teal-300 text-sm font-medium">{agent.valueProp}</p>
              </div>

              {/* KPIs */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">{agent.kpis.primary.label}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-bold">{agent.kpis.primary.value}</span>
                    {agent.kpis.primary.trend && (
                      <span className="text-green-400 text-xs">↗ {agent.kpis.primary.trend}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">{agent.kpis.secondary.label}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-bold">{agent.kpis.secondary.value}</span>
                    {agent.kpis.secondary.trend && (
                      <span className="text-green-400 text-xs">↗ {agent.kpis.secondary.trend}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">{agent.kpis.tertiary.label}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-bold">{agent.kpis.tertiary.value}</span>
                    {agent.kpis.tertiary.trend && (
                      <span className="text-green-400 text-xs">↗ {agent.kpis.tertiary.trend}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Activity className="w-4 h-4" />
                  <span>Last active: {agent.lastActivity}</span>
                </div>
                <button className="text-teal-400 hover:text-teal-300 text-sm font-medium flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>View Details</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Agent Details Modal */}
      {selectedAgent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl border border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <selectedAgent.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedAgent.name}</h2>
                  <p className="text-gray-400">{selectedAgent.description}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedAgent(null)}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-8">
              {/* Status and Performance */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-700/50 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-white font-medium">Status</span>
                  </div>
                  <div className="text-2xl font-bold text-green-400">{selectedAgent.status}</div>
                  <div className="text-sm text-gray-400">Uptime: {selectedAgent.uptime}</div>
                </div>

                <div className="bg-gray-700/50 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <BarChart3 className="w-5 h-5 text-blue-400" />
                    <span className="text-white font-medium">Tasks Completed</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-400">{selectedAgent.tasksCompleted.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">This month</div>
                </div>

                <div className="bg-gray-700/50 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-5 h-5 text-purple-400" />
                    <span className="text-white font-medium">Last Activity</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-400">{selectedAgent.lastActivity}</div>
                  <div className="text-sm text-gray-400">Continuously monitoring</div>
                </div>
              </div>

              {/* Detailed KPIs */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Performance Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(selectedAgent.kpis).map(([key, kpi]) => (
                    <div key={key} className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30">
                      <div className="text-gray-400 text-sm mb-1">{kpi.label}</div>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-white">{kpi.value}</span>
                        {kpi.trend && (
                          <span className="text-green-400 text-sm font-medium flex items-center">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            {kpi.trend}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Connected Systems */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Connected Systems</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedAgent.connectedSystems.map((system, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-700/30 rounded-lg border border-gray-600/30">
                      <div className="w-8 h-8 bg-teal-500/20 rounded-lg flex items-center justify-center">
                        {system.includes('Camera') ? <Camera className="w-4 h-4 text-teal-400" /> :
                         system.includes('Sensor') ? <Cpu className="w-4 h-4 text-teal-400" /> :
                         <Database className="w-4 h-4 text-teal-400" />}
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm">{system}</div>
                        <div className="text-green-400 text-xs">● Connected</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Value Proposition */}
              <div className="bg-gradient-to-r from-teal-500/10 to-blue-500/10 border border-teal-500/20 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Business Impact</h3>
                <p className="text-teal-300 text-lg font-medium">{selectedAgent.valueProp}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-700">
                <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
                  View Logs
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Configure
                </button>
                <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors">
                  View Analytics
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredAgents.length === 0 && (
        <div className="text-center py-12">
          <Bot className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No agents found</h3>
          <p className="text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Create New Agent
          </button>
        </div>
      )}
    </div>
  );
}