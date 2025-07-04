import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function TestConfiguration() {
  const [confluenceUrl, setConfluenceUrl] = useState("");
  const [testName, setTestName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [enableImageComparison, setEnableImageComparison] = useState(true);
  const [aiModel, setAiModel] = useState("gpt-4");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!confluenceUrl || !testName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Test Configuration Saved",
      description: "Your test is now being prepared by AI agents",
    });

    // Simulate configuration save and redirect
    setTimeout(() => {
      navigate("/execute");
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Configure New Test</h1>
        <p className="text-muted-foreground">
          Set up your automated testing configuration using Confluence documentation
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Configuration */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Basic Configuration</CardTitle>
              <CardDescription>Essential test parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="testName">Test Name *</Label>
                <Input
                  id="testName"
                  placeholder="e.g., Account Balance Verification"
                  value={testName}
                  onChange={(e) => setTestName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confluenceUrl">Confluence Page URL *</Label>
                <Input
                  id="confluenceUrl"
                  placeholder="https://your-company.atlassian.net/wiki/spaces/..."
                  value={confluenceUrl}
                  onChange={(e) => setConfluenceUrl(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of what this test validates..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority Level</Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* AI Configuration */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>AI Agent Configuration</CardTitle>
              <CardDescription>Configure CrewAI settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="aiModel">AI Model</Label>
                <Select value={aiModel} onValueChange={setAiModel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-4">GPT-4 (Recommended)</SelectItem>
                    <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                    <SelectItem value="claude-3">Claude 3</SelectItem>
                    <SelectItem value="llama-2">Llama 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Image Comparison</Label>
                  <p className="text-sm text-muted-foreground">
                    Compare baseline vs result screenshots
                  </p>
                </div>
                <Switch
                  checked={enableImageComparison}
                  onCheckedChange={setEnableImageComparison}
                />
              </div>

              <div className="space-y-3">
                <Label>Active AI Agents</Label>
                <div className="space-y-2">
                  {[
                    { name: "Document Parser", desc: "Extracts test steps from Confluence" },
                    { name: "Screen Navigator", desc: "Navigates desktop application" },
                    { name: "Action Executor", desc: "Performs UI interactions" },
                    { name: "Image Analyzer", desc: "Compares screenshots" },
                    { name: "Report Generator", desc: "Creates detailed reports" }
                  ].map((agent) => (
                    <div key={agent.name} className="flex items-center space-x-2 p-2 border rounded">
                      <div className="h-2 w-2 bg-success rounded-full animate-pulse" />
                      <div className="flex-1">
                        <div className="font-medium text-sm">{agent.name}</div>
                        <div className="text-xs text-muted-foreground">{agent.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview Section */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Configuration Preview</CardTitle>
            <CardDescription>Review your test configuration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Test Name:</span> {testName || "Not specified"}
              </div>
              <div>
                <span className="font-medium">Priority:</span> {priority || "Not specified"}
              </div>
              <div>
                <span className="font-medium">AI Model:</span> {aiModel}
              </div>
              <div>
                <span className="font-medium">Image Comparison:</span> {enableImageComparison ? "Enabled" : "Disabled"}
              </div>
              <div className="md:col-span-2">
                <span className="font-medium">Confluence URL:</span> {confluenceUrl || "Not specified"}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <Button type="button" variant="outline" onClick={() => navigate("/")}>
            Cancel
          </Button>
          <Button type="submit" variant="enterprise" size="lg">
            Configure & Start Test
          </Button>
        </div>
      </form>
    </div>
  );
}