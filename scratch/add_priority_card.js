const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/issues/[id]/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Ensure Activity icon is imported
if (!content.includes('Activity')) {
  content = content.replace(
    /import { Loader2, ArrowLeft, Brain, MapPin, CheckCircle2, ShieldAlert, Clock, AlertCircle, Share2, ThumbsUp } from 'lucide-react';/,
    "import { Loader2, ArrowLeft, Brain, MapPin, CheckCircle2, ShieldAlert, Clock, AlertCircle, Share2, ThumbsUp, Activity } from 'lucide-react';"
  );
}

const priorityCardCode = `
          {/* Civic Priority Card */}
          {issue.priority && (
            <Card hoverEffect={false} className="border-border/60 overflow-hidden relative shadow-lg bg-zinc-950/20">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Activity className="h-32 w-32" />
              </div>
              <CardHeader className="pb-4 border-b border-border/40 bg-muted/20">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Civic Priority Score
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 pb-5 relative z-10">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  {/* Score Display */}
                  <div className="flex flex-col items-center justify-center shrink-0">
                    <div className="relative h-28 w-28 flex items-center justify-center">
                      <svg className="absolute inset-0 h-full w-full -rotate-90 transform">
                        <circle cx="56" cy="56" r="50" fill="none" className="stroke-muted" strokeWidth="8" />
                        <circle 
                          cx="56" 
                          cy="56" 
                          r="50" 
                          fill="none" 
                          strokeDasharray="314.159"
                          strokeDashoffset={314.159 - (314.159 * issue.priority.score) / 100}
                          className={\`\${
                            issue.priority.level === 'urgent' ? 'stroke-red-500' : 
                            issue.priority.level === 'high' ? 'stroke-orange-500' :
                            issue.priority.level === 'moderate' ? 'stroke-amber-500' :
                            'stroke-emerald-500'
                          } transition-all duration-1000 ease-out\`} 
                          strokeWidth="8" 
                          strokeLinecap="round" 
                        />
                      </svg>
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-3xl font-black tabular-nums">{issue.priority.score}</span>
                        <span className="text-[10px] font-bold text-muted-foreground">/ 100</span>
                      </div>
                    </div>
                    <span className={\`mt-3 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border \${
                      issue.priority.level === 'urgent' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                      issue.priority.level === 'high' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                      issue.priority.level === 'moderate' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                      'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                    }\`}>
                      {issue.priority.level}
                    </span>
                  </div>

                  {/* Factors */}
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold mb-3">Priority increased because:</h4>
                    <ul className="space-y-2">
                      {issue.priority.factors.map((factor: any, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-blue/50 shrink-0" />
                          <span className="font-medium">{factor.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border/40">
                  <p className="text-[10px] text-muted-foreground/80 leading-relaxed font-medium">
                    The priority score is an AI-assisted decision-support indicator based on reported data and is not an official government priority ranking.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
`;

content = content.replace(
  /{issue.description}\s*<\/p>\s*<\/div>\s*{\/\* AI Analysis Card \*\/}/,
  `{issue.description}\n            </p>\n          </div>\n\n${priorityCardCode}\n\n          {/* AI Analysis Card */}`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Updated Issue detail page with priority card');
