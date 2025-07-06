
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Camera, AlertTriangle, Users, MapPin, Maximize2 } from "lucide-react";
import { useState } from "react";

const LiveFeedGrid = () => {
  const [selectedFeed, setSelectedFeed] = useState<string | null>(null);

  const cameraFeeds = [
    {
      id: "CAM-001",
      name: "Main Stage - Center",
      location: "Main Stage Area",
      status: "active",
      alerts: 2,
      crowdDensity: 87,
      riskLevel: "high",
      lastUpdate: "2s ago"
    },
    {
      id: "CAM-012",
      name: "West Zone - Entrance",
      location: "West Zone Barrier",
      status: "active",
      alerts: 5,
      crowdDensity: 92,
      riskLevel: "critical",
      lastUpdate: "1s ago"
    },
    {
      id: "CAM-024",
      name: "Food Court - Overview",
      location: "Food Court Central",
      status: "active", 
      alerts: 0,
      crowdDensity: 65,
      riskLevel: "medium",
      lastUpdate: "3s ago"
    },
    {
      id: "CAM-035",
      name: "VIP Area - Security",
      location: "VIP Entrance",
      status: "active",
      alerts: 0,
      crowdDensity: 45,
      riskLevel: "low",
      lastUpdate: "1s ago"
    },
    {
      id: "CAM-048",
      name: "Parking - North",
      location: "North Parking Lot",
      status: "maintenance",
      alerts: 0,
      crowdDensity: 15,
      riskLevel: "low",
      lastUpdate: "5m ago"
    },
    {
      id: "CAM-067",
      name: "Emergency Exit - A",
      location: "Exit A Corridor",
      status: "active",
      alerts: 1,
      crowdDensity: 30,
      riskLevel: "low",
      lastUpdate: "2s ago"
    },
    {
      id: "DRONE-01",
      name: "Aerial Overview",
      location: "Above Main Stage",
      status: "active",
      alerts: 3,
      crowdDensity: 78,
      riskLevel: "high",
      lastUpdate: "1s ago"
    },
    {
      id: "CAM-089",
      name: "Merchandise Area",
      location: "Vendor Row",
      status: "active",
      alerts: 0,
      crowdDensity: 55,
      riskLevel: "medium",
      lastUpdate: "4s ago"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'border-green-500 text-green-400 bg-green-900/30';
      case 'maintenance': return 'border-yellow-500 text-yellow-400 bg-yellow-900/30';
      case 'offline': return 'border-red-500 text-red-400 bg-red-900/30';
      default: return 'border-gray-500 text-gray-400 bg-gray-900/30';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getRiskBarColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Feed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {cameraFeeds.map((feed) => (
          <Card
            key={feed.id}
            className={`bg-gray-900 border-gray-700 cursor-pointer transition-all hover:border-blue-500 ${
              selectedFeed === feed.id ? 'border-blue-500 ring-2 ring-blue-500/20' : ''
            }`}
            onClick={() => setSelectedFeed(selectedFeed === feed.id ? null : feed.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Camera className="h-4 w-4 text-blue-400" />
                  <span className="text-sm font-semibold text-white">{feed.id}</span>
                </div>
                <Badge className={getStatusColor(feed.status)}>
                  {feed.status.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Video Feed Placeholder */}
              <div className="relative bg-gray-800 rounded-lg overflow-hidden aspect-video">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                    <div className="text-xs text-gray-400">Live Feed</div>
                  </div>
                </div>
                
                {/* Status Indicators */}
                <div className="absolute top-2 left-2 flex gap-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-white bg-black/50 px-1 rounded">LIVE</span>
                </div>
                
                {feed.alerts > 0 && (
                  <div className="absolute top-2 right-2">
                    <div className="bg-red-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      {feed.alerts}
                    </div>
                  </div>
                )}
                
                <Button
                  size="sm"
                  className="absolute bottom-2 right-2 bg-black/50 hover:bg-black/70 p-1 h-auto"
                >
                  <Maximize2 className="h-3 w-3" />
                </Button>
              </div>

              {/* Feed Info */}
              <div className="space-y-2">
                <div>
                  <div className="font-medium text-white text-sm">{feed.name}</div>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <MapPin className="h-3 w-3" />
                    {feed.location}
                  </div>
                </div>

                {/* Crowd Density */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Crowd Density</span>
                    <span className={`font-semibold ${getRiskColor(feed.riskLevel)}`}>
                      {feed.crowdDensity}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full ${getRiskBarColor(feed.riskLevel)}`}
                      style={{ width: `${feed.crowdDensity}%` }}
                    ></div>
                  </div>
                </div>

                {/* Last Update */}
                <div className="text-xs text-gray-500">
                  Updated {feed.lastUpdate}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected Feed Details */}
      {selectedFeed && (
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-blue-400">
              Feed Details - {cameraFeeds.find(f => f.id === selectedFeed)?.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Enhanced Video View */}
              <div className="space-y-4">
                <div className="bg-gray-800 rounded-lg overflow-hidden aspect-video relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                    <div className="text-center">
                      <Camera className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                      <div className="text-lg text-gray-400">Enhanced Live Feed</div>
                      <div className="text-sm text-gray-500">AI Analysis Active</div>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    ● LIVE
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Full Screen
                  </Button>
                  <Button variant="outline" className="border-gray-600 text-gray-300">
                    Record
                  </Button>
                  <Button variant="outline" className="border-gray-600 text-gray-300">
                    Snapshot
                  </Button>
                </div>
              </div>

              {/* AI Analysis */}
              <div className="space-y-4">
                {cameraFeeds.filter(f => f.id === selectedFeed).map(feed => (
                  <div key={feed.id} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-gray-800 rounded-lg border border-gray-600">
                        <div className="text-sm text-gray-400">Crowd Count</div>
                        <div className="text-2xl font-bold text-cyan-400">
                          {Math.floor(feed.crowdDensity * 100)}
                        </div>
                      </div>
                      <div className="p-3 bg-gray-800 rounded-lg border border-gray-600">
                        <div className="text-sm text-gray-400">Risk Level</div>
                        <div className={`text-2xl font-bold ${getRiskColor(feed.riskLevel)}`}>
                          {feed.riskLevel.toUpperCase()}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-white font-semibold">AI Detections</h4>
                      
                      <div className="p-3 bg-yellow-900/30 border border-yellow-600 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-400" />
                          <span className="text-sm font-semibold text-yellow-400">Crowd Flow Anomaly</span>
                        </div>
                        <p className="text-xs text-gray-300">
                          Unusual movement pattern detected - possible bottleneck forming
                        </p>
                      </div>

                      <div className="p-3 bg-blue-900/30 border border-blue-600 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="h-4 w-4 text-blue-400" />
                          <span className="text-sm font-semibold text-blue-400">Crowd Analysis</span>
                        </div>
                        <p className="text-xs text-gray-300">
                          High density cluster detected in southwest quadrant
                        </p>
                      </div>

                      <div className="p-3 bg-green-900/30 border border-green-600 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Camera className="h-4 w-4 text-green-400" />
                          <span className="text-sm font-semibold text-green-400">Visual Quality</span>
                        </div>
                        <p className="text-xs text-gray-300">
                          Optimal lighting and visibility conditions
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LiveFeedGrid;
