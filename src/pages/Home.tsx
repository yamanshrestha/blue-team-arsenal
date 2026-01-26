import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { CategoryCard } from '@/components/CategoryCard';
import { ToolCard } from '@/components/ToolCard';
import { Button } from '@/components/ui/button';
import { categories } from '@/data/categories';
import { tools } from '@/data/tools';
import { ArrowRight, Shield } from 'lucide-react';

const Home = () => {
  // Get 4 featured tools (mix of categories)
  const featuredTools = [
    tools.find(t => t.id === 'wazuh'),
    tools.find(t => t.id === 'wireshark'),
    tools.find(t => t.id === 'misp'),
    tools.find(t => t.id === 'velociraptor'),
  ].filter(Boolean);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="border-b bg-gradient-to-b from-muted/50 to-background">
        <div className="container py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium hover:bg-blue-600/20 hover:text-blue-600 transition-all duration-300 cursor-pointer">
              <Shield className="h-4 w-4" />
              Cybersecurity Tools Repository
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              <span className="text-blue-600">Blue</span> Team Arsenal
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              A curated collection of tools for security analysts, incident responders, 
              and threat hunters. Find the right tool for your blue team operations.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button size="lg" asChild>
                <Link to="/tools">
                  Browse All Tools
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/submit">
                  Submit a Tool
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold">Categories</h2>
              <p className="text-muted-foreground mt-1">
                Explore tools by category
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="py-16 bg-muted/30 border-y">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold">Featured Tools</h2>
              <p className="text-muted-foreground mt-1">
                Popular open-source tools to get started
              </p>
            </div>
            <Button variant="ghost" asChild>
              <Link to="/tools">
                View all
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredTools.map((tool) => (
              tool && <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-3 text-center">
            <div>
              <p className="text-4xl font-bold text-primary">{tools.length}</p>
              <p className="text-muted-foreground mt-1">Tools Listed</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">{categories.length}</p>
              <p className="text-muted-foreground mt-1">Categories</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-primary">
                {tools.filter(t => t.pricing === 'free').length}
              </p>
              <p className="text-muted-foreground mt-1">Free Tools</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
