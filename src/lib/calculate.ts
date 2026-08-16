import { QUESTIONS } from '@/data/questions';
import { TRAITS } from '@/data/traits';
import { TestResultData, TraitId } from '@/types/test';

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
  answers: Record<number, number>,
  nickname?: string
): TestResultData {
  const traitRawScores: Record<TraitId, number> = {} as any;
  const traitMaxPossible: Record<TraitId, number> = {} as any;

  ALL_TRAITS.forEach((t) => {
    traitRawScores[t] = 0;
    traitMaxPossible[t] = 0;
  });

  QUESTIONS.forEach((q) => {
    const userChoice = answers[q.id] || 3;
    const normalizedScore = (userChoice - 1) / 4;

    Object.entries(q.weights).forEach(([tId, weight]) => {
      const trait = tId as TraitId;
      if (traitRawScores[trait] !== undefined) {
        traitRawScores[trait] += normalizedScore * (weight || 0);
        traitMaxPossible[trait] += 1.0 * (weight || 0);
      }
    });
  });

  const scores: Record<TraitId, number> = {} as Record<TraitId, number>;
  ALL_TRAITS.forEach((trait) => {
    const max = traitMaxPossible[trait];
    if (max > 0) {
      const percentage = Math.round((traitRawScores[trait] / max) * 100);
      scores[trait] = Math.min(100, Math.max(0, percentage));
    } else {
      scores[trait] = 0;
    }
  });

  const sortedTraits = [...ALL_TRAITS].sort(
    (a, b) => (scores[b] || 0) - (scores[a] || 0)
  );

  const primaryTrait = sortedTraits[0] || 'dominant';
  const secondaryTrait =
    scores[sortedTraits[1]] >= 40 ? sortedTraits[1] : undefined;

  return {
    scores,
    primaryTrait,
    secondaryTrait,
    rawAnswers: QUESTIONS.map((q) => answers[q.id] || 3),
    timestamp: Date.now(),
    nickname: nickname?.trim() || undefined
  };
}

// URL-Safe Base64 인코딩 (+ -> -, / -> _, = 제거)
export function encodeResultData(data: TestResultData): string {
  try {
    const compactObj = {
      n: data.nickname || '',
      p: data.primaryTrait,
      s: data.secondaryTrait || '',
      t: data.timestamp,
      sc: Object.entries(data.scores)
        .map(([k, v]) => `${k}:${v}`)
        .join(',')
    };
    const jsonStr = JSON.stringify(compactObj);
    const base64 =
      typeof window !== 'undefined'
        ? btoa(encodeURIComponent(jsonStr))
        : Buffer.from(encodeURIComponent(jsonStr)).toString('base64');

    // URL-safe 변환
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  } catch (e) {
    console.error('Failed to encode result data', e);
    return '';
  }
}

// URL-Safe Base64 디코딩 (복원 및 유효성 검증)
export function decodeResultData(encoded: string): TestResultData | null {
  try {
    if (!encoded || typeof encoded !== 'string') return null;

    // URL-safe 복원 (- -> +, _ -> / 및 패딩 계산)
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

export function calculateChemistry(
  traitA: TraitId,
  traitB: TraitId
): {
  score: number;
  type: 'best' | 'worst' | 'challenge' | 'neutral';
  title: string;
  description: string;
} {
  const infoA = TRAITS[traitA];
  if (!infoA) {
    return {
      score: 50,
      type: 'neutral',
      title: '평온한 조화',
      description: '서로를 알아갈수록 새로운 매력을 발견할 수 있는 관계입니다.'
    };
  }

  if (infoA.bestMatches.includes(traitB)) {
    return {
      score: 95,
      type: 'best',
      title: '💖 환상의 소울메이트 (95%)',
      description: `서로의 성향이 완벽하게 맞물려 폭발적인 시너지와 만족감을 주는 최고의 궁합입니다!`
    };
  }

  if (infoA.worstMatches.includes(traitB)) {
    return {
      score: 25,
      type: 'worst',
      title: '⚡ 불꽃 튀는 긴장 관계 (25%)',
      description: `같은 영역을 두고 주도권 다툼이 일어날 수 있으니, 상호 배려와 명확한 룰이 필수적인 관계입니다.`
    };
  }

  if (infoA.challengeMatches.includes(traitB)) {
    return {
      score: 80,
      type: 'challenge',
      title: '🎯 흥미진진한 도전 케미 (80%)',
      description: `색다른 자극과 미지의 영역을 함께 탐험하며 깊은 유대감을 쌓아갈 수 있는 케미입니다.`
    };
  }

  return {
    score: 65,
    type: 'neutral',
    title: '🌿 조화로운 중립 케미 (65%)',
    description: '서로 대화하며 취향을 조율해 나갈 때 편안하고 지속 가능한 관계를 맺을 수 있습니다.'
  };
}
