const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/page.tsx');
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

const startMarker = '{/* 3. CIVIC ISSUE RESOLUTION FLOW (LIGHT MODE';
const endMarker = '{/* 4. COMMUNITY HEALTH DASHBOARD (DARK MODE';

const startIndex = lines.findIndex(line => line.includes(startMarker));
const endIndex = lines.findIndex(line => line.includes(endMarker));

if (startIndex === -1 || endIndex === -1) {
  console.error('Markers not found', startIndex, endIndex);
  process.exit(1);
}

const replacementLines = `      {/* 3. CIVIC ISSUE RESOLUTION FLOW (LIGHT MODE) */}
      <section className="bg-zinc-50 text-[#1a1a1a] py-24 sm:py-32 border-t border-zinc-200 overflow-hidden relative">
        <PageContainer>
          
          <motion.div {...scrollReveal} className="text-left mb-20 max-w-3xl">
            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter text-zinc-900 mb-6">
              Civic Issue Resolution
            </h2>
            <p className="text-zinc-500 text-lg sm:text-xl font-medium leading-relaxed">
              We've re-engineered the municipal feedback loop.
            </p>
          </motion.div>

          {/* 3-Column Header Process */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 text-left mb-24">
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-zinc-200 shadow-sm hover:shadow-xl transition-shadow duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-zinc-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#ff4a1c]/10 transition-all duration-300">
                <Zap className="w-6 h-6 text-zinc-700 group-hover:text-[#ff4a1c] transition-colors" />
              </div>
              <h3 className="text-2xl font-black text-zinc-900 tracking-tight mb-4">Optimize</h3>
              <p className="text-zinc-600 text-sm leading-relaxed font-medium">
                <strong className="text-zinc-900 font-bold">Reduce reporting overhead</strong> by letting citizens submit geotagged photo reports in under 10 seconds without tedious forms.
              </p>
            </div>
            
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-zinc-200 shadow-sm hover:shadow-xl transition-shadow duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-zinc-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#0f62fe]/10 transition-all duration-300">
                <Brain className="w-6 h-6 text-zinc-700 group-hover:text-[#0f62fe] transition-colors" />
              </div>
              <h3 className="text-2xl font-black text-zinc-900 tracking-tight mb-4">Engage</h3>
              <p className="text-zinc-600 text-sm leading-relaxed font-medium">
                <strong className="text-zinc-900 font-bold">Leverage AI automation</strong> to filter duplicate complaints, consolidate neighborhood requests, and direct field teams efficiently.
              </p>
            </div>
            
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-zinc-200 shadow-sm hover:shadow-xl transition-shadow duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-zinc-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#00f2fe]/10 transition-all duration-300">
                <CheckCircle2 className="w-6 h-6 text-zinc-700 group-hover:text-[#00f2fe] transition-colors" />
              </div>
              <h3 className="text-2xl font-black text-zinc-900 tracking-tight mb-4">Resolve</h3>
              <p className="text-zinc-600 text-sm leading-relaxed font-medium">
                <strong className="text-zinc-900 font-bold">Ensure a seamless UX</strong> by removing operational roadblocks and keeping residents updated dynamically at every single resolution state.
              </p>
            </div>
          </div>

          {/* Workflow Diagram Section */}
          <div className="bg-white rounded-[40px] border border-zinc-200 shadow-xl shadow-zinc-200/50 p-8 sm:p-16 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-zinc-50 to-zinc-100 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
            
            <div className="text-left mb-16 relative z-10 max-w-2xl">
              <span className="text-xs font-black uppercase tracking-widest text-[#ff4a1c] mb-4 block">Pipeline Architecture</span>
              <h3 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight">Smart Dispatch Process</h3>
              <p className="text-zinc-500 text-base mt-4 font-medium">How we make every civic report count from submission to resolution.</p>
            </div>

            {/* Workflow Diagram SVG Container */}
            <div className="w-full overflow-x-auto pb-10 relative z-10 custom-scrollbar">
              <div className="min-w-[900px] w-full h-[440px] relative flex items-center justify-center">
                <svg viewBox="0 0 1000 440" className="w-full h-full text-zinc-900 font-sans drop-shadow-sm">
                  
                  {/* Concentric Radar/Target Marker (Start Point) */}
                  <motion.circle initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 0.15 }} viewport={{ once: true }} transition={{ duration: 0.5 }} cx="60" cy="80" r="24" fill="#ff4a1c" />
                  <motion.circle initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 0.3 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} cx="60" cy="80" r="14" fill="#ff4a1c" />
                  <motion.circle initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} cx="60" cy="80" r="6" fill="#ff4a1c" />
                  
                  {/* Base Track Lines (Faint Background) */}
                  <path d="M 60,80 L 60,140 L 160,140" fill="none" stroke="#f4f4f5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 340,140 L 440,140" fill="none" stroke="#f4f4f5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 660,140 L 720,140 A 50,50 0 0 1 770,190 L 770,220 A 50,50 0 0 1 720,270 L 660,270" fill="none" stroke="#f4f4f5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 440,270 L 160,270 A 50,50 0 0 0 110,320 L 110,350" fill="none" stroke="#f4f4f5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  
                  {/* Animated Active Lines */}
                  <motion.path 
                    initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
                    d="M 60,80 L 60,140 L 160,140" fill="none" stroke="#ff4a1c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" 
                  />
                  <motion.path 
                    initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: "easeInOut", delay: 1.5 }}
                    d="M 340,140 L 440,140" fill="none" stroke="#0f62fe" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" 
                  />
                  <motion.path 
                    initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeInOut", delay: 2.3 }}
                    d="M 660,140 L 720,140 A 50,50 0 0 1 770,190 L 770,220 A 50,50 0 0 1 720,270 L 660,270" fill="none" stroke="#00f2fe" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" 
                  />
                  <motion.path 
                    initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeInOut", delay: 3.5 }}
                    d="M 440,270 L 160,270 A 50,50 0 0 0 110,320 L 110,350" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" 
                  />

                  {/* Node 1: Citizen Upload */}
                  <motion.g initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 1.0 }}>
                    <rect x="160" y="110" width="180" height="60" rx="30" fill="#ffffff" stroke="#e4e4e7" strokeWidth="2" filter="drop-shadow(0 10px 15px rgba(0,0,0,0.05))" />
                    <text x="250" y="145" textAnchor="middle" fontSize="13" fontWeight="800" letterSpacing="0.05em" fill="#18181b">CITIZEN UPLOAD</text>
                  </motion.g>

                  {/* Node 2: Gemini AI Analysis */}
                  <motion.g initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 1.9 }}>
                    <rect x="440" y="110" width="220" height="60" rx="30" fill="#ffffff" stroke="#e4e4e7" strokeWidth="2" filter="drop-shadow(0 10px 15px rgba(0,0,0,0.05))" />
                    <text x="550" y="145" textAnchor="middle" fontSize="13" fontWeight="800" letterSpacing="0.05em" fill="#0f62fe">GEMINI AI ANALYSIS</text>
                  </motion.g>

                  {/* Node 3: Duplicate Merge & Severity Scoring */}
                  <motion.g initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 3.1 }}>
                    <rect x="440" y="240" width="220" height="60" rx="30" fill="#ffffff" stroke="#e4e4e7" strokeWidth="2" filter="drop-shadow(0 10px 15px rgba(0,0,0,0.05))" />
                    <text x="550" y="275" textAnchor="middle" fontSize="13" fontWeight="800" letterSpacing="0.05em" fill="#00f2fe">SEVERITY & MERGING</text>
                  </motion.g>

                  {/* Node 4: Field Dispatch (End Point) */}
                  <motion.g initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 4.5 }}>
                    <rect x="30" y="350" width="160" height="60" rx="30" fill="#10b981" />
                    <text x="110" y="385" textAnchor="middle" fontSize="14" fontWeight="900" letterSpacing="0.05em" fill="#ffffff">FIELD DISPATCH</text>
                  </motion.g>
                  
                  {/* Connection Dots */}
                  <motion.circle initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 1.2 }} cx="160" cy="140" r="5" fill="#ff4a1c" />
                  <motion.circle initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 2.1 }} cx="440" cy="140" r="5" fill="#0f62fe" />
                  <motion.circle initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 3.3 }} cx="660" cy="270" r="5" fill="#00f2fe" />

                </svg>
              </div>
            </div>
            
            {/* 3-Column Footer Description */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-left mt-16 pt-12 border-t border-zinc-100 relative z-10">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center shrink-0">
                  <span className="text-zinc-600 font-bold">1</span>
                </div>
                <p className="text-zinc-600 text-sm leading-relaxed font-medium">
                  <strong className="text-zinc-900 font-bold block mb-1">Immediate public logging.</strong> Once uploaded, a ticket is mapped and made visible to prevent repeated reports.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center shrink-0">
                  <span className="text-zinc-600 font-bold">2</span>
                </div>
                <p className="text-zinc-600 text-sm leading-relaxed font-medium">
                  <strong className="text-zinc-900 font-bold block mb-1">Automated AI dispatch.</strong> Automatic parsing skips manual support triage, sending issues straight to field technicians.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center shrink-0">
                  <span className="text-zinc-600 font-bold">3</span>
                </div>
                <p className="text-zinc-600 text-sm leading-relaxed font-medium">
                  <strong className="text-zinc-900 font-bold block mb-1">Optimal budget routing.</strong> Deduplicating nearby tickets allows local city councils to group work orders effectively.
                </p>
              </div>
            </div>

          </div>
        </PageContainer>
      </section>
`;

const newLines = [
  ...lines.slice(0, startIndex),
  replacementLines,
  ...lines.slice(endIndex)
];

fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
console.log('Section updated successfully.');
