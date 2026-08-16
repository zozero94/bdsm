'use client';

import { useState, useEffect } from 'react';
import { TraitId } from '@/types/test';
import { TRAITS } from '@/data/traits';
import { Check, MessageCircle, Users, Copy, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createRoom } from '@/lib/firebase';

interface ShareButtonsProps {
  primaryTraitId: TraitId;
  nickname?: string;
  resultUrl: string;
  scores: Record<TraitId, number>;
}

const PRODUCTION_DOMAIN = 'https://bdsm-tawny.vercel.app';

export default function ShareButtons({
  primaryTraitId,
  nickname,
  resultUrl,
  scores
}: ShareButtonsProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const trait = TRAITS[primaryTraitId] || TRAITS.dominant;

  // Initialize Kakao SDK Helper
  const initKakao = () => {
    const kakaoKey =
      process.env.NEXT_PUBLIC_KAKAO_JS_KEY || '91f0317e2a9d5d066924b829dc5e8318';
    if (kakaoKey && typeof window !== 'undefined') {
      // @ts-expect-error Kakao SDK script
      if (window.Kakao && !window.Kakao.isInitialized()) {
        // @ts-expect-error Kakao SDK script
        window.Kakao.init(kakaoKey);
      }
    }
  };

  useEffect(() => {
    initKakao();
  }, []);

  // Standard Link Copy: Copies exact current URL
  const handleCopyLink = async () => {
    const targetUrl =
      resultUrl || (typeof window !== 'undefined' ? window.location.href : '');
    try {
      await navigator.clipboard.writeText(targetUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = targetUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Kakao Share: Formatted to Kakao SDK Feed Standard Specifications
  const handleKakaoShare = () => {
    initKakao();

    // Ensure link URL matches Kakao Developer Console registered domain prefix
    let targetLink = `${PRODUCTION_DOMAIN}/result`;
    if (typeof window !== 'undefined') {
      const search = window.location.search;
      targetLink = `${PRODUCTION_DOMAIN}/result${search}`;
    }

    // Dynamic OG Image with absolute HTTPS production URL
    const dynamicOgImage = `${PRODUCTION_DOMAIN}/api/og?trait=${primaryTraitId}&nickname=${encodeURIComponent(
      nickname || ''
    )}`;

    // @ts-expect-error Kakao SDK
    if (typeof window !== 'undefined' && window.Kakao && window.Kakao.isInitialized()) {
      // @ts-expect-error Kakao SDK
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: `${nickname ? nickname + '님의 ' : ''}BDSM 성향은 [${trait.animal}]!`,
          description: `"${trait.title}" - 나와의 성향 궁합을 지금 바로 확인해보세요!`,
          imageUrl: dynamicOgImage,
          imageWidth: 800,
          imageHeight: 600,
          link: {
            mobileWebUrl: targetLink,
            webUrl: targetLink
          }
        },
        itemContent: {
          profileText: 'BDSM 동물 성향 연구소',
          profileImageUrl: `${PRODUCTION_DOMAIN}/app-icon.png`
        },
        buttons: [
          {
            title: '결과 & 케미 확인하기 💖',
            link: {
              mobileWebUrl: targetLink,
              webUrl: targetLink
            }
          }
        ]
      });
    } else {
      if (navigator.share) {
        navigator
          .share({
            title: `BDSM 동물 성향 검사 결과: ${trait.animal}`,
            text: `제 성향은 [${trait.animal} - ${trait.nameKo}]입니다. 나와의 궁합을 확인해보세요!`,
            url: targetLink
          })
          .catch(() => handleCopyLink());
      } else {
        handleCopyLink();
      }
    }
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
    <div className="w-full flex flex-col gap-3">
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
