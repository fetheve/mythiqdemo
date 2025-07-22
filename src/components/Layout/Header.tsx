import React from 'react';
import { Bell, Search, User, ChevronDown, Wifi, Shield, Activity } from 'lucide-react';
import { currentUser, alerts } from '../../data/mockData';

export default function Header() {
  const unreadAlerts = alerts.filter(alert => !alert.acknowledged).length;

  return (
    <header className="glass-dark border-b border-white/10 px-6 py-4 relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search devices, alerts, workflows..."
              className="glass border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500/50 w-80 smooth-transition"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* System Status */}
          <div className="flex items-center space-x-3 px-4 py-2 glass rounded-xl border border-white/10">
            <div className="flex items-center space-x-2">
              <Wifi className="w-4 h-4 text-green-400" />
              <span className="text-xs text-gray-300 font-light">Connected</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span className="text-xs text-gray-300 font-light">Secure</span>
            </div>
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-gray-300 font-light">Operational</span>
            </div>
          </div>

          {/* Notifications */}
          <button className="relative p-3 text-gray-400 hover:text-white glass rounded-xl border border-white/10 hover:border-cyan-500/30 smooth-transition hover-lift micro-bounce">
            <Bell className="w-5 h-5" />
            {unreadAlerts > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium glow-pink">
                {unreadAlerts}
              </span>
            )}
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-3 px-4 py-2 glass rounded-xl border border-white/10 cursor-pointer hover:border-cyan-500/30 smooth-transition hover-lift">
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full border-2 border-cyan-500/30"
              />
            ) : (
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            )}
            <div className="text-sm">
              <p className="text-white font-medium">{currentUser.name}</p>
              <p className="text-gray-400 capitalize font-light">{currentUser.role}</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Decorative gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
    </header>
  );
}