import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-800/60 bg-slate-950/90 py-8 px-4 text-center text-xs text-slate-400 mt-auto">
      <div className="max-w-md mx-auto flex flex-col items-center gap-3">
        <p className="font-semibold text-slate-300">
          🐾 BDSM 성향 연구소 • Animal Personality Project
        </p>
        <p className="text-[11px] leading-relaxed text-slate-400">
          본 테스트는 심리학적 척도와 BDSM 성향 모델을 귀여운 동물 캐릭터로 재해석한 엔터테인먼트형 성향 분석 도구입니다. 
          상호 존중(SSC/RACK)과 동의를 바탕으로 건강한 관계를 지향합니다.
        </p>
        <div className="flex items-center gap-4 text-slate-400 text-[11px] pt-2">
          <Link href="/" className="hover:text-slate-300 transition-colors">
            홈으로
          </Link>
          <span>•</span>
          <Link href="/test" className="hover:text-slate-300 transition-colors">
            테스트 다시하기
          </Link>
          <span>•</span>
          <span className="text-slate-500">© 2026 BDSM Lab. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
