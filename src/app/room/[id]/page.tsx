'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { subscribeRoom, joinRoom } from '@/lib/firebase';
import { calculateTestResults } from '@/lib/calculate';
import { RoomData, RoomMember } from '@/types/test';
import RoomNetworkGraph from '@/components/RoomNetworkGraph';
import AdBanner from '@/components/AdBanner';
import { loadKakaoSDK, shareKakaoFeed, initKakaoSync } from '@/lib/kakao';
import { copyToClipboard } from '@/lib/clipboard';
import { Users, Copy, Check, Sparkles, ArrowRight, UserPlus, MessageCircle } from 'lucide-react';

const PRODUCTION_DOMAIN = 'https://bdsm-zero.vercel.app';

export default function RoomPage() {
  const params = useParams();
  const roomId = params?.id as string;

  const [room, setRoom] = useState<RoomData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isJoining, setIsJoining] = useState(false);
  const [currentMember, setCurrentMember] = useState<RoomMember | null>(null);

  // Pre-initialize Kakao SDK on mount
  useEffect(() => {
    initKakaoSync();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Load current user member info from storage if available
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const rawAnswers = localStorage.getItem('bdsm_answers');
      const nickname = localStorage.getItem('bdsm_nickname') || '익명의 탐험가';

      let userId = localStorage.getItem('bdsm_user_id');
      if (!userId) {
        userId =
          'u_' +
          Math.random().toString(36).substring(2, 9) +
          Date.now().toString(36);
        localStorage.setItem('bdsm_user_id', userId);
      }

      if (rawAnswers) {
        const answersObj = JSON.parse(rawAnswers);
        const res = calculateTestResults(answersObj, nickname);
        setCurrentMember({
          id: userId,
          nickname,
          primaryTrait: res.primaryTrait,
          scores: res.scores,
          createdAt: Date.now()
        });
      }
    } catch (e) {
      console.error('Failed to load user state in room', e);
    }
  }, []);

  // Subscribe to room updates
  useEffect(() => {
    if (!roomId) return;
    const unsubscribe = subscribeRoom(roomId, (data) => {
      setRoom(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [roomId]);

  const handleCopyRoomLink = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : `${PRODUCTION_DOMAIN}/room/${roomId}`;
    const success = await copyToClipboard(url);
    if (success) {
      setCopied(true);
      showToast('초대 링크가 클립보드에 복사되었습니다! 🔗');
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleKakaoShareRoom = async () => {
    const roomUrl = `${PRODUCTION_DOMAIN}/room/${roomId}`;
    const roomTitle = room?.name || '우리 모임 케미 맵';
    const memberCount = room?.members?.length || 1;
    const shareTitle = `[${roomTitle}] 실시간 BDSM 케미 룸 초대! 🎉`;
    const shareDesc = `현재 ${memberCount}명이 모여있어요! 우리 모임의 궁합 지도를 확인해보세요.`;
    const staticThumbnail = `${PRODUCTION_DOMAIN}/app-icon.png`;

    // 1. Try Kakao JS SDK Feed Share
    let kakaoSent = false;
    try {
      loadKakaoSDK(() => {
        kakaoSent = shareKakaoFeed({
          title: shareTitle,
          description: shareDesc,
          imageUrl: staticThumbnail,
          targetUrl: roomUrl,
          buttonTitle: '같이 결과 보기'
        });
      });
    } catch {
      kakaoSent = false;
    }

    // 2. If In-App Browser blocks custom scheme (Error 4002), fallback to Native Web Share
    if (!kakaoSent && typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareDesc,
          url: roomUrl
        });
        return;
      } catch (err: any) {
        if (err.name === 'AbortError') return;
      }
    }

    // 3. Final Fallback: Copy Link
    if (!kakaoSent) {
      handleCopyRoomLink();
    }
  };

  const handleJoinMyResult = async () => {
    if (!currentMember || !roomId || isJoining) return;
    try {
      setIsJoining(true);
      await joinRoom(roomId, currentMember);
    } catch (e) {
      console.error('Failed to join room', e);
      alert('방 참여 중 오류가 발생했습니다.');
    } finally {
      setIsJoining(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full py-24 flex flex-col items-center justify-center text-slate-400 gap-3">
        <Sparkles className="w-8 h-8 text-purple-400 animate-spin" />
        <p className="text-sm">케미 룸을 불러오는 중...</p>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="w-full py-20 flex flex-col items-center text-center gap-4">
        <h2 className="text-lg font-bold text-white">
          존재하지 않거나 만료된 방입니다.
        </h2>
        <p className="text-xs text-slate-400">
          새로운 케미 방을 생성해 보세요!
        </p>
        <Link
          href="/"
          className="py-3 px-6 rounded-2xl bg-purple-600 text-white font-bold text-xs shadow-lg"
        >
          홈으로 가기
        </Link>
      </div>
    );
  }

  const isAlreadyJoined =
    currentMember &&
    room.members &&
    room.members.some((m) => m.id === currentMember.id);

  return (
    <div className="w-full flex flex-col gap-6 items-center relative">
      {/* Toast Popup */}
      {toastMessage && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-slate-900/95 border border-purple-500/50 text-white text-xs font-bold shadow-2xl backdrop-blur-md animate-fade-in flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Ad Banner */}
      <AdBanner slot="room_top_banner" />

      {/* Room Header Banner */}
      <div className="w-full rounded-3xl bg-gradient-to-r from-purple-950/80 via-slate-900 to-indigo-950/80 border border-purple-800/40 p-6 backdrop-blur-xl shadow-2xl flex flex-col items-center text-center gap-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-900/60 border border-purple-700/50 text-purple-300 text-xs font-semibold">
          <Users className="w-3.5 h-3.5" />
          <span>실시간 친구 케미 룸</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          {room.name}
        </h1>

        <p className="text-xs text-slate-300 max-w-xs leading-relaxed">
          친구들이 검사를 완료하면 실시간으로 캐릭터가 추가되고, 서로 간의 꿀케미/상극 궁합 랭킹이 업데이트됩니다!
        </p>

        {/* Action Buttons (Kakao Share + Copy Link) */}
        <div className="w-full grid grid-cols-2 gap-2.5 pt-2">
          {/* Kakao Share */}
          <button
            onClick={handleKakaoShareRoom}
            className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-2xl bg-[#FEE500] hover:bg-[#FADA0A] text-[#191919] font-extrabold text-xs shadow-lg shadow-yellow-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <MessageCircle className="w-4 h-4 fill-[#191919]" />
            <span>카톡으로 친구 초대</span>
          </button>

          {/* Copy Link */}
          <button
            onClick={handleCopyRoomLink}
            className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700/80 shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span className="text-emerald-300">복사 완료!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-300" />
                <span>초대 링크 복사</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Quick Join CTA (If user has local result but hasn't joined) */}
      {currentMember && !isAlreadyJoined && (
        <div className="w-full p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/50 flex items-center justify-between shadow-xl animate-bounce">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-emerald-400" />
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-white">
                내 검사 결과({currentMember.nickname})가 있습니다!
              </span>
              <span className="text-[10px] text-emerald-300">
                원클릭으로 이 방에 바로 등록하세요.
              </span>
            </div>
          </div>
          <button
            onClick={handleJoinMyResult}
            disabled={isJoining}
            className="py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black shadow transition-transform active:scale-95 disabled:opacity-50"
          >
            {isJoining ? '참여 중...' : '방 참여하기'}
          </button>
        </div>
      )}

      {/* If user hasn't tested yet */}
      {!currentMember && (
        <div className="w-full p-4 rounded-2xl bg-purple-950/40 border border-purple-800/50 flex items-center justify-between shadow-xl">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-white">
                아직 성향 검사를 안 하셨나요?
              </span>
              <span className="text-[10px] text-purple-300">
                2분 만에 검사하고 이 방에 내 캐릭터를 등록하세요.
              </span>
            </div>
          </div>
          <Link
            href="/test"
            onClick={() => {
              if (typeof window !== 'undefined' && roomId) {
                sessionStorage.setItem('bdsm_pending_room_id', roomId);
              }
            }}
            className="py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow flex items-center gap-1 transition-transform active:scale-95"
          >
            <span>검사하기</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      )}

      {/* Realtime Network Graph Component */}
      <RoomNetworkGraph room={room} />

      {/* Bottom Ad Banner */}
      <AdBanner slot="room_bottom_banner" />
    </div>
  );
}
