'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { MONTHLY_ACTIVITY_TRENDS } from '@/lib/data/dashboard-stats';

export function ParticipationTrendChart() {
  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={MONTHLY_ACTIVITY_TRENDS}
          margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} />
          <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-slate-900 text-white p-2.5 rounded-lg text-xs shadow-lg border border-slate-800 space-y-1">
                    <p className="font-bold text-slate-200">{data.month} 2025</p>
                    <p className="text-emerald-400">
                      Community Participants: <strong>{data.participants}</strong>
                    </p>
                    <p className="text-blue-400">
                      Activities Executed: <strong>{data.activities}</strong>
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
          <Line
            type="monotone"
            dataKey="participants"
            name="Community Participants"
            stroke="#15803d"
            strokeWidth={2.5}
            dot={{ r: 4, fill: '#15803d' }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="activities"
            name="Activities Organized"
            stroke="#0284c7"
            strokeWidth={2}
            strokeDasharray="4 4"
            dot={{ r: 3, fill: '#0284c7' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
