'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { QUESTIONS } from '@/data/questions';
import { ChevronLeft, Sparkles, RotateCcw } from 'lucide-react';
import AdBanner from '@/components/AdBanner';

const SCALE_OPTIONS = [
  { value: 1, label: '전혀 아니다', color: 'hover:border-rose-500/80 hover:bg-rose-950/30' },
  { value: 2, label: '아니다', color: 'hover:border-orange-500/80 hover:bg-orange-950/30' },
  { value: 3, label: '보통이다', color: 'hover:border-slate-500/80 hover:bg-slate-800/40' },
  { value: 4, label: '그렇다', color: 'hover:border-indigo-500/80 hover:bg-indigo-950/30' },
  { value: 5, label: '매우 그렇다', color: 'hover:border-pink-500/80 hover:bg-pink-950/30' }
];

const SESSION_DRAFT_KEY = 'bdsm_test_draft_answers';
const SESSION_INDEX_KEY = 'bdsm_test_draft_index';

export default function TestPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [hasRestored, setHasRestored] = useState(false);

  // Restore draft state on mount
  useEffect(() => {
    try {
      const savedAnswers = sessionStorage.getItem(SESSION_DRAFT_KEY);
      const savedIndex = sessionStorage.getItem(SESSION_INDEX_KEY);
      if (savedAnswers) {
        setAnswers(JSON.parse(savedAnswers));
      }
      if (savedIndex) {
        const idx = parseInt(savedIndex, 10);
        if (!isNaN(idx) && idx >= 0 && idx < QUESTIONS.length) {
          setCurrentIndex(idx);
        }
      }
    } catch (e) {
      console.error('Failed to restore draft test state', e);
    } finally {
      setHasRestored(true);
    }
  }, []);

  const currentQ = QUESTIONS[currentIndex] || QUESTIONS[0];
  const progressPercent = Math.round(((currentIndex + 1) / QUESTIONS.length) * 100);

  const handleSelect = (score: number) => {
    const nextAnswers = { ...answers, [currentQ.id]: score };
    setAnswers(nextAnswers);

    // Save draft to sessionStorage
    try {
      sessionStorage.setItem(SESSION_DRAFT_KEY, JSON.stringify(nextAnswers));
    } catch {
      // ignore
    }

    if (currentIndex < QUESTIONS.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      try {
        sessionStorage.setItem(SESSION_INDEX_KEY, String(nextIdx));
      } catch {
        // ignore
      }
    } else {
      // All completed -> Clear draft & Save final answers
      try {
        sessionStorage.removeItem(SESSION_DRAFT_KEY);
        sessionStorage.removeItem(SESSION_INDEX_KEY);
        localStorage.setItem('bdsm_answers', JSON.stringify(nextAnswers));
      } catch (e) {
        console.error('Storage write error', e);
      }
      router.push('/analyzing');
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      setCurrentIndex(prevIdx);
      try {
        sessionStorage.setItem(SESSION_INDEX_KEY, String(prevIdx));
      } catch {
        // ignore
      }
    }
  };

  const handleResetTest = () => {
    if (confirm('테스트를 처음부터 다시 시작하시겠습니까?')) {
      try {
        sessionStorage.removeItem(SESSION_DRAFT_KEY);
        sessionStorage.removeItem(SESSION_INDEX_KEY);
      } catch {
        // ignore
      }
      setAnswers({});
      setCurrentIndex(0);
    }
  };

  if (!hasRestored) {
    return null;
  }

  return (
    <div className="w-full flex flex-col gap-5">
      {/* Progress Bar & Header */}
      <div className="w-full flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`flex items-center gap-1 font-semibold transition-colors ${
              currentIndex === 0
                ? 'opacity-0 cursor-default'
                : 'hover:text-white cursor-pointer'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            이전 문항
          </button>
          <div className="flex items-center gap-3">
            {currentIndex > 0 && (
              <button
                onClick={handleResetTest}
                className="text-[10px] text-slate-500 hover:text-slate-300 flex items-center gap-0.5 transition-colors"
                title="처음부터 다시하기"
              >
                <RotateCcw className="w-3 h-3" />
                처음으로
              </button>
            )}
            <div className="flex items-center gap-1 font-mono font-bold text-purple-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {currentIndex + 1} / {QUESTIONS.length}
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar Track */}
        <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="w-full rounded-3xl bg-slate-900/90 border border-slate-800 p-6 shadow-2xl backdrop-blur-xl flex flex-col gap-4 min-h-[220px] justify-center text-center">
        {currentQ.categoryHint && (
          <span className="self-center px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/60 text-purple-300 text-[11px] font-semibold">
            {currentQ.categoryHint}
          </span>
        )}

        <h2 className="text-lg sm:text-xl font-bold text-white leading-snug break-keep">
          Q{currentQ.id}. {currentQ.text}
        </h2>
      </div>

      {/* Scale Buttons (1~5) */}
      <div className="flex flex-col gap-2.5">
        {SCALE_OPTIONS.map((opt) => {
          const isSelected = answers[currentQ.id] === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={`w-full py-3.5 px-5 rounded-2xl border text-sm font-bold transition-all flex items-center justify-between group active:scale-[0.98] ${
                isSelected
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 border-purple-500 text-white shadow-lg shadow-purple-600/30'
                  : `bg-slate-900/80 border-slate-800 text-slate-300 ${opt.color}`
              }`}
            >
              <span className="flex items-center gap-3">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    isSelected
                      ? 'bg-white text-purple-700'
                      : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'
                  }`}
                >
                  {opt.value}
                </span>
                <span>{opt.label}</span>
              </span>
              <span className="text-xs text-slate-500 group-hover:text-slate-400 font-normal">
                {opt.value === 5 ? '강한 긍정' : opt.value === 1 ? '강한 부정' : ''}
              </span>
            </button>
          );
        })}
      </div>

      {/* Middle/Bottom Ad Banner */}
      <AdBanner slot="test_page_banner" className="mt-2" />
    </div>
  );
}
