import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  Users,
  Heart,
  BarChart3,
  AlertTriangle,
  FileCheck,
  ArrowRight,
  CheckCircle,
  Clock,
  Globe,
  ChevronRight,
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

const features = [
  {
    icon: Heart,
    title: "Pain Assessment",
    description:
      "AI-powered pain assessment tool that helps identify your pain level and type for appropriate relief recommendations",
  },
  {
    icon: Users,
    title: "Guided Relief",
    description:
      "Step-by-step guided exercises, breathing techniques, and positioning advice for immediate comfort",
  },
  {
    icon: Clock,
    title: "Wait Time Support",
    description:
      "Real-time queue updates and estimated wait times to help you plan your pain management",
  },
  {
    icon: AlertTriangle,
    title: "Emergency Alerts",
    description:
      "Immediate escalation system for severe pain or emergency situations requiring urgent medical attention",
  },
];

const stats = [
  { label: "Patients Helped", value: "2.3M+", icon: Heart },
  { label: "Pain Relief Sessions", value: "147K", icon: Users },
  { label: "Average Wait Time", value: "8min", icon: Clock },
  { label: "Success Rate", value: "94.2%", icon: Shield },
];

const sdgGoals = [
  { number: "3", title: "Good Health & Well-being", color: "bg-green-500" },
  { number: "10", title: "Reduced Inequalities", color: "bg-purple-500" },
  { number: "16", title: "Strong Institutions", color: "bg-blue-500" },
];

export default function Index() {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      {/* Navigation */}
      <nav className="border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">PainEase</h1>
                <p className="text-xs text-muted-foreground">
                  Pain Relief Assistant
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/relief"
                className="text-foreground hover:text-primary transition-colors"
              >
                Pain Relief
              </Link>
              <Link
                to="/dashboard"
                className="text-foreground hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/admin"
                className="text-foreground hover:text-primary transition-colors"
              >
                Admin
              </Link>
              <Button size="sm">Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              <Globe className="w-4 h-4 mr-2" />
              Supporting UN SDG Goals 3, 10 & 16
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Providing{" "}
              <span className="text-primary">Immediate Pain Relief</span> for
              all Africans
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              AI-powered healthcare assistant that provides immediate pain
              relief guidance and comfort measures while patients wait to see
              medical professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-3">
                <Link to="/relief" className="flex items-center">
                  Get Pain Relief
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-3">
                Emergency Help
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-6">
                The Challenge
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-6 w-6 text-warning mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">
                      Long Waiting Times
                    </h4>
                    <p className="text-muted-foreground">
                      Patients suffer in pain for hours while waiting to see
                      medical professionals in overcrowded facilities.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="h-6 w-6 text-warning mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">
                      Limited Pain Management
                    </h4>
                    <p className="text-muted-foreground">
                      Lack of immediate pain relief guidance leaves patients
                      feeling helpless while waiting for medical attention.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Heart className="h-6 w-6 text-warning mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">
                      No Comfort Measures
                    </h4>
                    <p className="text-muted-foreground">
                      Patients don't know what safe, effective methods they can
                      use to reduce pain while waiting for professional care.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-6">
                Our Solution
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-success mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">
                      Instant Pain Assessment
                    </h4>
                    <p className="text-muted-foreground">
                      AI-powered pain evaluation that provides personalized
                      relief recommendations based on your symptoms.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-success mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">
                      Guided Relief Techniques
                    </h4>
                    <p className="text-muted-foreground">
                      Step-by-step breathing exercises, positioning guidance,
                      and safe comfort measures you can do while waiting.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-success mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">
                      Emergency Escalation
                    </h4>
                    <p className="text-muted-foreground">
                      Automatic alerts to medical staff when pain levels
                      indicate the need for immediate professional intervention.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Powerful Features
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage patient eligibility efficiently and
              ethically.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  activeFeature === index ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <CardHeader>
                  <feature.icon className="h-10 w-10 text-primary mb-3" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* UN SDG Section */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-foreground mb-6">
            Aligned with UN Sustainable Development Goals
          </h3>
          <p className="text-lg text-muted-foreground mb-12">
            Our system directly supports global efforts to improve healthcare
            access and reduce inequalities.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {sdgGoals.map((goal, index) => (
              <Card key={index} className="overflow-hidden">
                <div className={`h-3 ${goal.color}`}></div>
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-foreground mb-2">
                    SDG {goal.number}
                  </div>
                  <div className="font-semibold text-foreground">
                    {goal.title}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Card className="p-12 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardContent>
              <h3 className="text-3xl font-bold text-foreground mb-4">
                Ready to Transform Healthcare Access?
              </h3>
              <p className="text-xl text-muted-foreground mb-8">
                Join the movement towards equitable healthcare in South Africa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8 py-3">
                  <Link to="/verify" className="flex items-center">
                    Get Started Today
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-3"
                >
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/95 backdrop-blur">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                  <Heart className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold">PainEase</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Empowering patients across Africa with AI-driven pain relief
                guidance and comfort measures while waiting for medical care.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link
                    to="/relief"
                    className="hover:text-primary transition-colors"
                  >
                    Pain Relief
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="hover:text-primary transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin"
                    className="hover:text-primary transition-colors"
                  >
                    Admin Panel
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>
              &copy; 2024 HealthVerify Healthcare System. All rights reserved.
              POPIA Compliant.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
