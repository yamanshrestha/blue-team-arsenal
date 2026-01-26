import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, XCircle, Copy, Lock } from 'lucide-react';

interface Submission {
  id: string;
  issueNumber: number;
  name: string;
  website: string;
  category: string;
  pricing: string;
  description: string;
  features: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  issueUrl: string;
}

const Admin = () => {
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [adminSecret, setAdminSecret] = useState('');
  const [adminUser, setAdminUser] = useState('');

  useEffect(() => {
    const savedAuth = localStorage.getItem('admin_auth');
    const savedSecret = localStorage.getItem('admin_secret') || '';
    const savedUser = localStorage.getItem('admin_user') || '';

    if (savedAuth === 'true' && savedSecret) {
      setAdminSecret(savedSecret);
      setAdminUser(savedUser);
      setIsAuthenticated(true);
      fetchSubmissions();
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !adminUser) {
      toast({
        title: 'Access Denied',
        description: 'Username and password required',
        variant: 'destructive',
      });
      return;
    }

    try {
      const apiUrl = (import.meta as any).env?.VITE_API_URL || window.location.origin;
      const response = await fetch(`${apiUrl}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: adminUser, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        toast({
          title: 'Access Denied',
          description: error.error || 'Either username or password is wrong',
          variant: 'destructive',
        });
        return;
      }

      const data = await response.json();
      
      localStorage.setItem('admin_auth', 'true');
      localStorage.setItem('admin_secret', data.secret);
      localStorage.setItem('admin_user', data.username);
      setAdminSecret(data.secret);
      setAdminUser(data.username);
      setIsAuthenticated(true);
      fetchSubmissions();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to authenticate',
        variant: 'destructive',
      });
    }
  };

  const fetchSubmissions = async () => {
    try {
      const apiUrl = (import.meta as any).env?.VITE_API_URL || window.location.origin;
      const response = await fetch(`${apiUrl}/api/submissions`);
      const data = await response.json();
      setSubmissions(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch submissions',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (issueNumber: number) => {
    if (!adminSecret) {
      toast({ title: 'Access Denied', description: 'Password required', variant: 'destructive' });
      return;
    }

    try {
      const apiUrl = (import.meta as any).env?.VITE_API_URL || window.location.origin;
      const response = await fetch(`${apiUrl}/api/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-secret': adminSecret, 'x-admin-user': adminUser },
        body: JSON.stringify({ issueNumber }),
      });

      if (response.ok) {
        toast({
          title: 'Approved!',
          description: 'Submission approved. Copy the tool entry below.',
        });
        fetchSubmissions();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to approve',
        variant: 'destructive',
      });
    }
  };

  const handleReject = async (issueNumber: number) => {
    if (!adminSecret) {
      toast({ title: 'Access Denied', description: 'Password required', variant: 'destructive' });
      return;
    }

    try {
      const apiUrl = (import.meta as any).env?.VITE_API_URL || window.location.origin;
      const response = await fetch(`${apiUrl}/api/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-secret': adminSecret, 'x-admin-user': adminUser },
        body: JSON.stringify({ issueNumber }),
      });

      if (response.ok) {
        toast({
          title: 'Rejected',
          description: 'Submission rejected and closed',
        });
        fetchSubmissions();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to reject',
        variant: 'destructive',
      });
    }
  };

  const copyToClipboard = (submission: Submission) => {
    const toolEntry = `{
  id: '${submission.name.toLowerCase().replace(/\s+/g, '-')}',
  name: '${submission.name}',
  description: '${submission.description}',
  category: '${submission.category}',
  pricing: '${submission.pricing}',
  website: '${submission.website}',
  features: [${submission.features
    .split(',')
    .map(f => `'${f.trim()}'`)
    .join(', ')}],
},`;

    navigator.clipboard.writeText(toolEntry);
    toast({
      title: 'Copied!',
      description: 'Tool entry copied to clipboard',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="container py-8 max-w-md mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <Lock className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="text-center">Admin Portal</CardTitle>
              <CardDescription className="text-center">
                Enter credentials to access the dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Username</p>
                  <Input
                    type="text"
                    placeholder="e.g. admin"
                    value={adminUser}
                    onChange={(e) => setAdminUser(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Password</p>
                  <Input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">Both username and password are required.</p>
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout>
        <div className="container py-8">
          <p className="text-center text-muted-foreground">Loading submissions...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Review and approve tool submissions
            </p>
          </div>
          <Button
            variant="outline"
            onClick={async () => {
              if (!adminSecret) {
                toast({ title: 'Access Denied', description: 'Password required', variant: 'destructive' });
                return;
              }

              try {
                const apiUrl = (import.meta as any).env?.VITE_API_URL || window.location.origin;
                const res = await fetch(`${apiUrl}/api/backup`, {
                  headers: { 'x-admin-secret': adminSecret, 'x-admin-user': adminUser },
                });

                if (!res.ok) {
                  const err = await res.json().catch(() => ({}));
                  throw new Error(err.error || 'Failed to download backup');
                }

                const data = await res.json();
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = data?.backupDate ? `submissions-backup-${data.backupDate.split('T')[0]}.json` : 'submissions-backup.json';
                a.click();
                URL.revokeObjectURL(url);
              } catch (err: any) {
                toast({ title: 'Error', description: err.message || 'Failed to download backup', variant: 'destructive' });
              }
            }}
            className="mr-2"
          >
            Download Backup
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              localStorage.removeItem('admin_auth');
              localStorage.removeItem('admin_secret');
              localStorage.removeItem('admin_user');
              window.location.reload();
            }}
          >
            Logout
          </Button>
        </div>

        {submissions.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">No submissions yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {submissions.map((submission) => (
              <Card key={submission.issueNumber}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2">
                        {submission.name}
                        <Badge className={getStatusColor(submission.status)}>
                          {submission.status}
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        Issue #{submission.issueNumber} • {new Date(submission.submittedAt).toLocaleDateString()}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Website</p>
                      <a
                        href={submission.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline break-all text-sm"
                      >
                        {submission.website}
                      </a>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Category</p>
                      <p className="text-sm">{submission.category}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Pricing</p>
                      <p className="text-sm capitalize">{submission.pricing}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">GitHub Issue</p>
                      <a href={submission.issueUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">
                        View Issue
                      </a>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Description</p>
                    <p className="text-sm">{submission.description}</p>
                  </div>

                  {submission.features && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Features</p>
                      <p className="text-sm">{submission.features}</p>
                    </div>
                  )}

                  {submission.status === 'pending' && (
                    <div className="flex flex-wrap gap-2 pt-4 border-t">
                      <Button
                        size="sm"
                        onClick={() => handleApprove(submission.issueNumber)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-1.5" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleReject(submission.issueNumber)}
                      >
                        <XCircle className="h-4 w-4 mr-1.5" />
                        Reject
                      </Button>
                    </div>
                  )}

                  {submission.status === 'approved' && (
                    <div className="pt-4 border-t">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(submission)}
                      >
                        <Copy className="h-4 w-4 mr-1.5" />
                        Copy Tool Entry
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2">
                        Click to copy the formatted entry to add to src/data/tools.ts
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Admin;
