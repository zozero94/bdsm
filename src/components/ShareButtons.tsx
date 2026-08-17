'use client';

import { useState } from 'react';
import { TraitId } from '@/types/test';
import { TRAITS } from '@/data/traits';
import { Check, MessageCircle, Users, Copy, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createRoom } from '@/lib/firebase';
import { loadKakaoSDK, shareKakaoFeed } from '@/lib/kakao';
import { copyToClipboard } from '@/lib/clipboard';
import { encodeResultData } from '@/lib/calculate';

interface ShareButtonsProps {
  primaryTraitId: TraitId;
  nickname?: string;
  resultUrl: string;
  scores: Record<TraitId, number>;
}

const PRODUCTION_DOMAIN = 'https://bdsm-zero.vercel.app';

export default function ShareButtons({
  primaryTraitId,
  nickname,
  resultUrl,
  scores
}: ShareButtonsProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const trait = TRAITS[primaryTraitId] || TRAITS.dominant;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Helper to get ultra-compact, single-encoded result URL (40~48 chars)
  const getCleanResultUrl = () => {
    if (typeof window !== 'undefined') {
      const search = window.location.search;
      if (search && search.includes('r=')) {
        return `${PRODUCTION_DOMAIN}/result${search}`;
      }
    }
    // Generate fresh ultra-compact URL
    try {
      const compact = encodeResultData({
        scores,
        primaryTrait: primaryTraitId,
        nickname,
        timestamp: Date.now()
      });
      if (compact) {
        return `${PRODUCTION_DOMAIN}/result?r=${compact}`;
      }
    } catch {
      // ignore
    }
    return resultUrl || `${PRODUCTION_DOMAIN}/result`;
  };

  // Standard Link Copy
  const handleCopyLink = async () => {
    const targetUrl = getCleanResultUrl();
    const success = await copyToClipboard(targetUrl);
    if (success) {
      setCopied(true);
      showToast('링크가 클립보드에 복사되었습니다! 🎉');
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Direct Kakao Share with clean URL format & dynamic 800x800 bitmap card
  const handleKakaoShare = () => {
    const targetLink = getCleanResultUrl();
    const shareTitle = `${nickname ? nickname + '님의 ' : ''}BDSM 성향: [${trait.animal}]`;
    const shareDesc = `"${trait.title}" - 나와의 성향 궁합을 확인해보세요!`;
    const dynamicCardImage = `${PRODUCTION_DOMAIN}/api/og?trait=${primaryTraitId}${
      nickname ? `&nickname=${encodeURIComponent(nickname)}` : ''
    }`;

    loadKakaoSDK(() => {
      const success = shareKakaoFeed({
        title: shareTitle,
        description: shareDesc,
        imageUrl: dynamicCardImage,
        targetUrl: targetLink,
        buttonTitle: '나는 어떤 성향일까?'
      });

      if (!success) {
        if (typeof navigator !== 'undefined' && navigator.share) {
          navigator
            .share({
              title: shareTitle,
              text: shareDesc,
              url: targetLink
            })
            .catch(() => handleCopyLink());
        } else {
          handleCopyLink();
        }
      }
    });
  };

  const handleCreateRoom = async () => {
    try {
      setIsCreatingRoom(true);
      let userId = '';
      if (typeof window !== 'undefined') {
        userId = localStorage.getItem('bdsm_user_id') || '';
        if (!userId) {
          userId =
            'u_' +
            Math.random().toString(36).substring(2, 9) +
            Date.now().toString(36);
          localStorage.setItem('bdsm_user_id', userId);
        }
      } else {
        userId = 'u_' + Math.random().toString(36).substring(2, 9);
      }

      const hostMember = {
        id: userId,
        nickname: nickname || trait.animal,
        primaryTrait: primaryTraitId,
        scores,
        createdAt: Date.now()
      };
      const roomId = await createRoom(
        `${nickname || '친구들'}의 케미 맵`,
        hostMember
      );
      router.push(`/room/${roomId}`);
    } catch (e) {
      console.error('Failed to create room', e);
      alert('방 생성 중 오류가 발생했습니다.');
    } finally {
      setIsCreatingRoom(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-3 relative">
      {/* Toast Popup */}
      {toastMessage && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-slate-900/95 border border-purple-500/50 text-white text-xs font-bold shadow-2xl backdrop-blur-md animate-fade-in flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Primary Actions Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Kakao Share */}
        <button
          onClick={handleKakaoShare}
          className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-[#FEE500] hover:bg-[#FADA0A] text-[#191919] font-bold text-sm shadow-lg shadow-yellow-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <MessageCircle className="w-4 h-4 fill-[#191919]" />
          카카오톡 공유
        </button>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700/80 shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400">복사 완료!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-slate-300" />
              링크 복사하기
            </>
          )}
        </button>
      </div>

      {/* Group Room CTA Banner */}
      <div className="mt-2 rounded-2xl bg-gradient-to-r from-purple-950/60 via-indigo-950/50 to-slate-900 border border-purple-800/40 p-4 flex flex-col gap-2.5 shadow-xl">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400 animate-spin" />
          <span className="text-xs font-bold text-purple-200">
            친구들과 한곳에 모여 케미 지도를 보고 싶다면?
          </span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          고유 링크 하나로 친구들을 초대하고, 실시간으로 다자간 궁합 관계도를 한눈에 확인하세요!
        </p>
        <button
          onClick={handleCreateRoom}
          disabled={isCreatingRoom}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-700/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
        >
          <Users className="w-4 h-4" />
          {isCreatingRoom ? '모임 방 생성 중...' : '🔗 우리 모임 케미 방 만들기'}
        </button>
      </div>
    </div>
  );
}
