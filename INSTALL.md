# Installation

This project has **two separate applications**: the **frontend** and the **admin panel**, each running on its own development server.

---

## 1. Clone the repository

```bash
git clone https://github.com/aj-kivimaki/jpx.git
cd jpx
```

> **Recommended Node.js version:** 18+

---

## 2. Create a Supabase project

Go to https://supabase.com and create a free project.

Create the required table `gigs`. Example schema:

```sql
create table gigs (
  id serial primary key,
  title text not null,
  date timestamptz not null,
  venue text not null,
  city text,
  description text,
  created_at timestamptz default now()
);
```

Enable Row Level Security (RLS):

```sql
alter table gigs enable row level security;
```

Create a policy for admin access:

```sql
create policy "Admins can manage gigs"
on gigs
for all
using (auth.role() = 'authenticated');
```

---

### Configure Supabase Auth for Admin Access

1. Go to your [Supabase Dashboard](https://app.supabase.com/) and select your project.
2. Navigate to **Authentication → Users**.
3. Create an **admin user** (email & password) or invite one.
4. In **Authentication → Policies**, ensure your `gigs` table has **Row Level Security (RLS)** enabled and allows this user to perform CRUD operations.
5. Use the admin credentials to log in at [admin panel](https://admin.jpartynen.com).

---

## 3. Setup environment variables

Each app has its own `.env.local` file. Create them in the respective folders:

### **Frontend**

```bash
cd frontend
touch .env.local
```

Add:

```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### **Admin Panel**

```bash
cd ../admin
touch .env.local
```

Add:

```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

⚠️ Do **not** commit `.env.local` to GitHub.

---

## 4. Install dependencies

Install packages separately in each folder:

```bash
# Frontend
cd ../frontend
npm install

# Admin panel
cd ../admin
npm install
```

---

## 5. Start development servers

Each app runs independently:

```bash
# Frontend
cd ../frontend
npm run dev

# Admin panel
cd ../admin
npm run dev
```

Open your browser:

- **Frontend:** http://localhost:5173
- **Admin Panel:** http://localhost:5174 _(or the port shown in your terminal)_

## 6. Run Tests

This project includes **unit, component, and end-to-end tests** for both the frontend and admin panel.

### Frontend

```bash
cd frontend

# Run unit and component tests
npm run test

# Run end-to-end tests
npm run e2e
```

### Admin Panel

```bash
cd ../admin

# Run unit and component tests
npm run test

# Run end-to-end tests
npm run e2e
```

> **Make sure both frontend and admin-panel dev servers are running if your tests depend on the live APIs.**

---

### Notes for Contributors

- Make sure Node.js version matches the recommended one.
- Ports may differ; check `vite.config.ts` if 5173/5174 are in use.
- Keep `.env.local` private; never commit to GitHub.
- Forkers should follow **all Supabase setup steps** to ensure admin access works properly.
