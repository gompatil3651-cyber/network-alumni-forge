import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Mail, 
  KeyRound, 
  ArrowRight, 
  Github, 
  Chrome,
  Linkedin,
  AlertCircle,
  CheckCircle,
  Loader2
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface LoginPageProps {
  onLoginSuccess?: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOTPField, setShowOTPField] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { login, sendOTP } = useAuth();

  const handleOAuthPlaceholder = (provider: string) => {
    toast({
      title: "OAuth Placeholder",
      description: `${provider} OAuth integration - Connect to backend for full implementation`,
      variant: "default"
    });
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const result = await sendOTP(email);
      
      if (result.success && result.requiresOTP) {
        setShowOTPField(true);
        setSuccess('OTP sent successfully! Use 123456 for demo purposes.');
        
        // Check if email domain is verified
        const domain = email.split('@')[1];
        const verifiedDomains = ['iitd.ac.in', 'iitb.ac.in', 'iitm.ac.in', 'iitk.ac.in'];
        if (verifiedDomains.includes(domain)) {
          toast({
            title: "Domain Verified",
            description: `✅ Verified via institute domain: ${domain}`,
            variant: "default"
          });
        }
      } else {
        setError('Email not found. Please sign up first or check your email address.');
      }
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      setError('Please enter the OTP');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const success = await login(email, otp);
      
      if (success) {
        toast({
          title: "Login Successful",
          description: "Welcome back to NetworkNexus!",
          variant: "default"
        });
        onLoginSuccess?.();
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const quickLoginEmails = [
    { email: 'john.doe@iitd.ac.in', role: 'Alumni', verified: true },
    { email: 'jane.smith@iitb.ac.in', role: 'Student', verified: true },
    { email: 'sarah.wilson@company.com', role: 'Employer', verified: true }
  ];

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
          <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your alumni network account</p>
        </div>

        {/* OAuth Buttons (Placeholders) */}
        <Card className="card-elegant">
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 hover-lift"
                onClick={() => handleOAuthPlaceholder('Google')}
              >
                <Chrome className="h-4 w-4" />
                Continue with Google
              </Button>
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 hover-lift"
                onClick={() => handleOAuthPlaceholder('LinkedIn')}
              >
                <Linkedin className="h-4 w-4" />
                Continue with LinkedIn
              </Button>
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 hover-lift"
                onClick={() => handleOAuthPlaceholder('GitHub')}
              >
                <Github className="h-4 w-4" />
                Continue with GitHub
              </Button>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Email/OTP Form */}
        <Card className="card-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              {showOTPField ? 'Enter Verification Code' : 'Email Login'}
            </CardTitle>
            <CardDescription>
              {showOTPField 
                ? `We sent a 6-digit code to ${email}` 
                : 'We\'ll send you a verification code'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {success && (
              <Alert className="border-success/50 bg-success/5">
                <CheckCircle className="h-4 w-4 text-success" />
                <AlertDescription className="text-success">{success}</AlertDescription>
              </Alert>
            )}

            {!showOTPField ? (
              <form onSubmit={handleSendOTP} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full btn-hero"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending OTP...
                    </>
                  ) : (
                    <>
                      Send Verification Code
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">Verification Code</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    className="w-full text-center text-lg tracking-widest"
                  />
                  <p className="text-xs text-muted-foreground text-center">
                    Demo code: <code className="bg-muted px-1 rounded">123456</code>
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowOTPField(false);
                      setOtp('');
                      setError('');
                      setSuccess('');
                    }}
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
                        Verifying...
                      </>
                    ) : (
                      <>
                        <KeyRound className="mr-2 h-4 w-4" />
                        Verify & Login
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}

            <div className="text-center">
              <button
                onClick={() => setShowOTPField(false)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Resend code
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Demo Login */}
        <Card className="card-elegant">
          <CardHeader>
            <CardTitle className="text-sm">Quick Demo Login</CardTitle>
            <CardDescription className="text-xs">
              Click any email below for instant demo access
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {quickLoginEmails.map((user, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-between p-3 h-auto"
                onClick={() => {
                  setEmail(user.email);
                  login(user.email);
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground text-xs font-semibold">
                      {user.email.split('@')[0].charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium">{user.email}</div>
                    <div className="text-xs text-muted-foreground">{user.role}</div>
                  </div>
                </div>
                {user.verified && (
                  <Badge variant="outline" className="text-xs bg-success/10 text-success border-success/30">
                    Verified
                  </Badge>
                )}
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <a href="/signup" className="font-medium text-primary hover:underline">
              Sign up for NetworkNexus
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;