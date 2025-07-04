import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface TestStep {
  id: string;
  title: string; 
  status: "pending" | "running" | "completed" | "failed";
  duration?: string;
  confidence?: string;
  screenshot?: string;
}

interface Agent {
  name: string;
  status: "active" | "idle" | "error";
  currentTask: string;
  progress: number;
}

export default function TestExecution() {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const navigate = useNavigate();

  const [testSteps, setTestSteps] = useState<TestStep[]>([
    { id: "1", title: "Parse Confluence documentation", status: "completed", duration: "12s", confidence: "98%" },
    { id: "2", title: "Launch banking application", status: "completed", duration: "8s", confidence: "95%" },
    { id: "3", title: "Navigate to login screen", status: "completed", duration: "5s", confidence: "99%" },
    { id: "4", title: "Enter user credentials", status: "running", confidence: "94%" },
    { id: "5", title: "Verify account balance display", status: "pending" },
    { id: "6", title: "Navigate to transaction history", status: "pending" },
    { id: "7", title: "Compare with baseline screenshots", status: "pending" },
    { id: "8", title: "Generate test report", status: "pending" },
  ]);

  const [agents, setAgents] = useState<Agent[]>([
    { name: "Document Parser", status: "active", currentTask: "Analyzing test steps", progress: 100 },
    { name: "Screen Navigator", status: "active", currentTask: "Locating login fields", progress: 75 },
    { name: "Action Executor", status: "active", currentTask: "Entering credentials", progress: 60 },
    { name: "Image Analyzer", status: "idle", currentTask: "Waiting for screenshots", progress: 0 },
    { name: "Report Generator", status: "idle", currentTask: "Preparing report template", progress: 15 },
  ]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = Math.min(prev + 2, 100);
        if (newProgress >= 100) {
          setIsRunning(false);
          setTimeout(() => navigate("/results"), 2000);
        }
        return newProgress;
      });

      // Simulate step progression
      setCurrentStep(prev => Math.min(prev + 0.1, testSteps.length - 1));

      // Update test steps
      setTestSteps(prev => prev.map((step, index) => {
        if (index < Math.floor(currentStep)) {
          return { ...step, status: "completed" as const, duration: `${Math.floor(Math.random() * 20 + 5)}s`, confidence: `${Math.floor(Math.random() * 10 + 90)}%` };
        } else if (index === Math.floor(currentStep)) {
          return { ...step, status: "running" as const };
        }
        return step;
      }));

      // Update agents
      setAgents(prev => prev.map(agent => ({
        ...agent,
        progress: Math.min(agent.progress + Math.random() * 5, 100),
        status: agent.progress >= 100 ? "idle" : "active" as const
      })));

    }, 500);

    return () => clearInterval(interval);
  }, [isRunning, currentStep, navigate, testSteps.length]);

  const handleStop = () => {
    setIsRunning(false);
  };

  const completedSteps = testSteps.filter(step => step.status === "completed").length;
  const totalSteps = testSteps.length;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Test Execution in Progress</h1>
        <p className="text-muted-foreground">
          AI agents are executing your automated test based on Confluence documentation
        </p>
      </div>

      {/* Overall Progress */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Account Balance Verification Test</CardTitle>
              <CardDescription>Testing banking application functionality</CardDescription>
            </div>
            <div className="flex space-x-2">
              {isRunning && (
                <Button variant="outline" onClick={handleStop}>
                  Stop Test
                </Button>
              )}
              <Badge variant={isRunning ? "secondary" : "default"} className="animate-pulse">
                {isRunning ? "Running" : "Completed"}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span>Progress: {completedSteps}/{totalSteps} steps completed</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="text-sm text-muted-foreground">
              Estimated time remaining: {isRunning ? `${Math.max(0, Math.floor((100 - progress) / 10))} minutes` : "Complete"}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Test Steps */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Test Execution Steps</CardTitle>
            <CardDescription>Real-time step progression</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {testSteps.map((step, index) => (
                <div 
                  key={step.id} 
                  className={`flex items-center space-x-3 p-3 rounded-lg border transition-smooth ${
                    step.status === "running" ? "bg-primary/5 border-primary/20" : 
                    step.status === "completed" ? "bg-success/5 border-success/20" :
                    "bg-muted/30"
                  }`}
                >
                  <div className={`h-3 w-3 rounded-full ${
                    step.status === "completed" ? "bg-success" :
                    step.status === "running" ? "bg-primary animate-pulse" :
                    step.status === "failed" ? "bg-destructive" :
                    "bg-muted"
                  }`} />
                  
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{step.title}</div>
                    {step.duration && (
                      <div className="text-xs text-muted-foreground">
                        Duration: {step.duration} • Confidence: {step.confidence}
                      </div>
                    )}
                  </div>

                  <Badge 
                    variant={
                      step.status === "completed" ? "default" :
                      step.status === "running" ? "secondary" :
                      step.status === "failed" ? "destructive" :
                      "outline"
                    }
                    className="text-xs"
                  >
                    {step.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Agents */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>AI Agents Status</CardTitle>
            <CardDescription>CrewAI agents working on your test</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {agents.map((agent) => (
                <div key={agent.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`h-2 w-2 rounded-full ${
                        agent.status === "active" ? "bg-success animate-pulse" :
                        agent.status === "error" ? "bg-destructive" :
                        "bg-muted"
                      }`} />
                      <span className="font-medium text-sm">{agent.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {Math.round(agent.progress)}%
                    </span>
                  </div>
                  
                  <Progress value={agent.progress} className="h-1" />
                  
                  <div className="text-xs text-muted-foreground">
                    {agent.currentTask}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Screenshot */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Live Application View</CardTitle>
          <CardDescription>Current desktop application state</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border-2 border-dashed">
            <div className="text-center space-y-2">
              <div className="text-2xl">🖥️</div>
              <div className="text-sm text-muted-foreground">
                {isRunning ? "Capturing application state..." : "Test completed - View results"}
              </div>
              {isRunning && (
                <div className="h-1 w-32 bg-muted rounded mx-auto">
                  <div className="h-1 bg-primary rounded animate-pulse" style={{ width: "60%" }} />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}