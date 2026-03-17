import { days } from '@/data/clubData';

const TimelinePulse = () => {
  const today = new Date().getDay();
  // Map JS day (0=Sun,1=Mon,...) to our index (0=Mon,...,4=Fri)
  const activeDayIndex = today >= 1 && today <= 5 ? today - 1 : -1;

  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-2">
      {days.map((day, i) => (
        <div
          key={day}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
            i === activeDayIndex
              ? 'bg-primary/10 text-primary border border-primary/30'
              : 'text-muted-foreground border border-transparent'
          }`}
        >
          {i === activeDayIndex && (
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
          )}
          {day}
        </div>
      ))}
      <div className="ml-auto text-xs font-mono text-muted-foreground px-3">
        16:00–18:00
      </div>
    </div>
  );
};

export default TimelinePulse;
