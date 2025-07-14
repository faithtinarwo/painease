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
    icon: FileCheck,
    title: "Document Verification",
    description:
      "Advanced AI-powered scanning and verification of ID documents, passports, and asylum papers",
  },
  {
    icon: Users,
    title: "Patient Classification",
    description:
      "Intelligent classification system for South African citizens, legal immigrants, and undocumented individuals",
  },
  {
    icon: BarChart3,
    title: "Admin Dashboard",
    description:
      "Comprehensive analytics and reporting for hospital administrators and healthcare officials",
  },
  {
    icon: AlertTriangle,
    title: "Red Flag Alerts",
    description:
      "Real-time suspicious activity detection and fraud prevention mechanisms",
  },
];

const stats = [
  { label: "Hospitals Served", value: "147", icon: Heart },
  { label: "Patients Verified", value: "2.3M+", icon: Users },
  { label: "Fraud Cases Prevented", value: "1,240", icon: Shield },
  { label: "System Uptime", value: "99.9%", icon: Clock },
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
                <h1 className="text-xl font-bold text-foreground">
                  Batho Pele
                </h1>
                <p className="text-xs text-muted-foreground">
                  Healthcare Eligibility System
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/verify"
                className="text-foreground hover:text-primary transition-colors"
              >
                Verify Patient
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
              Ensuring{" "}
              <span className="text-primary">Equitable Healthcare</span> for All
              South Africans
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              AI-powered patient eligibility verification system that helps
              public hospitals manage resources fairly while maintaining ethical
              healthcare standards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-3">
                <Link to="/verify" className="flex items-center">
                  Start Verification
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-3">
                View Dashboard
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
                      Overwhelmed Resources
                    </h4>
                    <p className="text-muted-foreground">
                      Public hospitals face bed shortages and medicine
                      stock-outs due to undocumented patients.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="h-6 w-6 text-warning mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">
                      Unverified Patients
                    </h4>
                    <p className="text-muted-foreground">
                      Lack of proper verification systems leads to diminished
                      access for citizens.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Heart className="h-6 w-6 text-warning mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">
                      Inequitable Care
                    </h4>
                    <p className="text-muted-foreground">
                      Limited resources aren't being distributed fairly among
                      those who need them most.
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
                      Smart Verification
                    </h4>
                    <p className="text-muted-foreground">
                      AI-powered document scanning and validation for ID,
                      passport, and asylum papers.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-success mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">
                      Fair Classification
                    </h4>
                    <p className="text-muted-foreground">
                      Intelligent patient categorization ensuring appropriate
                      care and billing.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-success mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">
                      POPIA Compliant
                    </h4>
                    <p className="text-muted-foreground">
                      Secure data handling that meets South African privacy
                      regulations.
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
                <span className="text-lg font-bold">Batho Pele</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Empowering South African public hospitals with AI-driven patient
                eligibility verification for equitable healthcare access.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link
                    to="/verify"
                    className="hover:text-primary transition-colors"
                  >
                    Patient Verification
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
              &copy; 2024 Batho Pele Healthcare System. All rights reserved.
              POPIA Compliant.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
