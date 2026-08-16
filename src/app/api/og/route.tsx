import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { TRAITS } from '@/data/traits';
import { TraitId } from '@/types/test';

// Use Node.js runtime to avoid Vercel 1MB Edge Function limit (Node.js limit is 50MB)
export const runtime = 'nodejs';

const BG_GRADIENTS: Record<TraitId, string> = {
  dominant: 'linear-gradient(135deg, #3b0764 0%, #0f172a 100%)',
  submissive: 'linear-gradient(135deg, #500724 0%, #0f172a 100%)',
  sadist: 'linear-gradient(135deg, #4c0519 0%, #0f172a 100%)',
  masochist: 'linear-gradient(135deg, #451a03 0%, #0f172a 100%)',
  switch: 'linear-gradient(135deg, #022c22 0%, #0f172a 100%)',
  master: 'linear-gradient(135deg, #422006 0%, #0f172a 100%)',
  slave: 'linear-gradient(135deg, #083344 0%, #0f172a 100%)',
  brat: 'linear-gradient(135deg, #431407 0%, #0f172a 100%)',
  brat_tamer: 'linear-gradient(135deg, #292524 0%, #0f172a 100%)',
  spanker: 'linear-gradient(135deg, #450a0a 0%, #0f172a 100%)',
  hunter: 'linear-gradient(135deg, #064e3b 0%, #0f172a 100%)',
  prey: 'linear-gradient(135deg, #134e4a 0%, #0f172a 100%)',
  caregiver: 'linear-gradient(135deg, #451a03 0%, #0f172a 100%)',
  little: 'linear-gradient(135deg, #422006 0%, #0f172a 100%)',
  rigger: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
  rope_bottom: 'linear-gradient(135deg, #082f49 0%, #0f172a 100%)',
  degrader: 'linear-gradient(135deg, #450a0a 0%, #0f172a 100%)',
  degradee: 'linear-gradient(135deg, #451a03 0%, #0f172a 100%)'
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const traitId = (searchParams.get('trait') || 'dominant') as TraitId;
    const rawNickname = searchParams.get('nickname') || '';
    const nickname = rawNickname.slice(0, 12);

    const trait = TRAITS[traitId] || TRAITS.dominant;

    // Load Korean font (Pretendard Bold WOFF)
    let fontData: ArrayBuffer | null = null;
    try {
      const fontRes = await fetch(
        'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/web/static/woff/Pretendard-Bold.woff'
      );
      if (fontRes.ok) {
        fontData = await fontRes.arrayBuffer();
      }
    } catch (fontErr) {
      console.warn('Font load fallback:', fontErr);
    }

    const fontsConfig = fontData
      ? [
          {
            name: 'Pretendard',
            data: fontData,
            weight: 700 as const,
            style: 'normal' as const
          }
        ]
      : undefined;

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: BG_GRADIENTS[traitId] || BG_GRADIENTS.dominant,
            padding: '40px',
            fontFamily: fontData ? 'Pretendard, sans-serif' : 'sans-serif'
          }}
        >
          {/* Header Tag */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              borderRadius: '50px',
              padding: '8px 24px',
              marginBottom: '20px'
            }}
          >
            <span style={{ fontSize: '20px', color: '#c084fc', fontWeight: 'bold' }}>
              🐾 BDSM 동물 성향 테스트 결과
            </span>
          </div>

          {/* Emoji Avatar Circle */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '120px',
              height: '120px',
              borderRadius: '60px',
              background: 'rgba(15, 23, 42, 0.85)',
              border: '4px solid rgba(192, 132, 252, 0.6)',
              fontSize: '64px',
              marginBottom: '16px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)'
            }}
          >
            {trait.emoji}
          </div>

          {/* Nickname & Title */}
          {nickname ? (
            <div style={{ fontSize: '22px', color: '#cbd5e1', fontWeight: 600, marginBottom: '6px' }}>
              {nickname}님의 성향은
            </div>
          ) : null}

          <div
            style={{
              fontSize: '40px',
              fontWeight: 900,
              color: '#ffffff',
              marginBottom: '10px',
              textAlign: 'center',
              letterSpacing: '-1px'
            }}
          >
            {trait.animal} ({trait.shortName})
          </div>

          <div
            style={{
              fontSize: '20px',
              fontWeight: 600,
              color: '#e9d5ff',
              textAlign: 'center',
              maxWidth: '620px'
            }}
          >
            &quot;{trait.title}&quot;
          </div>

          {/* Footer Call to action */}
          <div
            style={{
              marginTop: '28px',
              fontSize: '16px',
              color: '#94a3b8',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            나와의 꿀케미 궁합 확인하기 💖
          </div>
        </div>
      ),
      {
        width: 800,
        height: 600,
        fonts: fontsConfig,
        headers: {
          'Cache-Control': 'public, max-age=86400, s-maxage=31536000, stale-while-revalidate=86400'
        }
      }
    );
  } catch (e: any) {
    console.error('OG Image Generation Error:', e);
    return new Response('Failed to generate image', { status: 500 });
  }
}
