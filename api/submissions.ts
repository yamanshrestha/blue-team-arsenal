import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    const GH_TOKEN = process.env.GH_TOKEN;
    if (!GH_TOKEN) {
      return res.status(500).json({ error: 'Server not configured' });
    }

    try {
      // Fetch all issues with 'submission' label
      const resp = await fetch(
        `https://api.github.com/repos/yamanshrestha/blue-team-apps/issues?labels=submission&state=all&per_page=100`,
        {
          headers: {
            'Authorization': `Bearer ${GH_TOKEN}`,
            'Accept': 'application/vnd.github+json',
          },
        }
      );

      if (!resp.ok) {
        return res.status(500).json({ error: 'Failed to fetch submissions' });
      }

      const issues = await resp.json();
      
      // Parse issues into submission format
      const submissions = issues.map((issue: any) => {
        const lines = issue.body?.split('\n') || [];
        const extract = (key: string) => {
          const line = lines.find((l: string) => l.startsWith(`${key}:`));
          return line ? line.replace(`${key}:`, '').trim() : '';
        };

        const hasLabel = (label: string) => issue.labels.some((l: any) => l.name === label);
        
        return {
          id: extract('ID'),
          issueNumber: issue.number,
          name: extract('Name'),
          website: extract('Website'),
          category: extract('Category'),
          pricing: extract('Pricing'),
          description: extract('Description'),
          features: extract('Features'),
          status: hasLabel('approved') ? 'approved' : hasLabel('rejected') ? 'rejected' : 'pending',
          submittedAt: extract('Submitted At') || issue.created_at,
          issueUrl: issue.html_url,
        };
      });

      return res.status(200).json(submissions);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to fetch submissions' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
