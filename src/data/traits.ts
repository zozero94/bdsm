import { TraitId, TraitInfo } from '@/types/test';

export const TRAITS: Record<TraitId, TraitInfo> = {
  dominant: {
    id: 'dominant',
    nameKo: '도미넌트 (지배자)',
    nameEn: 'Dominant',
    shortName: '도미넌트',
    animal: '카리스마 흑표범',
    emoji: '🐆',
    title: '부드러운 카리스마의 지휘관',
    subtitle: '신뢰와 존중을 바탕으로 관계를 책임감 있게 이끄는 든든한 리더',
    badgeColor: 'bg-purple-600 text-white',
    bgGradient: 'from-purple-900/40 via-slate-900 to-slate-950',
    textColor: 'text-purple-400',
    description:
      '상대방을 포용하며 관계의 흐름을 능숙하게 이끌어가는 타입입니다. 강압적인 지배보다는 깊은 신뢰를 바탕으로 상대가 편안하게 자신에게 의지할 수 있는 분위기를 만듭니다. 상대의 사소한 감정선과 신체 상태까지 꼼꼼하게 살피는 책임감 넘치는 수호자입니다.',
    loveStyle:
      '데이트 코스, 대화의 주제, 분위기까지 자연스럽게 리드합니다. 상대방이 내 품 안에서 안도감을 느끼고 솔직하게 기댈 때 가장 큰 보람과 사랑을 느낍니다.',
    heartFlutter: [
      '"너만 믿고 다 맡길게", "네가 하라는 대로 할래"라는 진심 어린 말',
      '내 지시나 리드에 순순히 따르며 편안한 미소를 지어줄 때',
      '신뢰 가득한 눈빛으로 올려다보며 손을 꼭 잡아올 때'
    ],
    redFlags: [
      '신뢰 관계나 사전 합의 없이 일방적으로 룰을 어기거나 기싸움하려는 태도',
      '고마움이나 리드에 대한 존중 없이 당연하게 여기는 무성의함'
    ],
    aftercare:
      '플레이 후 따뜻한 차나 물을 챙겨주고, 꼭 끌어안은 채 "오늘 정말 멋졌고 고마웠어"라며 정서적 안정을 선사합니다.',
    strengths: [
      '결단력 있고 신뢰감을 주는 리더십',
      '상대방의 상태를 세심하게 파악하는 통찰력',
      '관계에 대한 깊은 책임감과 포용력'
    ],
    tips: [
      '자신의 피로도나 약한 모습을 때로는 상대에게 털어놓아도 좋습니다.',
      '상대의 사소한 거절이나 망설임에도 섬세하게 귀 기울여주세요.'
    ],
    bestMatches: ['submissive', 'slave', 'little', 'rope_bottom'],
    worstMatches: ['dominant', 'master', 'hunter'],
    challengeMatches: ['brat', 'switch', 'sadist']
  },

  submissive: {
    id: 'submissive',
    nameKo: '서브미시브 (피지배자)',
    nameEn: 'Submissive',
    shortName: '서브미시브',
    animal: '사랑받는 하얀토끼',
    emoji: '🐇',
    title: '다정하게 이끌림을 바라는 탐험가',
    subtitle: '신뢰하는 상대에게 온전히 나를 맡길 때 가장 깊은 안식을 느끼는 성향',
    badgeColor: 'bg-pink-500 text-white',
    bgGradient: 'from-pink-900/40 via-slate-900 to-slate-950',
    textColor: 'text-pink-400',
    description:
      '믿을 수 있는 파트너의 리드 속에서 일상의 모든 복잡한 결정과 스트레스를 내려놓고 온전한 자유로움을 얻습니다. 헌신적이며 상대방의 기대에 부응하고 칭찬받을 때 날아갈 듯한 기쁨을 느낍니다.',
    loveStyle:
      '상대방의 취향과 기분을 세심하게 맞추며, 칭찬 한마디에 온 세상을 다 가진 듯 행복해합니다. 상대가 든든하게 길을 열어줄 때 무한한 애정과 헌신을 보냅니다.',
    heartFlutter: [
      '"착하다, 오늘 정말 잘했어"라며 머리를 다정하게 쓰다듬어 줄 때',
      '단호하면서도 나를 위해 고민해서 내린 결정을 제시해 줄 때',
      '나의 작은 취향과 신호를 기억해 두고 배려해 줄 때'
    ],
    redFlags: [
      '사전 합의나 안전 단어(Safe Word)를 무시하는 무자비한 강요',
      '헌신과 배려를 당연한 하대나 무시로 대하는 태도'
    ],
    aftercare:
      '따뜻한 담요를 덮고 파트너의 가슴에 안겨 머리를 쓰다듬받으며 "네 덕분에 안전했어"라는 위로를 들을 때 가장 빠르게 회복합니다.',
    strengths: [
      '깊은 공감 능력과 헌신적인 태도',
      '상대방을 편안하게 만들어주는 유연한 배려심',
      '솔직하게 감정을 표현하는 순수함'
    ],
    tips: [
      '나의 안전 경계선(안전 단어)을 명확하게 표현하는 연습이 중요합니다.',
      '맹목적인 맞춤보다는 나 자신의 욕구도 동등하게 존중받아야 합니다.'
    ],
    bestMatches: ['dominant', 'master', 'caregiver', 'brat_tamer'],
    worstMatches: ['submissive', 'slave', 'prey'],
    challengeMatches: ['switch', 'masochist', 'degradee']
  },

  sadist: {
    id: 'sadist',
    nameKo: '새디스트 (가학 성향)',
    nameEn: 'Sadist',
    shortName: '새디스트',
    animal: '매혹적인 붉은여우',
    emoji: '🦊',
    title: '반응을 관찰하는 장난꾸러기 전략가',
    subtitle: '상대의 솔직한 반응과 자극 속에서 특별한 카타르시스를 느끼는 타입',
    badgeColor: 'bg-rose-600 text-white',
    bgGradient: 'from-rose-900/40 via-slate-900 to-slate-950',
    textColor: 'text-rose-400',
    description:
      '심리적이거나 감각적인 자극을 주었을 때 터져 나오는 상대방의 생생하고 솔직한 리액션을 관찰하는 것을 즐깁니다. 단순한 가학이 아니라 상대의 한계와 감각을 누구보다 섬세하게 조율하는 치밀함과 반전의 애프터케어를 가지고 있습니다.',
    loveStyle:
      '연애에서도 짓궂은 장난과 츤데레 매력으로 상대의 감정을 쥐락펴락합니다. 상대방의 표정 변화 하나하나를 놓치지 않고 관찰하며 둘만의 아슬아슬한 긴장감을 연출합니다.',
    heartFlutter: [
      '나의 자극 때문에 얼굴을 붉히며 어쩔 줄 몰라 쩔쩔맬 때',
      '"제발... 그만..." 하면서도 눈빛으로는 더 원하고 있을 때',
      '플레이 후 "아팠지만 너무 좋았어"라며 푹 안겨올 때'
    ],
    redFlags: [
      '반응이 전혀 없이 무미건조하거나 반응을 억지로 숨기는 로봇 같은 태도',
      '동의 없는 폭력과 취향을 구별하지 못하는 무지함'
    ],
    aftercare:
      '자극을 준 부위에 부드럽게 젤이나 로션을 발라주고, 따뜻한 포옹과 달콤한 칭찬으로 현실의 애정을 듬뿍 쏟아줍니다.',
    strengths: [
      '예리한 관찰력과 타이밍 감각',
      '일상의 지루함을 깨뜨리는 매력적인 긴장감 연출',
      '자극 후 애프터케어에 진심인 반전 매력'
    ],
    tips: [
      '자극의 강도보다 중요한 것은 파트너와의 상호 합의와 정서적 교감입니다.',
      '플레이 후 따뜻한 포옹과 지지가 필수적입니다.'
    ],
    bestMatches: ['masochist', 'degradee', 'spanker', 'slave'],
    worstMatches: ['sadist', 'dominant', 'caregiver'],
    challengeMatches: ['brat', 'switch', 'rigger']
  },

  masochist: {
    id: 'masochist',
    nameKo: '마조히스트 (피학 성향)',
    nameEn: 'Masochist',
    shortName: '마조히스트',
    animal: '포근한 햄스터',
    emoji: '🐹',
    title: '감각의 끝에서 평온을 찾는 힐러',
    subtitle: '강렬한 자극과 몰입을 통해 잡념을 지우고 엔도르핀을 얻는 타입',
    badgeColor: 'bg-amber-600 text-white',
    bgGradient: 'from-amber-900/40 via-slate-900 to-slate-950',
    textColor: 'text-amber-400',
    description:
      '신체적/정서적 자극을 견뎌내며 한계를 넘어서는 순간의 해방감을 사랑합니다. 고통 그 자체가 목적이 아니라, 자극의 정점에서 분비되는 엔도르핀과 그 뒤에 찾아오는 깊은 나른함, 그리고 파트너와의 절대적 일체감을 추구합니다.',
    loveStyle:
      '파트너의 강렬한 손길 속에서 모든 스트레스가 씻겨 나가는 카타르시스를 느낍니다. 나를 통제하고 자극해 주는 상대에게 깊은 신뢰와 헌신적인 사랑을 바칩니다.',
    heartFlutter: [
      '매서운 눈빛으로 나를 바라보며 "더 참을 수 있지?"라고 속삭일 때',
      '자극이 끝난 후 이마에 뽀뽀해주며 "정말 대견해"라고 안아줄 때',
      '나의 한계를 섬세하게 짚어가며 점진적으로 강도를 조절해줄 때'
    ],
    redFlags: [
      '애정이나 케어 없이 분풀이하듯 무성의하게 가해지는 거친 행동',
      '플레이 도중 나의 안전 신호나 몸의 비명 신호를 무시하는 행위'
    ],
    aftercare:
      '따뜻한 수분 보충, 초콜릿 등 당분 섭취와 함께 파트너 품에 안겨 온몸의 긴장이 풀릴 때까지 조용히 쉬는 시간이 꼭 필요합니다.',
    strengths: [
      '높은 감각적 수용력과 몰입도',
      '스트레스를 강렬한 경험으로 정화하는 능력',
      '신뢰하는 파트너와의 무조건적인 유대감 형성'
    ],
    tips: [
      '참는 것이 미덕이 아닙니다. 불편함이 한계를 넘기 전에 신호를 보내세요.',
      '자신의 몸 상태를 항상 세심하게 체크해 주세요.'
    ],
    bestMatches: ['sadist', 'spanker', 'degrader', 'master'],
    worstMatches: ['masochist', 'prey', 'little'],
    challengeMatches: ['submissive', 'rope_bottom', 'switch']
  },

  switch: {
    id: 'switch',
    nameKo: '스위치 (올라운더)',
    nameEn: 'Switch',
    shortName: '스위치',
    animal: '자유로운 카멜레온',
    emoji: '🦎',
    title: '상황과 무드에 따라 변신하는 마에스트로',
    subtitle: '지배와 복종, 가학과 피학의 양면을 모두 깊이 이해하고 즐기는 만능 플레이어',
    badgeColor: 'bg-emerald-500 text-slate-950',
    bgGradient: 'from-emerald-950/50 via-slate-900 to-slate-950',
    textColor: 'text-emerald-300',
    description:
      '파트너의 성향과 당일의 무드에 따라 리드하는 Top이 되기도 하고, 온전히 안기는 Bottom이 되기도 합니다. 양쪽 포지션의 심리와 감각을 모두 꿰뚫고 있어 파트너의 가려운 곳을 기가 막히게 긁어주는 최고의 센스를 자랑합니다.',
    loveStyle:
      '어느 한쪽에 얽매이지 않고 카멜레온처럼 관계의 텐션을 자유자재로 바꿉니다. 상대방이 리드하고 싶을 땐 기꺼이 서브가 되어주고, 상대가 지칠 땐 듬직한 지배자로 변신합니다.',
    heartFlutter: [
      '"오늘은 네가 원하는 대로 다 해봐"라며 주도권을 넘겨줄 때',
      '서로의 포지션 전환이 눈빛만으로 자연스럽게 물 흐르듯 맞아떨어질 때',
      '나의 지배적인 면과 연약한 면을 둘 다 사랑해줄 때'
    ],
    redFlags: [
      '한 가지 역할만을 고집하며 나의 반대쪽 성향을 부정하려는 파트너',
      '역할 놀이에 대한 유연성 없이 딱딱하게 정형화된 관계'
    ],
    aftercare:
      '서로 오늘 어떤 순간이 가장 흥분되었는지 대화(디브리핑)를 나누며 동등한 파트너십을 확인하는 것을 가장 좋아합니다.',
    strengths: [
      '압도적인 공감대와 다채로운 플레이 스펙트럼',
      '파트너의 상태에 맞춘 유연한 포지션 스위칭',
      '관계가 결코 지루해지지 않는 무궁무진한 매력'
    ],
    tips: [
      '그날그날 원하는 무드를 파트너에게 솔직하게 먼저 제안해 보세요.',
      '양쪽 성향 중 어느 하나를 너무 오래 억누르지 않도록 밸런스를 유지하세요.'
    ],
    bestMatches: ['switch', 'dominant', 'submissive', 'brat'],
    worstMatches: ['degrader', 'slave'],
    challengeMatches: ['sadist', 'masochist', 'master']
  },

  master: {
    id: 'master',
    nameKo: '마스터 / 미스트리스 (절대 군주)',
    nameEn: 'Master / Mistress',
    shortName: '마스터',
    animal: '고결한 백사자',
    emoji: '🦁',
    title: '절대적 신뢰의 완전한 지배자',
    subtitle: '상대의 삶과 영혼까지 온전히 책임지고 보호하는 고결한 군주',
    badgeColor: 'bg-yellow-600 text-white',
    bgGradient: 'from-yellow-950/50 via-slate-900 to-slate-950',
    textColor: 'text-yellow-400',
    description:
      '단순한 플레이 리드를 넘어 파트너와의 깊은 소속감과 완전한 주종 관계를 구축합니다. 파트너에게 명확한 규칙과 프로토콜을 부여하며, 그에 상응하는 절대적인 보호와 무한한 애정을 제공하는 책임감의 결정체입니다.',
    loveStyle:
      '일상의 규율과 삶의 방향성까지 함께 설계해 줍니다. 상대방이 온전히 나에게 종속되어 평온함을 느낄 수 있도록 완벽한 울타리가 되어줍니다.',
    heartFlutter: [
      '"주인님 뜻대로 하겠습니다"라며 무릎 꿇고 진심으로 헌신할 때',
      '정해준 규칙을 완벽하게 수행하고 칭찬을 갈구하는 눈빛을 보낼 때',
      '세상 모든 일보다 나의 명령과 존재를 최우선으로 둘 때'
    ],
    redFlags: [
      '약속된 룰을 가볍게 여기거나 거짓말과 반항으로 신뢰를 깨뜨리는 행동',
      '주인으로서의 권위와 존중을 훼손하는 무례한 태도'
    ],
    aftercare:
      '충직한 파트너를 무릎에 앉히고 머리를 쓰다듬으며 "나의 가장 소중한 사람"임을 각인시켜 주는 고귀한 케어를 제공합니다.',
    strengths: [
      '타의 추종을 불허하는 카리스마와 리더십',
      '파트너의 삶을 긍정적으로 성장시키는 멘토링',
      '흔들리지 않는 굳건한 신뢰감과 듬직함'
    ],
    tips: [
      '명령 이면에 있는 따뜻한 애정을 표현하는 것을 아끼지 마세요.',
      '파트너가 감당하기 힘든 룰은 정기적으로 점검하고 유연하게 조율하세요.'
    ],
    bestMatches: ['slave', 'submissive', 'masochist'],
    worstMatches: ['master', 'dominant', 'brat'],
    challengeMatches: ['switch', 'degradee']
  },

  slave: {
    id: 'slave',
    nameKo: '슬레이브 (절대 헌신자)',
    nameEn: 'Slave',
    shortName: '슬레이브',
    animal: '헌신적인 바다물개',
    emoji: '🦭',
    title: '온 마음을 바치는 순백의 헌신',
    subtitle: '나의 모든 것을 주인에게 맡기고 소속될 때 최고의 자아를 실현하는 성향',
    badgeColor: 'bg-cyan-700 text-white',
    bgGradient: 'from-cyan-950/50 via-slate-900 to-slate-950',
    textColor: 'text-cyan-300',
    description:
      '서브미시브보다 한 단계 더 나아가 파트너의 완전한 소유물이 됨으로써 일상의 모든 자아 번뇌에서 해방됩니다. 주인의 기쁨이 곧 나의 기쁨이며, 봉사와 헌신 속에서 최고의 행복과 평온을 얻습니다.',
    loveStyle:
      '파트너를 위해 밥을 차리고, 안마를 하고, 지시를 따르는 모든 봉사 활동이 연애의 가장 큰 행복입니다. 주인의 인정과 칭찬 한마디에 모든 피로가 날아갑니다.',
    heartFlutter: [
      '"넌 오직 나만의 것이다"라며 소유권을 분명히 해줄 때',
      '나의 이름 대신 주인이 정해준 애칭이나 칭호로 불러줄 때',
      '목줄이나 인식표 등 주인의 소유임을 나타내는 선물을 받을 때'
    ],
    redFlags: [
      '소유자로서의 책임과 보호 없이 단순 노동력이나 노리개로 함부로 대하는 태도',
      '주인으로서의 품격과 카리스마가 결여된 나약하고 우유부단한 모습'
    ],
    aftercare:
      '주인의 발치나 품에 기대어 "오늘도 훌륭한 내 사람이었다"는 주인의 손길을 느끼며 잠드는 것이 최고의 회복입니다.',
    strengths: [
      '무조건적이고 헌신적인 사랑의 깊이',
      '파트너의 필요를 미리 알아채는 극상의 눈치와 센스',
      '절대 배신하지 않는 굳건한 충성심'
    ],
    tips: [
      '주인의 요구가 나의 정신적/신체적 건강을 해칠 때는 반드시 안전 단어를 사용하세요.',
      '자신의 독립적인 취미와 인간관계도 소중히 지키세요.'
    ],
    bestMatches: ['master', 'dominant', 'caregiver'],
    worstMatches: ['slave', 'submissive', 'prey'],
    challengeMatches: ['sadist', 'spanker']
  },

  brat: {
    id: 'brat',
    nameKo: '브랫 (앙탈쟁이)',
    nameEn: 'Brat',
    shortName: '브랫',
    animal: '말썽꾸러기 라쿤',
    emoji: '🦝',
    title: '길들여지고 싶은 장난꾸러기 반항아',
    subtitle: '일부러 말을 안 듣고 앙탈을 부려 파트너의 단호한 훈육과 관심을 유도하는 매력둥이',
    badgeColor: 'bg-orange-600 text-white',
    bgGradient: 'from-orange-950/50 via-slate-900 to-slate-950',
    textColor: 'text-orange-400',
    description:
      '순순히 복종하는 것은 지루합니다! 일부러 "싫은데? 메롱~" 하며 파트너의 신경을 건드리고 도발합니다. 상대방이 참다못해 나를 휘어잡고 단호하게 훈육(스팽킹/벌)할 때 비로소 진정한 사랑과 복종의 짜릿함을 느낍니다.',
    loveStyle:
      '매일매일 앙탈과 장난으로 파트너와 유쾌한 티키타카를 벌입니다. 나를 꺾고 제압해 줄 수 있는 강인한 멘탈의 파트너에게 치명적인 매력을 느낍니다.',
    heartFlutter: [
      '어이없다는 듯 헛웃음 치며 "너 이리 와, 오늘 혼나야겠네" 하고 손목을 낚아챌 때',
      '나의 반항을 가소롭다는 듯 한 손으로 제압하고 단호하게 훈육할 때',
      '혼난 뒤 훌쩍이는 나를 끌어당겨 "이제 말 잘 들을 거지?" 하고 안아줄 때'
    ],
    redFlags: [
      '나의 장난을 진짜 싸움으로 받아들이고 삐치거나 정색하는 멘탈 약한 파트너',
      '훈육 뒤에 따뜻한 안아줌 없이 진짜 화만 내는 태도'
    ],
    aftercare:
      '혼나고 난 뒤 눈물을 닦아주며 "네가 앙탈부려도 널 정말 사랑해"라는 확신을 줄 때 가장 행복해합니다.',
    strengths: [
      '절대 지루할 틈이 없는 통통 튀는 비타민 매력',
      '파트너의 정복욕과 도파민을 끊임없이 자극하는 텐션',
      '혼난 뒤에 보여주는 극강의 순종과 애교'
    ],
    tips: [
      '파트너가 정말로 지쳤거나 진지한 상황일 때는 장난의 선을 지켜주세요.',
      '단순 반항이 아닌 애정의 표현임을 파트너에게 평소에도 전해주세요.'
    ],
    bestMatches: ['brat_tamer', 'dominant', 'caregiver'],
    worstMatches: ['submissive', 'slave', 'master'],
    challengeMatches: ['sadist', 'switch', 'spanker']
  },

  brat_tamer: {
    id: 'brat_tamer',
    nameKo: '브랫 테이머 (조련사)',
    nameEn: 'Brat Tamer',
    shortName: '브랫 테이머',
    animal: '노련한 조련사 매',
    emoji: '🦅',
    title: '앙탈을 단숨에 제압하는 멘탈 마스터',
    subtitle: '상대의 앙탈과 반항을 귀엽게 관망하다 단호한 손길로 길들이는 노련한 조련사',
    badgeColor: 'bg-stone-600 text-white',
    bgGradient: 'from-stone-900/50 via-slate-900 to-slate-950',
    textColor: 'text-stone-300',
    description:
      '순종적인 상대보다 도발하고 반항하는 상대에게 강한 정복욕을 느낍니다. 상대의 앙탈에 절대 당황하거나 흔들리지 않으며, 여유로운 미소와 함께 확실한 체벌과 훈육으로 결국 자신에게 매달리게 만드는 고수입니다.',
    loveStyle:
      '상대의 도발을 가소롭다는 듯 능숙하게 받아치며 우위를 점합니다. 반항하던 상대가 결국 내 품 안에서 눈물을 글썽이며 얌전해지는 순간 최고의 도파민을 맛봅니다.',
    heartFlutter: [
      '상대가 기세등등하게 도발하다가 내 눈빛 한 번에 흠칫 굳어버릴 때',
      '훈육 후 "잘못했어요, 말 잘 들을게요"라며 품으로 파고들 때',
      '나의 손길 없이는 안달 나서 어쩔 줄 모르는 모습을 볼 때'
    ],
    redFlags: [
      '도발이나 반항에 선을 넘어 진짜 인신공격을 하거나 예의를 잃는 행동',
      '조련하려는데 처음부터 힘없이 축 늘어져 아무 긴장감이 없는 상태'
    ],
    aftercare:
      '확실히 훈육한 후에는 세상에서 가장 다정하게 꼭 안아주며 "오늘 혼나느라 고생했어, 착하다"라고 듬뿍 예뻐해 줍니다.',
    strengths: [
      '강철 같은 멘탈과 흔들리지 않는 침착함',
      '상대를 길들이는 심리전과 타이밍의 귀재',
      '훈육과 보상의 완벽한 밸런스'
    ],
    tips: [
      '상대의 체력과 감정이 실제로 상하지 않도록 중간중간 쉼표를 두세요.',
      '조련 뒤의 보상과 애정 표현을 더욱 극대화해 보세요.'
    ],
    bestMatches: ['brat', 'little', 'submissive'],
    worstMatches: ['dominant', 'master'],
    challengeMatches: ['sadist', 'switch', 'hunter']
  },

  spanker: {
    id: 'spanker',
    nameKo: '스팽커 (타격 훈육자)',
    nameEn: 'Spanker',
    shortName: '스팽커',
    animal: '리듬의 캥거루',
    emoji: '🦘',
    title: '손끝으로 감각을 깨우는 타격 마스터',
    subtitle: '손바닥, 패들 등의 리드미컬한 타격과 체벌을 통해 강렬한 카타르시스를 선사하는 성향',
    badgeColor: 'bg-red-800 text-white',
    bgGradient: 'from-red-950/50 via-slate-900 to-slate-950',
    textColor: 'text-red-400',
    description:
      '찰싹거리는 경쾌한 마찰음과 손바닥에 전해지는 묵직한 타격감, 그리고 상대방의 엉덩이가 붉게 물들어가는 시각적 변화에 깊은 희열을 느낍니다. 해부학적 안전 부위를 숙지하고 타격의 강약 리듬을 조율하는 장인입니다.',
    loveStyle:
      '가벼운 일상 스킨십에서도 엉덩이를 토닥이거나 찰싹 때리는 것을 즐깁니다. 잘못한 일에 대해 단호하게 엎드리게 하고 훈육하는 플레이를 가장 선호합니다.',
    heartFlutter: [
      '스팽킹 소리가 울릴 때마다 파트너의 몸이 움찔거리며 달아오를 때',
      '붉어진 엉덩이를 어루만져줄 때 파트너가 내 손길에 깊이 녹아내릴 때',
      '"몇 대 맞았는지 세어봐"라는 말에 숫자를 세며 순종할 때'
    ],
    redFlags: [
      '뼈나 신장 등 위험 부위를 때리는 무식한 행위',
      '상대의 피부 상태나 컨디션을 고려하지 않는 무분별한 폭력'
    ],
    aftercare:
      '타격 부위에 차가운 알로에 젤을 정성스럽게 발라 마사지해주고, 이마에 키스하며 꼭 안아줍니다.',
    strengths: [
      '리듬감 넘치는 감각 제어와 완벽한 소리 연출',
      '타격과 위로의 극적인 대비를 통한 쾌감 극대화',
      '철저한 신체 안전 지식'
    ],
    tips: [
      '스팽킹 전후로 피부 쿨링과 보습 케어를 철저히 준비하세요.',
      '손바닥 플레이부터 도구(패들, 휩)로 점진적으로 단계를 밟아가세요.'
    ],
    bestMatches: ['masochist', 'brat', 'degradee'],
    worstMatches: ['spanker', 'prey'],
    challengeMatches: ['sadist', 'dominant', 'rigger']
  },

  hunter: {
    id: 'hunter',
    nameKo: '헌터 (사냥꾼)',
    nameEn: 'Hunter',
    shortName: '헌터',
    animal: '날카로운 늑대',
    emoji: '🐺',
    title: '목표를 쫓는 열정적 추격자',
    subtitle: '밀당과 추적의 스릴, 쟁취하는 과정 자체를 즐기는 야성적 타입',
    badgeColor: 'bg-emerald-600 text-white',
    bgGradient: 'from-emerald-900/40 via-slate-900 to-slate-950',
    textColor: 'text-emerald-400',
    description:
      '마치 사냥하듯 상대를 유혹하고 공략하는 긴장감 넘치는 과정을 즐깁니다. 쉽게 넘어오지 않는 상대일수록 도전 의식이 불타오르며, 다이내믹한 텐션과 야성적인 카리스마로 상대를 사로잡습니다.',
    loveStyle:
      '적극적인 대시와 눈빛 공격으로 상대의 숨을 멎게 만듭니다. 잡힐 듯 말 듯 도망치는 상대와의 아슬아슬한 연애 게임에서 최고의 매력을 발휘합니다.',
    heartFlutter: [
      '도망치던 상대가 마침내 내 품 안에 갇혀 가쁜 숨을 몰아쉴 때',
      '나의 강렬한 눈빛을 피하지 못하고 붉어진 얼굴로 바라볼 때',
      '단숨에 낚아챘을 때 놀라움과 함께 심장이 쿵쾅거리는 소리가 들릴 때'
    ],
    redFlags: [
      '너무 쉽게 다 내어주어 추격의 재미가 전혀 없는 밋밋함',
      '밀당 없이 일방적인 집착이나 무관심으로 일관하는 태도'
    ],
    aftercare:
      '사로잡은 상대를 품에 단단히 가둔 채 "이제 넌 어디도 못 가"라며 달콤한 귓속말과 함께 따뜻하게 감싸 안아줍니다.',
    strengths: [
      '높은 열정과 지치지 않는 추진력',
      '상대를 설레게 만드는 밀고 당기기의 달인',
      '위기 상황에서도 빛나는 자신감'
    ],
    tips: [
      '사냥의 흥분이 가라앉은 뒤의 잔잔한 일상 대화도 소중히 가꿔보세요.',
      '상대의 속도에 맞추어 기다려주는 여유가 필요합니다.'
    ],
    bestMatches: ['prey', 'submissive', 'brat'],
    worstMatches: ['hunter', 'dominant', 'master'],
    challengeMatches: ['caregiver', 'rigger', 'switch']
  },

  prey: {
    id: 'prey',
    nameKo: '프레이 (사냥감)',
    nameEn: 'Prey',
    shortName: '프레이',
    animal: '숲속의 아기사슴',
    emoji: '🦌',
    title: '긴장감 넘치는 숨바꼭질 러버',
    subtitle: '쫓기듯 잡히는 순간의 아슬아슬한 스릴과 포획의 쾌감을 즐기는 타입',
    badgeColor: 'bg-teal-600 text-white',
    bgGradient: 'from-teal-900/40 via-slate-900 to-slate-950',
    textColor: 'text-teal-400',
    description:
      '상대방에게 잡힐 듯 말 듯 도망치며 애를 태우고, 마침내 사로잡혔을 때의 압도적인 안도감과 쾌감을 사랑합니다. 예측 불가능한 긴장감과 야성적인 포획이 연애의 가장 큰 원동력입니다.',
    loveStyle:
      '살짝 튕기면서도 상대방의 눈치를 보며 은근한 신호를 보냅니다. 상대가 거칠게 나를 낚아채서 벽으로 몰아세울 때 심장이 터질 것 같은 흥분을 느낍니다.',
    heartFlutter: [
      '도망치다 구석에 몰려 상대의 가슴팍에 갇히는 순간',
      '상대가 귓가에 "드디어 잡았다"며 낮게 속삭일 때',
      '벗어나려 발버둥 칠수록 더 강하게 결박하듯 안아줄 때'
    ],
    redFlags: [
      '도망치는 시늉에 진심으로 포기하고 가버리는 끈기 없는 파트너',
      '진짜 거절 신호와 도망 플레이 신호를 구분하지 못하는 둔감함'
    ],
    aftercare:
      '포획 후 빠져나갈 수 없도록 온몸을 꼭 껴안아주며 "이제 안전해, 내 품이야"라며 심장 박동을 진정시켜 줍니다.',
    strengths: [
      '상대의 본능을 자극하는 치명적인 매력',
      '순발력과 감각적인 표현력',
      '관계를 늘 신선하고 지루하지 않게 만드는 에너지'
    ],
    tips: [
      '도망치는 척이 진짜 거절로 오해받지 않도록 사전에 룰을 맞춰두세요.',
      '지나친 긴장감으로 피로해지지 않도록 가끔은 편안히 릴랙스하세요.'
    ],
    bestMatches: ['hunter', 'dominant', 'master'],
    worstMatches: ['prey', 'submissive', 'masochist'],
    challengeMatches: ['little', 'rope_bottom', 'switch']
  },

  caregiver: {
    id: 'caregiver',
    nameKo: '케어가이버 (보호자/대디)',
    nameEn: 'Caregiver',
    shortName: '케어가이버',
    animal: '따뜻한 아빠곰',
    emoji: '🐻',
    title: '따스하게 보살펴주는 안식처',
    subtitle: '상대를 온 마음으로 아끼고 돌보며 성장을 돕는 힐링 가디언',
    badgeColor: 'bg-orange-500 text-white',
    bgGradient: 'from-orange-900/40 via-slate-900 to-slate-950',
    textColor: 'text-orange-400',
    description:
      '상대방에게 필요한 규칙과 안전한 울타리를 제공하고, 따뜻한 칭찬과 훈육으로 상대를 보호합니다. 상대가 나로 인해 편안하고 사랑받고 있음을 느낄 때 가장 큰 보람과 충만감을 얻습니다.',
    loveStyle:
      '상대의 끼니, 수면, 건강 습관까지 꼼꼼히 챙깁니다. 잘못했을 땐 단호하게 훈육하지만, 그 뒤에는 세상에서 가장 포근한 품을 내어주는 든든한 보호자입니다.',
    heartFlutter: [
      '품 안으로 쏙 파고들어와 쌔근쌔근 잠든 상대의 얼굴을 볼 때',
      '"대디/마미 없으면 아무것도 못해"라며 매달려올 때',
      '내가 정해준 규칙을 지키고 칭찬을 바라며 방긋 웃을 때'
    ],
    redFlags: [
      '보호와 배려를 통제나 간섭으로만 치부하며 삐딱하게 구는 태도',
      '상대의 일방적인 착취에 고마움을 모르는 행동'
    ],
    aftercare:
      '따뜻한 우유나 간식을 챙겨주고, 머리를 빗겨주며 동화책을 읽어주듯 조곤조곤 다정한 대화를 나눕니다.',
    strengths: [
      '무한한 다정함과 포근한 안정감',
      '상대의 감정 변화를 기민하게 알아채는 보살핌',
      '신뢰할 수 있는 멘토 같은 든든함'
    ],
    tips: [
      '보호자의 역할에만 갇혀 내 스트레스와 욕구를 억누르지 마세요.',
      '상대가 스스로 설 수 있는 자율성도 균형 있게 존중해 주세요.'
    ],
    bestMatches: ['little', 'brat', 'submissive', 'slave'],
    worstMatches: ['caregiver', 'dominant', 'master'],
    challengeMatches: ['hunter', 'rigger', 'switch']
  },

  little: {
    id: 'little',
    nameKo: '리틀 / 펫 (아이/반려성향)',
    nameEn: 'Little / Pet',
    shortName: '리틀/펫',
    animal: '애교쟁이 아기고양이',
    emoji: '🐱',
    title: '무한한 애정을 갈구하는 귀염둥이',
    subtitle: '어른의 무거운 책임감을 내려놓고 마음껏 응석 부리고 싶은 순수 성향',
    badgeColor: 'bg-yellow-500 text-slate-950',
    bgGradient: 'from-yellow-900/40 via-slate-900 to-slate-950',
    textColor: 'text-yellow-400',
    description:
      '신뢰하는 상대의 품 안에서 순수한 어린아이처럼 응석을 부리고 돌봄을 받는 시간을 통해 지친 일상의 에너지를 충전합니다. 칭찬, 스킨십, 그리고 작은 선물에 온 세상을 다 가진 듯 행복해합니다.',
    loveStyle:
      '상대방에게 찰싹 달라붙어 떨어지지 않는 껌딱지 애교를 보여줍니다. 나를 어린아이처럼 귀여워해 주고 머리를 쓰다듬어 주는 사람에게 모든 마음을 엽니다.',
    heartFlutter: [
      '"우리 애기 착하네~"라며 머리를 부드럽게 쓰다듬어 줄 때',
      '맛있는 간식을 입에 쏙 넣어주고 볼을 꼬집어줄 때',
      '무서운 일이 있을 때 뒤로 숨겨주며 듬직하게 감싸줄 때'
    ],
    redFlags: [
      '어리광이나 응석을 "철없다"며 핀잔주고 무시하는 차가운 태도',
      '보호자 역할을 하겠다고 해놓고 일방적으로 방치하는 무책임함'
    ],
    aftercare:
      '인형을 안겨주고 꼭 끌어안은 채 "넌 언제나 나의 사랑스러운 아가야"라는 말을 들으며 안심할 때 가장 포근해합니다.',
    strengths: [
      '순수하고 사랑스러운 독보적 매력',
      '지친 파트너를 미소 짓게 만드는 비타민 같은 존재감',
      '풍부한 감수성과 솔직한 감정 표현'
    ],
    tips: [
      '일상의 어른 역할과 리틀 모드를 건강하게 스위치하는 연습이 좋습니다.',
      '원하는 것이 있을 때 떼를 쓰기보다는 솔직하게 대화로 전달해 보세요.'
    ],
    bestMatches: ['caregiver', 'dominant', 'brat_tamer'],
    worstMatches: ['little', 'submissive', 'prey'],
    challengeMatches: ['slave', 'rope_bottom', 'switch']
  },

  rigger: {
    id: 'rigger',
    nameKo: '리거 (결박자/로프 마스터)',
    nameEn: 'Rigger',
    shortName: '리거',
    animal: '섬세한 마법사 문어',
    emoji: '🐙',
    title: '완벽한 구속과 선의 아티스트',
    subtitle: '줄과 도구로 상대를 안전하게 감싸고 통제하는 기술파 미학자',
    badgeColor: 'bg-indigo-600 text-white',
    bgGradient: 'from-indigo-900/40 via-slate-900 to-slate-950',
    textColor: 'text-indigo-400',
    description:
      '물리적인 구속을 통해 상대에게 극도의 무력감과 동시에 궁극의 안전감을 선물합니다. 해부학적 지식, 신경 압박 방지, 그리고 시각적인 아름다움(시바리/킨바쿠)에 깊은 자부심을 가집니다.',
    loveStyle:
      '차분하고 세밀하게 둘만의 공간을 준비합니다. 줄 하나하나를 정성스럽게 엮어가며 상대방의 호흡과 혈액순환을 교감하는 로맨틱한 장인입니다.',
    heartFlutter: [
      '내 줄 매듭 속에서 상대방이 몸을 맡기고 깊은 명상(트랜스)에 빠져들 때',
      '"묶여있는데 왜 이렇게 편안하고 따뜻하지?"라고 고백해올 때',
      '완성된 로프 예술을 감상하며 눈을 반짝일 때'
    ],
    redFlags: [
      '로프의 해부학적 위험성을 무시하고 대충 묶는 비안전 플레이',
      '신경 저림이나 불편함을 말하지 않고 무작정 참는 바텀의 태도'
    ],
    aftercare:
      '신속하고 부드럽게 로프를 해체한 후, 묶였던 부위를 마사지해주며 수분 공급과 이완 스트레칭을 돕습니다.',
    strengths: [
      '철저한 안전의식과 세밀한 집중력',
      '심미적이고 예술적인 플레이 연출',
      '상대의 호흡과 혈액순환까지 챙기는 섬세함'
    ],
    tips: [
      '도구와 기술에 너무 몰입하기보다 파트너의 정서적 교감에 집중하세요.',
      '안전 가위와 빠른 해체 준비는 언제나 기본입니다.'
    ],
    bestMatches: ['rope_bottom', 'masochist', 'submissive'],
    worstMatches: ['rigger', 'hunter'],
    challengeMatches: ['dominant', 'sadist', 'switch']
  },

  rope_bottom: {
    id: 'rope_bottom',
    nameKo: '로프 바텀 (피결박 성향)',
    nameEn: 'Rope Bottom',
    shortName: '로프 바텀',
    animal: '자유로운 나비',
    emoji: '🦋',
    title: '구속 속에서 피어나는 명상가',
    subtitle: '움직일 수 없는 상태에서 오는 최고의 해방감과 내면의 평온을 즐기는 타입',
    badgeColor: 'bg-sky-500 text-white',
    bgGradient: 'from-sky-900/40 via-slate-900 to-slate-950',
    textColor: 'text-sky-400',
    description:
      '온몸이 구속되어 저항할 수 없는 상태가 될 때 오히려 일상의 모든 통제권과 스트레스에서 벗어나는 깊은 해방감(로프스페이스/트랜스 상태)을 경험합니다. 구속 속에서 진정한 자유를 발견합니다.',
    loveStyle:
      '파트너의 정교한 매듭 속에서 나를 완전히 내맡깁니다. 밧줄이 몸을 조여올 때마다 머릿속 잡념이 하얗게 비워지는 카타르시스를 즐깁니다.',
    heartFlutter: [
      '단단히 묶여 꼼짝 못 하는 내 모습을 보며 파트너가 흐뭇하게 미소 지을 때',
      '묶인 상태에서 무방비하게 파트너의 손길과 키스를 받을 때',
      '내 호흡과 신체 변화를 끊임없이 체크하며 "괜찮아?"라고 속삭여줄 때'
    ],
    redFlags: [
      '손가락 저림이나 고통 신호를 보냈는데도 묵살하고 계속 진행하는 행위',
      '안전 가위 준비 없이 섣불리 묶는 비전문적인 태도'
    ],
    aftercare:
      '로프 자국을 부드럽게 마사지받으며, 따뜻한 차를 마시고 근육이 온전히 풀릴 때까지 누워 쉬는 시간이 필요합니다.',
    strengths: [
      '높은 몰입력과 내면적 평화 추구',
      '파트너에 대한 깊은 신뢰와 용기',
      '자신의 신체 감각에 대한 예민한 인지'
    ],
    tips: [
      '저림이나 통증이 생기면 즉시 리거에게 알리는 습관을 가지세요.',
      '결박 후 근육 이완과 수분 보충을 잊지 마세요.'
    ],
    bestMatches: ['rigger', 'dominant', 'sadist', 'master'],
    worstMatches: ['rope_bottom', 'prey'],
    challengeMatches: ['masochist', 'submissive', 'switch']
  },

  degrader: {
    id: 'degrader',
    nameKo: '디그레이더 (언어적/심리적 지배자)',
    nameEn: 'Degrader',
    shortName: '디그레이더',
    animal: '위엄있는 호랑이',
    emoji: '🐯',
    title: '자존심을 무장해제시키는 심리술사',
    subtitle: '거침없고 솔직한 언어적 자극으로 상대의 껍질을 깨뜨리는 카리스마 타입',
    badgeColor: 'bg-red-700 text-white',
    bgGradient: 'from-red-950/50 via-slate-900 to-slate-950',
    textColor: 'text-red-400',
    description:
      '사회적 체면이나 자존심의 껍질을 벗겨내고 상대의 가장 솔직하고 연약한 모습을 이끌어냅니다. 단순한 모욕이 아니라 상대방과의 깊은 신뢰 관계 속에서 심리적 카타르시스와 순수한 복종을 만들어냅니다.',
    loveStyle:
      '도발적인 언어와 날카로운 심리 파악으로 상대를 쥐락펴락합니다. 플레이가 끝난 뒤에는 언제 그랬냐는 듯 세상에서 가장 따뜻한 존중을 보여주는 반전 매력을 지닙니다.',
    heartFlutter: [
      '나의 거친 호통이나 명령 한마디에 상대의 눈빛이 순한 양처럼 바뀔 때',
      '"부끄럽지만... 네 말대로 다 할게"라며 자존심을 내려놓을 때',
      '나의 언어적 자극에 상대의 온몸이 붉게 달아오를 때'
    ],
    redFlags: [
      '상대의 실제 트라우마, 외모 콤플렉스, 가족 등 절대 건드려선 안 될 선을 넘는 행위',
      '플레이 후 일상에서도 상대를 무시하고 막대하는 무개념'
    ],
    aftercare:
      '플레이가 끝나는 즉시 일상 모드로 돌아와 "방금 말들은 다 놀이였고, 넌 내게 세상에서 가장 소중하고 멋진 사람이야"라며 자존감을 100% 북돋아 줍니다.',
    strengths: [
      '뛰어난 언어 구사력과 심리 파악',
      '상대의 내면 방어기제를 해제시키는 능력',
      '플레이 후 진심 어린 존중과 칭찬으로 주는 반전 감동'
    ],
    tips: [
      '상대의 실제 트라우마나 콤플렉스는 절대 건드리지 않는 선을 지켜야 합니다.',
      '끝난 뒤에는 반드시 일상적 자아로 복귀시켜주는 따뜻한 대화가 필요합니다.'
    ],
    bestMatches: ['degradee', 'masochist', 'submissive'],
    worstMatches: ['degrader', 'caregiver'],
    challengeMatches: ['sadist', 'dominant', 'switch']
  },

  degradee: {
    id: 'degradee',
    nameKo: '디그레이디 (피수치 성향)',
    nameEn: 'Degradee',
    shortName: '디그레이디',
    animal: '솔직한 충견 강아지',
    emoji: '🐶',
    title: '솔직한 복종 속에서 자유를 찾는 순정파',
    subtitle: '자존심을 내려놓고 온전히 낮아지는 순간의 깊은 쾌감을 아는 성향',
    badgeColor: 'bg-amber-700 text-white',
    bgGradient: 'from-amber-950/50 via-slate-900 to-slate-950',
    textColor: 'text-amber-400',
    description:
      '신뢰하는 상대 앞에서 평소 지켜왔던 어른다운 체면과 자존심을 완전히 내려놓을 때 형언할 수 없는 쾌감과 심리적 해방을 느낍니다. 꾸밈없는 내 민낯을 온전히 내어주고 상대에게 사로잡히길 원합니다.',
    loveStyle:
      '신뢰하는 파트너 앞에서는 한없이 낮아지고 솔직해집니다. 부끄러운 언어나 수치스러운 명령을 받을 때 오히려 마음속 깊은 곳에서 순수한 복종심이 솟아납니다.',
    heartFlutter: [
      '나의 부끄러운 약점을 콕 짚으며 짓궂게 놀릴 때',
      '"넌 내 앞에서만 이렇게 낮아지는 거야"라며 특별함을 부여해줄 때',
      '수치심에 얼굴을 붉히고 있을 때 턱을 잡고 눈을 맞추며 지긋이 바라볼 때'
    ],
    redFlags: [
      '신뢰 관계가 없는 상태에서 다짜고짜 인격 모독을 하는 무례함',
      '끝난 뒤에 진짜로 나를 하찮은 사람으로 대하는 태도'
    ],
    aftercare:
      '파트너에게 꼭 안겨 "넌 정말 아름답고 소중해"라는 칭찬을 듬뿍 들으며 자존감을 충전받는 시간이 필수적입니다.',
    strengths: [
      '진솔하고 꾸밈없는 순수함',
      '파트너에 대한 절대적인 신뢰',
      '깊은 감정적 카타르시스를 수용하는 능력'
    ],
    tips: [
      '스스로의 자존감을 깎아먹지 않도록 플레이와 현실을 확실히 분리하세요.',
      '수용하기 힘든 단어나 금기 주제는 사전에 꼭 공유해 두세요.'
    ],
    bestMatches: ['degrader', 'sadist', 'dominant', 'master'],
    worstMatches: ['degradee', 'caregiver', 'prey'],
    challengeMatches: ['submissive', 'masochist', 'switch']
  }
};
