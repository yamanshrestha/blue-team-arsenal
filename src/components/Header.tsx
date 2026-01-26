import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Plus } from 'lucide-react';

export const Header = () => {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <Shield className="h-6 w-6 text-primary" />
          <span className="text-lg">Blue Team Arsenal</span>
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link 
            to="/tools" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Browse Tools
          </Link>
          <Button size="sm" asChild>
            <Link to="/submit">
              <Plus className="h-4 w-4 mr-1.5" />
              Submit Tool
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};
