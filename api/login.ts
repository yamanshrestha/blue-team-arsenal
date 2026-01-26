import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  // Server-side credential validation
  const adminSecret = process.env.ADMIN_SECRET;
  const allowedUsers = (process.env.ADMIN_ALLOWED_USERS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  if (!adminSecret) {
    return res.status(500).json({ error: 'Server not configured' });
  }

  // Validate password
  const isPasswordValid = password === adminSecret;

  // Validate username (if whitelist is set)
  const isUsernameValid = allowedUsers.length === 0 || allowedUsers.includes(username);

  if (!isPasswordValid || !isUsernameValid) {
    return res.status(401).json({ error: 'Either username or password is wrong' });
  }

  // Return success with the secret to use for API calls
  return res.status(200).json({
    success: true,
    secret: adminSecret,
    username,
  });
}
