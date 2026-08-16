'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TRAITS } from '@/data/traits';
import { TraitId, TraitInfo } from '@/types/test';
import CharacterAvatar from '@/components/CharacterAvatar';
import TraitModal from '@/components/TraitModal';
import AdBanner from '@/components/AdBanner';
import { Sparkles, ArrowRight, ShieldCheck, HeartHandshake, Flame, BookOpen } from 'lucide-react';

const RANDOM_NICKNAMES = [
  '호기심많은 고양이',
  '용감한 흑표범',
  '포근한 햄스터',
  '매혹적인 여우',
  '자유로운 카멜레온',
  '따스한 아빠곰',
  '귀여운 라쿤',
  '달빛 아래 늑대'
];

export default function HomePage() {
  const router = useRouter();
  const [nickname, setNickname] = useState('');
  const [selectedTrait, setSelectedTrait] = useState<TraitInfo | null>(null);

  const handleStartTest = (e: React.FormEvent) => {
    e.preventDefault();
    const finalNickname =
      nickname.trim() ||
      RANDOM_NICKNAMES[Math.floor(Math.random() * RANDOM_NICKNAMES.length)];
    localStorage.setItem('bdsm_nickname', finalNickname);
    router.push('/test');
  };

  const traitList = Object.values(TRAITS);

  return (
    <div className="flex flex-col gap-6 items-center">
      {/* Top Ad Banner */}
      <AdBanner slot="home_top_banner" />

      {/* Hero Section */}
      <div className="w-full flex flex-col items-center text-center pt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-900/40 border border-purple-700/50 text-purple-300 text-xs font-semibold mb-4 animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          <span>2026 최신 18가지 BDSM 동물 성향 분석</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white mb-3">
          내 안의 숨겨진 본능,
          <br />
          <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            어떤 동물 캐릭터일까?
          </span>
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 max-w-xs leading-relaxed mb-6">
          18가지 정밀 성향 지표와 귀여운 캐릭터로 알아보는 솔직한 내 취향! 나와 찰떡인 케미와 상극 성향까지 완벽 분석해 드립니다.
        </p>

        {/* Character Floating Preview */}
        <div className="flex items-center justify-center -space-x-3 mb-8">
          {['dominant', 'submissive', 'sadist', 'masochist', 'switch', 'master', 'brat', 'spanker'].map(
            (tId) => (
              <div
                key={tId}
                onClick={() => setSelectedTrait(TRAITS[tId as TraitId])}
                className="hover:-translate-y-2 transition-transform duration-300 cursor-pointer"
              >
                <CharacterAvatar
                  traitId={tId as TraitId}
                  size="sm"
                  className="border-2 border-slate-950 rounded-full shadow-lg"
                />
              </div>
            )
          )}
        </div>

        {/* Start Form */}
        <form
          onSubmit={handleStartTest}
          className="w-full max-w-sm flex flex-col gap-3.5 p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-md"
        >
          <div className="flex flex-col text-left">
            <label
              htmlFor="nickname"
              className="text-xs font-bold text-slate-200 mb-1.5 flex items-center justify-between"
            >
              <span>테스트에 사용할 닉네임 입력</span>
              <span className="text-[10px] text-purple-400 font-medium">
                미입력 시 귀여운 랜덤 닉네임 자동 생성
              </span>
            </label>
            <input
              id="nickname"
              type="text"
              placeholder="예: 냥이, 카리스마표범, 탐험가"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              maxLength={10}
              className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-base shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>무료 성향 테스트 시작하기</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="flex items-center gap-4 text-[11px] text-slate-400 mt-4">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            익명성 100% 보장
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            소요시간 약 2~3분
          </span>
        </div>
      </div>

      {/* 18 Traits Preview Showcase with Modal Trigger */}
      <div className="w-full mt-4 rounded-3xl bg-slate-900/60 border border-slate-800/80 p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-purple-400" />
            <h2 className="text-sm font-bold text-white">
              18가지 BDSM 동물 캐릭터 도감
            </h2>
          </div>
          <span className="text-[10px] text-slate-400">
            카드를 누르면 상세 설명 팝업
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {traitList.map((trait) => (
            <div
              key={trait.id}
              onClick={() => setSelectedTrait(trait)}
              className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex flex-col items-center text-center gap-1.5 hover:border-purple-500/60 hover:bg-slate-900/80 transition-all cursor-pointer group shadow"
            >
              <span className="text-2xl filter drop-shadow group-hover:scale-110 transition-transform">
                {trait.emoji}
              </span>
              <span className="text-xs font-bold text-slate-200 group-hover:text-purple-300">
                {trait.shortName}
              </span>
              <span className="text-[9px] text-slate-400 line-clamp-1">
                {trait.animal}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Ad Banner */}
      <AdBanner slot="home_bottom_banner" />

      {/* Trait Detail Modal */}
      <TraitModal trait={selectedTrait} onClose={() => setSelectedTrait(null)} />
    </div>
  );
}
