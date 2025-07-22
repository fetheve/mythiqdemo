import React, { useState, useEffect } from 'react';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import ExecutiveDashboard from './components/Dashboard/ExecutiveDashboard';
import DeviceManager from './components/DeviceManager/DeviceManager';
import AIManager from './components/AIManager/AIManager';
import AgentBuilder from './components/AgentBuilder/AgentBuilder';
import DataManager from './components/DataManager/DataManager';
import OEEAnalytics from './components/Analytics/OEEAnalytics';
import ProductionLineVisualization from './components/ProductionLine/ProductionLineVisualization';
import AlertsPanel from './components/Common/AlertsPanel';
import ParticleBackground from './components/Common/ParticleBackground';
import WorkflowCanvas from './components/AgentBuilder/WorkflowCanvas';
import { alerts, workflows, devices, aiModels } from './data/mockData';
import { Database, Workflow, Plug, Users, BarChart3, Settings } from 'lucide-react';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <ExecutiveDashboard />;
      case 'devices':
        return <DeviceManager />;
      case 'ai':
        return <AIManager />;
      case 'workflows':
        return <AgentBuilder />;
      case 'workflow-builder':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Workflow Builder</h1>
              <p className="text-gray-400">No-code workflow composer and automation engine</p>
            </div>
            <div className="bg-gray-800 rounded-xl border border-gray-700">
              <div className="p-6">
                <WorkflowCanvas />
              </div>
            </div>
          </div>
        );
      case 'data':
        return <DataManager />;
      case 'alerts':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Alert Center</h1>
              <p className="text-gray-400">Real-time alerts and notifications from across your operations</p>
            </div>
            <AlertsPanel alerts={alerts} showHeader />
          </div>
        );
      case 'integrations':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Integrations</h1>
              <p className="text-gray-400">Connect with MES, ERP, and legacy OT systems</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Rockwell Automation', status: 'Connected', color: 'text-green-400' },
                { name: 'Siemens PLC', status: 'Connected', color: 'text-green-400' },
                { name: 'SAP ERP', status: 'Pending', color: 'text-amber-400' },
                { name: 'Honeywell DCS', status: 'Connected', color: 'text-green-400' },
                { name: 'SCADA System', status: 'Error', color: 'text-red-400' },
                { name: 'MES Platform', status: 'Connected', color: 'text-green-400' },
              ].map((integration, index) => (
                <div key={index} className="card-futuristic hover-lift">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <Plug className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">{integration.name}</div>
                      <div className={`text-sm ${integration.color}`}>{integration.status}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'analytics':
        return (
          <OEEAnalytics />
        );
      case 'production-line':
        return <ProductionLineVisualization />;
      case 'users':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
              <p className="text-gray-400">Role-based access control and user administration</p>
            </div>
            <div className="card-futuristic">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">24</div>
                  <div className="text-sm text-gray-400">Active Users</div>
                </div>
              </div>
              <div className="space-y-3">
                {['Admin', 'Operator', 'Supervisor', 'Engineer'].map((role, index) => (
                  <div key={role} className="flex items-center justify-between p-3 glass rounded-lg">
                    <span className="text-white">{role}</span>
                    <span className="text-gray-400">{[8, 12, 3, 1][index]} users</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return <AgentBuilder />;
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Animated Background */}
      <div className="animated-bg"></div>
      <div className="grid-pattern"></div>
      <ParticleBackground />
      
      <div className="relative z-10 flex min-h-screen">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-8 overflow-y-auto">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;