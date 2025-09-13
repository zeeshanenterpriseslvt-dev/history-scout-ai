import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  FileText, 
  Image, 
  Zap,
  CheckCircle,
  AlertCircle,
  Download,
  Eye
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DocumentAnalysis {
  filename: string;
  type: string;
  language: string;
  period: string;
  authenticity: number;
  keyFindings: string[];
  entities: Array<{
    name: string;
    type: string;
    confidence: number;
  }>;
  summary: string;
  transcription?: string;
}

export const DocumentAnalyzer = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysis, setAnalysis] = useState<DocumentAnalysis | null>(null);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsAnalyzing(true);
    setProgress(0);
    setAnalysis(null);

    // Simulate AI analysis with realistic progress
    const stages = [
      { progress: 20, message: "Processing document..." },
      { progress: 40, message: "Extracting text content..." },
      { progress: 60, message: "Analyzing historical context..." },
      { progress: 80, message: "Identifying entities and dates..." },
      { progress: 95, message: "Generating insights..." }
    ];

    for (const stage of stages) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setProgress(stage.progress);
    }

    // Generate mock analysis results
    const mockAnalysis: DocumentAnalysis = {
      filename: file.name,
      type: "Historical Manuscript",
      language: "Latin/Medieval English",
      period: "15th Century",
      authenticity: 87,
      keyFindings: [
        "References to medieval trade practices",
        "Mentions of specific historical figures",
        "Contains financial records from 1453",
        "Includes geographical locations"
      ],
      entities: [
        { name: "Constantinople", type: "Location", confidence: 95 },
        { name: "Mehmed II", type: "Person", confidence: 89 },
        { name: "1453", type: "Date", confidence: 98 },
        { name: "Byzantine Empire", type: "Organization", confidence: 92 }
      ],
      summary: "This document appears to be a trade ledger from the late Byzantine period, containing valuable information about commercial activities during the final years of the empire.",
      transcription: "Anno Domini MCCCCLIIII... [Medieval text would continue here]"
    };

    setProgress(100);
    setAnalysis(mockAnalysis);
    setIsAnalyzing(false);

    toast({
      title: "Analysis Complete",
      description: `Successfully analyzed ${file.name}`,
    });
  };

  return (
    <div className="space-y-8">
      {/* Upload Area */}
      <Card className="border-dashed border-2 border-primary/30 hover:border-primary/50 transition-professional">
        <CardContent className="p-12 text-center">
          <div className="mb-6">
            <Upload className="w-16 h-16 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Upload Historical Document</h3>
            <p className="text-muted-foreground">
              Supports manuscripts, letters, official documents, inscriptions, and historical images
            </p>
          </div>
          
          <div className="flex justify-center mb-6">
            <input
              type="file"
              onChange={handleFileUpload}
              accept=".pdf,.jpg,.jpeg,.png,.tiff,.txt,.doc,.docx"
              className="hidden"
              id="document-upload"
              disabled={isAnalyzing}
            />
            <label htmlFor="document-upload">
              <Button 
                variant="default" 
                size="lg" 
                className="cursor-pointer shadow-glow"
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin w-5 h-5 border-2 border-current border-t-transparent rounded-full mr-2" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5 mr-2" />
                    Choose Document
                  </>
                )}
              </Button>
            </label>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
            <div className="flex items-center justify-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>PDF/Text</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Image className="w-4 h-4" />
              <span>Images</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>OCR Support</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>AI Vision</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Progress */}
      {isAnalyzing && (
        <Card className="border-primary/50">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Analyzing document with AI...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-3" />
              <div className="text-xs text-muted-foreground">
                Our AI is examining the document using advanced computer vision, 
                natural language processing, and historical database cross-referencing.
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-6 animate-fade-in-up">
          {/* Overview Card */}
          <Card className="shadow-professional border-primary/20">
            <CardHeader className="border-b border-border/50">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <FileText className="w-6 h-6 mr-3 text-primary" />
                  Document Analysis: {analysis.filename}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={analysis.authenticity > 80 ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {analysis.authenticity}% Authentic
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div>
                  <h4 className="font-medium mb-1">Document Type</h4>
                  <p className="text-sm text-muted-foreground">{analysis.type}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Language</h4>
                  <p className="text-sm text-muted-foreground">{analysis.language}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Time Period</h4>
                  <p className="text-sm text-muted-foreground">{analysis.period}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Authenticity Score</h4>
                  <div className="flex items-center">
                    {analysis.authenticity > 80 ? (
                      <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-yellow-500 mr-1" />
                    )}
                    <span className="text-sm font-medium">{analysis.authenticity}%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3">Summary</h4>
                  <p className="text-muted-foreground leading-relaxed">{analysis.summary}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Key Findings</h4>
                  <ul className="space-y-2">
                    {analysis.keyFindings.map((finding, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Entities and References */}
          <Card className="shadow-card border-border/50">
            <CardHeader>
              <CardTitle>Identified Historical Entities</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {analysis.entities.map((entity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                    <div>
                      <h5 className="font-medium">{entity.name}</h5>
                      <p className="text-xs text-muted-foreground">{entity.type}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {entity.confidence}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Transcription (if available) */}
          {analysis.transcription && (
            <Card className="shadow-card border-border/50">
              <CardHeader>
                <CardTitle>AI Transcription</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="bg-muted/50 p-4 rounded-lg font-mono text-sm">
                  {analysis.transcription}
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Note: This is an AI-generated transcription. Manual verification recommended for academic use.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};