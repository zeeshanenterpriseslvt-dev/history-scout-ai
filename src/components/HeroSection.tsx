import { Button } from "@/components/ui/button";
import { Hero3D } from "./Hero3D";
import { ArrowRight, Clock, Globe } from "lucide-react";
import heroArtifacts from "@/assets/hero-artifacts.jpg";

export const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30" 
        style={{ backgroundImage: `url(${heroArtifacts})` }}
      />
      <div className="absolute inset-0 gradient-hero" />
      <Hero3D />
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="animate-float">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Uncover the Past
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 mb-8 leading-relaxed">
            Journey through time with AI-powered historical research. Discover stories, analyze events, and explore the rich tapestry of human civilization.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button size="lg" className="shadow-glow transition-smooth hover:scale-105">
            <Clock className="w-5 h-5 mr-2" />
            Start Exploring
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button variant="outline" size="lg" className="transition-smooth hover:scale-105">
            <Globe className="w-5 h-5 mr-2" />
            AI Research Tool
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="p-6 gradient-card rounded-lg shadow-card border border-border/50 transition-smooth hover:scale-105">
            <h3 className="text-xl font-semibold mb-2 text-primary">Ancient Civilizations</h3>
            <p className="text-foreground/70">Explore the rise and fall of great empires</p>
          </div>
          <div className="p-6 gradient-card rounded-lg shadow-card border border-border/50 transition-smooth hover:scale-105">
            <h3 className="text-xl font-semibold mb-2 text-primary">Medieval Chronicles</h3>
            <p className="text-foreground/70">Discover the stories of knights and kingdoms</p>
          </div>
          <div className="p-6 gradient-card rounded-lg shadow-card border border-border/50 transition-smooth hover:scale-105">
            <h3 className="text-xl font-semibold mb-2 text-primary">Modern History</h3>
            <p className="text-foreground/70">Understand the events that shaped our world</p>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};