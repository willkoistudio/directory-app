# Directory App — Frontend

React SPA for the Directory App. Manages contacts and companies with full authentication support.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build tool | Vite 6 |
| Routing | React Router DOM 7 |
| State management | Redux Toolkit 2 |
| UI primitives | Radix UI |
| Styling | Tailwind CSS + tailwindcss-animate |
| Forms | React Hook Form 7 + Zod 3 |
| HTTP client | Axios |
| i18n | i18next + react-i18next (EN / FR) |
| Charts | Recharts |
| Icons | lucide-react |
| Notifications | Sonner |

## Prerequisites

- Node.js 18+
- Backend API running on `http://localhost:3000`

## Installation

```bash
npm install
cp .env.example .env
```

## Environment Variables

```env
VITE_API_URL=http://localhost:3000
```

## Running the App

```bash
# Development
npm run dev
# → http://localhost:5173

# Production build
npm run build

# Preview production build
npm run serve
```

## Project Structure

```
src/
├── assets/             # Static assets and global CSS
├── components/
│   ├── Navigation/     # Sidebar and Header
│   └── ui/            # Reusable Radix-based components
├── const/             # App-wide constants
├── context/
│   ├── PageNameContext.tsx
│   └── CountryStateCityContext.tsx
├── hooks/             # Custom React hooks
├── lang/              # Translation files
│   ├── en-US.ts
│   └── fr-FR.ts
├── lib/               # Utility functions
├── models/            # TypeScript interfaces
│   ├── Contact.ts
│   ├── Company.ts
│   ├── Address.ts
│   └── ...
├── pages/
│   └── auth/
│       ├── Login.tsx
│       ├── Signup.tsx
│       └── AuthCallback.tsx   # Receives JWT from OAuth redirect
├── services/          # Axios API service layer
├── store/
│   └── authSlice.ts   # Redux auth state
├── App.tsx
├── routes.tsx         # Route definitions + ProtectedRoute
├── i18n.ts
└── index.tsx
```

## Key Patterns

**Route protection** — All routes are wrapped by `ProtectedRoute`. Unauthenticated users are redirected to `/login`. Already-authenticated users hitting `/login` or `/signup` are redirected to the app.

**Auth state** — Stored in Redux (`authSlice`). Persisted across page reloads. The `AuthCallback` page handles the OAuth redirect from the backend: extracts the JWT from the `?token=` query param and dispatches it to the store.

**Forms** — All forms use React Hook Form with a Zod schema for validation. No uncontrolled form logic.

**API calls** — Centralized in `src/services/`. Axios instance configured with base URL and auth header injection.

**i18n** — Language toggle between English and French. Translation keys in `src/lang/`. Configured in `src/i18n.ts`.

## Authentication Flow

1. User submits login or signup form
2. Frontend calls `POST /login` or `POST /signup`
3. Backend returns `{ access_token, user }`
4. Token stored in Redux state
5. Axios interceptor attaches `Authorization: Bearer <token>` on every subsequent request
6. On OAuth: user navigates to `/auth/google` (or github/facebook), backend handles the flow and redirects back to `/auth/callback?token=<jwt>`, `AuthCallback` extracts and stores the token
