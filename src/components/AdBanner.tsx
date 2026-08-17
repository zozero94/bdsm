'use client';

import { useEffect, useRef } from 'react';

interface AdBannerProps {
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  className?: string;
}

const ADSENSE_CLIENT_ID =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-4169469417741632';

export default function AdBanner({
  slot = '1234567890',
  format = 'auto',
  className = ''
}: AdBannerProps) {
  const pushedRef = useRef(false);

  useEffect(() => {
    if (ADSENSE_CLIENT_ID && !pushedRef.current) {
      try {
        // @ts-expect-error Google Ads script global array
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushedRef.current = true;
      } catch (err) {
        console.error('AdSense load error:', err);
      }
    }
  }, []);

  return (
    <div
      className={`w-full min-h-[96px] overflow-hidden rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 p-4 text-center flex flex-col justify-center items-center ${className}`}
    >
      <div className="text-[9px] tracking-wider text-slate-500 uppercase font-mono mb-1">
        ADVERTISEMENT
      </div>
      <ins
        className="adsbygoogle block w-full min-h-[60px]"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
