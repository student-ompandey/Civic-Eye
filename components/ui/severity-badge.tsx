import React from 'react';
import { cn } from '@/lib/utils';
import { IssueSeverity } from '@/types';

interface SeverityBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  severity: IssueSeverity;
  showDot?: boolean;
}

export function SeverityBadge({
  severity,
  showDot = true,
  className,
  ...props
}: SeverityBadgeProps) {
  const config = {
    critical: {
      bg: 'bg-severity-critical/10 text-severity-critical border-severity-critical/25',
      dot: 'bg-severity-critical animate-pulse',
      label: 'Critical',
    },
    high: {
      bg: 'bg-severity-high/10 text-severity-high border-severity-high/25',
      dot: 'bg-severity-high',
      label: 'High',
    },
    medium: {
      bg: 'bg-severity-medium/10 text-severity-medium border-severity-medium/25',
      dot: 'bg-severity-medium',
      label: 'Medium',
    },
    low: {
      bg: 'bg-severity-low/10 text-severity-low border-severity-low/25',
      dot: 'bg-severity-low',
      label: 'Low',
    },
    resolved: {
      bg: 'bg-severity-resolved/10 text-severity-resolved border-severity-resolved/25',
      dot: 'bg-severity-resolved',
      label: 'Resolved',
    },
  };

  const currentConfig = config[severity] || config.low;

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-all duration-200',
        currentConfig.bg,
        className
      )}
      {...props}
    >
      {showDot && (
        <span className={cn('h-1.5 w-1.5 rounded-full shrink-0', currentConfig.dot)} />
      )}
      {currentConfig.label}
    </div>
  );
}
