/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  ReferenceLine,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { TrendingUp, Users, Calendar, ArrowUpRight, ArrowDownRight, PieChart as PieChartIcon } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind class merging
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const RIDERSHIP_DATA = [
  { date: '01-01', ridership: 1489583, day: '週四' },
  { date: '01-02', ridership: 2310694, day: '週五' },
  { date: '01-03', ridership: 1836663, day: '週六' },
  { date: '01-04', ridership: 1548739, day: '週日' },
  { date: '01-05', ridership: 2190041, day: '週一' },
  { date: '01-06', ridership: 2234367, day: '週二' },
  { date: '01-07', ridership: 2256724, day: '週三' },
  { date: '01-08', ridership: 2265536, day: '週四' },
  { date: '01-09', ridership: 2448994, day: '週五' },
  { date: '01-10', ridership: 1985047, day: '週六' },
  { date: '01-11', ridership: 1609877, day: '週日' },
  { date: '01-12', ridership: 2149515, day: '週一' },
  { date: '01-13', ridership: 2228287, day: '週二' },
  { date: '01-14', ridership: 2252260, day: '週三' },
  { date: '01-15', ridership: 2266285, day: '週四' },
  { date: '01-16', ridership: 2439993, day: '週五' },
  { date: '01-17', ridership: 1959531, day: '週六' },
  { date: '01-18', ridership: 1647968, day: '週日' },
  { date: '01-19', ridership: 2163946, day: '週一' },
  { date: '01-20', ridership: 2290779, day: '週二' },
  { date: '01-21', ridership: 2207394, day: '週三' },
  { date: '01-22', ridership: 2222868, day: '週四' },
  { date: '01-23', ridership: 2426767, day: '週五' },
  { date: '01-24', ridership: 1948046, day: '週六' },
  { date: '01-25', ridership: 1696090, day: '週日' },
  { date: '01-26', ridership: 2174439, day: '週一' },
  { date: '01-27', ridership: 2214062, day: '週二' },
  { date: '01-28', ridership: 2224418, day: '週三' },
  { date: '01-29', ridership: 2305674, day: '週四' },
  { date: '01-30', ridership: 2436892, day: '週五' },
  { date: '01-31', ridership: 1994368, day: '週六' },
];

const COLORS = [
  '#4f46e5', // Indigo 600
  '#06b6d4', // Cyan 500
  '#10b981', // Emerald 500
  '#f59e0b', // Amber 500
  '#ef4444', // Red 500
  '#8b5cf6', // Violet 500
  '#ec4899', // Pink 500
];

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-US').format(num);
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white/90 backdrop-blur-md border border-slate-200 p-4 rounded-xl shadow-xl">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
          1月 {label.split('-')[1]}日 ({data.day})
        </p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-indigo-500" />
          <p className="text-lg font-bold text-slate-900">
            {formatNumber(payload[0].value)}
          </p>
        </div>
        <p className="text-xs text-slate-400 mt-1">每日客運量</p>
      </div>
    );
  }
  return null;
};

