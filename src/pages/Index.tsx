import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { BlogSection } from "@/components/BlogSection";
import { AISearchTool } from "@/components/AISearchTool";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <BlogSection />
      <AISearchTool />
      
      <footer className="py-12 px-6 border-t border-border/50">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            © 2024 HistoriChronicles. Preserving the past, inspiring the future.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
