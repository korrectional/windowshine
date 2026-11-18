# WindowShine — Charlotte Residential Window Cleaning

> Crystal-clear windows. Pure Carolina light.

WindowShine is a modern, high-performance website for a premier residential window cleaning service serving Charlotte, NC and surrounding communities (Myers Park, Ballantyne, Dilworth, SouthPark, Lake Norman, and more).

Designed and crafted using **IMPECCABLE** design standards:
- **No AI slop**: Distinctive optical typography, genuine local residential photography, zero generic gradient text or lazy card nests.
- **Interactive Squeegee Reveal**: Tactile interactive before/after squeegee comparison slider demonstrating the pure deionized water difference.
- **Transparent Estimate & Booking Matrix**: Dynamic estimator based on home style and pane count with instant appointment request form.
- **Rooted in Local Trust**: $2,000,000 liability insurance badges, 100% Streak-Free Guarantee, and a 48-Hour Rain Warranty.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: Figtree & Plus Jakarta Sans
- **Deployment**: [Vercel](https://vercel.com/) (zero-config, instant edge deployments)

---

## 🚀 Local Development

To run WindowShine locally:

```bash
# Install dependencies
npm install

# Start local Vite development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Deploying to Vercel & Connecting Your Domain

### Option 1: Via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and log in.
2. Click **"Add New..."** → **"Project"**.
3. Import the GitHub repository: **`korrectional/windowshine`**.
4. Vercel automatically detects the **Vite** framework (`npm run build` → output directory: `dist`).
5. Click **"Deploy"**.

### Option 2: Connecting `vercel.windowshine.com` or Custom Domain

1. In your Vercel project dashboard, go to **Settings** → **Domains**.
2. Type in your desired domain, e.g., `vercel.windowshine.com` (or `windowshine.com`).
3. Click **Add**.
4. In your DNS provider (e.g. Cloudflare, Namecheap, GoDaddy):
   - Add a **CNAME** record:
     - Name / Host: `vercel` (for `vercel.windowshine.com`)
     - Value / Target: `cname.vercel-dns.com`
5. Vercel will automatically generate a free SSL certificate within a few minutes!

---

## 📁 Repository Structure

```
├── public/
│   ├── favicon.svg            # Custom sparkling window favicon
│   └── images/
│       ├── hero-cleaner.jpg   # Real residential technician photo on ladder
│       └── squeegee-glass.jpg # Macro squeegee glide over pure glass
├── src/
│   ├── App.tsx                # Main single-page application & interactive components
│   ├── index.css              # Custom Tailwind directives & themed browser scrollbars
│   └── main.tsx               # Application bootstrap
├── PRODUCT.md                 # Impeccable product truth specification
├── DESIGN.md                  # Design system tokens and specifications
├── vercel.json                # Vercel routing and build configuration
└── package.json               # Dependencies and scripts
```

---

## 🛡️ Service Guarantees

1. **100% Streak-Free Promise**: Any pane showing smears or streaks is re-cleaned free.
2. **48-Hour Rain Warranty**: If Carolina thunderstorms spot exterior glass within 48 hours, touch-ups are 100% free.
3. **Property Protection**: Technicians wear protective booties indoors and use absorbent drop cloths under every window.
