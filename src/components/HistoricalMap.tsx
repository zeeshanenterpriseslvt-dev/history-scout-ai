import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MapPin, 
  Calendar, 
  Users, 
  Layers,
  ZoomIn,
  ZoomOut,
  Download,
  Navigation,
  BookOpen
} from "lucide-react";

interface HistoricalEvent {
  id: string;
  name: string;
  date: string;
  coordinates: [number, number];
  type: string;
  description: string;
}

const mockMapData: HistoricalEvent[] = [
  {
    id: "1",
    name: "Fall of Constantinople",
    date: "1453",
    coordinates: [41.0082, 28.9784],
    type: "Military",
    description: "Ottoman conquest of the Byzantine capital"
  },
  {
    id: "2",
    name: "Battle of Hastings",
    date: "1066",
    coordinates: [50.9143, 0.4916],
    type: "Military",
    description: "Norman conquest of England"
  },
  {
    id: "3",
    name: "Printing Press Invention",
    date: "1440",
    coordinates: [49.9929, 8.2473],
    type: "Cultural",
    description: "Gutenberg's printing revolution in Mainz"
  }
];

export const HistoricalMap = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [events, setEvents] = useState<HistoricalEvent[]>(mockMapData);
  const [selectedEvent, setSelectedEvent] = useState<HistoricalEvent | null>(null);

  return (
    <div className="space-y-8">
      {/* Map Controls */}
      <Card className="shadow-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="w-6 h-6 mr-3 text-primary" />
            Historical Map Interface
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Time Period</label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="border-border/50">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ancient">Ancient (3000 BCE - 500 CE)</SelectItem>
                  <SelectItem value="medieval">Medieval (500 - 1500 CE)</SelectItem>
                  <SelectItem value="renaissance">Renaissance (1400 - 1600 CE)</SelectItem>
                  <SelectItem value="modern">Modern (1600 - 1900 CE)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Event Type</label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="border-border/50">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="military">Military</SelectItem>
                  <SelectItem value="cultural">Cultural</SelectItem>
                  <SelectItem value="political">Political</SelectItem>
                  <SelectItem value="economic">Economic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end space-x-2">
              <Button variant="outline" size="sm">
                <Layers className="w-4 h-4 mr-2" />
                Layers
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Map Display */}
      <Card className="shadow-professional border-primary/20">
        <CardHeader className="border-b border-border/50">
          <div className="flex items-center justify-between">
            <CardTitle>Interactive Historical Map</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Navigation className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          {/* Map Container */}
          <div className="h-96 bg-gradient-to-br from-blue-900/20 to-green-900/20 relative overflow-hidden rounded-b-lg">
            {/* Simulated Map Interface */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 opacity-90"></div>
            
            {/* Map Points */}
            {events.map((event, index) => (
              <div
                key={event.id}
                className={`absolute w-4 h-4 bg-primary rounded-full cursor-pointer transform -translate-x-2 -translate-y-2 hover:scale-150 transition-professional animate-pulse-glow`}
                style={{
                  left: `${20 + index * 15}%`,
                  top: `${30 + index * 10}%`
                }}
                onClick={() => setSelectedEvent(event)}
              >
                <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-75"></div>
              </div>
            ))}
            
            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm p-3 rounded-lg border border-border/50">
              <h4 className="text-sm font-medium mb-2">Legend</h4>
              <div className="space-y-1 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Military Events</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Political Events</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span>Cultural Events</span>
                </div>
              </div>
            </div>
            
            {/* Map Scale */}
            <div className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-sm p-2 rounded border border-border/50">
              <div className="text-xs text-muted-foreground">Scale: 1:50,000,000</div>
            </div>
            
            {/* Center Map Message */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Interactive Historical Map</p>
                <p className="text-xs">Click on points to explore events</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Event Details */}
      {selectedEvent && (
        <Card className="shadow-card border-border/50 animate-fade-in-up">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-primary" />
                {selectedEvent.name}
              </div>
              <Badge variant="secondary">{selectedEvent.date}</Badge>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Event Details</h4>
                <p className="text-muted-foreground mb-4">{selectedEvent.description}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>Coordinates: {selectedEvent.coordinates.join(", ")}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>Type: {selectedEvent.type}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Related Information</h4>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <BookOpen className="w-4 h-4 mr-2" />
                    View Related Articles
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Add to Timeline
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Export Event Data
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Event List */}
      <Card className="shadow-card border-border/50">
        <CardHeader>
          <CardTitle>Historical Events on Map</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-3">
            {events.map((event) => (
              <div 
                key={event.id}
                className="flex items-center justify-between p-3 border border-border/50 rounded-lg hover:border-primary/50 transition-professional cursor-pointer"
                onClick={() => setSelectedEvent(event)}
              >
                <div>
                  <h5 className="font-medium">{event.name}</h5>
                  <p className="text-sm text-muted-foreground">{event.date} • {event.type}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <MapPin className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};