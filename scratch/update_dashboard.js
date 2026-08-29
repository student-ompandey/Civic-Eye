const fs = require('fs');
const path = require('path');

const dashboardPath = path.join(__dirname, '../app/dashboard/page.tsx');
let content = fs.readFileSync(dashboardPath, 'utf8');

// Container
content = content.replace(
  /<PageContainer className="py-10 flex flex-col gap-8">/,
  '<div className="flex-1 bg-[#0d0d0d] text-white min-h-screen"><PageContainer className="py-10 flex flex-col gap-8">'
);
content = content.replace(
  /<\/PageContainer>/,
  '</PageContainer></div>'
);

// Welcome banner
content = content.replace(
  /border-border\/40/g,
  'border-zinc-800'
);
content = content.replace(
  /text-3xl font-bold tracking-tight/g,
  'text-3xl font-bold tracking-tighter text-white'
);
content = content.replace(
  /text-muted-foreground mt-1/g,
  'text-zinc-400 mt-1 font-medium tracking-wide'
);
content = content.replace(
  /font-semibold text-foreground/g,
  'font-bold text-white'
);
content = content.replace(
  /bg-brand-blue hover:bg-brand-blue\/90 text-white font-semibold shadow-xs shrink-0 cursor-pointer/g,
  'bg-[#ff4a1c] hover:bg-[#ff4a1c]/90 text-white font-bold shadow-lg shadow-[#ff4a1c]/20 shrink-0 cursor-pointer border-none'
);
content = content.replace(
  /bg-brand-blue hover:bg-brand-blue\/90 text-white font-bold shadow-md cursor-pointer/g,
  'bg-[#ff4a1c] hover:bg-[#ff4a1c]/90 text-white font-bold shadow-lg shadow-[#ff4a1c]/20 shrink-0 cursor-pointer border-none'
);

// Empty state
content = content.replace(
  /border-dashed border-2 py-20 flex flex-col items-center justify-center text-center bg-muted\/20 overflow-hidden relative/g,
  'border-dashed border-zinc-800 py-20 flex flex-col items-center justify-center text-center bg-[#121212] overflow-hidden relative shadow-2xl'
);
content = content.replace(
  /fill-brand-blue\/20/g,
  'fill-[#ff4a1c]/10'
);
content = content.replace(
  /bg-brand-blue\/10 flex items-center justify-center text-brand-blue/g,
  'bg-[#ff4a1c]/10 flex items-center justify-center text-[#ff4a1c]'
);
content = content.replace(
  /text-xl font-bold text-foreground/g,
  'text-2xl font-bold text-white tracking-tighter'
);
content = content.replace(
  /text-sm text-muted-foreground/g,
  'text-sm text-zinc-400 tracking-wide font-medium'
);

// Metric Cards
content = content.replace(
  /<Card hoverEffect=\{false\} className="bg-muted\/10">/g,
  '<Card hoverEffect={false} className="bg-[#121212] border-zinc-800 shadow-xl">'
);
content = content.replace(
  /text-xs font-semibold tracking-wider text-muted-foreground uppercase/g,
  'text-[10px] font-bold tracking-widest text-zinc-500 uppercase'
);
content = content.replace(
  /text-brand-blue/g,
  'text-[#ff4a1c]'
);
content = content.replace(
  /text-3xl font-black text-foreground/g,
  'text-4xl font-black text-white tracking-tighter'
);

// Chart Card
content = content.replace(
  /<GlowCard customSize glowColor="purple" className="bg-transparent border-border\/60">/g,
  '<GlowCard customSize glowColor="orange" className="bg-[#121212] border-zinc-800 shadow-2xl">'
);
content = content.replace(
  /text-base font-bold flex items-center gap-2/g,
  'text-lg font-bold tracking-tight text-white flex items-center gap-2'
);
content = content.replace(
  /Your reported issues over the last 6 months/g,
  '<span className="text-zinc-400 tracking-wide">Your reported issues over the last 6 months</span>'
);
content = content.replace(
  /bg-foreground text-background/g,
  'bg-white text-black'
);
content = content.replace(
  /bg-brand-blue\/80 hover:bg-brand-blue/g,
  'bg-[#ff4a1c]/80 hover:bg-[#ff4a1c]'
);

// Recent Reports List
content = content.replace(
  /text-lg font-bold/g,
  'text-xl font-bold tracking-tighter text-white'
);
content = content.replace(
  /text-xs font-bold text-brand-blue hover:underline flex items-center/g,
  'text-xs font-bold tracking-wide text-[#ff4a1c] hover:underline flex items-center'
);
content = content.replace(
  /<GlowCard customSize glowColor="blue" className="p-0 border-border\/60 transition-colors hover:border-brand-blue\/50 bg-transparent h-full">/g,
  '<GlowCard customSize glowColor="orange" className="p-0 border-zinc-800 transition-colors hover:border-[#ff4a1c]/50 bg-[#121212] h-full shadow-xl">'
);
content = content.replace(
  /bg-muted/g,
  'bg-zinc-900'
);
content = content.replace(
  /font-bold text-sm line-clamp-1/g,
  'font-bold text-base tracking-tight text-white line-clamp-1'
);
content = content.replace(
  /text-\[10px\] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider border bg-background text-muted-foreground/g,
  'text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider border border-zinc-700 bg-zinc-800 text-zinc-300'
);

// Guidelines
content = content.replace(
  /<Card hoverEffect=\{false\} className="bg-brand-blue\/5 border-brand-blue\/20">/g,
  '<Card hoverEffect={false} className="bg-[#ff4a1c]/5 border-[#ff4a1c]/20 shadow-xl">'
);
content = content.replace(
  /text-sm font-bold text-brand-blue/g,
  'text-sm font-bold text-[#ff4a1c] tracking-tight'
);
content = content.replace(
  /text-xs/g,
  'text-xs tracking-wide'
);
content = content.replace(
  /bg-brand-blue\/15 text-brand-blue/g,
  'bg-[#ff4a1c]/15 text-[#ff4a1c]'
);

fs.writeFileSync(dashboardPath, content, 'utf8');

console.log('Dashboard update completed');
