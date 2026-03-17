import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import WeekToggle from '@/components/WeekToggle';
import ClubScheduleItem from '@/components/ClubScheduleItem';
import ProjectCard from '@/components/ProjectCard';
import TimelinePulse from '@/components/TimelinePulse';
import { week1Clubs, week2Clubs } from '@/data/clubData';

const Index = () => {
  const [activeWeek, setActiveWeek] = useState<1 | 2>(1);
  const [selectedClubIndex, setSelectedClubIndex] = useState(0);

  const clubs = activeWeek === 1 ? week1Clubs : week2Clubs;
  const selectedClub = clubs[selectedClubIndex];

  const handleWeekChange = (week: 1 | 2) => {
    setActiveWeek(week);
    setSelectedClubIndex(0);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-foreground/5 px-6 py-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
            Tech Club Hub · 2025
          </p>
          <h1 className="font-display text-3xl lg:text-5xl font-bold text-foreground leading-[1.1] mb-2">
            Nga Kodi te Prototipi.
          </h1>
          <p className="text-muted-foreground text-sm lg:text-base max-w-xl">
            10 Klube. 100 Mini-projekte. Një qendër inovacioni.
          </p>
        </div>
      </header>

      {/* Timeline Pulse */}
      <div className="border-b border-foreground/5 px-6 py-3 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <TimelinePulse />
        </div>
      </div>

      {/* Main Content */}
      <main className="px-6 py-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Week Toggle */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Orari i Klubeve
            </h2>
            <WeekToggle activeWeek={activeWeek} onWeekChange={handleWeekChange} />
          </div>

          {/* 2-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-6">
            {/* Left: Schedule */}
            <div className="space-y-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeWeek}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2"
                >
                  {clubs.map((club, i) => (
                    <ClubScheduleItem
                      key={club.id}
                      club={club}
                      isActive={selectedClubIndex === i}
                      index={i}
                      onClick={() => setSelectedClubIndex(i)}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Projects */}
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedClub.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className={`px-3 py-1 rounded-lg text-xs font-mono uppercase tracking-wider font-medium ${
                      selectedClub.accentType === 'cyan'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-secondary/10 text-secondary'
                    }`}>
                      {selectedClub.shortName}
                    </span>
                    <h3 className="font-display text-xl font-bold text-foreground">
                      {selectedClub.name}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">{selectedClub.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedClub.projects.map((project, i) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        index={i}
                        accentType={selectedClub.accentType}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-12 pt-6 border-t border-foreground/5">
            <p className="text-xs text-muted-foreground font-mono">
              Shënim: Këto janë të gjeneruara me AI dhe shërbejnë vetëm si mostër e asaj se si mund të duket realisht një organizim i tillë.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
