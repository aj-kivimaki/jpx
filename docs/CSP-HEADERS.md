# Content Security Policy (CSP) Headers

This section explains how Content Security Policy (CSP) and other security headers are applied in the monorepo for both frontend and admin-panel apps using Netlify.

---

## 1. Header Configuration

- Each app (`frontend`, `admin-panel`) has its own `netlify.toml` file.
- Example of headers in `netlify.toml`:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    Content-Security-Policy-Report-Only = "default-src 'self'; connect-src 'self' https://chacyxkeseukzmqjyfdq.supabase.co; script-src 'self' https://www.googletagmanager.com; object-src 'none';"
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Strict-Transport-Security = "max-age=63072000; includeSubDomains; preload"
```

---

## 2. Running Locally

1. From the **root of the monorepo**, run:

```bash
netlify dev
```

2. You will see a prompt to select the app:

```
We've detected multiple projects inside your repository
? Select the project you want to work with
  frontend  apps/frontend  --filter frontend
  admin-panel  apps/admin-panel  --filter admin-panel
```

3. Choose either `frontend` or `admin-panel`. Netlify Dev will:
   - Inject environment variables
   - Start the Vite dev server for that workspace
   - Start a **Netlify Dev proxy** which applies headers from `netlify.toml`

4. **Important:**
   - The Vite dev server runs on configured ports (e.g., 5173 for frontend, 5174 for admin-panel) but **does not apply headers**.
   - Headers are applied when accessing the **Netlify Dev proxy URL** (e.g., `http://localhost:8888` for frontend, `http://localhost:58480` for admin-panel).

5. Verify headers via browser DevTools → Network → Response Headers.

---

## 3. Production Deployment

- When deployed to Netlify, the headers defined in each app's `netlify.toml` are **automatically applied**.
- Content-Security-Policy is in **report-only mode**, so violations are logged but do not block content.
- Any CSP warnings seen via the Netlify Dev proxy will also appear in production if triggered.

---

## 4. Notes / Best Practices

- Always test headers through the **Netlify Dev proxy URL**, not the raw Vite dev URL.
- Ensure each app has a distinct port in `vite.config.js` if running multiple apps locally.
- CSP warnings about `'unsafe-eval'` may appear in dev due to Vite; these are expected and do not affect production.

---

**Summary:**

- `netlify.toml` per app → defines headers
- `netlify dev` from root → choose app → proxy URL shows headers
- Production automatically applies headers from TOML
- Use proxy URL for testing CSP
