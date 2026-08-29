const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/issues/[id]/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Overall Page Background
content = content.replace(
  /<div className="flex-1 bg-\[#0d0d0d\] text-white min-h-screen pb-12 pt-28">/g,
  '<div className="flex-1 bg-zinc-50 min-h-screen pb-12 pt-28">'
);

// 2. Secondary Header (Back button, ID)
content = content.replace(
  /<div className="bg-\[#121212\]\/80 backdrop-blur-md border-y border-zinc-800 py-4 shadow-xl relative z-10">/g,
  '<div className="bg-background/80 backdrop-blur-md border-b border-border/40 py-4 shadow-xs relative z-10">'
);
content = content.replace(
  /className="flex items-center gap-1 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"/g,
  'className="flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"'
);
content = content.replace(
  /text-zinc-500 hidden sm:block/g,
  'text-muted-foreground hidden sm:block'
);
content = content.replace(
  /bg-zinc-900 px-2 py-1 rounded-md border border-zinc-800 text-zinc-300/g,
  'bg-muted/60 px-2 py-1 rounded-md border border-border/40'
);
content = content.replace(
  /variant="outline" size="icon" className="h-7 w-7 rounded-md border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800"/g,
  'variant="outline" size="icon" className="h-7 w-7 rounded-md"'
);

// 3. Title Section
content = content.replace(
  /bg-\[#ff4a1c\]\/10 text-\[#ff4a1c\] border border-\[#ff4a1c\]\/20/g,
  'bg-brand-blue/10 text-brand-blue border border-brand-blue/20'
);
content = content.replace(
  /text-3xl sm:text-5xl font-black tracking-tighter text-white leading-tight mt-1/g,
  'text-3xl sm:text-5xl font-black tracking-tighter text-foreground leading-tight mt-1'
);

// 4. Image Section
content = content.replace(
  /border-4 border-\[#121212\]/g,
  'border-4 border-background'
);

// 5. Description
content = content.replace(
  /text-base text-zinc-400 font-medium leading-relaxed/g,
  'text-base text-muted-foreground leading-relaxed'
);

// 6. Civic Priority Card
// Needs careful replacement since some classes overlap.
// I will replace specific chunks for the priority card manually in the string if possible, or just replace all instances.
content = content.replace(
  /bg-\[#121212\]/g,
  'bg-background'
);
content = content.replace(
  /border-zinc-800 overflow-hidden relative shadow-2xl/g,
  'border-border/60 overflow-hidden relative shadow-lg bg-zinc-50/50'
);
content = content.replace(
  /bg-zinc-900\/50/g,
  'bg-muted/20'
);
content = content.replace(
  /border-zinc-800/g,
  'border-border/40'
);
content = content.replace(
  /stroke-zinc-800/g,
  'stroke-muted'
);
content = content.replace(
  /text-zinc-400/g,
  'text-muted-foreground'
);
content = content.replace(
  /text-zinc-500/g,
  'text-muted-foreground/80'
);
content = content.replace(
  /bg-\[#ff4a1c\]\/50/g,
  'bg-brand-blue/50'
);

// 7. AI Analysis Card
content = content.replace(
  /border-\[#ff4a1c\]\/20 bg-background/g,
  'border-brand-blue/20 bg-brand-blue/5'
);
content = content.replace(
  /text-\[#ff4a1c\]/g,
  'text-brand-blue'
);

// 8. Sidebar Cards (Community Confirmation, Location, Timeline, Status Updates)
content = content.replace(
  /<Card hoverEffect={false} className="border-border\/40 shadow-xl bg-background">/g,
  '<Card hoverEffect={false} className="border-border/60 shadow-md">'
);
content = content.replace(
  /<Card hoverEffect={false} className="border-border\/40 overflow-hidden shadow-xl bg-background">/g,
  '<Card hoverEffect={false} className="border-border/60 overflow-hidden shadow-md">'
);
content = content.replace(
  /bg-\[#ff4a1c\]\/10/g,
  'bg-emerald-100'
);

// ThumbsUp icon text color:
// text-[#ff4a1c] -> text-emerald-600
// But we already replaced text-[#ff4a1c] with text-brand-blue in step 7. Let's fix that globally if it messed up.
// Actually, earlier we did: content = content.replace(/text-\[#ff4a1c\]/g, 'text-brand-blue');
// This replaced the ThumbsUp color too. I will fix it by looking for the specific div.
content = content.replace(
  /h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-brand-blue/g,
  'h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600'
);

content = content.replace(
  /bg-gradient-to-r from-\[#ff4a1c\] to-\[#ff2a00\] hover:scale-\[1.02\] transition-transform text-white shadow-lg shadow-brand-blue\/20 border-none/g,
  'bg-brand-blue hover:bg-brand-blue/90 text-white'
);

// Disabled button border
content = content.replace(
  /border-brand-blue\/50 bg-emerald-100/g,
  'border-emerald-500 text-emerald-600'
);

content = content.replace(
  /bg-zinc-900/g,
  'bg-muted'
);

// The 'text-white' was replaced with 'text-foreground' earlier? No I didn't replace it yet.
content = content.replace(
  /text-white/g,
  'text-foreground'
);
// But wait, the button needs text-white, and the overall div had text-white. Let's undo text-white replacement for the button.
content = content.replace(
  /bg-brand-blue hover:bg-brand-blue\/90 text-foreground/g,
  'bg-brand-blue hover:bg-brand-blue/90 text-white'
);

// Timeline updates
content = content.replace(
  /bg-muted border-brand-blue/g,
  'bg-background border-brand-blue'
);

// Re-add dark mode variants for light theme elements just to be safe, or just keep them removed.
// Since user asked for "white", light mode is fine.

fs.writeFileSync(filePath, content, 'utf8');
console.log('Reverted Issue detail layout to white theme');
