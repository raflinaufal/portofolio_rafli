# Portfolio Website with Next.js 14

A modern, dynamic portfolio website built with Next.js 14, featuring real-time chat, content management dashboard, and Google authentication.

## 🚀 Features

### Public Pages
- **Home Page**: Dynamic content with call-to-action
- **About Page**: Personal information, skills, and experience
- **Projects Page**: Portfolio projects with technologies and links
- **Contact Page**: Contact form with message storage

### Protected Features (Login Required)
- **Chat Room**: Real-time messaging with Socket.IO
- **Dashboard**: Content management system
  - Manage About content
  - CRUD operations for Projects
  - View and manage contact messages
  - Manage Skills and Experience
  - GitHub repository integration

### Authentication & Security
- Google OAuth integration with NextAuth.js
- Protected routes with middleware
- Role-based access control

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **State Management**: Redux Toolkit
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with Google provider
- **Real-time**: Socket.IO
- **Styling**: Tailwind CSS

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Google OAuth credentials
- GitHub personal access token (optional)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portofolio_next
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://postgres:root@localhost:5432/portfolio_db?schema=public"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   GITHUB_TOKEN="your-github-token"
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate dev --name init
   
   # (Optional) Seed database with sample data
   npx prisma db seed
   ```

5. **Google OAuth Setup**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add `http://localhost:3000/api/auth/callback/google` to authorized redirect URIs
   - Copy Client ID and Client Secret to your `.env` file

## 🚀 Running the Application

### Development Mode
```bash
# Run both Next.js app and Socket.IO server
npm run dev:all

# Or run them separately:
# Terminal 1: Next.js app
npm run dev

# Terminal 2: Socket.IO server
npm run dev:server
```

### Production Mode
```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── chat/              # Chat room
│   ├── dashboard/         # Admin dashboard
│   └── ...                # Public pages
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── providers/        # Context providers
├── lib/                  # Utilities and configurations
│   ├── slices/           # Redux slices
│   └── ...               # Other utilities
└── hooks/                # Custom React hooks

prisma/
└── schema.prisma         # Database schema

server.js                 # Socket.IO server
```

## 🗄️ Database Schema

The application uses the following main models:
- **User**: Authentication and user data
- **HomeContent**: Home page content
- **AboutContent**: About page information
- **Project**: Portfolio projects
- **Skill**: Skills and expertise
- **Experience**: Work experience
- **ContactMessage**: Contact form messages
- **Message**: Chat messages

## 🔐 Authentication Flow

1. User clicks "Sign In" button
2. Redirected to Google OAuth
3. After successful authentication, user data is stored in database
4. User can access protected features (Chat, Dashboard)

## 💬 Real-time Chat

The chat feature uses Socket.IO for real-time messaging:
- Messages are stored in PostgreSQL database
- Real-time updates across all connected clients
- User authentication required to access chat room

## 📊 Dashboard Features

The admin dashboard provides:
- **Statistics**: Overview of content counts
- **Content Management**: CRUD operations for all content types
- **Message Management**: View and manage contact form submissions
- **GitHub Integration**: Display public repositories

## 🎨 Customization

### Styling
- Modify `tailwind.config.ts` for theme customization
- Update `src/app/globals.css` for global styles
- Customize shadcn/ui components in `src/components/ui/`

### Content
- All content is managed through the dashboard
- Database seeding scripts available for initial content
- API routes for content management

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
- Ensure PostgreSQL database is accessible
- Set up Socket.IO server separately
- Configure environment variables
- Build and deploy Next.js application

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments

## 🔄 Updates

To update dependencies:
```bash
npm update
npx prisma generate
```

Remember to test thoroughly after updates!
