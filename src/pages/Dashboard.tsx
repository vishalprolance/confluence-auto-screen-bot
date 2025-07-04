import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const stats = [
  { 
    title: "Total Tests Executed", 
    value: "1,247", 
    change: "+12%",
    trend: "up"
  },
  { 
    title: "Success Rate", 
    value: "94.2%", 
    change: "+2.1%",
    trend: "up"
  },
  { 
    title: "Avg Execution Time", 
    value: "4.2 min", 
    change: "-0.8 min",
    trend: "down"
  },
  { 
    title: "Active Test Suites", 
    value: "23", 
    change: "+3",
    trend: "up"
  },
];

const recentTests = [
  {
    id: "TEST-001",
    name: "Account Balance Verification",
    status: "success",
    duration: "3.2 min",
    timestamp: "2 hours ago",
    confidence: "98%"
  },
  {
    id: "TEST-002", 
    name: "Transaction History Display",
    status: "running",
    duration: "1.8 min",
    timestamp: "5 minutes ago",
    confidence: "95%"
  },
  {
    id: "TEST-003",
    name: "Fund Transfer Workflow",
    status: "failed",
    duration: "5.1 min", 
    timestamp: "1 hour ago",
    confidence: "87%"
  },
];

const aiAgents = [
  {
    name: "Screen Navigator",
    status: "active",
    tasks: 12,
    description: "Navigating application screens"
  },
  {
    name: "Image Comparator", 
    status: "active",
    tasks: 8,
    description: "Comparing baseline vs results"
  },
  {
    name: "Report Generator",
    status: "idle",
    tasks: 0, 
    description: "Generating test reports"
  },
  {
    name: "Data Validator",
    status: "active",
    tasks: 5,
    description: "Validating test data"
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold gradient-primary bg-clip-text text-transparent">
          AI-Powered Desktop Testing
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Automate legacy banking application testing with intelligent AI agents that understand your Confluence documentation
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/configure">
            <Button variant="enterprise" size="lg">
              Start New Test
            </Button>
          </Link>
          <Link to="/results">
            <Button variant="outline" size="lg">
              View Reports
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-card hover:shadow-elegant transition-smooth">
            <CardHeader className="pb-2">
              <CardDescription>{stat.title}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className={`text-sm ${stat.trend === 'up' ? 'text-success' : 'text-primary'}`}>
                {stat.change} from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Tests */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Recent Test Executions</CardTitle>
            <CardDescription>Latest automated test runs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTests.map((test) => (
                <div key={test.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-smooth">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{test.name}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        test.status === 'success' ? 'bg-success/20 text-success' :
                        test.status === 'running' ? 'status-running text-white' :
                        'bg-destructive/20 text-destructive'
                      }`}>
                        {test.status}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {test.id} • {test.duration} • {test.timestamp}
                    </div>
                  </div>
                  <div className="text-sm font-medium">
                    {test.confidence}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Agents Status */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>AI Agents Status</CardTitle>
            <CardDescription>CrewAI agents working on your tests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiAgents.map((agent) => (
                <div key={agent.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`h-3 w-3 rounded-full ${
                      agent.status === 'active' ? 'bg-success animate-pulse' : 'bg-muted'
                    }`} />
                    <div>
                      <div className="font-medium">{agent.name}</div>
                      <div className="text-sm text-muted-foreground">{agent.description}</div>
                    </div>
                  </div>
                  <div className="text-sm font-medium">
                    {agent.tasks} tasks
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}