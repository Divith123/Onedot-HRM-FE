'use client';

import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { TrendingUp, Users, FileText, BarChart3, ArrowUpRight, ChevronDown } from 'lucide-react';

interface StatCard {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: number;
  color: string;
}

interface ActivityMetric {
  label: string;
  value: string;
  icon: React.ReactNode;
}

export default function Dashboard() {
  const statCards: StatCard[] = [
    {
      title: 'Applied Jobs',
      value: '932',
      icon: <FileText className="w-8 h-8" />,
      trend: 10,
      color: 'bg-blue-500',
    },
    {
      title: 'Interviewed',
      value: '932',
      icon: <Users className="w-8 h-8" />,
      color: 'bg-cyan-500',
    },
    {
      title: 'Assessment',
      value: '932',
      icon: <BarChart3 className="w-8 h-8" />,
      color: 'bg-orange-500',
    },
    {
      title: 'Shortlisted',
      value: '932',
      icon: <FileText className="w-8 h-8" />,
      color: 'bg-yellow-500',
    },
  ];

  const activityMetrics: ActivityMetric[] = [
    {
      label: 'Projects',
      value: '3',
      icon: <FileText className="w-6 h-6 text-orange-500" />,
    },
    {
      label: 'Requests',
      value: '3456',
      icon: <BarChart3 className="w-6 h-6 text-purple-500" />,
    },
    {
      label: 'Users',
      value: '3',
      icon: <Users className="w-6 h-6 text-blue-500" />,
    },
    {
      label: 'Storage',
      value: '128/500 GB',
      icon: <BarChart3 className="w-6 h-6 text-pink-500" />,
    },
  ];

  const chartData = [
    { month: 'Jan', value: 40 },
    { month: 'Feb', value: 35 },
    { month: 'Mar', value: 45 },
    { month: 'Apr', value: 38 },
    { month: 'May', value: 42 },
    { month: 'Jun', value: 65 },
    { month: 'Jul', value: 52 },
    { month: 'Aug', value: 40 },
    { month: 'Sep', value: 45 },
    { month: 'Oct', value: 38 },
    { month: 'Nov', value: 48 },
  ];

  const maxValue = Math.max(...chartData.map(d => d.value));

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 mt-1">Welcome back! Here's your recruitment overview.</p>
          </div>
        </div>

        {/* Key Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{card.title}</p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-2">{card.value}</h3>
                </div>
                <div className={`${card.color} p-3 rounded-lg text-white`}>
                  {card.icon}
                </div>
              </div>
              {card.trend && (
                <div className="flex items-center gap-2 mt-4 text-green-600">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-sm font-medium">+{card.trend}%</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Activity Metrics and Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Activity Stats */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Activity Metrics</h2>
              <div className="space-y-4">
                {activityMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      {metric.icon}
                      <span className="text-gray-700 font-medium">{metric.label}</span>
                    </div>
                    <span className="font-bold text-gray-900">{metric.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* View All Link */}
            <div className="mt-4">
              <button className="text-blue-600 font-medium text-sm hover:text-blue-700 flex items-center gap-1">
                View All
                <span>→</span>
              </button>
            </div>
          </div>

          {/* Right Column - Application Trends */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Total Applications</h2>
                  <p className="text-gray-500 text-sm mt-1">Growth trends</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <h3 className="text-2xl font-bold text-gray-900">345,678</h3>
                    <p className="text-gray-500 text-xs">Total Applications</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">New Applications</p>
                    <p className="text-lg font-bold text-green-600">49 ↑</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Growth</p>
                    <p className="text-lg font-bold text-gray-900">+10%</p>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Bar Chart */}
              <div className="flex items-end justify-between gap-3 h-64 py-6 px-2">
                {chartData.map((data, index) => (
                  <div key={index} className="flex flex-col items-center gap-2 flex-1">
                    <div className="w-full flex flex-col items-center">
                      <div className="w-full max-w-8 bg-linear-to-t from-cyan-400 to-cyan-300 rounded-t" style={{
                        height: `${(data.value / maxValue) * 200}px`,
                        minHeight: '4px',
                      }}></div>
                    </div>
                    <span className="text-xs text-gray-600 font-medium">{data.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity and AI Improvements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <p>• New application from John Doe</p>
                  <p>• Interview scheduled with Sarah Smith</p>
                  <p>• Assessment completed by Mike Johnson</p>
                </div>
              </div>

              {/* AI Improvements */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">AI Improvements</h3>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    156%
                  </span>
                </div>
                <p className="text-gray-600 text-sm mt-4">
                  AI-powered features have improved application processing by 156%.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-linear-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Need help?</h3>
              <p className="text-blue-100">Contact our support team for assistance</p>
            </div>
            <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
