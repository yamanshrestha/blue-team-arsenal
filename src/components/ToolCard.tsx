import { Tool } from '@/types/tool';
import { getCategoryById } from '@/data/categories';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface ToolCardProps {
  tool: Tool;
}

const pricingColors: Record<string, string> = {
  free: 'bg-green-100 text-green-800 border-green-200',
  freemium: 'bg-blue-100 text-blue-800 border-blue-200',
  paid: 'bg-orange-100 text-orange-800 border-orange-200',
};

const pricingLabels: Record<string, string> = {
  free: 'Free',
  freemium: 'Freemium',
  paid: 'Paid',
};

export const ToolCard = ({ tool }: ToolCardProps) => {
  const category = getCategoryById(tool.category);

  return (
    <Card className="h-full flex flex-col transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg leading-tight">{tool.name}</CardTitle>
          <Badge 
            variant="outline" 
            className={`text-xs shrink-0 ${pricingColors[tool.pricing]}`}
          >
            {pricingLabels[tool.pricing]}
          </Badge>
        </div>
        {category && (
          <Badge variant="secondary" className="w-fit text-xs">
            {category.name}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <CardDescription className="text-sm leading-relaxed flex-1">
          {tool.description}
        </CardDescription>
        
        {tool.features && tool.features.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {tool.features.slice(0, 3).map((feature, index) => (
              <span 
                key={index}
                className="text-xs px-2 py-1 bg-muted rounded-md text-muted-foreground"
              >
                {feature}
              </span>
            ))}
            {tool.features.length > 3 && (
              <span className="text-xs px-2 py-1 text-muted-foreground">
                +{tool.features.length - 3} more
              </span>
            )}
          </div>
        )}
        
        <div className="mt-4 pt-4 border-t">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            asChild
          >
            <a href={tool.website} target="_blank" rel="noopener noreferrer">
              Visit Website
              <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
