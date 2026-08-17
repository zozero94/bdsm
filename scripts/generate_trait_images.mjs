import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// 18 Traits Official Configuration (100% Synced with src/data/traits.ts)
const TRAITS_CONFIG = [
  { id: 'dominant', animal: '카리스마 흑표범', emoji: '🐆', title: '부드러운 카리스마의 지휘관', bg1: '#3b0764', bg2: '#0f172a', accent: '#c084fc' },
  { id: 'submissive', animal: '사랑받는 하얀토끼', emoji: '🐇', title: '다정하게 이끌림을 바라는 탐험가', bg1: '#500724', bg2: '#0f172a', accent: '#f472b6' },
  { id: 'sadist', animal: '매혹적인 붉은여우', emoji: '🦊', title: '반응을 관찰하는 장난꾸러기 전략가', bg1: '#4c0519', bg2: '#0f172a', accent: '#fb7185' },
  { id: 'masochist', animal: '포근한 햄스터', emoji: '🐹', title: '감각의 끝에서 평온을 찾는 힐러', bg1: '#451a03', bg2: '#0f172a', accent: '#fb923c' },
  { id: 'switch', animal: '자유로운 카멜레온', emoji: '🦎', title: '상황과 무드에 따라 변신하는 마에스트로', bg1: '#064e3b', bg2: '#0f172a', accent: '#34d399' },
  { id: 'master', animal: '고결한 백사자', emoji: '🦁', title: '절대적 신뢰의 완전한 지배자', bg1: '#422006', bg2: '#0f172a', accent: '#fbbf24' },
  { id: 'slave', animal: '헌신적인 바다물개', emoji: '🦭', title: '온 마음을 바치는 순백의 헌신', bg1: '#083344', bg2: '#0f172a', accent: '#22d3ee' },
  { id: 'brat', animal: '말썽꾸러기 라쿤', emoji: '🦝', title: '길들여지고 싶은 장난꾸러기 반항아', bg1: '#431407', bg2: '#0f172a', accent: '#fb923c' },
  { id: 'brat_tamer', animal: '노련한 조련사 매', emoji: '🦅', title: '앙탈을 단숨에 제압하는 멘탈 마스터', bg1: '#292524', bg2: '#0f172a', accent: '#a8a29e' },
  { id: 'spanker', animal: '리듬의 캥거루', emoji: '🦘', title: '손끝으로 감각을 깨우는 타격 마스터', bg1: '#450a0a', bg2: '#0f172a', accent: '#ef4444' },
  { id: 'hunter', animal: '날카로운 늑대', emoji: '🐺', title: '목표를 쫓는 열정적 추격자', bg1: '#064e3b', bg2: '#0f172a', accent: '#34d399' },
  { id: 'prey', animal: '숲속의 아기사슴', emoji: '🦌', title: '긴장감 넘치는 숨바꼭질 러버', bg1: '#134e4a', bg2: '#0f172a', accent: '#2dd4bf' },
  { id: 'caregiver', animal: '따뜻한 아빠곰', emoji: '🐻', title: '따스하게 보살펴주는 안식처', bg1: '#451a03', bg2: '#0f172a', accent: '#f59e0b' },
  { id: 'little', animal: '애교쟁이 아기고양이', emoji: '🐱', title: '무한한 애정을 갈구하는 귀염둥이', bg1: '#4a044e', bg2: '#0f172a', accent: '#f472b6' },
  { id: 'rigger', animal: '섬세한 마법사 문어', emoji: '🐙', title: '완벽한 구속과 선의 아티스트', bg1: '#1e1b4b', bg2: '#0f172a', accent: '#818cf8' },
  { id: 'rope_bottom', animal: '자유로운 나비', emoji: '🦋', title: '구속 속에서 피어나는 명상가', bg1: '#082f49', bg2: '#0f172a', accent: '#38bdf8' },
  { id: 'degrader', animal: '위엄있는 호랑이', emoji: '🐯', title: '자존심을 무장해제시키는 심리술사', bg1: '#3f0c10', bg2: '#0f172a', accent: '#f87171' },
  { id: 'degradee', animal: '솔직한 충견 강아지', emoji: '🐶', title: '솔직한 복종 속에서 자유를 찾는 순정파', bg1: '#172554', bg2: '#0f172a', accent: '#60a5fa' }
];

const outDir = path.join(process.cwd(), 'public', 'images', 'traits');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function generateImages() {
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
  <circle cx="400" cy="330" r="220" fill="${t.accent}" opacity="0.22" filter="url(#glow)" />

  <!-- Outer Card Frame -->
  <rect x="40" y="40" width="720" height="720" rx="36" fill="none" stroke="${t.accent}" stroke-width="2" opacity="0.4" />

  <!-- Top Pill Tag -->
  <rect x="250" y="80" width="300" height="48" rx="24" fill="#0f172a" fill-opacity="0.85" stroke="${t.accent}" stroke-width="1.5" stroke-opacity="0.6" />
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

    // Save SVG
    fs.writeFileSync(path.join(outDir, `${t.id}.svg`), svg, 'utf-8');

    // Convert to High Quality PNG (800x800)
    await sharp(Buffer.from(svg))
      .png({ quality: 95 })
      .toFile(path.join(outDir, `${t.id}.png`));

    console.log(`Generated ${t.id}.png (${t.emoji} ${t.animal})`);
  }
}

generateImages().then(() => {
  console.log('All 18 Trait PNG & SVG images perfectly synchronized!');
});
