const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/my-reports/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const replacement = `
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {issues.map(issue => (
            <Link href={\`/issues/\${issue._id}\`} key={issue._id} className="block group relative z-10">
              <div className="absolute inset-0 bg-gradient-to-b from-[#ff4a1c]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl -z-10" />
              <Card className="overflow-hidden p-0 border-zinc-800 bg-[#121212] shadow-xl group-hover:border-[#ff4a1c]/50 transition-all duration-300 flex flex-col rounded-2xl h-full">
                
                {/* Image Section */}
                <div className="w-full aspect-video bg-zinc-900 relative border-b border-zinc-800 shrink-0 overflow-hidden">
                  {issue.imageUrl ? (
                    <Image 
                      src={issue.imageUrl} 
                      alt={issue.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-zinc-950/50">
                      <FileText className="h-10 w-10 text-zinc-800" />
                    </div>
                  )}
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 left-3 bg-[#0d0d0d]/90 backdrop-blur-md px-2.5 py-1.5 rounded-lg shadow-2xl border border-zinc-800 flex items-center gap-2 z-10">
                    <StatusIcon status={issue.status} />
                    <span className="text-[10px] font-black tracking-widest uppercase text-white">{issue.status}</span>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="w-full p-5 flex flex-col flex-1 bg-gradient-to-br from-[#121212] to-[#0d0d0d]">
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2 gap-4">
                      <h3 className="font-black text-xl tracking-tight text-white line-clamp-1 group-hover:text-[#ff4a1c] transition-colors">{issue.title}</h3>
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider shrink-0 bg-zinc-900 px-2 py-1 rounded-md border border-zinc-800/50">
                        {new Date(issue.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 items-center mb-4">
                      <SeverityBadge severity={issue.severity} />
                      <span className="text-[10px] text-zinc-300 font-semibold bg-zinc-900 px-2 py-1 rounded-md border border-zinc-800">
                        {issue.category}
                      </span>
                    </div>

                    <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed font-medium">
                      {issue.description || 'No description provided.'}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-5 pt-4 border-t border-zinc-800/50">
                    <div className="h-6 w-6 rounded-full bg-[#ff4a1c]/10 flex items-center justify-center shrink-0">
                      <MapPin className="h-3 w-3 text-[#ff4a1c]" />
                    </div>
                    <span className="text-xs font-semibold text-zinc-500 line-clamp-1 group-hover:text-zinc-300 transition-colors">
                      {issue.address}, {issue.city}
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
`;

// Replace from `<div className="grid...` to the end of the issues logic.
const startIdx = content.indexOf('<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">');
const endIdx = content.indexOf('</PageContainer></div>', startIdx);

if (startIdx !== -1 && endIdx !== -1) {
  content = content.substring(0, startIdx) + replacement + '      )}' + '\n    ' + content.substring(endIdx);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated my-reports page layout to vertical cards');
} else {
  console.log('Could not find the grid section');
}
