import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { issueNumber } = req.body || {};
    
    if (!issueNumber) {
      return res.status(400).json({ error: 'Missing issue number' });
    }

    const GH_TOKEN = process.env.GH_TOKEN;
    if (!GH_TOKEN) {
      return res.status(500).json({ error: 'Server not configured' });
    }

    try {
      const resp = await fetch(
        `https://api.github.com/repos/yamanshrestha/blue-team-apps/issues/${issueNumber}/labels`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${GH_TOKEN}`,
            'Accept': 'application/vnd.github+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ labels: ['rejected'] }),
        }
      );

      if (!resp.ok) {
        return res.status(500).json({ error: 'Failed to reject' });
      }

      // Close the issue
      await fetch(
        `https://api.github.com/repos/yamanshrestha/blue-team-apps/issues/${issueNumber}`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${GH_TOKEN}`,
            'Accept': 'application/vnd.github+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ state: 'closed' }),
        }
      );

      return res.status(200).json({ success: true, message: 'Rejected and closed!' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to reject submission' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
