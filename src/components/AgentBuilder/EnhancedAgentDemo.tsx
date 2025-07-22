import React, { useState, useEffect, useRef } from 'react';
import { Bot, Database, Camera, Cpu, AlertTriangle, CheckCircle, TrendingUp, Play, Pause, Settings } from 'lucide-react';

export default function EnhancedAgentDemo() {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, vx: number, vy: number}>>([]);
  const [warningFlash, setWarningFlash] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  // Initialize particles
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));
    setParticles(newParticles);
  }, []);

  // Animate particles
  useEffect(() => {
    const animate = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.vx + window.innerWidth) % window.innerWidth,
        y: (particle.y + particle.vy + window.innerHeight) % window.innerHeight,
      })));
      animationRef.current = requestAnimationFrame(animate);
    };
    
    if (isActive) {
      animate();
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive]);

  // Demo step progression - extended sequence for AI analysis
  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % 8); // Extended to 8 steps
      }, 3000); // Reduced to 3 seconds for faster progression
      return () => clearInterval(interval);
    }
  }, [isActive]);

  // Warning flash effect - flashes every 1 second when active and CNC machine is monitored
  useEffect(() => {
    if (isActive && currentStep >= 3) {
      const flashInterval = setInterval(() => {
        setWarningFlash(prev => !prev);
      }, 1000);
      return () => clearInterval(flashInterval);
    } else {
      setWarningFlash(false);
    }
  }, [isActive, currentStep]);

  // Updated steps to match the extended sequence
  const steps = [
    'Camera Feed Initializing',
    'Valve Defect Detected: Scratch',
    'ERP Data Retrieved',
    'CNC Machine Monitored - Fast Spindle Speed',
    'AI Root Cause Analysis',
    'Recommended Actions Generated',
    'Impact Prediction Calculated',
    'Alert sent to Paul Manias (ID #293)'
  ];

  // Updated mock data with Metal Valve 962
  const mockData = {
    erp: {
      materialNumber: '17343',
      description: 'Metal Valve 962',
      quantity: 500,
      workOrder: 'WO-2024-001',
      priority: 'High'
    },
    camera: {
      resolution: '4K',
      edge: '92',
      defectsDetected: 1,
      confidence: 94.7,
      defectType: 'Valve Defect Detected: Scratch'
    },
    cnc: {
      spindleSpeed: 1200,
      feedRate: 150,
      temperature: 68,
      vibration: 0.02,
      efficiency: 87.3
    }
  };

  // Static performance data for CNC machine graph
  const staticPerformanceData = [
    85, 78, 92, 88, 95, 82, 89, 91, 87, 93, 
    86, 90, 84, 88, 92, 89, 85, 91, 87, 94
  ];

  return (
    <div className="relative min-h-screen bg-gray-950 overflow-hidden border border-gray-800/50 rounded-xl">
      {/* Enhanced Animated Background with darker base */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950">
        {/* Geometric Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" className="animate-pulse">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" className="text-teal-400" />
          </svg>
        </div>

        {/* Enhanced Flowing Particles */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 20% 50%, rgba(20, 184, 166, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)'
          }}
        />
        
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-teal-400 rounded-full opacity-20 animate-pulse"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}

        {/* Subtle overlay for additional depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-gray-950/40"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-8 space-y-8">
        {/* Header */}
        <div className="backdrop-blur-lg bg-gray-900/60 rounded-2xl p-6 border border-gray-700/50 shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
                Quality Control AI Agent
              </h1>
              <p className="text-gray-300 text-lg">Real-time manufacturing intelligence with predictive analytics</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setIsActive(!isActive)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  isActive 
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25' 
                    : 'bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-lg shadow-teal-500/25'
                }`}
              >
                {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                <span>{isActive ? 'Stop Demo' : 'Start Demo'}</span>
              </button>
              <button className="p-3 backdrop-blur-lg bg-gray-800/60 rounded-xl border border-gray-600/50 text-white hover:bg-gray-700/60 transition-all duration-300">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="backdrop-blur-lg bg-gray-900/50 rounded-2xl p-4 border border-gray-700/40 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
                <span className="text-white font-medium">System Status</span>
              </div>
              <div className="text-gray-300">
                Current Step: <span className="text-teal-400 font-semibold">{steps[currentStep]}</span>
              </div>
            </div>
            <div className="flex space-x-4 text-sm">
              <div className="text-green-400">● Connected</div>
              <div className="text-blue-400">● Secure</div>
              <div className="text-teal-400">● Operational</div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Camera System - First to activate */}
          <div className={`backdrop-blur-lg bg-gray-900/40 rounded-2xl p-6 border transition-all duration-500 shadow-2xl ${
            isActive && currentStep >= 0
              ? 'border-emerald-400/50 shadow-emerald-400/20 bg-emerald-500/10' 
              : 'border-gray-700/30'
          }`}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Camera Feed</h3>
                <p className="text-gray-400">Vision Analysis System</p>
              </div>
            </div>

            {/* Camera Preview with Actual Image */}
            <div className="relative mb-4">
              <div className="w-full h-48 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700/30 overflow-hidden relative">
                {/* Defect Valve Image */}
                <img 
                  src="/images/defectvalve.png" 
                  alt="Metal Valve 962 with defect detection"
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay for camera feed effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-blue-500/10" />
                
                {/* Live indicator */}
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                  <span className="text-white text-sm font-medium">LIVE</span>
                </div>
                
                {/* Detection Overlay - shows defect detection */}
                {isActive && currentStep >= 1 && (
                  <div className="absolute inset-4 border-2 border-amber-400 rounded-lg animate-pulse">
                    <div className="absolute -top-6 left-0 bg-amber-400 text-black px-2 py-1 rounded text-xs font-bold">
                      {mockData.camera.defectType}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Camera Information Display */}
            <div className="backdrop-blur-sm bg-gray-800/40 rounded-lg p-4 border border-gray-700/30 mb-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Resolution:</span>
                  <span className="text-white font-medium">{mockData.camera.resolution}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Edge:</span>
                  <span className="text-white font-medium">Jetson{mockData.camera.edge}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Defects:</span>
                  <span className="text-amber-400 font-medium">{mockData.camera.defectsDetected}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Confidence:</span>
                  <span className="text-green-400 font-medium">{mockData.camera.confidence}%</span>
                </div>
              </div>
            </div>

            {isActive && currentStep >= 1 && (
              <div className="p-3 bg-gradient-to-r from-amber-500/20 to-red-500/20 rounded-lg border border-amber-400/30">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span className="text-amber-300 font-medium">{mockData.camera.defectType}</span>
                </div>
              </div>
            )}
          </div>

          {/* ERP System - Activates after camera detection */}
          <div className={`backdrop-blur-lg bg-gray-900/40 rounded-2xl p-6 border transition-all duration-500 shadow-2xl ${
            isActive && currentStep >= 2
              ? 'border-teal-400/50 shadow-teal-400/20 bg-teal-500/10' 
              : 'border-gray-700/30'
          }`}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">ERP System</h3>
                <p className="text-gray-400">Enterprise Resource Planning</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {Object.entries(mockData.erp).map(([key, value], index) => (
                <div key={key} className="flex justify-between items-center p-3 backdrop-blur-sm bg-gray-800/30 rounded-lg border border-gray-700/20">
                  <span className="text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="text-white font-semibold">{value}</span>
                </div>
              ))}
            </div>

            {isActive && currentStep >= 2 && (
              <div className="mt-4 p-3 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-lg border border-teal-400/30">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-teal-400" />
                  <span className="text-teal-300 font-medium">Component Retrieved Successfully</span>
                </div>
              </div>
            )}
          </div>

          {/* CNC Machine */}
          <div className={`backdrop-blur-lg bg-gray-900/40 rounded-2xl p-6 border transition-all duration-500 shadow-2xl ${
            isActive && currentStep >= 3 
              ? 'border-purple-400/50 shadow-purple-400/20 bg-purple-500/10' 
              : 'border-gray-700/30'
          }`}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">CNC Machine</h3>
                <p className="text-gray-400">Press Machine Line 3</p>
              </div>
            </div>

            {/* 3D Metrics Visualization */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="backdrop-blur-sm bg-gray-800/30 rounded-lg p-3 border border-gray-700/20">
                  <div className="text-gray-400 text-sm">Vibration</div>
                  <div className="text-2xl font-bold text-white">{mockData.cnc.spindleSpeed}</div>
                  <div className="text-xs text-gray-500">RPM</div>
                </div>
                <div className="backdrop-blur-sm bg-gray-800/30 rounded-lg p-3 border border-gray-700/20">
                  <div className="text-gray-400 text-sm">Feed Rate</div>
                  <div className="text-2xl font-bold text-white">{mockData.cnc.feedRate}</div>
                  <div className="text-xs text-gray-500">mm/min</div>
                </div>
              </div>

              {/* Static Performance Chart */}
              <div className="h-24 backdrop-blur-sm bg-gray-800/30 rounded-lg border border-gray-700/20 p-3">
                <div className="text-gray-400 text-sm mb-2">Performance Metrics</div>
                <div className="flex items-end space-x-1 h-12">
                  {staticPerformanceData.map((value, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-teal-500 to-blue-500 rounded-sm opacity-70"
                      style={{ height: `${value}%` }}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="backdrop-blur-sm bg-gray-800/30 rounded-lg p-3 border border-gray-700/20">
                  <div className="text-gray-400 text-sm">Temperature</div>
                  <div className="text-lg font-bold text-white">{mockData.cnc.temperature}°C</div>
                </div>
                <div className="backdrop-blur-sm bg-gray-800/30 rounded-lg p-3 border border-gray-700/20">
                  <div className="text-gray-400 text-sm">Efficiency</div>
                  <div className="text-lg font-bold text-green-400">{mockData.cnc.efficiency}%</div>
                </div>
              </div>
            </div>

            {/* Fast Spindle Speed Warning - Appears at step 3 */}
            {isActive && currentStep >= 3 && (
              <div className={`mt-4 p-4 rounded-lg border transition-all duration-300 ${
                warningFlash 
                  ? 'bg-gradient-to-r from-red-500/30 to-red-600/30 border-red-400/50 shadow-lg shadow-red-500/20' 
                  : 'bg-gradient-to-r from-red-500/20 to-red-600/20 border-red-400/30'
              }`}>
                <div className="flex items-center space-x-3">
                  <AlertTriangle className={`w-5 h-5 transition-colors duration-300 ${
                    warningFlash ? 'text-red-300' : 'text-red-400'
                  }`} />
                  <span className={`font-bold text-lg transition-colors duration-300 ${
                    warningFlash ? 'text-red-200' : 'text-red-300'
                  }`}>
                    Fast Spindle Speed Detected
                  </span>
                </div>
                <div className="mt-2 text-red-200 text-sm">
                  Vibration sensor detects spindle speed exceeds safe operating parameters. Immediate attention required.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* AI Agent Central Hub */}
        <div className="backdrop-blur-lg bg-gray-900/50 rounded-2xl p-8 border border-gray-700/40 shadow-2xl">
          <div className="text-center mb-8">
            <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4 transition-all duration-500 ${
              isActive 
                ? 'bg-gradient-to-r from-teal-500 to-blue-500 shadow-lg shadow-teal-500/50 animate-pulse' 
                : 'bg-gradient-to-r from-gray-600 to-gray-700'
            }`}>
              <Bot className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">MythIQ AI Agent</h2>
            <p className="text-gray-400">Intelligent Manufacturing Assistant</p>
          </div>

          {/* AI Analysis - Now appears in sequence after fast spindle speed warning */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Root Cause Analysis - Appears at step 4 */}
            <div className="backdrop-blur-sm bg-gray-800/30 rounded-xl p-6 border border-gray-700/20">
              <h4 className="text-lg font-semibold text-white mb-4">Root Cause Analysis</h4>
              <div className={`p-4 rounded-lg transition-all duration-500 ${
                isActive && currentStep >= 4 
                  ? 'bg-gradient-to-r from-teal-500/20 to-blue-500/20 border border-teal-400/30 opacity-100 transform translate-y-0' 
                  : 'bg-gray-800/50 opacity-50 transform translate-y-2'
              }`}>
                <div className="text-teal-300 font-medium mb-2">Identified Issue:</div>
                <div className="text-white text-sm">Press Machine #3 has high spindle speed due to lack of fluid according to equipment manual.</div>
              </div>
            </div>

            {/* Recommended Actions - Sub-boxes appear at steps 5+ */}
            <div className="backdrop-blur-sm bg-gray-800/30 rounded-xl p-6 border border-gray-700/20">
              <h4 className="text-lg font-semibold text-white mb-4">Recommended Actions</h4>
              <div className="space-y-2">
                {[
                  'Halt production line immediately',
                  'Notify quality supervisor',
                  'Initiate defect investigation'
                ].map((action, index) => (
                  <div key={index} className={`p-2 rounded text-sm transition-all duration-500 ${
                    isActive && currentStep >= 5 + index 
                      ? 'bg-green-500/20 text-green-300 border border-green-400/30 opacity-100 transform translate-x-0' 
                      : 'bg-gray-800/50 text-gray-400 opacity-50 transform translate-x-2'
                  }`}>
                    {action}
                  </div>
                ))}
              </div>
            </div>

            {/* Impact Prediction - Appears at step 6 */}
            <div className="backdrop-blur-sm bg-gray-800/30 rounded-xl p-6 border border-gray-700/20">
              <h4 className="text-lg font-semibold text-white mb-4">Impact Prediction</h4>
              <div className={`space-y-3 transition-all duration-500 ${
                isActive && currentStep >= 6
                  ? 'opacity-100 transform translate-y-0'
                  : 'opacity-50 transform translate-y-2'
              }`}>
                <div className="flex justify-between">
                  <span className="text-gray-400">Quality Improvement</span>
                  <span className="text-green-400 font-semibold">+12%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Defect Prevention</span>
                  <span className="text-blue-400 font-semibold">+95%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Cost Avoidance</span>
                  <span className="text-teal-400 font-semibold">$8,400/day</span>
                </div>
              </div>
            </div>
          </div>

          {/* Resolution Status - Final step */}
          {isActive && currentStep >= 7 && (
            <div className="mt-6 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-400/30 transition-all duration-500 opacity-100 transform translate-y-0">
              <div className="flex items-center justify-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <span className="text-green-300 font-semibold text-lg">Alert sent to Paul Manias (ID #293)</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}