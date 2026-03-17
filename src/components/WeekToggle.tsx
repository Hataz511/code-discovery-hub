import { motion } from 'framer-motion';

interface WeekToggleProps {
  activeWeek: 1 | 2;
  onWeekChange: (week: 1 | 2) => void;
}

const WeekToggle = ({ activeWeek, onWeekChange }: WeekToggleProps) => {
  return (
    <div className="bg-surface border border-foreground/10 p-1 rounded-full flex gap-1 relative">
      {([1, 2] as const).map((week) => (
        <button
          key={week}
          onClick={() => onWeekChange(week)}
          className="relative px-6 py-2 rounded-full text-sm font-medium transition-colors z-10"
          style={{ color: activeWeek === week ? 'hsl(var(--primary-foreground))' : 'hsl(var(--muted-foreground))' }}
        >
          {activeWeek === week && (
            <motion.div
              layoutId="weekIndicator"
              className="absolute inset-0 bg-primary rounded-full"
              transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
            />
          )}
          <span className="relative z-10">Java {week}</span>
        </button>
      ))}
    </div>
  );
};

export default WeekToggle;
