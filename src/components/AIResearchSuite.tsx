import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  Clock, 
  FileSearch, 
  MapPin, 
  BookOpen, 
  Users, 
  Zap,
  Download,
  CheckCircle,
  AlertCircle,
  ExternalLink
} from "lucide-react";
import { DocumentAnalyzer } from "./DocumentAnalyzer";
import { TimelineGenerator } from "./TimelineGenerator";
import { HistoricalMap } from "./HistoricalMap";
import { SourceValidator } from "./SourceValidator";
import { ResearchAssistant } from "./ResearchAssistant";

interface AnalysisResult {
  type: string;
  title: string;
  confidence: number;
  insights: string[];
  sources: string[];
  relatedEvents: string[];
}

export const AIResearchSuite = () => {
  const [activeTab, setActiveTab] = useState("assistant");
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);

  const tools = [
    {
      id: "assistant",
      name: "Research Assistant",
      description: "AI-powered historical research with cross-referencing",
      icon: Bot,
      status: "active"
    },
    {
      id: "document",
      name: "Document Analyzer",
      description: "Analyze historical documents and manuscripts",
      icon: FileSearch,
      status: "active"
    },
    {
      id: "timeline",
      name: "Timeline Generator",
      description: "Create interactive historical timelines",
      icon: Clock,
      status: "active"
    },
    {
      id: "map",
      name: "Historical Mapping",
      description: "Visualize events on interactive historical maps",
      icon: MapPin,
      status: "active"
    },
    {
      id: "validator",
      name: "Source Validator",
      description: "Verify historical sources and fact-check claims",
      icon: CheckCircle,
      status: "active"
    }
  ];

  return (
    <section id="ai-research" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 gradient-academic opacity-50" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-8">
            <div className="p-4 rounded-full bg-primary/10 border-2 border-primary/20 animate-pulse-glow">
              <Zap className="w-12 h-12 text-primary" />
            </div>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            AI Research Suite
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Revolutionary AI-powered tools for historians, researchers, and students. 
            Analyze documents, generate timelines, validate sources, and uncover hidden connections in historical data.
          </p>
        </div>

        {/* Tool Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {tools.map((tool) => (
            <Card 
              key={tool.id}
              className={`glass-effect shadow-card transition-professional hover:scale-105 cursor-pointer border-2 ${
                activeTab === tool.id ? 'border-primary shadow-glow' : 'border-border/50 hover:border-primary/50'
              }`}
              onClick={() => setActiveTab(tool.id)}
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className={`p-3 rounded-full ${activeTab === tool.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                    <tool.icon className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="font-semibold mb-2 text-sm">{tool.name}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{tool.description}</p>
                <Badge 
                  variant={tool.status === 'active' ? 'default' : 'secondary'} 
                  className="mt-3 text-xs"
                >
                  {tool.status}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Tool Interface */}
        <Card className="glass-effect shadow-professional border-border/50">
          <CardHeader className="border-b border-border/50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl text-primary flex items-center">
                {tools.find(t => t.id === activeTab)?.icon && 
                  React.createElement(tools.find(t => t.id === activeTab)!.icon, {
                    className: "w-7 h-7 mr-3"
                  })
                }
                {tools.find(t => t.id === activeTab)?.name}
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  Professional Suite
                </Badge>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsContent value="assistant" className="p-8">
                <ResearchAssistant />
              </TabsContent>
              
              <TabsContent value="document" className="p-8">
                <DocumentAnalyzer />
              </TabsContent>
              
              <TabsContent value="timeline" className="p-8">
                <TimelineGenerator />
              </TabsContent>
              
              <TabsContent value="map" className="p-8">
                <HistoricalMap />
              </TabsContent>
              
              <TabsContent value="validator" className="p-8">
                <SourceValidator />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Features Highlight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center animate-fade-in-up">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Advanced Analysis</h3>
            <p className="text-muted-foreground">
              Deep learning algorithms analyze historical patterns and connections across vast datasets.
            </p>
          </div>
          
          <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Collaborative Research</h3>
            <p className="text-muted-foreground">
              Share findings, collaborate with peers, and build comprehensive research projects.
            </p>
          </div>
          
          <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Download className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Export & Citation</h3>
            <p className="text-muted-foreground">
              Generate proper citations, export research, and create publication-ready reports.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};