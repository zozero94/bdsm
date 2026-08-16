'use client';

import { useState } from 'react';
import { TraitId } from '@/types/test';
import { TRAITS } from '@/data/traits';
import CharacterAvatar from './CharacterAvatar';
import {
  Heart,
  Zap,
  Compass,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Flame,
  Ban,
  Stethoscope
} from 'lucide-react';

interface ChemistryCardProps {
  primaryTraitId: TraitId;
}

export default function ChemistryCard({ primaryTraitId }: ChemistryCardProps) {
  const [activeTab, setActiveTab] = useState<'best' | 'worst' | 'challenge'>('best');
  const [expandedId, setExpandedId] = useState<TraitId | null>(null);

  const myTrait = TRAITS[primaryTraitId] || TRAITS.dominant;

  const targetTraitIds =
    activeTab === 'best'
      ? myTrait.bestMatches
      : activeTab === 'worst'
      ? myTrait.worstMatches
      : myTrait.challengeMatches;

  const tabConfig = {
    best: {
      label: '💖 찰떡 꿀케미',
      icon: Heart,
      badgeText: '환상의 소울메이트',
      badgeClass: 'bg-pink-500/20 text-pink-300 border-pink-500/40',
      desc: '서로의 욕구와 성향이 톱니바퀴처럼 완벽하게 맞물려 극상의 만족감을 주는 최고의 궁합입니다.'
    },
    worst: {
      label: '⚡ 주의! 불꽃 상극',
      icon: Zap,
      badgeText: '주의와 룰 필수',
      badgeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      desc: '서로 같은 포지션이나 주도권을 원해 부딪히기 쉬우며, 세심한 배려와 룰이 필요한 관계입니다.'
    },
    challenge: {
      label: '🎯 탐험! 도전 케미',
      icon: Compass,
      badgeText: '색다른 자극과 매력',
      badgeClass: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      desc: '새로운 시야를 열어주고 색다른 자극과 미지의 교감을 선사하는 흥미진진한 파트너입니다.'
    }
  };

  const handleToggle = (tId: TraitId) => {
    setExpandedId((prev) => (prev === tId ? null : tId));
  };

  return (
    <div className="w-full rounded-3xl bg-slate-900/80 border border-slate-800 p-5 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-pink-400" />
          <h3 className="text-base font-bold text-white tracking-tight">
            내 성향과의 케미 & 궁합 맵
          </h3>
        </div>
        <span className="text-[10px] text-purple-400 font-medium animate-pulse">
          카드를 누르면 상세 설명이 펼쳐집니다 👇
        </span>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-slate-950/80 border border-slate-800/80 mb-4">
        {(['best', 'worst', 'challenge'] as const).map((tab) => {
          const isActive = activeTab === tab;
          const { label } = tabConfig[tab];
          return (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setExpandedId(null); // Reset toggle when tab changes
              }}
              className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                isActive
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-600/30 scale-[1.02]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
            >
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      {/* Description */}
      <p className="text-xs text-slate-300 leading-relaxed mb-4 px-1">
        {tabConfig[activeTab].desc}
      </p>

      {/* Trait Matches Grid with Accordion Toggle */}
      <div className="flex flex-col gap-3">
        {targetTraitIds.map((targetId) => {
          const target = TRAITS[targetId];
          if (!target) return null;
          const isExpanded = expandedId === targetId;

          return (
            <div
              key={targetId}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isExpanded
                  ? 'bg-slate-950 border-purple-500/60 shadow-xl shadow-purple-950/40'
                  : 'bg-slate-950/60 border-slate-800/70 hover:border-slate-700'
              }`}
            >
              {/* Card Header (Clickable Toggle Trigger) */}
              <button
                type="button"
                onClick={() => handleToggle(targetId)}
                className="w-full p-4 flex items-center justify-between gap-3 text-left"
              >
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  <CharacterAvatar traitId={targetId} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-bold text-sm text-white truncate">
                        {target.nameKo}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full border ${tabConfig[activeTab].badgeClass}`}
                      >
                        {target.animal}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1 leading-tight">
                      {target.subtitle}
                    </p>
                  </div>
                </div>

                <div className="p-1 rounded-full bg-slate-900 text-slate-400">
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-purple-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </button>

              {/* Accordion Expanded Content */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-900 flex flex-col gap-3 text-left animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* Full Description */}
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                    {target.description}
                  </p>

                  {/* Love Style */}
                  <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-800/40">
                    <div className="flex items-center gap-1.5 font-bold text-xs text-purple-300 mb-1">
                      <Heart className="w-3.5 h-3.5 fill-current text-pink-400" />
                      <span>연애 스타일 & 기본 심리</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {target.loveStyle}
                    </p>
                  </div>

                  {/* Heart Flutter */}
                  <div className="p-3 rounded-xl bg-pink-950/20 border border-pink-800/30">
                    <div className="flex items-center gap-1.5 font-bold text-xs text-pink-300 mb-1.5">
                      <Flame className="w-3.5 h-3.5 text-pink-400" />
                      <span>이 성향이 심쿵하는 포인트 💘</span>
                    </div>
                    <ul className="flex flex-col gap-1 text-[11px] text-slate-300">
                      {target.heartFlutter.map((h, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-pink-400 font-bold">•</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Red Flags */}
                  <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-800/30">
                    <div className="flex items-center gap-1.5 font-bold text-xs text-rose-300 mb-1.5">
                      <Ban className="w-3.5 h-3.5 text-rose-400" />
                      <span>이것만은 절대 사절! 지뢰 포인트 🚫</span>
                    </div>
                    <ul className="flex flex-col gap-1 text-[11px] text-slate-300">
                      {target.redFlags.map((r, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-rose-400 font-bold">•</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Aftercare */}
                  <div className="p-3 rounded-xl bg-teal-950/20 border border-teal-800/30">
                    <div className="flex items-center gap-1.5 font-bold text-xs text-teal-300 mb-1">
                      <Stethoscope className="w-3.5 h-3.5 text-teal-400" />
                      <span>파트너를 위한 맞춤 케어법 🩺</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {target.aftercare}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
