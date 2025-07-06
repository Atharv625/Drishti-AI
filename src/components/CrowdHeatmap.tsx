
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Users, AlertTriangle } from "lucide-react";
import { useState } from "react";

const CrowdHeatmap = () => {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  const zones = [
    { id: 'main-stage', name: 'Main Stage', density: 87, risk: 'high', x: 40, y: 30, attendees: 12500 },
    { id: 'food-court', name: 'Food Court', density: 65, risk: 'medium', x: 70, y: 60, attendees: 8200 },
    { id: 'entrance-a', name: 'Entrance A', density: 92, risk: 'critical', x: 20, y: 80, attendees: 15000 },
    { id: 'vip-area', name: 'VIP Area', density: 45, risk: 'low', x: 60, y: 20, attendees: 3400 },
    { id: 'merchandise', name: 'Merchandise', density: 72, risk: 'medium', x: 80, y: 40, attendees: 6800 }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'border-red-500 text-red-400 bg-red-900/30';
      case 'high': return 'border-orange-500 text-orange-400 bg-orange-900/30';
      case 'medium': return 'border-yellow-500 text-yellow-400 bg-yellow-900/30';
      case 'low': return 'border-green-500 text-green-400 bg-green-900/30';
      default: return 'border-gray-500 text-gray-400 bg-gray-900/30';
    }
  };

  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader>
        <CardTitle className="text-cyan-400 flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Real-Time Crowd Density Heatmap
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Venue Map */}
          <div className="bg-gray-800 rounded-lg p-4 h-96 relative overflow-hidden border border-gray-600">
            {/* Background grid */}
            <div className="absolute inset-0 opacity-20">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#374151" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Zone markers */}
            {zones.map((zone) => (
              <div
                key={zone.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 ${
                  selectedZone === zone.id ? 'scale-125 z-10' : 'hover:scale-110'
                }`}
                style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
                onClick={() => setSelectedZone(selectedZone === zone.id ? null : zone.id)}
              >
                <div className={`w-6 h-6 rounded-full ${getRiskColor(zone.risk)} animate-pulse border-2 border-white shadow-lg`}>
                  <div className={`absolute inset-0 rounded-full ${getRiskColor(zone.risk)} opacity-30 animate-ping`}></div>
                </div>
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-xs text-white bg-black/80 px-2 py-1 rounded whitespace-nowrap">
                  {zone.name}
                </div>
              </div>
            ))}

            {/* Heat overlay effect */}
            <div className="absolute inset-0 pointer-events-none">
              {zones.map((zone) => (
                <div
                  key={`heat-${zone.id}`}
                  className={`absolute rounded-full opacity-20 ${getRiskColor(zone.risk)}`}
                  style={{
                    left: `${zone.x - zone.density/4}%`,
                    top: `${zone.y - zone.density/4}%`,
                    width: `${zone.density/2}%`,
                    height: `${zone.density/2}%`,
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* Zone Details */}
          {selectedZone && (
            <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-600">
              {zones.filter(z => z.id === selectedZone).map(zone => (
                <div key={zone.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">{zone.name}</h3>
                    <Badge className={getRiskBadgeColor(zone.risk)}>
                      {zone.risk.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Crowd Density</p>
                      <p className="text-xl font-bold text-cyan-400">{zone.density}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Estimated Attendees</p>
                      <p className="text-xl font-bold text-cyan-400">{zone.attendees.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Deploy Unit
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                      View Cameras
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Legend */}
          <div className="mt-4 flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-300">Low Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-300">Medium Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-gray-300">High Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-300">Critical</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CrowdHeatmap;
