# CarePath AI

A role-based healthcare access ecosystem with an AI intelligence layer connecting patients, verified hospitals, healthcare professionals, independent experts, and administrators.

---

## Overview

CarePath AI is a complete full-stack web application built with:

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: MongoDB + Mongoose
- **Auth**: JWT (access + refresh tokens)
- **AI Layer**: Provider-independent AI service + RAG architecture

---

## Project Structure

```
CarePath-AI/
├── client/                   # Vite + React frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── common/       # Button, Badge, EmptyState, Skeleton…
│   │   │   └── layout/       # Navbar, Footer, DashboardLayout…
│   │   ├── context/          # AuthContext
│   │   ├── hooks/            # useAuth, useToast
│   │   ├── pages/
│   │   │   ├── public/       # Landing, About, HowItWorks, Contact
│   │   │   ├── auth/         # Login, Register
│   │   │   ├── user/         # Patient dashboard & flows
│   │   │   ├── hospital/     # Hospital dashboard & management
│   │   │   ├── professional/ # Professional dashboard
│   │   │   ├── expert/       # Expert dashboard
│   │   │   └── admin/        # Admin panel
│   │   ├── routes/           # AppRouter, ProtectedRoute, RoleRoute
│   │   ├── services/         # api.js (Axios base instance)
│   │   └── utils/            # helpers, constants
│   └── package.json
│
├── server/                   # Express backend
│   ├── config/               # db.js (Mongoose connection)
│   ├── controllers/          # Request handlers (added per stage)
│   ├── middleware/           # auth, rbac, validate, upload, errorHandler
│   ├── models/               # Mongoose models (added in Stage 3)
│   ├── routes/               # Express route files
│   ├── services/             # Business logic (added per stage)
│   ├── tests/                # Jest + Supertest suites (Stage 20)
│   ├── seed/                 # Database seeder (Stage 21)
│   ├── utils/                # logger, responseHelper, constants
│   ├── .env.example
│   └── server.js
│
├── .gitignore
└── README.md
```

---

## Environment Variables

**Never commit the real `.env` file.**

Copy `server/.env.example` to `server/.env` and fill in your values:

```
PORT=5000
NODE_ENV=development
MONGODB_URI=           ← your MongoDB Atlas or local connection string
JWT_SECRET=            ← long random string
JWT_REFRESH_SECRET=    ← separate long random string
CLIENT_URL=http://localhost:5173
AI_API_KEY=            ← optional — app runs in demo mode without it
MAPS_API_KEY=
OCR_API_KEY=
VOICE_API_KEY=
```

---

## Installation

### Prerequisites

- Node.js v18+
- MongoDB (Atlas or local)

### Install all dependencies

```bash
# From project root
npm run install:all
```

Or separately:

```bash
cd server && npm install
cd ../client && npm install
```

---

## Running the Application

### Start the backend (port 5000)

```bash
npm run server
# or: cd server && npm run dev
```

### Start the frontend (port 5173)

```bash
npm run dev
# or: cd client && npm run dev
```

### Build the frontend

```bash
npm run build
# or: cd client && npm run build
```

---

## API Health Check

Once the server is running:

```
GET http://localhost:5000/api/health
```

Should return:

```json
{
  "success": true,
  "message": "CarePath AI API is running",
  "environment": "development"
}
```

---

## User Roles

| Role | Description |
|------|-------------|
| `USER` | Patient — searches hospitals, books appointments, manages health records |
| `HOSPITAL` | Hospital administrator — manages institution profile and doctors |
| `PROFESSIONAL` | Doctor/specialist — manages credentials and consultations |
| `EXPERT` | Independent expert — accepts escalated consultations |
| `ADMIN` | Platform administrator — verifies entities and reviews platform health |

RBAC is enforced **server-side** on every protected API route.

---

## Implementation Stages

This project is built stage by stage:

| Stage | Focus |
|-------|-------|
| 2 ✅ | Project scaffold (this stage) |
| 3 | MongoDB + Mongoose models |
| 4 | Authentication + RBAC |
| 5 | Public pages (landing, about, contact) |
| 6 | User dashboard |
| 7 | Hospital management |
| 8 | Professional management |
| 9 | Expert management |
| 10 | Appointments & requests |
| 11 | Health reports & history |
| 12 | AI assistant |
| 13 | RAG architecture |
| 14 | Emergency & expert escalation |
| 15 | Notifications |
| 16 | Admin dashboard |
| 17 | Analytics |
| 18 | Security, audit logs & consent |
| 19 | Responsive UI polish |
| 20 | Test suite |
| 21 | Seed data + final integration |

---

## Security

- Passwords hashed with bcryptjs
- JWT access + refresh token pattern
- Helmet HTTP security headers
- CORS restricted to `CLIENT_URL`
- Global rate limiting (200 req/15 min)
- Per-route strict rate limiting on auth endpoints
- Input validation via express-validator
- Server-side RBAC — role never trusted from client
- Audit logging for all sensitive operations

---

## AI Architecture (Stage 12+)

```
User Input → Input Processing → Intent Detection → AI Orchestrator
  → Specialized Agent → RAG Retriever → LLM
  → Safety Validation → Response
```

If no `AI_API_KEY` is set, the application continues running in clearly-labelled **demo mode**. AI responses never present as medical diagnoses.

---

## License

MIT — for educational/portfolio purposes.
