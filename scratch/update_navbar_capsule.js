const fs = require('fs');
const path = require('path');

const navbarPath = path.join(__dirname, '../components/layout/Navbar.tsx');
let content = fs.readFileSync(navbarPath, 'utf8');

// Container & Header
content = content.replace(
  /<header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-\[#0a0a0a\]\/80 backdrop-blur-xl">/,
  '<header className="sticky top-6 z-50 w-full px-4 md:px-6">'
);

content = content.replace(
  /<PageContainer>/,
  '<div className="max-w-[1100px] mx-auto">'
);
content = content.replace(
  /<\/PageContainer>/,
  '</div>'
);

content = content.replace(
  /<div className="flex h-16 items-center justify-between">/,
  '<div className="flex h-14 items-center justify-between rounded-full border border-zinc-800 bg-[#0a0a0a]/80 backdrop-blur-xl px-4 md:px-6 shadow-2xl">'
);

// Links
content = content.replace(
  /className="text-sm font-semibold tracking-wide text-zinc-400 hover:text-white transition-colors"/g,
  'className="text-sm font-semibold tracking-wide text-zinc-400 hover:text-white transition-colors px-3 py-1.5 rounded-full hover:bg-zinc-800/50"'
);

// Buttons
content = content.replace(
  /className="bg-white hover:bg-zinc-200 text-zinc-900 shadow-xl font-bold px-5"/g,
  'className="bg-white hover:bg-zinc-200 text-zinc-900 shadow-xl font-bold px-5 rounded-full"'
);

content = content.replace(
  /className="bg-\[#ff4a1c\] hover:bg-\[#ff4a1c\]\/90 text-white shadow-lg shadow-\[#ff4a1c\]\/20 font-bold px-6 border-none"/g,
  'className="bg-[#ff4a1c] hover:bg-[#ff4a1c]/90 text-white shadow-lg shadow-[#ff4a1c]/20 font-bold px-6 border-none rounded-full"'
);

// Sign Out / Sign in ghost buttons
content = content.replace(
  /className="font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800"/g,
  'className="font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full px-4"'
);

// Mobile Nav Dropdown Position Fix
content = content.replace(
  /className="md:hidden border-b border-zinc-800 bg-\[#0a0a0a\]\/95 backdrop-blur-md"/g,
  'className="md:hidden absolute top-16 left-4 right-4 rounded-2xl border border-zinc-800 bg-[#0a0a0a]/95 backdrop-blur-xl shadow-2xl overflow-hidden"'
);

fs.writeFileSync(navbarPath, content, 'utf8');

console.log('Navbar updated to capsule style');
