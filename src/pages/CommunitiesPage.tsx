import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  Search, 
  Filter, 
  Plus,
  MessageSquare,
  Calendar,
  TrendingUp,
  Globe,
  Lock,
  MapPin
} from 'lucide-react';

// Import mock data
import communitiesData from '@/mock-data/communities.json';
import institutesData from '@/mock-data/institutes.json';

const CommunitiesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const filteredCommunities = communitiesData.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         community.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || community.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getInstituteInfo = (instituteId: string | null) => {
    if (!instituteId) return null;
    return institutesData.find(inst => inst.id === instituteId);
  };

  const getCommunityTypeColor = (type: string) => {
    switch (type) {
      case 'institute': return 'bg-primary/10 text-primary';
      case 'field': return 'bg-accent/10 text-accent';
      case 'interest': return 'bg-success/10 text-success';
      case 'diversity': return 'bg-warning/10 text-warning';
      default: return 'bg-secondary/50 text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      <div className="max-w-7xl mx-auto container-padding py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gradient-primary">Communities</h1>
            <p className="text-muted-foreground">
              Connect with alumni and students from your institute and interests
            </p>
          </div>
          <Button className="btn-hero">
            <Plus className="h-4 w-4 mr-2" />
            Create Community
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search communities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                {['all', 'institute', 'field', 'interest', 'diversity'].map((type) => (
                  <Button
                    key={type}
                    size="sm"
                    variant={selectedType === type ? "default" : "outline"}
                    onClick={() => setSelectedType(type)}
                    className={selectedType === type ? "btn-hero" : ""}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Communities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCommunities.map((community) => {
            const instituteInfo = getInstituteInfo(community.instituteId);
            
            return (
              <Card key={community.id} className="hover-lift overflow-hidden">
                {/* Cover Image */}
                <div className="h-32 bg-gradient-subtle relative overflow-hidden">
                  <img 
                    src={community.coverImage} 
                    alt={`${community.name} cover`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    {community.isPublic ? (
                      <Badge className="bg-success/90 text-white">
                        <Globe className="h-3 w-3 mr-1" />
                        Public
                      </Badge>
                    ) : (
                      <Badge className="bg-warning/90 text-white">
                        <Lock className="h-3 w-3 mr-1" />
                        Private
                      </Badge>
                    )}
                  </div>
                </div>

                <CardHeader className="pb-2">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-12 w-12 border-2 border-background -mt-8 relative z-10">
                      <AvatarImage src={community.image} alt={community.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                        {community.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-lg leading-tight">{community.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getCommunityTypeColor(community.type)}>
                          {community.type}
                        </Badge>
                        {instituteInfo && (
                          <Badge variant="outline" className="text-xs">
                            {instituteInfo.shortName}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <CardDescription className="text-sm mb-4 line-clamp-2">
                    {community.description}
                  </CardDescription>

                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {community.members.toLocaleString()} members
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      Active
                    </span>
                  </div>

                  {/* Categories */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {community.categories.slice(0, 3).map((category) => (
                      <Badge key={category} variant="secondary" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                    {community.categories.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{community.categories.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button className="btn-hero flex-1" size="sm">
                      Join Community
                    </Button>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredCommunities.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No communities found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filters, or create a new community
              </p>
              <Button className="btn-hero">
                <Plus className="h-4 w-4 mr-2" />
                Create Community
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CommunitiesPage;