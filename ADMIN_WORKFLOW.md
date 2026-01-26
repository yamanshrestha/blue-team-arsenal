# Tool Submission & Admin Workflow

## How It Works

### For Users (Submitting Tools)
1. Go to `/submit` page
2. Fill in the tool details:
   - Tool Name
   - Website URL
   - Category
   - Pricing (Free/Freemium/Paid)
   - Description
   - Key Features (optional)
3. Click "Submit Tool"
4. The submission is sent to the backend and stored in `submissions.json`

### For Admins (Approving Tools)

#### Local Development

##### Step 1: Start Both Frontend & Backend
```bash
npm run dev
# This starts both Vite (frontend) and the Express backend
```

The frontend runs on `http://localhost:5173` (or 3000)
The backend runs on `http://localhost:5000`

##### Step 2: Access Admin Dashboard
Go to `http://localhost:5173/admin` (or whatever port Vite uses)

#### Production on Vercel

The backend runs as serverless functions in the `api/` folder. No separate backend needed!

##### Step 1: Deploy to Vercel
```bash
# Push to GitHub
git push

# Vercel automatically deploys on push
# Frontend: https://your-app.vercel.app
# API endpoints: https://your-app.vercel.app/api/...
```

##### Step 2: Set Environment Variable
In Vercel dashboard:
1. Go to project Settings → Environment Variables
2. Add: `VITE_API_URL` = `https://your-app.vercel.app`
3. Redeploy

##### Step 3: Access Admin Dashboard
Go to `https://your-app.vercel.app/admin`

#### Review Submissions
- View all pending, approved, and rejected submissions
- Each submission shows:
  - Tool name and status badge
  - Website URL
  - Category, pricing, description, features
  - Submission date

#### Approve or Reject
- **Approve**: Click the "Approve" button to mark it for addition
- **Reject**: Click the "Reject" button if it doesn't fit the repository

#### Step 5: Add to Tools List
Once approved:
1. Click the "Copy Tool Entry" button to copy the formatted JSON
2. Open `src/data/tools.ts`
3. Paste the entry in the appropriate category section
4. Save and commit

Example entry:
```typescript
{
  id: 'my-tool',
  name: 'My Tool',
  description: 'Tool description',
  category: 'siem',
  pricing: 'free',
  website: 'https://mytool.com',
  features: ['Feature 1', 'Feature 2'],
}
```

## API Endpoints

- **POST** `/api/submit` - Submit a new tool
- **GET** `/api/submissions` - Get all submissions
- **POST** `/api/approve/:id` - Approve a submission
- **POST** `/api/reject/:id` - Reject a submission

## File Structure

- `submissions.json` - Stores all submissions
- `api/submit.ts` - Handle new submissions
- `api/submissions.ts` - Fetch all submissions
- `api/approve.ts` - Approve submissions
- `api/reject.ts` - Reject submissions
- `src/pages/Admin.tsx` - Admin dashboard page
- `src/pages/Submit.tsx` - Updated form with API integration

## Development

```bash
# Start both frontend and backend
npm run dev

# Or run separately
npm run dev:frontend  # Just Vite
npm run dev:backend   # Just backend (using server.ts)
```

## Local vs Production

### Local Development
- Frontend: http://localhost:5173
- Backend: http://localhost:5000 (Express server via `server.ts`)
- Uses `VITE_API_URL` from `.env.local`

### Production (Vercel)
- Frontend & Backend: https://your-app.vercel.app
- Backend: Serverless functions in `api/` folder
- Uses `VITE_API_URL` from Vercel environment variables

## Notes

- `server.ts` is used for local development only
- `api/` folder contains serverless functions for Vercel production
- `submissions.json` is committed to repo (file storage works on Vercel)
- For production authentication, add middleware to `api/` functions

