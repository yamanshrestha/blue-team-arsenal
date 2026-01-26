import { VercelRequest, VercelResponse } from '@vercel/node';

type UserConfig = {
  username: string;
  password: string;
};

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

  // Prefer per-user config when provided
  const usersJson = process.env.ADMIN_USERS_JSON;
  if (usersJson) {
    try {
      const users: UserConfig[] = JSON.parse(usersJson);
      const match = users.find((u) => u.username === username && u.password === password);

      if (!match) {
        return res.status(401).json({ error: 'Either username or password is wrong' });
      }

      return res.status(200).json({ success: true, secret: password, username });
    } catch (err) {
      console.error('Failed to parse ADMIN_USERS_JSON', err);
      return res.status(500).json({ error: 'Server configuration error' });
    }
  }

  // Fallback to shared secret + allowed users list
  const adminSecret = process.env.ADMIN_SECRET;
  const allowedUsers = (process.env.ADMIN_ALLOWED_USERS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  if (!adminSecret) {
    return res.status(500).json({ error: 'Server not configured' });
  }

  const isPasswordValid = password === adminSecret;
  const isUsernameValid = allowedUsers.length === 0 || allowedUsers.includes(username);

  if (!isPasswordValid || !isUsernameValid) {
    return res.status(401).json({ error: 'Either username or password is wrong' });
  }

  return res.status(200).json({ success: true, secret: adminSecret, username });
}
