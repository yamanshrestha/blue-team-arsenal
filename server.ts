import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Path to submissions file
const submissionsPath = path.join(process.cwd(), 'submissions.json');

// Helper to read submissions
const readSubmissions = () => {
  try {
    const data = fs.readFileSync(submissionsPath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return { submissions: [] };
  }
};

// Helper to write submissions
const writeSubmissions = (data: any) => {
  fs.writeFileSync(submissionsPath, JSON.stringify(data, null, 2));
};

// Submit a new tool
app.post('/api/submit', (req: Request, res: Response) => {
  try {
    const { name, website, category, pricing, description, features } = req.body;

    // Validation
    if (!name || !website || !category || !pricing || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

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

    res.status(201).json({
      success: true,
      message: 'Tool submission received! It will be reviewed shortly.',
      submission: newSubmission,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to process submission' });
  }
});

// Get all submissions (admin endpoint)
app.get('/api/submissions', (req: Request, res: Response) => {
  try {
    const data = readSubmissions();
    res.json(data.submissions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

// Approve and add a submission to tools (supports path or query id)
app.post(['/api/approve/:id', '/api/approve'], (req: Request, res: Response) => {
  try {
    const id = (req.params as any).id || (req.query as any).id;
    const data = readSubmissions();

    const submission = data.submissions.find((s: any) => s.id === id);
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    // Mark as approved
    submission.status = 'approved';
    writeSubmissions(data);

    res.json({
      success: true,
      message: 'Submission approved! Add it to tools.ts to display it.',
      submission,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to approve submission' });
  }
});

// Reject a submission (supports path or query id)
app.post(['/api/reject/:id', '/api/reject'], (req: Request, res: Response) => {
  try {
    const id = (req.params as any).id || (req.query as any).id;
    const data = readSubmissions();

    const submission = data.submissions.find((s: any) => s.id === id);
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    // Mark as rejected
    submission.status = 'rejected';
    writeSubmissions(data);

    res.json({
      success: true,
      message: 'Submission rejected.',
      submission,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reject submission' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📝 Submissions API: POST http://localhost:${PORT}/api/submit`);
  console.log(`📊 Admin endpoint: GET http://localhost:${PORT}/api/submissions`);
});
