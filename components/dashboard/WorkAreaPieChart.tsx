'use client';

import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { SECTOR_ALLOCATION } from '@/lib/data/dashboard-stats';

export function WorkAreaPieChart() {
  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-slate-900 text-white p-2.5 rounded-lg text-xs shadow-lg border border-slate-800">
                    <p className="font-semibold">{data.name}</p>
                    <p className="text-emerald-400 mt-0.5">
                      Initiative Allocation: <strong>{data.value}%</strong>
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
          />
          <Pie
            data={SECTOR_ALLOCATION}
            cx="50%"
            cy="45%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={3}
            dataKey="value"
          >
            {SECTOR_ALLOCATION.map((entry, index) => (
              <Cell key={`pie-cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
