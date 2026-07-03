# 🚀 WorkNova Admin

**WorkNova**, layihə və komanda idarəetməsi üçün hazırlanmış müasir bir **admin panel**dir. İstifadəçilər, layihələr, tapşırıqlar, komanda üzvləri, təqvim və bildirişlər kimi bütün əməliyyatları tək bir ekrandan idarə etməyə imkan verir.

> ⚠️ Bu, hazırda **frontend-only** bir layihədir - real backend/API-yə qoşulmayıb. Bütün data (istifadəçilər, layihələr, tapşırıqlar və s.) `constants.ts` fayllarında mock data olaraq saxlanılır. Giriş də real doğrulama etmir - yalnız demo login axışını simulyasiya edir.

---

## 📸 Nə edir?

Sidebar + navbar olan klassik admin dashboard strukturu üzərində qurulub. Sol menyudan aşağıdakı modullara keçid var:

| Modul | Nə üçündür |
|---|---|
| 📊 **Dashboard** | Ümumi statistika kartları, gəlir qrafiki, son layihələr və son istifadəçilər cədvəli |
| 📈 **Analytics** | Analitika səhifəsi (qrafiklər, metrikalar) |
| 👥 **Users** | İstifadəçi siyahısı və idarəetməsi |
| 📁 **Projects** | Layihələrin siyahısı və detalları |
| ✅ **Tasks** | Tapşırıq idarəetməsi |
| 🧑‍🤝‍🧑 **Team** | Komanda üzvləri |
| ⚙️ **Settings** | Tənzimləmələr (təhlükəsizlik daxil) |
| 🙍 **Profile** | İstifadəçi profili |
| 📅 **Calendar** | Təqvim/planlaşdırma |
| 🔔 **Notifications** | Filtr, axtarış və toplu əməliyyatlarla tam bildiriş qutusu |
| 🔐 **Auth** | Giriş ekranı (demo credentials ilə) |

### 🔑 Demo giriş məlumatları
Login səhifəsində "Fill Demo Credentials" düyməsi ilə avtomatik doldurulur:
```
Email:    demo@worknova.com
Password: 123456
```

---

## 🛠️ Texnologiyalar

| Kateqoriya | Texnologiya |
|---|---|
| Framework | React 19 + TypeScript + Vite |
| Routing | React Router v7 |
| Styling | Tailwind CSS v4 + shadcn/ui (Radix UI) |
| State | Zustand (auth, theme) |
| Data fetching | TanStack Query |
| Cədvəllər | TanStack Table |
| Formlar | React Hook Form + Zod |
| Qrafiklər | Recharts |
| Animasiya | Framer Motion |
| Bildirişlər (toast) | Sonner |

---

## 📂 Qovluq strukturu

```
src/
├── features/          # Hər modul öz qovluğunda (dashboard, users, projects, tasks, team...)
│   └── <feature>/
│       ├── components/    # Modula xas komponentlər
│       ├── pages/          # Route-a bağlanan səhifə komponenti
│       ├── constants.ts    # Mock data
│       └── types.ts        # TypeScript tipləri
├── components/
│   ├── layout/         # Sidebar, Navbar
│   └── ui/             # shadcn/ui əsaslı ortaq UI komponentləri
├── layouts/            # RootLayout, AppLayout, ProtectedLayout (auth guard)
├── routes/             # Bütün route tərifləri (react-router)
├── store/              # Zustand store-ları (auth, theme)
└── shared/             # Ortaq hook və lib-lər (query client, utils)
```

---

## ▶️ İşə salmaq

```bash
# Paketləri quraşdır
npm install

# Development server (Vite)
npm run dev

# Production build
npm run build

# Build-i lokal önizləmə
npm run preview

# Lint
npm run lint
```

---

## 🧭 Route xəritəsi

```
/login              → Giriş ekranı (sidebar/navbar olmadan)
/                   → Dashboard (ProtectedLayout ilə qorunur)
/analytics
/users
/projects
/tasks
/team
/settings
/profile
/calendar
/notifications
*                    → 404 səhifəsi
```

`ProtectedLayout` token yoxdursa avtomatik `/login`-ə yönləndirir və istifadəçinin hara getmək istədiyini yadda saxlayır ki, girişdən sonra oraya qaytarsın.
