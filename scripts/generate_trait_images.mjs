import fs from 'fs';
import path from 'path';

// 18 Traits Configuration
const TRAITS_CONFIG = [
  { id: 'dominant', animal: '카리스마 흑표범', emoji: '🐆', title: '부드러운 카리스마의 지휘관', bg1: '#3b0764', bg2: '#0f172a', accent: '#c084fc' },
  { id: 'submissive', animal: '온순한 사슴', emoji: '🦌', title: '온화하고 순수한 헌신가', bg1: '#500724', bg2: '#0f172a', accent: '#f472b6' },
  { id: 'sadist', animal: '날카로운 매', emoji: '🦅', title: '짜릿한 긴장감의 지배자', bg1: '#4c0519', bg2: '#0f172a', accent: '#fb7185' },
  { id: 'masochist', animal: '감성 고슴도치', emoji: '🦔', title: '아픔 속에 피어나는 감성', bg1: '#451a03', bg2: '#0f172a', accent: '#fb923c' },
  { id: 'hunter', animal: '집요한 늑대', emoji: '🐺', title: '목표를 향해 달리는 추적자', bg1: '#064e3b', bg2: '#0f172a', accent: '#34d399' },
  { id: 'prey', animal: '눈치 빠른 토끼', emoji: '🐰', title: '아슬아슬한 도망자', bg1: '#134e4a', bg2: '#0f172a', accent: '#2dd4bf' },
  { id: 'caregiver', animal: '듬직한 불곰', emoji: '🐻', title: '따뜻하게 감싸주는 보호자', bg1: '#451a03', bg2: '#0f172a', accent: '#f59e0b' },
  { id: 'little', animal: '사랑스러운 아기고양이', emoji: '🐱', title: '품에 안기고픈 순수 애교쟁이', bg1: '#4a044e', bg2: '#0f172a', accent: '#f472b6' },
  { id: 'rigger', animal: '치밀한 거미', emoji: '🕷️', title: '정교한 매듭의 설계자', bg1: '#1e1b4b', bg2: '#0f172a', accent: '#818cf8' },
  { id: 'rope_bottom', animal: '자유로운 나비', emoji: '🦋', title: '구속 속에서 피어나는 자유', bg1: '#082f49', bg2: '#0f172a', accent: '#38bdf8' },
  { id: 'degrader', animal: '냉철한 독사', emoji: '🐍', title: '언어의 지배자', bg1: '#3f0c10', bg2: '#0f172a', accent: '#f87171' },
  { id: 'degradee', animal: '순수한 펭귄', emoji: '🐧', title: '수치심을 즐기는 로맨티시스트', bg1: '#172554', bg2: '#0f172a', accent: '#60a5fa' },
  { id: 'switch', animal: '변화무쌍 여우', emoji: '🦊', title: '상황에 따라 변하는 팔색조', bg1: '#064e3b', bg2: '#0f172a', accent: '#4ade80' },
  { id: 'master', animal: '절대 권력 사자', emoji: '🦁', title: '품격 있는 완벽한 통솔자', bg1: '#422006', bg2: '#0f172a', accent: '#fbbf24' },
  { id: 'slave', animal: '충직한 골든리트리버', emoji: '🐕', title: '모든 것을 바치는 충신', bg1: '#083344', bg2: '#0f172a', accent: '#22d3ee' },
  { id: 'brat', animal: '장난꾸러기 라쿤', emoji: '🦝', title: '선 넘을 듯 아슬아슬한 개구쟁이', bg1: '#431407', bg2: '#0f172a', accent: '#fb923c' },
  { id: 'brat_tamer', animal: '침착한 부엉이', emoji: '🦉', title: '밀당의 고수 조련사', bg1: '#292524', bg2: '#0f172a', accent: '#a8a29e' },
  { id: 'spanker', animal: '묵직한 고릴라', emoji: '🦍', title: '손끝으로 전하는 짜릿함', bg1: '#450a0a', bg2: '#0f172a', accent: '#ef4444' }
];

const outDir = path.join(process.cwd(), 'public', 'images', 'traits');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Generate beautiful standalone SVG cards (800x800)
for (const t of TRAITS_CONFIG) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${t.bg1}" />
      <stop offset="100%" stop-color="${t.bg2}" />
    </linearGradient>
    <linearGradient id="circleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${t.accent}" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#0f172a" stop-opacity="0.9" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="30" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="800" height="800" fill="url(#bgGrad)" />

  <!-- Background Ambient Glow -->
  <circle cx="400" cy="330" r="220" fill="${t.accent}" opacity="0.18" filter="url(#glow)" />

  <!-- Outer Card Frame -->
  <rect x="40" y="40" width="720" height="720" rx="36" fill="none" stroke="${t.accent}" stroke-width="2" opacity="0.4" />

  <!-- Top Pill Tag -->
  <rect x="250" y="80" width="300" height="48" rx="24" fill="#0f172a" fill-opacity="0.8" stroke="${t.accent}" stroke-width="1.5" stroke-opacity="0.6" />
  <text x="400" y="112" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="bold" fill="${t.accent}" text-anchor="middle">
    🐾 BDSM 동물 성향 테스트
  </text>

  <!-- Emoji Avatar Circle Frame -->
  <circle cx="400" cy="310" r="130" fill="url(#circleGrad)" stroke="${t.accent}" stroke-width="5" />

  <!-- Big Animal Emoji -->
  <text x="400" y="355" font-family="'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji', sans-serif" font-size="120" text-anchor="middle">
    ${t.emoji}
  </text>

  <!-- Animal Title Label -->
  <text x="400" y="510" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Apple SD Gothic Neo', sans-serif" font-size="44" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="-1">
    ${t.animal}
  </text>

  <!-- Trait Subtitle -->
  <text x="400" y="570" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Apple SD Gothic Neo', sans-serif" font-size="24" font-weight="bold" fill="#e2e8f0" text-anchor="middle">
    &quot;${t.title}&quot;
  </text>

  <!-- CTA Footer Box -->
  <rect x="200" y="640" width="400" height="52" rx="26" fill="${t.accent}" fill-opacity="0.15" stroke="${t.accent}" stroke-width="1.5" />
  <text x="400" y="673" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Apple SD Gothic Neo', sans-serif" font-size="18" font-weight="bold" fill="${t.accent}" text-anchor="middle">
    나와의 성향 궁합 지도 확인하기 ✨
  </text>
</svg>`;

  fs.writeFileSync(path.join(outDir, `${t.id}.svg`), svg, 'utf-8');
}

console.log('Successfully generated 18 trait SVG cards in public/images/traits/');
