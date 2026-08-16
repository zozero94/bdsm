import type { Metadata } from 'next';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'BDSM 동물 성향 테스트 | 내 안의 캐릭터 & 친구 케미 지도',
  description:
    '귀여운 동물 캐릭터로 알아보는 나의 BDSM 성향 분석! 18가지 성향과 소울메이트 꿀케미, 실시간 친구 관계망 지도까지 한 번에 확인해보세요.',
  keywords: [
    'BDSM테스트',
    '성향테스트',
    '심리테스트',
    '도미넌트',
    '서브미시브',
    '새디스트',
    '마조히스트',
    '케미지도',
    '성향궁합'
  ],
  openGraph: {
    title: 'BDSM 동물 성향 테스트 🐾',
    description: '나의 숨겨진 성향 동물은 무엇일까? 12가지 캐릭터와 케미 궁합 확인하기',
    url: 'https://bdsm-test.vercel.app',
    siteName: 'BDSM 성향 연구소',
    locale: 'ko_KR',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BDSM 동물 성향 테스트 🐾',
    description: '나의 숨겨진 성향 동물과 친구들과의 케미 지도를 확인해보세요!'
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
        {/* Kakao JavaScript SDK */}
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
          strategy="afterInteractive"
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
      <body className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-purple-500 selection:text-white">
        <Header />
        <main className="flex-1 w-full max-w-md mx-auto px-4 py-6 flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
