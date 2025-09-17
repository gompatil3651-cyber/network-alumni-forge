import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'alumni' | 'student' | 'employer' | 'admin';
  phone?: string;
  isVerified: boolean;
  verificationStatus: 'unverified' | 'pending' | 'verified';
  institute?: string;
  rollNumber?: string;
  graduationYear?: number;
  points: number;
  badges: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, otp?: string) => Promise<boolean>;
  logout: () => void;
  signup: (userData: Partial<User> & { email: string; name: string }) => Promise<boolean>;
  sendOTP: (email: string) => Promise<{ success: boolean; requiresOTP: boolean }>;
  verifyOTP: (email: string, otp: string) => Promise<boolean>;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock data for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    email: 'john.doe@iitd.ac.in',
    name: 'John Doe',
    role: 'alumni',
    phone: '+91-9876543210',
    isVerified: true,
    verificationStatus: 'verified',
    institute: 'IIT Delhi',
    rollNumber: '2018CS10426',
    graduationYear: 2022,
    points: 1250,
    badges: ['mentor', 'contributor', 'verified']
  },
  {
    id: '2',
    email: 'jane.smith@iitb.ac.in',
    name: 'Jane Smith',
    role: 'student',
    isVerified: true,
    verificationStatus: 'verified',
    institute: 'IIT Bombay',
    rollNumber: '2021CS20145',
    points: 450,
    badges: ['active']
  },
  {
    id: '3',
    email: 'sarah.wilson@company.com',
    name: 'Sarah Wilson',
    role: 'employer',
    isVerified: true,
    verificationStatus: 'verified',
    points: 300,
    badges: ['recruiter']
  }
];

// Mock institutes data for domain verification
const mockInstitutes = [
  { id: '1', name: 'IIT Delhi', domain: 'iitd.ac.in', code: 'IITD' },
  { id: '2', name: 'IIT Bombay', domain: 'iitb.ac.in', code: 'IITB' },
  { id: '3', name: 'IIT Madras', domain: 'iitm.ac.in', code: 'IITM' },
  { id: '4', name: 'IIT Kanpur', domain: 'iitk.ac.in', code: 'IITK' }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [pendingOTP, setPendingOTP] = useState<{ email: string; otp: string } | null>(null);

  useEffect(() => {
    // Check for stored auth data on mount
    const storedUser = localStorage.getItem('networkNexus_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user data:', error);
        localStorage.removeItem('networkNexus_user');
      }
    }
    setLoading(false);
  }, []);

  const sendOTP = async (email: string): Promise<{ success: boolean; requiresOTP: boolean }> => {
    // TODO: Replace with actual API call
    console.log('📧 Sending OTP to:', email);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user exists in mock data
    const existingUser = mockUsers.find(u => u.email === email);
    
    if (existingUser) {
      // Simulate OTP generation (in real app, this would be server-side)
      const otp = '123456';
      setPendingOTP({ email, otp });
      
      // In real implementation, OTP would be sent via email/SMS
      console.log('📱 OTP sent:', otp, '(This is mock data)');
      
      return { success: true, requiresOTP: true };
    }
    
    return { success: false, requiresOTP: false };
  };

  const verifyOTP = async (email: string, otp: string): Promise<boolean> => {
    // TODO: Replace with actual API call
    console.log('🔐 Verifying OTP:', { email, otp });
    
    if (pendingOTP && pendingOTP.email === email && pendingOTP.otp === otp) {
      const userData = mockUsers.find(u => u.email === email);
      if (userData) {
        setUser(userData);
        localStorage.setItem('networkNexus_user', JSON.stringify(userData));
        setPendingOTP(null);
        return true;
      }
    }
    
    return false;
  };

  const login = async (email: string, otp?: string): Promise<boolean> => {
    if (otp) {
      return verifyOTP(email, otp);
    }
    
    // For demo purposes, allow direct login with known emails
    const userData = mockUsers.find(u => u.email === email);
    if (userData) {
      setUser(userData);
      localStorage.setItem('networkNexus_user', JSON.stringify(userData));
      return true;
    }
    
    return false;
  };

  const signup = async (userData: Partial<User> & { email: string; name: string }): Promise<boolean> => {
    try {
      // TODO: Replace with actual API call
      console.log('👤 Creating new user:', userData);
      
      // Check email domain for auto-verification
      const emailDomain = userData.email.split('@')[1];
      const matchingInstitute = mockInstitutes.find(inst => inst.domain === emailDomain);
      
      const newUser: User = {
        id: String(Date.now()), // Generate temporary ID
        email: userData.email,
        name: userData.name,
        role: userData.role || 'alumni',
        phone: userData.phone,
        isVerified: !!matchingInstitute,
        verificationStatus: matchingInstitute ? 'verified' : 'unverified',
        institute: userData.institute || matchingInstitute?.name,
        rollNumber: userData.rollNumber,
        graduationYear: userData.graduationYear,
        points: 0,
        badges: ['new_member']
      };
      
      // Store in localStorage (in real app, this would be server-side)
      const existingUsers = JSON.parse(localStorage.getItem('networkNexus_allUsers') || '[]');
      existingUsers.push(newUser);
      localStorage.setItem('networkNexus_allUsers', JSON.stringify(existingUsers));
      
      setUser(newUser);
      localStorage.setItem('networkNexus_user', JSON.stringify(newUser));
      
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setPendingOTP(null);
    localStorage.removeItem('networkNexus_user');
    // TODO: Call API to invalidate session
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    signup,
    sendOTP,
    verifyOTP,
    isAuthenticated: !!user,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};