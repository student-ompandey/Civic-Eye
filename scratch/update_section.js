const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/page.tsx');
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

const startMarker = '{/* 4. COMMUNITY HEALTH DASHBOARD (DARK MODE - Based on Image 3) */}';
const endMarker = '{/* 5. RESOLUTION ANALYTICS (DARK MODE - Based on Image 4) */}';

const startIndex = lines.findIndex(line => line.includes(startMarker));
const endIndex = lines.findIndex(line => line.includes(endMarker));

if (startIndex === -1 || endIndex === -1) {
  console.error('Markers not found', startIndex, endIndex);
  process.exit(1);
}

const replacementLines = `      {/* 4. COMMUNITY HEALTH DASHBOARD (DARK MODE) */}
      <section className="bg-[#0a0a0a] text-[#f5f5f5] py-24 sm:py-32 border-t border-zinc-900 relative overflow-hidden">
        {/* Subtle background noise/grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <PageContainer>
          <motion.div {...scrollReveal} className="text-left mb-20 max-w-3xl relative z-10">
            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter text-white mb-6">
              Community Health <br className="hidden sm:block"/>& Maintenance
            </h2>
            <p className="text-[#ff4a1c] text-lg font-semibold tracking-wide">
              Build flawless communities that thrive.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch relative z-10">
            
            {/* Left Column: Health Score */}
            <div className="bg-[#121212]/80 backdrop-blur-md p-10 rounded-3xl border border-zinc-800/50 flex flex-col items-center justify-center text-center relative overflow-hidden group hover:border-zinc-700 transition-colors duration-500 shadow-2xl shadow-black/50">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0f62fe]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <span className="text-zinc-400 text-sm font-bold uppercase tracking-widest mb-4">Health Score</span>
              <span className="text-zinc-500 text-sm mb-12 max-w-xs">The proportion of resolved to reported issues in real-time.</span>
              
              {/* Semi Circle Progress Arc */}
              <div className="relative w-full max-w-[280px] aspect-[2/1] overflow-hidden flex items-end justify-center mb-4">
                <svg className="w-full h-full drop-shadow-[0_0_15px_rgba(0,242,254,0.3)]" viewBox="0 0 200 100">
                  <defs>
                    <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0f62fe" />
                      <stop offset="50%" stopColor="#00f2fe" />
                      <stop offset="100%" stopColor="#4facfe" />
                    </linearGradient>
                  </defs>
                  {/* Background Track Arc */}
                  <path d="M 20,100 A 80,80 0 0,1 180,100" fill="none" stroke="#222" strokeWidth="12" strokeLinecap="round" />
                  {/* Foreground Filled Arc (~96%) */}
                  <motion.path 
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 0.96 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                    d="M 20,100 A 80,80 0 0,1 180,100" 
                    fill="none" 
                    stroke="url(#arcGradient)" 
                    strokeWidth="12" 
                    strokeLinecap="round" 
                  />
                </svg>
                
                {/* Text Center Overlay */}
                <div className="absolute bottom-0 flex flex-col items-center translate-y-2">
                  <span className="text-5xl sm:text-6xl font-black text-white tracking-tighter">96%</span>
                  <span className="text-xs font-bold text-[#00f2fe] uppercase tracking-widest mt-2 bg-[#00f2fe]/10 px-3 py-1 rounded-full">Excellent</span>
                </div>
              </div>
              <span className="text-zinc-600 text-xs mt-8">Updated live from monitored divisions.</span>
            </div>

            {/* Right Column: Analytics Bar Chart */}
            <div className="bg-[#121212]/80 backdrop-blur-md p-10 rounded-3xl border border-zinc-800/50 flex flex-col justify-between h-full relative overflow-hidden group hover:border-zinc-700 transition-colors duration-500 shadow-2xl shadow-black/50">
              <div className="absolute inset-0 bg-gradient-to-bl from-[#ff4a1c]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <span className="text-zinc-400 text-sm font-bold uppercase tracking-widest">Infrastructure Analytics</span>
                <p className="text-zinc-500 text-sm mt-3 mb-10">Live ticket distribution recorded over the past 30 days.</p>
              </div>

              {/* Vertical Bars representation */}
              <div className="grid grid-cols-3 gap-4 sm:gap-8 items-end justify-items-center h-[240px] mb-2 relative z-10">
                {/* Horizontal Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                  <div className="w-full border-t border-zinc-500 border-dashed"></div>
                  <div className="w-full border-t border-zinc-500 border-dashed"></div>
                  <div className="w-full border-t border-zinc-500 border-dashed"></div>
                  <div className="w-full border-t border-zinc-500 border-dashed"></div>
                </div>

                {/* Bar 1: Total Reports */}
                <div className="flex flex-col items-center w-full group/bar z-10">
                  <span className="text-sm font-bold text-white mb-3 opacity-0 group-hover/bar:opacity-100 transition-opacity translate-y-2 group-hover/bar:translate-y-0">1,240</span>
                  <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: "180px" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="w-full max-w-[60px] bg-gradient-to-t from-[#0f62fe]/50 to-[#4facfe] rounded-t-xl border-t border-l border-r border-[#4facfe]/50 shadow-[0_0_20px_rgba(79,172,254,0.3)]" 
                  />
                  <span className="text-[11px] text-zinc-500 font-bold tracking-widest mt-4 uppercase text-center">Reports</span>
                </div>

                {/* Bar 2: In Progress */}
                <div className="flex flex-col items-center w-full group/bar z-10">
                  <span className="text-sm font-bold text-white mb-3 opacity-0 group-hover/bar:opacity-100 transition-opacity translate-y-2 group-hover/bar:translate-y-0">15%</span>
                  <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: "80px" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                    className="w-full max-w-[60px] bg-gradient-to-t from-[#ff7b00]/50 to-[#ff7b00] rounded-t-xl border-t border-l border-r border-[#ff7b00]/50 shadow-[0_0_20px_rgba(255,123,0,0.3)]" 
                  />
                  <span className="text-[11px] text-zinc-500 font-bold tracking-widest mt-4 uppercase text-center">In Progress</span>
                </div>

                {/* Bar 3: Critical */}
                <div className="flex flex-col items-center w-full group/bar z-10">
                  <span className="text-sm font-bold text-white mb-3 opacity-0 group-hover/bar:opacity-100 transition-opacity translate-y-2 group-hover/bar:translate-y-0">4%</span>
                  <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: "40px" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    className="w-full max-w-[60px] bg-gradient-to-t from-[#ef4444]/50 to-[#ef4444] rounded-t-xl border-t border-l border-r border-[#ef4444]/50 shadow-[0_0_20px_rgba(239,68,68,0.3)]" 
                  />
                  <span className="text-[11px] text-zinc-500 font-bold tracking-widest mt-4 uppercase text-center">Critical</span>
                </div>
              </div>
            </div>
          </div>

          {/* Grid of details below */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 relative z-10">
            {[
              { title: "Boost response speeds", desc: "Instantly map coordinates to corresponding maintenance sectors.", icon: "⚡" },
              { title: "Deduplicate tickets", desc: "Group similar issue reports together to save inspection hours.", icon: "🧠" },
              { title: "Engaging experience", desc: "Provide clean, friction-free forms for residents.", icon: "✨" },
              { title: "Build civic trust", desc: "Transparency and photo-validated completion notifications.", icon: "🛡️" }
            ].map((item, i) => (
              <div key={i} className="bg-[#121212]/50 p-8 rounded-2xl border border-zinc-800/50 hover:bg-[#1a1a1a] hover:border-zinc-700 transition-all duration-300">
                <div className="text-2xl mb-4 grayscale opacity-80">{item.icon}</div>
                <h4 className="text-lg font-bold text-white mb-3 tracking-tight">{item.title}</h4>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Orange Call To Action section */}
          <div className="mt-12 rounded-3xl bg-gradient-to-br from-[#ff4a1c] to-[#ff7b00] p-10 sm:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 z-10 shadow-[0_0_40px_rgba(255,74,28,0.3)]">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/15 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
            <div className="text-left z-10">
              <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tighter mb-4">
                Gain more with less
              </h3>
              <p className="text-white/90 text-lg max-w-xl font-medium">
                Save time on administrative dispatch routines, optimize civic assets, and keep neighbors informed.
              </p>
            </div>
            <div className="z-10 shrink-0">
              <Link href="/report">
                <Button className="rounded-xl bg-white text-[#ff4a1c] hover:bg-zinc-100 font-bold px-10 py-7 text-lg shadow-xl transition-transform hover:scale-105 active:scale-95">
                  Report an Issue
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Testimonial Cards Slider / "Our work in action" */}
          <div className="mt-32 text-center relative z-10">
            <h3 className="text-4xl sm:text-5xl font-black text-white mb-6 tracking-tighter">Our work in action</h3>
            <p className="text-zinc-400 text-lg mb-16 font-medium">Real feedback from community administrators and civic champions.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              
              <div className="bg-[#121212]/80 backdrop-blur-sm p-10 sm:p-12 rounded-3xl border border-zinc-800 relative group hover:border-zinc-600 transition-colors duration-300 overflow-hidden">
                <div className="absolute -top-10 -left-6 text-[140px] text-zinc-800/20 font-serif leading-none group-hover:text-[#0f62fe]/10 transition-colors duration-500 pointer-events-none select-none">"</div>
                <p className="text-zinc-300 text-lg leading-relaxed font-medium mb-10 relative z-10">
                  Integrating Civic Eye has reduced our municipal complaint response times from two weeks to under 36 hours. The duplicate filtering alone saved us hours of redundant inspection work.
                </p>
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0f62fe] to-[#4facfe] flex items-center justify-center text-white font-bold text-xl shadow-[0_0_15px_rgba(79,172,254,0.3)]">RS</div>
                  <div>
                    <h4 className="text-base font-bold text-white tracking-tight">Rohit Sharma</h4>
                    <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Urban Development | MP</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#121212]/80 backdrop-blur-sm p-10 sm:p-12 rounded-3xl border border-zinc-800 relative group hover:border-zinc-600 transition-colors duration-300 overflow-hidden">
                <div className="absolute -top-10 -left-6 text-[140px] text-zinc-800/20 font-serif leading-none group-hover:text-[#ff4a1c]/10 transition-colors duration-500 pointer-events-none select-none">"</div>
                <p className="text-zinc-300 text-lg leading-relaxed font-medium mb-10 relative z-10">
                  Citizens love the transparency. They can submit a photo of a broken streetlamp on their commute and check the dashboard to see when field technicians have scheduled the repair.
                </p>
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#ff4a1c] to-[#ff7b00] flex items-center justify-center text-white font-bold text-xl shadow-[0_0_15px_rgba(255,74,28,0.3)]">AN</div>
                  <div>
                    <h4 className="text-base font-bold text-white tracking-tight">Aditi Nair</h4>
                    <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Community Organizer | BNG</span>
                  </div>
                </div>
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
