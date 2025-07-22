import React, { useState, useRef, useCallback, useEffect } from 'react';
import { 
  Plus, Settings, Play, Database, Camera, Bot, Cpu, 
  Mic, FileText, Filter, Zap, Bell, Monitor, Save,
  Download, Upload, Trash2, Copy, RotateCcw, ZoomIn, ZoomOut,
  Grid, Move, Link, AlertCircle, CheckCircle, Info, Search,
  Code, Layers, Eye, EyeOff, Lock, Unlock, Share2, GitBranch,
  Activity, Target, MessageSquare, Calendar, Clock, Users,
  ArrowRight, ChevronDown, MoreHorizontal, X, Maximize2
} from 'lucide-react';

interface Component {
  id: string;
  type: string;
  category: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  position: { x: number; y: number };
  inputs: number;
  outputs: number;
  config?: any;
  selected?: boolean;
}

interface Connection {
  id: string;
  from: { componentId: string; outputIndex: number };
  to: { componentId: string; inputIndex: number };
  animated?: boolean;
}

interface DragState {
  isDragging: boolean;
  dragType: 'component' | 'canvas' | 'connection' | null;
  dragData: any;
  offset: { x: number; y: number };
}

const COMPONENT_LIBRARY = {
  'Triggers': [
    { type: 'schedule', name: 'Schedule', icon: Calendar, color: 'bg-emerald-600', inputs: 0, outputs: 1 },
    { type: 'webhook', name: 'Webhook', icon: Zap, color: 'bg-blue-600', inputs: 0, outputs: 1 },
    { type: 'sensor-trigger', name: 'Sensor Alert', icon: Activity, color: 'bg-orange-600', inputs: 0, outputs: 1 },
    { type: 'manual', name: 'Manual Trigger', icon: Users, color: 'bg-purple-600', inputs: 0, outputs: 1 },
  ],
  'Data Sources': [
    { type: 'database', name: 'Database', icon: Database, color: 'bg-blue-600', inputs: 0, outputs: 1 },
    { type: 'api', name: 'REST API', icon: Zap, color: 'bg-purple-600', inputs: 0, outputs: 1 },
    { type: 'file-upload', name: 'File Upload', icon: Upload, color: 'bg-green-600', inputs: 0, outputs: 1 },
    { type: 'csv', name: 'CSV Data', icon: FileText, color: 'bg-emerald-600', inputs: 0, outputs: 1 },
  ],
  'Processing': [
    { type: 'ai-model', name: 'AI Model', icon: Bot, color: 'bg-cyan-600', inputs: 1, outputs: 1 },
    { type: 'filter', name: 'Data Filter', icon: Filter, color: 'bg-amber-600', inputs: 1, outputs: 1 },
    { type: 'transformer', name: 'Transform', icon: Settings, color: 'bg-slate-600', inputs: 1, outputs: 1 },
    { type: 'aggregator', name: 'Aggregator', icon: Plus, color: 'bg-violet-600', inputs: 2, outputs: 1 },
    { type: 'condition', name: 'Condition', icon: GitBranch, color: 'bg-yellow-600', inputs: 1, outputs: 2 },
  ],
  'Actions': [
    { type: 'notification', name: 'Send Alert', icon: Bell, color: 'bg-red-600', inputs: 1, outputs: 0 },
    { type: 'email', name: 'Send Email', icon: MessageSquare, color: 'bg-pink-600', inputs: 1, outputs: 0 },
    { type: 'dashboard', name: 'Update Dashboard', icon: Monitor, color: 'bg-indigo-600', inputs: 1, outputs: 0 },
    { type: 'export', name: 'Export Data', icon: Download, color: 'bg-gray-600', inputs: 1, outputs: 0 },
  ],
};

// Helper function to find component definition by type
const findComponentByType = (type: string) => {
  for (const category of Object.values(COMPONENT_LIBRARY)) {
    const component = category.find(comp => comp.type === type);
    if (component) return component;
  }
  return null;
};

