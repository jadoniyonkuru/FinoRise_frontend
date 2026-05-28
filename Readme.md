# FinoRise

Multi-role platform with shared authentication and role-specific dashboards.

## Folder structure

```
src/
├── auth/                    # Shared auth (all roles)
│   ├── login/
│   ├── register/
│   └── reset-password/
├── learner/
│   └── dashboard/
├── admin/
│   ├── dashboard/
│   ├── user-management/
│   ├── module-manager/
│   ├── simulation-manager/
│   ├── rewards-manager/
│   └── analytics/
└── partner/
    └── dashboard/
```

## Routes

| Path | Page |
|------|------|
| `/auth/login` | Login (role selector → dashboard) |
| `/auth/register` | Register |
| `/auth/reset-password` | Reset password |
| `/learner/dashboard` | Learner dashboard |
| `/admin/dashboard` | Admin dashboard — statistics, reports |
| `/admin/user-management` | Users, roles |
| `/admin/module-manager` | Create, manage modules |
| `/admin/simulation-manager` | Tests, scenarios |
| `/admin/rewards-manager` | Rewards, eligibility |
| `/admin/analytics` | Engagement, retention |
| `/partner/dashboard` | Partner dashboard |

## Run locally

Open a terminal **in this folder** (`Desktop\FinoRise` — where `package.json` lives):

```bash
npm install
npm run dev
```

Open http://localhost:5173

### "Cannot find path" in PowerShell?

You are already inside the project. **Do not** run `cd FinoRise` again — that looks for a subfolder `FinoRise\FinoRise`, which does not exist.

| You want | Command |
|----------|---------|
| Run the app (you are in `Desktop\FinoRise`) | `npm run dev` |
| Go to the cloned GitHub folder | `cd FinoRise_frontend` |
| Open project from Desktop | `cd "C:\Users\SKY X ELECTRONIC\OneDrive\Desktop\FinoRise"` |

`FinoRise_frontend` is a separate empty clone; your working code is in `FinoRise` (this folder).
