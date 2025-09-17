import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Users, 
  Calendar, 
  Briefcase, 
  MessageSquare, 
  Trophy,
  TrendingUp,
  Heart,
  Star,
  MapPin,
  Clock,
  ArrowRight,
  Plus,
  Bell,
  Award,
  Target,
  BookOpen,
  Building,
  DollarSign
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface DashboardProps {
  currentRole?: string;
  onRoleChange?: (role: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ currentRole, onRoleChange }) => {
  const { user } = useAuth();
  const [selectedRole, setSelectedRole] = useState(currentRole || user?.role || 'alumni');

  // Mock data for different dashboard content
  const mockEvents = [
    { id: 1, title: 'IIT Delhi Annual Reunion', date: '2024-01-15', attendees: 150, type: 'reunion' },
    { id: 2, title: 'Tech Career Panel', date: '2024-01-20', attendees: 75, type: 'webinar' },
    { id: 3, title: 'Alumni Networking Mumbai', date: '2024-01-25', attendees: 200, type: 'networking' }
  ];

  const mockMentorships = [
    { id: 1, name: 'Priya Sharma', role: 'Senior SDE', company: 'Google', status: 'active' },
    { id: 2, name: 'Rahul Kumar', role: 'Product Manager', company: 'Microsoft', status: 'pending' }
  ];

  const mockJobs = [
    { id: 1, title: 'Senior Software Engineer', company: 'Meta', location: 'Bangalore', type: 'Full-time' },
    { id: 2, title: 'Product Manager', company: 'Flipkart', location: 'Bangalore', type: 'Full-time' },
    { id: 3, title: 'Data Scientist Intern', company: 'Uber', location: 'Hyderabad', type: 'Internship' }
  ];

  const mockDonations = [
    { id: 1, title: 'Computer Lab Upgrade', target: 500000, raised: 320000, donors: 45 },
    { id: 2, title: 'Student Scholarship Fund', target: 1000000, raised: 750000, donors: 120 }
  ];

  const renderAlumniDashboard = () => (
    <div className="dashboard-grid">
      {/* Profile Card */}
      <Card className="card-elegant col-span-full md:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-primary text-primary-foreground text-xl font-semibold">
                  {user?.name?.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-xl">{user?.name}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Badge className="status-verified">
                    {user?.verificationStatus === 'verified' ? 'Verified Alumni' : 'Pending Verification'}
                  </Badge>
                  <span>•</span>
                  <span>{user?.institute}</span>
                </CardDescription>
              </div>
            </div>
            <Button variant="outline" size="sm">Edit Profile</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{user?.points || 0}</div>
              <div className="text-sm text-muted-foreground">Points</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">{user?.badges?.length || 0}</div>
              <div className="text-sm text-muted-foreground">Badges</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-success">12</div>
              <div className="text-sm text-muted-foreground">Connections</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Suggestions */}
      <Card className="hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-warning" />
            AI Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-secondary/50 rounded-lg">
              <p className="text-sm font-medium">Connect with batch-mates in your city</p>
              <p className="text-xs text-muted-foreground">5 alumni from your batch in Mumbai</p>
            </div>
            <div className="p-3 bg-secondary/50 rounded-lg">
              <p className="text-sm font-medium">Mentor opportunity</p>
              <p className="text-xs text-muted-foreground">3 students seeking ML guidance</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full mt-3">
            View All Suggestions
          </Button>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card className="hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Upcoming Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockEvents.slice(0, 2).map((event) => (
              <div key={event.id} className="p-3 border rounded-lg hover:bg-secondary/50 transition-colors">
                <h4 className="font-medium text-sm">{event.title}</h4>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(event.date).toLocaleDateString()}
                  </span>
                  <Badge variant="outline" className="text-xs">RSVP</Badge>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" className="w-full mt-3">
            View All Events
          </Button>
        </CardContent>
      </Card>

      {/* Communities Section */}
      <Card className="hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            My Communities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-secondary/50 transition-colors">
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    ID
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium text-sm">IIT Delhi Alumni</h4>
                  <p className="text-xs text-muted-foreground">12.4k members</p>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">Active</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-secondary/50 transition-colors">
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-accent text-accent-foreground text-xs">
                    TE
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium text-sm">Tech Entrepreneurs</h4>
                  <p className="text-xs text-muted-foreground">8.7k members</p>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">Active</Badge>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full mt-3">
            View All Communities
          </Button>
        </CardContent>
      </Card>

      {/* Job Recommendations */}
      <Card className="hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-success" />
            Recommended Jobs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg hover:bg-secondary/50 transition-colors">
              <h4 className="font-medium text-sm">Senior Software Engineer</h4>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <Building className="h-3 w-3" />
                Google • Bangalore • ₹25L-35L
              </p>
              <div className="flex gap-1 mt-2">
                <Badge variant="secondary" className="text-xs">React</Badge>
                <Badge variant="secondary" className="text-xs">Node.js</Badge>
              </div>
            </div>
            <div className="p-3 border rounded-lg hover:bg-secondary/50 transition-colors">
              <h4 className="font-medium text-sm">Product Manager - AI/ML</h4>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <Building className="h-3 w-3" />
                Microsoft • Hyderabad • ₹20L-28L
              </p>
              <div className="flex gap-1 mt-2">
                <Badge variant="secondary" className="text-xs">AI/ML</Badge>
                <Badge variant="secondary" className="text-xs">Strategy</Badge>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full mt-3">
            View All Jobs
          </Button>
        </CardContent>
      </Card>

      {/* Donation Campaigns */}
      <Card className="hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-accent" />
              Mentorship
            </span>
            <Button size="sm" className="btn-accent">Offer Mentorship</Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground mb-3">
              Share your expertise and help students grow
            </p>
            <Button variant="outline" size="sm">Browse Mentorship Requests</Button>
          </div>
        </CardContent>
      </Card>

      {/* Donation Campaigns */}
      <Card className="hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-destructive" />
            Support Your Institute
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockDonations.map((campaign) => (
              <div key={campaign.id} className="space-y-3 p-3 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-sm">{campaign.title}</h4>
                    <p className="text-xs text-muted-foreground">{campaign.donors} donors</p>
                  </div>
                  <Button size="sm" className="btn-hero">
                    <DollarSign className="h-3 w-3 mr-1" />
                    Donate
                  </Button>
                </div>
                <Progress value={(campaign.raised / campaign.target) * 100} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>₹{campaign.raised.toLocaleString()}</span>
                  <span>Goal: ₹{campaign.target.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" className="w-full mt-3">
            View All Campaigns
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderStudentDashboard = () => (
    <div className="dashboard-grid">
      {/* Welcome Card */}
      <Card className="card-elegant col-span-full">
        <CardHeader>
          <CardTitle className="text-xl">Welcome, {user?.name}! 🎓</CardTitle>
          <CardDescription>
            Discover mentors, internships, and events tailored for students
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Suggested Mentors */}
      <Card className="hover-lift col-span-full md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Suggested Mentors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockMentorships.map((mentor) => (
              <div key={mentor.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {mentor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-sm">{mentor.name}</h4>
                    <p className="text-xs text-muted-foreground">{mentor.role} at {mentor.company}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">Request Mentorship</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Internship Recommendations */}
      <Card className="hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-success" />
            Internships
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockJobs.filter(job => job.type === 'Internship').map((job) => (
              <div key={job.id} className="p-3 border rounded-lg hover:bg-secondary/50 transition-colors">
                <h4 className="font-medium text-sm">{job.title}</h4>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <Building className="h-3 w-3" />
                  {job.company} • {job.location}
                </p>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" className="w-full mt-3">
            View All Opportunities
          </Button>
        </CardContent>
      </Card>

      {/* Events */}
      <Card className="hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-accent" />
            Student Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockEvents.slice(0, 2).map((event) => (
              <div key={event.id} className="p-3 border rounded-lg">
                <h4 className="font-medium text-sm">{event.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(event.date).toLocaleDateString()} • {event.attendees} attending
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderEmployerDashboard = () => (
    <div className="dashboard-grid">
      {/* Post Job Card */}
      <Card className="card-elegant col-span-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              Employer Dashboard
            </span>
            <Button className="btn-hero">
              <Plus className="h-4 w-4 mr-2" />
              Post New Job
            </Button>
          </CardTitle>
          <CardDescription>
            Connect with talented alumni and students from top institutes
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Active Job Postings */}
      <Card className="hover-lift col-span-full md:col-span-2">
        <CardHeader>
          <CardTitle>Active Job Postings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockJobs.slice(0, 3).map((job) => (
              <div key={job.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium text-sm">{job.title}</h4>
                  <p className="text-xs text-muted-foreground">{job.location} • {job.type}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">25 applications</Badge>
                  <Button size="sm" variant="outline">View</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Analytics Snippet */}
      <Card className="hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-accent" />
            Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Profile Views</span>
                <span className="font-medium">1,234</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Applications</span>
                <span className="font-medium">89</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAdminDashboard = () => (
    <div className="dashboard-grid">
      {/* Admin Overview */}
      <Card className="card-elegant col-span-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Award className="h-5 w-5 text-warning" />
              Institute Admin Dashboard
            </span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Bulk Upload</Button>
              <Button className="btn-hero" size="sm">Create Event</Button>
            </div>
          </CardTitle>
          <CardDescription>
            Manage alumni verification, events, and donation campaigns
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Pending Verifications */}
      <Card className="hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Pending Verifications
            </span>
            <Badge className="bg-warning/10 text-warning">12 pending</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 border rounded">
              <span className="text-sm">John Smith (2020CS123)</span>
              <div className="flex gap-1">
                <Button size="sm" variant="outline" className="h-7 px-2 text-xs">Reject</Button>
                <Button size="sm" className="h-7 px-2 text-xs bg-success hover:bg-success/90">Approve</Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-2 border rounded">
              <span className="text-sm">Sarah Kumar (2019EE456)</span>
              <div className="flex gap-1">
                <Button size="sm" variant="outline" className="h-7 px-2 text-xs">Reject</Button>
                <Button size="sm" className="h-7 px-2 text-xs bg-success hover:bg-success/90">Approve</Button>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full mt-3">View All</Button>
        </CardContent>
      </Card>

      {/* Donations Dashboard */}
      <Card className="hover-lift col-span-full md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-destructive" />
              Fundraising Management
            </span>
            <Button className="btn-hero" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Create Campaign
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Active Campaigns</h4>
              {mockDonations.map((campaign) => (
                <div key={campaign.id} className="space-y-2 p-3 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium text-sm">{campaign.title}</h5>
                      <p className="text-xs text-muted-foreground">{campaign.donors} donors</p>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" className="h-7 px-2 text-xs">Edit</Button>
                      <Button size="sm" variant="outline" className="h-7 px-2 text-xs">View</Button>
                    </div>
                  </div>
                  <Progress value={(campaign.raised / campaign.target) * 100} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>₹{campaign.raised.toLocaleString()}</span>
                    <span>₹{campaign.target.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Recent Donations</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <span className="text-sm font-medium">Amit Kumar</span>
                    <p className="text-xs text-muted-foreground">Computer Lab Upgrade</p>
                  </div>
                  <Badge className="bg-success/10 text-success">₹25,000</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <span className="text-sm font-medium">Priya Singh</span>
                    <p className="text-xs text-muted-foreground">Scholarship Fund</p>
                  </div>
                  <Badge className="bg-success/10 text-success">₹50,000</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <span className="text-sm font-medium">Anonymous</span>
                    <p className="text-xs text-muted-foreground">Computer Lab Upgrade</p>
                  </div>
                  <Badge className="bg-success/10 text-success">₹10,000</Badge>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">View All Donations</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analytics */}
      <Card className="hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-accent" />
            Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">2,456</div>
              <div className="text-xs text-muted-foreground">Total Alumni</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-success">89%</div>
              <div className="text-xs text-muted-foreground">Verified</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">156</div>
              <div className="text-xs text-muted-foreground">Active Mentors</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-warning">₹12L</div>
              <div className="text-xs text-muted-foreground">Donations</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDashboardContent = () => {
    switch (selectedRole) {
      case 'alumni':
        return renderAlumniDashboard();
      case 'student':
        return renderStudentDashboard();
      case 'employer':
        return renderEmployerDashboard();
      case 'admin':
        return renderAdminDashboard();
      default:
        return renderAlumniDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      <div className="max-w-7xl mx-auto container-padding py-8">
        {/* Role Switcher */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gradient-primary">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.name}! Here's what's happening in your network.
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">View as:</span>
            {['alumni', 'student', 'employer', 'admin'].map((role) => (
              <Button
                key={role}
                size="sm"
                variant={selectedRole === role ? "default" : "outline"}
                onClick={() => {
                  setSelectedRole(role);
                  onRoleChange?.(role);
                }}
                className={selectedRole === role ? "btn-hero" : ""}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="animate-fade-in">
          {renderDashboardContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;