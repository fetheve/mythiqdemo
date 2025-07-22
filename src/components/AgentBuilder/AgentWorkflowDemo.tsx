import React, { useState, useEffect } from 'react';
import { Bot, Database, Camera, Cpu, AlertTriangle, CheckCircle, TrendingUp, ArrowRight, ArrowDown, Play } from 'lucide-react';

export default function AgentWorkflowDemo() {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % 4);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isActive]);

  const steps = [
    'ERP Data Retrieved',
    'Camera Analysis Complete',
    'CNC Machine Monitored',
    'Issue Resolved'
  ];

  return (
    <div className="space-y-8">
      {/* Demo Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">Quality Control AI Agent</h3>
          <p className="text-gray-400">Real-time manufacturing intelligence and automated response</p>
        </div>
        <button
          onClick={() => setIsActive(!isActive)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            isActive 
              ? 'bg-red-600 hover:bg-red-700 text-white' 
              : 'bg-teal-600 hover:bg-teal-700 text-white'
          }`}
        >
          <Play className="w-4 h-4" />
          <span>{isActive ? 'Stop Demo' : 'Start Demo'}</span>
        </button>
      </div>

      {/* Workflow Visualization */}
      <div className="relative bg-gray-900 rounded-xl p-8 border border-gray-700 min-h-[600px]">
        {/* ERP System */}
        <div className={`absolute top-8 left-8 bg-gray-800 rounded-xl p-6 border-2 transition-all duration-500 ${
          isActive && currentStep >= 0 ? 'border-teal-400 shadow-lg shadow-teal-400/20' : 'border-gray-600'
        }`}>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Database className="w-5 h-5 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-white">ERP System</h4>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Material number</span>
              <span className="text-white font-medium">17343</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Description</span>
              <span className="text-white font-medium">Dowel</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Quantity</span>
              <span className="text-white font-medium">500</span>
            </div>
          </div>
        </div>

        {/* AI Agent Center */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className={`bg-gray-800 rounded-xl p-6 border-2 transition-all duration-500 ${
            isActive ? 'border-teal-400 shadow-lg shadow-teal-400/20' : 'border-gray-600'
          }`}>
            <div className="text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-500 ${
                isActive ? 'bg-teal-600 animate-pulse' : 'bg-gray-700'
              }`}>
                <Bot className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">MythIQ AI Agent</h4>
              <div className={`text-sm px-3 py-1 rounded-full transition-all duration-500 ${
                isActive ? 'bg-green-900 text-green-300' : 'bg-gray-700 text-gray-400'
              }`}>
                {isActive ? steps[currentStep] : 'Ready'}
              </div>
            </div>
          </div>
        </div>

        {/* Camera Feed */}
        <div className={`absolute top-8 right-8 bg-gray-800 rounded-xl p-6 border-2 transition-all duration-500 ${
          isActive && currentStep >= 1 ? 'border-teal-400 shadow-lg shadow-teal-400/20' : 'border-gray-600'
        }`}>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-white">Camera Feed</h4>
          </div>
          <div className="w-48 h-32 bg-gray-700 rounded-lg flex items-center justify-center mb-4">
            <div className="text-center">
              <Camera className="w-8 h-8 text-gray-500 mx-auto mb-2" />
              <span className="text-gray-500 text-sm">Live Feed</span>
            </div>
          </div>
          <div className={`text-sm px-3 py-1 rounded-full text-center transition-all duration-500 ${
            isActive && currentStep >= 1 ? 'bg-amber-900 text-amber-300' : 'bg-gray-700 text-gray-400'
          }`}>
            {isActive && currentStep >= 1 ? 'Defect Detected' : 'Monitoring'}
          </div>
        </div>

        {/* CNC Machine */}
        <div className={`absolute bottom-8 right-8 bg-gray-800 rounded-xl p-6 border-2 transition-all duration-500 ${
          isActive && currentStep >= 2 ? 'border-teal-400 shadow-lg shadow-teal-400/20' : 'border-gray-600'
        }`}>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-white">CNC Machine</h4>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <div className="text-gray-400">Spindle Speed</div>
              <div className="text-white font-medium">1200 rpm</div>
            </div>
            <div>
              <div className="text-gray-400">Feed Rate</div>
              <div className="text-white font-medium">150 mm/min</div>
            </div>
          </div>
          <div className="w-full h-16 bg-gray-700 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-teal-400" />
          </div>
        </div>

        {/* AI Analysis Panel */}
        <div className={`absolute bottom-8 left-8 bg-gray-800 rounded-xl p-6 border-2 transition-all duration-500 ${
          isActive ? 'border-teal-400 shadow-lg shadow-teal-400/20' : 'border-gray-600'
        }`}>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-white">AI Analysis</h4>
          </div>
          <div className="space-y-3">
            <div className={`p-3 rounded-lg transition-all duration-500 ${
              isActive ? 'bg-teal-900 border border-teal-700' : 'bg-gray-700'
            }`}>
              <div className="text-teal-300 font-medium text-sm mb-1">Root Cause Identified:</div>
              <div className="text-white text-sm">Adjust cutting fluid concentration on CNC machine 3</div>
            </div>
            {isActive && currentStep >= 3 && (
              <div className="p-3 bg-green-900 border border-green-700 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-green-300 text-sm font-medium">Issue Resolved</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Connection Lines */}
        {isActive && (
          <>
            {/* ERP to AI Agent */}
            <div className="absolute top-24 left-72 w-32 h-0.5 bg-teal-400 animate-pulse">
              <ArrowRight className="absolute -right-2 -top-2 w-4 h-4 text-teal-400" />
            </div>
            
            {/* Camera to AI Agent */}
            <div className="absolute top-24 right-72 w-32 h-0.5 bg-teal-400 animate-pulse">
              <ArrowRight className="absolute -left-2 -top-2 w-4 h-4 text-teal-400 transform rotate-180" />
            </div>
            
            {/* AI Agent to CNC */}
            <div className="absolute bottom-24 right-72 w-32 h-0.5 bg-teal-400 animate-pulse">
              <ArrowRight className="absolute -right-2 -top-2 w-4 h-4 text-teal-400" />
            </div>
            
            {/* AI Agent to Analysis */}
            <div className="absolute bottom-24 left-72 w-32 h-0.5 bg-teal-400 animate-pulse">
              <ArrowRight className="absolute -left-2 -top-2 w-4 h-4 text-teal-400 transform rotate-180" />
            </div>
          </>
        )}
      </div>

      {/* Action Panel */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-white">Automated Actions</h4>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            isActive && currentStep >= 3 
              ? 'bg-green-900 text-green-300' 
              : 'bg-gray-700 text-gray-400'
          }`}>
            {isActive && currentStep >= 3 ? 'Completed' : 'Pending'}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span className="text-white font-medium text-sm">Quality Alert</span>
            </div>
            <p className="text-gray-400 text-xs">Notify supervisor of defect detection</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Cpu className="w-4 h-4 text-blue-400" />
              <span className="text-white font-medium text-sm">Machine Adjustment</span>
            </div>
            <p className="text-gray-400 text-xs">Optimize cutting fluid concentration</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Database className="w-4 h-4 text-green-400" />
              <span className="text-white font-medium text-sm">ERP Update</span>
            </div>
            <p className="text-gray-400 text-xs">Log quality event and resolution</p>
          </div>
        </div>
      </div>
    </div>
  );
}