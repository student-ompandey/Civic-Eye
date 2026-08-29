import { IssueSeverity } from '@/types';

export const SEVERITY_WEIGHTS: Record<IssueSeverity, number> = {
  critical: 40,
  high: 30,
  medium: 20,
  low: 10,
  resolved: 0,
};

export function getConfirmationPoints(count: number): number {
  if (count <= 0) return 0;
  if (count <= 5) return 5;
  if (count <= 20) return 10;
  if (count <= 50) return 15;
  return 20;
}

export function getTimeUnresolvedPoints(days: number): number {
  if (days <= 7) return 0;
  if (days <= 14) return 5;
  if (days <= 30) return 10;
  return 15;
}

export const MAX_DUPLICATE_POINTS = 15;
export const MAX_DENSITY_POINTS = 15;

/**
 * Calculate distance in km between two lat/lng coordinates using Haversine formula
 */
export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  return R * c;
}
