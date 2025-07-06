
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, Clock, MapPin, Search, Users, Camera } from "lucide-react";
import { useState } from "react";

const IncidentTracker = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSeverity, setFilterSeverity] = useState("all");

  const incidents = [
    {
      id: "INC-2024-001",
      type: "Medical Emergency",
      location: "Main Stage - Pit Area",
      severity: "critical",
      status: "responding",
      time: "14:23",
      description: "Cardiac event, patient unconscious",
      responders: ["EMT-01", "SEC-12"],
      eta: "2 min"
    },
    {
      id: "INC-2024-002",
      type: "Crowd Surge",
      location: "West Zone - Barrier 7",
      severity: "high",
      status: "contained",
      time: "14:15",
      description: "Dangerous crowd compression detected",
      responders: ["SEC-05", "SEC-08", "SEC-15"],
      eta: "resolved"
    },
    {
      id: "INC-2024-003",
      type: "Lost Child",
      location: "Food Court - Vendor Row",
      severity: "medium",
      status: "investigating",
      time: "14:05",
      description: "8-year-old separated from parents",
      responders: ["SEC-03"],
      eta: "ongoing"
    },
    {
      id: "INC-2024-004",
      type: "Fire Alert",
      location: "Backstage - Equipment Tent",
      severity: "high",
      status: "resolved",
      time: "13:45",
      description: "Electrical fire in sound equipment",
      responders: ["FIRE-01", "TECH-02"],
      eta: "resolved"
    },
    {
      id: "INC-2024-005",
      type: "Suspicious Activity",
      location: "Entrance B - Security Check",
      severity: "low",
      status: "monitoring",
      time: "13:30",
      description: "Individual acting erratically",
      responders: ["SEC-20"],
      eta: "monitoring"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-red-500 text-red-400 bg-red-900/30';
      case 'high': return 'border-orange-500 text-orange-400 bg-orange-900/30';
      case 'medium': return 'border-yellow-500 text-yellow-400 bg-yellow-900/30';
      case 'low': return 'border-green-500 text-green-400 bg-green-900/30';
      default: return 'border-gray-500 text-gray-400 bg-gray-900/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'responding': return 'bg-red-500';
      case 'contained': return 'bg-blue-500';
      case 'investigating': return 'bg-yellow-500';
      case 'resolved': return 'bg-green-500';
      case 'monitoring': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = incident.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = filterSeverity === "all" || incident.severity === filterSeverity;
    return matchesSearch && matchesSeverity;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="bg-gray-900 border-gray-700">
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search incidents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-600 text-white"
                />
              </div>
            </div>
            <Select value={filterSeverity} onValueChange={setFilterSeverity}>
              <SelectTrigger className="w-48 bg-gray-800 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Incidents List */}
      <div className="grid gap-4">
        {filteredIncidents.map((incident) => (
          <Card key={incident.id} className="bg-gray-900 border-gray-700">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(incident.status)} animate-pulse`}></div>
                      <h3 className="text-lg font-semibold text-white">{incident.type}</h3>
                      <span className="text-sm text-gray-400">#{incident.id}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <MapPin className="h-4 w-4" />
                      {incident.location}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getSeverityColor(incident.severity)}>
                      {incident.severity.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className="border-gray-600 text-gray-300">
                      {incident.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3">
                  <p className="text-gray-300">{incident.description}</p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Clock className="h-4 w-4" />
                        {incident.time}
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Users className="h-4 w-4" />
                        {incident.responders.join(", ")}
                      </div>
                    </div>
                    <div className="text-cyan-400 font-semibold">
                      ETA: {incident.eta}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2 border-t border-gray-700">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    View Details
                  </Button>
                  <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                    <Camera className="h-4 w-4 mr-1" />
                    View Feeds
                  </Button>
                  <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                    Add Responder
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default IncidentTracker;
