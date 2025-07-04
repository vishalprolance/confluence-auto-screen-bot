import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/" },
  { name: "Test Configuration", href: "/configure" },
  { name: "Test Execution", href: "/execute" },
  { name: "Results & Reports", href: "/results" },
];

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm shadow-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 gradient-ai rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AI</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">TestBot AI</h1>
                  <p className="text-xs text-muted-foreground">Desktop Testing Automation</p>
                </div>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link key={item.name} to={item.href}>
                    <Button 
                      variant={isActive ? "enterprise" : "ghost"}
                      className={cn(
                        "transition-smooth",
                        isActive && "shadow-elegant"
                      )}
                    >
                      {item.name}
                    </Button>
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                Settings
              </Button>
              <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground text-sm font-medium">U</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}