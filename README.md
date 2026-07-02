# Helicorp E-Commerce Platform

Welcome to the **Helicorp** repository. This is a premium, futuristic e-commerce platform built with a microservices architecture. It features a cutting-edge Glassmorphism UI, integrated AI chatbot capabilities, and real-time user behavior tracking.

##  Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS & Vanilla CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

### Backend
- **Language**: Golang (1.23+)
- **Framework**: Gin Web Framework
- **Database**: SQLite (via GORM)
- **AI Integration**: Google Gemini API (`gemini-2.5-flash`)

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Routing**: Inter-container networking (`backend:8080`)

##  Key Features

1. **Stunning UI/UX**: Premium Glassmorphism design, dark mode aesthetics, and micro-interactions.
2. **AI Shopping Assistant**: Integrated Google Gemini Chatbot that reads the product catalog in real-time to advise customers.
3. **Behavior Tracking**: Global click and scroll depth (50%, 90%) tracker with real-time webhook event firing and smooth stacking toast notifications.
4. **Newsletter Webhook**: Native email collection form that posts directly to the Go backend.
5. **Product Management**: Server-side rendering for product detail pages to ensure maximum SEO optimization.

##  Local Development

Ensure you have Docker and Docker Compose installed on your machine.

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd helicorp
   ```

2. **Environment Variables**:
   Create a `.env` file in the root directory (where `docker-compose.yml` is located):
   ```env
   GEMINI_API_KEY=your_google_gemini_api_key_here
   ```

3. **Start the application**:
   ```bash
   docker-compose up --build
   ```

4. **Access the services**:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:8080](http://localhost:8080)

##  Deployment Strategy

Since this project uses a split architecture, it should be deployed using specialized hosting platforms for maximum efficiency:

- **Frontend**: Deploy on **Vercel** for optimal Next.js performance and global CDN delivery.
- **Backend**: Deploy on **Render** or **Railway** (Docker-based deployment) to keep the Go server and SQLite database running continuously.

*(See deployment documentation for specific step-by-step setup).*
