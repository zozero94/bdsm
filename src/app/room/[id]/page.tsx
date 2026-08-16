'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { subscribeRoom, joinRoom } from '@/lib/firebase';
import { calculateTestResults } from '@/lib/calculate';
import { RoomData, RoomMember } from '@/types/test';
import RoomNetworkGraph from '@/components/RoomNetworkGraph';
import AdBanner from '@/components/AdBanner';
import { Users, Copy, Check, Sparkles, ArrowRight, UserPlus, MessageCircle } from 'lucide-react';

const PRODUCTION_DOMAIN = 'https://bdsm-tawny.vercel.app';
const KAKAO_JS_KEY = '91f0317e2a9d5d066924b829dc5e8318';

export default function RoomPage() {
  const params = useParams();
  const roomId = params?.id as string;

  const [room, setRoom] = useState<RoomData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [currentMember, setCurrentMember] = useState<RoomMember | null>(null);

  // Ensure Kakao SDK is initialized
  const ensureKakaoInit = async (): Promise<boolean> => {
    if (typeof window === 'undefined') return false;

    // @ts-expect-error Kakao SDK
    if (window.Kakao && window.Kakao.isInitialized && window.Kakao.isInitialized()) {
      return true;
    }

    // @ts-expect-error Kakao SDK
    if (window.Kakao && window.Kakao.init) {
      try {
        // @ts-expect-error Kakao SDK
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY || KAKAO_JS_KEY);
        // @ts-expect-error Kakao SDK
        return window.Kakao.isInitialized();
      } catch (e) {
        console.error('Kakao init error', e);
      }
    }

    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js';
      script.async = true;
      script.onload = () => {
        try {
          // @ts-expect-error Kakao SDK
          if (window.Kakao && !window.Kakao.isInitialized()) {
            // @ts-expect-error Kakao SDK
            window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY || KAKAO_JS_KEY);
          }
          // @ts-expect-error Kakao SDK
          resolve(window.Kakao && window.Kakao.isInitialized());
        } catch {
          resolve(false);
        }
      };
      script.onerror = () => resolve(false);
      document.head.appendChild(script);
    });
  };

  useEffect(() => {
    ensureKakaoInit();
  }, []);

  // Load current user member info from storage if available
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const rawAnswers = localStorage.getItem('bdsm_answers');
      const nickname = localStorage.getItem('bdsm_nickname') || '익명의 탐험가';

      // Get or create unique user id
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
    const url = typeof window !== 'undefined' ? window.location.href : '';
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleKakaoShareRoom = async () => {
    const isReady = await ensureKakaoInit();
    const roomUrl = `${PRODUCTION_DOMAIN}/room/${roomId}`;
    const roomTitle = room?.name || '우리 모임 케미 맵';
    const memberCount = room?.members?.length || 1;

    // @ts-expect-error Kakao SDK
    if (isReady && window.Kakao && window.Kakao.Share) {
      try {
        // @ts-expect-error Kakao SDK
        window.Kakao.Share.sendDefault({
          objectType: 'feed',
          content: {
            title: `[${roomTitle}] 케미 룸 초대! 🎉`,
            description: `현재 ${memberCount}명이 모여있어요! 우리 모임의 궁합 지도를 확인하고 내 캐릭터도 등록해보세요.`,
            imageUrl: `${PRODUCTION_DOMAIN}/app-icon.png`,
            imageWidth: 640,
            imageHeight: 640,
            link: {
              mobileWebUrl: roomUrl,
              webUrl: roomUrl
            }
          },
          buttons: [
            {
              title: '케미 룸 입장 & 궁합 보기 💖',
              link: {
                mobileWebUrl: roomUrl,
                webUrl: roomUrl
              }
            }
          ]
        });
        return;
      } catch (err) {
        console.error('Failed to send Kakao room share', err);
      }
    }

    handleCopyRoomLink();
  };

  const handleJoinMyResult = async () => {
    if (!currentMember || !roomId) return;
    await joinRoom(roomId, currentMember);
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
    <div className="w-full flex flex-col gap-6 items-center">
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
            className="py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black shadow transition-transform active:scale-95"
          >
            방 참여하기
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
