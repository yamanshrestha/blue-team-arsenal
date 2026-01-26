# Blue Team Arsenal

A curated collection of cybersecurity tools for blue team operations, incident response, and defensive security.

🌐 **Live:** [tools.yamanshrestha.com.np](https://tools.yamanshrestha.com.np)

## Features

- 🔍 Browse and search cybersecurity tools by category
- 📝 Submit new tools for community review
- 👥 Multi-admin approval system with authentication
- 💾 GitHub Issues-based storage (no database needed)
- 🚀 Deployed on Vercel (serverless)

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS, shadcn-ui
- **Backend:** Vercel serverless functions (Node.js)
- **Storage:** GitHub Issues API
- **Hosting:** Vercel

## Setup & Development

### Clone & Install

```bash
# Clone repository
git clone https://github.com/yamanshrestha/blue-team-apps.git
cd blue-team-apps

# Install dependencies
npm install

# Start development server
npm run dev
```

The app runs on `http://localhost:5173` with hot reload enabled.

### Environment Variables

Create a `.env.local` file (or set in Vercel):

```env
# GitHub token for submissions storage (required)
GH_TOKEN=ghp_xxxxxxxxxxxx

# Server-side admin credentials (keep private, no VITE_ prefix)
ADMIN_SECRET=your-admin-secret
ADMIN_ALLOWED_USERS=user1,user2

# Per-user credentials (optional, overrides ADMIN_SECRET)
ADMIN_USERS_JSON=[{"username":"alice","password":"pass1"}]

# Optional: API URL (defaults to current origin)
VITE_API_URL=http://localhost:5000
```

### Local Development with Backend

```bash
npm run dev
# Runs both Vite (frontend) and Express server (backend)
```

## Project Structure

```
src/
├── components/        # React components
│   └── ui/           # shadcn-ui components
├── pages/            # App pages (Home, Tools, Submit, Admin)
├── data/             # Tool and category data
├── lib/              # Utilities
└── hooks/            # Custom React hooks

api/
├── submit.ts         # Accept tool submissions
├── approve.ts        # Approve submissions
├── reject.ts         # Reject submissions
├── submissions.ts    # List all submissions
├── backup.ts         # Download backup JSON
└── login.ts          # Server-side admin auth
```

## Admin Workflow

### For Admins

1. **Access Dashboard:** Go to `/admin`
2. **Login:** Enter username and password (validated server-side)
3. **Review:** View pending submissions
4. **Actions:**
   - ✅ **Approve** → Adds `approved` label to GitHub Issue, enables copy-to-clipboard
   - ❌ **Reject** → Adds `rejected` label and closes issue
   - 📥 **Download Backup** → Export all submissions as JSON

### For Users

1. **Submit:** Go to `/submit` and fill out tool details
2. **Stored:** Submission creates a GitHub Issue with `submission` label
3. **Track:** Check GitHub Issues for status

## Edit Tools & Categories

**Add/Edit Tools:** [src/data/tools.ts](src/data/tools.ts)
- Update entries directly
- Commit and deploy

**Categories:** [src/data/categories.ts](src/data/categories.ts)
- Modify tool categories

## API Endpoints

| Endpoint | Method | Purpose | Auth |
|----------|--------|---------|------|
| `/api/submit` | POST | Create submission | None |
| `/api/submissions` | GET | List all | None |
| `/api/login` | POST | Authenticate admin | None (server-side) |
| `/api/approve` | POST | Approve submission | ADMIN_SECRET header |
| `/api/reject` | POST | Reject submission | ADMIN_SECRET header |
| `/api/backup` | GET | Download backup | ADMIN_SECRET header |

## Security

- ✅ No credentials exposed in client bundle (server-side validation)
- ✅ Per-user authentication support
- ✅ Header-based API auth (`x-admin-secret`, `x-admin-user`)
- ✅ GitHub token stored securely in Vercel env
- ✅ Public repo, but no secrets in code

## Deployment

Deployed on **Vercel** with automatic redeployment on git push.

### Deploy Steps

1. Push to GitHub
2. Vercel automatically builds and deploys
3. Set environment variables in Vercel dashboard
4. Done!

## Contributing

1. Browse tools at [tools.yamanshrestha.com.np/tools](https://tools.yamanshrestha.com.np/tools)
2. Submit new tools via [/submit](https://tools.yamanshrestha.com.np/submit)
3. Admins review and approve
4. Approved tools appear in the main directory

## License

MIT

---

**Maintainer:** [Yaman Shrestha](https://github.com/yamanshrestha)
