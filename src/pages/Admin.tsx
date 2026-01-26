import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, XCircle, Copy } from 'lucide-react';

interface Submission {
  id: string;
  name: string;
  website: string;
  category: string;
  pricing: string;
  description: string;
  features: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

const Admin = () => {
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/submissions`);
      const data = await response.json();
      setSubmissions(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch submissions. Is the backend running?',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/approve/${id}`, {
        method: 'POST',
      });
      const data = await response.json();

      if (response.ok) {
        toast({
          title: 'Approved!',
          description: 'Now copy the tool data below and add it to src/data/tools.ts',
        });
        fetchSubmissions();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to approve submission',
        variant: 'destructive',
      });
    }
  };

  const handleReject = async (id: string) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/reject/${id}`, {
        method: 'POST',
      });

      if (response.ok) {
        toast({
          title: 'Rejected',
          description: 'Submission marked as rejected',
        });
        fetchSubmissions();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to reject submission',
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Review and approve tool submissions
          </p>
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
              <Card key={submission.id}>
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
                        Submitted: {new Date(submission.submittedAt).toLocaleDateString()}
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
                        className="text-primary hover:underline break-all"
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
                      <p className="text-sm font-medium text-muted-foreground">ID</p>
                      <p className="text-sm font-mono text-xs">{submission.id}</p>
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
                        onClick={() => handleApprove(submission.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-1.5" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleReject(submission.id)}
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
