const fs = require('fs');
const path = require('path');

// 1. Update register/page.tsx
const registerPath = path.join(__dirname, '../app/register/page.tsx');
let regContent = fs.readFileSync(registerPath, 'utf8');

regContent = regContent.replace(
  /<div className="flex-1 flex flex-col justify-center py-12 relative overflow-hidden bg-radial from-brand-blue\/5 via-transparent to-transparent">([\s\S]*?)<div className="absolute inset-0 -z-10[^>]*><\/div>/,
  `<div className="flex-1 flex flex-col justify-center py-12 relative overflow-hidden bg-[#0d0d0d] text-white">
      {/* Background grid */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,oklch(0.92_0.01_250_/_5%)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.92_0.01_250_/_5%)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />`
);

regContent = regContent.replace(
  /className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"/g,
  'className="inline-flex items-center gap-1 text-sm font-semibold tracking-wide text-zinc-400 hover:text-white transition-colors w-fit"'
);

regContent = regContent.replace(
  /<Card className="border-border\/60 bg-background\/80 backdrop-blur-md shadow-xl">/,
  '<Card className="border-zinc-800 bg-[#0a0a0a]/90 backdrop-blur-xl shadow-2xl">'
);

regContent = regContent.replace(
  /<CardTitle className="text-2xl font-bold tracking-tight">/g,
  '<CardTitle className="text-3xl font-bold tracking-tighter text-white">'
);

regContent = regContent.replace(
  /<CardDescription>Join citizens reporting local issues to improve our city<\/CardDescription>/,
  '<CardDescription className="text-zinc-400">Join citizens reporting local issues to improve our city</CardDescription>'
);

regContent = regContent.replace(
  /text-muted-foreground/g,
  'tracking-wide text-zinc-400'
);

regContent = regContent.replace(
  /bg-background\/50/g,
  'bg-zinc-900/50 text-white'
);

regContent = regContent.replace(
  /border-border\/80 focus:border-brand-blue\/50/g,
  'border-zinc-800 focus:border-[#ff4a1c]/50 focus:ring-1 focus:ring-[#ff4a1c]/30'
);

regContent = regContent.replace(
  /border-red-500 focus:border-red-500/g,
  'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500'
);

regContent = regContent.replace(
  /text-muted-foreground hover:text-foreground/g,
  'text-zinc-500 hover:text-white'
);

regContent = regContent.replace(
  /<Button type="submit" loading=\{loading\} className="w-full bg-brand-blue hover:bg-brand-blue\/90 text-white font-semibold shadow-xs mt-2">/,
  '<Button type="submit" loading={loading} className="w-full bg-[#ff4a1c] hover:bg-[#ff4a1c]/90 text-white font-bold shadow-lg shadow-[#ff4a1c]/20 border-none mt-2">'
);

regContent = regContent.replace(
  /<CardFooter className="justify-center border-t border-border\/40 py-4 bg-muted\/20 rounded-b-xl">/g,
  '<CardFooter className="justify-center border-t border-zinc-800 py-4 bg-zinc-900/30 rounded-b-xl">'
);

regContent = regContent.replace(
  /className="text-brand-blue font-semibold hover:underline"/g,
  'className="text-[#ff4a1c] font-bold tracking-wide hover:underline"'
);

fs.writeFileSync(registerPath, regContent, 'utf8');

// 2. Update report/page.tsx
const reportPath = path.join(__dirname, '../app/report/page.tsx');
let repContent = fs.readFileSync(reportPath, 'utf8');

repContent = repContent.replace(
  /<div className="flex-1 py-10 bg-radial from-brand-blue\/3 via-transparent to-transparent relative">/,
  '<div className="flex-1 py-10 bg-[#0d0d0d] text-white relative">'
);

repContent = repContent.replace(
  /<div className="w-full bg-background border border-border\/50 rounded-2xl p-6 shadow-xs">/,
  '<div className="w-full bg-[#121212] border border-zinc-800 rounded-2xl p-6 shadow-2xl">'
);

repContent = repContent.replace(
  /bg-border\/80/g,
  'bg-zinc-800'
);

repContent = repContent.replace(
  /bg-brand-blue text-white shadow-md shadow-brand-blue\/15/g,
  'bg-[#ff4a1c] text-white shadow-md shadow-[#ff4a1c]/20'
);

repContent = repContent.replace(
  /bg-background border-2 border-brand-blue text-brand-blue/g,
  'bg-[#121212] border-2 border-[#ff4a1c] text-[#ff4a1c]'
);

repContent = repContent.replace(
  /bg-muted border border-border text-muted-foreground/g,
  'bg-zinc-900 border border-zinc-800 text-zinc-500'
);

repContent = repContent.replace(
  /text-brand-blue/g,
  'text-[#ff4a1c]'
);

repContent = repContent.replace(
  /<Card hoverEffect=\{false\} className="border-border\/60 shadow-lg flex-1 flex flex-col">/g,
  '<Card hoverEffect={false} className="border-zinc-800 bg-[#121212] shadow-2xl flex-1 flex flex-col">'
);

repContent = repContent.replace(
  /<Card hoverEffect=\{false\} className="border-border\/60 shadow-lg flex-1 flex flex-col justify-between">/g,
  '<Card hoverEffect={false} className="border-zinc-800 bg-[#121212] shadow-2xl flex-1 flex flex-col justify-between">'
);

repContent = repContent.replace(
  /border-dashed border-muted-foreground\/30 hover:border-brand-blue\/50 bg-muted\/10/g,
  'border-dashed border-zinc-700 hover:border-[#ff4a1c]/50 bg-zinc-900/50'
);

repContent = repContent.replace(
  /bg-brand-blue\/10 text-brand-blue/g,
  'bg-[#ff4a1c]/10 text-[#ff4a1c]'
);

repContent = repContent.replace(
  /bg-brand-blue hover:bg-brand-blue\/90 text-white font-semibold shadow-xs/g,
  'bg-[#ff4a1c] hover:bg-[#ff4a1c]/90 text-white font-bold shadow-lg shadow-[#ff4a1c]/20 border-none'
);

repContent = repContent.replace(
  /bg-muted\/20/g,
  'bg-zinc-900/30'
);

repContent = repContent.replace(
  /border-border\/40/g,
  'border-zinc-800'
);

repContent = repContent.replace(
  /bg-background\/50 outline-hidden focus:border-brand-blue\/50 text-sm/g,
  'bg-zinc-900/50 outline-hidden focus:border-[#ff4a1c]/50 focus:ring-1 focus:ring-[#ff4a1c]/30 text-white text-sm border-zinc-800'
);

repContent = repContent.replace(
  /bg-brand-blue\/5/g,
  'bg-[#ff4a1c]/10'
);

repContent = repContent.replace(
  /border-brand-blue\/20/g,
  'border-[#ff4a1c]/20'
);

repContent = repContent.replace(
  /text-muted-foreground/g,
  'text-zinc-400'
);

repContent = repContent.replace(
  /bg-zinc-100 dark:bg-zinc-950\/20/g,
  'bg-zinc-950/50'
);

repContent = repContent.replace(
  /className="w-full p-4 rounded-xl border border-border\/60 bg-muted\/10"/g,
  'className="w-full p-4 rounded-xl border border-zinc-800 bg-zinc-900/30"'
);

fs.writeFileSync(reportPath, repContent, 'utf8');

console.log('Update completed');
