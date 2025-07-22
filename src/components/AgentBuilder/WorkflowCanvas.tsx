import React, { useState, useRef, useCallback, useEffect } from 'react';
import { 
  Plus, Settings, Play, Database, Camera, Bot, Cpu, 
  Mic, FileText, Filter, Zap, Bell, Monitor, Save,
  Download, Upload, Trash2, Copy, RotateCcw, ZoomIn, ZoomOut,
  Grid, Move, Link, AlertCircle, CheckCircle, Info
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
  'Data Sources': [
    { type: 'database', name: 'Database', icon: Database, color: 'bg-blue-600', inputs: 0, outputs: 1 },
    { type: 'api', name: 'REST API', icon: Zap, color: 'bg-purple-600', inputs: 0, outputs: 1 },
    { type: 'file-upload', name: 'File Upload', icon: Upload, color: 'bg-green-600', inputs: 0, outputs: 1 },
    { type: 'csv', name: 'CSV Data', icon: FileText, color: 'bg-emerald-600', inputs: 0, outputs: 1 },
  ],
  'Input Components': [
    { type: 'camera', name: 'Camera Feed', icon: Camera, color: 'bg-teal-600', inputs: 0, outputs: 1 },
    { type: 'microphone', name: 'Audio Input', icon: Mic, color: 'bg-pink-600', inputs: 0, outputs: 1 },
    { type: 'text-input', name: 'Text Input', icon: FileText, color: 'bg-indigo-600', inputs: 0, outputs: 1 },
    { type: 'sensor', name: 'IoT Sensor', icon: Cpu, color: 'bg-orange-600', inputs: 0, outputs: 1 },
  ],
  'Processing Nodes': [
    { type: 'ai-model', name: 'AI Model', icon: Bot, color: 'bg-cyan-600', inputs: 1, outputs: 1 },
    { type: 'filter', name: 'Data Filter', icon: Filter, color: 'bg-amber-600', inputs: 1, outputs: 1 },
    { type: 'transformer', name: 'Transform', icon: Settings, color: 'bg-slate-600', inputs: 1, outputs: 1 },
    { type: 'aggregator', name: 'Aggregator', icon: Plus, color: 'bg-violet-600', inputs: 2, outputs: 1 },
  ],
  'Output Components': [
    { type: 'display', name: 'Dashboard', icon: Monitor, color: 'bg-red-600', inputs: 1, outputs: 0 },
    { type: 'notification', name: 'Alert', icon: Bell, color: 'bg-yellow-600', inputs: 1, outputs: 0 },
    { type: 'action', name: 'Action', icon: Zap, color: 'bg-rose-600', inputs: 1, outputs: 0 },
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
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
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

  const canvasRef = useRef<HTMLDivElement>(null);
  const gridSize = 20;

  // Snap to grid function
  const snapToGrid = useCallback((x: number, y: number) => {
    return {
      x: Math.round(x / gridSize) * gridSize,
      y: Math.round(y / gridSize) * gridSize
    };
  }, [gridSize]);

  // Handle component drag from library - only pass the type string
  const handleLibraryDragStart = useCallback((e: React.DragEvent, componentType: any) => {
    // Only pass the type string, not the entire component object
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
      // Get the component type from the drag data
      const componentType = e.dataTransfer.getData('text/plain');
      
      // Look up the full component definition from the library
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
        icon: componentData.icon, // This is now the actual React component
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

  // Handle component movement
  const handleComponentMouseDown = useCallback((e: React.MouseEvent, componentId: string) => {
    e.stopPropagation();
    if (connectionMode) return;

    const component = components.find(c => c.id === componentId);
    if (!component) return;

    setSelectedComponent(componentId);
    setDragState({
      isDragging: true,
      dragType: 'component',
      dragData: componentId,
      offset: {
        x: e.clientX - component.position.x * zoom,
        y: e.clientY - component.position.y * zoom
      }
    });
  }, [components, zoom, connectionMode]);

  // Handle mouse move for dragging
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!dragState.isDragging) return;

    if (dragState.dragType === 'component') {
      const newX = (e.clientX - dragState.offset.x) / zoom;
      const newY = (e.clientY - dragState.offset.y) / zoom;
      const snappedPos = snapToGrid(newX, newY);

      setComponents(prev => prev.map(comp => 
        comp.id === dragState.dragData 
          ? { ...comp, position: snappedPos }
          : comp
      ));
    } else if (dragState.dragType === 'canvas') {
      setCanvasOffset(prev => ({
        x: prev.x + e.movementX,
        y: prev.y + e.movementY
      }));
    }
  }, [dragState, zoom, snapToGrid]);

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
    
    // Check for disconnected components
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

    // Check for circular dependencies
    const hasCircularDependency = () => {
      const visited = new Set();
      const recursionStack = new Set();
      
      const hasCycle = (componentId: string): boolean => {
        if (recursionStack.has(componentId)) return true;
        if (visited.has(componentId)) return false;
        
        visited.add(componentId);
        recursionStack.add(componentId);
        
        const outgoingConnections = connections.filter(conn => conn.from.componentId === componentId);
        for (const conn of outgoingConnections) {
          if (hasCycle(conn.to.componentId)) return true;
        }
        
        recursionStack.delete(componentId);
        return false;
      };
      
      for (const component of components) {
        if (hasCycle(component.id)) return true;
      }
      return false;
    };
    
    if (hasCircularDependency()) {
      errors.push('Circular dependency detected in workflow');
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
    setSelectedComponent(null);
  };

  // Get component position with zoom and offset
  const getComponentScreenPosition = (component: Component) => ({
    x: component.position.x * zoom + canvasOffset.x,
    y: component.position.y * zoom + canvasOffset.y
  });

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      {/* Component Library Sidebar */}
      <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-2">Component Library</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Info className="w-4 h-4" />
            <span>Drag components to canvas</span>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {Object.entries(COMPONENT_LIBRARY).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-sm font-medium text-gray-300 mb-3 uppercase tracking-wide">
                {category}
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.type}
                      draggable
                      onDragStart={(e) => handleLibraryDragStart(e, item)}
                      className="group relative bg-gray-700 hover:bg-gray-600 rounded-lg p-3 cursor-grab active:cursor-grabbing transition-all duration-200 hover:scale-105 hover:shadow-lg"
                    >
                      <div className={`w-8 h-8 ${item.color} rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-xs font-medium text-white truncate">{item.name}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        {item.inputs}→{item.outputs}
                      </div>
                      
                      {/* Hover tooltip */}
                      <div className="absolute left-full ml-2 top-0 bg-gray-900 text-white text-xs rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                        {item.name}
                        <div className="text-gray-400">Inputs: {item.inputs}, Outputs: {item.outputs}</div>
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
              <span className="text-sm font-medium text-red-400">Validation Errors</span>
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
        {/* Toolbar */}
        <div className="bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-white">Workflow Canvas</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setConnectionMode(!connectionMode)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  connectionMode 
                    ? 'bg-teal-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Link className="w-4 h-4 mr-2 inline" />
                {connectionMode ? 'Exit Connect Mode' : 'Connect Mode'}
              </button>
              <button
                onClick={() => setShowGrid(!showGrid)}
                className={`p-2 rounded-lg transition-colors ${
                  showGrid ? 'bg-gray-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Zoom Controls */}
            <div className="flex items-center space-x-1 bg-gray-700 rounded-lg p-1">
              <button onClick={handleZoomOut} className="p-1 hover:bg-gray-600 rounded">
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="px-2 text-sm font-mono">{Math.round(zoom * 100)}%</span>
              <button onClick={handleZoomIn} className="p-1 hover:bg-gray-600 rounded">
                <ZoomIn className="w-4 h-4" />
              </button>
              <button onClick={resetZoom} className="p-1 hover:bg-gray-600 rounded">
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Action Buttons */}
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg text-sm flex items-center space-x-2">
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
            <button 
              onClick={clearCanvas}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm flex items-center space-x-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear</span>
            </button>
            <button 
              onClick={validateWorkflow}
              className={`px-3 py-2 rounded-lg text-sm flex items-center space-x-2 ${
                validationErrors.length === 0 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-amber-600 hover:bg-amber-700 text-white'
              }`}
            >
              {validationErrors.length === 0 ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              <span>Validate</span>
            </button>
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-2 rounded-lg text-sm flex items-center space-x-2">
              <Play className="w-4 h-4" />
              <span>Run</span>
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div 
          ref={canvasRef}
          className="flex-1 relative overflow-hidden bg-gray-900 cursor-move"
          onDrop={handleCanvasDrop}
          onDragOver={(e) => e.preventDefault()}
          onMouseDown={(e) => {
            if (e.target === canvasRef.current) {
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
          {/* Grid */}
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
            {connections.map((connection) => {
              const fromComponent = components.find(c => c.id === connection.from.componentId);
              const toComponent = components.find(c => c.id === connection.to.componentId);
              
              if (!fromComponent || !toComponent) return null;

              const fromPos = getComponentScreenPosition(fromComponent);
              const toPos = getComponentScreenPosition(toComponent);
              
              const startX = fromPos.x + 120; // Component width
              const startY = fromPos.y + 40; // Component height / 2
              const endX = toPos.x;
              const endY = toPos.y + 40;
              
              const midX = (startX + endX) / 2;
              
              return (
                <g key={connection.id}>
                  <path
                    d={`M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`}
                    stroke="#06b6d4"
                    strokeWidth="2"
                    fill="none"
                    className={connection.animated ? 'animate-pulse' : ''}
                  />
                  {/* Arrow head */}
                  <polygon
                    points={`${endX-8},${endY-4} ${endX},${endY} ${endX-8},${endY+4}`}
                    fill="#06b6d4"
                  />
                  {/* Data flow animation */}
                  {connection.animated && (
                    <circle r="3" fill="#06b6d4" className="opacity-75">
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

          {/* Components */}
          {components.map((component) => {
            const Icon = component.icon;
            const screenPos = getComponentScreenPosition(component);
            const isSelected = selectedComponent === component.id;
            const isHovered = hoveredComponent === component.id;
            
            return (
              <div
                key={component.id}
                className={`absolute bg-gray-800 rounded-lg border-2 transition-all duration-200 cursor-pointer select-none ${
                  isSelected 
                    ? 'border-teal-400 shadow-lg shadow-teal-400/25' 
                    : isHovered 
                    ? 'border-gray-500 shadow-lg' 
                    : 'border-gray-600 hover:border-gray-500'
                }`}
                style={{
                  left: screenPos.x,
                  top: screenPos.y,
                  width: '120px',
                  height: '80px',
                  transform: isSelected ? 'scale(1.05)' : 'scale(1)'
                }}
                onMouseDown={(e) => handleComponentMouseDown(e, component.id)}
                onMouseEnter={() => setHoveredComponent(component.id)}
                onMouseLeave={() => setHoveredComponent(null)}
              >
                <div className="p-3 h-full flex flex-col">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className={`w-6 h-6 ${component.color} rounded flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-xs font-medium text-white truncate">{component.name}</span>
                  </div>
                  
                  <div className="flex-1 flex items-center justify-between text-xs text-gray-400">
                    <span>{component.category}</span>
                  </div>

                  {/* Connection Points */}
                  {component.inputs > 0 && (
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1">
                      {Array.from({ length: component.inputs }).map((_, index) => (
                        <div
                          key={`input-${index}`}
                          className="w-3 h-3 bg-gray-600 border-2 border-gray-400 rounded-full mb-1 hover:bg-teal-400 hover:border-teal-400 transition-colors cursor-pointer"
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
                          className="w-3 h-3 bg-gray-600 border-2 border-gray-400 rounded-full mb-1 hover:bg-teal-400 hover:border-teal-400 transition-colors cursor-pointer"
                          onClick={() => connectionMode && handleConnectionStart(component.id, index)}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Component Actions */}
                {isSelected && (
                  <div className="absolute -top-8 right-0 flex space-x-1">
                    <button className="w-6 h-6 bg-gray-700 hover:bg-gray-600 rounded text-white flex items-center justify-center">
                      <Settings className="w-3 h-3" />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setComponents(prev => prev.filter(c => c.id !== component.id));
                        setConnections(prev => prev.filter(c => 
                          c.from.componentId !== component.id && c.to.componentId !== component.id
                        ));
                      }}
                      className="w-6 h-6 bg-red-600 hover:bg-red-700 rounded text-white flex items-center justify-center"
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
              <div className="text-center text-gray-500">
                <Plus className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-medium mb-2">Start Building Your Workflow</h3>
                <p className="text-sm">Drag components from the library to create your AI agent workflow</p>
              </div>
            </div>
          )}
        </div>

        {/* Status Bar */}
        <div className="bg-gray-800 border-t border-gray-700 px-4 py-2 flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center space-x-4">
            <span>Components: {components.length}</span>
            <span>Connections: {connections.length}</span>
            <span>Zoom: {Math.round(zoom * 100)}%</span>
          </div>
          <div className="flex items-center space-x-2">
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