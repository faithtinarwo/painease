import { Link } from "react-router-dom";
import {
  BarChart3,
  Users,
  AlertTriangle,
  Heart,
  TrendingUp,
  TrendingDown,
  Shield,
  Clock,
  FileCheck,
  ArrowLeft,
  Download,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

const statsData = [
  {
    title: "Today's Verifications",
    value: "247",
    change: "+12%",
    trend: "up",
    icon: FileCheck,
    color: "text-primary",
  },
  {
    title: "Citizens Verified",
    value: "189",
    change: "+8%",
    trend: "up",
    icon: Users,
    color: "text-success",
  },
  {
    title: "Red Flags",
    value: "12",
    change: "-5%",
    trend: "down",
    icon: AlertTriangle,
    color: "text-warning",
  },
  {
    title: "System Uptime",
    value: "99.9%",
    change: "0%",
    trend: "stable",
    icon: Shield,
    color: "text-success",
  },
];

const recentVerifications = [
  {
    id: "VER-001",
    patientId: "SA8901234567890",
    category: "citizen",
    eligibility: "free_care",
    timestamp: "2024-01-15 09:30",
    confidence: 95,
    status: "completed",
  },
  {
    id: "VER-002",
    patientId: "PP123456789",
    category: "legal_immigrant",
    eligibility: "partial_payment",
    timestamp: "2024-01-15 09:28",
    confidence: 87,
    status: "completed",
  },
  {
    id: "VER-003",
    patientId: "ASY987654321",
    category: "undocumented",
    eligibility: "manual_review",
    timestamp: "2024-01-15 09:25",
    confidence: 65,
    status: "review_pending",
  },
  {
    id: "VER-004",
    patientId: "SA7801234567891",
    category: "citizen",
    eligibility: "free_care",
    timestamp: "2024-01-15 09:22",
    confidence: 98,
    status: "completed",
  },
  {
    id: "VER-005",
    patientId: "WP555666777",
    category: "legal_immigrant",
    eligibility: "full_payment",
    timestamp: "2024-01-15 09:20",
    confidence: 92,
    status: "completed",
  },
];

const alerts = [
  {
    id: 1,
    type: "fraud",
    message: "Duplicate document detected for patient SA8901234567890",
    timestamp: "2024-01-15 09:15",
    severity: "high",
  },
  {
    id: 2,
    type: "system",
    message: "Document scanner maintenance scheduled for 15:00",
    timestamp: "2024-01-15 08:30",
    severity: "medium",
  },
  {
    id: 3,
    type: "quota",
    message: "Daily verification quota 80% reached",
    timestamp: "2024-01-15 08:00",
    severity: "low",
  },
];

export default function Dashboard() {
  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "citizen":
        return (
          <Badge className="bg-success text-success-foreground">Citizen</Badge>
        );
      case "legal_immigrant":
        return (
          <Badge className="bg-primary text-primary-foreground">Legal</Badge>
        );
      case "undocumented":
        return <Badge variant="destructive">Undocumented</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getEligibilityBadge = (eligibility: string) => {
    switch (eligibility) {
      case "free_care":
        return (
          <Badge className="bg-success text-success-foreground">Free</Badge>
        );
      case "partial_payment":
        return (
          <Badge className="bg-warning text-warning-foreground">Partial</Badge>
        );
      case "full_payment":
        return <Badge variant="destructive">Full Pay</Badge>;
      case "manual_review":
        return <Badge variant="outline">Review</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-success text-success-foreground">
            Completed
          </Badge>
        );
      case "review_pending":
        return (
          <Badge className="bg-warning text-warning-foreground">Pending</Badge>
        );
      case "processing":
        return (
          <Badge className="bg-primary text-primary-foreground">
            Processing
          </Badge>
        );
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getAlertSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "border-destructive bg-destructive/5";
      case "medium":
        return "border-warning bg-warning/5";
      case "low":
        return "border-primary bg-primary/5";
      default:
        return "border-border bg-card";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      {/* Navigation */}
      <nav className="border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </Link>
              <div className="h-6 w-px bg-border"></div>
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                  <Heart className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-semibold text-foreground">
                  Admin Dashboard
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Link to="/verify">
                <Button size="sm">New Verification</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Healthcare System Dashboard
          </h1>
          <p className="text-muted-foreground">
            Monitor patient verifications, system performance, and manage
            healthcare eligibility assessments.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <div className="flex items-center mt-1">
                      {stat.trend === "up" && (
                        <TrendingUp className="h-4 w-4 text-success mr-1" />
                      )}
                      {stat.trend === "down" && (
                        <TrendingDown className="h-4 w-4 text-destructive mr-1" />
                      )}
                      <span
                        className={`text-sm ${
                          stat.trend === "up"
                            ? "text-success"
                            : stat.trend === "down"
                              ? "text-destructive"
                              : "text-muted-foreground"
                        }`}
                      >
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg bg-accent/20`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Verifications */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Verifications</CardTitle>
                    <CardDescription>
                      Latest patient eligibility verifications
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Patient ID</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Eligibility</TableHead>
                      <TableHead>Confidence</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentVerifications.map((verification) => (
                      <TableRow key={verification.id}>
                        <TableCell className="font-medium">
                          {verification.id}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {verification.patientId}
                        </TableCell>
                        <TableCell>
                          {getCategoryBadge(verification.category)}
                        </TableCell>
                        <TableCell>
                          {getEligibilityBadge(verification.eligibility)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress
                              value={verification.confidence}
                              className="w-16"
                            />
                            <span className="text-sm">
                              {verification.confidence}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(verification.status)}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {verification.timestamp}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Alerts & Notifications */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Active Alerts</span>
                </CardTitle>
                <CardDescription>
                  System alerts and notifications requiring attention
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-lg border ${getAlertSeverityColor(
                      alert.severity,
                    )}`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">
                          {alert.message}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {alert.timestamp}
                          </span>
                        </div>
                      </div>
                      <Badge
                        variant={
                          alert.severity === "high"
                            ? "destructive"
                            : alert.severity === "medium"
                              ? "default"
                              : "secondary"
                        }
                        className="text-xs"
                      >
                        {alert.severity}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/verify">
                  <Button className="w-full justify-start">
                    <FileCheck className="h-4 w-4 mr-2" />
                    New Patient Verification
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Users
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  System Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>System Performance</CardTitle>
              <CardDescription>
                Real-time system metrics and performance indicators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">CPU Usage</span>
                    <span className="text-sm text-muted-foreground">45%</span>
                  </div>
                  <Progress value={45} />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Memory Usage</span>
                    <span className="text-sm text-muted-foreground">67%</span>
                  </div>
                  <Progress value={67} />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">
                      API Response Time
                    </span>
                    <span className="text-sm text-muted-foreground">125ms</span>
                  </div>
                  <Progress value={25} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
