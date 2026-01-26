import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const adminSecret = process.env.ADMIN_SECRET;
  const allowedUsers = (process.env.ADMIN_ALLOWED_USERS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const providedSecret = (req.headers['x-admin-secret'] || req.headers['x-admin-token']) as string | undefined;
  const providedUser = (req.headers['x-admin-user'] as string | undefined)?.trim();

  if (!adminSecret) {
    return res.status(500).json({ error: 'Server not configured' });
  }

  if (!providedSecret || providedSecret !== adminSecret) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (allowedUsers.length > 0) {
    if (!providedUser || !allowedUsers.includes(providedUser)) {
      return res.status(401).json({ error: 'Unauthorized user' });
    }
  }

  const GH_TOKEN = process.env.GH_TOKEN;
  if (!GH_TOKEN) {
    return res.status(500).json({ error: 'GitHub token not configured' });
  }

  try {
    // Fetch all issues with 'submission' label
    const response = await fetch(
      'https://api.github.com/repos/yamanshrestha/blue-team-apps/issues?labels=submission&state=all&per_page=100',
      {
        headers: {
          Authorization: `Bearer ${GH_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch submissions');
    }

    const issues = await response.json();

    // Parse submissions from issue bodies
    const submissions = issues.map((issue: any) => {
      const body = issue.body || '';
      const lines = body.split('\n');
      
      const parseField = (label: string): string => {
        const line = lines.find(l => l.startsWith(`**${label}:**`));
        return line ? line.replace(`**${label}:**`, '').trim() : '';
      };

      // Determine status from labels
      const labels = issue.labels.map((l: any) => l.name);
      let status = 'pending';
      if (labels.includes('approved')) status = 'approved';
      else if (labels.includes('rejected')) status = 'rejected';

      return {
        issueNumber: issue.number,
        issueUrl: issue.html_url,
        id: parseField('ID'),
        name: parseField('Name'),
        website: parseField('Website'),
        category: parseField('Category'),
        pricing: parseField('Pricing'),
        description: parseField('Description'),
        features: parseField('Features'),
        status,
        submittedAt: issue.created_at,
        state: issue.state,
      };
    });

    // Return as downloadable JSON
    const filename = `submissions-backup-${new Date().toISOString().split('T')[0]}.json`;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    
    return res.status(200).json({
      backupDate: new Date().toISOString(),
      totalSubmissions: submissions.length,
      submissions,
    });
  } catch (error) {
    console.error('Backup error:', error);
    return res.status(500).json({ error: 'Failed to generate backup' });
  }
}
