import React from 'react';
import { 
  LayoutDashboard, 
  HardDrive, 
  Database, 
  Brain, 
  Workflow, 
  Plug, 
  Users,
  Bell,
  Settings,
  BarChart3,
  Factory
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navigationItems = [
  { id: 'workflows', name: 'Agent Builder', icon: Workflow },
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
  { id: 'devices', name: 'Device Manager', icon: HardDrive },
  { id: 'data', name: 'Data Manager', icon: Database },
  { id: 'ai', name: 'AI Manager', icon: Brain },
  { id: 'integrations', name: 'Integrations', icon: Plug },
  { id: 'analytics', name: 'OEE Analytics', icon: BarChart3 },
  { id: 'production-line', name: 'Production Line', icon: Factory },
  { id: 'users', name: 'User Management', icon: Users },
  { id: 'alerts', name: 'Alerts', icon: Bell, badge: 3 },
];

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <div className="w-64 glass-dark border-r border-white/10 flex flex-col relative">
      {/* Logo Section */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center">
            <img 
              src="/images/mythiqweblogo.png" 
              alt="MythIQ Logo" 
              className="w-8 h-8 object-contain"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gradient">MythIQ</h1>
            <p className="text-xs text-gray-400">Factory Intelligence Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium smooth-transition group relative overflow-hidden ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white border border-cyan-500/30 glow-cyan'
                  : 'text-gray-300 hover:text-white hover:bg-white/5 hover:border hover:border-white/10'
              }`}
            >
              {/* Hover effect background */}
              <div className={`absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 smooth-transition ${isActive ? 'opacity-100' : ''}`}></div>
              
              <div className="flex items-center space-x-3 relative z-10">
                <Icon className={`w-5 h-5 smooth-transition ${
                  isActive 
                    ? 'text-cyan-400' 
                    : 'text-gray-400 group-hover:text-cyan-400'
                }`} />
                <span className="font-light">{item.name}</span>
              </div>
              
              {item.badge && (
                <span className="bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center font-medium relative z-10 glow-pink">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Settings */}
      <div className="p-4 border-t border-white/10">
        <button className="w-full flex items-center space-x-3 px-3 py-3 rounded-xl text-sm font-light text-gray-300 hover:text-white hover:bg-white/5 smooth-transition group">
          <Settings className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 smooth-transition" />
          <span>Settings</span>
        </button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/2 -right-px w-px h-32 bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent"></div>
    </div>
  );
}