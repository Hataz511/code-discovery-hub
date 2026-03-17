import { motion } from 'framer-motion';
import type { Club } from '@/data/clubData';

interface ClubScheduleItemProps {
  club: Club;
  isActive: boolean;
  index: number;
  onClick: () => void;
}

const ClubScheduleItem = ({ club, isActive, index, onClick }: ClubScheduleItemProps) => {
  const isToday = new Date().getDay() === club.dayIndex;

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06, duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className={`relative w-full text-left p-4 rounded-xl border transition-all duration-250 ${
        isActive
          ? 'bg-surface-hover border-primary/50 card-shadow'
          : 'bg-surface border-foreground/5 hover:border-foreground/10 hover:bg-surface-hover'
      }`}
    >
      {/* Status line for today */}
      {isToday && (
        <div className="absolute left-0 top-3 bottom-3 w-0.5 bg-primary rounded-full animate-pulse-glow" />
      )}

      <div className="flex items-center justify-between mb-1">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {club.day} · {club.time}
        </span>
        <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider ${
          club.accentType === 'cyan' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'
        }`}>
          {club.shortName}
        </span>
      </div>
      <h3 className="font-display text-sm font-semibold text-foreground leading-tight">{club.name}</h3>
      <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">{club.description}</p>
    </motion.button>
  );
};

export default ClubScheduleItem;
