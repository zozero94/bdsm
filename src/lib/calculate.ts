import { TraitId, TestResultData } from '@/types/test';
import { QUESTIONS } from '@/data/questions';
import { TRAITS } from '@/data/traits';

export const ALL_TRAITS: TraitId[] = [
  'dominant',
  'submissive',
  'sadist',
  'masochist',
  'hunter',
  'prey',
  'caregiver',
  'little',
  'rigger',
  'rope_bottom',
  'degrader',
  'degradee',
  'switch',
  'master',
  'slave',
  'brat',
  'brat_tamer',
  'spanker'
];

export function calculateTestResults(
  answers: Record<number, number>, // questionId -> score (1~5)
  nickname?: string
): TestResultData {
  const rawScores: Record<TraitId, number> = {} as Record<TraitId, number>;
  const maxPossibleScores: Record<TraitId, number> = {} as Record<TraitId, number>;

  ALL_TRAITS.forEach((trait) => {
    rawScores[trait] = 0;
    maxPossibleScores[trait] = 0;
  });

  QUESTIONS.forEach((q) => {
    const userChoice = answers[q.id] || 3;
    const scoreFactor = (userChoice - 1) / 4;

    Object.entries(q.weights).forEach(([traitKey, weight]) => {
      const trait = traitKey as TraitId;
      if (rawScores[trait] !== undefined && weight) {
        rawScores[trait] += scoreFactor * weight;
        maxPossibleScores[trait] += weight;
      }
    });
  });

  const percentageScores: Record<TraitId, number> = {} as Record<TraitId, number>;
  ALL_TRAITS.forEach((trait) => {
    const max = maxPossibleScores[trait] || 1;
    const raw = rawScores[trait] || 0;
    const pct = Math.round((raw / max) * 100);
    percentageScores[trait] = Math.max(5, Math.min(99, pct));
  });

  const sortedTraits = [...ALL_TRAITS].sort(
    (a, b) => percentageScores[b] - percentageScores[a]
  );

  const primaryTrait = sortedTraits[0];
  const secondaryTrait =
    percentageScores[sortedTraits[1]] >= 40 ? sortedTraits[1] : undefined;

  return {
    scores: percentageScores,
    primaryTrait,
    secondaryTrait,
    rawAnswers: Object.values(answers),
    timestamp: Date.now(),
    nickname: nickname?.trim() || undefined
  };
}

export function calculateChemistry(
  trait1: TraitId,
  trait2: TraitId
): { score: number; type: 'best' | 'worst' | 'challenge' | 'neutral'; title: string; description: string } {
  const info1 = TRAITS[trait1];
  const info2 = TRAITS[trait2];

  if (!info1 || !info2) {
    return { score: 50, type: 'neutral', title: '보통의 관계', description: '알 수 없는 관계입니다.' };
  }

  if (info1.bestMatches && info1.bestMatches.includes(trait2)) {
    return {
      score: 95,
      type: 'best',
      title: '환상의 꿀케미 조합',
      description: `${info1.animal}와(과) ${info2.animal}은(는) 서로의 성향과 니즈를 완벽하게 채워주는 최고의 파트너입니다.`
    };
  }

  if (info1.worstMatches && info1.worstMatches.includes(trait2)) {
    return {
      score: 30,
      type: 'worst',
      title: '주의가 필요한 상극 관계',
      description: `${info1.animal}와(과) ${info2.animal}은(는) 가치관 충돌이 일어날 수 있어 세심한 배려와 조율이 필요합니다.`
    };
  }

  if (info1.challengeMatches && info1.challengeMatches.includes(trait2)) {
    return {
      score: 75,
      type: 'challenge',
      title: '짜릿한 밀당 케미',
      description: `${info1.animal}와(과) ${info2.animal}은(는) 긴장감 넘치는 티키타카를 자랑하는 흥미진진한 조합입니다.`
    };
  }

  return {
    score: 60,
    type: 'neutral',
    title: '무난하고 안정적인 관계',
    description: `서로를 배려하며 자연스럽게 맞춰갈 수 있는 무난한 궁합입니다.`
  };
}

// -------------------------------------------------------------
// Ultra-Compact Binary Byte-Packed URL Serializer (40~48 chars)
// Structure: [PrimaryTraitIndex(1B)] + [18 Scores (18B)] + [Nickname UTF-8 (NB)]
// -------------------------------------------------------------

function toUrlSafeBase64(uint8: Uint8Array): string {
  let binary = '';
  const len = uint8.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(uint8[i]);
  }
  const base64 = btoa(binary);
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromUrlSafeBase64(safeBase64: string): Uint8Array | null {
  try {
    let base64 = safeBase64.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    const binary = atob(base64);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  } catch {
    return null;
  }
}

