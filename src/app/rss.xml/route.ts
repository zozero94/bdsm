import { TRAITS } from '@/data/traits';

export const revalidate = 86400; // Cache for 24 hours

export async function GET() {
  const baseUrl = 'https://bdsm.zozero94.com';
  const pubDate = new Date('2026-08-22T00:00:00.000Z').toUTCString();

  const traitItems = Object.values(TRAITS)
    .map(
      (t) => `
    <item>
      <title><![CDATA[${t.animal} - ${t.title} (${t.nameKo})]]></title>
      <link>${baseUrl}/test</link>
      <guid>${baseUrl}/test#${t.id}</guid>
      <description><![CDATA[${t.subtitle} - ${t.description}]]></description>
      <pubDate>${pubDate}</pubDate>
    </item>`
    )
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[BDSM 동물 성향 테스트 | 18가지 동물 캐릭터 분석]]></title>
    <link>${baseUrl}</link>
    <description><![CDATA[귀여운 동물 캐릭터로 알아보는 나의 정밀 BDSM 성향 분석! 18가지 성향과 소울메이트 꿀케미, 실시간 친구 관계망 지도까지 한 번에 확인해보세요.]]></description>
    <language>ko</language>
    <lastBuildDate>${pubDate}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <item>
      <title><![CDATA[BDSM 동물 성향 정밀 테스트 시작하기]]></title>
      <link>${baseUrl}/test</link>
      <guid>${baseUrl}/test</guid>
      <description><![CDATA[18가지 세부 성향과 7단계 리커트 척도 기반 정밀 가중치 분석을 통해 나의 BDSM 동물 캐릭터와 케미 궁합을 무료로 확인하세요.]]></description>
      <pubDate>${pubDate}</pubDate>
    </item>${traitItems}
  </channel>
</rss>`;

  return new Response(rss.trim(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400'
    }
  });
}
