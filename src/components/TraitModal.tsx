'use client';

import { TraitInfo } from '@/types/test';
import CharacterAvatar from './CharacterAvatar';
import { X, Heart, Flame, Ban, Stethoscope, CheckCircle2, Sparkles } from 'lucide-react';

interface TraitModalProps {
  trait: TraitInfo | null;
  onClose: () => void;
}

export default function TraitModal({ trait, onClose }: TraitModalProps) {
  if (!trait) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-slate-700 p-6 shadow-2xl flex flex-col gap-4 my-8 max-h-[88vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors z-20"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Hero Area */}
        <div className="flex flex-col items-center text-center pt-2">
          <CharacterAvatar traitId={trait.id} size="lg" className="mb-3" />
          <span className={`px-3 py-0.5 rounded-full text-xs font-bold shadow mb-2 ${trait.badgeColor}`}>
            {trait.nameKo}
          </span>
          <h3 className="text-xl font-extrabold text-white">
            &quot;{trait.title}&quot;
          </h3>
          <p className="text-xs font-semibold text-purple-300 mt-1">
            {trait.subtitle}
          </p>
        </div>

        {/* Basic Description */}
        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
          {trait.description}
        </div>

        {/* Love Style */}
        <div className="p-3.5 rounded-2xl bg-purple-950/30 border border-purple-800/40 text-left">
          <div className="flex items-center gap-1.5 font-bold text-xs text-purple-300 mb-1">
            <Heart className="w-3.5 h-3.5 fill-current text-pink-400" />
            <span>연애 스타일 & 기본 심리</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {trait.loveStyle}
          </p>
        </div>

        {/* Heart Flutter */}
        <div className="p-3.5 rounded-2xl bg-pink-950/20 border border-pink-800/30 text-left">
          <div className="flex items-center gap-1.5 font-bold text-xs text-pink-300 mb-1.5">
            <Flame className="w-3.5 h-3.5 text-pink-400" />
            <span>이런 말/상황에 심쿵해요! 💘</span>
          </div>
          <ul className="flex flex-col gap-1 text-xs text-slate-300">
            {trait.heartFlutter.map((h, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-pink-400 font-bold">•</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Red Flags */}
        <div className="p-3.5 rounded-2xl bg-rose-950/20 border border-rose-800/30 text-left">
          <div className="flex items-center gap-1.5 font-bold text-xs text-rose-300 mb-1.5">
            <Ban className="w-3.5 h-3.5 text-rose-400" />
            <span>이것만은 절대 사절! 지뢰 포인트 🚫</span>
          </div>
          <ul className="flex flex-col gap-1 text-xs text-slate-300">
            {trait.redFlags.map((r, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-rose-400 font-bold">•</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Aftercare */}
        <div className="p-3.5 rounded-2xl bg-teal-950/20 border border-teal-800/30 text-left">
          <div className="flex items-center gap-1.5 font-bold text-xs text-teal-300 mb-1">
            <Stethoscope className="w-3.5 h-3.5 text-teal-400" />
            <span>파트너를 위한 맞춤 애프터케어 🩺</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {trait.aftercare}
          </p>
        </div>

        {/* Close CTA */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all shadow"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
