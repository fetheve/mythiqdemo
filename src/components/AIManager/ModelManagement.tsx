import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Upload, 
  Download, 
  Settings, 
  Play, 
  Eye, 
  Star, 
  Clock, 
  Cpu, 
  Database,
  Brain,
  Zap,
  CheckCircle,
  AlertTriangle,
  MoreVertical
} from 'lucide-react';

export default function ModelManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [modelName, setModelName] = useState('');
  const [modelType, setModelType] = useState('classification');

  const pretrainedModels = [
    {
      id: 1,
      name: 'Anomaly Detection',
      category: 'Predictive',
      description: 'Detect manufacturing anomalies and defects in real-time with this pre-trained model optimized for production lines.',
      rating: 4.8,
      downloads: '12k',
      type: 'predictive',
      status: 'available'
    },
    {
      id: 2,
      name: 'Predictive Maintenance',
      category: 'Time-series',
      description: 'Predict equipment failures before they happen with this time-series analysis model for manufacturing environments.',
      rating: 4.9,
      downloads: '8.7k',
      type: 'predictive',
      status: 'available'
    },
    {
      id: 3,
      name: 'Quality Control',
      category: 'Vision',
      description: 'Computer vision model for automating visual quality inspections in manufacturing production lines.',
      rating: 4.7,
      downloads: '15k',
      type: 'vision',
      status: 'available'
    }
  ];

  const marketplaceModels = [
    {
      id: 1,
      name: 'Smart Maintenance Pro',
      category: 'Predictive Maintenance',
      rating: 4.5,
      description: 'AI-powered predictive maintenance model with 94.5% accuracy for industrial equipment.',
      price: 'Premium',
      provider: 'TechCorp AI'
    },
    {
      id: 2,
      name: 'QualityVision AI',
      category: 'Computer Vision',
      rating: 4.7,
      description: 'Visual inspection model optimized for manufacturing quality control processes.',
      price: 'Free',
      provider: 'VisionTech'
    },
    {
      id: 3,
      name: 'Energy Optimizer',
      category: 'Optimization',
      rating: 4.6,
      description: 'Edge-optimized model for real-time energy consumption optimization in manufacturing.',
      price: 'Beta',
      provider: 'GreenAI'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories', count: 24 },
    { id: 'predictive', name: 'Predictive Maintenance', count: 8 },
    { id: 'quality', name: 'Quality Control', count: 6 },
    { id: 'vision', name: 'Computer Vision', count: 5 },
    { id: 'energy', name: 'Energy Optimization', count: 3 },
    { id: 'process', name: 'Process Automation', count: 2 }
  ];

  const cicdSteps = [
    { name: 'Build', status: 'completed', time: '2 min ago', color: 'text-green-400' },
    { name: 'Test', status: 'completed', time: '1 min ago', color: 'text-green-400' },
    { name: 'Deploy', status: 'in-progress', time: 'In progress', color: 'text-blue-400' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">AI Model Management</h2>
          <p className="text-gray-400">Build, train, and deploy AI models without code</p>
        </div>
        <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="w-4 h-4" />
          <span>New Model</span>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-800 rounded-lg p-1">
        {['Models', 'Training', 'Marketplace', 'Deployment', 'CI/CD Pipeline'].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              tab === 'Models' 
                ? 'bg-gray-700 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search models..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pre-trained Model Templates */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Pre-trained Model Templates</h3>
              <button className="text-teal-400 text-sm hover:text-teal-300">View All Templates</button>
            </div>
            <div className="space-y-4">
              {pretrainedModels.map((model) => (
                <div key={model.id} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${
                        model.type === 'predictive' ? 'bg-blue-600 text-white' :
                        model.type === 'vision' ? 'bg-purple-600 text-white' : 'bg-green-600 text-white'
                      }`}>
                        {model.category.charAt(0)}
                      </div>
                      <span className="text-white font-medium text-sm">{model.name}</span>
                    </div>
                    <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">{model.category}</span>
                  </div>
                  <p className="text-gray-400 text-xs mb-3">{model.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-xs text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-400" />
                        <span>{model.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Download className="w-3 h-3" />
                        <span>{model.downloads}</span>
                      </div>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs transition-colors">
                      Use Template
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-sm transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-teal-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <span>{category.name}</span>
                  <span className="text-xs">{category.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Edge Compatible */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center space-x-2 mb-2">
              <Cpu className="w-4 h-4 text-teal-400" />
              <span className="text-white font-medium">Edge Compatible</span>
            </div>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-gray-600 bg-gray-700 text-teal-600" />
              <span className="text-gray-400 text-sm">Show only edge-optimized models</span>
            </label>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Custom Model Upload */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Custom Model Upload</h3>
              <button className="text-teal-400 text-sm hover:text-teal-300">Upload History</button>
            </div>
            
            {/* Upload Area */}
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center mb-6">
              <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <h4 className="text-white font-medium mb-2">Drag and drop your model files</h4>
              <p className="text-gray-400 text-sm mb-4">Support for TensorFlow, PyTorch, ONNX, and custom formats</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                Browse Files
              </button>
            </div>

            {/* Model Configuration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Model Name</label>
                <input
                  type="text"
                  placeholder="Enter model name"
                  value={modelName}
                  onChange={(e) => setModelName(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Model Type</label>
                <select
                  value={modelType}
                  onChange={(e) => setModelType(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="classification">Classification</option>
                  <option value="regression">Regression</option>
                  <option value="detection">Object Detection</option>
                  <option value="segmentation">Segmentation</option>
                </select>
              </div>
            </div>
          </div>

          {/* Model Configuration */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-6">Model Configuration</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Federated Learning */}
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Database className="w-5 h-5 text-blue-400" />
                    <span className="text-white font-medium">Federated Learning</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                  </label>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Edge Devices</span>
                    <span className="text-white">12 Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Aggregation Method</span>
                    <span className="text-white">FedAvg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Privacy Level</span>
                    <span className="text-white">Standard</span>
                  </div>
                </div>
                <button className="w-full mt-3 bg-gray-600 hover:bg-gray-500 text-white py-2 rounded text-sm transition-colors">
                  Configure
                </button>
              </div>

              {/* Edge Optimization */}
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Cpu className="w-5 h-5 text-orange-400" />
                    <span className="text-white font-medium">Edge Optimization</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                  </label>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Quantization</span>
                    <span className="text-white">INT8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Pruning Level</span>
                    <span className="text-white">30%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Target Device</span>
                    <span className="text-white">Nvidia Jetson</span>
                  </div>
                </div>
                <button className="w-full mt-3 bg-gray-600 hover:bg-gray-500 text-white py-2 rounded text-sm transition-colors">
                  Configure
                </button>
              </div>

              {/* CI/CD Pipeline */}
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Settings className="w-5 h-5 text-green-400" />
                    <span className="text-white font-medium">CI/CD Pipeline</span>
                  </div>
                  <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">Active</span>
                </div>
                <div className="space-y-2">
                  {cicdSteps.map((step, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {step.status === 'completed' ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : step.status === 'in-progress' ? (
                          <Clock className="w-4 h-4 text-blue-400 animate-spin" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-gray-500" />
                        )}
                        <span className={`text-sm ${step.color}`}>{step.name}</span>
                      </div>
                      <span className="text-xs text-gray-400">{step.time}</span>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </div>

          {/* AI Model Marketplace */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">AI Model Marketplace</h3>
              <button className="text-teal-400 text-sm hover:text-teal-300">Browse All Models</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {marketplaceModels.map((model) => (
                <div key={model.id} className="bg-gray-700 rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Brain className="w-5 h-5 text-teal-400" />
                      <span className="text-white font-medium text-sm">{model.name}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      model.price === 'Free' ? 'bg-green-600 text-white' :
                      model.price === 'Beta' ? 'bg-purple-600 text-white' : 'bg-blue-600 text-white'
                    }`}>
                      {model.price}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400" />
                      <span className="text-white text-sm">{model.rating}</span>
                    </div>
                    <span className="text-gray-400 text-xs">by {model.provider}</span>
                  </div>
                  
                  <p className="text-gray-400 text-xs mb-4">{model.description}</p>
                  
                  <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded text-sm transition-colors">
                    Deploy Model
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}