const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/my-reports/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Wrapper
content = content.replace(
  /<PageContainer className="py-10 flex flex-col gap-6">/,
  '<div className="flex-1 bg-[#0d0d0d] text-white min-h-screen"><PageContainer className="py-10 flex flex-col gap-6">'
);
content = content.replace(
  /<\/PageContainer>/,
  '</PageContainer></div>'
);

// Back button
content = content.replace(
  /className="w-fit hover:text-foreground text-muted-foreground cursor-pointer"/g,
  'className="w-fit hover:text-white text-zinc-400 cursor-pointer font-semibold tracking-wide"'
);

// Headers
content = content.replace(
  /text-3xl font-bold tracking-tight/g,
  'text-3xl font-bold tracking-tighter text-white'
);
content = content.replace(
  /text-muted-foreground mt-1/g,
  'text-zinc-400 mt-1 font-medium tracking-wide'
);

// Filters
content = content.replace(
  /bg-muted\/40 p-1.5 rounded-xl border border-border\/40/g,
  'bg-zinc-900 p-1.5 rounded-xl border border-zinc-800'
);
content = content.replace(
  /text-muted-foreground ml-2 mr-1/g,
  'text-zinc-500 ml-2 mr-1'
);
content = content.replace(
  /'bg-background shadow-xs text-brand-blue border border-border\/80'/g,
  "'bg-[#121212] shadow-xl text-[#ff4a1c] border border-zinc-800'"
);
content = content.replace(
  /'text-muted-foreground hover:text-foreground'/g,
  "'text-zinc-500 hover:text-white'"
);

// Status Icons in function
content = content.replace(
  /text-brand-blue/g,
  'text-[#ff4a1c]'
);
content = content.replace(
  /text-muted-foreground/g,
  'text-zinc-400'
);

// Loading state
content = content.replace(
  /text-brand-blue/g,
  'text-[#ff4a1c]'
);

// Empty State
content = content.replace(
  /<GlowCard customSize glowColor="purple" className="border-dashed border-2 py-16 flex flex-col items-center justify-center text-center mt-4 bg-muted\/10 overflow-hidden relative">/,
  '<GlowCard customSize glowColor="orange" className="border-dashed border-zinc-800 border-2 py-16 flex flex-col items-center justify-center text-center mt-4 bg-[#121212] shadow-2xl overflow-hidden relative">'
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
  /text-muted-foreground max-w-xs mt-1/g,
  'text-zinc-400 max-w-xs mt-1 font-medium tracking-wide'
);
content = content.replace(
  /bg-brand-blue hover:bg-brand-blue\/90/g,
  'bg-[#ff4a1c] hover:bg-[#ff4a1c]/90 text-white font-bold shadow-lg shadow-[#ff4a1c]/20 border-none rounded-full'
);

// Report Cards
content = content.replace(
  /<GlowCard customSize glowColor="blue" className="overflow-hidden p-0 border-border\/60 transition-colors hover:border-brand-blue\/50 bg-transparent">/g,
  '<GlowCard customSize glowColor="orange" className="overflow-hidden p-0 border-zinc-800 transition-colors hover:border-[#ff4a1c]/50 bg-[#121212] shadow-xl">'
);
content = content.replace(
  /bg-muted relative border-r border-border\/40/g,
  'bg-zinc-900 relative border-r border-zinc-800'
);
content = content.replace(
  /bg-zinc-100 dark:bg-zinc-900/g,
  'bg-zinc-950/50'
);
content = content.replace(
  /bg-background\/90 backdrop-blur-xs px-2 py-1 rounded-md shadow-xs border border-border\/50/g,
  'bg-zinc-950/90 backdrop-blur-md px-2 py-1 rounded-md shadow-lg border border-zinc-800'
);
content = content.replace(
  /font-bold text-sm line-clamp-1/g,
  'font-bold text-base tracking-tight text-white line-clamp-1'
);
content = content.replace(
  /text-muted-foreground font-semibold bg-muted px-1.5 py-0.5 rounded border border-border\/60/g,
  'text-zinc-400 font-semibold bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800'
);
content = content.replace(
  /border-t border-border\/40/g,
  'border-t border-zinc-800'
);
content = content.replace(
  /text-muted-foreground line-clamp-2 leading-relaxed/g,
  'text-zinc-400 line-clamp-2 leading-relaxed font-medium'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Updated my-reports page');
