import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const testResults = {
  id: "TEST-2024-001",
  name: "Account Balance Verification Test",
  status: "completed",
  executionTime: "4.2 minutes",
  timestamp: "2024-01-15 14:30:25",
  overallScore: 94.2,
  totalSteps: 8,
  passedSteps: 7,
  failedSteps: 1,
  confidence: "96%"
};

const stepResults = [
  { 
    step: "Parse Confluence documentation", 
    status: "passed", 
    confidence: "98%", 
    duration: "12s",
    details: "Successfully extracted 8 test steps from Confluence page"
  },
  { 
    step: "Launch banking application", 
    status: "passed", 
    confidence: "95%", 
    duration: "8s",
    details: "Application launched successfully, splash screen detected"
  },
  { 
    step: "Navigate to login screen", 
    status: "passed", 
    confidence: "99%", 
    duration: "5s",
    details: "Login screen elements identified and validated"
  },
  { 
    step: "Enter user credentials", 
    status: "passed", 
    confidence: "94%", 
    duration: "7s",
    details: "Credentials entered, form validation passed"
  },
  { 
    step: "Verify account balance display", 
    status: "failed", 
    confidence: "87%", 
    duration: "15s",
    details: "Balance amount format differs from baseline image by 12%"
  },
  { 
    step: "Navigate to transaction history", 
    status: "passed", 
    confidence: "96%", 
    duration: "6s",
    details: "Transaction history screen loaded successfully"
  },
  { 
    step: "Compare with baseline screenshots", 
    status: "passed", 
    confidence: "92%", 
    duration: "18s",
    details: "4/5 screenshots matched baseline within tolerance"
  },
  { 
    step: "Generate test report", 
    status: "passed", 
    confidence: "100%", 
    duration: "3s",
    details: "Comprehensive report generated with all findings"
  }
];

const imageComparisons = [
  {
    name: "Login Screen",
    similarity: 99.2,
    status: "passed",
    baseline: "/api/placeholder/300/200",
    result: "/api/placeholder/300/200",
    differences: []
  },
  {
    name: "Account Balance View", 
    similarity: 87.8,
    status: "failed",
    baseline: "/api/placeholder/300/200",
    result: "/api/placeholder/300/200", 
    differences: ["Text formatting differs", "Font size variation detected"]
  },
  {
    name: "Transaction History",
    similarity: 96.5,
    status: "passed",
    baseline: "/api/placeholder/300/200",
    result: "/api/placeholder/300/200",
    differences: ["Minor timestamp format difference"]
  }
];

export default function Results() {
  const [selectedComparison, setSelectedComparison] = useState<number | null>(null);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Test Results & Report</h1>
        <p className="text-muted-foreground">
          Comprehensive analysis of your automated test execution
        </p>
      </div>

      {/* Test Summary */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <span>{testResults.name}</span>
                <Badge variant={testResults.status === "completed" ? "default" : "secondary"}>
                  {testResults.status}
                </Badge>
              </CardTitle>
              <CardDescription>
                Test ID: {testResults.id} • Executed: {testResults.timestamp}
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-success">{testResults.overallScore}%</div>
              <div className="text-sm text-muted-foreground">Overall Score</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-success">{testResults.passedSteps}</div>
              <div className="text-sm text-muted-foreground">Passed</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-destructive">{testResults.failedSteps}</div>
              <div className="text-sm text-muted-foreground">Failed</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold">{testResults.executionTime}</div>
              <div className="text-sm text-muted-foreground">Duration</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold">{testResults.confidence}</div>
              <div className="text-sm text-muted-foreground">Confidence</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Results */}
      <Tabs defaultValue="steps" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="steps">Step Results</TabsTrigger>
          <TabsTrigger value="images">Image Comparison</TabsTrigger>
          <TabsTrigger value="report">Full Report</TabsTrigger>
        </TabsList>

        <TabsContent value="steps" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Step-by-Step Results</CardTitle>
              <CardDescription>Detailed breakdown of each test step</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stepResults.map((result, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg border transition-smooth ${
                      result.status === "passed" ? "bg-success/5 border-success/20" : "bg-destructive/5 border-destructive/20"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={result.status === "passed" ? "default" : "destructive"}
                          className="text-xs"
                        >
                          {result.status}
                        </Badge>
                        <span className="font-medium">{result.step}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {result.duration} • {result.confidence}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{result.details}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Screenshot Comparison Results</CardTitle>
              <CardDescription>Baseline vs actual screenshots with AI analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {imageComparisons.map((comparison, index) => (
                  <div 
                    key={index}
                    className="space-y-3 p-4 border rounded-lg hover:shadow-card transition-smooth cursor-pointer"
                    onClick={() => setSelectedComparison(index)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{comparison.name}</span>
                      <Badge variant={comparison.status === "passed" ? "default" : "destructive"}>
                        {comparison.similarity}%
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <Progress value={comparison.similarity} className="h-2" />
                      <div className="text-xs text-muted-foreground">
                        Similarity: {comparison.similarity}%
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <div className="text-xs font-medium">Baseline</div>
                        <div className="aspect-video bg-muted rounded border flex items-center justify-center">
                          <span className="text-xs">📷 Baseline</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs font-medium">Result</div>
                        <div className="aspect-video bg-muted rounded border flex items-center justify-center">
                          <span className="text-xs">📷 Result</span>
                        </div>
                      </div>
                    </div>

                    {comparison.differences.length > 0 && (
                      <div className="space-y-1">
                        <div className="text-xs font-medium text-destructive">Differences:</div>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {comparison.differences.map((diff, i) => (
                            <li key={i}>• {diff}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="report" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Executive Summary Report</CardTitle>
              <CardDescription>AI-generated comprehensive test report</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold">Test Execution Summary</h3>
                <p className="text-muted-foreground">
                  The automated test suite for the legacy banking application has been successfully executed using 
                  AI agents powered by CrewAI framework. The test was based on Confluence documentation and 
                  achieved an overall success rate of {testResults.overallScore}%.
                </p>

                <h3 className="text-lg font-semibold">Key Findings</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Application navigation and core functionality working as expected</li>
                  <li>• Account balance display format inconsistency detected (87% similarity)</li> 
                  <li>• All security validations passed successfully</li>
                  <li>• Transaction history functionality validated</li>
                  <li>• Performance within acceptable thresholds (4.2 min execution time)</li>
                </ul>

                <h3 className="text-lg font-semibold">Recommendations</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Review account balance display formatting for consistency</li>
                  <li>• Update baseline images to reflect current UI standards</li>
                  <li>• Consider implementing additional validation for number formatting</li>
                  <li>• Schedule regular regression testing for critical workflows</li>
                </ul>

                <h3 className="text-lg font-semibold">AI Agent Performance</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>Document Parser: <span className="font-medium">98% accuracy</span></div>
                  <div>Screen Navigator: <span className="font-medium">95% success rate</span></div>
                  <div>Action Executor: <span className="font-medium">94% precision</span></div>
                  <div>Image Analyzer: <span className="font-medium">92% similarity detection</span></div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button variant="enterprise">Download PDF Report</Button>
                <Button variant="outline">Export to Confluence</Button>
                <Button variant="outline">Schedule Next Run</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}