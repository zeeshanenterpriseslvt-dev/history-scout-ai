import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const blogPosts = [
  {
    id: 1,
    title: "The Fall of Constantinople: End of an Empire",
    excerpt: "Explore the dramatic siege that marked the end of the Byzantine Empire and changed the course of European history forever.",
    author: "Dr. Elena Historiades",
    date: "March 15, 2024",
    category: "Medieval History",
    readTime: "8 min read",
    image: "/api/placeholder/400/250"
  },
  {
    id: 2,
    title: "Decoding Hieroglyphs: Modern AI Meets Ancient Egypt",
    excerpt: "How artificial intelligence is revolutionizing our understanding of ancient Egyptian texts and unlocking new historical insights.",
    author: "Prof. Ahmed Rashid",
    date: "March 12, 2024",
    category: "Ancient Civilizations",
    readTime: "12 min read",
    image: "/api/placeholder/400/250"
  },
  {
    id: 3,
    title: "The Silk Road: Trade Routes That Connected Worlds",
    excerpt: "Journey along the ancient trade networks that facilitated cultural exchange between East and West for over a millennium.",
    author: "Dr. Li Wei",
    date: "March 10, 2024",
    category: "Trade History",
    readTime: "15 min read",
    image: "/api/placeholder/400/250"
  },
  {
    id: 4,
    title: "Vikings: Beyond the Stereotypes",
    excerpt: "Uncover the true story of Norse seafarers, their sophisticated society, and their impact on medieval Europe.",
    author: "Dr. Ingrid Eriksson",
    date: "March 8, 2024",
    category: "Medieval History",
    readTime: "10 min read",
    image: "/api/placeholder/400/250"
  },
  {
    id: 5,
    title: "The Library of Alexandria: Myth and Reality",
    excerpt: "Separating fact from fiction about the ancient world's most famous center of learning and scholarship.",
    author: "Prof. Marcus Aurelius",
    date: "March 5, 2024",
    category: "Ancient Civilizations",
    readTime: "9 min read",
    image: "/api/placeholder/400/250"
  },
  {
    id: 6,
    title: "Industrial Revolution: The Age of Transformation",
    excerpt: "How steam, steel, and innovation transformed human society and laid the foundation for the modern world.",
    author: "Dr. Victoria Steele",
    date: "March 3, 2024",
    category: "Modern History",
    readTime: "14 min read",
    image: "/api/placeholder/400/250"
  }
];

export const BlogSection = () => {
  return (
    <section id="articles" className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Latest Chronicles
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Dive deep into fascinating historical narratives, backed by research and brought to life through expert analysis.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="gradient-card border-border/50 shadow-card transition-smooth hover:scale-105 hover:shadow-glow group">
              <div className="aspect-video bg-muted rounded-t-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary/60">{post.category}</span>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary" className="text-xs">
                    {post.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-smooth">
                  {post.title}
                </h3>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-foreground/70 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>
                
                <Button variant="ghost" className="w-full mt-4 group-hover:bg-primary/10 transition-smooth">
                  Read More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="shadow-glow">
            View All Articles
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};