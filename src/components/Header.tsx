'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Sparkles, Heart } from 'lucide-react';

const RANDOM_NICKNAMES = [
  '호기심많은 고양이',
  '용감한 흑표범',
  '포근한 햄스터',
  '매혹적인 여우',
  '자유로운 카멜레온',
  '따스한 아빠곰'
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const handleQuickTestClick = (e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault();
      const inputEl = document.getElementById('nickname');
      if (inputEl) {
        inputEl.focus();
        inputEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      // If nickname is not set, set a random cute one
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('bdsm_nickname');
        if (!saved) {
          const rand = RANDOM_NICKNAMES[Math.floor(Math.random() * RANDOM_NICKNAMES.length)];
          localStorage.setItem('bdsm_nickname', rand);
        }
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80">
      <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base tracking-tight bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
              BDSM 성향 연구소
            </span>
            <span className="text-[10px] text-slate-400 font-medium -mt-1">
              내 안의 숨겨진 캐릭터 & 케미 분석
            </span>
          </div>
        </Link>
        <Link
          href="/test"
          onClick={handleQuickTestClick}
          className="text-xs font-semibold px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-pink-500/20 hover:opacity-90 transition-opacity flex items-center gap-1"
        >
          <Heart className="w-3 h-3 fill-current" />
          테스트하기
        </Link>
      </div>
    </header>
  );
}
