'use client';

import { Suspense, useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { decodeResultData } from '@/lib/calculate';
import { TRAITS } from '@/data/traits';
import { TraitId, TestResultData } from '@/types/test';
import CharacterAvatar from '@/components/CharacterAvatar';
import RadarChart from '@/components/RadarChart';
import ChemistryCard from '@/components/ChemistryCard';
import ShareButtons from '@/components/ShareButtons';
import AdBanner from '@/components/AdBanner';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  RotateCcw,
  Award,
  CheckCircle2,
  AlertCircle,
  Heart,
  Ban,
  Stethoscope,
  Flame,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

function ResultContent() {
  const searchParams = useSearchParams();
  const dataParam = searchParams.get('data');
  const [resultData, setResultData] = useState<TestResultData | null>(null);
  const [isError, setIsError] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const [pendingRoomId, setPendingRoomId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
      const savedRoomId = sessionStorage.getItem('bdsm_pending_room_id');
      if (savedRoomId) {
        setPendingRoomId(savedRoomId);
      }
    }

    if (dataParam) {
      const decoded = decodeResultData(dataParam);
      if (decoded) {
        setResultData(decoded);
        setIsError(false);
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {
          // ignore
        }
      } else {
        setIsError(true);
      }
    } else {
      setIsError(true);
    }
  }, [dataParam]);

  // Sorted traits memoization
  const sortedTraits = useMemo(() => {
    if (!resultData) return [];
    return (Object.keys(resultData.scores) as TraitId[]).sort(
      (a, b) => (resultData.scores[b] || 0) - (resultData.scores[a] || 0)
    );
  }, [resultData]);

  if (isError) {
    return (
      <div className="w-full py-16 flex flex-col items-center justify-center text-center gap-5">
        <div className="w-16 h-16 rounded-full bg-rose-950/60 border border-rose-800/60 flex items-center justify-center text-rose-400 shadow-xl">
          <AlertTriangle className="w-8 h-8 animate-pulse" />
        </div>
        <div className="flex flex-col gap-2 max-w-xs">
          <h2 className="text-lg font-bold text-white">
            유효하지 않거나 손상된 결과 링크입니다
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            전송 과정에서 주소가 잘렸거나 만료되었을 수 있습니다. 직접 성향 검사를 진행해 보세요!
          </p>
        </div>
        <div className="flex flex-col w-full max-w-xs gap-2.5 pt-2">
          <Link
            href="/test"
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
          >
            <span>내 BDSM 성향 검사하기</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/"
            className="w-full py-3 px-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 font-semibold text-xs hover:bg-slate-800 transition-colors"
          >
            홈으로 이동
          </Link>
        </div>
      </div>
    );
  }

  if (!resultData) {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
        <Sparkles className="w-8 h-8 text-purple-400 animate-spin" />
        <p className="text-sm">결과 데이터를 불러오는 중...</p>
      </div>
    );
  }

  const primaryTrait = TRAITS[resultData.primaryTrait] || TRAITS.dominant;
  const secondaryTrait = resultData.secondaryTrait ? TRAITS[resultData.secondaryTrait] : null;

  return (
    <div className="w-full flex flex-col gap-6 items-center">
      {/* Return to Invited Room CTA Banner (If invited via room link) */}
      {pendingRoomId && (
        <div className="w-full p-4 rounded-2xl bg-gradient-to-r from-emerald-900/70 via-teal-900/60 to-slate-900 border border-emerald-500/50 shadow-2xl flex items-center justify-between gap-3 animate-pulse">
          <div className="flex items-center gap-2.5 text-left">
            <span className="text-xl">🎉</span>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white">
                초대받은 친구 케미 룸이 있습니다!
              </span>
              <span className="text-[11px] text-emerald-300">
                지금 바로 돌아가서 내 성향 캐릭터를 등록하세요.
              </span>
            </div>
          </div>
          <Link
            href={`/room/${pendingRoomId}`}
            onClick={() => {
              if (typeof window !== 'undefined') {
                sessionStorage.removeItem('bdsm_pending_room_id');
              }
            }}
            className="flex-shrink-0 py-2 px-3.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs shadow-lg transition-transform active:scale-95 flex items-center gap-1"
          >
            <span>방으로 가기</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Top Ad Banner */}
      <AdBanner slot="result_top_banner" />

      {/* Main Result Hero Card */}
      <div className="w-full rounded-3xl bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-slate-950 border border-slate-800 p-6 sm:p-8 shadow-2xl backdrop-blur-xl flex flex-col items-center text-center relative overflow-hidden">
        <div
          className={`absolute -top-20 -left-20 w-48 h-48 rounded-full bg-gradient-to-tr ${primaryTrait.bgGradient} blur-3xl opacity-50`}
        />
        <div
          className={`absolute -bottom-20 -right-20 w-48 h-48 rounded-full bg-gradient-to-tr ${primaryTrait.bgGradient} blur-3xl opacity-50`}
        />

        <div className="relative z-10 flex flex-col items-center w-full">
          {resultData.nickname && (
            <span className="text-xs font-semibold text-slate-400 mb-1">
              {resultData.nickname}님의 BDSM 동물 성향은?
            </span>
          )}

          <span
            className={`px-3 py-1 rounded-full text-xs font-extrabold shadow-lg mb-4 ${primaryTrait.badgeColor}`}
          >
            {primaryTrait.nameKo}
          </span>

          <CharacterAvatar traitId={resultData.primaryTrait} size="xl" className="mb-4" />

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
            &quot;{primaryTrait.title}&quot;
          </h1>

          <p className="text-xs sm:text-sm font-semibold text-purple-300 mb-4 max-w-xs">
            {primaryTrait.subtitle}
          </p>

          <p className="text-xs text-slate-300 leading-relaxed max-w-sm mb-6 text-left p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80">
            {primaryTrait.description}
          </p>

          {/* Enriched Sections: Love Style */}
          <div className="w-full mb-3 p-4 rounded-2xl bg-purple-950/30 border border-purple-800/40 text-left">
            <div className="flex items-center gap-1.5 font-bold text-xs text-purple-300 mb-1.5">
              <Heart className="w-3.5 h-3.5 fill-current text-pink-400" />
              <span>연애 스타일 & 기본 심리</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {primaryTrait.loveStyle}
            </p>
          </div>

          {/* Enriched Sections: Heart Flutter Points */}
          <div className="w-full mb-3 p-4 rounded-2xl bg-pink-950/20 border border-pink-800/30 text-left">
            <div className="flex items-center gap-1.5 font-bold text-xs text-pink-300 mb-2">
              <Flame className="w-3.5 h-3.5 text-pink-400" />
              <span>이런 말과 상황에 심쿵해요! 💘</span>
            </div>
            <ul className="flex flex-col gap-1.5 text-xs text-slate-300">
              {primaryTrait.heartFlutter.map((h, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-pink-400 font-bold">•</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Enriched Sections: Red Flags */}
          <div className="w-full mb-3 p-4 rounded-2xl bg-rose-950/20 border border-rose-800/30 text-left">
            <div className="flex items-center gap-1.5 font-bold text-xs text-rose-300 mb-2">
              <Ban className="w-3.5 h-3.5 text-rose-400" />
              <span>이것만은 절대 사절! 지뢰 포인트 🚫</span>
            </div>
            <ul className="flex flex-col gap-1.5 text-xs text-slate-300">
              {primaryTrait.redFlags.map((r, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Enriched Sections: Aftercare */}
          <div className="w-full mb-4 p-4 rounded-2xl bg-teal-950/20 border border-teal-800/30 text-left">
            <div className="flex items-center gap-1.5 font-bold text-xs text-teal-300 mb-1.5">
              <Stethoscope className="w-3.5 h-3.5 text-teal-400" />
              <span>파트너를 위한 맞춤 애프터케어 가이드 🩺</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {primaryTrait.aftercare}
            </p>
          </div>

          {/* Strengths & Tips */}
          <div className="w-full grid grid-cols-1 gap-3 text-left">
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-400 mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>나의 특별한 매력 & 강점</span>
              </div>
              <ul className="flex flex-col gap-1 text-[11px] text-slate-300">
                {primaryTrait.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-500">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <div className="flex items-center gap-1.5 font-bold text-xs text-amber-400 mb-2">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>더 행복한 관계를 위한 팁</span>
              </div>
              <ul className="flex flex-col gap-1 text-[11px] text-slate-300">
                {primaryTrait.tips.map((t, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-amber-500">•</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {secondaryTrait && (
            <div className="w-full mt-4 p-3 rounded-2xl bg-purple-950/30 border border-purple-800/40 flex items-center justify-between text-left">
              <div className="flex items-center gap-2">
                <CharacterAvatar traitId={secondaryTrait.id} size="sm" />
                <div>
                  <span className="text-[10px] text-purple-400 font-bold block">
                    함께 발견된 서브 성향
                  </span>
                  <span className="text-xs font-bold text-white">
                    {secondaryTrait.nameKo} ({resultData.scores[secondaryTrait.id]}%)
                  </span>
                </div>
              </div>
              <span className="text-xs font-semibold text-purple-300">
                {secondaryTrait.animal}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Trait Radar Chart Section */}
      <div className="w-full rounded-3xl bg-slate-900/80 border border-slate-800 p-5 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-2 mb-2">
          <Award className="w-5 h-5 text-purple-400" />
          <h3 className="font-bold text-base text-white">
            나의 종합 성향 밸런스 차트
          </h3>
        </div>
        <p className="text-xs text-slate-400 mb-3">
          18개 성향 지표의 가중치 분포도를 한눈에 확인하세요.
        </p>

        <RadarChart scores={resultData.scores} />

        {/* Detailed Top 5 Ranking Bars */}
        <div className="mt-4 flex flex-col gap-2 pt-4 border-t border-slate-800">
          <span className="text-xs font-bold text-slate-300 mb-1">
            내 상위 성향 TOP 5
          </span>
          {sortedTraits.slice(0, 5).map((tId, idx) => {
            const score = resultData.scores[tId] || 0;
            const trait = TRAITS[tId];
            return (
              <div key={tId} className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-300 flex items-center gap-1.5">
                    <span className="text-slate-500 font-mono text-[10px]">#{idx + 1}</span>
                    <span>{trait?.emoji}</span>
                    <span>{trait?.shortName}</span>
                  </span>
                  <span className="font-bold text-purple-400 font-mono">{score}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-950 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Middle Ad Banner */}
      <AdBanner slot="result_middle_banner" />

      {/* Chemistry & Match Matrix Component */}
      <ChemistryCard primaryTraitId={resultData.primaryTrait} />

      {/* Sharing & Group Room CTA */}
      <ShareButtons
        primaryTraitId={resultData.primaryTrait}
        nickname={resultData.nickname}
        resultUrl={currentUrl}
        scores={resultData.scores}
      />

      {/* Retest Link */}
      <Link
        href="/test"
        className="mt-2 py-3 px-6 rounded-2xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-2 transition-colors"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        테스트 다시하기
      </Link>

      {/* Bottom Ad Banner */}
      <AdBanner slot="result_bottom_banner" className="mt-2" />
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
          <Sparkles className="w-8 h-8 text-purple-400 animate-spin" />
          <p className="text-sm">결과 데이터를 불러오는 중...</p>
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  );
}
