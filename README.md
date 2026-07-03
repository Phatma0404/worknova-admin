# 🚀 WorkNova Admin

**WorkNova** is a modern **admin panel** built for project and team management. It lets you manage users, projects, tasks, team members, calendar events, and notifications all from a single dashboard.

> ⚠️ This is currently a **frontend-only** project - it is not connected to a real backend/API. All data (users, projects, tasks, etc.) is stored as mock data inside `constants.ts` files. Login does not perform real authentication either - it only simulates the demo login flow.

---

## 📸 What it does

Built on a classic admin dashboard layout with a sidebar and navbar. The sidebar links to the following modules:

| Module | What it's for |
|---|---|
| 📊 **Dashboard** | Overview stat cards, revenue chart, recent projects, and recent users table |
| 📈 **Analytics** | Analytics page (charts, metrics) |
| 👥 **Users** | User list and management |
| 📁 **Projects** | Project list and details |
| ✅ **Tasks** | Task management |
| 🧑‍🤝‍🧑 **Team** | Team members |
| ⚙️ **Settings** | Settings (including security) |
| 🙍 **Profile** | User profile |
| 📅 **Calendar** | Calendar/scheduling |
| 🔔 **Notifications** | Full notifications inbox with filtering, search, and bulk actions |
| 🔐 **Auth** | Login screen (with demo credentials) |

### 🔑 Demo login credentials
Auto-filled on the login page via the "Fill Demo Credentials" button:
```
Email:    demo@worknova.com
Password: 123456
```

---

## 🛠️ Tech stack

| Category | Technology |
|---|---|
| Framework | React 19 + TypeScript + Vite |
| Routing | React Router v7 |
| Styling | Tailwind CSS v4 + shadcn/ui (Radix UI) |
| State | Zustand (auth, theme) |
| Data fetching | TanStack Query |
| Tables | TanStack Table |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Animation | Framer Motion |
| Toasts | Sonner |

---

## 📂 Folder structure

```
src/
├── features/          # Each module lives in its own folder (dashboard, users, projects, tasks, team...)
│   └── <feature>/
│       ├── components/    # Module-specific components
│       ├── pages/          # Page component wired to a route
│       ├── constants.ts    # Mock data
│       └── types.ts        # TypeScript types
├── components/
│   ├── layout/         # Sidebar, Navbar
│   └── ui/             # Shared UI components built on shadcn/ui
├── layouts/            # RootLayout, AppLayout, ProtectedLayout (auth guard)
├── routes/             # All route definitions (react-router)
├── store/              # Zustand stores (auth, theme)
└── shared/             # Shared hooks and libs (query client, utils)
```

---

## ▶️ Getting started

```bash
# Install dependencies
npm install

# Development server (Vite)
npm run dev

# Production build
npm run build

# Preview the build locally
npm run preview

# Lint
npm run lint
```

---

## 🧭 Route map

```
/login              → Login screen (no sidebar/navbar chrome)
/                   → Dashboard (guarded by ProtectedLayout)
/analytics
/users
/projects
/tasks
/team
/settings
/profile
/calendar
/notifications
*                    → 404 page
```

`ProtectedLayout` redirects to `/login` when there's no token, and remembers where the user was headed so login can send them back there afterwards.
