import { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const submissionsPath = path.join(process.cwd(), 'submissions.json');

const readSubmissions = () => {
  try {
    const data = fs.readFileSync(submissionsPath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return { submissions: [] };
  }
};

const writeSubmissions = (data: any) => {
  fs.writeFileSync(submissionsPath, JSON.stringify(data, null, 2));
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

  if (req.method === 'POST') {
    const { name, website, category, pricing, description, features } = req.body;

    if (!name || !website || !category || !pricing || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const data = readSubmissions();
      const newSubmission = {
        id: `sub_${uuidv4().split('-')[0]}`,
        name,
        website,
        category,
        pricing,
        description,
        features: features || '',
        status: 'pending',
        submittedAt: new Date().toISOString(),
      };

      data.submissions.push(newSubmission);
      writeSubmissions(data);

      return res.status(201).json({
        success: true,
        message: 'Tool submission received! It will be reviewed shortly.',
        submission: newSubmission,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to process submission' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
