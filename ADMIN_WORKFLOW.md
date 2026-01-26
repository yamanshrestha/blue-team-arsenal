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

#### Step 1: Start the Backend
```bash
npm run dev
# This starts both Vite (frontend) and the Express backend
```

The backend runs on `http://localhost:5000`

#### Step 2: Access Admin Dashboard
Go to `http://localhost:3000/admin` (or whatever port Vite uses)

#### Step 3: Review Submissions
- View all pending, approved, and rejected submissions
- Each submission shows:
  - Tool name and status badge
  - Website URL
  - Category, pricing, description, features
  - Submission date

#### Step 4: Approve or Reject
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
- **GET** `/api/submissions` - Get all submissions (admin only in production)
- **POST** `/api/approve/:id` - Approve a submission
- **POST** `/api/reject/:id` - Reject a submission

## Files

- `submissions.json` - Stores all submissions
- `server.ts` - Express backend server
- `src/pages/Admin.tsx` - Admin dashboard page
- `src/pages/Submit.tsx` - Updated form with API integration

## Development

```bash
# Start both frontend and backend
npm run dev

# Or run separately
npm run dev:frontend  # Just Vite
npm run dev:backend   # Just backend
```

## Production Notes

For production:
- Add authentication to admin endpoints
- Use environment variables for backend URL
- Consider database instead of JSON file
- Add rate limiting to submission endpoint
