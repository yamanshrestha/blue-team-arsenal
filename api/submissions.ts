import { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';

const submissionsPath = path.join(process.cwd(), 'submissions.json');

const readSubmissions = () => {
  try {
    const data = fs.readFileSync(submissionsPath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return { submissions: [] };
  }
};

export default function handler(req: VercelRequest, res: VercelResponse) {
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

  if (req.method === 'GET') {
    try {
      const data = readSubmissions();
      return res.status(200).json(data.submissions);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch submissions' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
