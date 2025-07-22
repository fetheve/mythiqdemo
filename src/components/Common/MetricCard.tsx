import React from 'react';
import { DivideIcon as LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: LucideIcon;
  color: 'primary' | 'success' | 'warning' | 'error' | 'info';
  subtitle?: string;
  inverse?: boolean;
}

const colorClasses = {
  primary: 'from-blue-500 to-cyan-500',
  success: 'from-emerald-500 to-green-500',
  warning: 'from-amber-500 to-orange-500',
  error: 'from-red-500 to-pink-500',
  info: 'from-cyan-500 to-blue-500',
};

const glowClasses = {
  primary: 'group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]',
  success: 'group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]',
  warning: 'group-hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]',
  error: 'group-hover:shadow-[0_0_30px_rgba(239,68,68,0.3)]',
  info: 'group-hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]',
};

export default function MetricCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  color, 
  subtitle,
  inverse = false 
}: MetricCardProps) {
  const isPositive = inverse ? change < 0 : change > 0;
  const isNeutral = change === 0;

  return (
    <div className="metric-card group floating">
      {/* Gradient border effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${colorClasses[color]} opacity-0 group-hover:opacity-10 rounded-2xl blur-xl transition-all duration-500 ${glowClasses[color]}`}></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className={`icon-container bg-gradient-to-r ${colorClasses[color]} shadow-lg`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          {!isNeutral && (
            <div className={`status-indicator ${
              isPositive ? 'status-success' : 'status-error'
            }`}>
              {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              <span>{Math.abs(change)}%</span>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          {subtitle && (
            <p className="text-gray-500 text-xs">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}