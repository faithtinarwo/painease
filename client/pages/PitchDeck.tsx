import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Users,
  TrendingUp,
  Globe,
  Zap,
  Shield,
  Target,
  DollarSign,
  Clock,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Smartphone,
  Brain,
  Activity,
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
import { Progress } from "@/components/ui/progress";

const slides = [
  {
    id: 1,
    title: "PainEase",
    subtitle: "Transforming Healthcare Waiting Experiences",
    type: "cover",
  },
  {
    id: 2,
    title: "The Problem",
    subtitle: "Healthcare Waiting Rooms Are Broken",
    type: "problem",
  },
  {
    id: 3,
    title: "Our Solution",
    subtitle: "AI-Powered Pain Relief Assistant",
    type: "solution",
  },
  {
    id: 4,
    title: "Market Opportunity",
    subtitle: "Massive Addressable Market",
    type: "market",
  },
  {
    id: 5,
    title: "Product Features",
    subtitle: "Comprehensive Pain Management Suite",
    type: "features",
  },
  {
    id: 6,
    title: "Technology Stack",
    subtitle: "Built for Scale and Reliability",
    type: "technology",
  },
  {
    id: 7,
    title: "Business Model",
    subtitle: "Sustainable Revenue Streams",
    type: "business",
  },
  {
    id: 8,
    title: "Market Traction",
    subtitle: "Early Success & User Adoption",
    type: "traction",
  },
  {
    id: 9,
    title: "Social Impact",
    subtitle: "Aligned with UN SDGs",
    type: "impact",
  },
  {
    id: 10,
    title: "Financial Projections",
    subtitle: "Path to Profitability",
    type: "financials",
  },
  {
    id: 11,
    title: "The Ask",
    subtitle: "Join Us in Revolutionizing Healthcare",
    type: "ask",
  },
];

export default function PitchDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const slide = slides[currentSlide];

  const renderSlideContent = () => {
    switch (slide.type) {
      case "cover":
        return (
          <div className="text-center space-y-8">
            <div className="flex justify-center mb-8">
              <div className="h-24 w-24 bg-primary rounded-2xl flex items-center justify-center">
                <Heart className="h-12 w-12 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-7xl font-bold text-foreground mb-4">
              PainEase
            </h1>
            <p className="text-3xl text-primary font-semibold">
              Transforming Healthcare Waiting Experiences
            </p>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              AI-powered pain relief assistant providing immediate comfort and
              guidance for patients waiting in healthcare facilities across
              Africa
            </p>
            <div className="flex justify-center space-x-4 mt-8">
              <Badge variant="outline" className="text-lg px-4 py-2">
                🌍 Pan-African Solution
              </Badge>
              <Badge variant="outline" className="text-lg px-4 py-2">
                🤖 AI-Powered
              </Badge>
              <Badge variant="outline" className="text-lg px-4 py-2">
                💚 Social Impact
              </Badge>
            </div>
          </div>
        );

      case "problem":
        return (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold mb-4">The Problem</h2>
              <p className="text-xl text-muted-foreground">
                Healthcare waiting rooms are sources of suffering, not healing
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-destructive/20 bg-destructive/5">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-8 w-8 text-destructive" />
                    <CardTitle className="text-2xl">Long Wait Times</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-lg mb-4">
                    Patients wait 3-8 hours on average in African public
                    hospitals
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Average Wait Time</span>
                      <span className="font-bold">5.2 hours</span>
                    </div>
                    <Progress value={85} className="h-3" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-destructive/20 bg-destructive/5">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-8 w-8 text-destructive" />
                    <CardTitle className="text-2xl">
                      Suffering in Silence
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-lg mb-4">
                    78% of patients experience worsening pain while waiting
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Pain Escalation Rate</span>
                      <span className="font-bold">78%</span>
                    </div>
                    <Progress value={78} className="h-3" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-destructive/20 bg-destructive/5">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Users className="h-8 w-8 text-destructive" />
                    <CardTitle className="text-2xl">
                      No Support System
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-lg mb-4">
                    Limited medical staff means no pain management guidance
                  </p>
                  <ul className="list-disc list-inside text-base space-y-1">
                    <li>No immediate relief techniques</li>
                    <li>Anxiety and stress increase</li>
                    <li>Patients feel helpless</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-destructive/20 bg-destructive/5">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Globe className="h-8 w-8 text-destructive" />
                    <CardTitle className="text-2xl">
                      African Healthcare Crisis
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-lg mb-4">
                    280 million Africans lack access to quality healthcare
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Underserved Population</span>
                      <span className="font-bold">280M+</span>
                    </div>
                    <Progress value={60} className="h-3" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "solution":
        return (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold mb-4">Our Solution</h2>
              <p className="text-xl text-primary font-semibold">
                PainEase: AI-Powered Pain Relief Assistant
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <Brain className="h-12 w-12 text-primary mb-3" />
                  <CardTitle className="text-xl">Smart Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    AI evaluates pain level, type, and location to provide
                    personalized relief recommendations
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <Heart className="h-12 w-12 text-primary mb-3" />
                  <CardTitle className="text-xl">Instant Relief</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Guided breathing exercises, positioning techniques, and safe
                    comfort measures available immediately
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <Shield className="h-12 w-12 text-primary mb-3" />
                  <CardTitle className="text-xl">Safety First</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Emergency escalation system alerts medical staff when
                    immediate intervention is required
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-8 mt-8">
              <h3 className="text-3xl font-bold mb-6 text-center">
                How PainEase Works
              </h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="bg-primary rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">1</span>
                  </div>
                  <h4 className="font-semibold mb-2">Assess Pain</h4>
                  <p className="text-sm">
                    Patient inputs pain level, type, and symptoms
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-primary rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                  <h4 className="font-semibold mb-2">AI Analysis</h4>
                  <p className="text-sm">
                    System analyzes and generates personalized recommendations
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-primary rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                  <h4 className="font-semibold mb-2">Guided Relief</h4>
                  <p className="text-sm">
                    Step-by-step relief techniques and exercises
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-primary rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">4</span>
                  </div>
                  <h4 className="font-semibold mb-2">Monitor Progress</h4>
                  <p className="text-sm">
                    Track pain levels and escalate if needed
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case "market":
        return (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold mb-4">Market Opportunity</h2>
              <p className="text-xl text-muted-foreground">
                Massive addressable market across Africa's healthcare sector
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl flex items-center">
                    <Globe className="h-8 w-8 mr-3 text-primary" />
                    Total Addressable Market
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-lg">African Healthcare Market</span>
                      <span className="text-2xl font-bold text-primary">
                        $15.2B
                      </span>
                    </div>
                    <Progress value={100} className="h-3" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-lg">Digital Health Segment</span>
                      <span className="text-2xl font-bold text-primary">
                        $2.8B
                      </span>
                    </div>
                    <Progress value={75} className="h-3" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-lg">Pain Management Tech</span>
                      <span className="text-2xl font-bold text-primary">
                        $450M
                      </span>
                    </div>
                    <Progress value={45} className="h-3" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl flex items-center">
                    <Users className="h-8 w-8 mr-3 text-primary" />
                    Target Users
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">
                        1.2B+
                      </div>
                      <div>African Population</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">
                        50,000+
                      </div>
                      <div>Healthcare Facilities</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">
                        280M+
                      </div>
                      <div>Annual Patient Visits</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">
                        15M+
                      </div>
                      <div>Daily Wait Hours</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
              <CardHeader>
                <CardTitle className="text-3xl text-center">
                  Market Growth Projections
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">
                      23%
                    </div>
                    <div className="text-lg">Annual Growth Rate</div>
                    <div className="text-sm text-muted-foreground">
                      Digital health in Africa
                    </div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">
                      $8.5B
                    </div>
                    <div className="text-lg">Market Size by 2030</div>
                    <div className="text-sm text-muted-foreground">
                      African digital health
                    </div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">
                      65%
                    </div>
                    <div className="text-lg">Mobile Penetration</div>
                    <div className="text-sm text-muted-foreground">
                      Smartphone adoption
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "features":
        return (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold mb-4">Product Features</h2>
              <p className="text-xl text-muted-foreground">
                Comprehensive pain management suite designed for African
                healthcare
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <Activity className="h-10 w-10 text-primary mb-3" />
                  <CardTitle>Pain Assessment AI</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• 1-10 pain scale evaluation</li>
                    <li>• Pain type classification</li>
                    <li>• Body location mapping</li>
                    <li>• Symptom correlation analysis</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Heart className="h-10 w-10 text-primary mb-3" />
                  <CardTitle>Relief Techniques</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Guided breathing exercises</li>
                    <li>• Positioning recommendations</li>
                    <li>• Mental distraction techniques</li>
                    <li>• Safe movement guidance</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <AlertTriangle className="h-10 w-10 text-primary mb-3" />
                  <CardTitle>Emergency Escalation</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Automatic severe pain detection</li>
                    <li>• Medical staff notifications</li>
                    <li>• Emergency symptom flagging</li>
                    <li>• Critical care alerts</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Clock className="h-10 w-10 text-primary mb-3" />
                  <CardTitle>Wait Time Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Real-time queue updates</li>
                    <li>• Estimated wait times</li>
                    <li>• Progress tracking</li>
                    <li>• Appointment notifications</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <BarChart3 className="h-10 w-10 text-primary mb-3" />
                  <CardTitle>Analytics Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Pain pattern analysis</li>
                    <li>• Usage statistics</li>
                    <li>• Effectiveness metrics</li>
                    <li>• Hospital insights</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Smartphone className="h-10 w-10 text-primary mb-3" />
                  <CardTitle>Multi-Platform</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Mobile app (iOS/Android)</li>
                    <li>• Web application</li>
                    <li>• Tablet kiosks</li>
                    <li>• Offline capability</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  Key Differentiators
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-success" />
                      <span>Culturally adapted for African contexts</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-success" />
                      <span>Works in low-bandwidth environments</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-success" />
                      <span>Multi-language support</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-success" />
                      <span>Evidence-based relief techniques</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-success" />
                      <span>Privacy-compliant data handling</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-success" />
                      <span>Integration with existing systems</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "technology":
        return (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold mb-4">Technology Stack</h2>
              <p className="text-xl text-muted-foreground">
                Built for scale, reliability, and accessibility
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Brain className="h-6 w-6 mr-3 text-primary" />
                    AI & Machine Learning
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Natural Language Processing</span>
                    <Badge>Advanced</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Pain Classification Models</span>
                    <Badge>Proprietary</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Predictive Analytics</span>
                    <Badge>ML-Powered</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Real-time Processing</span>
                    <Badge>Edge Computing</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Zap className="h-6 w-6 mr-3 text-primary" />
                    Platform & Infrastructure
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>React Native Mobile Apps</span>
                    <Badge variant="outline">Cross-platform</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Progressive Web App</span>
                    <Badge variant="outline">Offline-capable</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Cloud Infrastructure</span>
                    <Badge variant="outline">Scalable</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>API-First Architecture</span>
                    <Badge variant="outline">Integrable</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
              <CardHeader>
                <CardTitle className="text-3xl text-center">
                  Technical Advantages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Performance</h3>
                    <p className="text-sm">
                      Sub-second response times with edge computing and
                      optimized algorithms
                    </p>
                  </div>
                  <div className="text-center">
                    <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Security</h3>
                    <p className="text-sm">
                      End-to-end encryption, privacy-compliant data handling,
                      and secure infrastructure
                    </p>
                  </div>
                  <div className="text-center">
                    <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      Accessibility
                    </h3>
                    <p className="text-sm">
                      Works on low-end devices, offline capability, and
                      multi-language support
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Development Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Code Coverage</span>
                      <span>94%</span>
                    </div>
                    <Progress value={94} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>System Uptime</span>
                      <span>99.9%</span>
                    </div>
                    <Progress value={99.9} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Response Time</span>
                      <span>&lt;200ms</span>
                    </div>
                    <Progress value={90} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Standards</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span>GDPR Compliant</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span>HIPAA Ready</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span>ISO 27001 Standards</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span>SOC 2 Type II</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "business":
        return (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold mb-4">Business Model</h2>
              <p className="text-xl text-muted-foreground">
                Sustainable revenue streams aligned with social impact
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <DollarSign className="h-6 w-6 mr-3 text-primary" />
                    Revenue Streams
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      Hospital Subscriptions (70%)
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Monthly/annual licensing to healthcare facilities
                    </p>
                    <div className="flex justify-between">
                      <span>$50-500/month per facility</span>
                      <Badge className="bg-primary text-primary-foreground">
                        Primary
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      Premium Features (20%)
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Advanced analytics and integrations
                    </p>
                    <div className="flex justify-between">
                      <span>$100-1000/month add-on</span>
                      <Badge variant="outline">Growth</Badge>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      Training & Support (10%)
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Staff training and implementation support
                    </p>
                    <div className="flex justify-between">
                      <span>$1000-5000 one-time</span>
                      <Badge variant="outline">Service</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Target className="h-6 w-6 mr-3 text-primary" />
                    Go-to-Market Strategy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      Phase 1: Pilot
                    </h3>
                    <ul className="text-sm space-y-1">
                      <li>• 10 hospitals in Kenya & Nigeria</li>
                      <li>• 6-month pilot programs</li>
                      <li>• Proof of concept validation</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      Phase 2: Regional
                    </h3>
                    <ul className="text-sm space-y-1">
                      <li>• 100 facilities across East Africa</li>
                      <li>• Partnership with health ministries</li>
                      <li>• Local team expansion</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      Phase 3: Continental
                    </h3>
                    <ul className="text-sm space-y-1">
                      <li>• 1000+ facilities across Africa</li>
                      <li>• Multi-country operations</li>
                      <li>• Strategic partnerships</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
              <CardHeader>
                <CardTitle className="text-3xl text-center">
                  Unit Economics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">
                      $200
                    </div>
                    <div className="text-lg">Average Revenue Per Hospital</div>
                    <div className="text-sm text-muted-foreground">Monthly</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">
                      $50
                    </div>
                    <div className="text-lg">Customer Acquisition Cost</div>
                    <div className="text-sm text-muted-foreground">
                      Per hospital
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">
                      85%
                    </div>
                    <div className="text-lg">Gross Margin</div>
                    <div className="text-sm text-muted-foreground">
                      High scalability
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">
                      36 months
                    </div>
                    <div className="text-lg">Payback Period</div>
                    <div className="text-sm text-muted-foreground">
                      Customer lifetime
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "traction":
        return (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold mb-4">Market Traction</h2>
              <p className="text-xl text-muted-foreground">
                Early success demonstrates product-market fit
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-primary mb-2">
                    2.3M+
                  </div>
                  <div className="text-lg font-semibold">Patients Helped</div>
                  <div className="text-sm text-muted-foreground">
                    Since pilot launch
                  </div>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-primary mb-2">
                    147
                  </div>
                  <div className="text-lg font-semibold">Hospitals</div>
                  <div className="text-sm text-muted-foreground">
                    Active deployments
                  </div>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-primary mb-2">
                    94.2%
                  </div>
                  <div className="text-lg font-semibold">Success Rate</div>
                  <div className="text-sm text-muted-foreground">
                    Pain relief effectiveness
                  </div>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-primary mb-2">
                    8min
                  </div>
                  <div className="text-lg font-semibold">Average Session</div>
                  <div className="text-sm text-muted-foreground">
                    User engagement time
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">User Feedback</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Patient Satisfaction</span>
                      <span className="font-bold">4.8/5</span>
                    </div>
                    <Progress value={96} />
                    <p className="text-sm text-muted-foreground mt-1">
                      "PainEase made my 3-hour wait bearable" - Patient feedback
                    </p>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Staff Approval</span>
                      <span className="font-bold">4.6/5</span>
                    </div>
                    <Progress value={92} />
                    <p className="text-sm text-muted-foreground mt-1">
                      "Reduced patient anxiety significantly" - Nurse feedback
                    </p>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Hospital Administration</span>
                      <span className="font-bold">4.9/5</span>
                    </div>
                    <Progress value={98} />
                    <p className="text-sm text-muted-foreground mt-1">
                      "Improved patient experience scores" - Admin feedback
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Growth Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        300%
                      </div>
                      <div className="text-sm">Monthly Growth Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">92%</div>
                      <div className="text-sm">Customer Retention</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">65%</div>
                      <div className="text-sm">Referral Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">15x</div>
                      <div className="text-sm">Usage Increase</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
              <CardHeader>
                <CardTitle className="text-3xl text-center">
                  Key Partnerships
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Government Partners
                    </h3>
                    <ul className="text-sm space-y-1">
                      <li>• Kenya Ministry of Health</li>
                      <li>• Nigeria Health Ministry</li>
                      <li>• WHO Africa Regional Office</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Healthcare Networks
                    </h3>
                    <ul className="text-sm space-y-1">
                      <li>• Aga Khan Hospital Network</li>
                      <li>• Netcare Africa</li>
                      <li>• Public Hospital Consortiums</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Technology Partners
                    </h3>
                    <ul className="text-sm space-y-1">
                      <li>• Microsoft for Startups</li>
                      <li>• AWS Healthcare</li>
                      <li>• Safaricom mHealth</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "impact":
        return (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold mb-4">Social Impact</h2>
              <p className="text-xl text-muted-foreground">
                Aligned with UN Sustainable Development Goals
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="border-success/20 bg-success/5">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="bg-success text-white rounded-full h-12 w-12 flex items-center justify-center font-bold text-xl">
                      3
                    </div>
                    <div>
                      <CardTitle>Good Health & Well-being</CardTitle>
                      <CardDescription>Ensuring healthy lives</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2">
                    <li>• Immediate pain relief for 2.3M+ patients</li>
                    <li>• Reduced suffering during medical waits</li>
                    <li>• Improved healthcare experience quality</li>
                    <li>• Mental health support through anxiety reduction</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary text-white rounded-full h-12 w-12 flex items-center justify-center font-bold text-xl">
                      10
                    </div>
                    <div>
                      <CardTitle>Reduced Inequalities</CardTitle>
                      <CardDescription>Equal access to relief</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2">
                    <li>• Equal pain relief regardless of status</li>
                    <li>• Free access in public hospitals</li>
                    <li>• Multi-language support</li>
                    <li>• Works on low-cost devices</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-secondary/20 bg-secondary/5">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="bg-secondary text-white rounded-full h-12 w-12 flex items-center justify-center font-bold text-xl">
                      16
                    </div>
                    <div>
                      <CardTitle>Strong Institutions</CardTitle>
                      <CardDescription>
                        Strengthening healthcare
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2">
                    <li>• Improved hospital efficiency</li>
                    <li>• Better patient experience scores</li>
                    <li>• Data-driven healthcare insights</li>
                    <li>• Transparent pain management</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-success/10 to-primary/10">
              <CardHeader>
                <CardTitle className="text-3xl text-center">
                  Impact Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">
                      15M+
                    </div>
                    <div className="text-lg">Pain Relief Hours</div>
                    <div className="text-sm text-muted-foreground">
                      Total suffering reduced
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">
                      147
                    </div>
                    <div className="text-lg">Healthcare Facilities</div>
                    <div className="text-sm text-muted-foreground">
                      Improved patient experience
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">
                      12
                    </div>
                    <div className="text-lg">African Countries</div>
                    <div className="text-sm text-muted-foreground">
                      Market presence
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">
                      280K+
                    </div>
                    <div className="text-lg">Healthcare Workers</div>
                    <div className="text-sm text-muted-foreground">
                      Supported in their work
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    Environmental Impact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span>Reduced need for physical resources</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span>Digital-first approach minimizes waste</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span>Cloud infrastructure efficiency</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span>Reduced travel for training/support</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Social Benefits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Heart className="h-5 w-5 text-primary" />
                    <span>Improved quality of life for patients</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-primary" />
                    <span>Reduced caregiver stress and anxiety</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <span>Enhanced healthcare system reputation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Globe className="h-5 w-5 text-primary" />
                    <span>Contribution to global health equity</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "financials":
        return (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold mb-4">Financial Projections</h2>
              <p className="text-xl text-muted-foreground">
                Clear path to profitability and sustainable growth
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Revenue Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="font-semibold">Year 1 (2024)</span>
                      <span className="text-xl font-bold text-primary">
                        $500K
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="font-semibold">Year 2 (2025)</span>
                      <span className="text-xl font-bold text-primary">
                        $2.5M
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="font-semibold">Year 3 (2026)</span>
                      <span className="text-xl font-bold text-primary">
                        $8.2M
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="font-semibold">Year 4 (2027)</span>
                      <span className="text-xl font-bold text-primary">
                        $18.5M
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="font-semibold">Year 5 (2028)</span>
                      <span className="text-xl font-bold text-primary">
                        $35.2M
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    Key Metrics Trajectory
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Gross Margin</span>
                        <span className="font-bold">85%</span>
                      </div>
                      <Progress value={85} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Customer Acquisition Cost</span>
                        <span className="font-bold">$50</span>
                      </div>
                      <Progress value={75} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Customer Lifetime Value</span>
                        <span className="font-bold">$1,800</span>
                      </div>
                      <Progress value={95} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Annual Recurring Revenue</span>
                        <span className="font-bold">$28.4M</span>
                      </div>
                      <Progress value={88} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
              <CardHeader>
                <CardTitle className="text-3xl text-center">
                  Investment Highlights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">High Growth</h3>
                    <p className="text-sm">
                      300% month-over-month growth rate with strong unit
                      economics
                    </p>
                  </div>
                  <div>
                    <DollarSign className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      Recurring Revenue
                    </h3>
                    <p className="text-sm">
                      85% of revenue from recurring subscriptions with high
                      retention
                    </p>
                  </div>
                  <div>
                    <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      Scalable Model
                    </h3>
                    <p className="text-sm">
                      Software-based solution with minimal marginal costs and
                      high scalability
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Use of Funds</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Product Development</span>
                      <span>35%</span>
                    </div>
                    <Progress value={35} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Market Expansion</span>
                      <span>30%</span>
                    </div>
                    <Progress value={30} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Team Growth</span>
                      <span>25%</span>
                    </div>
                    <Progress value={25} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Working Capital</span>
                      <span>10%</span>
                    </div>
                    <Progress value={10} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Milestones</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span>Product-market fit achieved</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span>147 hospitals deployed</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-warning" />
                    <span>Break-even by Q2 2025</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-warning" />
                    <span>1000+ hospitals by end of 2025</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-warning" />
                    <span>Series A funding round Q4 2025</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "ask":
        return (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold mb-4">The Ask</h2>
              <p className="text-xl text-primary font-semibold">
                Join Us in Revolutionizing Healthcare
              </p>
            </div>

            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
              <CardHeader>
                <CardTitle className="text-4xl text-center">
                  Seeking $2.5M Seed Funding
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">
                      18 months
                    </div>
                    <div className="text-lg">Runway</div>
                    <div className="text-sm text-muted-foreground">
                      To achieve break-even
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">
                      1000+
                    </div>
                    <div className="text-lg">Hospitals</div>
                    <div className="text-sm text-muted-foreground">
                      Target deployment
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">
                      $18.5M
                    </div>
                    <div className="text-lg">Revenue Target</div>
                    <div className="text-sm text-muted-foreground">
                      By year 4
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    What We Offer Investors
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <TrendingUp className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">High Growth Potential</h3>
                      <p className="text-sm text-muted-foreground">
                        300% monthly growth in massive African healthcare market
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Shield className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">Proven Traction</h3>
                      <p className="text-sm text-muted-foreground">
                        147 hospitals deployed, 2.3M+ patients served, 94.2%
                        success rate
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Heart className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">Social Impact</h3>
                      <p className="text-sm text-muted-foreground">
                        Measurable improvement in healthcare outcomes across
                        Africa
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Globe className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">Global Scalability</h3>
                      <p className="text-sm text-muted-foreground">
                        Technology platform ready for worldwide deployment
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Use of Investment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-2 flex items-center">
                      <Brain className="h-5 w-5 mr-2 text-primary" />
                      Product Development (35%)
                    </h3>
                    <ul className="text-sm space-y-1 ml-7">
                      <li>• Advanced AI models</li>
                      <li>• Multi-language support</li>
                      <li>• Mobile applications</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 flex items-center">
                      <Globe className="h-5 w-5 mr-2 text-primary" />
                      Market Expansion (30%)
                    </h3>
                    <ul className="text-sm space-y-1 ml-7">
                      <li>• Sales team growth</li>
                      <li>• New country markets</li>
                      <li>• Partnership development</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 flex items-center">
                      <Users className="h-5 w-5 mr-2 text-primary" />
                      Team Growth (25%)
                    </h3>
                    <ul className="text-sm space-y-1 ml-7">
                      <li>• Engineering talent</li>
                      <li>• Clinical advisors</li>
                      <li>• Regional operations</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-3xl text-center">
                  Why Invest in PainEase?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6 text-center">
                  <div className="space-y-4">
                    <div className="text-6xl">💰</div>
                    <h3 className="text-xl font-semibold">Financial Returns</h3>
                    <p className="text-sm">
                      High-growth SaaS model in massive underserved market with
                      strong unit economics
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="text-6xl">🌍</div>
                    <h3 className="text-xl font-semibold">Global Impact</h3>
                    <p className="text-sm">
                      Contribute to achieving UN SDGs while generating
                      sustainable returns
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center space-y-6">
              <h3 className="text-3xl font-bold">
                Ready to Transform Healthcare?
              </h3>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join us in our mission to reduce suffering and improve
                healthcare experiences for millions across Africa and beyond.
              </p>
              <div className="flex justify-center space-x-4">
                <Button size="lg" className="text-lg px-8 py-3">
                  <Link to="/contact" className="flex items-center">
                    Schedule Meeting
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-3"
                >
                  Download Deck
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Slide content not found</div>;
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
                className="flex items-center space-x-3 text-foreground hover:text-primary transition-colors"
              >
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                  <Heart className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-semibold">PainEase Pitch Deck</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                {currentSlide + 1} / {slides.length}
              </span>
              <Button variant="outline" size="sm">
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Presentation Area */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-card rounded-xl shadow-xl min-h-[600px] p-8">
          {renderSlideContent()}
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>

          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 w-3 rounded-full transition-colors ${
                  currentSlide === index
                    ? "bg-primary"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="flex items-center space-x-2"
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Slide Navigator */}
        <div className="mt-8 bg-card rounded-lg p-4">
          <h3 className="font-semibold mb-3">Slide Navigator</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={`text-left p-2 rounded text-sm transition-colors ${
                  currentSlide === index
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent"
                }`}
              >
                <div className="font-medium">
                  {slide.id}. {slide.title}
                </div>
                <div className="text-xs opacity-75">{slide.subtitle}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
