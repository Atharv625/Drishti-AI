
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, AlertTriangle, Camera, MapPin, Shield, MessageSquare } from "lucide-react";

interface MetricsOverviewProps {
  totalAttendees: number;
  activeAlerts: number;
  selectedZone: string;
}

const MetricsOverview = ({ totalAttendees, activeAlerts, selectedZone }: MetricsOverviewProps) => {
  const metrics = [
    {
      title: "Total Attendees",
      value: totalAttendees.toLocaleString(),
      icon: Users,
      color: "text-blue-400",
      bgColor: "bg-blue-900/30",
      borderColor: "border-blue-600"
    },
    {
      title: "Active Alerts",
      value: activeAlerts.toString(),
      icon: AlertTriangle,
      color: "text-red-400",
      bgColor: "bg-red-900/30",
      borderColor: "border-red-600"
    },
    {
      title: "Live Cameras",
      value: "127",
      icon: Camera,
      color: "text-green-400",
      bgColor: "bg-green-900/30",
      borderColor: "border-green-600"
    },
    {
      title: "Response Units",
      value: "24",
      icon: Shield,
      color: "text-purple-400",
      bgColor: "bg-purple-900/30",
      borderColor: "border-purple-600"
    },
    {
      title: "AI Confidence",
      value: "94.2%",
      icon: MessageSquare,
      color: "text-cyan-400",
      bgColor: "bg-cyan-900/30",
      borderColor: "border-cyan-600"
    },
    {
      title: "Zone Status",
      value: "5 Active",
      icon: MapPin,
      color: "text-yellow-400",
      bgColor: "bg-yellow-900/30",
      borderColor: "border-yellow-600"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index} className={`bg-gray-900 ${metric.borderColor} border`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">{metric.title}</p>
                <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
              </div>
              <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                <metric.icon className={`h-5 w-5 ${metric.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MetricsOverview;
