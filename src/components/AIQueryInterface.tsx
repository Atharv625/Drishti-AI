
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Bot, User, Clock, AlertTriangle } from "lucide-react";
import { useState } from "react";

const AIQueryInterface = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const exampleQueries = [
    "Summarize security concerns in the West Zone",
    "What's the predicted crowd flow for the next hour?",
    "Show me all medical incidents in the last 2 hours",
    "Analyze crowd sentiment near the main stage",
    "Identify optimal evacuation routes"
  ];

  const conversations = [
    {
      id: 1,
      type: "user",
      message: "Summarize security concerns in the West Zone",
      timestamp: "14:25"
    },
    {
      id: 2,
      type: "ai",
      message: "Based on current analysis of the West Zone:\n\n🔴 **Critical Issues:**\n- High-risk bottleneck predicted in 12 minutes near Barrier 7\n- Crowd density at 87% capacity (safe limit: 75%)\n- Exit route congestion detected\n\n🟡 **Medium Concerns:**\n- Slower than normal crowd flow near food vendors\n- Increased audio complaints suggesting crowd agitation\n\n✅ **Positive Indicators:**\n- Security units positioned optimally\n- No medical emergencies in zone\n- Weather conditions favorable\n\n**Recommendation:** Deploy 2 additional crowd control units to West Zone entrance immediately.",
      timestamp: "14:25"
    },
    {
      id: 3,
      type: "user",
      message: "What evacuation routes are currently optimal?",
      timestamp: "14:27"
    },
    {
      id: 4,
      type: "ai",
      message: "**Optimal Evacuation Routes (Current Conditions):**\n\n🟢 **Primary Routes:**\n- Exit A: Clear, 2.3 min average egress time\n- Exit D: Clear, 2.8 min average egress time\n\n🟡 **Secondary Routes:**\n- Exit B: Moderate congestion, 4.1 min average\n- Exit C: Light congestion, 3.2 min average\n\n🔴 **Avoid:**\n- Exit F: Heavy congestion due to West Zone bottleneck\n\n**Real-time capacity:** 15,000 people can be evacuated within 8 minutes using primary routes.",
      timestamp: "14:27"
    }
  ];

  const handleSendQuery = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    // Simulate AI processing
    setTimeout(() => {
      setLoading(false);
      setQuery("");
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* AI Chat Interface */}
      <div className="lg:col-span-2">
        <Card className="bg-gray-900 border-gray-700 h-[600px] flex flex-col">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center gap-2">
              <Bot className="h-5 w-5" />
              Drishti AI Assistant
              <Badge className="bg-green-900/50 border-green-600 text-green-400">
                Online
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {conversations.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    msg.type === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-800 border border-gray-600 text-gray-100'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      {msg.type === 'user' ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <Bot className="h-4 w-4 text-green-400" />
                      )}
                      <span className="text-xs opacity-70">{msg.timestamp}</span>
                    </div>
                    <div className="whitespace-pre-line text-sm">{msg.message}</div>
                  </div>
                </div>
              ))}
              
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 border border-gray-600 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Bot className="h-4 w-4 text-green-400" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="flex gap-2">
              <Input
                placeholder="Ask Drishti AI anything about the event..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendQuery()}
                className="bg-gray-800 border-gray-600 text-white"
                disabled={loading}
              />
              <Button 
                onClick={handleSendQuery} 
                disabled={loading || !query.trim()}
                className="bg-green-600 hover:bg-green-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Examples */}
      <div className="space-y-6">
        {/* Example Queries */}
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-purple-400 flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Quick Queries
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {exampleQueries.map((example, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full text-left justify-start h-auto p-3 border-gray-600 text-gray-300 hover:bg-gray-800"
                onClick={() => setQuery(example)}
              >
                <div className="text-sm">{example}</div>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-cyan-400 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              AI Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-yellow-900/30 border border-yellow-600 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm font-semibold text-yellow-400">Pattern Detected</span>
              </div>
              <p className="text-xs text-gray-300">
                Unusual crowd behavior suggests potential issue developing near main stage
              </p>
            </div>
            
            <div className="p-3 bg-blue-900/30 border border-blue-600 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-semibold text-blue-400">Prediction</span>
              </div>
              <p className="text-xs text-gray-300">
                Weather data indicates possible rain in 45 minutes - crowd behavior may change
              </p>
            </div>

            <div className="p-3 bg-green-900/30 border border-green-600 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-semibold text-green-400">Optimization</span>
              </div>
              <p className="text-xs text-gray-300">
                Current security deployment is 94% efficient based on crowd patterns
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIQueryInterface;
