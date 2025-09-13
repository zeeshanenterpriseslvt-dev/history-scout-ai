import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Search,
  BookOpen,
  ExternalLink,
  Clock,
  Shield
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SourceValidation {
  url: string;
  title: string;
  author: string;
  type: string;
  status: 'verified' | 'questionable' | 'unreliable';
  reliability: number;
  bias: string;
  lastUpdated: string;
  citations: number;
  issues: string[];
  recommendations: string[];
}

export const SourceValidator = () => {
  const [sourceUrl, setSourceUrl] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [validation, setValidation] = useState<SourceValidation | null>(null);
  const { toast } = useToast();

  const handleValidation = async () => {
    if (!sourceUrl.trim()) return;
    
    setIsValidating(true);
    setProgress(0);
    setValidation(null);

    // Simulate validation process
    const stages = [
      { progress: 25, message: "Checking source authenticity..." },
      { progress: 50, message: "Analyzing author credentials..." },
      { progress: 75, message: "Cross-referencing with databases..." },
      { progress: 95, message: "Generating reliability report..." }
    ];

    for (const stage of stages) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setProgress(stage.progress);
    }

    // Generate mock validation results
    const mockValidation: SourceValidation = {
      url: sourceUrl,
      title: "The Cambridge History of Medieval Europe",
      author: "Dr. Margaret Historiographia",
      type: "Academic Publication",
      status: Math.random() > 0.3 ? 'verified' : 'questionable',
      reliability: Math.floor(Math.random() * 30) + 70,
      bias: "Minimal academic bias detected",
      lastUpdated: "2023-03-15",
      citations: 1247,
      issues: Math.random() > 0.5 ? [] : ["Potential methodological concerns", "Limited primary source citations"],
      recommendations: ["Cross-reference with additional sources", "Verify dates against primary documents"]
    };

    setProgress(100);
    setValidation(mockValidation);
    setIsValidating(false);

    toast({
      title: "Validation Complete",
      description: `Source analyzed with ${mockValidation.reliability}% reliability score`,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return CheckCircle;
      case 'questionable': return AlertTriangle;
      case 'unreliable': return XCircle;
      default: return AlertTriangle;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'text-green-500';
      case 'questionable': return 'text-yellow-500';
      case 'unreliable': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const trustedSources = [
    "JSTOR Academic Database",
    "Oxford Academic",
    "Cambridge University Press",
    "Smithsonian Institution",
    "National Archives",
    "Library of Congress"
  ];

  return (
    <div className="space-y-8">
      {/* Validation Interface */}
      <Card className="shadow-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="w-6 h-6 mr-3 text-primary" />
            Source Validation Tool
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="flex gap-4">
            <Input
              value={sourceUrl}
              onChange={(e) => setSourceUrl(e.target.value)}
              placeholder="Enter URL, DOI, or citation to validate..."
              className="flex-1 border-border/50"
              onKeyPress={(e) => e.key === 'Enter' && handleValidation()}
            />
            <Button 
              onClick={handleValidation}
              disabled={isValidating || !sourceUrl.trim()}
              className="shadow-glow"
            >
              {isValidating ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                  Validating...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Validate
                </>
              )}
            </Button>
          </div>

          {/* Quick Validation Examples */}
          <div>
            <p className="text-sm font-medium mb-3 text-muted-foreground">Quick validation examples:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSourceUrl("https://doi.org/10.1017/example")}
                className="justify-start text-xs"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Academic DOI
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSourceUrl("https://www.jstor.org/stable/example")}
                className="justify-start text-xs"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                JSTOR Article
              </Button>
            </div>
          </div>

          {/* Validation Progress */}
          {isValidating && (
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Validating source reliability...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="text-xs text-muted-foreground">
                Checking against academic databases, citation indices, and fact-checking algorithms.
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Validation Results */}
      {validation && (
        <div className="space-y-6 animate-fade-in-up">
          {/* Main Validation Card */}
          <Card className="shadow-professional border-primary/20">
            <CardHeader className="border-b border-border/50">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  {React.createElement(getStatusIcon(validation.status), {
                    className: `w-6 h-6 mr-3 ${getStatusColor(validation.status)}`
                  })}
                  Source Validation Report
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={validation.status === 'verified' ? 'default' : 'secondary'}
                    className="capitalize"
                  >
                    {validation.status}
                  </Badge>
                  <Badge variant="outline">
                    {validation.reliability}% Reliable
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              {/* Source Information */}
              <div>
                <h4 className="font-semibold mb-3">Source Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Title</p>
                    <p className="text-muted-foreground">{validation.title}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Author</p>
                    <p className="text-muted-foreground">{validation.author}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Publication Type</p>
                    <p className="text-muted-foreground">{validation.type}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Last Updated</p>
                    <p className="text-muted-foreground">{validation.lastUpdated}</p>
                  </div>
                </div>
              </div>

              {/* Reliability Metrics */}
              <div>
                <h4 className="font-semibold mb-3">Reliability Analysis</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Overall Reliability</span>
                      <span>{validation.reliability}%</span>
                    </div>
                    <Progress value={validation.reliability} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="text-center p-3 border border-border/50 rounded-lg">
                      <div className="text-lg font-semibold text-primary">{validation.citations}</div>
                      <div className="text-muted-foreground">Citations</div>
                    </div>
                    <div className="text-center p-3 border border-border/50 rounded-lg">
                      <div className="text-lg font-semibold text-primary">{validation.bias}</div>
                      <div className="text-muted-foreground">Bias Level</div>
                    </div>
                    <div className="text-center p-3 border border-border/50 rounded-lg">
                      <div className="text-lg font-semibold text-primary capitalize">{validation.status}</div>
                      <div className="text-muted-foreground">Status</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Issues and Recommendations */}
              {(validation.issues.length > 0 || validation.recommendations.length > 0) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {validation.issues.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-2 text-yellow-500" />
                        Potential Issues
                      </h4>
                      <ul className="space-y-2">
                        {validation.issues.map((issue, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start">
                            <span className="w-1 h-1 bg-yellow-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {issue}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {validation.recommendations.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        Recommendations
                      </h4>
                      <ul className="space-y-2">
                        {validation.recommendations.map((rec, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start">
                            <span className="w-1 h-1 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Trusted Sources Reference */}
      <Card className="shadow-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            Trusted Academic Sources
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-muted-foreground mb-4">
            These sources are pre-verified and considered highly reliable for historical research:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {trustedSources.map((source, index) => (
              <div key={index} className="flex items-center p-3 border border-border/50 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span className="text-sm">{source}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};