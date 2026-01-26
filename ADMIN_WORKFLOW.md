# Admin Workflow Documentation

## Overview
The admin system manages tool submissions through GitHub Issues, providing an authentication-protected dashboard for reviewing, approving, or rejecting submissions.

## Authentication
- **Access**: Navigate to `/admin` route
- **Default Password**: `admin123`
- **Change Password**: Set `VITE_ADMIN_PASSWORD` environment variable in Vercel
- **Session**: Stored in browser localStorage (persists across page refreshes)

## Submission Flow

### 1. User Submits Tool
- User fills out form at `/submit`
- Form posts to `/api/submit`
- Creates GitHub Issue with `submission` label
- Issue body contains all submission details

### 2. Admin Reviews Submission
- Login to `/admin` with password
- View all submissions (fetched from GitHub Issues API)
- Each submission shows:
  - Tool name and description
  - Website, category, pricing, features
  - Submission date and GitHub issue link
  - Status badge (pending/approved/rejected)

### 3. Approve Submission
- Click "Approve" button on pending submission
- Adds `approved` label to GitHub Issue
- Status changes to "Approved"
- "Copy Tool Entry" button appears
- Copy formatted code to add to `src/data/tools.ts`

### 4. Reject Submission
- Click "Reject" button on pending submission
- Adds `rejected` label to GitHub Issue
- Closes the GitHub Issue
- Status changes to "Rejected"

## API Endpoints

### POST /api/submit
Creates new submission as GitHub Issue
- **Body**: `{name, website, category, pricing, description, features}`
- **Returns**: `{success, message, issueUrl, issueNumber}`
- **Storage**: GitHub Issues with `submission` label

### GET /api/submissions
Fetches all submissions from GitHub Issues
- **Query**: Issues with `submission` label (all states)
- **Returns**: Array of submission objects with `issueNumber`
- **Parses**: Issue body to extract submission fields

### POST /api/approve
Approves a submission by adding label
- **Body**: `{issueNumber}`
- **Action**: POST to GitHub API to add `approved` label
- **Returns**: `{success, message}`

### POST /api/reject
Rejects and closes a submission
- **Body**: `{issueNumber}`
- **Actions**: 
  1. Add `rejected` label
  2. Close GitHub Issue (state: closed)
- **Returns**: `{success, message}`

### GET /api/backup
Downloads all submissions as JSON backup
- **Method**: GET
- **Returns**: JSON file with all submissions
- **Filename**: `submissions-backup-YYYY-MM-DD.json`
- **Access**: Click "Download Backup" button in admin dashboard

## Environment Variables

### Required in Vercel
```env
# GitHub Personal Access Token
# Create at: https://github.com/settings/tokens
# Scopes required: repo (full control)
GH_TOKEN=ghp_xxxxxxxxxxxx

# Optional: Custom admin password
VITE_ADMIN_PASSWORD=your-secure-password-here
```

### Local Development (.env)
```env
VITE_API_URL=http://localhost:5000
VITE_ADMIN_PASSWORD=admin123
```

## Backup System

### Automated Backup
- Click "Download Backup" in admin dashboard
- Fetches all submissions from GitHub Issues
- Generates timestamped JSON file
- Contains:
  - Backup date and total count
  - All submission details
  - Issue numbers and URLs
  - Current status and state

### Manual GitHub Access
All submissions are stored as GitHub Issues:
- Repository: `yamanshrestha/blue-team-apps`
- Label: `submission`
- View directly: https://github.com/yamanshrestha/blue-team-apps/issues?q=label%3Asubmission

## Security

### Password Protection
- Admin dashboard requires password login
- Password stored in environment variable
- Session persists in localStorage
- Logout clears session and reloads page

### GitHub Token
- Required for all API operations
- Stored securely in Vercel environment
- Never exposed to client-side code
- Required scopes: repo access

## Troubleshooting

### "GitHub token not configured"
- Set `GH_TOKEN` in Vercel environment variables
- Redeploy after adding environment variable

### "Failed to fetch submissions"
- Check GitHub token has `repo` scope
- Verify repository name is correct
- Check GitHub API rate limits

### Approve/Reject buttons not working
- Ensure using `issueNumber` not `id` in API calls
- Check browser console for error messages
- Verify GitHub token has write permissions

### Can't login to admin
- Default password is `admin123`
- Set custom password with `VITE_ADMIN_PASSWORD`
- Clear browser localStorage if session corrupted

## Adding Approved Tools

After approving a submission:
1. Click "Copy Tool Entry" button
2. Open `src/data/tools.ts`
3. Paste the copied entry into the appropriate category array
4. Commit and deploy changes

The copied format:
```typescript
{
  id: 'tool-name',
  name: 'Tool Name',
  description: 'Tool description',
  category: 'Category Name',
  pricing: 'free/freemium/paid',
  website: 'https://example.com',
  features: ['Feature 1', 'Feature 2', 'Feature 3'],
},
```

## Architecture

### Storage: GitHub Issues
- **Pros**: 
  - No filesystem required (Vercel-compatible)
  - Built-in versioning and history
  - Issue comments for communication
  - Free for public repos
  - Accessible via web interface
  
- **Cons**:
  - API rate limits (5000/hour authenticated)
  - Requires GitHub token management
  - Network dependency

### Authentication: Environment Variable
- Simple password-based auth
- Frontend localStorage session
- No database required
- Easy to rotate password

### API: Vercel Serverless Functions
- No persistent server required
- Auto-scaling
- CORS configured for cross-origin
- TypeScript with proper types
