import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Script from 'next/script';

const SITE_URL = 'https://bdsm-zero.vercel.app';
const ADSENSE_CLIENT_ID =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-4169469417741632';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'BDSM 동물 성향 테스트 | 18가지 동물 캐릭터 & 친구 케미 지도',
  description:
    '귀여운 동물 캐릭터로 알아보는 나의 정밀 BDSM 성향 분석! 18가지 성향과 소울메이트 꿀케미, 실시간 친구 관계망 지도까지 한 번에 확인해보세요.',
  keywords: [
    'BDSM테스트',
    'BDSM 성향 테스트',
    'BDSM 성향 검사',
    'BDSM 검사',
    '동물성향테스트',
    '심리테스트',
    '성격유형검사',
    'BDSM케미',
    '궁합테스트',
    '연애성향',
    'BDSM 테스트 무료'
  ],
  authors: [{ name: 'BDSM Lab' }],
  verification: {
    google: 'ACDUCtSnAIPRQARpHYhOO9Q5EOysRdmywgP3rSUkOKI'
  },
  alternates: {
    canonical: SITE_URL
  },
  openGraph: {
    title: 'BDSM 동물 성향 테스트 | 내 안의 동물 캐릭터는?',
    description:
      '18가지 귀여운 동물 캐릭터와 정밀 가중치 분석으로 알아보는 BDSM 성향 테스트! 친구들과 실시간 궁합 지도도 만들어보세요.',
    url: SITE_URL,
    siteName: 'BDSM 동물 성향 테스트',
    images: [
      {
        url: `${SITE_URL}/app-icon.png`,
        width: 800,
        height: 800,
        alt: 'BDSM 동물 성향 테스트 대표 이미지'
      }
    ],
    locale: 'ko_KR',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BDSM 동물 성향 테스트',
    description: '18가지 동물 캐릭터로 분석하는 내 안의 숨겨진 본능과 꿀케미 조합!',
    images: [`${SITE_URL}/app-icon.png`]
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/app-icon.png'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD Structured Data for Rich Search Results (Quiz & FAQ)
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'BDSM 동물 성향 테스트',
      applicationCategory: 'EntertainmentApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      url: SITE_URL,
      description:
        '18가지 귀여운 동물 캐릭터와 정밀 가중치 문항으로 자신의 성향과 친구들과의 궁합을 분석하는 인터랙티브 웹 테스트.'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'BDSM 동물 성향 테스트란 무엇인가요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'BDSM의 18가지 대표 성향을 친근한 동물 캐릭터로 재해석하여, 36가지 정밀 문항을 통해 본인의 성향과 상성을 쉽게 파악할 수 있도록 돕는 심리 분석 도구입니다.'
          }
        },
        {
          '@type': 'Question',
          name: '검사 결과는 안전하게 보관되나요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '모든 검사 결과는 서버에 저장되지 않고 클라이언트 URL 파라미터로 암호화 인코딩되어 완벽한 익명성을 보장합니다.'
          }
        },
        {
          '@type': 'Question',
          name: '친구와의 궁합(케미)은 어떻게 확인하나요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '검사 완료 후 결과 페이지에서 모임 방을 만들고 친구들에게 링크를 공유하면 실시간으로 궁합 관계도가 완성됩니다.'
          }
        }
      ]
    }
  ];

  return (
    <html lang="ko" className="dark">
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />



        {/* Google AdSense Auto Ads Script */}
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
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
