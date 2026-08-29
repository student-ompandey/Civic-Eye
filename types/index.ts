export type IssueSeverity = 'critical' | 'high' | 'medium' | 'low' | 'resolved';

export interface Issue {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  category: string;
  severity: IssueSeverity;
  status: 'reported' | 'in-progress' | 'resolved';
  location: string;
  createdAt: string;
  updatedAt: string;
}
