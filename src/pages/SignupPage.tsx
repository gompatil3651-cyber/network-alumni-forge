import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  UserPlus, 
  Mail, 
  Phone, 
  GraduationCap,
  Building,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface SignupPageProps {
  onSignupSuccess?: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  role: 'alumni' | 'student' | 'employer';
  institute?: string;
  rollNumber?: string;
  graduationYear?: number;
}

const SignupPage: React.FC<SignupPageProps> = ({ onSignupSuccess }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    role: 'alumni',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  const [emailVerified, setEmailVerified] = useState(false);
  
  const { signup } = useAuth();

  // Mock institutes data
  const institutes = [
    'IIT Delhi', 'IIT Bombay', 'IIT Madras', 'IIT Kanpur', 'IIT Kharagpur',
    'IIT Roorkee', 'IIT Guwahati', 'IIT BHU', 'IISC Bangalore', 'NIT Trichy',
    'NIT Warangal', 'BITS Pilani', 'DTU', 'NSIT', 'Other'
  ];

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Check email domain verification
    if (field === 'email') {
      const domain = (value as string).split('@')[1];
      const verifiedDomains = ['iitd.ac.in', 'iitb.ac.in', 'iitm.ac.in', 'iitk.ac.in'];
      setEmailVerified(verifiedDomains.includes(domain));
    }
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!formData.name || !formData.email) {
        setError('Please fill in all required fields');
        return;
      }
      setError('');
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const success = await signup(formData);
      
      if (success) {
        toast({
          title: "Account Created Successfully!",
          description: emailVerified 
            ? "Your account has been verified via institute email domain." 
            : "Please check your email for verification instructions.",
          variant: "default"
        });
        onSignupSuccess?.();
      } else {
        setError('Failed to create account. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during signup. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      {/* Basic Information */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
          />
          {formData.email && emailVerified && (
            <div className="flex items-center gap-2 text-sm text-success">
              <CheckCircle className="h-4 w-4" />
              <span>Email domain verified via institute</span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number (Optional)</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">I am a *</Label>
          <Select
            value={formData.role}
            onValueChange={(value: 'alumni' | 'student' | 'employer') => 
              handleInputChange('role', value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="alumni">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Alumni / Graduate
                </div>
              </SelectItem>
              <SelectItem value="student">
                <div className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Current Student
                </div>
              </SelectItem>
              <SelectItem value="employer">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Employer / Recruiter
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button 
        type="button" 
        className="w-full btn-hero"
        onClick={handleNextStep}
      >
        Continue
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      {(formData.role === 'alumni' || formData.role === 'student') && (
        <>
          <div className="space-y-2">
            <Label htmlFor="institute">Institute / University</Label>
            <Select
              value={formData.institute}
              onValueChange={(value) => handleInputChange('institute', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your institute" />
              </SelectTrigger>
              <SelectContent>
                {institutes.map((institute) => (
                  <SelectItem key={institute} value={institute}>
                    {institute}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formData.institute === 'Other' && (
              <div className="mt-2">
                <Input
                  placeholder="Enter institute name"
                  onChange={(e) => handleInputChange('institute', e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Don't see your institute? We'll add it to our database after verification.
                </p>
              </div>
            )}
          </div>

          {formData.role === 'alumni' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="rollNumber">Roll Number (Optional)</Label>
                <Input
                  id="rollNumber"
                  type="text"
                  placeholder="Enter your roll number"
                  value={formData.rollNumber || ''}
                  onChange={(e) => handleInputChange('rollNumber', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="graduationYear">Graduation Year</Label>
                <Input
                  id="graduationYear"
                  type="number"
                  placeholder="2024"
                  min="1950"
                  max="2030"
                  value={formData.graduationYear || ''}
                  onChange={(e) => handleInputChange('graduationYear', parseInt(e.target.value))}
                />
              </div>
            </>
          )}
        </>
      )}

      {formData.role === 'employer' && (
        <div className="p-4 bg-secondary/50 rounded-lg">
          <h3 className="font-medium mb-2">Employer Information</h3>
          <p className="text-sm text-muted-foreground">
            As an employer, you'll have access to our talent pool and be able to post job opportunities 
            directly to our alumni network.
          </p>
        </div>
      )}

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => setStep(1)}
          className="flex-1"
        >
          Back
        </Button>
        <Button
          type="submit"
          className="flex-1 btn-hero"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Account...
            </>
          ) : (
            <>
              <UserPlus className="mr-2 h-4 w-4" />
              Create Account
            </>
          )}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-secondary/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-3">
              <span className="text-primary-foreground font-bold text-lg">N</span>
            </div>
            <span className="text-2xl font-bold text-gradient-primary">NetworkNexus</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">Join the Network</h1>
          <p className="text-muted-foreground">
            Connect with {step === 1 ? 'thousands of alumni worldwide' : 'your professional community'}
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center space-x-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          }`}>
            1
          </div>
          <div className={`w-12 h-0.5 ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          }`}>
            2
          </div>
        </div>

        {/* Form Card */}
        <Card className="card-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {step === 1 ? (
                <>
                  <Mail className="h-5 w-5 text-primary" />
                  Basic Information
                </>
              ) : (
                <>
                  <GraduationCap className="h-5 w-5 text-primary" />
                  Additional Details
                </>
              )}
            </CardTitle>
            <CardDescription>
              {step === 1 
                ? 'Let\'s start with your basic information'
                : 'Help us personalize your experience'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              {step === 1 ? renderStep1() : renderStep2()}
            </form>
          </CardContent>
        </Card>

        {/* Sign In Link */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <a href="/login" className="font-medium text-primary hover:underline">
              Sign in to NetworkNexus
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;