export default function App() {
  const stats = useMemo(() => {
    const total = RIDERSHIP_DATA.reduce((acc, curr) => acc + curr.ridership, 0);
    const avg = Math.round(total / RIDERSHIP_DATA.length);
    const max = Math.max(...RIDERSHIP_DATA.map(d => d.ridership));
    const min = Math.min(...RIDERSHIP_DATA.map(d => d.ridership));
    
    return { total, avg, max, min };
  }, []);

  const dayOfWeekData = useMemo(() => {
    const days = ['週一', '週二', '週三', '週四', '週五', '週六', '週日'];
    const grouped = RIDERSHIP_DATA.reduce((acc, curr) => {
      acc[curr.day] = (acc[curr.day] || 0) + curr.ridership;
      return acc;
    }, {} as Record<string, number>);

    return days.map(day => ({
      name: day,
      value: grouped[day] || 0
    }));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">運量數據分析</h1>
              <p className="text-xs text-slate-500 font-medium">2026年1月 概覽</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
              <Calendar className="w-3.5 h-3.5" />
              <span>2026年1月1日 - 1月31日</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard 
            title="總運量" 
            value={formatNumber(stats.total)} 
            icon={<Users className="w-5 h-5" />}
            trend="+12.5%"
            isPositive={true}
          />
          <StatCard 
            title="日均運量" 
            value={formatNumber(stats.avg)} 
            icon={<TrendingUp className="w-5 h-5" />}
            trend="+3.2%"
            isPositive={true}
          />
          <StatCard 
            title="最高運量日" 
            value={formatNumber(stats.max)} 
            icon={<ArrowUpRight className="w-5 h-5" />}
            trend="1月09日"
            isPositive={true}
            trendLabel="日期"
          />
          <StatCard 
            title="最低運量日" 
            value={formatNumber(stats.min)} 
            icon={<ArrowDownRight className="w-5 h-5" />}
            trend="1月01日"
            isPositive={false}
            trendLabel="日期"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main Chart Section */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">每日運量趨勢</h2>
                <p className="text-sm text-slate-500">視覺化全月客運量變化</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold uppercase tracking-wider">
                  <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                  即時數據
                </div>
              </div>
            </div>
            
            <div className="p-6 h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={RIDERSHIP_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRidership" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    dy={10}
                    tickFormatter={(val) => `1/${val.split('-')[1]}`}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine y={stats.avg} label={{ value: '平均', position: 'right', fill: '#94a3b8', fontSize: 10 }} stroke="#94a3b8" strokeDasharray="3 3" />
                  <Area 
                    type="monotone" 
                    dataKey="ridership" 
                    stroke="#4f46e5" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorRidership)" 
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart Section */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-100">
              <div className="flex items-center gap-2 mb-1">
                <PieChartIcon className="w-4 h-4 text-indigo-600" />
                <h2 className="text-lg font-bold text-slate-900">依星期分組</h2>
              </div>
              <p className="text-sm text-slate-500">總運量分佈比例</p>
            </div>
            <div className="flex-1 p-6 flex flex-col items-center justify-center min-h-[350px]">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dayOfWeekData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    animationDuration={1500}
                  >
                    {dayOfWeekData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [formatNumber(value), '總運量']}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    iconType="circle"
                    formatter={(value) => <span className="text-xs font-medium text-slate-600">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 w-full space-y-2">
                {dayOfWeekData.map((item, idx) => (
                  <div key={item.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                      <span className="text-slate-600 font-medium">{item.name}</span>
                    </div>
                    <span className="text-slate-900 font-bold">
                      {((item.value / stats.total) * 100).toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Data Table / List */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900">詳細數據日誌</h2>
            <p className="text-sm text-slate-500">1月份原始運量數據</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">日期</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">星期</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">運量</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">狀態</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {RIDERSHIP_DATA.slice().reverse().map((row, idx) => (
                  <tr key={row.date} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">1月 {row.date.split('-')[1]}日</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{row.day}</td>
                    <td className="px-6 py-4 text-sm font-mono font-medium text-slate-700">{formatNumber(row.ridership)}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                        row.ridership > stats.avg 
                          ? "bg-emerald-50 text-emerald-700" 
                          : "bg-amber-50 text-amber-700"
                      )}>
                        {row.ridership > stats.avg ? '高於平均' : '低於平均'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, icon, trend, isPositive, trendLabel = "趨勢" }: { 
  title: string; 
  value: string; 
  icon: React.ReactNode; 
  trend: string;
  isPositive: boolean;
  trendLabel?: string;
}) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-slate-50 rounded-xl text-slate-600">
          {icon}
        </div>
        <div className={cn(
          "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg",
          isPositive ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"
        )}>
          {trend}
          <span className="text-[10px] font-medium opacity-70 ml-0.5">{trendLabel}</span>
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{value}</h3>
      </div>
    </div>
  );
}
