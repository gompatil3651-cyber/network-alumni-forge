# NetworkNexus - Alumni Platform MVP

A comprehensive alumni networking platform connecting graduates, students, employers, and institutes worldwide. Built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

### **MVP Features (Core Implementation)**
- ✅ **Landing Page**: Professional hero section with stats, features, testimonials
- ✅ **Authentication**: Email OTP mock flow with domain verification
- ✅ **Role-Based Dashboards**: Alumni, Student, Employer, Institute Admin views
- ✅ **Profile Management**: Editable profiles with verification status
- ✅ **Events System**: Event listings with RSVP functionality
- ✅ **Mock Data Integration**: LocalStorage persistence for demo purposes

### **Upcoming Features (Next Phase)**
- 🔄 **Communities & Feed**: Discussion forums and community posts
- 🔄 **Mentorship System**: Mentor matching and request management  
- 🔄 **Jobs Board**: Job postings and application tracking
- 🔄 **Donations**: Campaign management and payment flows
- 🔄 **Chat System**: Real-time messaging between users
- 🔄 **Advanced Analytics**: Comprehensive reporting dashboards

## 🎨 Design System

NetworkNexus uses a professional design language with:
- **Navy Primary** (`#0b3d91`) - Brand color for primary actions
- **Accent Teal** - For highlights and secondary actions  
- **Slate Greys** - Neutral palette for content
- **Semantic Tokens** - All colors defined in CSS custom properties
- **Professional Animations** - Subtle hover effects and transitions
- **Mobile-First** - Responsive design for all screen sizes

## 🛠 Technology Stack

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn/ui with custom variants
- **Routing**: React Router v6
- **State Management**: React Context + LocalStorage
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Data**: Mock JSON files for demonstration

## 📁 Project Structure

```
src/
├── components/
│   ├── Layout/
│   │   └── Header.tsx          # Navigation with role switching
│   └── ui/                     # Shadcn components with custom variants
├── hooks/
│   └── useAuth.tsx             # Authentication context and mock APIs
├── mock-data/
│   ├── institutes.json         # Institute database
│   ├── shadowRecords.json      # Student/alumni verification data
│   └── events.json             # Event listings
├── pages/
│   ├── LandingPage.tsx         # Public homepage
│   ├── LoginPage.tsx           # Authentication with OTP
│   ├── SignupPage.tsx          # Multi-step registration
│   └── Dashboard.tsx           # Role-based dashboard views
└── index.css                   # Design system tokens
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation & Running
```bash
# Clone and setup (replace with your actual git URL)
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:8080`

## 🎭 Demo Usage

### Quick Demo Login
The login page includes demo accounts for testing different roles:

- **Alumni**: `john.doe@iitd.ac.in` (IIT Delhi graduate)
- **Student**: `jane.smith@iitb.ac.in` (IIT Bombay current)  
- **Employer**: `sarah.wilson@company.com` (Corporate recruiter)

### Email OTP Flow
1. Enter any of the demo emails
2. Click "Send OTP" 
3. Use code: `123456` (displayed in demo)
4. Automatic login and dashboard redirect

### Role Switching (Demo Mode)
- Use the dropdown in the header to switch between role views
- Each role shows different dashboard content and features
- Real implementation would require proper authentication

### Institute Domain Verification
- Emails ending in `.ac.in` domains show "Verified via institute" 
- Simulates automatic verification for known institute domains
- Unknown domains trigger manual verification workflow

## 🔧 Backend Integration Points

### Required API Endpoints
```typescript
// Authentication
POST /api/auth/send-otp          // Send OTP to email
POST /api/auth/verify-otp        // Verify OTP and create session
POST /api/auth/signup            // Create new user account
POST /api/auth/logout            // Invalidate session

// Users & Profiles  
GET  /api/users/profile          // Get current user profile
PUT  /api/users/profile          // Update profile information
POST /api/users/verify           // Submit verification documents

// Events
GET  /api/events                 // List events with filters
POST /api/events/{id}/rsvp       // RSVP to event
GET  /api/events/{id}/attendees  // Get event attendees