export default function WorkflowCanvas() {
  const [components, setComponents] = useState<Component[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    dragType: null,
    dragData: null,
    offset: { x: 0, y: 0 }
  });
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [showGrid, setShowGrid] = useState(true);
  const [connectionMode, setConnectionMode] = useState(false);
  const [tempConnection, setTempConnection] = useState<any>(null);
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showMinimap, setShowMinimap] = useState(true);
  const [workflowName, setWorkflowName] = useState('Untitled Workflow');
  const [isRunning, setIsRunning] = useState(false);

  const canvasRef = useRef<HTMLDivElement>(null);
  const gridSize = 20;

  // Snap to grid function
  const snapToGrid = useCallback((x: number, y: number) => {
    return {
      x: Math.round(x / gridSize) * gridSize,
      y: Math.round(y / gridSize) * gridSize
    };
  }, [gridSize]);

  // Handle component drag from library
  const handleLibraryDragStart = useCallback((e: React.DragEvent, componentType: any) => {
    e.dataTransfer.setData('text/plain', componentType.type);
    e.dataTransfer.effectAllowed = 'copy';
  }, []);

  // Handle drop on canvas
  const handleCanvasDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - canvasOffset.x) / zoom;
    const y = (e.clientY - rect.top - canvasOffset.y) / zoom;
    const snappedPos = snapToGrid(x, y);

    try {
      const componentType = e.dataTransfer.getData('text/plain');
      const componentData = findComponentByType(componentType);
      
      if (!componentData) {
        console.error('Component type not found:', componentType);
        return;
      }

      const newComponent: Component = {
        id: `component-${Date.now()}`,
        type: componentData.type,
        category: Object.keys(COMPONENT_LIBRARY).find(cat => 
          COMPONENT_LIBRARY[cat as keyof typeof COMPONENT_LIBRARY].some(c => c.type === componentData.type)
        ) || 'Unknown',
        name: componentData.name,
        icon: componentData.icon,
        color: componentData.color,
        position: snappedPos,
        inputs: componentData.inputs,
        outputs: componentData.outputs,
      };

      setComponents(prev => [...prev, newComponent]);
    } catch (error) {
      console.error('Failed to handle dropped component:', error);
    }
  }, [canvasOffset, zoom, snapToGrid]);

  // Handle component selection
  const handleComponentClick = useCallback((componentId: string, multiSelect: boolean = false) => {
    if (multiSelect) {
      setSelectedComponents(prev => 
        prev.includes(componentId) 
          ? prev.filter(id => id !== componentId)
          : [...prev, componentId]
      );
    } else {
      setSelectedComponents([componentId]);
    }
  }, []);

  // Handle component movement
  const handleComponentMouseDown = useCallback((e: React.MouseEvent, componentId: string) => {
    e.stopPropagation();
    if (connectionMode) return;

    const component = components.find(c => c.id === componentId);
    if (!component) return;

    if (!selectedComponents.includes(componentId)) {
      setSelectedComponents([componentId]);
    }

    setDragState({
      isDragging: true,
      dragType: 'component',
      dragData: componentId,
      offset: {
        x: e.clientX - component.position.x * zoom,
        y: e.clientY - component.position.y * zoom
      }
    });
  }, [components, zoom, connectionMode, selectedComponents]);

  // Handle mouse move for dragging
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!dragState.isDragging) return;

    if (dragState.dragType === 'component') {
      const newX = (e.clientX - dragState.offset.x) / zoom;
      const newY = (e.clientY - dragState.offset.y) / zoom;
      const snappedPos = snapToGrid(newX, newY);

      setComponents(prev => prev.map(comp => 
        selectedComponents.includes(comp.id)
          ? { ...comp, position: snappedPos }
          : comp
      ));
    } else if (dragState.dragType === 'canvas') {
      setCanvasOffset(prev => ({
        x: prev.x + e.movementX,
        y: prev.y + e.movementY
      }));
    }
  }, [dragState, zoom, snapToGrid, selectedComponents]);

  // Handle mouse up
  const handleMouseUp = useCallback(() => {
    setDragState({
      isDragging: false,
      dragType: null,
      dragData: null,
      offset: { x: 0, y: 0 }
    });
  }, []);

  // Add event listeners
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  // Handle connection creation
  const handleConnectionStart = useCallback((componentId: string, outputIndex: number) => {
    if (!connectionMode) return;
    
    setTempConnection({
      from: { componentId, outputIndex },
      to: null
    });
  }, [connectionMode]);

  const handleConnectionEnd = useCallback((componentId: string, inputIndex: number) => {
    if (!tempConnection) return;

    const newConnection: Connection = {
      id: `connection-${Date.now()}`,
      from: tempConnection.from,
      to: { componentId, inputIndex },
      animated: true
    };

    setConnections(prev => [...prev, newConnection]);
    setTempConnection(null);
  }, [tempConnection]);

  // Validation
  const validateWorkflow = useCallback(() => {
    const errors: string[] = [];
    
    const connectedComponents = new Set();
    connections.forEach(conn => {
      connectedComponents.add(conn.from.componentId);
      connectedComponents.add(conn.to.componentId);
    });
    
    const disconnectedComponents = components.filter(comp => 
      !connectedComponents.has(comp.id) && components.length > 1
    );
    
    if (disconnectedComponents.length > 0) {
      errors.push(`${disconnectedComponents.length} component(s) are not connected`);
    }

    setValidationErrors(errors);
    return errors.length === 0;
  }, [components, connections]);

  // Auto-validate on changes
  useEffect(() => {
    validateWorkflow();
  }, [validateWorkflow]);

  // Zoom controls
  const handleZoomIn = () => setZoom(prev => Math.min(prev * 1.2, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev / 1.2, 0.3));
  const resetZoom = () => setZoom(1);

  // Clear canvas
  const clearCanvas = () => {
    setComponents([]);
    setConnections([]);
    setSelectedComponents([]);
  };

  // Run workflow
  const runWorkflow = () => {
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 3000);
  };

  // Filter components
  const filteredCategories = Object.entries(COMPONENT_LIBRARY).filter(([category, items]) => {
    if (selectedCategory !== 'All' && category !== selectedCategory) return false;
    return items.some(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      {/* Enhanced Component Library Sidebar */}
      <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Components</h3>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
              <Layers className="w-4 h-4" />
            </button>
          </div>
          
          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search components..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="All">All Categories</option>
            {Object.keys(COMPONENT_LIBRARY).map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        {/* Component Categories */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {filteredCategories.map(([category, items]) => (
            <div key={category}>
              <h4 className="text-sm font-medium text-gray-300 mb-3 uppercase tracking-wide flex items-center">
                <span className="flex-1">{category}</span>
                <span className="text-xs text-gray-500">{items.length}</span>
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {items.filter(item => 
                  item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  item.type.toLowerCase().includes(searchTerm.toLowerCase())
                ).map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.type}
                      draggable
                      onDragStart={(e) => handleLibraryDragStart(e, item)}
                      className="group relative bg-gray-700 hover:bg-gray-600 rounded-lg p-3 cursor-grab active:cursor-grabbing transition-all duration-200 hover:scale-105 hover:shadow-lg border border-gray-600 hover:border-cyan-500/30"
                    >
                      <div className={`w-8 h-8 ${item.color} rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-lg`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-xs font-medium text-white truncate">{item.name}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        {item.inputs}→{item.outputs}
                      </div>
                      
                      {/* Enhanced Hover tooltip */}
                      <div className="absolute left-full ml-2 top-0 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap border border-gray-600 shadow-xl">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-gray-400">Inputs: {item.inputs}, Outputs: {item.outputs}</div>
                        <div className="text-gray-500 text-xs mt-1">{category}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Validation Panel */}
        {validationErrors.length > 0 && (
          <div className="p-4 border-t border-gray-700 bg-red-900/20">
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span className="text-sm font-medium text-red-400">Validation Issues</span>
            </div>
            <div className="space-y-1">
              {validationErrors.map((error, index) => (
                <div key={index} className="text-xs text-red-300">{error}</div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Enhanced Toolbar */}
        <div className="bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Workflow Name */}
            <input
              type="text"
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
              className="bg-transparent text-xl font-semibold text-white border-none outline-none focus:bg-gray-700 px-2 py-1 rounded"
            />
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setConnectionMode(!connectionMode)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${
                  connectionMode 
                    ? 'bg-cyan-600 text-white shadow-lg' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Link className="w-4 h-4" />
                <span>{connectionMode ? 'Exit Connect' : 'Connect'}</span>
              </button>
              
              <button
                onClick={() => setShowGrid(!showGrid)}
                className={`p-2 rounded-lg transition-colors ${
                  showGrid ? 'bg-gray-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>

              <button
                onClick={() => setShowMinimap(!showMinimap)}
                className={`p-2 rounded-lg transition-colors ${
                  showMinimap ? 'bg-gray-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                }`}
              >
                {showMinimap ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Zoom Controls */}
            <div className="flex items-center space-x-1 bg-gray-700 rounded-lg p-1">
              <button onClick={handleZoomOut} className="p-1 hover:bg-gray-600 rounded">
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="px-2 text-sm font-mono min-w-[60px] text-center">{Math.round(zoom * 100)}%</span>
              <button onClick={handleZoomIn} className="p-1 hover:bg-gray-600 rounded">
                <ZoomIn className="w-4 h-4" />
              </button>
              <button onClick={resetZoom} className="p-1 hover:bg-gray-600 rounded">
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Action Buttons */}
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg text-sm flex items-center space-x-2 transition-colors">
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
            
            <button 
              onClick={clearCanvas}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm flex items-center space-x-2 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear</span>
            </button>
            
            <button 
              onClick={validateWorkflow}
              className={`px-3 py-2 rounded-lg text-sm flex items-center space-x-2 transition-colors ${
                validationErrors.length === 0 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-amber-600 hover:bg-amber-700 text-white'
              }`}
            >
              {validationErrors.length === 0 ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              <span>Validate</span>
            </button>
            
            <button 
              onClick={runWorkflow}
              disabled={isRunning}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-2 transition-all shadow-lg"
            >
              <Play className={`w-4 h-4 ${isRunning ? 'animate-spin' : ''}`} />
              <span>{isRunning ? 'Running...' : 'Run'}</span>
            </button>
          </div>
        </div>

        {/* Canvas Container */}
        <div className="flex-1 relative">
          {/* Main Canvas */}
          <div 
            ref={canvasRef}
            className="absolute inset-0 overflow-hidden bg-gray-900 cursor-move"
            onDrop={handleCanvasDrop}
            onDragOver={(e) => e.preventDefault()}
            onMouseDown={(e) => {
              if (e.target === canvasRef.current) {
                setSelectedComponents([]);
                setDragState({
                  isDragging: true,
                  dragType: 'canvas',
                  dragData: null,
                  offset: { x: 0, y: 0 }
                });
              }
            }}
            style={{ 
              transform: `scale(${zoom})`,
              transformOrigin: '0 0'
            }}
          >
            {/* Enhanced Grid */}
            {showGrid && (
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, #374151 1px, transparent 1px),
                    linear-gradient(to bottom, #374151 1px, transparent 1px)
                  `,
                  backgroundSize: `${gridSize}px ${gridSize}px`,
                  transform: `translate(${canvasOffset.x % gridSize}px, ${canvasOffset.y % gridSize}px)`
                }}
              />
            )}

            {/* Connection Lines */}
            <svg className="absolute inset-0 pointer-events-none" style={{ overflow: 'visible' }}>
              <defs>
                <marker id="arrowhead" markerWidth="12" markerHeight="8" refX="10" refY="4" orient="auto">
                  <polygon points="0 0, 12 4, 0 8" fill="#22d3ee" />
                </marker>
                <filter id="connectionGlow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {connections.map((connection) => {
                const fromComponent = components.find(c => c.id === connection.from.componentId);
                const toComponent = components.find(c => c.id === connection.to.componentId);
                
                if (!fromComponent || !toComponent) return null;

                const fromPos = {
                  x: fromComponent.position.x + canvasOffset.x,
                  y: fromComponent.position.y + canvasOffset.y
                };
                const toPos = {
                  x: toComponent.position.x + canvasOffset.x,
                  y: toComponent.position.y + canvasOffset.y
                };
                
                const startX = fromPos.x + 120;
                const startY = fromPos.y + 40;
                const endX = toPos.x;
                const endY = toPos.y + 40;
                
                const midX = (startX + endX) / 2;
                
                return (
                  <g key={connection.id}>
                    <path
                      d={`M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`}
                      stroke="#22d3ee"
                      strokeWidth="3"
                      fill="none"
                      filter="url(#connectionGlow)"
                      markerEnd="url(#arrowhead)"
                      className={connection.animated ? 'animate-pulse' : ''}
                    />
                    
                    {/* Data flow animation */}
                    {connection.animated && isRunning && (
                      <circle r="4" fill="#22d3ee" className="opacity-75">
                        <animateMotion
                          dur="2s"
                          repeatCount="indefinite"
                          path={`M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`}
                        />
                      </circle>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Enhanced Components */}
            {components.map((component) => {
              const Icon = component.icon;
              const screenPos = {
                x: component.position.x + canvasOffset.x,
                y: component.position.y + canvasOffset.y
              };
              const isSelected = selectedComponents.includes(component.id);
              const isHovered = hoveredComponent === component.id;
              
              return (
                <div
                  key={component.id}
                  className={`absolute bg-gray-800 rounded-xl border-2 transition-all duration-200 cursor-pointer select-none shadow-lg ${
                    isSelected 
                      ? 'border-cyan-400 shadow-cyan-400/25 ring-2 ring-cyan-400/20' 
                      : isHovered 
                      ? 'border-gray-500 shadow-xl' 
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                  style={{
                    left: screenPos.x,
                    top: screenPos.y,
                    width: '140px',
                    height: '90px',
                    transform: isSelected ? 'scale(1.05)' : 'scale(1)'
                  }}
                  onMouseDown={(e) => handleComponentMouseDown(e, component.id)}
                  onClick={(e) => handleComponentClick(component.id, e.ctrlKey || e.metaKey)}
                  onMouseEnter={() => setHoveredComponent(component.id)}
                  onMouseLeave={() => setHoveredComponent(null)}
                >
                  <div className="p-3 h-full flex flex-col">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className={`w-7 h-7 ${component.color} rounded-lg flex items-center justify-center flex-shrink-0 shadow-md`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-xs font-medium text-white truncate flex-1">{component.name}</span>
                    </div>
                    
                    <div className="flex-1 flex items-center justify-center">
                      <span className="text-xs text-gray-400 text-center">{component.category}</span>
                    </div>

                    {/* Enhanced Connection Points */}
                    {component.inputs > 0 && (
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1">
                        {Array.from({ length: component.inputs }).map((_, index) => (
                          <div
                            key={`input-${index}`}
                            className="w-4 h-4 bg-gray-600 border-2 border-gray-400 rounded-full mb-1 hover:bg-cyan-400 hover:border-cyan-400 transition-colors cursor-pointer shadow-sm"
                            onClick={() => connectionMode && handleConnectionEnd(component.id, index)}
                          />
                        ))}
                      </div>
                    )}
                    
                    {component.outputs > 0 && (
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1">
                        {Array.from({ length: component.outputs }).map((_, index) => (
                          <div
                            key={`output-${index}`}
                            className="w-4 h-4 bg-gray-600 border-2 border-gray-400 rounded-full mb-1 hover:bg-cyan-400 hover:border-cyan-400 transition-colors cursor-pointer shadow-sm"
                            onClick={() => connectionMode && handleConnectionStart(component.id, index)}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Enhanced Component Actions */}
                  {isSelected && (
                    <div className="absolute -top-10 right-0 flex space-x-1 bg-gray-800 rounded-lg p-1 shadow-lg border border-gray-600">
                      <button className="w-6 h-6 bg-gray-700 hover:bg-gray-600 rounded text-white flex items-center justify-center transition-colors">
                        <Settings className="w-3 h-3" />
                      </button>
                      <button className="w-6 h-6 bg-gray-700 hover:bg-gray-600 rounded text-white flex items-center justify-center transition-colors">
                        <Copy className="w-3 h-3" />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setComponents(prev => prev.filter(c => c.id !== component.id));
                          setConnections(prev => prev.filter(c => 
                            c.from.componentId !== component.id && c.to.componentId !== component.id
                          ));
                          setSelectedComponents(prev => prev.filter(id => id !== component.id));
                        }}
                        className="w-6 h-6 bg-red-600 hover:bg-red-700 rounded text-white flex items-center justify-center transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Empty State */}
            {components.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-gray-500 max-w-md">
                  <Bot className="w-20 h-20 mx-auto mb-6 opacity-50" />
                  <h3 className="text-2xl font-medium mb-4">Start Building Your Workflow</h3>
                  <p className="text-lg mb-6">Drag components from the library to create your automation workflow</p>
                  <div className="flex items-center justify-center space-x-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-emerald-600 rounded"></div>
                      <span>Triggers</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-600 rounded"></div>
                      <span>Data Sources</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-cyan-600 rounded"></div>
                      <span>Processing</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-600 rounded"></div>
                      <span>Actions</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Minimap */}
          {showMinimap && components.length > 0 && (
            <div className="absolute bottom-4 right-4 w-48 h-32 bg-gray-800 border border-gray-600 rounded-lg overflow-hidden shadow-xl">
              <div className="w-full h-full relative bg-gray-900">
                <div className="text-xs text-gray-400 p-2 border-b border-gray-700">Minimap</div>
                <div className="absolute inset-0 top-6">
                  {components.map((component) => (
                    <div
                      key={component.id}
                      className={`absolute w-2 h-2 rounded-sm ${component.color} opacity-70`}
                      style={{
                        left: `${(component.position.x / 1000) * 100}%`,
                        top: `${(component.position.y / 600) * 100}%`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Status Bar */}
        <div className="bg-gray-800 border-t border-gray-700 px-4 py-3 flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center space-x-6">
            <span>Components: {components.length}</span>
            <span>Connections: {connections.length}</span>
            <span>Selected: {selectedComponents.length}</span>
            <span>Zoom: {Math.round(zoom * 100)}%</span>
          </div>
          <div className="flex items-center space-x-4">
            {isRunning && (
              <div className="flex items-center space-x-2 text-cyan-400">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <span>Workflow Running</span>
              </div>
            )}
            {validationErrors.length === 0 ? (
              <div className="flex items-center space-x-1 text-green-400">
                <CheckCircle className="w-4 h-4" />
                <span>Workflow Valid</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1 text-red-400">
                <AlertCircle className="w-4 h-4" />
                <span>{validationErrors.length} Error(s)</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}