import { Link } from 'react-router-dom';
import { CategoryInfo } from '@/types/tool';
import { tools } from '@/data/tools';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Mail, Bug, Brain, Network, Monitor, Search } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield,
  Mail,
  Bug,
  Brain,
  Network,
  Monitor,
  Search,
};

interface CategoryCardProps {
  category: CategoryInfo;
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
  const Icon = iconMap[category.icon] || Shield;
  const toolCount = tools.filter(t => t.category === category.id).length;

  return (
    <Link to={`/tools?category=${category.id}`}>
      <Card className="group h-full transition-all duration-200 hover:shadow-md hover:border-primary/20 cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-primary/5 text-primary group-hover:bg-primary/10 transition-colors">
              <Icon className="h-5 w-5" />
            </div>
            <Badge variant="secondary" className="text-xs">
              {toolCount} tools
            </Badge>
          </div>
          <CardTitle className="text-lg mt-3">{category.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm leading-relaxed">
            {category.description}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};
