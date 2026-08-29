const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/issues/[id]/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Overall Page Background
content = content.replace(
  /<div className="flex-1 bg-zinc-50 dark:bg-zinc-950\/50 min-h-screen pb-12">/,
  '<div className="flex-1 bg-[#0d0d0d] text-white min-h-screen pb-12 pt-28">'
);

// 2. Secondary Header (Back button, ID)
content = content.replace(
  /<div className="bg-background border-b border-border\/40 py-4 shadow-xs sticky top-16 z-20">/,
  '<div className="bg-[#121212]/80 backdrop-blur-md border-y border-zinc-800 py-4 shadow-xl relative z-10">'
);
content = content.replace(
  /className="flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"/,
  'className="flex items-center gap-1 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"'
);
content = content.replace(
  /text-muted-foreground hidden sm:block/g,
  'text-zinc-500 hidden sm:block'
);
content = content.replace(
  /bg-muted\/60 px-2 py-1 rounded-md border border-border\/40/g,
  'bg-zinc-900 px-2 py-1 rounded-md border border-zinc-800 text-zinc-300'
);
content = content.replace(
  /variant="outline" size="icon" className="h-7 w-7 rounded-md"/,
  'variant="outline" size="icon" className="h-7 w-7 rounded-md border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800"'
);

// 3. Title Section
content = content.replace(
  /bg-brand-blue\/10 text-brand-blue border border-brand-blue\/20/g,
  'bg-[#ff4a1c]/10 text-[#ff4a1c] border border-[#ff4a1c]/20'
);
content = content.replace(
  /text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight/g,
  'text-3xl sm:text-5xl font-black tracking-tighter text-white leading-tight mt-1'
);

// 4. Image Section
content = content.replace(
  /border-4 border-background/g,
  'border-4 border-[#121212]'
);

// 5. Description
content = content.replace(
  /text-base text-muted-foreground leading-relaxed/g,
  'text-base text-zinc-400 font-medium leading-relaxed'
);

// 6. Civic Priority Card
content = content.replace(
  /bg-zinc-950\/20/g,
  'bg-[#121212]'
);
content = content.replace(
  /border-border\/60 overflow-hidden relative shadow-lg/g,
  'border-zinc-800 overflow-hidden relative shadow-2xl'
);
content = content.replace(
  /bg-muted\/20/g,
  'bg-zinc-900/50'
);
content = content.replace(
  /border-border\/40/g,
  'border-zinc-800'
);
content = content.replace(
  /stroke-muted/g,
  'stroke-zinc-800'
);
content = content.replace(
  /text-muted-foreground/g,
  'text-zinc-400'
);
content = content.replace(
  /text-muted-foreground\/80/g,
  'text-zinc-500'
);
content = content.replace(
  /bg-brand-blue\/50/g,
  'bg-[#ff4a1c]/50'
);

// 7. AI Analysis Card
content = content.replace(
  /border-brand-blue\/20 bg-brand-blue\/5/g,
  'border-[#ff4a1c]/20 bg-[#121212]'
);
content = content.replace(
  /border-brand-blue\/10/g,
  'border-zinc-800'
);
content = content.replace(
  /text-brand-blue/g,
  'text-[#ff4a1c]'
);

// 8. Sidebar Cards (Community Confirmation, Location, Timeline, Status Updates)
content = content.replace(
  /<Card hoverEffect={false} className="border-border\/60 shadow-md">/g,
  '<Card hoverEffect={false} className="border-zinc-800 shadow-xl bg-[#121212]">'
);
content = content.replace(
  /<Card hoverEffect={false} className="border-border\/60 overflow-hidden shadow-md">/g,
  '<Card hoverEffect={false} className="border-zinc-800 overflow-hidden shadow-xl bg-[#121212]">'
);
content = content.replace(
  /bg-emerald-100 dark:bg-emerald-900\/30/g,
  'bg-[#ff4a1c]/10'
);
content = content.replace(
  /text-emerald-600 dark:text-emerald-400/g,
  'text-[#ff4a1c]'
);
content = content.replace(
  /bg-brand-blue hover:bg-brand-blue\/90 text-white/g,
  'bg-gradient-to-r from-[#ff4a1c] to-[#ff2a00] hover:scale-[1.02] transition-transform text-white shadow-lg shadow-[#ff4a1c]/20 border-none'
);
content = content.replace(
  /border-emerald-500/g,
  'border-[#ff4a1c]/50 bg-[#ff4a1c]/10'
);
content = content.replace(
  /bg-muted/g,
  'bg-zinc-900'
);
content = content.replace(
  /text-foreground/g,
  'text-white'
);

// Updates logic fix
content = content.replace(
  /bg-background border-brand-blue/g,
  'bg-zinc-900 border-[#ff4a1c]'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Updated Issue detail layout');
