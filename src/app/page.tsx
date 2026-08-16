'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { TRAITS } from '@/data/traits';
import { TraitId, TraitInfo } from '@/types/test';
import CharacterAvatar from '@/components/CharacterAvatar';
import TraitModal from '@/components/TraitModal';
import AdBanner from '@/components/AdBanner';
import { Sparkles, ArrowRight, ShieldCheck, HeartHandshake, Flame, BookOpen, AlertCircle } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [nickname, setNickname] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [selectedTrait, setSelectedTrait] = useState<TraitInfo | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleStartTest = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = nickname.trim();

    if (!trimmed) {
      setErrorMessage('테스트에 사용할 닉네임을 입력해 주세요!');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      inputRef.current?.focus();
      return;
    }

    if (trimmed.length < 2) {
      setErrorMessage('닉네임은 최소 2글자 이상 입력해 주세요.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      inputRef.current?.focus();
      return;
    }

    setErrorMessage('');
    localStorage.setItem('bdsm_nickname', trimmed);
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

        {/* Start Form (Mandatory Nickname) */}
        <form
          onSubmit={handleStartTest}
          className={`w-full max-w-sm flex flex-col gap-3.5 p-5 rounded-3xl bg-slate-900/90 border shadow-2xl backdrop-blur-md transition-all ${
            errorMessage ? 'border-rose-500/80 shadow-rose-950/40' : 'border-slate-800'
          } ${isShaking ? 'animate-bounce' : ''}`}
        >
          <div className="flex flex-col text-left">
            <label
              htmlFor="nickname"
              className="text-xs font-bold text-slate-200 mb-1.5 flex items-center justify-between"
            >
              <span>테스트에 사용할 닉네임</span>
              <span className="text-[11px] text-rose-400 font-semibold">* 필수 입력</span>
            </label>
            <input
              ref={inputRef}
              id="nickname"
              type="text"
              required
              placeholder="닉네임을 2~10자 이내로 입력하세요"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              maxLength={10}
              className={`w-full px-4 py-3 rounded-2xl bg-slate-950 border text-white placeholder-slate-500 text-sm focus:outline-none transition-colors ${
                errorMessage
                  ? 'border-rose-500 focus:border-rose-400'
                  : 'border-slate-700/80 focus:border-purple-500'
              }`}
            />
            {errorMessage && (
              <div className="flex items-center gap-1 text-xs text-rose-400 mt-1.5 animate-in fade-in">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
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
