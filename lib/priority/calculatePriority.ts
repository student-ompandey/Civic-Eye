import { Issue } from '@/types';
import { PriorityFactor, PriorityLevel, PriorityResult } from './types';
import { 
  SEVERITY_WEIGHTS, 
  getConfirmationPoints, 
  getTimeUnresolvedPoints, 
  MAX_DUPLICATE_POINTS, 
  MAX_DENSITY_POINTS,
  calculateDistanceKm
} from './weights';

const DUPLICATE_DISTANCE_KM = 0.1; // 100 meters
const DENSITY_DISTANCE_KM = 1.0; // 1 km

export function calculatePriority(issue: Issue, allActiveIssues: Issue[]): PriorityResult {
  let score = 0;
  const factors: PriorityFactor[] = [];

  // 1. AI Severity
  const severityPoints = SEVERITY_WEIGHTS[issue.severity] || 0;
  if (severityPoints > 0) {
    score += severityPoints;
    factors.push({
      name: `${issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)} AI Severity`,
      points: severityPoints,
    });
  }

  // 2. Community Confirmations
  const confirmationCount = issue.supporters?.length || 0;
  const confirmationPoints = getConfirmationPoints(confirmationCount);
  if (confirmationPoints > 0) {
    score += confirmationPoints;
    factors.push({
      name: `${confirmationCount} Community Confirmations`,
      points: confirmationPoints,
    });
  }

  // 3. Time Unresolved
  if (issue.status !== 'Resolved') {
    const daysUnresolved = Math.floor((Date.now() - new Date(issue.createdAt).getTime()) / (1000 * 60 * 60 * 24));
    const timePoints = getTimeUnresolvedPoints(daysUnresolved);
    if (timePoints > 0) {
      score += timePoints;
      factors.push({
        name: `Unresolved for ${daysUnresolved} days`,
        points: timePoints,
      });
    }
  }

  // 4 & 5. Duplicates & Density
  let duplicateCount = 0;
  let nearbyCount = 0;

  for (const otherIssue of allActiveIssues) {
    if (otherIssue._id === issue._id) continue;
    if (otherIssue.status === 'Resolved') continue;

    const distance = calculateDistanceKm(
      issue.latitude, 
      issue.longitude, 
      otherIssue.latitude, 
      otherIssue.longitude
    );

    // Density check
    if (distance <= DENSITY_DISTANCE_KM) {
      nearbyCount++;
      // Duplicate check (very close + same category)
      if (distance <= DUPLICATE_DISTANCE_KM && otherIssue.category === issue.category) {
        duplicateCount++;
      }
    }
  }

  // Calculate Duplicate Points
  if (duplicateCount > 0) {
    const duplicatePoints = Math.min(duplicateCount * 5, MAX_DUPLICATE_POINTS);
    score += duplicatePoints;
    factors.push({
      name: `Multiple Similar Reports (${duplicateCount})`,
      points: duplicatePoints,
    });
  }

  // Calculate Density Points
  if (nearbyCount > 0) {
    const densityPoints = Math.min(nearbyCount * 2, MAX_DENSITY_POINTS);
    score += densityPoints;
    factors.push({
      name: `High Issue Density (${nearbyCount} nearby)`,
      points: densityPoints,
    });
  }

  // Normalize
  const finalScore = Math.min(Math.max(score, 0), 100);

  // Map Level
  let level: PriorityLevel = 'low';
  if (finalScore >= 75) level = 'urgent';
  else if (finalScore >= 50) level = 'high';
  else if (finalScore >= 25) level = 'moderate';

  return {
    score: finalScore,
    level,
    factors,
  };
}
