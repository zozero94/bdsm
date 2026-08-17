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
    siteName: 'BDSM 동물 성향 연구소',
    images: [
      {
        url: `${SITE_URL}/app-icon.png`,
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
    images: [`${SITE_URL}/app-icon.png`]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD Structured Data for Google Rich Snippets & FAQ
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Quiz',
      name: 'BDSM 동물 성향 테스트',
      description:
        '18가지 동물 캐릭터로 알아보는 정밀 BDSM 성향 검사 및 친구 간 케미 매칭',
      url: SITE_URL,
      provider: {
        '@type': 'Organization',
        name: 'BDSM 동물 성향 연구소',
        url: SITE_URL
      },
      educationalLevel: 'Beginner',
      assesses: 'BDSM Traits and Compatibility'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'BDSM 동물 성향 테스트는 무엇인가요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '도미넌트, 서브미시브, 사디스트, 마조히스트, 스위치 등 18가지 성향 지표를 동물 캐릭터로 시각화한 무료 온라인 심리테스트입니다.'
          }
        },
        {
          '@type': 'Question',
          name: '검사 결과와 개인정보는 안전한가요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '100% 완전한 익명으로 진행되며, 회원가입이나 개인정보 입력 없이 닉네임만으로 검사를 수행할 수 있습니다.'
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
        {/* Google Site Verification Meta Tag */}
        <meta
          name="google-site-verification"
          content="ACDUCtSnAIPRQARpHYhOO9Q5EOysRdmywgP3rSUkOKI"
        />

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
          strategy="afterInteractive"
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
