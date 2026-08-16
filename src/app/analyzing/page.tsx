'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { calculateTestResults, encodeResultData } from '@/lib/calculate';
import { Sparkles, Heart, Brain, Search } from 'lucide-react';
import AdBanner from '@/components/AdBanner';

const STEPS = [
  { text: '36개 문항의 가중치를 정밀 분석 중...', icon: Brain },
  { text: '18가지 동물 캐릭터와 성향을 매칭하는 중...', icon: Search },
  { text: '소울메이트 꿀케미 & 상극 성향을 계산하는 중...', icon: Heart },
  { text: '분석 완료! 결과 리포트를 불러옵니다...', icon: Sparkles }
];

export default function AnalyzingPage() {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    try {
      const rawAnswers = localStorage.getItem('bdsm_answers');
      const nickname = localStorage.getItem('bdsm_nickname') || undefined;

      if (!rawAnswers) {
        router.replace('/test');
        return;
      }

      const answersObj = JSON.parse(rawAnswers);
      const resultData = calculateTestResults(answersObj, nickname);
      const encoded = encodeResultData(resultData);

      const timer1 = setTimeout(() => setStepIndex(1), 700);
      const timer2 = setTimeout(() => setStepIndex(2), 1400);
      const timer3 = setTimeout(() => setStepIndex(3), 2100);
      const timer4 = setTimeout(() => {
        router.replace(`/result?data=${encoded}`);
      }, 2800);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
      };
    } catch (e) {
      console.error('Error during analyzing step', e);
      router.replace('/test');
    }
  }, [router]);

  const CurrentIcon = STEPS[stepIndex]?.icon || Sparkles;

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
      {/* Animated Glowing Ring */}
      <div className="relative flex items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-600 via-pink-600 to-indigo-600 animate-spin blur-xl opacity-60" />
        <div className="relative z-10 w-20 h-20 rounded-full bg-slate-900 border border-purple-500/50 flex items-center justify-center shadow-2xl">
          <CurrentIcon className="w-9 h-9 text-pink-400 animate-bounce" />
        </div>
      </div>

      <div className="flex flex-col gap-2 max-w-xs">
        <h2 className="text-xl font-bold text-white tracking-tight">
          성향 데이터를 분석 중입니다
        </h2>
        <p className="text-xs text-purple-300 font-medium h-6 animate-pulse">
          {STEPS[stepIndex]?.text}
        </p>
      </div>

      {/* Loading Progress Dots */}
      <div className="flex items-center gap-2">
        {STEPS.map((_, idx) => (
          <div
            key={idx}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === stepIndex
                ? 'w-6 bg-gradient-to-r from-purple-500 to-pink-500'
                : 'w-2 bg-slate-800'
            }`}
          />
        ))}
      </div>

      {/* Ad Banner for monetization during dwell time */}
      <AdBanner slot="analyzing_banner" className="mt-4" />
    </div>
  );
}
