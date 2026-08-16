import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'BDSM 동물 성향 테스트 | 내 안의 캐릭터 & 친구 케미 지도',
  description:
    '귀여운 동물 캐릭터로 알아보는 나의 BDSM 성향 분석! 18가지 성향과 소울메이트 꿀케미, 실시간 친구 관계망 지도까지 한 번에 확인해보세요.',
  keywords: [
    'BDSM테스트',
    '성향테스트',
    '동물성향테스트',
    '심리테스트',
    '성격유형검사',
    'BDSM케미',
    '궁합테스트',
    '연애성향'
  ],
  authors: [{ name: 'BDSM Lab' }],
  openGraph: {
    title: 'BDSM 동물 성향 테스트 | 내 안의 동물 캐릭터는?',
    description:
      '18가지 귀여운 동물 캐릭터와 정밀 가중치 분석으로 알아보는 BDSM 성향 테스트! 친구들과 실시간 궁합 지도도 만들어보세요.',
    url: 'https://bdsm-tawny.vercel.app',
    siteName: 'BDSM 동물 성향 연구소',
    images: [
      {
        url: 'https://bdsm-tawny.vercel.app/app-icon.png',
        width: 1200,
        height: 630,
        alt: 'BDSM 동물 성향 테스트'
      }
    ],
    locale: 'ko_KR',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BDSM 동물 성향 테스트',
    description: '귀여운 동물 캐릭터로 알아보는 18가지 성향 분석 & 친구 케미 맵',
    images: ['https://bdsm-tawny.vercel.app/app-icon.png']
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  return (
    <html lang="ko" className="dark">
      <head>
        {/* Kakao JavaScript SDK: Load Once & Initialize Immediately */}
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />

        {/* Google AdSense Script (When Client ID is provided) */}
        {adClientId && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClientId}`}
            crossOrigin="anonymous"
            strategy="lazyOnload"
          />
        )}
      </head>
      <body className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-between antialiased selection:bg-purple-500 selection:text-white">
        <Header />
        <main className="w-full max-w-md px-4 py-6 flex-1 flex flex-col justify-start">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
