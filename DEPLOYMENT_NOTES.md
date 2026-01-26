# Deployment Notes - Admin System Update

## Changes Implemented

### 1. Admin Authentication ✅
- Added password-based login to `/admin` route
- Default password: `admin123`
- Session stored in browser localStorage
- Logout button to clear session
- Password configurable via `VITE_ADMIN_PASSWORD` environment variable

### 2. Fixed Approve/Reject Functionality ✅
- **Issue**: Buttons were not working because endpoints used filesystem (read-only on Vercel)
- **Solution**: Rewrote all endpoints to use GitHub Issues API
- `api/approve.ts`: Adds 'approved' label to issue
- `api/reject.ts`: Adds 'rejected' label and closes issue
- `api/submissions.ts`: Fetches issues with 'submission' label
- Updated `Admin.tsx` to send `issueNumber` in request body

### 3. Backup System ✅
- New endpoint: `GET /api/backup`
- Downloads all submissions as JSON file
- Filename: `submissions-backup-YYYY-MM-DD.json`
- Includes backup date, total count, and all submission data
- "Download Backup" button in admin dashboard

## Environment Variables Required

### Vercel Dashboard
Make sure these are set in Vercel → Project Settings → Environment Variables:

```env
# Required for GitHub Issues storage
GH_TOKEN=<your-github-personal-access-token>

# Optional: Custom admin password (default is "admin123")
VITE_ADMIN_PASSWORD=<your-secure-password>
```

## Testing Checklist

After deployment completes, test:

1. **Submit Tool**
   - Go to https://tools.yamanshrestha.com.np/submit
   - Submit a test tool
   - Verify GitHub issue is created
   - Check issue has 'submission' label

2. **Admin Login**
   - Go to https://tools.yamanshrestha.com.np/admin
   - Login with password (default: `admin123`)
   - Verify submissions are loaded
   - Check test submission appears

3. **Approve Submission**
   - Click "Approve" on a pending submission
   - Verify status changes to "Approved"
   - Check GitHub issue has 'approved' label
   - Click "Copy Tool Entry"
   - Verify formatted code is copied

4. **Reject Submission**
   - Click "Reject" on a pending submission
   - Verify status changes to "Rejected"
   - Check GitHub issue is closed
   - Check issue has 'rejected' label

5. **Download Backup**
   - Click "Download Backup" button
   - Verify JSON file downloads
   - Check file contains all submissions with correct data

6. **Logout**
   - Click "Logout" button
   - Verify redirected to login screen
   - Try accessing /admin again
   - Should require login again

## API Endpoints Summary

| Endpoint | Method | Purpose | Auth Required |
|----------|--------|---------|---------------|
| `/api/submit` | POST | Create new submission | No |
| `/api/submissions` | GET | Fetch all submissions | No (but GH_TOKEN server-side) |
| `/api/approve` | POST | Approve submission | No (but GH_TOKEN server-side) |
| `/api/reject` | POST | Reject submission | No (but GH_TOKEN server-side) |
| `/api/backup` | GET | Download backup JSON | No (but GH_TOKEN server-side) |

Note: Admin authentication is frontend-only (localStorage). For production, consider adding server-side auth middleware.

## GitHub Issues Workflow

### Submission States
- **Pending**: Issue is open, no labels (except 'submission')
- **Approved**: Issue has 'approved' label, still open
- **Rejected**: Issue has 'rejected' label, issue is closed

### Manual Management
You can also manage submissions directly on GitHub:
- View all: https://github.com/yamanshrestha/blue-team-apps/issues?q=label%3Asubmission
- Add labels manually if needed
- Close/reopen issues
- Add comments for communication with submitters

## Files Changed

### New Files
- `api/backup.ts` - Backup endpoint
- `.env.example` - Environment variables documentation
- `api/approve-old.ts` - Backup of old filesystem-based approve

### Updated Files
- `api/approve.ts` - Uses GitHub Issues labels
- `api/reject.ts` - Uses GitHub Issues labels + closes issue
- `api/submissions.ts` - Fetches from GitHub Issues API
- `src/pages/Admin.tsx` - Added auth, updated API calls, backup button
- `ADMIN_WORKFLOW.md` - Complete documentation rewrite

## Security Considerations

### Current Setup
- ✅ GH_TOKEN stored securely in Vercel
- ✅ Admin password configurable via env var
- ✅ Frontend session in localStorage
- ⚠️ No server-side admin auth (all API endpoints are public)

### Recommendations for Production
1. Add server-side authentication to API endpoints
2. Use proper OAuth or JWT tokens
3. Rate limit API endpoints
4. Add CAPTCHA to submit form
5. Change default admin password immediately

## Next Steps

1. **Set Strong Password**: Change `VITE_ADMIN_PASSWORD` in Vercel to something secure
2. **Test Everything**: Follow the testing checklist above
3. **Monitor GitHub Issues**: Check the repository issues regularly
4. **Periodic Backups**: Download backups regularly as safety measure
5. **Consider Rate Limiting**: If spam becomes an issue, add rate limiting

## Support

If issues occur:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify GH_TOKEN has correct permissions
4. Check GitHub API rate limits
5. Review [ADMIN_WORKFLOW.md](ADMIN_WORKFLOW.md) for troubleshooting

## Deployment Status

- ✅ Code committed to main branch
- ✅ Pushed to GitHub
- ⏳ Vercel deployment in progress
- ⏳ Testing pending

Monitor deployment: https://vercel.com/dashboard
