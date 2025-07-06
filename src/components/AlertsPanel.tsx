
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, MapPin, Users } from "lucide-react";

const AlertsPanel = () => {
  const alerts = [
    {
      id: 1,
      type: "Bottleneck Prediction",
      location: "West Zone - Main Stage",
      severity: "high",
      time: "2 min ago",
      description: "AI predicts dangerous crowd buildup in 12 minutes",
      eta: "12 min",
      status: "active"
    },
    {
      id: 2,
      type: "Medical Emergency",
      location: "Food Court - Section B",
      severity: "critical",
      time: "5 min ago",
      description: "Person down, requires immediate medical attention",
      eta: "dispatched",
      status: "responding"
    },
    {
      id: 3,
      type: "Anomaly Detection",
      location: "Entrance A",
      severity: "medium",
      time: "8 min ago",
      description: "Unusual crowd behavior pattern detected",
      eta: "monitoring",
      status: "investigating"
    },
    {
      id: 4,
      type: "Lost Person",
      location: "VIP Area",
      severity: "low",
      time: "15 min ago",
      description: "Child separated from guardian - photo match active",
      eta: "scanning",
      status: "searching"
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
      case 'active': return 'bg-red-500';
      case 'responding': return 'bg-blue-500';
      case 'investigating': return 'bg-yellow-500';
      case 'searching': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader>
        <CardTitle className="text-red-400 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Active Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {alerts.map((alert) => (
            <div key={alert.id} className="p-4 bg-gray-800 rounded-lg border border-gray-600 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(alert.status)} animate-pulse`}></div>
                  <span className="font-semibold text-white">{alert.type}</span>
                </div>
                <Badge className={getSeverityColor(alert.severity)}>
                  {alert.severity.toUpperCase()}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <MapPin className="h-4 w-4" />
                  {alert.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Clock className="h-4 w-4" />
                  {alert.time} • ETA: {alert.eta}
                </div>
                <p className="text-sm text-gray-300">{alert.description}</p>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs">
                  View Details
                </Button>
                <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 text-xs">
                  Dispatch
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsPanel;
