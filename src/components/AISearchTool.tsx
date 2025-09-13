import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Bot, Clock, BookOpen, Users, Sword } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const suggestedQueries = [
  { icon: Clock, text: "Tell me about the Roman Empire", category: "Ancient Rome" },
  { icon: Sword, text: "What caused World War II?", category: "Modern History" },
  { icon: Users, text: "How did the Renaissance begin?", category: "Cultural History" },
  { icon: BookOpen, text: "Ancient Egyptian mythology", category: "Ancient Egypt" },
];

const mockResponses = [
  {
    query: "Roman Empire",
    response: "The Roman Empire was one of the largest empires in ancient history, spanning from 27 BC to 476 AD in the West. It reached its greatest extent under Emperor Trajan, covering much of Europe, North Africa, and the Middle East.",
    sources: ["Tacitus: Annals", "Gibbon: Decline and Fall", "Modern Archaeological Evidence"],
    relatedTopics: ["Julius Caesar", "Byzantine Empire", "Roman Law", "Colosseum"]
  },
  {
    query: "World War II",
    response: "World War II (1939-1945) was caused by multiple factors including the rise of totalitarian regimes, unresolved issues from WWI, economic instability, and territorial ambitions of Axis powers.",
    sources: ["Primary War Documents", "Churchill's Memoirs", "Nuremberg Trial Records"],
    relatedTopics: ["Holocaust", "D-Day", "Pearl Harbor", "Hiroshima"]
  }
];

export const AISearchTool = () => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<typeof mockResponses[0] | null>(null);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    
    // Simulate AI search delay
    setTimeout(() => {
      const result = mockResponses.find(r => 
        query.toLowerCase().includes(r.query.toLowerCase())
      ) || {
        query: query,
        response: `Based on historical records, ${query} represents a fascinating topic in world history. The AI analysis suggests exploring multiple perspectives and cross-referencing primary sources for comprehensive understanding.`,
        sources: ["Historical Archives", "Academic Journals", "Primary Documents"],
        relatedTopics: ["Timeline", "Cultural Impact", "Modern Relevance", "Archaeological Evidence"]
      };
      
      setSearchResult(result);
      setIsSearching(false);
      
      toast({
        title: "Search Complete",
        description: "AI has analyzed your query and found relevant historical information.",
      });
    }, 2000);
  };

  const handleSuggestedQuery = (suggestedText: string) => {
    setQuery(suggestedText);
  };

  return (
    <section id="ai-search" className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Bot className="w-12 h-12 text-primary mr-4" />
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AI Research Assistant
            </h2>
          </div>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Ask me anything about history! I'll search through thousands of historical documents, 
            academic papers, and archaeological findings to provide you with accurate, sourced information.
          </p>
        </div>
        
        <Card className="gradient-card border-border/50 shadow-glow mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="w-6 h-6 mr-2 text-primary" />
              Search Historical Knowledge
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask me about any historical event, person, or civilization..."
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button 
                onClick={handleSearch} 
                disabled={isSearching || !query.trim()}
                className="shadow-glow"
              >
                {isSearching ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </>
                )}
              </Button>
            </div>
            
            <div className="mb-6">
              <p className="text-sm font-medium mb-3 text-foreground/80">Suggested queries:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {suggestedQueries.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSuggestedQuery(suggestion.text)}
                    className="justify-start text-left h-auto p-3 transition-smooth hover:bg-primary/10"
                  >
                    <suggestion.icon className="w-4 h-4 mr-2 text-primary" />
                    <div>
                      <div className="font-medium">{suggestion.text}</div>
                      <div className="text-xs text-muted-foreground">{suggestion.category}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {searchResult && (
          <Card className="gradient-card border-border/50 shadow-card animate-in fade-in slide-in-from-bottom-4">
            <CardHeader>
              <CardTitle className="flex items-center text-primary">
                <Bot className="w-6 h-6 mr-2" />
                AI Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2 text-lg">Response:</h4>
                <p className="leading-relaxed text-foreground/90">{searchResult.response}</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Sources:</h4>
                <div className="flex flex-wrap gap-2">
                  {searchResult.sources.map((source, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {source}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Related Topics:</h4>
                <div className="flex flex-wrap gap-2">
                  {searchResult.relatedTopics.map((topic, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSuggestedQuery(topic)}
                      className="text-xs transition-smooth hover:bg-primary/10"
                    >
                      {topic}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};