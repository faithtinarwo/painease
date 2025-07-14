import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Upload,
  Camera,
  FileText,
  User,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ArrowLeft,
  Scan,
  Heart,
  Shield,
  Clock,
  DollarSign,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

type VerificationStep = "upload" | "processing" | "results";
type PatientCategory =
  | "citizen"
  | "legal_immigrant"
  | "undocumented"
  | "unknown";

interface VerificationResult {
  category: PatientCategory;
  confidence: number;
  eligibility:
    | "free_care"
    | "partial_payment"
    | "full_payment"
    | "manual_review";
  documentValid: boolean;
  redFlags: string[];
}

export default function Verify() {
  const [currentStep, setCurrentStep] = useState<VerificationStep>("upload");
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState<string>("");

  const simulateVerification = () => {
    setCurrentStep("processing");
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Simulate a verification result
          const mockResult: VerificationResult = {
            category: "citizen",
            confidence: 95,
            eligibility: "free_care",
            documentValid: true,
            redFlags: [],
          };
          setResult(mockResult);
          setCurrentStep("results");
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const resetVerification = () => {
    setCurrentStep("upload");
    setProgress(0);
    setResult(null);
    setSelectedFile(null);
    setDocumentType("");
  };

  const getCategoryBadge = (category: PatientCategory) => {
    switch (category) {
      case "citizen":
        return (
          <Badge className="bg-success text-success-foreground">
            South African Citizen
          </Badge>
        );
      case "legal_immigrant":
        return (
          <Badge className="bg-primary text-primary-foreground">
            Legal Immigrant
          </Badge>
        );
      case "undocumented":
        return <Badge variant="destructive">Undocumented</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getEligibilityInfo = (eligibility: string) => {
    switch (eligibility) {
      case "free_care":
        return {
          icon: Heart,
          text: "Eligible for Free Healthcare",
          description: "Patient qualifies for free public healthcare services",
          color: "text-success",
        };
      case "partial_payment":
        return {
          icon: DollarSign,
          text: "Partial Payment Required",
          description: "Patient should pay reduced fees for services",
          color: "text-warning",
        };
      case "full_payment":
        return {
          icon: DollarSign,
          text: "Full Payment Required",
          description: "Patient must pay full fees for all services",
          color: "text-destructive",
        };
      case "manual_review":
        return {
          icon: AlertTriangle,
          text: "Manual Review Required",
          description: "Case needs administrator evaluation",
          color: "text-warning",
        };
      default:
        return {
          icon: AlertTriangle,
          text: "Status Unknown",
          description: "Unable to determine eligibility",
          color: "text-muted-foreground",
        };
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
                  Patient Verification
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={resetVerification}>
                New Verification
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
                  currentStep === "upload"
                    ? "bg-primary border-primary text-primary-foreground"
                    : "bg-card border-border text-muted-foreground"
                }`}
              >
                1
              </div>
              <div className="flex-1 h-px bg-border"></div>
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  currentStep === "processing"
                    ? "bg-primary border-primary text-primary-foreground"
                    : "bg-card border-border text-muted-foreground"
                }`}
              >
                2
              </div>
              <div className="flex-1 h-px bg-border"></div>
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  currentStep === "results"
                    ? "bg-primary border-primary text-primary-foreground"
                    : "bg-card border-border text-muted-foreground"
                }`}
              >
                3
              </div>
            </div>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Upload Document</span>
            <span>Processing</span>
            <span>Results</span>
          </div>
        </div>

        {/* Upload Step */}
        {currentStep === "upload" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="h-5 w-5" />
                <span>Document Upload & Verification</span>
              </CardTitle>
              <CardDescription>
                Upload a patient's identification document for AI-powered
                verification and eligibility assessment.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="document-type">Document Type</Label>
                <Select value={documentType} onValueChange={setDocumentType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="id">South African ID</SelectItem>
                    <SelectItem value="passport">Passport</SelectItem>
                    <SelectItem value="asylum">Asylum Seeker Permit</SelectItem>
                    <SelectItem value="refugee">Refugee ID</SelectItem>
                    <SelectItem value="work_permit">Work Permit</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Tabs defaultValue="upload" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upload">Upload File</TabsTrigger>
                  <TabsTrigger value="camera">Use Camera</TabsTrigger>
                </TabsList>
                <TabsContent value="upload" className="space-y-4">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Upload Document Image
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Drag and drop your file here, or click to select
                    </p>
                    <Input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileUpload}
                      className="max-w-xs mx-auto"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Supports: JPG, PNG, PDF (Max 10MB)
                    </p>
                  </div>
                  {selectedFile && (
                    <div className="flex items-center space-x-3 p-3 bg-accent rounded-lg">
                      <FileText className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">
                        {selectedFile.name}
                      </span>
                      <Badge variant="secondary">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </Badge>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="camera" className="space-y-4">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Capture Document
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Use your device camera to capture the document
                    </p>
                    <Button variant="outline">
                      <Camera className="h-4 w-4 mr-2" />
                      Open Camera
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end space-x-3">
                <Button variant="outline">
                  <Link to="/">Cancel</Link>
                </Button>
                <Button
                  onClick={simulateVerification}
                  disabled={!selectedFile || !documentType}
                  className="min-w-[120px]"
                >
                  <Scan className="h-4 w-4 mr-2" />
                  Verify Document
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Processing Step */}
        {currentStep === "processing" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                <span>Processing Document</span>
              </CardTitle>
              <CardDescription>
                Our AI system is analyzing the document and verifying patient
                eligibility.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Verification Progress</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="w-full" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="text-sm">
                    Document uploaded successfully
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  {progress > 30 ? (
                    <CheckCircle className="h-5 w-5 text-success" />
                  ) : (
                    <Clock className="h-5 w-5 text-muted-foreground" />
                  )}
                  <span className="text-sm">Scanning and extracting data</span>
                </div>
                <div className="flex items-center space-x-3">
                  {progress > 60 ? (
                    <CheckCircle className="h-5 w-5 text-success" />
                  ) : (
                    <Clock className="h-5 w-5 text-muted-foreground" />
                  )}
                  <span className="text-sm">
                    Validating document authenticity
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  {progress > 90 ? (
                    <CheckCircle className="h-5 w-5 text-success" />
                  ) : (
                    <Clock className="h-5 w-5 text-muted-foreground" />
                  )}
                  <span className="text-sm">
                    Determining eligibility status
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Step */}
        {currentStep === "results" && result && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span>Verification Complete</span>
                </CardTitle>
                <CardDescription>
                  Document has been processed and patient eligibility
                  determined.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">
                      Patient Category
                    </Label>
                    <div className="mt-1">
                      {getCategoryBadge(result.category)}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">
                      Confidence Level
                    </Label>
                    <div className="mt-1 flex items-center space-x-2">
                      <Progress value={result.confidence} className="flex-1" />
                      <span className="text-sm font-medium">
                        {result.confidence}%
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">
                    Document Validity
                  </Label>
                  <div className="mt-1 flex items-center space-x-2">
                    {result.documentValid ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-success" />
                        <span className="text-sm text-success">
                          Valid Document
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4 text-destructive" />
                        <span className="text-sm text-destructive">
                          Invalid Document
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Eligibility Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                {(() => {
                  const eligibilityInfo = getEligibilityInfo(
                    result.eligibility,
                  );
                  return (
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg bg-accent/20`}>
                        <eligibilityInfo.icon
                          className={`h-6 w-6 ${eligibilityInfo.color}`}
                        />
                      </div>
                      <div>
                        <h3
                          className={`font-semibold ${eligibilityInfo.color}`}
                        >
                          {eligibilityInfo.text}
                        </h3>
                        <p className="text-muted-foreground mt-1">
                          {eligibilityInfo.description}
                        </p>
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>

            {result.redFlags.length > 0 && (
              <Card className="border-destructive/20 bg-destructive/5">
                <CardHeader>
                  <CardTitle className="text-destructive flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5" />
                    <span>Red Flags Detected</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-1">
                    {result.redFlags.map((flag, index) => (
                      <li key={index} className="text-sm text-destructive">
                        {flag}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={resetVerification}>
                Verify Another Patient
              </Button>
              <Button>Save to Records</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
