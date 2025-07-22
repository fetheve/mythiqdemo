import React, { useState } from 'react';
import { Bot, Play, Pause, Settings, Plus, Eye, Database, Cpu, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import AgentWorkflowDemo from './AgentWorkflowDemo';
import EnhancedAgentDemo from './EnhancedAgentDemo';
import WorkflowCanvas from './WorkflowCanvas';
import MyAgents from './MyAgents';

export default function AgentBuilder() {
  const [activeTab, setActiveTab] = useState('enhanced');

  const agentStats = {
    totalAgents: 12,
    activeAgents: 8,
    successRate: 94.7,
    avgResponseTime: '1.2s'
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">AI Agent Builder</h1>
          <p className="text-gray-400">No-code workflow composer and automation engine</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Settings className="w-4 h-4" />
            <span>Templates</span>
          </button>
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Plus className="w-4 h-4" />
            <span>New Agent</span>
          </button>
        </div>
      </div>

      {/* Agent Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{agentStats.totalAgents}</div>
              <div className="text-sm text-gray-400">Total Agents</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <Play className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">{agentStats.activeAgents}</div>
              <div className="text-sm text-gray-400">Active</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-400">{agentStats.successRate}%</div>
              <div className="text-sm text-gray-400">Success Rate</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">{agentStats.avgResponseTime}</div>
              <div className="text-sm text-gray-400">Avg Response</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gray-800 rounded-xl border border-gray-700">
        <div className="flex border-b border-gray-700">
          {[
            { id: 'enhanced', name: 'Enhanced Demo', icon: Eye },
            { id: 'canvas', name: 'Workflow Canvas', icon: Settings },
            { id: 'agents', name: 'My Agents', icon: Database },
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

        <div className={activeTab === 'enhanced' ? '' : 'p-6'}>
          {activeTab === 'enhanced' && <EnhancedAgentDemo />}
          {activeTab === 'agents' && <MyAgents />}
        </div>
      </div>
    </div>
  );
}