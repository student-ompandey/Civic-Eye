'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  Upload,
  Check,
  MapPin,
  Edit2,
  Loader2,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Brain,
  CheckCircle2,
  AlertCircle,
  ShieldAlert,
  ArrowLeft,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PageContainer } from '@/components/shared/PageContainer';
import { SeverityBadge } from '@/components/ui/severity-badge';
import { IssueSeverity } from '@/types';

// Steps list definition
const STEPS = [
  { number: 1, label: 'Upload Photo' },
  { number: 2, label: 'AI Analysis' },
  { number: 3, label: 'Location' },
  { number: 4, label: 'Review' },
  { number: 5, label: 'Submit' }
];

export default function ReportIssue() {
  const router = useRouter();

  // Multi-step state
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Upload Photo State
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Step 2: AI Analysis State
  const [aiProcessing, setAiProcessing] = useState(false);
  const [aiStepIndex, setAiStepIndex] = useState(0);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [aiData, setAiData] = useState({
    category: 'Road Pothole',
    severity: 'high' as IssueSeverity,
    confidence: 94,
    risk: 'Potential vehicle damage and pedestrian tripping hazard.',
    department: 'Road Maintenance & Repair',
    description: 'A large pothole is visible on the asphalt surface. Requires immediate hot-mix filling.'
  });

  const aiChecklist = [
    'Scanning uploaded image contours...',
    'Detecting asphalt cracks and depth variations...',
    'Identifying category as Road Infrastructure damage...',
    'Evaluating traffic impact and pedestrian risk levels...',
    'Matching with local Department responsibilities...'
  ];

  // Step 3: Location State
  const [useGPS, setUseGPS] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Step 5: Submission State
  const [submitting, setSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [potentialDuplicate, setPotentialDuplicate] = useState<any | null>(null);

  // Handlers for Step 1: Photo Upload
  const handleFileChange = (selectedFile: File) => {
    setUploadError(null);
    
    // File validation: Size <= 5MB
    const maxSize = 5 * 1024 * 1024;
    if (selectedFile.size > maxSize) {
      setUploadError('File size exceeds the 5MB limit. Please upload a smaller image.');
      return;
    }

    // File validation: Types
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(selectedFile.type)) {
      setUploadError('Unsupported file type. Please upload a JPG, PNG, or WEBP image.');
      return;
    }

    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0]);
    }
  };

  const removeImage = () => {
    setFile(null);
    setPreviewUrl(null);
    setUploadError(null);
  };

  // Handlers for Step 2: AI Simulation
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const startAiAnalysis = async () => {
    setAiProcessing(true);
    setAiStepIndex(0);
    setApiError(null);
    setIsDemoMode(false);

    let hasError = false;

    // Start UI checklist simulation
    const checklistInterval = setInterval(() => {
      setAiStepIndex((prev) => {
        if (prev < aiChecklist.length - 1) return prev + 1;
        clearInterval(checklistInterval);
        return prev;
      });
    }, 800);

    try {
      if (!file) throw new Error("No image file selected");
      const base64 = await fileToBase64(file);
      const res = await fetch('/api/analyze-issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64 })
      });
      
      const data = await res.json();

      if (res.status === 503 && data.demo_mode) {
        setIsDemoMode(true);
        // keep default mock data
      } else if (!res.ok) {
        throw new Error(data.error || "Failed to analyze image");
      } else {
        if (data.issueDetected) {
          setAiData({
            category: data.category || 'Other Civic Issue',
            severity: data.severity as IssueSeverity || 'medium',
            confidence: data.confidence || 85,
            risk: data.risk || 'General safety concern.',
            department: data.department || 'General Administration',
            description: data.description || 'Civic issue detected.'
          });
        } else {
          setAiData(prev => ({
            ...prev,
            description: data.reason || "No issue detected",
            confidence: 0
          }));
        }
      }
    } catch (err: any) {
      console.error(err);
      setApiError(err.message || "Something went wrong.");
      hasError = true;
    } finally {
      clearInterval(checklistInterval);
      setAiStepIndex(aiChecklist.length);
      if (!hasError) {
        setTimeout(() => setAiProcessing(false), 500);
      } else {
        setAiProcessing(false);
      }
    }
  };

  // Handlers for Step 3: Location Fetching
  const fetchCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }

    setLocationLoading(true);
    setLocationError(null);
    setUseGPS(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lng: longitude });
        
        // Mocking address details based on GPS
        setTimeout(() => {
          setAddress('45, Link Road, Sector 3A');
          setLandmark('Near Metro Station Pillar 121');
          setCity('Bhopal');
          setStateName('Madhya Pradesh');
          setLocationLoading(false);
        }, 1200);
      },
      (error) => {
        console.error('Geolocation error:', error);
        setLocationError('Unable to retrieve your location. Please enter it manually.');
        setUseGPS(false);
        setLocationLoading(false);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const handleManualLocation = () => {
    setUseGPS(false);
    setCoords(null);
    setAddress('');
    setLandmark('');
    setCity('');
    setStateName('');
  };

  const submitIssue = async () => {
    setSubmitting(true);
    setSubmissionError(null);
    try {
      const base64 = await fileToBase64(file!);
      const payload = {
        title: aiData.category,
        description: aiData.description,
        category: aiData.category,
        severity: aiData.severity,
        latitude: coords?.lat || 0,
        longitude: coords?.lng || 0,
        address,
        landmark,
        city,
        state: stateName,
        aiConfidence: aiData.confidence,
        aiRisk: aiData.risk,
        department: aiData.department,
        imageUrl: base64
      };

      const res = await fetch('/api/issues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit issue');
      
      setSubmittedId(data.id);
      setCurrentStep(5);
    } catch (err: any) {
      console.error(err);
      setSubmissionError(err.message || 'Something went wrong during submission.');
    } finally {
      setSubmitting(false);
    }
  };

  const confirmExistingIssue = async () => {
    if (!potentialDuplicate?.existingIssue?.id) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/issues/${potentialDuplicate.existingIssue.id}/support`, {
        method: 'POST',
      });
      if (!res.ok) throw new Error('Failed to support issue');
      setSubmittedId(potentialDuplicate.existingIssue.id);
      setCurrentStep(5);
    } catch (err: any) {
      console.error(err);
      setSubmissionError(err.message || 'Failed to confirm existing issue.');
    } finally {
      setSubmitting(false);
    }
  };

  // Navigation Logic
  const handleNext = async () => {
    if (currentStep === 1) {
      if (!file) {
        setUploadError('Please select or capture a photo before proceeding.');
        return;
      }
      setCurrentStep(2);
      startAiAnalysis();
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      if (!address || !city || !stateName) {
        setLocationError('Please provide address, city, and state information.');
        return;
      }
      setCurrentStep(4);
    } else if (currentStep === 4) {
      setSubmitting(true);
      setSubmissionError(null);
      try {
        const payloadCheck = {
          latitude: coords?.lat || 0,
          longitude: coords?.lng || 0,
          category: aiData.category,
          description: aiData.description
        };

        const dupRes = await fetch('/api/issues/check-duplicate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payloadCheck)
        });

        if (dupRes.ok) {
          const dupData = await dupRes.json();
          if (dupData.isDuplicate) {
            setPotentialDuplicate(dupData);
            setCurrentStep(4.5); // New duplicate confirmation step
            return;
          }
        }

        await submitIssue();
      } catch (err: any) {
        console.error(err);
        setSubmissionError(err.message || 'Failed to check for duplicates.');
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1 && currentStep < 5) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const resetForm = () => {
    setFile(null);
    setPreviewUrl(null);
    setUploadError(null);
    setUseGPS(false);
    setAddress('');
    setLandmark('');
    setCity('');
    setStateName('');
    setCoords(null);
    setLocationError(null);
    setCurrentStep(1);
  };

  return (
    <div className="flex-1 py-10 bg-[#0d0d0d] text-white relative">
      <PageContainer className="max-w-3xl w-full mx-auto px-4 flex flex-col gap-8">
        
        {/* Header navigation */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-zinc-400 hover:text-foreground text-sm flex items-center gap-1 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>

        {/* Steps Progress Header */}
        <div className="w-full bg-[#121212] border border-zinc-800 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center justify-between relative">
            
            {/* Connection progress lines */}
            <div className="absolute left-[3%] right-[3%] top-1/2 -translate-y-1/2 h-0.5 bg-zinc-800 -z-10" />
            <div
              className="absolute left-[3%] top-1/2 -translate-y-1/2 h-0.5 bg-brand-blue transition-all duration-500 -z-10"
              style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 94}%` }}
            />

            {STEPS.map((step) => {
              const isCompleted = currentStep > step.number;
              const isActive = currentStep === step.number;

              return (
                <div key={step.number} className="flex flex-col items-center gap-2">
                  <div
                    className={`h-9 w-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                      isCompleted
                        ? 'bg-[#ff4a1c] text-white shadow-md shadow-[#ff4a1c]/20'
                        : isActive
                        ? 'bg-[#121212] border-2 border-[#ff4a1c] text-[#ff4a1c] shadow-xs'
                        : 'bg-zinc-900 border border-zinc-800 text-zinc-500'
                    }`}
                  >
                    {isCompleted ? <Check className="h-4.5 w-4.5" /> : step.number}
                  </div>
                  <span
                    className={`text-[10px] sm:text-xs font-semibold hidden md:inline transition-colors ${
                      isActive ? 'text-[#ff4a1c]' : 'text-zinc-400'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Container */}
        <div className="min-h-[450px] flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full flex-1 flex flex-col"
            >
              
              {/* STEP 1: PHOTO UPLOAD */}
              {currentStep === 1 && (
                <Card hoverEffect={false} className="border-zinc-800 bg-[#121212] shadow-2xl flex-1 flex flex-col">
                  <CardHeader>
                    <CardTitle>Upload Issue Image</CardTitle>
                    <CardDescription>
                      Upload a photo of the road damage, overflow, or lighting issue to trigger classification.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-center items-center py-6">
                    {previewUrl ? (
                      <div className="relative w-full max-w-md aspect-video rounded-xl overflow-hidden border border-border/80 group">
                        <Image src={previewUrl} alt="Issue preview" width={400} height={225} unoptimized className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="outline" size="sm" onClick={triggerFileInput} className="bg-white hover:bg-zinc-100 text-black border-none font-semibold cursor-pointer">
                            Replace Photo
                          </Button>
                          <Button variant="destructive" size="sm" onClick={removeImage} className="font-semibold cursor-pointer">
                            Remove
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onDragOver={onDragOver}
                        onDrop={onDrop}
                        onClick={triggerFileInput}
                        className="w-full max-w-md aspect-video border-2 border-dashed border-muted-foreground/30 hover:border-brand-blue/50 rounded-2xl flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-colors bg-muted/10"
                      >
                        <div className="h-12 w-12 rounded-full bg-brand-blue/10 text-[#ff4a1c] flex items-center justify-center mb-4">
                          <Upload className="h-6 w-6" />
                        </div>
                        <h3 className="font-bold text-sm">Drag and drop your image here</h3>
                        <p className="text-xs text-zinc-400 mt-1 mb-4">
                          Supports PNG, JPG, or WEBP up to 5MB
                        </p>
                        <Button type="button" variant="outline" size="sm" className="font-semibold cursor-pointer">
                          Select from Files
                        </Button>
                        
                        {/* Hidden input */}
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/png, image/jpeg, image/webp"
                          className="hidden"
                          onChange={handleInputChange}
                        />
                      </div>
                    )}

                    {uploadError && (
                      <div className="mt-4 p-3.5 rounded-lg bg-red-100/60 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-200/40 dark:border-red-950/30 flex items-start gap-2 text-xs font-semibold max-w-md">
                        <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
                        <span>{uploadError}</span>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="justify-end border-t border-zinc-800 py-4 bg-zinc-900/30 rounded-b-xl gap-3">
                    <Button variant="default" onClick={handleNext} className="bg-[#ff4a1c] hover:bg-[#ff4a1c]/90 text-white font-bold shadow-lg shadow-[#ff4a1c]/20 border-none cursor-pointer">
                      Next Step
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardFooter>
                </Card>
              )}

              {/* STEP 2: AI ANALYSIS */}
              {currentStep === 2 && (
                <Card hoverEffect={false} className="border-zinc-800 bg-[#121212] shadow-2xl flex-1 flex flex-col justify-between">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-[#ff4a1c] animate-pulse" />
                      Gemini AI Analysis
                      {isDemoMode && (
                        <span className="ml-auto text-[10px] bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800 flex items-center gap-1 font-bold tracking-wider">
                          <AlertCircle className="h-3 w-3" />
                          DEMO MODE
                        </span>
                      )}
                    </CardTitle>
                    <CardDescription>
                      Our vision model analyzes your report image to classify the problem and predict severity.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 py-4">
                    {aiProcessing ? (
                      // Processing checklist view
                      <div className="flex flex-col gap-6 max-w-md mx-auto py-8">
                        <div className="flex items-center gap-3">
                          <Loader2 className="h-5 w-5 animate-spin text-[#ff4a1c]" />
                          <h3 className="font-bold text-sm">AI analysis in progress...</h3>
                        </div>
                        <div className="flex flex-col gap-3.5">
                          {aiChecklist.map((item, idx) => {
                            const isPending = aiStepIndex < idx;
                            const isCurrent = aiStepIndex === idx;
                            return (
                              <div
                                key={idx}
                                className={`flex items-center gap-3 text-xs font-medium transition-all ${
                                  isPending ? 'text-zinc-400/40' : isCurrent ? 'text-[#ff4a1c]' : 'text-foreground'
                                }`}
                              >
                                <div className={`h-4.5 w-4.5 rounded-full flex items-center justify-center border text-[9px] ${
                                  isPending
                                    ? 'border-border/80'
                                    : isCurrent
                                    ? 'border-brand-blue text-[#ff4a1c] animate-pulse'
                                    : 'bg-brand-blue border-brand-blue text-white'
                                }`}>
                                  {!isPending && !isCurrent && <Check className="h-2.5 w-2.5" />}
                                  {isCurrent && <div className="h-1.5 w-1.5 rounded-full bg-brand-blue" />}
                                </div>
                                <span>{item}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : apiError ? (
                      <div className="flex flex-col items-center justify-center text-center gap-4 py-12">
                        <div className="h-12 w-12 rounded-full bg-red-100/50 flex items-center justify-center text-red-500">
                          <ShieldAlert className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-sm">Analysis Failed</h3>
                          <p className="text-xs text-zinc-400 mt-1 max-w-xs">{apiError}</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={startAiAnalysis} className="mt-2 font-semibold">
                          Retry Analysis
                        </Button>
                      </div>
                    ) : (
                      // Editable AI analysis report view
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        {/* Image panel */}
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-semibold text-zinc-400">Uploaded Image</label>
                          {previewUrl && (
                            <div className="rounded-xl overflow-hidden border border-border/80 aspect-video">
                              <Image src={previewUrl} alt="Reported problem" width={400} height={225} unoptimized className="w-full h-full object-cover" />
                            </div>
                          )}
                          <div className="mt-3 p-3 rounded-lg border border-[#ff4a1c]/20 bg-[#ff4a1c]/10 text-[11px] font-semibold text-[#ff4a1c] flex items-center gap-2">
                            <Brain className="h-4 w-4 shrink-0" />
                            <span>Gemini AI analyzed this with {aiData.confidence}% confidence</span>
                          </div>
                        </div>

                        {/* Editable Form panel */}
                        <div className="flex flex-col gap-4">
                          {/* Category Choice */}
                          <div className="flex flex-col gap-1.5">
                            <label htmlFor="category" className="text-xs font-semibold text-zinc-400 flex items-center gap-1">
                              Detected Category <Edit2 className="h-3 w-3 text-zinc-400" />
                            </label>
                            <select
                              id="category"
                              value={aiData.category}
                              onChange={(e) => setAiData({ ...aiData, category: e.target.value })}
                              className="w-full h-10 px-3 rounded-lg border border-border/80 bg-zinc-900/50 outline-hidden focus:border-[#ff4a1c]/50 focus:ring-1 focus:ring-[#ff4a1c]/30 text-white text-sm border-zinc-800 font-semibold"
                            >
                              <option value="Road Pothole">Road Pothole</option>
                              <option value="Broken Streetlight">Broken Streetlight</option>
                              <option value="Garbage Overflow">Garbage Overflow</option>
                              <option value="Water Leakage">Water Leakage</option>
                              <option value="Open Drain">Open Drain</option>
                              <option value="Damaged Infrastructure">Damaged Public Infrastructure</option>
                            </select>
                          </div>

                          {/* Severity & Department display */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                              <span className="text-xs font-semibold text-zinc-400">AI Severity</span>
                              <div>
                                <SeverityBadge severity={aiData.severity} />
                              </div>
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="text-xs font-semibold text-zinc-400">Department</span>
                              <span className="text-xs font-bold text-foreground bg-muted/40 px-2 py-1 rounded-md border w-fit">
                                {aiData.department}
                              </span>
                            </div>
                          </div>

                          {/* Description Textarea */}
                          <div className="flex flex-col gap-1.5">
                            <label htmlFor="description" className="text-xs font-semibold text-zinc-400">
                              Suggested Description
                            </label>
                            <textarea
                              id="description"
                              rows={3}
                              value={aiData.description}
                              onChange={(e) => setAiData({ ...aiData, description: e.target.value })}
                              className="w-full p-3 rounded-lg border border-border/80 bg-zinc-900/50 outline-hidden focus:border-[#ff4a1c]/50 focus:ring-1 focus:ring-[#ff4a1c]/30 text-white text-sm border-zinc-800 leading-relaxed resize-none"
                            />
                          </div>

                          {/* Potential Risk */}
                          <div className="flex flex-col gap-1">
                            <span className="text-xs font-semibold text-zinc-400 flex items-center gap-1">
                              Safety Risk Assessment
                            </span>
                            <p className="text-xs text-foreground font-semibold flex items-start gap-1.5">
                              <AlertCircle className="h-4 w-4 shrink-0 text-red-500 mt-0.5" />
                              <span>{aiData.risk}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="justify-between border-t border-zinc-800 py-4 bg-zinc-900/30 rounded-b-xl gap-3">
                    <Button variant="outline" size="sm" onClick={handleBack} disabled={aiProcessing} className="font-semibold cursor-pointer">
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Back
                    </Button>
                    <Button variant="default" onClick={handleNext} disabled={aiProcessing} className="bg-[#ff4a1c] hover:bg-[#ff4a1c]/90 text-white font-bold shadow-lg shadow-[#ff4a1c]/20 border-none cursor-pointer">
                      Next Step
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardFooter>
                </Card>
              )}

              {/* STEP 3: LOCATION */}
              {currentStep === 3 && (
                <Card hoverEffect={false} className="border-zinc-800 bg-[#121212] shadow-2xl flex-1 flex flex-col justify-between">
                  <CardHeader>
                    <CardTitle>Specify Issue Location</CardTitle>
                    <CardDescription>
                      Pinpoint the geocode location of this civic hazard or input the address manually.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                      
                      {/* Left: Fields */}
                      <div className="flex flex-col gap-4">
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant={useGPS ? 'default' : 'outline'}
                            onClick={fetchCurrentLocation}
                            className={`flex-1 font-semibold cursor-pointer ${useGPS ? 'bg-brand-blue text-white hover:bg-brand-blue/90' : ''}`}
                          >
                            <MapPin className="h-4 w-4 mr-1.5" />
                            {locationLoading ? 'Fetching GPS...' : 'Use GPS Coordinates'}
                          </Button>
                          <Button
                            type="button"
                            variant={!useGPS ? 'default' : 'outline'}
                            onClick={handleManualLocation}
                            className={`flex-1 font-semibold cursor-pointer ${!useGPS ? 'bg-brand-blue text-white hover:bg-brand-blue/90' : ''}`}
                          >
                            Enter Manually
                          </Button>
                        </div>

                        {locationError && (
                          <div className="p-3.5 rounded-lg bg-red-100/60 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-200/40 dark:border-red-950/30 flex items-start gap-2 text-xs font-semibold">
                            <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
                            <span>{locationError}</span>
                          </div>
                        )}

                        {/* Fields */}
                        <div className="flex flex-col gap-3">
                          <div className="flex flex-col gap-1.5">
                            <label htmlFor="address" className="text-xs font-semibold text-zinc-400">
                              Street Address
                            </label>
                            <input
                              id="address"
                              type="text"
                              placeholder="e.g. 12, Park Road"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              disabled={locationLoading}
                              className="w-full h-10 px-3 rounded-lg border border-border/80 bg-zinc-900/50 outline-hidden focus:border-[#ff4a1c]/50 focus:ring-1 focus:ring-[#ff4a1c]/30 text-white text-sm border-zinc-800"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label htmlFor="landmark" className="text-xs font-semibold text-zinc-400">
                              Landmark (Optional)
                            </label>
                            <input
                              id="landmark"
                              type="text"
                              placeholder="e.g. Opposite City Hospital"
                              value={landmark}
                              onChange={(e) => setLandmark(e.target.value)}
                              disabled={locationLoading}
                              className="w-full h-10 px-3 rounded-lg border border-border/80 bg-zinc-900/50 outline-hidden focus:border-[#ff4a1c]/50 focus:ring-1 focus:ring-[#ff4a1c]/30 text-white text-sm border-zinc-800"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                              <label htmlFor="city" className="text-xs font-semibold text-zinc-400">
                                City
                              </label>
                              <input
                                id="city"
                                type="text"
                                placeholder="e.g. Bhopal"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                disabled={locationLoading}
                                className="w-full h-10 px-3 rounded-lg border border-border/80 bg-zinc-900/50 outline-hidden focus:border-[#ff4a1c]/50 focus:ring-1 focus:ring-[#ff4a1c]/30 text-white text-sm border-zinc-800"
                              />
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <label htmlFor="state" className="text-xs font-semibold text-zinc-400">
                                State
                              </label>
                              <input
                                id="state"
                                type="text"
                                placeholder="e.g. Madhya Pradesh"
                                value={stateName}
                                onChange={(e) => setStateName(e.target.value)}
                                disabled={locationLoading}
                                className="w-full h-10 px-3 rounded-lg border border-border/80 bg-zinc-900/50 outline-hidden focus:border-[#ff4a1c]/50 focus:ring-1 focus:ring-[#ff4a1c]/30 text-white text-sm border-zinc-800"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right: Map Graphic / Coordinates Preview */}
                      <div className="flex flex-col gap-3 h-full">
                        <label className="text-xs font-semibold text-zinc-400">Location Pin Preview</label>
                        <div className="flex-1 min-h-[220px] rounded-xl overflow-hidden border border-border/80 bg-zinc-950/50 relative flex flex-col justify-center items-center text-center p-4">
                          
                          {/* Grid background */}
                          <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.92_0.01_250_/_10%)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.92_0.01_250_/_10%)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,oklch(0.22_0.03_250_/_10%)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.22_0.03_250_/_10%)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />
                          
                          <div className="relative">
                            <MapPin className="h-10 w-10 text-[#ff4a1c] animate-bounce relative z-10" />
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2.5 w-6 bg-black/20 rounded-full blur-xs" />
                          </div>

                          <h4 className="font-bold text-xs mt-3 relative z-10">Map Pin Fixed</h4>
                          {coords ? (
                            <p className="text-[10px] text-[#ff4a1c] font-mono mt-1 relative z-10 bg-[#ff4a1c]/10 border border-[#ff4a1c]/20 px-2 py-0.5 rounded-full">
                              Latitude: {coords.lat.toFixed(5)}, Longitude: {coords.lng.toFixed(5)}
                            </p>
                          ) : (
                            <p className="text-[10px] text-zinc-400 mt-1 relative z-10">
                              Manual address mode. Custom coordinates will be resolved in background.
                            </p>
                          )}
                        </div>
                      </div>

                    </div>
                  </CardContent>
                  <CardFooter className="justify-between border-t border-zinc-800 py-4 bg-zinc-900/30 rounded-b-xl gap-3">
                    <Button variant="outline" size="sm" onClick={handleBack} className="font-semibold cursor-pointer">
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Back
                    </Button>
                    <Button variant="default" onClick={handleNext} className="bg-[#ff4a1c] hover:bg-[#ff4a1c]/90 text-white font-bold shadow-lg shadow-[#ff4a1c]/20 border-none cursor-pointer">
                      Next Step
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardFooter>
                </Card>
              )}

              {/* STEP 4: REVIEW SUMMARY */}
              {currentStep === 4 && (
                <Card hoverEffect={false} className="border-zinc-800 bg-[#121212] shadow-2xl flex-1 flex flex-col justify-between">
                  <CardHeader>
                    <CardTitle>Review Your Report</CardTitle>
                    <CardDescription>
                      Verify details of your ticket before submitting to the city dashboard.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      
                      {/* Image Preview Left */}
                      <div className="md:col-span-1 flex flex-col gap-2">
                        <span className="text-xs font-semibold text-zinc-400">Selected Photo</span>
                        {previewUrl && (
                          <div className="rounded-xl overflow-hidden border border-border/80 aspect-square">
                            <Image src={previewUrl} alt="Reported issue summary" width={400} height={400} unoptimized className="w-full h-full object-cover" />
                          </div>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentStep(1)}
                          className="w-full mt-2 font-semibold text-xs cursor-pointer"
                        >
                          <Edit2 className="h-3 w-3 mr-1" />
                          Edit Photo
                        </Button>
                      </div>

                      {/* Issue Details Center */}
                      <div className="md:col-span-1 flex flex-col gap-4 border-r border-zinc-800 pr-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-semibold text-zinc-400 flex items-center justify-between">
                            Issue Info
                            <button onClick={() => setCurrentStep(2)} className="text-[#ff4a1c] text-[10px] font-bold hover:underline">
                              Edit
                            </button>
                          </span>
                          <span className="text-sm font-bold text-foreground">{aiData.category}</span>
                          <div className="flex gap-2 items-center mt-1">
                            <SeverityBadge severity={aiData.severity} />
                            <span className="text-[10px] text-zinc-400 font-semibold bg-muted/40 px-2 py-0.5 rounded-md border">
                              {aiData.confidence}% Confidence
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-semibold text-zinc-400">Description</span>
                          <p className="text-xs text-zinc-400 leading-relaxed bg-zinc-50 dark:bg-zinc-950/20 p-2.5 rounded-lg border border-zinc-800">
                            {aiData.description}
                          </p>
                        </div>

                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-semibold text-zinc-400">Assigned Department</span>
                          <span className="text-xs font-semibold text-foreground bg-muted/40 border px-2 py-1 rounded-md w-fit">
                            {aiData.department}
                          </span>
                        </div>
                      </div>

                      {/* Location Details Right */}
                      <div className="md:col-span-1 flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-semibold text-zinc-400 flex items-center justify-between">
                            Report Location
                            <button onClick={() => setCurrentStep(3)} className="text-[#ff4a1c] text-[10px] font-bold hover:underline">
                              Edit
                            </button>
                          </span>
                          <div className="flex items-start gap-1.5 mt-1 text-xs text-foreground font-semibold">
                            <MapPin className="h-4.5 w-4.5 shrink-0 text-[#ff4a1c] mt-0.5" />
                            <div>
                              <p>{address}</p>
                              {landmark && <p className="text-zinc-400 text-[10px] font-normal">{landmark}</p>}
                              <p className="text-zinc-400 text-[10px] font-normal">{city}, {stateName}</p>
                            </div>
                          </div>
                        </div>

                        {coords && (
                          <div className="p-3 rounded-lg border border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/10 flex flex-col gap-1">
                            <span className="text-[10px] font-bold text-zinc-400">GPS Location Fixed</span>
                            <span className="text-[10px] font-mono text-foreground font-semibold">
                              Lat: {coords.lat.toFixed(6)}, Lng: {coords.lng.toFixed(6)}
                            </span>
                          </div>
                        )}
                      </div>

                    </div>
                  </CardContent>
                  <CardFooter className="flex-col border-t border-zinc-800 py-4 bg-zinc-900/30 rounded-b-xl gap-3">
                    <div className="flex justify-between w-full">
                      <Button variant="outline" size="sm" onClick={handleBack} disabled={submitting} className="font-semibold cursor-pointer">
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Back
                      </Button>
                      <Button variant="default" onClick={handleNext} disabled={submitting} className="bg-[#ff4a1c] hover:bg-[#ff4a1c]/90 text-white font-bold shadow-lg shadow-[#ff4a1c]/20 border-none cursor-pointer">
                        {submitting ? 'Submitting...' : 'Submit Report'}
                        {!submitting && <ChevronRight className="h-4 w-4 ml-1" />}
                      </Button>
                    </div>
                    {submissionError && (
                      <div className="w-full mt-2 p-3.5 rounded-lg bg-red-100/60 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-200/40 dark:border-red-950/30 flex items-start gap-2 text-xs font-semibold">
                        <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
                        <span>{submissionError}</span>
                      </div>
                    )}
                  </CardFooter>
                </Card>
              )}

              {/* STEP 4.5: DUPLICATE DETECTION WARNING */}
              {currentStep === 4.5 && potentialDuplicate && (
                <Card hoverEffect={false} className="border-amber-500/50 shadow-lg flex-1 flex flex-col items-center p-6 bg-amber-500/5 dark:bg-amber-900/10">
                  <div className="h-14 w-14 rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-500 flex items-center justify-center mb-4 border border-amber-200/50 dark:border-amber-900/50">
                    <ShieldAlert className="h-7 w-7" />
                  </div>
                  
                  <h2 className="text-xl font-bold tracking-tight text-foreground text-center">Possible Existing Issue Found</h2>
                  <p className="text-sm text-zinc-400 mt-2 max-w-sm text-center">
                    We found a similar issue reported nearby. Please check if this matches your report to avoid creating duplicates.
                  </p>

                  <div className="w-full mt-6 bg-background rounded-xl p-4 border border-border/80 shadow-xs flex flex-col sm:flex-row gap-4 items-center sm:items-start text-left">
                    {potentialDuplicate.existingIssue.imageUrl ? (
                      <div className="h-24 w-24 shrink-0 relative rounded-lg overflow-hidden border border-zinc-800">
                        <Image src={potentialDuplicate.existingIssue.imageUrl} alt="Existing" fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="h-24 w-24 shrink-0 relative rounded-lg border border-zinc-800 bg-muted flex items-center justify-center text-zinc-400">
                        <FileText className="h-8 w-8 opacity-20" />
                      </div>
                    )}
                    
                    <div className="flex-1 flex flex-col gap-1.5 w-full">
                      <h3 className="font-bold text-sm line-clamp-2">{potentialDuplicate.existingIssue.title}</h3>
                      <div className="flex flex-wrap gap-1.5 items-center">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                          {potentialDuplicate.probability}% Match
                        </span>
                        <span className="text-[10px] text-zinc-400 font-semibold bg-muted px-2 py-0.5 rounded-md border border-border/60">
                          {potentialDuplicate.distance}m away
                        </span>
                        <span className="text-[10px] text-zinc-400 font-semibold bg-muted px-2 py-0.5 rounded-md border border-border/60">
                          {potentialDuplicate.existingIssue.status}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 line-clamp-2 mt-1">
                        {potentialDuplicate.existingIssue.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 mt-8 w-full">
                    <Button variant="default" onClick={confirmExistingIssue} disabled={submitting} className="flex-1 bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold">
                      {submitting ? 'Confirming...' : 'Confirm Existing Issue'}
                    </Button>
                    <Button variant="outline" onClick={submitIssue} disabled={submitting} className="flex-1 font-semibold text-zinc-400 hover:text-foreground">
                      {submitting ? 'Submitting...' : 'Submit New Issue'}
                    </Button>
                  </div>
                  
                  {submissionError && (
                    <div className="w-full mt-4 p-3.5 rounded-lg bg-red-100/60 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-200/40 dark:border-red-950/30 text-xs font-semibold flex justify-center">
                      <span>{submissionError}</span>
                    </div>
                  )}
                </Card>
              )}

              {/* STEP 5: SUBMIT SUCCESS */}
              {currentStep === 5 && (
                <Card hoverEffect={false} className="border-border/60 shadow-lg flex-1 flex flex-col items-center justify-center text-center py-12 px-6">
                  <div className="h-16 w-16 rounded-full bg-emerald-100 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6 border border-emerald-200/50 dark:border-emerald-950/30">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  
                  <h2 className="text-2xl font-bold tracking-tight text-foreground">Report Submitted Successfully!</h2>
                  <p className="text-zinc-400 text-sm max-w-md mt-2 leading-relaxed">
                    Your civic issue is ready to be reported. Local authorities and fellow citizens will now be able to view, support, and track repairs.
                  </p>

                  <div className="mt-6 p-4 rounded-xl border border-[#ff4a1c]/20 bg-[#ff4a1c]/10 flex flex-col items-center max-w-xs w-full">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#ff4a1c]">Reference Ticket ID</span>
                    <span className="text-lg font-mono font-black text-foreground mt-1">{submittedId ? submittedId.substring(0, 8).toUpperCase() : 'CIV-DEMO-001'}</span>
                  </div>

                  {submittedId && (
                    <div className="mt-4 flex flex-col items-center gap-1">
                      <span className="text-xs text-zinc-400 font-semibold">Status: <span className="text-[#ff4a1c]">Open</span></span>
                      <span className="text-xs text-zinc-400 font-semibold">Location: {address}</span>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3.5 mt-8 w-full max-w-sm justify-center">
                    <Button
                      variant="outline"
                      onClick={() => router.push('/my-reports')}
                      className="flex-1 font-semibold cursor-pointer"
                    >
                      View My Reports
                    </Button>
                    <Button
                      variant="default"
                      onClick={resetForm}
                      className="flex-1 bg-[#ff4a1c] hover:bg-[#ff4a1c]/90 text-white font-bold shadow-lg shadow-[#ff4a1c]/20 border-none cursor-pointer"
                    >
                      Report Another
                    </Button>
                  </div>
                </Card>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

      </PageContainer>
    </div>
  );
}