// Compact binary serializer (40~48 chars)
export function encodeResultData(data: TestResultData): string {
  try {
    const primaryIdx = Math.max(0, ALL_TRAITS.indexOf(data.primaryTrait));
    const scoresBytes = ALL_TRAITS.map((t) => Math.min(100, Math.max(0, data.scores[t] || 0)));
    
    // UTF-8 Nickname bytes
    const nickname = (data.nickname || '').slice(0, 12);
    const encoder = typeof TextEncoder !== 'undefined' ? new TextEncoder() : null;
    const nicknameBytes = encoder ? encoder.encode(nickname) : [];

    const totalLen = 1 + ALL_TRAITS.length + 1 + nicknameBytes.length;
    const buffer = new Uint8Array(totalLen);

    // Byte 0: Primary Trait Index (0~17)
    buffer[0] = primaryIdx;

    // Bytes 1~18: 18 Trait Scores (0~100)
    for (let i = 0; i < ALL_TRAITS.length; i++) {
      buffer[1 + i] = scoresBytes[i];
    }

    // Byte 19: Nickname length
    buffer[1 + ALL_TRAITS.length] = nicknameBytes.length;

    // Bytes 20+: Nickname UTF-8
    for (let i = 0; i < nicknameBytes.length; i++) {
      buffer[1 + ALL_TRAITS.length + 1 + i] = nicknameBytes[i];
    }

    return toUrlSafeBase64(buffer);
  } catch (e) {
    console.error('Failed to encode compact result data', e);
    return '';
  }
}

// Compact binary & legacy JSON Base64 deserializer (100% backward compatible)
export function decodeResultData(encoded: string): TestResultData | null {
  try {
    if (!encoded || typeof encoded !== 'string') return null;

    // 1. Try Ultra-Compact Binary Decoding
    const bytes = fromUrlSafeBase64(encoded);
    if (bytes && bytes.length >= 1 + ALL_TRAITS.length + 1) {
      const primaryIdx = bytes[0];
      if (primaryIdx < ALL_TRAITS.length) {
        const primaryTrait = ALL_TRAITS[primaryIdx];
        const scores: Record<TraitId, number> = {} as Record<TraitId, number>;
        
        for (let i = 0; i < ALL_TRAITS.length; i++) {
          scores[ALL_TRAITS[i]] = Math.min(100, Math.max(0, bytes[1 + i]));
        }

        const nickLen = bytes[1 + ALL_TRAITS.length];
        let nickname: string | undefined;
        if (nickLen > 0 && bytes.length >= 1 + ALL_TRAITS.length + 1 + nickLen) {
          const nickSlice = bytes.slice(
            1 + ALL_TRAITS.length + 1,
            1 + ALL_TRAITS.length + 1 + nickLen
          );
          const decoder = typeof TextDecoder !== 'undefined' ? new TextDecoder() : null;
          nickname = decoder ? decoder.decode(nickSlice) : undefined;
        }

        return {
          scores,
          primaryTrait,
          timestamp: Date.now(),
          nickname: nickname?.slice(0, 20)
        };
      }
    }

    // 2. Fallback to Legacy JSON Base64
    let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }

    let jsonStr = '';
    if (typeof window !== 'undefined') {
      jsonStr = decodeURIComponent(atob(base64));
    } else {
      jsonStr = decodeURIComponent(
        Buffer.from(base64, 'base64').toString('utf-8')
      );
    }

    const compactObj = JSON.parse(jsonStr);
    if (!compactObj || !compactObj.p || !TRAITS[compactObj.p as TraitId]) {
      return null;
    }

    const scores: Record<TraitId, number> = {} as Record<TraitId, number>;
    ALL_TRAITS.forEach((t) => {
      scores[t] = 0;
    });

    if (compactObj.sc && typeof compactObj.sc === 'string') {
      const pairs = compactObj.sc.split(',');
      pairs.forEach((pair: string) => {
        const [k, v] = pair.split(':');
        if (k && v !== undefined && ALL_TRAITS.includes(k as TraitId)) {
          const parsed = parseInt(v, 10);
          scores[k as TraitId] = isNaN(parsed) ? 0 : Math.min(100, Math.max(0, parsed));
        }
      });
    }

    return {
      scores,
      primaryTrait: compactObj.p as TraitId,
      secondaryTrait: (compactObj.s && TRAITS[compactObj.s as TraitId])
        ? (compactObj.s as TraitId)
        : undefined,
      timestamp: compactObj.t || Date.now(),
      nickname: compactObj.n ? String(compactObj.n).slice(0, 20) : undefined
    };
  } catch (e) {
    console.error('Failed to decode result data', e);
    return null;
  }
}
