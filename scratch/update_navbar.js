const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../components/layout/Navbar.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace header class
content = content.replace(
  /<header className="sticky top-0 z-50 w-full border-b border-border\/40 bg-background\/85 backdrop-blur-md">/g,
  '<header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-[#0a0a0a]/80 backdrop-blur-xl">'
);

// Replace logo Link
content = content.replace(
  /<Link href="\/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-brand-navy dark:text-white">([\s\S]*?)<\/Link>/,
  `<Link href="/" className="flex items-center gap-2 font-black text-xl tracking-tighter text-white">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ff4a1c] text-white shadow-lg shadow-[#ff4a1c]/20">
              <Eye className="h-4 w-4" />
            </div>
            <span>
              civic<span className="text-zinc-500 font-medium">eye</span>
            </span>
          </Link>`
);

// Replace desktop nav links
content = content.replace(
  /<nav className="hidden md:flex items-center gap-6">([\s\S]*?)<\/nav>/,
  `<nav className="hidden md:flex items-center gap-8">
            {!loading && navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-semibold tracking-wide text-zinc-400 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>`
);

// Replace desktop CTA
content = content.replace(
  /<div className="hidden md:flex items-center gap-3">([\s\S]*?)<\/div>/,
  `<div className="hidden md:flex items-center gap-4">
            {!loading && (
              <>
                {user ? (
                  <>
                    <div className="flex items-center gap-2 text-xs text-zinc-400 mr-2 border border-zinc-800 bg-zinc-900/50 px-3 py-1.5 rounded-full font-semibold tracking-wide">
                      <UserIcon className="h-3.5 w-3.5" />
                      <span className="max-w-[120px] truncate">{user.email}</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={handleSignOut} className="font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800">
                      Sign Out
                    </Button>
                    <Link href="/report">
                      <Button size="sm" className="bg-white hover:bg-zinc-200 text-zinc-900 shadow-xl font-bold px-5">
                        <AlertTriangle className="h-4 w-4 mr-1.5" />
                        Report Issue
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <Button variant="ghost" size="sm" className="font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/login">
                      <Button size="sm" className="bg-[#ff4a1c] hover:bg-[#ff4a1c]/90 text-white shadow-lg shadow-[#ff4a1c]/20 font-bold px-6 border-none">
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </>
            )}
          </div>`
);

// Replace mobile menu button colors
content = content.replace(
  /onClick=\{\(\) => setIsOpen\(!isOpen\)\}\s*aria-label="Toggle menu"\s*className="cursor-pointer"/g,
  'onClick={() => setIsOpen(!isOpen)}\n              aria-label="Toggle menu"\n              className="cursor-pointer text-zinc-400 hover:text-white hover:bg-zinc-800"'
);

// Mobile menu overlay
content = content.replace(
  /className="md:hidden border-b border-border\/40 bg-background\/95 backdrop-blur-md"/g,
  'className="md:hidden border-b border-zinc-800 bg-[#0a0a0a]/95 backdrop-blur-md"'
);

// Mobile Nav Links
content = content.replace(
  /className="block py-2 text-base font-medium text-muted-foreground hover:text-foreground transition-colors"/g,
  'className="block py-2 text-base font-semibold tracking-wide text-zinc-400 hover:text-white transition-colors"'
);

// Mobile Sign out
content = content.replace(
  /<Button variant="ghost" onClick=\{handleSignOut\} className="w-full justify-start cursor-pointer">/g,
  '<Button variant="ghost" onClick={handleSignOut} className="w-full justify-start cursor-pointer text-zinc-400 hover:text-white hover:bg-zinc-800">'
);

// Mobile User email block
content = content.replace(
  /<div className="flex items-center gap-3 px-2 py-3 border-b border-border\/40 text-sm text-muted-foreground">/g,
  '<div className="flex items-center gap-3 px-2 py-3 border-b border-zinc-800 text-sm font-semibold tracking-wide text-zinc-400">'
);

// Mobile Report Issue button
content = content.replace(
  /className="w-full bg-brand-blue hover:bg-brand-blue\/90 text-white shadow-sm font-semibold cursor-pointer"/g,
  'className="w-full bg-white hover:bg-zinc-200 text-zinc-900 shadow-xl font-bold cursor-pointer border-none"'
);

// Mobile Login buttons
content = content.replace(
  /<Button variant="ghost" className="w-full justify-start font-semibold cursor-pointer">/g,
  '<Button variant="ghost" className="w-full justify-start font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800 cursor-pointer">'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Navbar updated successfully.');
