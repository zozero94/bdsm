'use client';

import { useEffect, useRef } from 'react';

interface AdBannerProps {
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  className?: string;
}

export default function AdBanner({
  slot = '1234567890',
  format = 'auto',
  className = ''
}: AdBannerProps) {
  const adClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const pushedRef = useRef(false);

  useEffect(() => {
    if (adClientId && !pushedRef.current) {
      try {
        // @ts-expect-error Google Ads script global array
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushedRef.current = true;
      } catch (err) {
        console.error('AdSense load error:', err);
      }
    }
  }, [adClientId]);

  return (
    <div
      className={`w-full min-h-[96px] overflow-hidden rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 p-4 text-center flex flex-col justify-center items-center ${className}`}
    >
      <div className="text-[9px] tracking-wider text-slate-500 uppercase font-mono mb-1">
        ADVERTISEMENT
      </div>
      {adClientId ? (
        <ins
          className="adsbygoogle block w-full min-h-[60px]"
          style={{ display: 'block' }}
          data-ad-client={adClientId}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      ) : (
        <div className="flex flex-col items-center justify-center py-2 text-slate-400">
          <div className="w-7 h-7 rounded-lg bg-slate-800/80 flex items-center justify-center text-slate-400 text-[10px] font-bold mb-1">
            AD
          </div>
          <p className="text-xs font-medium text-slate-300">구글 애드센스 반응형 광고 영역</p>
          <span className="text-[10px] text-slate-500 mt-0.5">
            (NEXT_PUBLIC_ADSENSE_CLIENT_ID 연동 시 실시간 배너 송출)
          </span>
        </div>
      )}
    </div>
  );
}
