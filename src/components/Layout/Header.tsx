import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  Search, 
  User, 
  Menu, 
  X,
  LogOut,
  Settings,
  BarChart3
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  onRoleSwitch?: (role: string) => void;
  currentRole?: string;
}

const Header: React.FC<HeaderProps> = ({ onRoleSwitch, currentRole }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement global search functionality
    console.log('Searching for:', searchQuery);
  };

  const handleRoleSwitch = (role: string) => {
    onRoleSwitch?.(role);
    setIsMenuOpen(false);
  };

  const roles = [
    { id: 'alumni', name: 'Alumni', badge: 'primary' },
    { id: 'student', name: 'Student', badge: 'accent' },
    { id: 'employer', name: 'Employer', badge: 'success' },
    { id: 'admin', name: 'Institute Admin', badge: 'warning' }
  ];

  return (
    <header className="nav-glass sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">N</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gradient-primary">
                NetworkNexus
              </span>
            </div>
            
            {/* Desktop Navigation */}
            {user && (
              <nav className="hidden md:flex items-center space-x-6">
                <a href="/dashboard" className="text-foreground hover:text-primary transition-colors">
                  Dashboard
                </a>
                <a href="/communities" className="text-foreground hover:text-primary transition-colors">
                  Communities
                </a>
                <a href="/jobs" className="text-foreground hover:text-primary transition-colors">
                  Jobs
                </a>
                <a href="/events" className="text-foreground hover:text-primary transition-colors">
                  Events
                </a>
                <a href="/mentorship" className="text-foreground hover:text-primary transition-colors">
                  Mentorship
                </a>
              </nav>
            )}
          </div>

          {/* Search Bar */}
          {user && (
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="w-full relative">
                <Input
                  type="text"
                  placeholder="Search alumni, events, projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-secondary/50"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </form>
            </div>
          )}

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Notifications */}
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs bg-accent">
                    3
                  </Badge>
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <span className="hidden sm:block font-medium">{user.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    
                    {/* Role Switcher (Demo Mode) */}
                    <DropdownMenuLabel className="text-xs text-muted-foreground">
                      Demo Role Switcher
                    </DropdownMenuLabel>
                    {roles.map((role) => (
                      <DropdownMenuItem 
                        key={role.id}
                        onClick={() => handleRoleSwitch(role.id)}
                        className="flex items-center justify-between"
                      >
                        <span>{role.name}</span>
                        {currentRole === role.id && (
                          <Badge variant="outline" className="text-xs">Current</Badge>
                        )}
                      </DropdownMenuItem>
                    ))}
                    
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Analytics
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuItem onClick={logout} className="text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <a href="/login">Sign In</a>
                </Button>
                <Button className="btn-hero" asChild>
                  <a href="/signup">Join Now</a>
                </Button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && user && (
          <div className="md:hidden py-4 border-t border-border/50">
            <nav className="flex flex-col space-y-2">
              <a href="/dashboard" className="px-3 py-2 text-foreground hover:text-primary transition-colors">
                Dashboard
              </a>
              <a href="/communities" className="px-3 py-2 text-foreground hover:text-primary transition-colors">
                Communities
              </a>
              <a href="/jobs" className="px-3 py-2 text-foreground hover:text-primary transition-colors">
                Jobs
              </a>
              <a href="/events" className="px-3 py-2 text-foreground hover:text-primary transition-colors">
                Events
              </a>
              <a href="/mentorship" className="px-3 py-2 text-foreground hover:text-primary transition-colors">
                Mentorship
              </a>
            </nav>
            
            {/* Mobile Search */}
            <div className="mt-4 px-3">
              <form onSubmit={handleSearch}>
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </form>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;