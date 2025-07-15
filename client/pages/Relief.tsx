import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  ArrowLeft,
  AlertTriangle,
  Clock,
  CheckCircle,
  Activity,
  Wind,
  User,
  MapPin,
  Phone,
  Thermometer,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

type PainLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
type PainType =
  | "sharp"
  | "dull"
  | "throbbing"
  | "burning"
  | "cramping"
  | "stabbing";
type BodyPart =
  | "head"
  | "chest"
  | "abdomen"
  | "back"
  | "legs"
  | "arms"
  | "joints";

interface PainAssessment {
  level: PainLevel;
  type: PainType;
  location: BodyPart;
  duration: string;
  symptoms: string[];
}

interface ReliefRecommendation {
  technique: string;
  description: string;
  steps: string[];
  duration: string;
  warning?: string;
}

export default function Relief() {
  const [currentStep, setCurrentStep] = useState<
    "assessment" | "recommendations" | "emergency"
  >("assessment");
  const [painLevel, setPainLevel] = useState<PainLevel[]>([5]);
  const [painType, setPainType] = useState<PainType | "">("");
  const [bodyPart, setBodyPart] = useState<BodyPart | "">("");
  const [duration, setDuration] = useState<string>("");
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<
    ReliefRecommendation[]
  >([]);

  const painLevelDescriptions = {
    1: "No pain",
    2: "Mild pain",
    3: "Moderate pain",
    4: "Moderate-severe pain",
    5: "Severe pain",
    6: "Very severe pain",
    7: "Intense pain",
    8: "Extremely intense pain",
    9: "Excruciating pain",
    10: "Unbearable pain",
  };

  const reliefTechniques = {
    breathing: {
      technique: "Deep Breathing Exercise",
      description: "Slow, controlled breathing to reduce pain and anxiety",
      steps: [
        "Sit or lie down in a comfortable position",
        "Place one hand on your chest, one on your belly",
        "Breathe in slowly through your nose for 4 counts",
        "Hold your breath for 4 counts",
        "Exhale slowly through your mouth for 6 counts",
        "Repeat 5-10 times",
      ],
      duration: "5-10 minutes",
    },
    positioning: {
      technique: "Comfort Positioning",
      description: "Optimal positioning to reduce pressure and pain",
      steps: [
        "Find a comfortable chair or lying position",
        "Use pillows to support painful areas",
        "Elevate legs if experiencing lower body pain",
        "Keep your spine neutral and supported",
        "Change positions every 15-20 minutes",
      ],
      duration: "Ongoing",
    },
    distraction: {
      technique: "Mental Distraction",
      description: "Redirect focus away from pain through mental exercises",
      steps: [
        "Close your eyes and imagine a peaceful place",
        "Count backwards from 100 by 7s",
        "Name 5 things you can see, 4 you can hear, 3 you can touch",
        "Listen to calming music or sounds",
        "Focus on positive memories or experiences",
      ],
      duration: "10-15 minutes",
    },
    movement: {
      technique: "Gentle Movement",
      description: "Light stretching and movement to improve circulation",
      steps: [
        "Start with gentle neck rolls",
        "Slowly roll your shoulders",
        "Stretch your arms above your head",
        "Gently twist your spine left and right",
        "Do ankle circles if seated",
      ],
      duration: "5-10 minutes",
      warning: "Stop if movement increases pain",
    },
  };

  const emergencySymptoms = [
    "Chest pain with shortness of breath",
    "Severe headache with vision changes",
    "Difficulty breathing",
    "Signs of stroke (face drooping, arm weakness, speech difficulty)",
    "Severe abdominal pain",
    "High fever (over 39°C/102°F)",
    "Uncontrolled bleeding",
    "Loss of consciousness",
  ];

  const handleAssessment = () => {
    // Check for emergency symptoms
    const hasEmergencySymptoms = symptoms.some((symptom) =>
      emergencySymptoms.some((emergency) =>
        symptom.toLowerCase().includes(emergency.toLowerCase().split(" ")[0]),
      ),
    );

    if (painLevel[0] >= 8 || hasEmergencySymptoms) {
      setCurrentStep("emergency");
      return;
    }

    // Generate recommendations based on assessment
    const newRecommendations: ReliefRecommendation[] = [];

    // Always include breathing for moderate to severe pain
    if (painLevel[0] >= 4) {
      newRecommendations.push(reliefTechniques.breathing);
    }

    // Add positioning for most pain types
    newRecommendations.push(reliefTechniques.positioning);

    // Add distraction for psychological comfort
    if (painLevel[0] >= 3) {
      newRecommendations.push(reliefTechniques.distraction);
    }

    // Add gentle movement for certain conditions
    if (
      painLevel[0] <= 6 &&
      bodyPart !== "chest" &&
      !symptoms.includes("shortness of breath")
    ) {
      newRecommendations.push(reliefTechniques.movement);
    }

    setRecommendations(newRecommendations);
    setCurrentStep("recommendations");
  };

  const toggleSymptom = (symptom: string) => {
    setSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom],
    );
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
                  PainEase - Pain Relief Assistant
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Phone className="h-4 w-4 mr-2" />
                Emergency: 911
              </Button>
              <Link to="/dashboard">
                <Button size="sm">Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  currentStep === "assessment"
                    ? "bg-primary border-primary text-primary-foreground"
                    : "bg-card border-border text-muted-foreground"
                }`}
              >
                1
              </div>
              <div className="flex-1 h-px bg-border"></div>
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  currentStep === "recommendations"
                    ? "bg-primary border-primary text-primary-foreground"
                    : "bg-card border-border text-muted-foreground"
                }`}
              >
                2
              </div>
              <div className="flex-1 h-px bg-border"></div>
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  currentStep === "emergency"
                    ? "bg-destructive border-destructive text-destructive-foreground"
                    : "bg-card border-border text-muted-foreground"
                }`}
              >
                !
              </div>
            </div>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Pain Assessment</span>
            <span>Relief Recommendations</span>
            <span>Emergency</span>
          </div>
        </div>

        {/* Assessment Step */}
        {currentStep === "assessment" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Pain Assessment</span>
              </CardTitle>
              <CardDescription>
                Help us understand your pain so we can provide the best relief
                recommendations while you wait.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Pain Level */}
              <div>
                <label className="text-sm font-medium">
                  Pain Level (1-10): {painLevel[0]} -{" "}
                  {painLevelDescriptions[painLevel[0] as PainLevel]}
                </label>
                <div className="mt-2">
                  <Slider
                    value={painLevel}
                    onValueChange={setPainLevel}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>No pain</span>
                  <span>Unbearable</span>
                </div>
              </div>

              {/* Pain Type */}
              <div>
                <label className="text-sm font-medium">Type of Pain</label>
                <Select value={painType} onValueChange={setPainType}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select pain type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sharp">Sharp/Stabbing</SelectItem>
                    <SelectItem value="dull">Dull/Aching</SelectItem>
                    <SelectItem value="throbbing">Throbbing</SelectItem>
                    <SelectItem value="burning">Burning</SelectItem>
                    <SelectItem value="cramping">Cramping</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Body Part */}
              <div>
                <label className="text-sm font-medium">Location of Pain</label>
                <Select value={bodyPart} onValueChange={setBodyPart}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select body part" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="head">Head/Neck</SelectItem>
                    <SelectItem value="chest">Chest</SelectItem>
                    <SelectItem value="abdomen">Abdomen</SelectItem>
                    <SelectItem value="back">Back</SelectItem>
                    <SelectItem value="legs">Legs</SelectItem>
                    <SelectItem value="arms">Arms</SelectItem>
                    <SelectItem value="joints">Joints</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Duration */}
              <div>
                <label className="text-sm font-medium">
                  How long have you had this pain?
                </label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minutes">Less than 1 hour</SelectItem>
                    <SelectItem value="hours">1-6 hours</SelectItem>
                    <SelectItem value="day">1 day</SelectItem>
                    <SelectItem value="days">2-7 days</SelectItem>
                    <SelectItem value="weeks">1+ weeks</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Additional Symptoms */}
              <div>
                <label className="text-sm font-medium">
                  Additional Symptoms (select all that apply)
                </label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {[
                    "Nausea",
                    "Dizziness",
                    "Shortness of breath",
                    "Fever",
                    "Sweating",
                    "Numbness",
                    "Tingling",
                    "Weakness",
                  ].map((symptom) => (
                    <Button
                      key={symptom}
                      variant={
                        symptoms.includes(symptom) ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => toggleSymptom(symptom)}
                      className="justify-start"
                    >
                      {symptom}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <Link to="/">
                  <Button variant="outline">Cancel</Button>
                </Link>
                <Button
                  onClick={handleAssessment}
                  disabled={!painType || !bodyPart || !duration}
                  className="min-w-[120px]"
                >
                  Get Relief Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recommendations Step */}
        {currentStep === "recommendations" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-success" />
                  <span>Your Personalized Relief Plan</span>
                </CardTitle>
                <CardDescription>
                  Based on your pain assessment, here are safe techniques you
                  can try while waiting for medical care.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">
                      Pain Level: {painLevel[0]}/10
                    </Badge>
                    <Badge variant="secondary">Type: {painType}</Badge>
                    <Badge variant="secondary">Location: {bodyPart}</Badge>
                  </div>
                </div>

                {painLevel[0] >= 7 && (
                  <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mb-4">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-warning">
                          High Pain Level Detected
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Your pain level indicates you may need immediate
                          medical attention. Please inform the medical staff if
                          your pain worsens.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Tabs defaultValue="techniques" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="techniques">Relief Techniques</TabsTrigger>
                <TabsTrigger value="timer">Guided Sessions</TabsTrigger>
                <TabsTrigger value="progress">Track Progress</TabsTrigger>
              </TabsList>

              <TabsContent value="techniques" className="space-y-4">
                {recommendations.map((rec, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{rec.technique}</CardTitle>
                      <CardDescription>{rec.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-4">
                          <Badge variant="outline">
                            <Clock className="w-3 h-3 mr-1" />
                            {rec.duration}
                          </Badge>
                        </div>

                        {rec.warning && (
                          <div className="flex items-start space-x-2 text-sm text-warning">
                            <AlertTriangle className="w-4 h-4 mt-0.5" />
                            <span>{rec.warning}</span>
                          </div>
                        )}

                        <ol className="list-decimal list-inside space-y-2 text-sm">
                          {rec.steps.map((step, stepIndex) => (
                            <li key={stepIndex}>{step}</li>
                          ))}
                        </ol>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="timer">
                <Card>
                  <CardHeader>
                    <CardTitle>Guided Breathing Session</CardTitle>
                    <CardDescription>
                      Follow along with this guided breathing exercise
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-6">
                      <div className="text-6xl">🫁</div>
                      <div className="text-2xl font-semibold">
                        Breathe In... Hold... Breathe Out...
                      </div>
                      <Progress value={33} className="w-full" />
                      <p className="text-muted-foreground">
                        Session in progress...
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="progress">
                <Card>
                  <CardHeader>
                    <CardTitle>Pain Tracking</CardTitle>
                    <CardDescription>
                      Monitor how your pain changes over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Current Pain Level:</span>
                        <span className="font-semibold">{painLevel[0]}/10</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Time Since Assessment:</span>
                        <span className="font-semibold">5 minutes</span>
                      </div>
                      <Button className="w-full">Update Pain Level</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentStep("assessment")}
              >
                New Assessment
              </Button>
              <div className="space-x-3">
                <Button variant="outline">
                  <Phone className="h-4 w-4 mr-2" />
                  Need Help?
                </Button>
                <Button>Mark as Helpful</Button>
              </div>
            </div>
          </div>
        )}

        {/* Emergency Step */}
        {currentStep === "emergency" && (
          <Card className="border-destructive/20 bg-destructive/5">
            <CardHeader>
              <CardTitle className="text-destructive flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5" />
                <span>Immediate Medical Attention Required</span>
              </CardTitle>
              <CardDescription>
                Based on your symptoms, you need immediate medical evaluation.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                <h4 className="font-semibold text-destructive mb-2">
                  Please inform medical staff immediately that you have:
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Pain level of {painLevel[0]}/10</li>
                  {symptoms.map((symptom, index) => (
                    <li key={index}>{symptom}</li>
                  ))}
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Button
                  size="lg"
                  className="bg-destructive hover:bg-destructive/90 text-white"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Call Emergency Services
                </Button>
                <Button size="lg" variant="outline">
                  <User className="h-5 w-5 mr-2" />
                  Notify Medical Staff
                </Button>
              </div>

              <div className="text-center">
                <Button
                  variant="ghost"
                  onClick={() => setCurrentStep("assessment")}
                  className="text-muted-foreground"
                >
                  Return to Assessment
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
