import { TraitId } from '@/types/test';
import { TRAITS } from '@/data/traits';

interface CharacterAvatarProps {
  traitId: TraitId;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
  className?: string;
}

export default function CharacterAvatar({
  traitId,
  size = 'md',
  showBadge = false,
  className = ''
}: CharacterAvatarProps) {
  const trait = TRAITS[traitId] || TRAITS.dominant;

  const sizeClasses = {
    sm: 'w-12 h-12 text-2xl',
    md: 'w-20 h-20 text-4xl',
    lg: 'w-28 h-28 text-5xl',
    xl: 'w-36 h-36 text-6xl'
  };

  const ringGradients: Record<TraitId, string> = {
    dominant: 'from-purple-500 via-indigo-500 to-slate-900',
    submissive: 'from-pink-400 via-rose-300 to-slate-900',
    sadist: 'from-rose-500 via-red-600 to-slate-900',
    masochist: 'from-amber-400 via-orange-500 to-slate-900',
    switch: 'from-emerald-400 via-teal-500 to-slate-900',
    master: 'from-yellow-400 via-amber-600 to-slate-900',
    slave: 'from-cyan-400 via-blue-600 to-slate-900',
    brat: 'from-orange-400 via-rose-500 to-slate-900',
    brat_tamer: 'from-stone-400 via-zinc-600 to-slate-900',
    spanker: 'from-red-600 via-rose-800 to-slate-900',
    hunter: 'from-emerald-400 via-teal-600 to-slate-900',
    prey: 'from-teal-300 via-cyan-500 to-slate-900',
    caregiver: 'from-orange-400 via-amber-500 to-slate-900',
    little: 'from-yellow-300 via-amber-400 to-slate-900',
    rigger: 'from-indigo-400 via-purple-600 to-slate-900',
    rope_bottom: 'from-sky-300 via-blue-500 to-slate-900',
    degrader: 'from-red-500 via-rose-700 to-slate-900',
    degradee: 'from-amber-600 via-orange-700 to-slate-900'
  };

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* Glow Effect */}
      <div
        className={`absolute inset-0 rounded-full bg-gradient-to-tr ${
          ringGradients[traitId] || ringGradients.dominant
        } blur-xl opacity-40 animate-pulse`}
      />

      {/* Main Avatar Circle */}
      <div
        className={`relative z-10 ${sizeClasses[size]} rounded-full p-[3px] bg-gradient-to-tr ${
          ringGradients[traitId] || ringGradients.dominant
        } shadow-xl flex items-center justify-center transition-transform hover:scale-105`}
      >
        <div className="w-full h-full rounded-full bg-slate-900/90 backdrop-blur-md flex items-center justify-center select-none shadow-inner">
          <span className="transform -translate-y-0.5 filter drop-shadow-md">
            {trait.emoji}
          </span>
        </div>
      </div>

      {/* Optional Badge */}
      {showBadge && (
        <div className="relative z-20 -mt-3">
          <span
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold shadow-md ${trait.badgeColor}`}
          >
            {trait.animal}
          </span>
        </div>
      )}
    </div>
  );
}
