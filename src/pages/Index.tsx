
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { AlertTriangle, Users, Camera, MapPin, MessageSquare, Shield, Search } from "lucide-react";
import CrowdHeatmap from "@/components/CrowdHeatmap";
import IncidentTracker from "@/components/IncidentTracker";
import AIQueryInterface from "@/components/AIQueryInterface";
import ResourceDispatch from "@/components/ResourceDispatch";
import LiveFeedGrid from "@/components/LiveFeedGrid";
import AlertsPanel from "@/components/AlertsPanel";
import MetricsOverview from "@/components/MetricsOverview";

const Index = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeAlerts, setActiveAlerts] = useState(12);
  const [totalAttendees, setTotalAttendees] = useState(47832);
  const [selectedZone, setSelectedZone] = useState("all");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-lg p-6 mb-6 border border-blue-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-600 p-3 rounded-lg">
              <Shield className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Project Drishti
              </h1>
              <p className="text-blue-200">AI-Powered Crowd Management & Safety Platform</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-mono font-bold">
              {currentTime.toLocaleTimeString()}
            </div>
            <div className="text-blue-200">
              {currentTime.toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      {/* Critical Alerts Banner */}
      <Alert className="mb-6 border-red-600 bg-red-950/50">
        <AlertTriangle className="h-4 w-4 text-red-400" />
        <AlertDescription className="text-red-200">
          <span className="font-semibold">High Priority:</span> Potential bottleneck detected in West Zone - ETA 12 minutes. Response units dispatched.
        </AlertDescription>
      </Alert>

      {/* Metrics Overview */}
      <MetricsOverview 
        totalAttendees={totalAttendees}
        activeAlerts={activeAlerts}
        selectedZone={selectedZone}
      />

      {/* Main Dashboard */}
      <Tabs defaultValue="overview" className="mt-6">
        <TabsList className="grid w-full grid-cols-6 bg-gray-800">
          <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600">
            Overview
          </TabsTrigger>
          <TabsTrigger value="crowd-analysis" className="data-[state=active]:bg-blue-600">
            Crowd Analysis
          </TabsTrigger>
          <TabsTrigger value="incidents" className="data-[state=active]:bg-blue-600">
            Incidents
          </TabsTrigger>
          <TabsTrigger value="ai-query" className="data-[state=active]:bg-blue-600">
            AI Query
          </TabsTrigger>
          <TabsTrigger value="resources" className="data-[state=active]:bg-blue-600">
            Resources
          </TabsTrigger>
          <TabsTrigger value="feeds" className="data-[state=active]:bg-blue-600">
            Live Feeds
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <CrowdHeatmap />
            </div>
            <div>
              <AlertsPanel />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="crowd-analysis" className="mt-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <CrowdHeatmap />
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-cyan-400 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Predictive Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-900/30 border border-yellow-600 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-yellow-400">West Zone Bottleneck Risk</span>
                      <Badge variant="outline" className="border-yellow-500 text-yellow-400">HIGH</Badge>
                    </div>
                    <p className="text-sm text-gray-300">Predicted congestion in 12-15 minutes based on current flow patterns</p>
                    <div className="mt-2">
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                      <span className="text-xs text-gray-400">Risk Level: 78%</span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-green-900/30 border border-green-600 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-green-400">East Zone Flow</span>
                      <Badge variant="outline" className="border-green-500 text-green-400">OPTIMAL</Badge>
                    </div>
                    <p className="text-sm text-gray-300">Crowd flow within safe parameters</p>
                    <div className="mt-2">
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                      </div>
                      <span className="text-xs text-gray-400">Risk Level: 25%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="incidents" className="mt-6">
          <IncidentTracker />
        </TabsContent>

        <TabsContent value="ai-query" className="mt-6">
          <AIQueryInterface />
        </TabsContent>

        <TabsContent value="resources" className="mt-6">
          <ResourceDispatch />
        </TabsContent>

        <TabsContent value="feeds" className="mt-6">
          <LiveFeedGrid />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
