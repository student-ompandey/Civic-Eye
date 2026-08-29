import { getDb } from '@/lib/mongodb';
import { calculatePriority } from '@/lib/priority/calculatePriority';
import { ObjectId } from 'mongodb';

export async function getTopPriorityIssues() {
  try {
    const db = await getDb();
    const issuesCollection = db.collection('issues');
    
    // Fetch all active issues
    const activeIssuesRaw = await issuesCollection.find({ status: { $ne: 'Resolved' } }).toArray();
    
    if (!activeIssuesRaw || activeIssuesRaw.length === 0) {
      return { message: 'No active issues found.' };
    }

    const activeIssues = activeIssuesRaw.map(i => ({
      ...i,
      _id: i._id.toString(),
      id: i._id.toString(),
      supporters: i.supporters || []
    })) as any[];

    // Calculate priority for all
    const issuesWithPriority = activeIssues.map(issue => {
      const priority = calculatePriority(issue, activeIssues);
      return {
        id: issue.id,
        title: issue.title,
        category: issue.category,
        priority
      };
    });

    // Sort by score descending
    issuesWithPriority.sort((a, b) => b.priority.score - a.priority.score);

    // Return top 5
    return { topIssues: issuesWithPriority.slice(0, 5) };
  } catch (error: any) {
    console.error('Error in getTopPriorityIssues:', error);
    return { error: 'Failed to retrieve top priority issues.' };
  }
}

export async function getIssuePriority({ issueId }: { issueId: string }) {
  try {
    if (!ObjectId.isValid(issueId)) {
      return { error: 'Invalid issue ID format.' };
    }

    const db = await getDb();
    const issuesCollection = db.collection('issues');

    const issueRaw = await issuesCollection.findOne({ _id: new ObjectId(issueId) });
    if (!issueRaw) {
      return { error: 'Issue not found.' };
    }

    const activeIssuesRaw = await issuesCollection.find({ status: { $ne: 'Resolved' } }).toArray();
    
    const activeIssues = activeIssuesRaw.map(i => ({
      ...i,
      _id: i._id.toString(),
      id: i._id.toString(),
      supporters: i.supporters || []
    })) as any[];

    const issue = {
      ...issueRaw,
      _id: issueRaw._id.toString(),
      id: issueRaw._id.toString(),
      supporters: issueRaw.supporters || []
    } as any;

    const priority = calculatePriority(issue, activeIssues);

    return {
      issue: {
        id: issue.id,
        title: issue.title,
        category: issue.category,
      },
      priority
    };
  } catch (error: any) {
    console.error('Error in getIssuePriority:', error);
    return { error: 'Failed to retrieve issue priority.' };
  }
}
