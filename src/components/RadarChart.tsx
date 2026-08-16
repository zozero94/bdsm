'use client';

import { useMemo } from 'react';
import {
  Radar,
  RadarChart as RechartsRadar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts';
import { TraitId } from '@/types/test';
import { TRAITS } from '@/data/traits';
import { ALL_TRAITS } from '@/lib/calculate';

interface RadarChartProps {
  scores: Record<TraitId, number>;
}

export default function RadarChart({ scores }: RadarChartProps) {
  // 18대 성향 전체 축 데이터 메모이제이션
  const data = useMemo(() => {
    return ALL_TRAITS.map((tId) => ({
      subject: TRAITS[tId]?.shortName || tId,
      value: scores[tId] || 0,
      fullMark: 100
    }));
  }, [scores]);

  return (
    <div className="w-full h-72 sm:h-80 flex items-center justify-center -my-2">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadar cx="50%" cy="50%" outerRadius="68%" data={data}>
          <PolarGrid stroke="#334155" strokeDasharray="3 3" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 500 }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={false}
            axisLine={false}
          />
          <Radar
            name="내 성향"
            dataKey="value"
            stroke="#a855f7"
            strokeWidth={2.5}
            fill="#a855f7"
            fillOpacity={0.35}
            dot={{ r: 2.5, fill: '#ec4899', strokeWidth: 1.5 }}
          />
        </RechartsRadar>
      </ResponsiveContainer>
    </div>
  );
}
