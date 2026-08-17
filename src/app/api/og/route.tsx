import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { TRAITS } from '@/data/traits';
import { TraitId } from '@/types/test';

export const runtime = 'nodejs';

const BG_CONFIG: Record<TraitId, { bg1: string; bg2: string; accent: string }> = {
  dominant: { bg1: '#3b0764', bg2: '#0f172a', accent: '#c084fc' },
  submissive: { bg1: '#500724', bg2: '#0f172a', accent: '#f472b6' },
  sadist: { bg1: '#4c0519', bg2: '#0f172a', accent: '#fb7185' },
  masochist: { bg1: '#451a03', bg2: '#0f172a', accent: '#fb923c' },
  hunter: { bg1: '#064e3b', bg2: '#0f172a', accent: '#34d399' },
  prey: { bg1: '#134e4a', bg2: '#0f172a', accent: '#2dd4bf' },
  caregiver: { bg1: '#451a03', bg2: '#0f172a', accent: '#f59e0b' },
  little: { bg1: '#4a044e', bg2: '#0f172a', accent: '#f472b6' },
  rigger: { bg1: '#1e1b4b', bg2: '#0f172a', accent: '#818cf8' },
  rope_bottom: { bg1: '#082f49', bg2: '#0f172a', accent: '#38bdf8' },
  degrader: { bg1: '#3f0c10', bg2: '#0f172a', accent: '#f87171' },
  degradee: { bg1: '#172554', bg2: '#0f172a', accent: '#60a5fa' },
  switch: { bg1: '#064e3b', bg2: '#0f172a', accent: '#4ade80' },
  master: { bg1: '#422006', bg2: '#0f172a', accent: '#fbbf24' },
  slave: { bg1: '#083344', bg2: '#0f172a', accent: '#22d3ee' },
  brat: { bg1: '#431407', bg2: '#0f172a', accent: '#fb923c' },
  brat_tamer: { bg1: '#292524', bg2: '#0f172a', accent: '#a8a29e' },
  spanker: { bg1: '#450a0a', bg2: '#0f172a', accent: '#ef4444' }
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const traitId = (searchParams.get('trait') || 'dominant') as TraitId;
    const rawNickname = searchParams.get('nickname') || '';
    const nickname = rawNickname.slice(0, 10);

    const trait = TRAITS[traitId] || TRAITS.dominant;
    const config = BG_CONFIG[traitId] || BG_CONFIG.dominant;

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
            background: `linear-gradient(135deg, ${config.bg1} 0%, ${config.bg2} 100%)`,
            padding: '40px',
            fontFamily: 'sans-serif'
          }}
        >
          {/* Card Border */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              right: '20px',
              bottom: '20px',
              borderRadius: '32px',
              border: `2px solid ${config.accent}`,
              opacity: 0.35,
              display: 'flex'
            }}
          />

          {/* Top Pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(15, 23, 42, 0.85)',
              border: `1.5px solid ${config.accent}`,
              borderRadius: '50px',
              padding: '10px 28px',
              marginBottom: '24px'
            }}
          >
            <span style={{ fontSize: '22px', color: config.accent, fontWeight: 'bold' }}>
              🐾 BDSM 동물 성향 테스트
            </span>
          </div>

          {/* Emoji Avatar Circle */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '170px',
              height: '170px',
              borderRadius: '85px',
              background: 'rgba(15, 23, 42, 0.9)',
              border: `5px solid ${config.accent}`,
              fontSize: '96px',
              marginBottom: '24px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)'
            }}
          >
            {trait.emoji}
          </div>

          {/* Nickname */}
          {nickname ? (
            <div style={{ fontSize: '24px', color: '#cbd5e1', fontWeight: 600, marginBottom: '6px' }}>
              {nickname}님의 대표 성향
            </div>
          ) : null}

          {/* Animal Name */}
          <div
            style={{
              fontSize: '48px',
              fontWeight: 900,
              color: '#ffffff',
              marginBottom: '10px',
              textAlign: 'center',
              letterSpacing: '-1px'
            }}
          >
            {trait.animal}
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: '24px',
              fontWeight: 600,
              color: '#e2e8f0',
              textAlign: 'center',
              maxWidth: '680px'
            }}
          >
            &quot;{trait.title}&quot;
          </div>

          {/* CTA Footer */}
          <div
            style={{
              marginTop: '32px',
              fontSize: '18px',
              color: config.accent,
              display: 'flex',
              alignItems: 'center',
              fontWeight: 'bold',
              background: 'rgba(255, 255, 255, 0.08)',
              padding: '10px 24px',
              borderRadius: '30px'
            }}
          >
            나와의 성향 궁합 지도 확인하기 ✨
          </div>
        </div>
      ),
      {
        width: 800,
        height: 800,
        emoji: 'twemoji',
        headers: {
          'Cache-Control': 'public, max-age=31536000, s-maxage=31536000, immutable'
        }
      }
    );
  } catch (e: any) {
    console.error('OG Image Generation Error:', e);
    return new Response('Failed to generate image', { status: 500 });
  }
}
