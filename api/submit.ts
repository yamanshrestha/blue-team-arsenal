import { VercelRequest, VercelResponse } from '@vercel/node';
import { v4 as uuidv4 } from 'uuid';

// NOTE: Vercel serverless functions run on a read-only filesystem.
// Persisting submissions via local files is not supported.
// Instead, we create a GitHub issue in this repository to track submissions.

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    const { name, website, category, pricing, description, features } = req.body || {};

    if (!name || !website || !category || !pricing || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create a GitHub issue to store the submission
    const GH_TOKEN = process.env.GH_TOKEN;
    const owner = 'yamanshrestha';
    const repo = 'blue-team-apps';

    if (!GH_TOKEN) {
      return res.status(500).json({
        error: 'Server is not configured to store submissions. Please set GH_TOKEN in Vercel env.'
      });
    }

    const submissionId = `sub_${uuidv4().split('-')[0]}`;
    const title = `Tool Submission: ${name}`;
    const labels = ['submission'];
    const body = [
      `ID: ${submissionId}`,
      `Name: ${name}`,
      `Website: ${website}`,
      `Category: ${category}`,
      `Pricing: ${pricing}`,
      `Description: ${description}`,
      `Features: ${features || ''}`,
      `Submitted At: ${new Date().toISOString()}`,
    ].join('\n');

    try {
      const resp = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GH_TOKEN}`,
          'Accept': 'application/vnd.github+json',
          'Content-Type': 'application/json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
        body: JSON.stringify({ title, body, labels }),
      });

      if (!resp.ok) {
        const errorText = await resp.text();
        console.error('GitHub issue creation failed:', errorText);
        return res.status(500).json({ error: 'Failed to store submission (GitHub issue failed).' });
      }

      const issue = await resp.json();

      return res.status(201).json({
        success: true,
        message: 'Tool submission received! It will be reviewed shortly.',
        issueUrl: issue.html_url,
        submission: {
          id: submissionId,
          name,
          website,
          category,
          pricing,
          description,
          features: features || '',
          status: 'pending',
          submittedAt: new Date().toISOString(),
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to process submission' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
