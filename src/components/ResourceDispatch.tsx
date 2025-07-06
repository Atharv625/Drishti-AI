
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, MapPin, Clock, Users, AlertTriangle } from "lucide-react";
import { useState } from "react";

const ResourceDispatch = () => {
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);

  const responseUnits = [
    {
      id: "SEC-01",
      type: "Security",
      status: "available",
      location: "Main Stage Perimeter",
      eta: "2 min",
      assignment: null,
      personnel: 2
    },
    {
      id: "EMT-01",
      type: "Medical",
      status: "responding",
      location: "En route to Food Court",
      eta: "3 min",
      assignment: "Medical Emergency - INC-2024-002",
      personnel: 3
    },
    {
      id: "SEC-05",
      type: "Security",
      status: "on-duty",
      location: "West Zone Barrier",
      eta: "1 min",
      assignment: "Crowd Control - West Zone",
      personnel: 4
    },
    {
      id: "FIRE-01",
      type: "Fire Safety",
      status: "available",
      location: "Fire Station Alpha",
      eta: "5 min",
      assignment: null,
      personnel: 6
    },
    {
      id: "SEC-12",
      type: "Security",
      status: "responding",
      location: "VIP Area",
      eta: "4 min",
      assignment: "Lost Child - INC-2024-003",
      personnel: 1
    },
    {
      id: "EMT-02",
      type: "Medical",
      status: "available",
      location: "Medical Tent B",
      eta: "3 min",
      assignment: null,
      personnel: 2
    }
  ];

  const incidents = [
    {
      id: "INC-2024-005",
      type: "Suspicious Activity",
      location: "Entrance B",
      priority: "medium",
      needsResponse: true
    },
    {
      id: "INC-2024-006",
      type: "Crowd Buildup",
      location: "Merchandise Area",
      priority: "low",
      needsResponse: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'border-green-500 text-green-400 bg-green-900/30';
      case 'responding': return 'border-blue-500 text-blue-400 bg-blue-900/30';
      case 'on-duty': return 'border-yellow-500 text-yellow-400 bg-yellow-900/30';
      case 'off-duty': return 'border-gray-500 text-gray-400 bg-gray-900/30';
      default: return 'border-gray-500 text-gray-400 bg-gray-900/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Security': return Shield;
      case 'Medical': return Users;
      case 'Fire Safety': return AlertTriangle;
      default: return Shield;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 text-red-400 bg-red-900/30';
      case 'medium': return 'border-yellow-500 text-yellow-400 bg-yellow-900/30';
      case 'low': return 'border-green-500 text-green-400 bg-green-900/30';
      default: return 'border-gray-500 text-gray-400 bg-gray-900/30';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Available Units */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Response Units
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {responseUnits.map((unit) => {
              const IconComponent = getTypeIcon(unit.type);
              return (
                <div
                  key={unit.id}
                  className={`p-4 bg-gray-800 rounded-lg border border-gray-600 cursor-pointer transition-all ${
                    selectedUnit === unit.id ? 'border-blue-500 bg-blue-900/20' : 'hover:border-gray-500'
                  }`}
                  onClick={() => setSelectedUnit(selectedUnit === unit.id ? null : unit.id)}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-900/50 rounded-lg">
                          <IconComponent className="h-4 w-4 text-blue-400" />
                        </div>
                        <div>
                          <div className="font-semibold text-white">{unit.id}</div>
                          <div className="text-sm text-gray-400">{unit.type} Team</div>
                        </div>
                      </div>
                      <Badge className={getStatusColor(unit.status)}>
                        {unit.status.toUpperCase()}
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-300">
                        <MapPin className="h-4 w-4" />
                        {unit.location}
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Clock className="h-4 w-4" />
                        ETA: {unit.eta}
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Users className="h-4 w-4" />
                        {unit.personnel} Personnel
                      </div>
                      {unit.assignment && (
                        <div className="text-cyan-400 font-medium">
                          Assigned: {unit.assignment}
                        </div>
                      )}
                    </div>

                    {unit.status === 'available' && (
                      <div className="flex gap-2 pt-2 border-t border-gray-700">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Dispatch
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                          Contact
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Incident Queue & Dispatch */}
      <div className="space-y-6">
        {/* Pending Incidents */}
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-red-400 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Pending Response
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {incidents.map((incident) => (
                <div key={incident.id} className="p-4 bg-gray-800 rounded-lg border border-gray-600">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-white">{incident.type}</div>
                        <div className="text-sm text-gray-400">#{incident.id}</div>
                      </div>
                      <Badge className={getPriorityColor(incident.priority)}>
                        {incident.priority.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <MapPin className="h-4 w-4" />
                      {incident.location}
                    </div>

                    <div className="flex gap-2">
                      <Select>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Select Unit" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          {responseUnits.filter(unit => unit.status === 'available').map(unit => (
                            <SelectItem key={unit.id} value={unit.id}>
                              {unit.id} - {unit.type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Assign
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Unit Statistics */}
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-green-400">Unit Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-green-900/30 border border-green-600 rounded-lg">
                <div className="text-2xl font-bold text-green-400">8</div>
                <div className="text-sm text-gray-300">Available</div>
              </div>
              <div className="text-center p-3 bg-blue-900/30 border border-blue-600 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">6</div>
                <div className="text-sm text-gray-300">Responding</div>
              </div>
              <div className="text-center p-3 bg-yellow-900/30 border border-yellow-600 rounded-lg">
                <div className="text-2xl font-bold text-yellow-400">10</div>
                <div className="text-sm text-gray-300">On Duty</div>
              </div>
              <div className="text-center p-3 bg-gray-800 border border-gray-600 rounded-lg">
                <div className="text-2xl font-bold text-gray-400">2</div>
                <div className="text-sm text-gray-300">Off Duty</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResourceDispatch;
