import { Button } from "@/components/ui/button";
import { Scroll, Search, BookOpen, Clock } from "lucide-react";

export const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-md bg-background/80">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Scroll className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              HistoriChronicles
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-foreground/80 hover:text-primary transition-smooth">
              Home
            </a>
            <a href="#articles" className="text-foreground/80 hover:text-primary transition-smooth">
              Articles
            </a>
            <a href="#timeline" className="text-foreground/80 hover:text-primary transition-smooth">
              Timeline
            </a>
            <a href="#ai-search" className="text-foreground/80 hover:text-primary transition-smooth">
              AI Research
            </a>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="default" className="shadow-glow">
              <BookOpen className="w-4 h-4 mr-2" />
              Explore
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};