import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  BookOpen, 
  ExternalLink, 
  Download,
  Filter,
  Star,
  Calendar,
  MapPin,
  Users
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ResearchResult {
  title: string;
  summary: string;
  period: string;
  region: string;
  keyFigures: string[];
  sources: Array<{
    title: string;
    author: string;
    year: string;
    type: string;
    reliability: number;
  }>;
  relatedTopics: string[];
  factChecked: boolean;
}

export const ResearchAssistant = () => {
  const [query, setQuery] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<ResearchResult | null>(null);
  const { toast } = useToast();

  const handleResearch = async () => {
    if (!query.trim()) return;
    
    setIsAnalyzing(true);
    setProgress(0);
    setResults(null);

    // Simulate AI analysis with progress updates
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + Math.random() * 15;
      });
    }, 300);

    setTimeout(() => {
      clearInterval(progressInterval);
      setProgress(100);
      
      const mockResult: ResearchResult = {
        title: `Historical Analysis: ${query}`,
        summary: `Comprehensive analysis reveals significant historical patterns and connections related to ${query}. The research indicates multiple interconnected factors that shaped the development of this topic across different time periods and geographical regions.`,
        period: "1450-1750 CE",
        region: "Europe, Mediterranean, Middle East",
        keyFigures: ["Leonardo da Vinci", "Galileo Galilei", "Johannes Kepler", "Nicolaus Copernicus"],
        sources: [
          {
            title: "Primary Historical Documents Collection",
            author: "Vatican Secret Archives",
            year: "1450-1600",
            type: "Primary Source",
            reliability: 95
          },
          {
            title: "Renaissance Science and Philosophy",
            author: "Dr. Maria Hernandez",
            year: "2019",
            type: "Academic Journal",
            reliability: 92
          },
          {
            title: "Medieval to Modern Transition",
            author: "Cambridge Historical Review",
            year: "2021",
            type: "Peer Review",
            reliability: 89
          }
        ],
        relatedTopics: ["Scientific Revolution", "Renaissance Art", "Religious Reforms", "Trade Routes"],
        factChecked: true
      };
      
      setResults(mockResult);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: "Comprehensive historical research completed with validated sources.",
      });
    }, 3000);
  };

  const quickQueries = [
    "The fall of Constantinople and its impact on European trade",
    "Scientific developments during the Islamic Golden Age",
    "Women's roles in medieval European society",
    "The economic factors behind the Age of Exploration"
  ];

  return (
    <div className="space-y-8">
      {/* Search Interface */}
      <div className="space-y-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter your historical research question or topic..."
              className="h-12 text-lg border-border/50 focus:border-primary"
              onKeyPress={(e) => e.key === 'Enter' && handleResearch()}
            />
          </div>
          <Button 
            onClick={handleResearch}
            disabled={isAnalyzing || !query.trim()}
            size="lg"
            className="px-8 shadow-glow"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin w-5 h-5 border-2 border-current border-t-transparent rounded-full mr-2" />
                Analyzing...
              </>
            ) : (
              <>
                <Search className="w-5 h-5 mr-2" />
                Research
              </>
            )}
          </Button>
        </div>

        {/* Quick Query Suggestions */}
        <div>
          <p className="text-sm font-medium mb-3 text-muted-foreground">Quick research suggestions:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {quickQueries.map((suggestion, index) => (
              <Button
                key={index}
                variant="ghost"
                onClick={() => setQuery(suggestion)}
                className="text-left h-auto p-4 justify-start border border-border/50 hover:border-primary/50 transition-professional"
              >
                <BookOpen className="w-4 h-4 mr-3 text-primary flex-shrink-0" />
                <span className="text-sm">{suggestion}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Progress Indicator */}
        {isAnalyzing && (
          <Card className="border-primary/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Analyzing historical data...</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              </div>
              <div className="text-xs text-muted-foreground mt-3">
                • Cross-referencing multiple historical databases<br/>
                • Validating sources and chronological accuracy<br/>
                • Identifying patterns and connections
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Results Display */}
      {results && (
        <div className="space-y-6 animate-fade-in-up">
          {/* Main Result Card */}
          <Card className="shadow-professional border-primary/20">
            <CardHeader className="border-b border-border/50">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl text-primary mb-2">{results.title}</CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {results.period}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {results.region}
                    </div>
                    {results.factChecked && (
                      <Badge variant="default" className="text-xs">
                        Fact-Checked
                      </Badge>
                    )}
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <div>
                <h4 className="font-semibold mb-3 text-lg">Research Summary</h4>
                <p className="text-muted-foreground leading-relaxed">{results.summary}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Key Historical Figures
                </h4>
                <div className="flex flex-wrap gap-2">
                  {results.keyFigures.map((figure, index) => (
                    <Badge key={index} variant="secondary" className="cursor-pointer hover:bg-primary/10">
                      {figure}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sources Section */}
          <Card className="shadow-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Verified Sources ({results.sources.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {results.sources.map((source, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border/50 rounded-lg hover:border-primary/50 transition-professional">
                    <div className="flex-1">
                      <h5 className="font-medium mb-1">{source.title}</h5>
                      <p className="text-sm text-muted-foreground">
                        {source.author} • {source.year} • {source.type}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="text-sm font-medium">{source.reliability}%</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Related Topics */}
          <Card className="shadow-card border-border/50">
            <CardHeader>
              <CardTitle>Related Research Topics</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-3">
                {results.relatedTopics.map((topic, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setQuery(topic)}
                    className="transition-professional hover:bg-primary/10"
                  >
                    {topic}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};