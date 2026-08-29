export type IssueSeverity = 'critical' | 'high' | 'medium' | 'low' | 'resolved';

export interface Issue {
  _id?: string;
  userId: string;
  title: string;
  description: string;
  category: string;
  severity: IssueSeverity;
  status: 'Open' | 'In Progress' | 'Resolved';
  latitude: number;
  longitude: number;
  address: string;
  landmark: string;
  city: string;
  state: string;
  aiConfidence: number;
  aiRisk: string;
  department: string;
  supporters?: string[];
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
