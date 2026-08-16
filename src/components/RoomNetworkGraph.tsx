'use client';

import { useState, useMemo } from 'react';
import { RoomData, RoomMember } from '@/types/test';
import { TRAITS } from '@/data/traits';
import { calculateChemistry } from '@/lib/calculate';
import CharacterAvatar from './CharacterAvatar';
import { Sparkles, Heart, Users } from 'lucide-react';

interface RoomNetworkGraphProps {
  room: RoomData;
}

export default function RoomNetworkGraph({ room }: RoomNetworkGraphProps) {
  const [selectedPair, setSelectedPair] = useState<[RoomMember, RoomMember] | null>(null);

  const members = room.members || [];

  // useMemo: room.members 참조 안정성 보장 (실제 멤버 추가/변경 시에만 재연산)
  const chemistryPairs = useMemo(() => {
    if (!room.members || room.members.length < 2) return [];

    const pairs: {
      memberA: RoomMember;
      memberB: RoomMember;
      chemistry: ReturnType<typeof calculateChemistry>;
    }[] = [];

    for (let i = 0; i < room.members.length; i++) {
      for (let j = i + 1; j < room.members.length; j++) {
        const chem = calculateChemistry(
          room.members[i].primaryTrait,
          room.members[j].primaryTrait
        );
        pairs.push({
          memberA: room.members[i],
          memberB: room.members[j],
          chemistry: chem
        });
      }
    }

    return pairs.sort((a, b) => b.chemistry.score - a.chemistry.score);
  }, [room.members]);

  // Selected pair chemistry: O(1) lightweight lookup inline calculation
  const selectedChemistry = selectedPair
    ? calculateChemistry(selectedPair[0].primaryTrait, selectedPair[1].primaryTrait)
    : null;

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Members Grid Overview */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-5 backdrop-blur-xl shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-400" />
            <h3 className="font-bold text-sm text-white">
              참여 멤버 ({members.length}명)
            </h3>
          </div>
          <span className="text-[11px] text-slate-400">
            실시간 업데이트 중
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {members.map((m) => {
            const trait = TRAITS[m.primaryTrait] || TRAITS.dominant;
            return (
              <div
                key={m.id}
                className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex flex-col items-center text-center gap-2 hover:border-purple-500/50 transition-all"
              >
                <CharacterAvatar traitId={m.primaryTrait} size="sm" />
                <div className="flex flex-col min-w-0 w-full">
                  <span className="font-bold text-xs text-slate-200 truncate">
                    {m.nickname}
                  </span>
                  <span className="text-[10px] text-purple-400 font-medium">
                    {trait.animal}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chemistry Relationships */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-5 backdrop-blur-xl shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-pink-400" />
          <h3 className="font-bold text-sm text-white">
            우리 모임 케미 랭킹 & 관계도
          </h3>
        </div>

        {chemistryPairs.length === 0 ? (
          <div className="py-8 text-center text-slate-400 flex flex-col items-center gap-2">
            <Users className="w-8 h-8 text-slate-600 animate-pulse" />
            <p className="text-xs">아직 비교할 친구가 부족해요!</p>
            <p className="text-[11px] text-slate-500">
              링크를 공유해서 친구를 초대해 보세요.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {chemistryPairs.map(({ memberA, memberB, chemistry }, idx) => {
              const traitA = TRAITS[memberA.primaryTrait];
              const traitB = TRAITS[memberB.primaryTrait];

              const badgeColor =
                chemistry.type === 'best'
                  ? 'text-pink-400 bg-pink-500/10 border-pink-500/30'
                  : chemistry.type === 'worst'
                  ? 'text-rose-400 bg-rose-500/10 border-rose-500/30'
                  : 'text-purple-400 bg-purple-500/10 border-purple-500/30';

              return (
                <div
                  key={`${memberA.id}-${memberB.id}`}
                  onClick={() => setSelectedPair([memberA, memberB])}
                  className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-purple-500/40 transition-all flex flex-col gap-2.5 cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-800 text-[10px] font-bold text-slate-400 flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-bold text-white">
                        {memberA.nickname} & {memberB.nickname}
                      </span>
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${badgeColor}`}>
                      {chemistry.score}점 ({chemistry.type === 'best' ? '꿀케미' : chemistry.type === 'worst' ? '상극' : '도전'})
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-900">
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <span>{traitA?.emoji} {traitA?.shortName}</span>
                      <span className="text-slate-600">⇄</span>
                      <span>{traitB?.emoji} {traitB?.shortName}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-medium truncate max-w-[200px]">
                      {chemistry.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Selected Pair Modal */}
      {selectedPair && selectedChemistry && (
        <div
          onClick={() => setSelectedPair(null)}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-3xl bg-slate-900 border border-slate-700 p-6 shadow-2xl flex flex-col gap-4 animate-in fade-in zoom-in duration-200"
          >
            <div className="flex items-center justify-around py-2">
              <div className="flex flex-col items-center">
                <CharacterAvatar traitId={selectedPair[0].primaryTrait} size="md" />
                <span className="text-xs font-bold text-white mt-2">
                  {selectedPair[0].nickname}
                </span>
                <span className="text-[10px] text-purple-400">
                  {TRAITS[selectedPair[0].primaryTrait]?.animal}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <Heart className="w-6 h-6 text-pink-500 animate-bounce" />
                <span className="text-xs font-black text-pink-400 mt-1">
                  {selectedChemistry.score}%
                </span>
              </div>
              <div className="flex flex-col items-center">
                <CharacterAvatar traitId={selectedPair[1].primaryTrait} size="md" />
                <span className="text-xs font-bold text-white mt-2">
                  {selectedPair[1].nickname}
                </span>
                <span className="text-[10px] text-pink-400">
                  {TRAITS[selectedPair[1].primaryTrait]?.animal}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
              <p className="font-bold text-purple-300 mb-1">
                {selectedChemistry.title}
              </p>
              <p>
                {selectedChemistry.description}
              </p>
            </div>

            <button
              onClick={() => setSelectedPair(null)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
