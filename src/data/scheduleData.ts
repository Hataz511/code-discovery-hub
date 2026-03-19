// ==================== Orari i Ligjëratave dhe Ushtrimeve ====================

export interface ScheduleEntry {
  id: string;
  subject: string;
  type: 'ligjëratë' | 'ushtrim' | 'laborator';
  day: 'E Hënë' | 'E Martë' | 'E Mërkurë' | 'E Enjte' | 'E Premte';
  startTime: string;
  endTime: string;
  professor: string;
  room: string;
  year: number;
  semester: 1 | 2;
}

export interface ProgramSchedule {
  program: string;
  level: 'bachelor' | 'master';
  years: {
    year: number;
    semester1: ScheduleEntry[];
    semester2: ScheduleEntry[];
  }[];
}

export const scheduleData: ProgramSchedule[] = [
  // ===================== BACHELOR =====================
  {
    program: 'Kimi e Përgjithshme',
    level: 'bachelor',
    years: [
      {
        year: 1,
        semester1: [
          { id: 'kp-1-1-01', subject: 'Kimi e Përgjithshme I', type: 'ligjëratë', day: 'E Hënë', startTime: '09:00', endTime: '11:00', professor: 'Prof. Dr. Arben Malaj', room: 'Salla A1', year: 1, semester: 1 },
          { id: 'kp-1-1-02', subject: 'Kimi e Përgjithshme I', type: 'ushtrim', day: 'E Mërkurë', startTime: '09:00', endTime: '11:00', professor: 'MSc. Elona Hoxha', room: 'Salla A2', year: 1, semester: 1 },
          { id: 'kp-1-1-03', subject: 'Kimi e Përgjithshme I', type: 'laborator', day: 'E Premte', startTime: '09:00', endTime: '12:00', professor: 'MSc. Elona Hoxha', room: 'Lab. Kimi e Përgjithshme', year: 1, semester: 1 },
          { id: 'kp-1-1-04', subject: 'Matematikë I', type: 'ligjëratë', day: 'E Martë', startTime: '09:00', endTime: '11:00', professor: 'Prof. Dr. Ilir Kristo', room: 'Salla A1', year: 1, semester: 1 },
          { id: 'kp-1-1-05', subject: 'Matematikë I', type: 'ushtrim', day: 'E Enjte', startTime: '09:00', endTime: '11:00', professor: 'MSc. Dritan Leka', room: 'Salla A3', year: 1, semester: 1 },
          { id: 'kp-1-1-06', subject: 'Fizikë I', type: 'ligjëratë', day: 'E Hënë', startTime: '11:00', endTime: '13:00', professor: 'Prof. Dr. Besnik Gashi', room: 'Salla B1', year: 1, semester: 1 },
          { id: 'kp-1-1-07', subject: 'Fizikë I', type: 'ushtrim', day: 'E Mërkurë', startTime: '11:00', endTime: '13:00', professor: 'MSc. Arta Bela', room: 'Salla B2', year: 1, semester: 1 },
          { id: 'kp-1-1-08', subject: 'Biologji e Përgjithshme', type: 'ligjëratë', day: 'E Martë', startTime: '11:00', endTime: '13:00', professor: 'Prof. Asoc. Fatma Dervishi', room: 'Salla A2', year: 1, semester: 1 },
        ],
        semester2: [
          { id: 'kp-1-2-01', subject: 'Kimi e Përgjithshme II', type: 'ligjëratë', day: 'E Hënë', startTime: '09:00', endTime: '11:00', professor: 'Prof. Dr. Arben Malaj', room: 'Salla A1', year: 1, semester: 2 },
          { id: 'kp-1-2-02', subject: 'Kimi e Përgjithshme II', type: 'ushtrim', day: 'E Mërkurë', startTime: '09:00', endTime: '11:00', professor: 'MSc. Elona Hoxha', room: 'Salla A2', year: 1, semester: 2 },
          { id: 'kp-1-2-03', subject: 'Kimi e Përgjithshme II', type: 'laborator', day: 'E Premte', startTime: '09:00', endTime: '12:00', professor: 'MSc. Elona Hoxha', room: 'Lab. Kimi e Përgjithshme', year: 1, semester: 2 },
          { id: 'kp-1-2-04', subject: 'Matematikë II', type: 'ligjëratë', day: 'E Martë', startTime: '09:00', endTime: '11:00', professor: 'Prof. Dr. Ilir Kristo', room: 'Salla A1', year: 1, semester: 2 },
          { id: 'kp-1-2-05', subject: 'Matematikë II', type: 'ushtrim', day: 'E Enjte', startTime: '09:00', endTime: '11:00', professor: 'MSc. Dritan Leka', room: 'Salla A3', year: 1, semester: 2 },
          { id: 'kp-1-2-06', subject: 'Kimi Analitike I', type: 'ligjëratë', day: 'E Hënë', startTime: '11:00', endTime: '13:00', professor: 'Prof. Dr. Vjollca Tafaj', room: 'Salla B1', year: 1, semester: 2 },
          { id: 'kp-1-2-07', subject: 'Kimi Analitike I', type: 'laborator', day: 'E Enjte', startTime: '11:00', endTime: '14:00', professor: 'MSc. Genti Reka', room: 'Lab. Kimi Analitike 1', year: 1, semester: 2 },
        ],
      },
      {
        year: 2,
        semester1: [
          { id: 'kp-2-1-01', subject: 'Kimi Organike I', type: 'ligjëratë', day: 'E Hënë', startTime: '09:00', endTime: '11:00', professor: 'Prof. Dr. Mimoza Haveri', room: 'Salla A1', year: 2, semester: 1 },
          { id: 'kp-2-1-02', subject: 'Kimi Organike I', type: 'ushtrim', day: 'E Mërkurë', startTime: '09:00', endTime: '11:00', professor: 'MSc. Besa Topi', room: 'Salla A3', year: 2, semester: 1 },
          { id: 'kp-2-1-03', subject: 'Kimi Organike I', type: 'laborator', day: 'E Premte', startTime: '09:00', endTime: '12:00', professor: 'MSc. Besa Topi', room: 'Lab. Kimi Organike 1', year: 2, semester: 1 },
          { id: 'kp-2-1-04', subject: 'Kimi Fizike I', type: 'ligjëratë', day: 'E Martë', startTime: '09:00', endTime: '11:00', professor: 'Prof. Dr. Altin Mele', room: 'Salla B1', year: 2, semester: 1 },
          { id: 'kp-2-1-05', subject: 'Kimi Fizike I', type: 'ushtrim', day: 'E Enjte', startTime: '09:00', endTime: '11:00', professor: 'MSc. Dorina Kuka', room: 'Salla B2', year: 2, semester: 1 },
          { id: 'kp-2-1-06', subject: 'Kimi Fizike I', type: 'laborator', day: 'E Mërkurë', startTime: '13:00', endTime: '16:00', professor: 'MSc. Dorina Kuka', room: 'Lab. Kimi Fizike 1', year: 2, semester: 1 },
          { id: 'kp-2-1-07', subject: 'Kimi Analitike II', type: 'ligjëratë', day: 'E Hënë', startTime: '11:00', endTime: '13:00', professor: 'Prof. Dr. Vjollca Tafaj', room: 'Salla A2', year: 2, semester: 1 },
          { id: 'kp-2-1-08', subject: 'Kimi Analitike II', type: 'laborator', day: 'E Enjte', startTime: '13:00', endTime: '16:00', professor: 'MSc. Genti Reka', room: 'Lab. Kimi Analitike 2', year: 2, semester: 1 },
        ],
        semester2: [
          { id: 'kp-2-2-01', subject: 'Kimi Organike II', type: 'ligjëratë', day: 'E Hënë', startTime: '09:00', endTime: '11:00', professor: 'Prof. Dr. Mimoza Haveri', room: 'Salla A1', year: 2, semester: 2 },
          { id: 'kp-2-2-02', subject: 'Kimi Organike II', type: 'ushtrim', day: 'E Mërkurë', startTime: '09:00', endTime: '11:00', professor: 'MSc. Besa Topi', room: 'Salla A3', year: 2, semester: 2 },
          { id: 'kp-2-2-03', subject: 'Kimi Organike II', type: 'laborator', day: 'E Premte', startTime: '09:00', endTime: '12:00', professor: 'MSc. Besa Topi', room: 'Lab. Kimi Organike 2', year: 2, semester: 2 },
          { id: 'kp-2-2-04', subject: 'Kimi Fizike II', type: 'ligjëratë', day: 'E Martë', startTime: '09:00', endTime: '11:00', professor: 'Prof. Dr. Altin Mele', room: 'Salla B1', year: 2, semester: 2 },
          { id: 'kp-2-2-05', subject: 'Kimi Fizike II', type: 'laborator', day: 'E Enjte', startTime: '09:00', endTime: '12:00', professor: 'MSc. Dorina Kuka', room: 'Lab. Kimi Fizike 2', year: 2, semester: 2 },
          { id: 'kp-2-2-06', subject: 'Biokimi', type: 'ligjëratë', day: 'E Hënë', startTime: '13:00', endTime: '15:00', professor: 'Prof. Asoc. Fatma Dervishi', room: 'Salla A2', year: 2, semester: 2 },
          { id: 'kp-2-2-07', subject: 'Biokimi', type: 'laborator', day: 'E Mërkurë', startTime: '13:00', endTime: '16:00', professor: 'MSc. Ledia Nano', room: 'Lab. Biokimia 1', year: 2, semester: 2 },
        ],
      },
      {
        year: 3,
        semester1: [
          { id: 'kp-3-1-01', subject: 'Kimi Organike III', type: 'ligjëratë', day: 'E Hënë', startTime: '09:00', endTime: '11:00', professor: 'Prof. Dr. Mimoza Haveri', room: 'Salla A1', year: 3, semester: 1 },
          { id: 'kp-3-1-02', subject: 'Kimi Organike III', type: 'laborator', day: 'E Premte', startTime: '09:00', endTime: '12:00', professor: 'MSc. Besa Topi', room: 'Lab. Kimi Organike 3', year: 3, semester: 1 },
          { id: 'kp-3-1-03', subject: 'Kimi Instrumentale', type: 'ligjëratë', day: 'E Martë', startTime: '09:00', endTime: '11:00', professor: 'Prof. Dr. Vjollca Tafaj', room: 'Salla B1', year: 3, semester: 1 },
          { id: 'kp-3-1-04', subject: 'Kimi Instrumentale', type: 'laborator', day: 'E Enjte', startTime: '09:00', endTime: '12:00', professor: 'MSc. Genti Reka', room: 'Lab. Kimi Analitike 1', year: 3, semester: 1 },
          { id: 'kp-3-1-05', subject: 'Kimia e Mjedisit', type: 'ligjëratë', day: 'E Mërkurë', startTime: '09:00', endTime: '11:00', professor: 'Prof. Asoc. Edlira Kukali', room: 'Salla A2', year: 3, semester: 1 },
          { id: 'kp-3-1-06', subject: 'Kimia e Mjedisit', type: 'laborator', day: 'E Premte', startTime: '13:00', endTime: '16:00', professor: 'MSc. Rea Dashi', room: 'Lab. Kimia e Mjedisit', year: 3, semester: 1 },
        ],
        semester2: [
          { id: 'kp-3-2-01', subject: 'Bioteknologji', type: 'ligjëratë', day: 'E Hënë', startTime: '09:00', endTime: '11:00', professor: 'Prof. Asoc. Fatma Dervishi', room: 'Salla A1', year: 3, semester: 2 },
          { id: 'kp-3-2-02', subject: 'Bioteknologji', type: 'laborator', day: 'E Mërkurë', startTime: '09:00', endTime: '12:00', professor: 'MSc. Ledia Nano', room: 'Lab. Bioteknologji', year: 3, semester: 2 },
          { id: 'kp-3-2-03', subject: 'Kimi Industriale', type: 'ligjëratë', day: 'E Martë', startTime: '09:00', endTime: '11:00', professor: 'Prof. Dr. Altin Mele', room: 'Salla B1', year: 3, semester: 2 },
          { id: 'kp-3-2-04', subject: 'Projekt Diplome', type: 'ushtrim', day: 'E Enjte', startTime: '09:00', endTime: '13:00', professor: 'Sipas temës', room: 'Sipas laboratorit', year: 3, semester: 2 },
        ],
      },
    ],
  },
  {
    program: 'Kimi Inxhinierike',
    level: 'bachelor',
    years: [
      {
        year: 1,
        semester1: [
          { id: 'ki-1-1-01', subject: 'Kimi e Përgjithshme I', type: 'ligjëratë', day: 'E Hënë', startTime: '11:00', endTime: '13:00', professor: 'Prof. Dr. Arben Malaj', room: 'Salla C1', year: 1, semester: 1 },
          { id: 'ki-1-1-02', subject: 'Kimi e Përgjithshme I', type: 'ushtrim', day: 'E Mërkurë', startTime: '11:00', endTime: '13:00', professor: 'MSc. Elona Hoxha', room: 'Salla C2', year: 1, semester: 1 },
          { id: 'ki-1-1-03', subject: 'Kimi e Përgjithshme I', type: 'laborator', day: 'E Premte', startTime: '13:00', endTime: '16:00', professor: 'MSc. Elona Hoxha', room: 'Lab. Kimi e Përgjithshme', year: 1, semester: 1 },
          { id: 'ki-1-1-04', subject: 'Matematikë Inxhinierike I', type: 'ligjëratë', day: 'E Martë', startTime: '11:00', endTime: '13:00', professor: 'Prof. Dr. Ilir Kristo', room: 'Salla C1', year: 1, semester: 1 },
          { id: 'ki-1-1-05', subject: 'Matematikë Inxhinierike I', type: 'ushtrim', day: 'E Enjte', startTime: '11:00', endTime: '13:00', professor: 'MSc. Dritan Leka', room: 'Salla C3', year: 1, semester: 1 },
          { id: 'ki-1-1-06', subject: 'Fizikë Teknike I', type: 'ligjëratë', day: 'E Hënë', startTime: '13:00', endTime: '15:00', professor: 'Prof. Dr. Besnik Gashi', room: 'Salla C2', year: 1, semester: 1 },
          { id: 'ki-1-1-07', subject: 'Hyrje në Inxhinierinë Kimike', type: 'ligjëratë', day: 'E Mërkurë', startTime: '13:00', endTime: '15:00', professor: 'Prof. Asoc. Sokol Domi', room: 'Salla C1', year: 1, semester: 1 },
        ],
        semester2: [
          { id: 'ki-1-2-01', subject: 'Kimi e Përgjithshme II', type: 'ligjëratë', day: 'E Hënë', startTime: '11:00', endTime: '13:00', professor: 'Prof. Dr. Arben Malaj', room: 'Salla C1', year: 1, semester: 2 },
          { id: 'ki-1-2-02', subject: 'Kimi e Përgjithshme II', type: 'laborator', day: 'E Premte', startTime: '13:00', endTime: '16:00', professor: 'MSc. Elona Hoxha', room: 'Lab. Kimi e Përgjithshme', year: 1, semester: 2 },
          { id: 'ki-1-2-03', subject: 'Matematikë Inxhinierike II', type: 'ligjëratë', day: 'E Martë', startTime: '11:00', endTime: '13:00', professor: 'Prof. Dr. Ilir Kristo', room: 'Salla C1', year: 1, semester: 2 },
          { id: 'ki-1-2-04', subject: 'Termodinamikë', type: 'ligjëratë', day: 'E Mërkurë', startTime: '11:00', endTime: '13:00', professor: 'Prof. Asoc. Sokol Domi', room: 'Salla C2', year: 1, semester: 2 },
          { id: 'ki-1-2-05', subject: 'Termodinamikë', type: 'ushtrim', day: 'E Enjte', startTime: '11:00', endTime: '13:00', professor: 'MSc. Dorina Kuka', room: 'Salla C3', year: 1, semester: 2 },
          { id: 'ki-1-2-06', subject: 'Termodinamikë', type: 'laborator', day: 'E Premte', startTime: '09:00', endTime: '12:00', professor: 'MSc. Dorina Kuka', room: 'Lab. Kimi Fizike 1', year: 1, semester: 2 },
        ],
      },
      {
        year: 2,
        semester1: [
          { id: 'ki-2-1-01', subject: 'Procese Kimike Industriale', type: 'ligjëratë', day: 'E Hënë', startTime: '09:00', endTime: '11:00', professor: 'Prof. Asoc. Sokol Domi', room: 'Salla C1', year: 2, semester: 1 },
          { id: 'ki-2-1-02', subject: 'Procese Kimike Industriale', type: 'ushtrim', day: 'E Mërkurë', startTime: '09:00', endTime: '11:00', professor: 'MSc. Klodian Bega', room: 'Salla C2', year: 2, semester: 1 },
          { id: 'ki-2-1-03', subject: 'Kimi Organike I', type: 'ligjëratë', day: 'E Martë', startTime: '09:00', endTime: '11:00', professor: 'Prof. Dr. Mimoza Haveri', room: 'Salla C1', year: 2, semester: 1 },
          { id: 'ki-2-1-04', subject: 'Kimi Organike I', type: 'laborator', day: 'E Enjte', startTime: '09:00', endTime: '12:00', professor: 'MSc. Besa Topi', room: 'Lab. Kimi Organike 1', year: 2, semester: 1 },
          { id: 'ki-2-1-05', subject: 'Mekanikë Fluidesh', type: 'ligjëratë', day: 'E Hënë', startTime: '11:00', endTime: '13:00', professor: 'Prof. Dr. Altin Mele', room: 'Salla C2', year: 2, semester: 1 },
          { id: 'ki-2-1-06', subject: 'Mekanikë Fluidesh', type: 'ushtrim', day: 'E Premte', startTime: '09:00', endTime: '11:00', professor: 'MSc. Dorina Kuka', room: 'Salla C3', year: 2, semester: 1 },
        ],
        semester2: [
          { id: 'ki-2-2-01', subject: 'Inxhinieri Reaksionesh', type: 'ligjëratë', day: 'E Hënë', startTime: '09:00', endTime: '11:00', professor: 'Prof. Asoc. Sokol Domi', room: 'Salla C1', year: 2, semester: 2 },
          { id: 'ki-2-2-02', subject: 'Inxhinieri Reaksionesh', type: 'ushtrim', day: 'E Mërkurë', startTime: '09:00', endTime: '11:00', professor: 'MSc. Klodian Bega', room: 'Salla C2', year: 2, semester: 2 },
          { id: 'ki-2-2-03', subject: 'Kimi Analitike I', type: 'ligjëratë', day: 'E Martë', startTime: '09:00', endTime: '11:00', professor: 'Prof. Dr. Vjollca Tafaj', room: 'Salla C1', year: 2, semester: 2 },
          { id: 'ki-2-2-04', subject: 'Kimi Analitike I', type: 'laborator', day: 'E Enjte', startTime: '09:00', endTime: '12:00', professor: 'MSc. Genti Reka', room: 'Lab. Kimi Analitike 1', year: 2, semester: 2 },
          { id: 'ki-2-2-05', subject: 'Shkenca e Materialeve', type: 'ligjëratë', day: 'E Premte', startTime: '09:00', endTime: '11:00', professor: 'Prof. Dr. Altin Mele', room: 'Salla B1', year: 2, semester: 2 },
          { id: 'ki-2-2-06', subject: 'Shkenca e Materialeve', type: 'laborator', day: 'E Hënë', startTime: '13:00', endTime: '16:00', professor: 'MSc. Dorina Kuka', room: 'Lab. Kimi Fizike 2', year: 2, semester: 2 },
        ],
      },
      {
        year: 3,
        semester1: [
          { id: 'ki-3-1-01', subject: 'Operacione Njësore', type: 'ligjëratë', day: 'E Hënë', startTime: '09:00', endTime: '11:00', professor: 'Prof. Asoc. Sokol Domi', room: 'Salla C1', year: 3, semester: 1 },
          { id: 'ki-3-1-02', subject: 'Operacione Njësore', type: 'ushtrim', day: 'E Mërkurë', startTime: '09:00', endTime: '11:00', professor: 'MSc. Klodian Bega', room: 'Salla C2', year: 3, semester: 1 },
          { id: 'ki-3-1-03', subject: 'Kontrolli i Cilësisë', type: 'ligjëratë', day: 'E Martë', startTime: '09:00', endTime: '11:00', professor: 'Prof. Dr. Vjollca Tafaj', room: 'Salla B1', year: 3, semester: 1 },
          { id: 'ki-3-1-04', subject: 'Kontrolli i Cilësisë', type: 'laborator', day: 'E Enjte', startTime: '09:00', endTime: '12:00', professor: 'MSc. Genti Reka', room: 'Lab. Kimi Analitike 2', year: 3, semester: 1 },
          { id: 'ki-3-1-05', subject: 'Inxhinieri Mjedisore', type: 'ligjëratë', day: 'E Premte', startTime: '09:00', endTime: '11:00', professor: 'Prof. Asoc. Edlira Kukali', room: 'Salla C1', year: 3, semester: 1 },
          { id: 'ki-3-1-06', subject: 'Inxhinieri Mjedisore', type: 'laborator', day: 'E Mërkurë', startTime: '13:00', endTime: '16:00', professor: 'MSc. Rea Dashi', room: 'Lab. Kimia e Mjedisit', year: 3, semester: 1 },
        ],
        semester2: [
          { id: 'ki-3-2-01', subject: 'Projektim Procesesh', type: 'ligjëratë', day: 'E Hënë', startTime: '09:00', endTime: '11:00', professor: 'Prof. Asoc. Sokol Domi', room: 'Salla C1', year: 3, semester: 2 },
          { id: 'ki-3-2-02', subject: 'Projektim Procesesh', type: 'ushtrim', day: 'E Mërkurë', startTime: '09:00', endTime: '11:00', professor: 'MSc. Klodian Bega', room: 'Salla C2', year: 3, semester: 2 },
          { id: 'ki-3-2-03', subject: 'Siguria në Industri Kimike', type: 'ligjëratë', day: 'E Martë', startTime: '09:00', endTime: '11:00', professor: 'Prof. Asoc. Edlira Kukali', room: 'Salla B1', year: 3, semester: 2 },
          { id: 'ki-3-2-04', subject: 'Projekt Diplome', type: 'ushtrim', day: 'E Enjte', startTime: '09:00', endTime: '13:00', professor: 'Sipas temës', room: 'Sipas laboratorit', year: 3, semester: 2 },
        ],
      },
    ],
  },
  {
    program: 'Kimi Ushqimore',
    level: 'bachelor',
    years: [
      {
        year: 1,
        semester1: [
          { id: 'ku-1-1-01', subject: 'Kimi e Përgjithshme I', type: 'ligjëratë', day: 'E Hënë', startTime: '13:00', endTime: '15:00', professor: 'Prof. Dr. Arben Malaj', room: 'Salla D1', year: 1, semester: 1 },
          { id: 'ku-1-1-02', subject: 'Kimi e Përgjithshme I', type: 'ushtrim', day: 'E Mërkurë', startTime: '13:00', endTime: '15:00', professor: 'MSc. Elona Hoxha', room: 'Salla D2', year: 1, semester: 1 },
          { id: 'ku-1-1-03', subject: 'Kimi e Përgjithshme I', type: 'laborator', day: 'E Enjte', startTime: '13:00', endTime: '16:00', professor: 'MSc. Elona Hoxha', room: 'Lab. Kimi e Përgjithshme', year: 1, semester: 1 },
          { id: 'ku-1-1-04', subject: 'Biologji Ushqimore', type: 'ligjëratë', day: 'E Martë', startTime: '13:00', endTime: '15:00', professor: 'Prof. Asoc. Fatma Dervishi', room: 'Salla D1', year: 1, semester: 1 },
          { id: 'ku-1-1-05', subject: 'Matematikë I', type: 'ligjëratë', day: 'E Premte', startTime: '09:00', endTime: '11:00', professor: 'Prof. Dr. Ilir Kristo', room: 'Salla D1', year: 1, semester: 1 },
          { id: 'ku-1-1-06', subject: 'Matematikë I', type: 'ushtrim', day: 'E Premte', startTime: '11:00', endTime: '13:00', professor: 'MSc. Dritan Leka', room: 'Salla D2', year: 1, semester: 1 },
        ],
        semester2: [
          { id: 'ku-1-2-01', subject: 'Kimi e Përgjithshme II', type: 'ligjëratë', day: 'E Hënë', startTime: '13:00', endTime: '15:00', professor: 'Prof. Dr. Arben Malaj', room: 'Salla D1', year: 1, semester: 2 },
          { id: 'ku-1-2-02', subject: 'Kimi e Përgjithshme II', type: 'laborator', day: 'E Enjte', startTime: '13:00', endTime: '16:00', professor: 'MSc. Elona Hoxha', room: 'Lab. Kimi e Përgjithshme', year: 1, semester: 2 },
          { id: 'ku-1-2-03', subject: 'Mikrobiologji Ushqimore', type: 'ligjëratë', day: 'E Martë', startTime: '13:00', endTime: '15:00', professor: 'Prof. Asoc. Fatma Dervishi', room: 'Salla D1', year: 1, semester: 2 },
          { id: 'ku-1-2-04', subject: 'Mikrobiologji Ushqimore', type: 'laborator', day: 'E Mërkurë', startTime: '13:00', endTime: '16:00', professor: 'MSc. Ledia Nano', room: 'Lab. Bioteknologji', year: 1, semester: 2 },
          { id: 'ku-1-2-05', subject: 'Fizikë I', type: 'ligjëratë', day: 'E Premte', startTime: '09:00', endTime: '11:00', professor: 'Prof. Dr. Besnik Gashi', room: 'Salla D1', year: 1, semester: 2 },
        ],
      },
      {
        year: 2,
        semester1: [
          { id: 'ku-2-1-01', subject: 'Kimi Organike Ushqimore', type: 'ligjëratë', day: 'E Hënë', startTime: '09:00', endTime: '11:00', professor: 'Prof. Dr. Mimoza Haveri', room: 'Salla D1', year: 2, semester: 1 },
          { id: 'ku-2-1-02', subject: 'Kimi Organike Ushqimore', type: 'laborator', day: 'E Mërkurë', startTime: '09:00', endTime: '12:00', professor: 'MSc. Besa Topi', room: 'Lab. Kimi Organike 1', year: 2, semester: 1 },
          { id: 'ku-2-1-03', subject: 'Analiza e Ushqimeve', type: 'ligjëratë', day: 'E Martë', startTime: '09:00', endTime: '11:00', professor: 'Prof. Dr. Vjollca Tafaj', room: 'Salla D1', year: 2, semester: 1 },
          { id: 'ku-2-1-04', subject: 'Analiza e Ushqimeve', type: 'laborator', day: 'E Enjte', startTime: '09:00', endTime: '12:00', professor: 'MSc. Genti Reka', room: 'Lab. Kimi Analitike 1', year: 2, semester: 1 },
          { id: 'ku-2-1-05', subject: 'Biokimi Ushqimore', type: 'ligjëratë', day: 'E Premte', startTime: '09:00', endTime: '11:00', professor: 'Prof. Asoc. Fatma Dervishi', room: 'Salla D2', year: 2, semester: 1 },
          { id: 'ku-2-1-06', subject: 'Biokimi Ushqimore', type: 'laborator', day: 'E Hënë', startTime: '13:00', endTime: '16:00', professor: 'MSc. Ledia Nano', room: 'Lab. Biokimia 1', year: 2, semester: 1 },
        ],
        semester2: [
          { id: 'ku-2-2-01', subject: 'Teknologji Ushqimore', type: 'ligjëratë', day: 'E Hënë', startTime: '09:00', endTime: '11:00', professor: 'Prof. Asoc. Sokol Domi', room: 'Salla D1', year: 2, semester: 2 },
          { id: 'ku-2-2-02', subject: 'Teknologji Ushqimore', type: 'ushtrim', day: 'E Mërkurë', startTime: '09:00', endTime: '11:00', professor: 'MSc. Klodian Bega', room: 'Salla D2', year: 2, semester: 2 },
          { id: 'ku-2-2-03', subject: 'Aditivë Ushqimorë', type: 'ligjëratë', day: 'E Martë', startTime: '09:00', endTime: '11:00', professor: 'Prof. Dr. Mimoza Haveri', room: 'Salla D1', year: 2, semester: 2 },
          { id: 'ku-2-2-04', subject: 'Aditivë Ushqimorë', type: 'laborator', day: 'E Enjte', startTime: '09:00', endTime: '12:00', professor: 'MSc. Besa Topi', room: 'Lab. Kimi Organike 2', year: 2, semester: 2 },
          { id: 'ku-2-2-05', subject: 'Siguria Ushqimore', type: 'ligjëratë', day: 'E Premte', startTime: '09:00', endTime: '11:00', professor: 'Prof. Asoc. Edlira Kukali', room: 'Salla D1', year: 2, semester: 2 },
        ],
      },
      {
        year: 3,
        semester1: [
          { id: 'ku-3-1-01', subject: 'Kontrolli i Cilësisë së Ushqimeve', type: 'ligjëratë', day: 'E Hënë', startTime: '09:00', endTime: '11:00', professor: 'Prof. Dr. Vjollca Tafaj', room: 'Salla D1', year: 3, semester: 1 },
          { id: 'ku-3-1-02', subject: 'Kontrolli i Cilësisë së Ushqimeve', type: 'laborator', day: 'E Mërkurë', startTime: '09:00', endTime: '12:00', professor: 'MSc. Genti Reka', room: 'Lab. Kimi Analitike 2', year: 3, semester: 1 },
          { id: 'ku-3-1-03', subject: 'Toksikologji Ushqimore', type: 'ligjëratë', day: 'E Martë', startTime: '09:00', endTime: '11:00', professor: 'Prof. Asoc. Edlira Kukali', room: 'Salla D2', year: 3, semester: 1 },
          { id: 'ku-3-1-04', subject: 'Ambalazhi dhe Ruajtja', type: 'ligjëratë', day: 'E Enjte', startTime: '09:00', endTime: '11:00', professor: 'Prof. Asoc. Sokol Domi', room: 'Salla D1', year: 3, semester: 1 },
          { id: 'ku-3-1-05', subject: 'Ambalazhi dhe Ruajtja', type: 'ushtrim', day: 'E Premte', startTime: '09:00', endTime: '11:00', professor: 'MSc. Klodian Bega', room: 'Salla D2', year: 3, semester: 1 },
        ],
        semester2: [
          { id: 'ku-3-2-01', subject: 'Legjislacioni Ushqimor', type: 'ligjëratë', day: 'E Hënë', startTime: '09:00', endTime: '11:00', professor: 'Prof. Asoc. Edlira Kukali', room: 'Salla D1', year: 3, semester: 2 },
          { id: 'ku-3-2-02', subject: 'Projekt Diplome', type: 'ushtrim', day: 'E Martë', startTime: '09:00', endTime: '13:00', professor: 'Sipas temës', room: 'Sipas laboratorit', year: 3, semester: 2 },
        ],
      },
    ],
  },

  // ===================== MASTER =====================
  {
    program: 'Kimi Organike',
    level: 'master',
    years: [
      {
        year: 1,
        semester1: [
          { id: 'mo-1-1-01', subject: 'Sintezë Organike e Avancuar', type: 'ligjëratë', day: 'E Hënë', startTime: '09:00', endTime: '11:00', professor: 'Prof. Dr. Mimoza Haveri', room: 'Salla M1', year: 1, semester: 1 },
          { id: 'mo-1-1-02', subject: 'Sintezë Organike e Avancuar', type: 'ushtrim', day: 'E Mërkurë', startTime: '09:00', endTime: '11:00', professor: 'MSc. Besa Topi', room: 'Salla M2', year: 1, semester: 1 },
          { id: 'mo-1-1-03', subject: 'Sintezë Organike e Avancuar', type: 'laborator', day: 'E Premte', startTime: '09:00', endTime: '13:00', professor: 'MSc. Besa Topi', room: 'Lab. Kimi Organike 2', year: 1, semester: 1 },
          { id: 'mo-1-1-04', subject: 'Spektroskopi Organike', type: 'ligjëratë', day: 'E Martë', startTime: '09:00', endTime: '11:00', professor: 'Prof. Dr. Mimoza Haveri', room: 'Salla M1', year: 1, semester: 1 },
          { id: 'mo-1-1-05', subject: 'Spektroskopi Organike', type: 'ushtrim', day: 'E Enjte', startTime: '09:00', endTime: '11:00', professor: 'MSc. Besa Topi', room: 'Salla M2', year: 1, semester: 1 },
          { id: 'mo-1-1-06', subject: 'Metodologji Kërkimore', type: 'ligjëratë', day: 'E Hënë', startTime: '11:00', endTime: '13:00', professor: 'Prof. Dr. Arben Malaj', room: 'Salla M1', year: 1, semester: 1 },
        ],
        semester2: [
          { id: 'mo-1-2-01', subject: 'Kimi Heteroçiklike', type: 'ligjëratë', day: 'E Hënë', startTime: '09:00', endTime: '11:00', professor: 'Prof. Dr. Mimoza Haveri', room: 'Salla M1', year: 1, semester: 2 },
          { id: 'mo-1-2-02', subject: 'Kimi Heteroçiklike', type: 'laborator', day: 'E Mërkurë', startTime: '09:00', endTime: '13:00', professor: 'MSc. Besa Topi', room: 'Lab. Kimi Organike 3', year: 1, semester: 2 },
          { id: 'mo-1-2-03', subject: 'Polimere & Makromolekula', type: 'ligjëratë', day: 'E Martë', startTime: '09:00', endTime: '11:00', professor: 'Prof. Dr. Altin Mele', room: 'Salla M1', year: 1, semester: 2 },
          { id: 'mo-1-2-04', subject: 'Polimere & Makromolekula', type: 'laborator', day: 'E Enjte', startTime: '09:00', endTime: '12:00', professor: 'MSc. Dorina Kuka', room: 'Lab. Kimi Fizike 1', year: 1, semester: 2 },
          { id: 'mo-1-2-05', subject: 'Kimi Medicinale', type: 'ligjëratë', day: 'E Premte', startTime: '09:00', endTime: '11:00', professor: 'Prof. Dr. Mimoza Haveri', room: 'Salla M2', year: 1, semester: 2 },
        ],
      },
      {
        year: 2,
        semester1: [
          { id: 'mo-2-1-01', subject: 'Kataliza Organike', type: 'ligjëratë', day: 'E Hënë', startTime: '09:00', endTime: '11:00', professor: 'Prof. Dr. Mimoza Haveri', room: 'Salla M1', year: 2, semester: 1 },
          { id: 'mo-2-1-02', subject: 'Kataliza Organike', type: 'laborator', day: 'E Mërkurë', startTime: '09:00', endTime: '13:00', professor: 'MSc. Besa Topi', room: 'Lab. Kimi Organike 3', year: 2, semester: 1 },
          { id: 'mo-2-1-03', subject: 'Tema e Masterit', type: 'ushtrim', day: 'E Premte', startTime: '09:00', endTime: '13:00', professor: 'Sipas temës', room: 'Sipas laboratorit', year: 2, semester: 1 },
        ],
        semester2: [
          { id: 'mo-2-2-01', subject: 'Tema e Masterit', type: 'ushtrim', day: 'E Hënë', startTime: '09:00', endTime: '13:00', professor: 'Sipas temës', room: 'Sipas laboratorit', year: 2, semester: 2 },
          { id: 'mo-2-2-02', subject: 'Tema e Masterit', type: 'ushtrim', day: 'E Enjte', startTime: '09:00', endTime: '13:00', professor: 'Sipas temës', room: 'Sipas laboratorit', year: 2, semester: 2 },
        ],
      },
    ],
  },
  {
    program: 'Kimi Fizike',
    level: 'master',
    years: [
      {
        year: 1,
        semester1: [
          { id: 'mf-1-1-01', subject: 'Termodinamikë e Avancuar', type: 'ligjëratë', day: 'E Hënë', startTime: '11:00', endTime: '13:00', professor: 'Prof. Dr. Altin Mele', room: 'Salla M1', year: 1, semester: 1 },
          { id: 'mf-1-1-02', subject: 'Termodinamikë e Avancuar', type: 'ushtrim', day: 'E Mërkurë', startTime: '11:00', endTime: '13:00', professor: 'MSc. Dorina Kuka', room: 'Salla M2', year: 1, semester: 1 },
          { id: 'mf-1-1-03', subject: 'Termodinamikë e Avancuar', type: 'laborator', day: 'E Premte', startTime: '09:00', endTime: '13:00', professor: 'MSc. Dorina Kuka', room: 'Lab. Kimi Fizike 1', year: 1, semester: 1 },
          { id: 'mf-1-1-04', subject: 'Kinetikë Kimike', type: 'ligjëratë', day: 'E Martë', startTime: '11:00', endTime: '13:00', professor: 'Prof. Dr. Altin Mele', room: 'Salla M1', year: 1, semester: 1 },
          { id: 'mf-1-1-05', subject: 'Kinetikë Kimike', type: 'ushtrim', day: 'E Enjte', startTime: '11:00', endTime: '13:00', professor: 'MSc. Dorina Kuka', room: 'Salla M2', year: 1, semester: 1 },
          { id: 'mf-1-1-06', subject: 'Metodologji Kërkimore', type: 'ligjëratë', day: 'E Hënë', startTime: '13:00', endTime: '15:00', professor: 'Prof. Dr. Arben Malaj', room: 'Salla M1', year: 1, semester: 1 },
        ],
        semester2: [
          { id: 'mf-1-2-01', subject: 'Elektrokimi e Avancuar', type: 'ligjëratë', day: 'E Hënë', startTime: '11:00', endTime: '13:00', professor: 'Prof. Dr. Altin Mele', room: 'Salla M1', year: 1, semester: 2 },
          { id: 'mf-1-2-02', subject: 'Elektrokimi e Avancuar', type: 'laborator', day: 'E Mërkurë', startTime: '09:00', endTime: '13:00', professor: 'MSc. Dorina Kuka', room: 'Lab. Kimi Fizike 2', year: 1, semester: 2 },
          { id: 'mf-1-2-03', subject: 'Kimi Kuantike', type: 'ligjëratë', day: 'E Martë', startTime: '11:00', endTime: '13:00', professor: 'Prof. Dr. Altin Mele', room: 'Salla M1', year: 1, semester: 2 },
          { id: 'mf-1-2-04', subject: 'Kimi Kuantike', type: 'ushtrim', day: 'E Enjte', startTime: '11:00', endTime: '13:00', professor: 'MSc. Dorina Kuka', room: 'Salla M2', year: 1, semester: 2 },
          { id: 'mf-1-2-05', subject: 'Kimi Sipërfaqësore', type: 'ligjëratë', day: 'E Premte', startTime: '09:00', endTime: '11:00', professor: 'Prof. Dr. Altin Mele', room: 'Salla M2', year: 1, semester: 2 },
        ],
      },
      {
        year: 2,
        semester1: [
          { id: 'mf-2-1-01', subject: 'Nanomateriale', type: 'ligjëratë', day: 'E Hënë', startTime: '11:00', endTime: '13:00', professor: 'Prof. Dr. Altin Mele', room: 'Salla M1', year: 2, semester: 1 },
          { id: 'mf-2-1-02', subject: 'Nanomateriale', type: 'laborator', day: 'E Mërkurë', startTime: '09:00', endTime: '13:00', professor: 'MSc. Dorina Kuka', room: 'Lab. Kimi Fizike 2', year: 2, semester: 1 },
          { id: 'mf-2-1-03', subject: 'Tema e Masterit', type: 'ushtrim', day: 'E Premte', startTime: '09:00', endTime: '13:00', professor: 'Sipas temës', room: 'Sipas laboratorit', year: 2, semester: 1 },
        ],
        semester2: [
          { id: 'mf-2-2-01', subject: 'Tema e Masterit', type: 'ushtrim', day: 'E Hënë', startTime: '09:00', endTime: '13:00', professor: 'Sipas temës', room: 'Sipas laboratorit', year: 2, semester: 2 },
          { id: 'mf-2-2-02', subject: 'Tema e Masterit', type: 'ushtrim', day: 'E Enjte', startTime: '09:00', endTime: '13:00', professor: 'Sipas temës', room: 'Sipas laboratorit', year: 2, semester: 2 },
        ],
      },
    ],
  },
  {
    program: 'Kimi Analitike',
    level: 'master',
    years: [
      {
        year: 1,
        semester1: [
          { id: 'ma-1-1-01', subject: 'Metoda Instrumentale të Avancuara', type: 'ligjëratë', day: 'E Hënë', startTime: '13:00', endTime: '15:00', professor: 'Prof. Dr. Vjollca Tafaj', room: 'Salla M1', year: 1, semester: 1 },
          { id: 'ma-1-1-02', subject: 'Metoda Instrumentale të Avancuara', type: 'ushtrim', day: 'E Mërkurë', startTime: '13:00', endTime: '15:00', professor: 'MSc. Genti Reka', room: 'Salla M2', year: 1, semester: 1 },
          { id: 'ma-1-1-03', subject: 'Metoda Instrumentale të Avancuara', type: 'laborator', day: 'E Premte', startTime: '13:00', endTime: '17:00', professor: 'MSc. Genti Reka', room: 'Lab. Kimi Analitike 2', year: 1, semester: 1 },
          { id: 'ma-1-1-04', subject: 'Kemometri & Statistikë', type: 'ligjëratë', day: 'E Martë', startTime: '13:00', endTime: '15:00', professor: 'Prof. Dr. Vjollca Tafaj', room: 'Salla M1', year: 1, semester: 1 },
          { id: 'ma-1-1-05', subject: 'Kemometri & Statistikë', type: 'ushtrim', day: 'E Enjte', startTime: '13:00', endTime: '15:00', professor: 'MSc. Genti Reka', room: 'Salla M2', year: 1, semester: 1 },
          { id: 'ma-1-1-06', subject: 'Metodologji Kërkimore', type: 'ligjëratë', day: 'E Hënë', startTime: '15:00', endTime: '17:00', professor: 'Prof. Dr. Arben Malaj', room: 'Salla M1', year: 1, semester: 1 },
        ],
        semester2: [
          { id: 'ma-1-2-01', subject: 'Kromatografi e Avancuar', type: 'ligjëratë', day: 'E Hënë', startTime: '13:00', endTime: '15:00', professor: 'Prof. Dr. Vjollca Tafaj', room: 'Salla M1', year: 1, semester: 2 },
          { id: 'ma-1-2-02', subject: 'Kromatografi e Avancuar', type: 'laborator', day: 'E Mërkurë', startTime: '13:00', endTime: '17:00', professor: 'MSc. Genti Reka', room: 'Lab. Kimi Analitike 2', year: 1, semester: 2 },
          { id: 'ma-1-2-03', subject: 'Validimi i Metodave Analitike', type: 'ligjëratë', day: 'E Martë', startTime: '13:00', endTime: '15:00', professor: 'Prof. Dr. Vjollca Tafaj', room: 'Salla M1', year: 1, semester: 2 },
          { id: 'ma-1-2-04', subject: 'Validimi i Metodave Analitike', type: 'ushtrim', day: 'E Enjte', startTime: '13:00', endTime: '15:00', professor: 'MSc. Genti Reka', room: 'Salla M2', year: 1, semester: 2 },
          { id: 'ma-1-2-05', subject: 'Analiza e Gjurmëve', type: 'ligjëratë', day: 'E Premte', startTime: '13:00', endTime: '15:00', professor: 'Prof. Dr. Vjollca Tafaj', room: 'Salla M2', year: 1, semester: 2 },
        ],
      },
      {
        year: 2,
        semester1: [
          { id: 'ma-2-1-01', subject: 'Spektrometri Masash', type: 'ligjëratë', day: 'E Hënë', startTime: '13:00', endTime: '15:00', professor: 'Prof. Dr. Vjollca Tafaj', room: 'Salla M1', year: 2, semester: 1 },
          { id: 'ma-2-1-02', subject: 'Spektrometri Masash', type: 'laborator', day: 'E Mërkurë', startTime: '13:00', endTime: '17:00', professor: 'MSc. Genti Reka', room: 'Lab. Kimi Analitike 2', year: 2, semester: 1 },
          { id: 'ma-2-1-03', subject: 'Tema e Masterit', type: 'ushtrim', day: 'E Premte', startTime: '09:00', endTime: '13:00', professor: 'Sipas temës', room: 'Sipas laboratorit', year: 2, semester: 1 },
        ],
        semester2: [
          { id: 'ma-2-2-01', subject: 'Tema e Masterit', type: 'ushtrim', day: 'E Hënë', startTime: '09:00', endTime: '13:00', professor: 'Sipas temës', room: 'Sipas laboratorit', year: 2, semester: 2 },
          { id: 'ma-2-2-02', subject: 'Tema e Masterit', type: 'ushtrim', day: 'E Enjte', startTime: '09:00', endTime: '13:00', professor: 'Sipas temës', room: 'Sipas laboratorit', year: 2, semester: 2 },
        ],
      },
    ],
  },
  {
    program: 'Kimia e Mjedisit',
    level: 'master',
    years: [
      {
        year: 1,
        semester1: [
          { id: 'mm-1-1-01', subject: 'Kimia e Ujërave dhe Tokës', type: 'ligjëratë', day: 'E Martë', startTime: '15:00', endTime: '17:00', professor: 'Prof. Asoc. Edlira Kukali', room: 'Salla M1', year: 1, semester: 1 },
          { id: 'mm-1-1-02', subject: 'Kimia e Ujërave dhe Tokës', type: 'ushtrim', day: 'E Enjte', startTime: '15:00', endTime: '17:00', professor: 'MSc. Rea Dashi', room: 'Salla M2', year: 1, semester: 1 },
          { id: 'mm-1-1-03', subject: 'Kimia e Ujërave dhe Tokës', type: 'laborator', day: 'E Premte', startTime: '13:00', endTime: '17:00', professor: 'MSc. Rea Dashi', room: 'Lab. Kimia e Mjedisit', year: 1, semester: 1 },
          { id: 'mm-1-1-04', subject: 'Monitorimi Mjedisor', type: 'ligjëratë', day: 'E Hënë', startTime: '15:00', endTime: '17:00', professor: 'Prof. Asoc. Edlira Kukali', room: 'Salla M1', year: 1, semester: 1 },
          { id: 'mm-1-1-05', subject: 'Monitorimi Mjedisor', type: 'ushtrim', day: 'E Mërkurë', startTime: '15:00', endTime: '17:00', professor: 'MSc. Rea Dashi', room: 'Salla M2', year: 1, semester: 1 },
          { id: 'mm-1-1-06', subject: 'Metodologji Kërkimore', type: 'ligjëratë', day: 'E Martë', startTime: '13:00', endTime: '15:00', professor: 'Prof. Dr. Arben Malaj', room: 'Salla M1', year: 1, semester: 1 },
        ],
        semester2: [
          { id: 'mm-1-2-01', subject: 'Toksikologji Mjedisore', type: 'ligjëratë', day: 'E Hënë', startTime: '15:00', endTime: '17:00', professor: 'Prof. Asoc. Edlira Kukali', room: 'Salla M1', year: 1, semester: 2 },
          { id: 'mm-1-2-02', subject: 'Toksikologji Mjedisore', type: 'laborator', day: 'E Mërkurë', startTime: '13:00', endTime: '17:00', professor: 'MSc. Rea Dashi', room: 'Lab. Kimia e Mjedisit', year: 1, semester: 2 },
          { id: 'mm-1-2-03', subject: 'Trajtimi i Mbetjeve Kimike', type: 'ligjëratë', day: 'E Martë', startTime: '15:00', endTime: '17:00', professor: 'Prof. Asoc. Edlira Kukali', room: 'Salla M1', year: 1, semester: 2 },
          { id: 'mm-1-2-04', subject: 'Trajtimi i Mbetjeve Kimike', type: 'ushtrim', day: 'E Enjte', startTime: '15:00', endTime: '17:00', professor: 'MSc. Rea Dashi', room: 'Salla M2', year: 1, semester: 2 },
          { id: 'mm-1-2-05', subject: 'Legjislacioni Mjedisor', type: 'ligjëratë', day: 'E Premte', startTime: '13:00', endTime: '15:00', professor: 'Prof. Asoc. Edlira Kukali', room: 'Salla M2', year: 1, semester: 2 },
        ],
      },
      {
        year: 2,
        semester1: [
          { id: 'mm-2-1-01', subject: 'Remediimi Mjedisor', type: 'ligjëratë', day: 'E Hënë', startTime: '15:00', endTime: '17:00', professor: 'Prof. Asoc. Edlira Kukali', room: 'Salla M1', year: 2, semester: 1 },
          { id: 'mm-2-1-02', subject: 'Remediimi Mjedisor', type: 'laborator', day: 'E Mërkurë', startTime: '13:00', endTime: '17:00', professor: 'MSc. Rea Dashi', room: 'Lab. Kimia e Mjedisit', year: 2, semester: 1 },
          { id: 'mm-2-1-03', subject: 'Tema e Masterit', type: 'ushtrim', day: 'E Premte', startTime: '09:00', endTime: '13:00', professor: 'Sipas temës', room: 'Sipas laboratorit', year: 2, semester: 1 },
        ],
        semester2: [
          { id: 'mm-2-2-01', subject: 'Tema e Masterit', type: 'ushtrim', day: 'E Hënë', startTime: '09:00', endTime: '13:00', professor: 'Sipas temës', room: 'Sipas laboratorit', year: 2, semester: 2 },
          { id: 'mm-2-2-02', subject: 'Tema e Masterit', type: 'ushtrim', day: 'E Enjte', startTime: '09:00', endTime: '13:00', professor: 'Sipas temës', room: 'Sipas laboratorit', year: 2, semester: 2 },
        ],
      },
    ],
  },
];

export const days = ['E Hënë', 'E Martë', 'E Mërkurë', 'E Enjte', 'E Premte'] as const;
export const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'] as const;
