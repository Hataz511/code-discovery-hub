import { motion } from 'framer-motion';
import { ArrowRight, Copy } from 'lucide-react';
import type { MiniProject } from '@/data/clubData';
import { toast } from 'sonner';

interface ProjectCardProps {
  project: MiniProject;
  index: number;
  accentType: 'cyan' | 'orange';
}

const ProjectCard = ({ project, index, accentType }: ProjectCardProps) => {
  const projectNum = String(index + 1).padStart(2, '0');

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(project.title);
    toast.success('Project brief copied!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-surface p-5 rounded-xl border border-foreground/5 hover:border-primary/40 transition-all duration-250 cursor-pointer"
    >
      <div className="flex justify-between items-start mb-3">
        <span className={`text-xs font-mono uppercase tracking-widest ${
          accentType === 'cyan' ? 'text-primary' : 'text-secondary'
        }`}>
          Project {projectNum}
        </span>
        <button
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-foreground/5"
          title="Copy Project Brief"
        >
          <Copy size={12} className="text-muted-foreground" />
        </button>
      </div>
      <h4 className="font-display text-foreground font-semibold text-base leading-tight">
        {project.title}
      </h4>
      <div className="mt-4 flex items-center gap-2 text-xs font-bold text-muted-foreground group-hover:text-primary transition-colors">
        VIEW SPECS <ArrowRight size={14} />
      </div>
    </motion.div>
  );
};

export default ProjectCard;
