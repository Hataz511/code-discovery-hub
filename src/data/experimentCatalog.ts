// ==================== Katalogu i Eksperimenteve ====================

export interface LabEquipment {
  name: string;
  quantity: number;
}

export interface ExperimentChemical {
  name: string;
  formula: string;
  quantity: number;
  unit: string;
}

export interface CatalogExperiment {
  id: string;
  title: string;
  description: string;
  lab: string;
  equipment: LabEquipment[];
  chemicals: ExperimentChemical[];
  duration: string; // e.g. "2 orë"
}

export interface ProgramYear {
  year: number;
  experiments: CatalogExperiment[];
}

export interface Program {
  name: string;
  level: 'bachelor' | 'master';
  years: ProgramYear[];
}

// ═══════════════════════════════════════════════════
// BACHELOR — Kimi e Përgjithshme
// ═══════════════════════════════════════════════════

const kimiPergjithshmeBachelor: Program = {
  name: 'Kimi e Përgjithshme',
  level: 'bachelor',
  years: [
    {
      year: 1,
      experiments: [
        {
          id: 'bp-1-01',
          title: 'Titrimi acid-bazë',
          description: 'Përcaktimi i koncentrimit të HCl përmes titrimit me NaOH duke përdorur fenolftaleinë si indikator.',
          lab: 'Lab - Kimi e Përgjithshme',
          duration: '2 orë',
          equipment: [
            { name: 'Byretë 50 mL', quantity: 1 },
            { name: 'Erlenmajer 250 mL', quantity: 3 },
            { name: 'Pipetë volumetrike 25 mL', quantity: 1 },
            { name: 'Stativ me kllapi', quantity: 1 },
            { name: 'Peshore analitike', quantity: 1 },
          ],
          chemicals: [
            { name: 'Sodium Hydroxide', formula: 'NaOH', quantity: 10, unit: 'g' },
            { name: 'Hydrochloric Acid', formula: 'HCl', quantity: 50, unit: 'mL' },
            { name: 'Phenolphthalein', formula: 'C₂₀H₁₄O₄', quantity: 2, unit: 'mL' },
            { name: 'Ujë i distiluar', formula: 'H₂O', quantity: 500, unit: 'mL' },
          ],
        },
        {
          id: 'bp-1-02',
          title: 'Përgatitja e tretësirave standarde',
          description: 'Përgatitja e tretësirave me koncentrim të njohur të NaCl dhe CuSO₄.',
          lab: 'Lab - Kimi e Përgjithshme',
          duration: '2 orë',
          equipment: [
            { name: 'Balonë volumetrike 250 mL', quantity: 2 },
            { name: 'Peshore analitike', quantity: 1 },
            { name: 'Lugë spatulë', quantity: 2 },
            { name: 'Cilindër matës 100 mL', quantity: 1 },
            { name: 'Trazues magnetik', quantity: 1 },
          ],
          chemicals: [
            { name: 'Sodium Chloride', formula: 'NaCl', quantity: 14.6, unit: 'g' },
            { name: 'Copper Sulfate', formula: 'CuSO₄·5H₂O', quantity: 25, unit: 'g' },
            { name: 'Ujë i distiluar', formula: 'H₂O', quantity: 500, unit: 'mL' },
          ],
        },
        {
          id: 'bp-1-03',
          title: 'Reaksionet e precipitimit',
          description: 'Vëzhgimi i formimit të precipitateve duke përzier tretësira të ndryshme kripërash.',
          lab: 'Lab - Kimi e Përgjithshme',
          duration: '1.5 orë',
          equipment: [
            { name: 'Epruveta', quantity: 8 },
            { name: 'Mbajtëse epruveta', quantity: 1 },
            { name: 'Pipetë Pasteur', quantity: 6 },
            { name: 'Letër filtri', quantity: 4 },
            { name: 'Hinkë', quantity: 2 },
          ],
          chemicals: [
            { name: 'Silver Nitrate', formula: 'AgNO₃', quantity: 5, unit: 'g' },
            { name: 'Sodium Chloride', formula: 'NaCl', quantity: 5, unit: 'g' },
            { name: 'Copper Sulfate', formula: 'CuSO₄', quantity: 10, unit: 'g' },
            { name: 'Sodium Hydroxide', formula: 'NaOH', quantity: 5, unit: 'g' },
          ],
        },
        {
          id: 'bp-1-04',
          title: 'Përcaktimi i densitetit',
          description: 'Matja e densitetit të lëngjeve dhe solideve me metoda të ndryshme.',
          lab: 'Lab - Kimi e Përgjithshme',
          duration: '2 orë',
          equipment: [
            { name: 'Piknometër', quantity: 2 },
            { name: 'Peshore analitike', quantity: 1 },
            { name: 'Cilindër matës 50 mL', quantity: 2 },
            { name: 'Termometër', quantity: 1 },
          ],
          chemicals: [
            { name: 'Ethanol', formula: 'C₂H₅OH', quantity: 50, unit: 'mL' },
            { name: 'Sodium Chloride', formula: 'NaCl', quantity: 30, unit: 'g' },
            { name: 'Ujë i distiluar', formula: 'H₂O', quantity: 200, unit: 'mL' },
          ],
        },
      ],
    },
    {
      year: 2,
      experiments: [
        {
          id: 'bp-2-01',
          title: 'Kinetika kimike — shpejtësia e reaksionit',
          description: 'Studimi i ndikimit të temperaturës dhe koncentrimit në shpejtësinë e reaksionit Na₂S₂O₃ + HCl.',
          lab: 'Lab - Kimi e Përgjithshme',
          duration: '3 orë',
          equipment: [
            { name: 'Erlenmajer 250 mL', quantity: 6 },
            { name: 'Kronometër', quantity: 1 },
            { name: 'Termometër', quantity: 1 },
            { name: 'Banjë ujore', quantity: 1 },
            { name: 'Cilindër matës 50 mL', quantity: 2 },
            { name: 'Byretë 50 mL', quantity: 1 },
          ],
          chemicals: [
            { name: 'Sodium Thiosulfate', formula: 'Na₂S₂O₃', quantity: 25, unit: 'g' },
            { name: 'Hydrochloric Acid', formula: 'HCl', quantity: 100, unit: 'mL' },
            { name: 'Ujë i distiluar', formula: 'H₂O', quantity: 500, unit: 'mL' },
          ],
        },
        {
          id: 'bp-2-02',
          title: 'Ekuilibri kimik',
          description: 'Vëzhgimi i ekuilibrit kimik me sistemin FeCl₃/KSCN dhe aplikimi i parimit të Le Chatelier.',
          lab: 'Lab - Kimi e Përgjithshme',
          duration: '2 orë',
          equipment: [
            { name: 'Epruveta', quantity: 10 },
            { name: 'Pipetë Pasteur', quantity: 6 },
            { name: 'Mbajtëse epruveta', quantity: 1 },
            { name: 'Spektrofotometër UV-Vis', quantity: 1 },
          ],
          chemicals: [
            { name: 'Iron(III) Chloride', formula: 'FeCl₃', quantity: 5, unit: 'g' },
            { name: 'Potassium Iodide', formula: 'KI', quantity: 5, unit: 'g' },
            { name: 'Sodium Chloride', formula: 'NaCl', quantity: 10, unit: 'g' },
          ],
        },
        {
          id: 'bp-2-03',
          title: 'Elektrokimia — qeliza galvanike',
          description: 'Ndërtimi i qelizës Zn/Cu dhe matja e potencialit elektrod.',
          lab: 'Lab - Kimi Fizike 1',
          duration: '3 orë',
          equipment: [
            { name: 'Elektrodë zinku', quantity: 1 },
            { name: 'Elektrodë bakri', quantity: 1 },
            { name: 'Voltmetër', quantity: 1 },
            { name: 'Urë kripe', quantity: 1 },
            { name: 'Gotë 250 mL', quantity: 2 },
          ],
          chemicals: [
            { name: 'Zinc Sulfate', formula: 'ZnSO₄', quantity: 32, unit: 'g' },
            { name: 'Copper Sulfate', formula: 'CuSO₄', quantity: 25, unit: 'g' },
            { name: 'Potassium Chloride', formula: 'KCl', quantity: 20, unit: 'g' },
          ],
        },
      ],
    },
    {
      year: 3,
      experiments: [
        {
          id: 'bp-3-01',
          title: 'Sinteza e aspirinës',
          description: 'Sinteza e acidit acetilsalicilik nga acidi salicilik dhe anhidridi acetik.',
          lab: 'Lab - Kimi Organike 1',
          duration: '3 orë',
          equipment: [
            { name: 'Erlenmajer 250 mL', quantity: 1 },
            { name: 'Banjë ujore', quantity: 1 },
            { name: 'Hinkë Büchner', quantity: 1 },
            { name: 'Pompë vakuumi', quantity: 1 },
            { name: 'Peshore analitike', quantity: 1 },
            { name: 'Termometër', quantity: 1 },
          ],
          chemicals: [
            { name: 'Acetic Anhydride', formula: '(CH₃CO)₂O', quantity: 5, unit: 'mL' },
            { name: 'Ethanol', formula: 'C₂H₅OH', quantity: 20, unit: 'mL' },
            { name: 'Hydrochloric Acid', formula: 'HCl', quantity: 5, unit: 'mL' },
          ],
        },
        {
          id: 'bp-3-02',
          title: 'Analiza gravimetrike',
          description: 'Përcaktimi i sulfatit si BaSO₄ me precipitim gravimetrik.',
          lab: 'Lab - Kimi Analitike 1',
          duration: '4 orë',
          equipment: [
            { name: 'Gotë 400 mL', quantity: 2 },
            { name: 'Hinkë Büchner', quantity: 1 },
            { name: 'Furrë tharëse', quantity: 1 },
            { name: 'Peshore analitike', quantity: 1 },
            { name: 'Krozolë porcelani', quantity: 2 },
            { name: 'Desikator', quantity: 1 },
          ],
          chemicals: [
            { name: 'Sodium Chloride', formula: 'NaCl', quantity: 5, unit: 'g' },
            { name: 'Hydrochloric Acid', formula: 'HCl', quantity: 10, unit: 'mL' },
            { name: 'Nitric Acid', formula: 'HNO₃', quantity: 5, unit: 'mL' },
          ],
        },
        {
          id: 'bp-3-03',
          title: 'Spektroskopia UV-Vis',
          description: 'Përcaktimi i koncentrimit të KMnO₄ me ligjin e Beer-Lambert.',
          lab: 'Lab - Kimi Analitike 1',
          duration: '3 orë',
          equipment: [
            { name: 'Spektrofotometër UV-Vis', quantity: 1 },
            { name: 'Kuvetë kuarci', quantity: 4 },
            { name: 'Balonë volumetrike 100 mL', quantity: 5 },
            { name: 'Pipetë volumetrike 10 mL', quantity: 1 },
          ],
          chemicals: [
            { name: 'Potassium Permanganate', formula: 'KMnO₄', quantity: 1, unit: 'g' },
            { name: 'Ujë i distiluar', formula: 'H₂O', quantity: 500, unit: 'mL' },
          ],
        },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════
// BACHELOR — Kimi Inxhinierike
// ═══════════════════════════════════════════════════

const kimiInxhinierikeBachelor: Program = {
  name: 'Kimi Inxhinierike',
  level: 'bachelor',
  years: [
    {
      year: 1,
      experiments: [
        {
          id: 'bi-1-01',
          title: 'Vetitë fizike të lëngjeve',
          description: 'Matja e viskozitetit, tensionit sipërfaqësor dhe pikës së vlimit.',
          lab: 'Lab - Kimi Fizike 1',
          duration: '3 orë',
          equipment: [
            { name: 'Viskozimetër Ostwald', quantity: 1 },
            { name: 'Termometër', quantity: 1 },
            { name: 'Kronometër', quantity: 1 },
            { name: 'Banjë ujore', quantity: 1 },
            { name: 'Stalagmometër', quantity: 1 },
          ],
          chemicals: [
            { name: 'Ethanol', formula: 'C₂H₅OH', quantity: 100, unit: 'mL' },
            { name: 'Acetone', formula: '(CH₃)₂CO', quantity: 50, unit: 'mL' },
            { name: 'Ujë i distiluar', formula: 'H₂O', quantity: 300, unit: 'mL' },
          ],
        },
        {
          id: 'bi-1-02',
          title: 'Korrozioni dhe mbrojtja',
          description: 'Studimi i korrozionit të metaleve në mjedise të ndryshme dhe mbrojtja katodike.',
          lab: 'Lab - Kimi Fizike 1',
          duration: '3 orë',
          equipment: [
            { name: 'Gotë 500 mL', quantity: 4 },
            { name: 'Elektrodë çeliku', quantity: 4 },
            { name: 'Burim rryme DC', quantity: 1 },
            { name: 'Multimetër', quantity: 1 },
          ],
          chemicals: [
            { name: 'Sodium Chloride', formula: 'NaCl', quantity: 50, unit: 'g' },
            { name: 'Hydrochloric Acid', formula: 'HCl', quantity: 50, unit: 'mL' },
            { name: 'Sodium Hydroxide', formula: 'NaOH', quantity: 20, unit: 'g' },
            { name: 'Zinc Sulfate', formula: 'ZnSO₄', quantity: 30, unit: 'g' },
          ],
        },
        {
          id: 'bi-1-03',
          title: 'Destilimi i thjeshtë',
          description: 'Ndarja e përzierjes ethanol-ujë me destilim të thjeshtë.',
          lab: 'Lab - Kimi e Përgjithshme',
          duration: '3 orë',
          equipment: [
            { name: 'Aparat destilimi komplet', quantity: 1 },
            { name: 'Ngrohëse me mantel', quantity: 1 },
            { name: 'Termometër', quantity: 1 },
            { name: 'Cilindra matës', quantity: 3 },
            { name: 'Erlenmajer pranues', quantity: 2 },
          ],
          chemicals: [
            { name: 'Ethanol', formula: 'C₂H₅OH', quantity: 150, unit: 'mL' },
            { name: 'Ujë i distiluar', formula: 'H₂O', quantity: 200, unit: 'mL' },
          ],
        },
      ],
    },
    {
      year: 2,
      experiments: [
        {
          id: 'bi-2-01',
          title: 'Përftimi i sapunit',
          description: 'Saponifikimi i yndyrave me NaOH për përftimin e sapunit.',
          lab: 'Lab - Kimi Organike 1',
          duration: '3 orë',
          equipment: [
            { name: 'Gotë 600 mL', quantity: 1 },
            { name: 'Ngrohëse me pllakë', quantity: 1 },
            { name: 'Trazues qelqi', quantity: 1 },
            { name: 'Termometër', quantity: 1 },
            { name: 'Formë silikoni', quantity: 2 },
          ],
          chemicals: [
            { name: 'Sodium Hydroxide', formula: 'NaOH', quantity: 40, unit: 'g' },
            { name: 'Ethanol', formula: 'C₂H₅OH', quantity: 50, unit: 'mL' },
            { name: 'Sodium Chloride', formula: 'NaCl', quantity: 100, unit: 'g' },
          ],
        },
        {
          id: 'bi-2-02',
          title: 'Trajtimi i ujërave — koagulimi',
          description: 'Përdorimi i FeCl₃ si koagulant për pastrimin e ujit të turbullt.',
          lab: 'Lab - Kimia e Mjedisit',
          duration: '2 orë',
          equipment: [
            { name: 'Gotë 1000 mL', quantity: 4 },
            { name: 'Jar test aparat', quantity: 1 },
            { name: 'pH Meter', quantity: 1 },
            { name: 'Turbidimetër', quantity: 1 },
          ],
          chemicals: [
            { name: 'Iron(III) Chloride', formula: 'FeCl₃', quantity: 10, unit: 'g' },
            { name: 'Calcium Carbonate', formula: 'CaCO₃', quantity: 5, unit: 'g' },
            { name: 'Sodium Hydroxide', formula: 'NaOH', quantity: 5, unit: 'g' },
          ],
        },
        {
          id: 'bi-2-03',
          title: 'Kalorimetria',
          description: 'Matja e nxehtësisë së neutralizimit HCl + NaOH me kalorimetër.',
          lab: 'Lab - Kimi Fizike 2',
          duration: '2.5 orë',
          equipment: [
            { name: 'Kalorimetër', quantity: 1 },
            { name: 'Termometër digjital', quantity: 1 },
            { name: 'Cilindër matës 100 mL', quantity: 2 },
            { name: 'Trazues magnetik', quantity: 1 },
          ],
          chemicals: [
            { name: 'Hydrochloric Acid', formula: 'HCl', quantity: 100, unit: 'mL' },
            { name: 'Sodium Hydroxide', formula: 'NaOH', quantity: 20, unit: 'g' },
            { name: 'Ujë i distiluar', formula: 'H₂O', quantity: 300, unit: 'mL' },
          ],
        },
      ],
    },
    {
      year: 3,
      experiments: [
        {
          id: 'bi-3-01',
          title: 'Polimerizimi',
          description: 'Sinteza e polistirenit me polimerizim radical.',
          lab: 'Lab - Kimi Organike 2',
          duration: '4 orë',
          equipment: [
            { name: 'Balon me qafë 250 mL', quantity: 1 },
            { name: 'Kondensator refluksi', quantity: 1 },
            { name: 'Banjë ujore', quantity: 1 },
            { name: 'Termometër', quantity: 1 },
            { name: 'Trazues magnetik', quantity: 1 },
          ],
          chemicals: [
            { name: 'Methanol', formula: 'CH₃OH', quantity: 50, unit: 'mL' },
            { name: 'Acetone', formula: '(CH₃)₂CO', quantity: 30, unit: 'mL' },
            { name: 'Ethanol', formula: 'C₂H₅OH', quantity: 100, unit: 'mL' },
          ],
        },
        {
          id: 'bi-3-02',
          title: 'Proceset e adsorbimit',
          description: 'Studimi i adsorbimit të ngjyruesve mbi karbon aktiv duke aplikuar izotermën Langmuir.',
          lab: 'Lab - Kimia e Mjedisit',
          duration: '3 orë',
          equipment: [
            { name: 'Erlenmajer 250 mL', quantity: 6 },
            { name: 'Shaker orbital', quantity: 1 },
            { name: 'Spektrofotometër UV-Vis', quantity: 1 },
            { name: 'Letër filtri', quantity: 6 },
            { name: 'Hinkë', quantity: 3 },
          ],
          chemicals: [
            { name: 'Activated Carbon', formula: 'C', quantity: 30, unit: 'g' },
            { name: 'Methyl Orange', formula: 'C₁₄H₁₄N₃NaO₃S', quantity: 0.5, unit: 'g' },
            { name: 'Ujë i distiluar', formula: 'H₂O', quantity: 1000, unit: 'mL' },
          ],
        },
        {
          id: 'bi-3-03',
          title: 'Kontrolli i cilësisë me titrim',
          description: 'Përcaktimi i aciditetit total në mostra ushqimore përmes titrimit acid-bazë.',
          lab: 'Lab - Kimi Analitike 1',
          duration: '2.5 orë',
          equipment: [
            { name: 'Byretë 50 mL', quantity: 1 },
            { name: 'Erlenmajer 250 mL', quantity: 4 },
            { name: 'pH Meter', quantity: 1 },
            { name: 'Pipetë volumetrike 25 mL', quantity: 1 },
          ],
          chemicals: [
            { name: 'Sodium Hydroxide', formula: 'NaOH', quantity: 10, unit: 'g' },
            { name: 'Phenolphthalein', formula: 'C₂₀H₁₄O₄', quantity: 2, unit: 'mL' },
          ],
        },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════
// BACHELOR — Kimi Ushqimore
// ═══════════════════════════════════════════════════

const kimiUshqimoreBachelor: Program = {
  name: 'Kimi Ushqimore',
  level: 'bachelor',
  years: [
    {
      year: 1,
      experiments: [
        {
          id: 'bu-1-01',
          title: 'Analiza e ujit të pijshëm',
          description: 'Përcaktimi i pH, konduktivitetit dhe fortësisë së ujit.',
          lab: 'Lab - Kimi e Përgjithshme',
          duration: '2 orë',
          equipment: [
            { name: 'pH Meter', quantity: 1 },
            { name: 'Konduktimetër', quantity: 1 },
            { name: 'Byretë 50 mL', quantity: 1 },
            { name: 'Erlenmajer 250 mL', quantity: 3 },
          ],
          chemicals: [
            { name: 'EDTA Disodium Salt', formula: 'Na₂EDTA', quantity: 5, unit: 'g' },
            { name: 'Sodium Hydroxide', formula: 'NaOH', quantity: 5, unit: 'g' },
            { name: 'Hydrochloric Acid', formula: 'HCl', quantity: 20, unit: 'mL' },
          ],
        },
        {
          id: 'bu-1-02',
          title: 'Identifikimi i karbohidrateve',
          description: 'Testet e Molisch, Benedict dhe Lugol për identifikimin e sheqernave.',
          lab: 'Lab - Biokimia 1',
          duration: '2 orë',
          equipment: [
            { name: 'Epruveta', quantity: 10 },
            { name: 'Banjë ujore', quantity: 1 },
            { name: 'Pipetë Pasteur', quantity: 6 },
            { name: 'Mbajtëse epruveta', quantity: 1 },
          ],
          chemicals: [
            { name: 'Glucose', formula: 'C₆H₁₂O₆', quantity: 10, unit: 'g' },
            { name: 'Copper Sulfate', formula: 'CuSO₄', quantity: 5, unit: 'g' },
            { name: 'Sodium Hydroxide', formula: 'NaOH', quantity: 10, unit: 'g' },
            { name: 'Starch Indicator', formula: '(C₆H₁₀O₅)ₙ', quantity: 5, unit: 'g' },
          ],
        },
        {
          id: 'bu-1-03',
          title: 'Përcaktimi i aciditetit në qumësht',
          description: 'Matja e aciditetit titrueshëm në qumësht sipas metodës Soxhlet-Henkel.',
          lab: 'Lab - Kimi e Përgjithshme',
          duration: '1.5 orë',
          equipment: [
            { name: 'Byretë 25 mL', quantity: 1 },
            { name: 'Erlenmajer 250 mL', quantity: 3 },
            { name: 'Pipetë volumetrike 10 mL', quantity: 1 },
          ],
          chemicals: [
            { name: 'Sodium Hydroxide', formula: 'NaOH', quantity: 5, unit: 'g' },
            { name: 'Phenolphthalein', formula: 'C₂₀H₁₄O₄', quantity: 1, unit: 'mL' },
          ],
        },
      ],
    },
    {
      year: 2,
      experiments: [
        {
          id: 'bu-2-01',
          title: 'Përcaktimi i proteinave me Bradford',
          description: 'Kuantifikimi i proteinave totale me metodën e Bradford duke përdorur BSA si standard.',
          lab: 'Lab - Biokimia 1',
          duration: '2.5 orë',
          equipment: [
            { name: 'Spektrofotometër UV-Vis', quantity: 1 },
            { name: 'Kuvetë plastike', quantity: 6 },
            { name: 'Mikropipetë 100-1000 µL', quantity: 1 },
            { name: 'Epruveta', quantity: 8 },
          ],
          chemicals: [
            { name: 'Bovine Serum Albumin (BSA)', formula: 'BSA', quantity: 1, unit: 'g' },
            { name: 'Coomassie Brilliant Blue', formula: 'C₄₅H₄₄N₃NaO₇S₂', quantity: 0.1, unit: 'g' },
            { name: 'Ethanol', formula: 'C₂H₅OH', quantity: 50, unit: 'mL' },
          ],
        },
        {
          id: 'bu-2-02',
          title: 'Ekstraktimi i yndyrave me Soxhlet',
          description: 'Përcaktimi i përmbajtjes së yndyrave në ushqime me metodën Soxhlet.',
          lab: 'Lab - Kimi Organike 1',
          duration: '4 orë',
          equipment: [
            { name: 'Aparat Soxhlet komplet', quantity: 1 },
            { name: 'Ngrohëse me mantel', quantity: 1 },
            { name: 'Peshore analitike', quantity: 1 },
            { name: 'Desikator', quantity: 1 },
            { name: 'Cilindër matës 250 mL', quantity: 1 },
          ],
          chemicals: [
            { name: 'Acetone', formula: '(CH₃)₂CO', quantity: 200, unit: 'mL' },
            { name: 'Ethanol', formula: 'C₂H₅OH', quantity: 100, unit: 'mL' },
          ],
        },
        {
          id: 'bu-2-03',
          title: 'Analiza e vitaminës C',
          description: 'Përcaktimi i vitaminës C në fruta me titrim iodometrik.',
          lab: 'Lab - Kimi Analitike 1',
          duration: '2 orë',
          equipment: [
            { name: 'Byretë 50 mL', quantity: 1 },
            { name: 'Erlenmajer 250 mL', quantity: 4 },
            { name: 'Pipetë volumetrike 25 mL', quantity: 1 },
            { name: 'Peshore analitike', quantity: 1 },
          ],
          chemicals: [
            { name: 'Potassium Iodide', formula: 'KI', quantity: 5, unit: 'g' },
            { name: 'Starch Indicator', formula: '(C₆H₁₀O₅)ₙ', quantity: 2, unit: 'g' },
            { name: 'Hydrochloric Acid', formula: 'HCl', quantity: 10, unit: 'mL' },
          ],
        },
      ],
    },
    {
      year: 3,
      experiments: [
        {
          id: 'bu-3-01',
          title: 'Analiza e aditivëve ushqimore',
          description: 'Identifikimi i ngjyruesve artificialë në ushqime me TLC dhe spektrofotometri.',
          lab: 'Lab - Kimi Analitike 2',
          duration: '3 orë',
          equipment: [
            { name: 'Pllaka TLC', quantity: 6 },
            { name: 'Dhomë TLC', quantity: 1 },
            { name: 'Spektrofotometër UV-Vis', quantity: 1 },
            { name: 'Mikropipetë', quantity: 1 },
            { name: 'Llampë UV', quantity: 1 },
          ],
          chemicals: [
            { name: 'Ethanol', formula: 'C₂H₅OH', quantity: 100, unit: 'mL' },
            { name: 'Acetic Acid (Glacial)', formula: 'CH₃COOH', quantity: 20, unit: 'mL' },
            { name: 'Methanol', formula: 'CH₃OH', quantity: 50, unit: 'mL' },
          ],
        },
        {
          id: 'bu-3-02',
          title: 'Fermentimi alkoolik',
          description: 'Studimi i fermentimit të glukozës dhe matja e prodhimit të CO₂.',
          lab: 'Lab - Biokimia 1',
          duration: '4 orë',
          equipment: [
            { name: 'Erlenmajer 500 mL', quantity: 4 },
            { name: 'Tub gazesh', quantity: 4 },
            { name: 'Banjë ujore', quantity: 1 },
            { name: 'Refraktometër', quantity: 1 },
            { name: 'pH Meter', quantity: 1 },
          ],
          chemicals: [
            { name: 'Glucose', formula: 'C₆H₁₂O₆', quantity: 50, unit: 'g' },
            { name: 'Ujë i distiluar', formula: 'H₂O', quantity: 500, unit: 'mL' },
          ],
        },
        {
          id: 'bu-3-03',
          title: 'Kontrolli mikrobiologjik i ushqimeve',
          description: 'Numërimi i baktereve totale dhe koliformëve në mostra ushqimore.',
          lab: 'Lab - Bioteknologji',
          duration: '3 orë',
          equipment: [
            { name: 'Pllaka Petri', quantity: 12 },
            { name: 'Autokllavë', quantity: 1 },
            { name: 'Inkubator', quantity: 1 },
            { name: 'Mikropipetë', quantity: 1 },
            { name: 'Pipetë sterile', quantity: 10 },
          ],
          chemicals: [
            { name: 'Agarose', formula: 'Agarose', quantity: 15, unit: 'g' },
            { name: 'Sodium Chloride', formula: 'NaCl', quantity: 9, unit: 'g' },
            { name: 'Ujë i distiluar', formula: 'H₂O', quantity: 1000, unit: 'mL' },
          ],
        },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════
// MASTER — Kimi Organike
// ═══════════════════════════════════════════════════

const kimiOrganikeMaster: Program = {
  name: 'Kimi Organike',
  level: 'master',
  years: [
    {
      year: 1,
      experiments: [
        {
          id: 'mo-1-01',
          title: 'Reaksioni Grignard',
          description: 'Sinteza e alkooleve terciare me reagentin Grignard.',
          lab: 'Lab - Kimi Organike 3',
          duration: '4 orë',
          equipment: [
            { name: 'Balon me 3 qafa 500 mL', quantity: 1 },
            { name: 'Kondensator refluksi', quantity: 1 },
            { name: 'Hinkë shtimi', quantity: 1 },
            { name: 'Trazues magnetik', quantity: 1 },
            { name: 'Aparat inert (N₂)', quantity: 1 },
            { name: 'Banjë akulli', quantity: 1 },
          ],
          chemicals: [
            { name: 'Tetrahydrofuran (THF)', formula: 'C₄H₈O', quantity: 100, unit: 'mL' },
            { name: 'Benzaldehyde', formula: 'C₆H₅CHO', quantity: 10, unit: 'mL' },
            { name: 'Hydrochloric Acid', formula: 'HCl', quantity: 50, unit: 'mL' },
            { name: 'Diethyl Ether', formula: '(C₂H₅)₂O', quantity: 100, unit: 'mL' },
          ],
        },
        {
          id: 'mo-1-02',
          title: 'Kromatografia në kolonë',
          description: 'Ndarja e përzierjes së ngjyruesve organike me kromatografi kolonë.',
          lab: 'Lab - Kimi Organike 2',
          duration: '4 orë',
          equipment: [
            { name: 'Kolonë kromatografike', quantity: 1 },
            { name: 'Erlenmajer 50 mL', quantity: 10 },
            { name: 'Llampë UV', quantity: 1 },
            { name: 'Pllaka TLC', quantity: 6 },
          ],
          chemicals: [
            { name: 'Acetone', formula: '(CH₃)₂CO', quantity: 200, unit: 'mL' },
            { name: 'Chloroform', formula: 'CHCl₃', quantity: 200, unit: 'mL' },
            { name: 'Methanol', formula: 'CH₃OH', quantity: 100, unit: 'mL' },
            { name: 'Ethanol', formula: 'C₂H₅OH', quantity: 100, unit: 'mL' },
          ],
        },
        {
          id: 'mo-1-03',
          title: 'Reduktimi me LiAlH₄',
          description: 'Reduktimi i estereve në alkoole me litium aluminium hidrid.',
          lab: 'Lab - Kimi Organike 3',
          duration: '4 orë',
          equipment: [
            { name: 'Balon me 2 qafa 250 mL', quantity: 1 },
            { name: 'Hinkë shtimi', quantity: 1 },
            { name: 'Kondensator refluksi', quantity: 1 },
            { name: 'Banjë akulli', quantity: 1 },
            { name: 'Aparat inert (N₂)', quantity: 1 },
            { name: 'Hinkë ndarëse', quantity: 1 },
          ],
          chemicals: [
            { name: 'Lithium Aluminum Hydride', formula: 'LiAlH₄', quantity: 2, unit: 'g' },
            { name: 'Tetrahydrofuran (THF)', formula: 'C₄H₈O', quantity: 80, unit: 'mL' },
            { name: 'Diethyl Ether', formula: '(C₂H₅)₂O', quantity: 100, unit: 'mL' },
            { name: 'Sodium Hydroxide', formula: 'NaOH', quantity: 10, unit: 'g' },
          ],
        },
      ],
    },
    {
      year: 2,
      experiments: [
        {
          id: 'mo-2-01',
          title: 'Hidrogjenizimi katalitik',
          description: 'Reduktimi i lidhjeve dyfishe me H₂/Pd-C.',
          lab: 'Lab - Kimi Organike 3',
          duration: '5 orë',
          equipment: [
            { name: 'Aparat hidrogjenizimi', quantity: 1 },
            { name: 'Balon me qafë 250 mL', quantity: 1 },
            { name: 'Trazues magnetik', quantity: 1 },
            { name: 'Hinkë me xhel silice', quantity: 1 },
            { name: 'Evaporator rrotullues', quantity: 1 },
          ],
          chemicals: [
            { name: 'Palladium on Carbon (Pd/C)', formula: 'Pd/C', quantity: 0.5, unit: 'g' },
            { name: 'Ethanol', formula: 'C₂H₅OH', quantity: 100, unit: 'mL' },
            { name: 'Methanol', formula: 'CH₃OH', quantity: 50, unit: 'mL' },
          ],
        },
        {
          id: 'mo-2-02',
          title: 'Sinteza me mikrovalë',
          description: 'Sinteza e heterocikleve me ngrohje me mikrovalë për të rritur rendimentin.',
          lab: 'Lab - Kimi Organike 3',
          duration: '3 orë',
          equipment: [
            { name: 'Reaktor mikrovalësh', quantity: 1 },
            { name: 'Viale reakcioni', quantity: 6 },
            { name: 'Evaporator rrotullues', quantity: 1 },
            { name: 'Peshore analitike', quantity: 1 },
          ],
          chemicals: [
            { name: 'Dimethylformamide (DMF)', formula: 'C₃H₇NO', quantity: 30, unit: 'mL' },
            { name: 'Acetic Acid (Glacial)', formula: 'CH₃COOH', quantity: 10, unit: 'mL' },
            { name: 'Ethanol', formula: 'C₂H₅OH', quantity: 50, unit: 'mL' },
          ],
        },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════
// MASTER — Kimi Fizike
// ═══════════════════════════════════════════════════

const kimiFizikeMaster: Program = {
  name: 'Kimi Fizike',
  level: 'master',
  years: [
    {
      year: 1,
      experiments: [
        {
          id: 'mf-1-01',
          title: 'Termodinamika e tretësirave',
          description: 'Matja e vetive koligative: ulja e pikës së ngrirjes dhe rritja e pikës së vlimit.',
          lab: 'Lab - Kimi Fizike 1',
          duration: '3 orë',
          equipment: [
            { name: 'Krioskop Beckmann', quantity: 1 },
            { name: 'Termometër Beckmann', quantity: 1 },
            { name: 'Banjë ftohjëse', quantity: 1 },
            { name: 'Peshore analitike', quantity: 1 },
            { name: 'Trazues magnetik', quantity: 1 },
          ],
          chemicals: [
            { name: 'Sucrose', formula: 'C₁₂H₂₂O₁₁', quantity: 20, unit: 'g' },
            { name: 'Urea', formula: 'CO(NH₂)₂', quantity: 10, unit: 'g' },
            { name: 'Sodium Chloride', formula: 'NaCl', quantity: 15, unit: 'g' },
            { name: 'Ujë i distiluar', formula: 'H₂O', quantity: 500, unit: 'mL' },
          ],
        },
        {
          id: 'mf-1-02',
          title: 'Konduktometria',
          description: 'Matja e konduktivitetit molar të elektroliteve të fortë dhe të dobëta.',
          lab: 'Lab - Kimi Fizike 2',
          duration: '3 orë',
          equipment: [
            { name: 'Konduktimetër', quantity: 1 },
            { name: 'Qelizë konduktometrike', quantity: 1 },
            { name: 'Balonë volumetrike 100 mL', quantity: 8 },
            { name: 'Banjë termostatike', quantity: 1 },
          ],
          chemicals: [
            { name: 'Potassium Chloride', formula: 'KCl', quantity: 15, unit: 'g' },
            { name: 'Acetic Acid (Glacial)', formula: 'CH₃COOH', quantity: 20, unit: 'mL' },
            { name: 'Sodium Chloride', formula: 'NaCl', quantity: 12, unit: 'g' },
          ],
        },
        {
          id: 'mf-1-03',
          title: 'Potenciometria',
          description: 'Titrimi potenciometrik i acideve poliprotike.',
          lab: 'Lab - Kimi Fizike 1',
          duration: '3 orë',
          equipment: [
            { name: 'pH Meter me elektrodë', quantity: 1 },
            { name: 'Byretë 50 mL', quantity: 1 },
            { name: 'Trazues magnetik', quantity: 1 },
            { name: 'Gotë 250 mL', quantity: 1 },
          ],
          chemicals: [
            { name: 'Sodium Hydroxide', formula: 'NaOH', quantity: 10, unit: 'g' },
            { name: 'Hydrochloric Acid', formula: 'HCl', quantity: 50, unit: 'mL' },
            { name: 'Acetic Acid (Glacial)', formula: 'CH₃COOH', quantity: 20, unit: 'mL' },
          ],
        },
      ],
    },
    {
      year: 2,
      experiments: [
        {
          id: 'mf-2-01',
          title: 'Adsorbimi në sipërfaqe',
          description: 'Matja e izotermës së adsorbimit Langmuir për acidin acetik në karbon aktiv.',
          lab: 'Lab - Kimi Fizike 2',
          duration: '4 orë',
          equipment: [
            { name: 'Erlenmajer 250 mL', quantity: 8 },
            { name: 'Shaker orbital', quantity: 1 },
            { name: 'Byretë 50 mL', quantity: 1 },
            { name: 'Peshore analitike', quantity: 1 },
            { name: 'Letër filtri', quantity: 8 },
          ],
          chemicals: [
            { name: 'Acetic Acid (Glacial)', formula: 'CH₃COOH', quantity: 50, unit: 'mL' },
            { name: 'Activated Carbon', formula: 'C', quantity: 40, unit: 'g' },
            { name: 'Sodium Hydroxide', formula: 'NaOH', quantity: 15, unit: 'g' },
            { name: 'Phenolphthalein', formula: 'C₂₀H₁₄O₄', quantity: 2, unit: 'mL' },
          ],
        },
        {
          id: 'mf-2-02',
          title: 'Viskozimetria e polimereve',
          description: 'Përcaktimi i masës molare mesatare të polimereve me viskozimetri.',
          lab: 'Lab - Kimi Fizike 2',
          duration: '3 orë',
          equipment: [
            { name: 'Viskozimetër Ubbelohde', quantity: 1 },
            { name: 'Banjë termostatike', quantity: 1 },
            { name: 'Kronometër', quantity: 1 },
            { name: 'Balonë volumetrike 100 mL', quantity: 5 },
          ],
          chemicals: [
            { name: 'Sodium Chloride', formula: 'NaCl', quantity: 10, unit: 'g' },
            { name: 'Ujë i distiluar', formula: 'H₂O', quantity: 500, unit: 'mL' },
          ],
        },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════
// MASTER — Kimi Analitike
// ═══════════════════════════════════════════════════

const kimiAnalitikeMaster: Program = {
  name: 'Kimi Analitike',
  level: 'master',
  years: [
    {
      year: 1,
      experiments: [
        {
          id: 'ma-1-01',
          title: 'Titrimi kompleksometrik me EDTA',
          description: 'Përcaktimi i fortësisë totale të ujit dhe ioneve Ca²⁺/Mg²⁺ me EDTA.',
          lab: 'Lab - Kimi Analitike 1',
          duration: '3 orë',
          equipment: [
            { name: 'Byretë 50 mL', quantity: 1 },
            { name: 'Erlenmajer 250 mL', quantity: 4 },
            { name: 'Pipetë volumetrike 25 mL', quantity: 1 },
            { name: 'pH Meter', quantity: 1 },
          ],
          chemicals: [
            { name: 'EDTA Disodium Salt', formula: 'Na₂EDTA', quantity: 10, unit: 'g' },
            { name: 'Sodium Hydroxide', formula: 'NaOH', quantity: 5, unit: 'g' },
            { name: 'Hydrochloric Acid', formula: 'HCl', quantity: 10, unit: 'mL' },
          ],
        },
        {
          id: 'ma-1-02',
          title: 'Titrimi redoks me KMnO₄',
          description: 'Përcaktimi i hekurit(II) me titrim permanganometrik.',
          lab: 'Lab - Kimi Analitike 1',
          duration: '3 orë',
          equipment: [
            { name: 'Byretë 50 mL', quantity: 1 },
            { name: 'Erlenmajer 250 mL', quantity: 4 },
            { name: 'Pipetë volumetrike 25 mL', quantity: 1 },
            { name: 'Peshore analitike', quantity: 1 },
          ],
          chemicals: [
            { name: 'Potassium Permanganate', formula: 'KMnO₄', quantity: 3, unit: 'g' },
            { name: 'Sulfuric Acid', formula: 'H₂SO₄', quantity: 25, unit: 'mL' },
            { name: 'Iron(III) Chloride', formula: 'FeCl₃', quantity: 10, unit: 'g' },
          ],
        },
        {
          id: 'ma-1-03',
          title: 'Spektroskopia me flakë (AAS)',
          description: 'Përcaktimi i metaleve të rënda në mostra ujore me AAS.',
          lab: 'Lab - Kimi Analitike 2',
          duration: '3 orë',
          equipment: [
            { name: 'Spektrometër AA', quantity: 1 },
            { name: 'Llamba me katodë (Cu, Zn, Pb)', quantity: 3 },
            { name: 'Balonë volumetrike 100 mL', quantity: 6 },
            { name: 'Mikropipetë 100-1000 µL', quantity: 1 },
          ],
          chemicals: [
            { name: 'Nitric Acid', formula: 'HNO₃', quantity: 50, unit: 'mL' },
            { name: 'Zinc Sulfate', formula: 'ZnSO₄', quantity: 5, unit: 'g' },
            { name: 'Copper Sulfate', formula: 'CuSO₄', quantity: 5, unit: 'g' },
          ],
        },
      ],
    },
    {
      year: 2,
      experiments: [
        {
          id: 'ma-2-01',
          title: 'HPLC — Kromatografia e lëngshme',
          description: 'Ndarja dhe kuantifikimi i vitaminave të tretshme në ujë me HPLC.',
          lab: 'Lab - Kimi Analitike 2',
          duration: '4 orë',
          equipment: [
            { name: 'Sistem HPLC', quantity: 1 },
            { name: 'Kolonë C18', quantity: 1 },
            { name: 'Viale HPLC', quantity: 12 },
            { name: 'Mikropipetë', quantity: 1 },
            { name: 'Filtrat siringe 0.45µm', quantity: 12 },
          ],
          chemicals: [
            { name: 'Methanol', formula: 'CH₃OH', quantity: 500, unit: 'mL' },
            { name: 'Acetic Acid (Glacial)', formula: 'CH₃COOH', quantity: 10, unit: 'mL' },
            { name: 'Ujë i distiluar', formula: 'H₂O', quantity: 1000, unit: 'mL' },
          ],
        },
        {
          id: 'ma-2-02',
          title: 'Voltametria ciklike',
          description: 'Studimi i vetive redoks të K₃[Fe(CN)₆] me voltametri ciklike.',
          lab: 'Lab - Kimi Analitike 2',
          duration: '3 orë',
          equipment: [
            { name: 'Potenciostat/Galvanostat', quantity: 1 },
            { name: 'Elektrodë pune (GCE)', quantity: 1 },
            { name: 'Elektrodë referimi Ag/AgCl', quantity: 1 },
            { name: 'Elektrodë ndihmëse Pt', quantity: 1 },
            { name: 'Qelizë elektrokimike', quantity: 1 },
          ],
          chemicals: [
            { name: 'Potassium Chloride', formula: 'KCl', quantity: 15, unit: 'g' },
            { name: 'Sulfuric Acid', formula: 'H₂SO₄', quantity: 10, unit: 'mL' },
            { name: 'Ujë i distiluar', formula: 'H₂O', quantity: 500, unit: 'mL' },
          ],
        },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════
// MASTER — Kimia e Mjedisit
// ═══════════════════════════════════════════════════

const kimiMjedisMaster: Program = {
  name: 'Kimia e Mjedisit',
  level: 'master',
  years: [
    {
      year: 1,
      experiments: [
        {
          id: 'mm-1-01',
          title: 'Analiza e BOD dhe COD',
          description: 'Përcaktimi i kërkesës biokimike (BOD₅) dhe kimike (COD) për oksigjen në ujëra.',
          lab: 'Lab - Kimia e Mjedisit',
          duration: '3 orë (+5 ditë inkubim)',
          equipment: [
            { name: 'Inkubator BOD', quantity: 1 },
            { name: 'Reaktor COD', quantity: 1 },
            { name: 'Spektrofotometër', quantity: 1 },
            { name: 'Shishe BOD 300 mL', quantity: 8 },
            { name: 'Pipetë volumetrike', quantity: 2 },
          ],
          chemicals: [
            { name: 'Potassium Dichromate', formula: 'K₂Cr₂O₇', quantity: 10, unit: 'g' },
            { name: 'Sulfuric Acid', formula: 'H₂SO₄', quantity: 50, unit: 'mL' },
            { name: 'Sodium Hydroxide', formula: 'NaOH', quantity: 10, unit: 'g' },
            { name: 'Sodium Thiosulfate', formula: 'Na₂S₂O₃', quantity: 15, unit: 'g' },
          ],
        },
        {
          id: 'mm-1-02',
          title: 'Analiza e metaleve të rënda në tokë',
          description: 'Tretja e mostrave të tokës dhe analiza e Pb, Cd, Cu me AAS.',
          lab: 'Lab - Kimi Analitike 2',
          duration: '4 orë',
          equipment: [
            { name: 'Spektrometër AA', quantity: 1 },
            { name: 'Pllakë ngrohëse', quantity: 1 },
            { name: 'Balonë volumetrike 100 mL', quantity: 6 },
            { name: 'Letër filtri', quantity: 6 },
            { name: 'Gotë 250 mL', quantity: 6 },
          ],
          chemicals: [
            { name: 'Nitric Acid', formula: 'HNO₃', quantity: 100, unit: 'mL' },
            { name: 'Hydrochloric Acid', formula: 'HCl', quantity: 50, unit: 'mL' },
            { name: 'Hydrogen Peroxide 30%', formula: 'H₂O₂', quantity: 30, unit: 'mL' },
          ],
        },
        {
          id: 'mm-1-03',
          title: 'Filtrimi dhe dekontaminimi i ujit',
          description: 'Testimi i filtrave me rërë, karbon aktiv dhe membranë për pastrimin e ujërave.',
          lab: 'Lab - Kimia e Mjedisit',
          duration: '3 orë',
          equipment: [
            { name: 'Kolonë filtrimi', quantity: 3 },
            { name: 'Pompa peristaltike', quantity: 1 },
            { name: 'Turbidimetër', quantity: 1 },
            { name: 'pH Meter', quantity: 1 },
            { name: 'Gotë 1000 mL', quantity: 3 },
          ],
          chemicals: [
            { name: 'Activated Carbon', formula: 'C', quantity: 200, unit: 'g' },
            { name: 'Calcium Carbonate', formula: 'CaCO₃', quantity: 50, unit: 'g' },
            { name: 'Iron(III) Chloride', formula: 'FeCl₃', quantity: 15, unit: 'g' },
          ],
        },
      ],
    },
    {
      year: 2,
      experiments: [
        {
          id: 'mm-2-01',
          title: 'Fotokataliza me TiO₂',
          description: 'Degradimi fotokatalitik i ngjyruesve organike me TiO₂ nën dritë UV.',
          lab: 'Lab - Kimia e Mjedisit',
          duration: '4 orë',
          equipment: [
            { name: 'Reaktor fotokatalitik', quantity: 1 },
            { name: 'Llampë UV', quantity: 1 },
            { name: 'Spektrofotometër UV-Vis', quantity: 1 },
            { name: 'Trazues magnetik', quantity: 1 },
            { name: 'Centrifugë', quantity: 1 },
          ],
          chemicals: [
            { name: 'Methyl Orange', formula: 'C₁₄H₁₄N₃NaO₃S', quantity: 0.5, unit: 'g' },
            { name: 'Hydrogen Peroxide 30%', formula: 'H₂O₂', quantity: 20, unit: 'mL' },
            { name: 'Ujë i distiluar', formula: 'H₂O', quantity: 1000, unit: 'mL' },
          ],
        },
        {
          id: 'mm-2-02',
          title: 'Biomonitorimi mjedisor',
          description: 'Vlerësimi i cilësisë së ajrit me bimë bioindikatore dhe analiza e depozitimeve.',
          lab: 'Lab - Kimia e Mjedisit',
          duration: '3 orë',
          equipment: [
            { name: 'pH Meter', quantity: 1 },
            { name: 'Konduktimetër', quantity: 1 },
            { name: 'Peshore analitike', quantity: 1 },
            { name: 'Kolektorë depozitimesh', quantity: 4 },
          ],
          chemicals: [
            { name: 'Nitric Acid', formula: 'HNO₃', quantity: 20, unit: 'mL' },
            { name: 'Sodium Hydroxide', formula: 'NaOH', quantity: 5, unit: 'g' },
            { name: 'Ujë i distiluar', formula: 'H₂O', quantity: 500, unit: 'mL' },
          ],
        },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════
// Eksporti i katalogut komplet
// ═══════════════════════════════════════════════════

export const experimentCatalog: Program[] = [
  // Bachelor
  kimiPergjithshmeBachelor,
  kimiInxhinierikeBachelor,
  kimiUshqimoreBachelor,
  // Master
  kimiOrganikeMaster,
  kimiFizikeMaster,
  kimiAnalitikeMaster,
  kimiMjedisMaster,
];