// Institute Admin
GET  /api/admin/pending-verifications  // Pending user verifications
PUT  /api/admin/verify/{userId}        // Approve/reject verification
POST /api/admin/bulk-upload            // CSV bulk user upload

// AI/ML Endpoints (Placeholder locations)
POST /api/ai/recommendations     // Get personalized suggestions
POST /api/ai/mentor-matching     // Find mentor matches
POST /api/ai/search              // Semantic search across platform
```

### Environment Variables Needed
```env
VITE_API_BASE_URL=          # Backend API URL
VITE_OAUTH_GOOGLE_ID=       # Google OAuth client ID  
VITE_OAUTH_LINKEDIN_ID=     # LinkedIn OAuth client ID
VITE_OAUTH_GITHUB_ID=       # GitHub OAuth client ID
VITE_STRIPE_PUBLIC_KEY=     # Stripe publishable key (donations)
VITE_UPLOAD_ENDPOINT=       # File upload service URL
```

## 🔐 Security & Privacy Considerations

### Data Protection
- All sensitive data (passwords, tokens) must be server-side only
- Implement proper session management and CSRF protection
- Use HTTPS in production for all API communications
- Encrypt PII data in database

### GDPR Compliance  
- Cookie consent banner for tracking
- Data export functionality for user requests
- Data deletion workflows
- Privacy policy and terms of service pages

### Authentication Security
- Rate limiting on OTP endpoints to prevent spam
- OTP expiration (5-10 minutes recommended)
- Account lockout after failed attempts
- Secure session tokens with proper expiration

## 📈 Analytics Integration

### Recommended Tracking Events
```javascript
// User engagement
analytics.track('user_signup', { role, institute, source });
analytics.track('profile_completed', { verification_method });
analytics.track('event_rsvp', { event_id, event_type });
analytics.track('mentor_request', { mentor_id, student_id });

// Platform usage  
analytics.track('search_performed', { query, results_count });
analytics.track('job_application', { job_id, company });
analytics.track('donation_completed', { amount, campaign_id });
```

## 🚀 Deployment Checklist

### Production Setup
- [ ] Set up production API endpoints
- [ ] Configure OAuth providers (Google, LinkedIn, GitHub) 
- [ ] Set up email service (SendGrid, AWS SES) for OTP delivery
- [ ] Configure file upload storage (AWS S3, Cloudinary)
- [ ] Set up payment processing (Stripe for donations)
- [ ] Implement proper error tracking (Sentry, LogRocket)
- [ ] Add analytics (Google Analytics, Mixpanel)
- [ ] Configure CDN for static assets
- [ ] Set up SSL certificates
- [ ] Database setup with proper indexing

### Performance Optimizations
- [ ] Code splitting for route-based chunks
- [ ] Image optimization and lazy loading  
- [ ] API response caching strategies
- [ ] Search indexing (Elasticsearch/Algolia)
- [ ] Real-time features (WebSockets/Socket.io)

## 🤝 Contributing

This is an MVP built for demonstration. For production deployment:

1. Replace all mock data with real API integrations
2. Implement proper authentication and authorization
3. Add comprehensive error handling and validation
4. Set up proper testing (unit, integration, e2e)
5. Configure monitoring and alerting systems

## 📋 TODOs for Backend Integration

### High Priority
1. **Real OAuth Integration** - Replace placeholder buttons with actual OAuth flows
2. **Payment Gateway** - Integrate Stripe/Razorpay for donation processing  
3. **Persistent Database** - Replace localStorage with proper database (PostgreSQL recommended)
4. **Email Service** - Set up transactional emails for OTP, notifications
5. **File Upload** - Document upload for verification, profile pictures

### Medium Priority
1. **Real-time Chat** - WebSocket integration for messaging
2. **Search Engine** - Elasticsearch/Algolia for powerful search
3. **AI Recommendations** - ML models for mentor matching, job suggestions
4. **Bulk Operations** - CSV processing for admin bulk uploads
5. **Advanced Analytics** - Dashboard reporting and insights

---

**Built with ❤️ for alumni communities worldwide**

*NetworkNexus - Connecting graduates, students, and institutes in one powerful platform.*