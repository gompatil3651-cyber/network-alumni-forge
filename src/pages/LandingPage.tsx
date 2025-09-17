import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Calendar, 
  Briefcase, 
  GraduationCap, 
  MessageSquare, 
  Trophy,
  Heart,
  TrendingUp,
  Shield,
  Zap,
  Globe,
  ArrowRight,
  Star,
  CheckCircle
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const stats = [
    { label: 'Alumni Connected', value: '25,000+', icon: Users },
    { label: 'Institutes Onboarded', value: '150+', icon: GraduationCap },
    { label: 'Events Organized', value: '2,500+', icon: Calendar },
    { label: 'Success Stories', value: '10,000+', icon: Trophy }
  ];

  const features = [
    {
      icon: Users,
      title: 'Alumni Communities',
      description: 'Connect with fellow alumni across institutes, batches, and industries. Build meaningful professional relationships.',
      color: 'text-primary'
    },
    {
      icon: Calendar,
      title: 'Events & Reunions',
      description: 'Discover and organize alumni events, webinars, and reunions. Stay connected with your alma mater.',
      color: 'text-accent'
    },
    {
      icon: MessageSquare,
      title: 'Mentorship Program',
      description: 'Give back by mentoring students or get guidance from experienced alumni in your field.',
      color: 'text-success'
    },
    {
      icon: Briefcase,
      title: 'Job Opportunities',
      description: 'Access exclusive job postings and internships shared within the alumni network.',
      color: 'text-warning'
    },
    {
      icon: Heart,
      title: 'Donations & Giving',
      description: 'Support your institute through targeted donations and see the real impact of your contributions.',
      color: 'text-destructive'
    },
    {
      icon: TrendingUp,
      title: 'Analytics & Insights',
      description: 'Institutes get powerful analytics on alumni engagement, donations, and network growth.',
      color: 'text-accent-light'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Software Engineer, Google',
      institute: 'IIT Delhi',
      content: 'NetworkNexus helped me find the perfect mentor who guided my career transition into tech. The community support is incredible!',
      rating: 5
    },
    {
      name: 'Rajesh Kumar',
      role: 'VP Engineering, Flipkart',
      institute: 'IIT Bombay',
      content: 'As an alumni, I love giving back through mentorship. The platform makes it so easy to connect with students seeking guidance.',
      rating: 5
    },
    {
      name: 'Dr. Anjali Patel',
      role: 'Dean of Alumni Relations',
      institute: 'IIT Madras',
      content: 'Our donation campaigns have seen 300% better engagement since using NetworkNexus. The analytics help us understand our community better.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="hero-gradient text-primary-foreground section-padding">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-primary-light/20 text-primary-foreground border-primary-light/30" variant="outline">
            ✨ Connecting 25,000+ Alumni Worldwide
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Your Alumni Network,
            <br />
            <span className="text-accent-light">Reimagined</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
            Connect, mentor, and grow with fellow alumni. NetworkNexus brings together graduates, 
            students, and institutes in one powerful platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="btn-accent text-lg px-8 py-3" asChild>
              <a href="/signup">
                Join as Alumni
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <a href="/institutes">For Institutes</a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <a href="/employers">For Employers</a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-foreground/20 rounded-lg mb-2">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-primary-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gradient-primary">
              Everything You Need to Build Strong Alumni Connections
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From mentorship programs to donation campaigns, NetworkNexus provides all the tools 
              to create thriving alumni communities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover-lift animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className={`inline-flex items-center justify-center w-12 h-12 ${feature.color} bg-current/10 rounded-lg mb-4`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gradient-primary">
              Trusted by Alumni & Institutes Worldwide
            </h2>
            <p className="text-xl text-muted-foreground">
              See what our community members have to say about their NetworkNexus experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-elegant animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-warning fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-3">
                      <span className="text-primary-foreground font-semibold text-sm">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      <div className="text-xs text-primary">{testimonial.institute}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="hero-gradient text-primary-foreground section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Join Your Alumni Network?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Connect with 25,000+ alumni, find mentors, discover opportunities, and give back to your community.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-accent text-lg px-8 py-3" asChild>
              <a href="/signup">
                Get Started for Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <a href="/demo">Watch Demo</a>
            </Button>
          </div>

          <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-primary-foreground/80">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-1" />
              Free to join
            </div>
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-1" />
              Secure & Private
            </div>
            <div className="flex items-center">
              <Zap className="h-4 w-4 mr-1" />
              Instant connections
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center mr-3">
                  <span className="text-accent-foreground font-bold text-sm">N</span>
                </div>
                <span className="text-xl font-bold">NetworkNexus</span>
              </div>
              <p className="text-background/80 mb-6 max-w-md">
                Connecting alumni, students, and institutes worldwide. Building stronger communities, 
                one connection at a time.
              </p>
              <div className="flex items-center space-x-4">
                <Globe className="h-5 w-5 text-accent" />
                <span className="text-sm">Available globally in 15+ countries</span>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-sm text-background/80">
                <li><a href="/features" className="hover:text-accent transition-colors">Features</a></li>
                <li><a href="/pricing" className="hover:text-accent transition-colors">Pricing</a></li>
                <li><a href="/security" className="hover:text-accent transition-colors">Security</a></li>
                <li><a href="/api" className="hover:text-accent transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-background/80">
                <li><a href="/help" className="hover:text-accent transition-colors">Help Center</a></li>
                <li><a href="/contact" className="hover:text-accent transition-colors">Contact</a></li>
                <li><a href="/privacy" className="hover:text-accent transition-colors">Privacy</a></li>
                <li><a href="/terms" className="hover:text-accent transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm text-background/60">
            <p>&copy; 2024 NetworkNexus. All rights reserved. Built with ❤️ for alumni communities worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;