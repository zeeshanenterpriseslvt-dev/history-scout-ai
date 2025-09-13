import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Crown,
  Sword,
  BookOpen,
  Download,
  Filter,
  Clock
} from "lucide-react";

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'political' | 'cultural' | 'military' | 'economic';
  importance: number;
  location: string;
  figures: string[];
}

const mockEvents: TimelineEvent[] = [
  {
    id: "1",
    date: "1453-05-29",
    title: "Fall of Constantinople",
    description: "Ottoman Empire conquers the Byzantine capital, ending the Byzantine Empire and controlling key trade routes.",
    type: "military",
    importance: 5,
    location: "Constantinople",
    figures: ["Mehmed II", "Constantine XI"]
  },
  {
    id: "2", 
    date: "1455-01-01",
    title: "Gutenberg Bible Printed",
    description: "Johannes Gutenberg completes the first major book printed using movable type, revolutionizing information spread.",
    type: "cultural",
    importance: 5,
    location: "Mainz",
    figures: ["Johannes Gutenberg"]
  },
  {
    id: "3",
    date: "1492-10-12",
    title: "Columbus Reaches the Americas",
    description: "Christopher Columbus lands in the Caribbean, initiating widespread European exploration and colonization.",
    type: "political",
    importance: 5,
    location: "Caribbean",
    figures: ["Christopher Columbus"]
  },
  {
    id: "4",
    date: "1517-10-31",
    title: "Protestant Reformation Begins",
    description: "Martin Luther posts the 95 Theses, sparking the Protestant Reformation across Europe.",
    type: "cultural",
    importance: 5,
    location: "Wittenberg",
    figures: ["Martin Luther"]
  }
];

export const TimelineGenerator = () => {
  const [topic, setTopic] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [region, setRegion] = useState("");
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      setEvents(mockEvents);
      setIsGenerating(false);
    }, 2000);
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'political': return Crown;
      case 'military': return Sword;
      case 'cultural': return BookOpen;
      case 'economic': return MapPin;
      default: return Clock;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'political': return 'bg-blue-500';
      case 'military': return 'bg-red-500';
      case 'cultural': return 'bg-purple-500';
      case 'economic': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const presetTopics = [
    "Renaissance and Early Modern Period",
    "Rise and Fall of Roman Empire",
    "World War II Timeline",
    "Scientific Revolution",
    "Age of Exploration"
  ];

  return (
    <div className="space-y-8">
      {/* Generation Controls */}
      <Card className="shadow-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-6 h-6 mr-3 text-primary" />
            Timeline Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Historical Topic</label>
              <Input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Fall of Byzantine Empire"
                className="border-border/50"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Time Period</label>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="border-border/50">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ancient">Ancient (3000 BCE - 500 CE)</SelectItem>
                  <SelectItem value="medieval">Medieval (500 - 1500 CE)</SelectItem>
                  <SelectItem value="renaissance">Renaissance (1400 - 1600 CE)</SelectItem>
                  <SelectItem value="modern">Modern (1600 - 1900 CE)</SelectItem>
                  <SelectItem value="contemporary">Contemporary (1900 - Present)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Geographic Region</label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger className="border-border/50">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="europe">Europe</SelectItem>
                  <SelectItem value="asia">Asia</SelectItem>
                  <SelectItem value="africa">Africa</SelectItem>
                  <SelectItem value="americas">Americas</SelectItem>
                  <SelectItem value="global">Global</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Quick Presets</label>
            <div className="flex flex-wrap gap-2">
              {presetTopics.map((preset, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setTopic(preset)}
                  className="text-xs"
                >
                  {preset}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <Button 
              onClick={handleGenerate}
              disabled={isGenerating || !topic}
              className="shadow-glow"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <Calendar className="w-4 h-4 mr-2" />
                  Generate Timeline
                </>
              )}
            </Button>
            
            {events.length > 0 && (
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Timeline
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Timeline Display */}
      {events.length > 0 && (
        <Card className="shadow-professional border-primary/20">
          <CardHeader className="border-b border-border/50">
            <div className="flex items-center justify-between">
              <CardTitle>Interactive Historical Timeline</CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Badge variant="outline">{events.length} Events</Badge>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary opacity-30"></div>
              
              {/* Timeline Events */}
              <div className="space-y-8">
                {events.map((event, index) => {
                  const EventIcon = getEventIcon(event.type);
                  return (
                    <div key={event.id} className="relative flex items-start space-x-6 group">
                      {/* Timeline Node */}
                      <div className={`relative z-10 w-16 h-16 rounded-full ${getEventColor(event.type)} flex items-center justify-center shadow-lg group-hover:scale-110 transition-professional`}>
                        <EventIcon className="w-8 h-8 text-white" />
                      </div>
                      
                      {/* Event Content */}
                      <div className="flex-1 min-w-0">
                        <Card className="shadow-card border-border/50 hover:border-primary/50 transition-professional">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="text-lg font-semibold text-primary mb-1">{event.title}</h3>
                                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                  <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    {new Date(event.date).toLocaleDateString('en-US', { 
                                      year: 'numeric', 
                                      month: 'long', 
                                      day: 'numeric' 
                                    })}
                                  </div>
                                  <div className="flex items-center">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    {event.location}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant="secondary" className="text-xs capitalize">
                                  {event.type}
                                </Badge>
                                <div className="flex">
                                  {Array.from({ length: event.importance }, (_, i) => (
                                    <div key={i} className="w-2 h-2 bg-primary rounded-full mx-0.5"></div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            
                            <p className="text-muted-foreground mb-4 leading-relaxed">
                              {event.description}
                            </p>
                            
                            {event.figures.length > 0 && (
                              <div className="flex items-center space-x-2">
                                <Users className="w-4 h-4 text-muted-foreground" />
                                <div className="flex flex-wrap gap-1">
                                  {event.figures.map((figure, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs">
                                      {figure}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};