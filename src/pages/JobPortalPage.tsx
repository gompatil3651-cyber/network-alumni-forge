import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Briefcase, 
  Search, 
  Filter, 
  MapPin,
  DollarSign,
  Clock,
  Users,
  Building,
  ExternalLink,
  Bookmark,
  Share,
  TrendingUp,
  Calendar
} from 'lucide-react';

// Import mock data
import jobsData from '@/mock-data/jobs.json';

const JobPortalPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const filteredJobs = jobsData.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === 'all' || job.type === selectedType;
    const matchesLocation = selectedLocation === 'all' || job.location.city === selectedLocation;
    return matchesSearch && matchesType && matchesLocation && job.isActive;
  });

  const formatSalary = (job: any) => {
    const { min, max, currency, period } = job.salary;
    if (period === 'monthly') {
      return `₹${(min / 1000).toFixed(0)}K-${(max / 1000).toFixed(0)}K/month`;
    }
    return `₹${(min / 100000).toFixed(1)}L-${(max / 100000).toFixed(1)}L/year`;
  };

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'Full-time': return 'bg-primary/10 text-primary';
      case 'Internship': return 'bg-accent/10 text-accent';
      case 'Part-time': return 'bg-success/10 text-success';
      case 'Contract': return 'bg-warning/10 text-warning';
      default: return 'bg-secondary/50 text-muted-foreground';
    }
  };

  const uniqueLocations = [...new Set(jobsData.map(job => job.location.city))];
  const uniqueTypes = [...new Set(jobsData.map(job => job.type))];

  return (
    <div className="min-h-screen bg-secondary/30">
      <div className="max-w-7xl mx-auto container-padding py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gradient-primary">Job Portal</h1>
            <p className="text-muted-foreground">
              Discover opportunities from alumni and top companies
            </p>
          </div>
          <Button className="btn-hero">
            <Briefcase className="h-4 w-4 mr-2" />
            Post a Job
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search jobs, companies, skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <select 
                  className="px-3 py-2 border border-border rounded-md bg-background text-sm"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  {uniqueTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <select 
                  className="px-3 py-2 border border-border rounded-md bg-background text-sm"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option value="all">All Locations</option>
                  {uniqueLocations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-2xl font-bold">{jobsData.filter(j => j.isActive).length}</div>
                  <div className="text-xs text-muted-foreground">Active Jobs</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5 text-accent" />
                <div>
                  <div className="text-2xl font-bold">{new Set(jobsData.map(j => j.company.name)).size}</div>
                  <div className="text-xs text-muted-foreground">Companies</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-success" />
                <div>
                  <div className="text-2xl font-bold">{jobsData.reduce((sum, job) => sum + job.applications, 0)}</div>
                  <div className="text-xs text-muted-foreground">Applications</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-warning" />
                <div>
                  <div className="text-2xl font-bold">{jobsData.filter(j => j.postedBy.isAlumni).length}</div>
                  <div className="text-xs text-muted-foreground">Alumni Posted</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover-lift">
              <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Company Logo */}
                  <Avatar className="h-16 w-16 rounded-lg">
                    <AvatarImage src={job.company.logo} alt={job.company.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold rounded-lg">
                      {job.company.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>

                  {/* Job Details */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-semibold">{job.title}</h3>
                          <p className="text-lg text-muted-foreground">{job.company.name}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Bookmark className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Job Meta */}
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location.city}, {job.location.state}
                        {job.location.isRemote && " • Remote"}
                        {job.location.hybrid && " • Hybrid"}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {formatSalary(job)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {job.experience}
                      </span>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2">
                      <Badge className={getJobTypeColor(job.type)}>
                        {job.type}
                      </Badge>
                      {job.postedBy.isAlumni && (
                        <Badge className="bg-success/10 text-success">
                          Posted by Alumni
                        </Badge>
                      )}
                      <Badge variant="outline">
                        {job.applications} applications
                      </Badge>
                    </div>

                    {/* Skills */}
                    <div>
                      <div className="flex flex-wrap gap-1">
                        {job.skills.slice(0, 5).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {job.skills.length > 5 && (
                          <Badge variant="secondary" className="text-xs">
                            +{job.skills.length - 5}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {job.description}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                      <Button className="btn-hero">
                        Apply Now
                      </Button>
                      <Button variant="outline">
                        View Details
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredJobs.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No jobs found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or check back later for new opportunities
              </p>
              <Button className="btn-hero">
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default JobPortalPage;