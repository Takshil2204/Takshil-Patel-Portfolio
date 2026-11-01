# Takshil Patel — Professional Developer Portfolio

A modern, futuristic, dark-themed personal portfolio website built with **vanilla HTML5, CSS3, and JavaScript**. Tailored specifically for **Takshil Patel** to showcase software engineering, cybersecurity, computer networking, and algorithmic problem-solving abilities when applying for coding challenges, internships, and technology opportunities.

---

## 🌟 Visual & Technical Highlights

- **Aesthetic Direction**: Premium dark futuristic theme (Deep black `#07090e`, charcoal `#0d111b`, with electric blue `#00f0ff` and subtle violet `#a855f7` accents).
- **Interactive 3D Animations & Typography**:
  - **Quantum Cyber Core Hologram**: Real-time 3D projected icosahedron wireframe with counter-rotating octahedral crystal core, orbital data nodes, and smooth mouse spring physics.
  - **Jitter-Free 3D Card Tilt & Glare**: Static-coordinate bounded perspective tilt with dynamic specular sheen and smooth native CSS easing return.
  - **Fluid Scroll-Driven Reveals**: Instant initial-viewport detection and crisp, hardware-accelerated 3D slide-in animations without blur rasterization lag.
  - **3D Spatial Deep-Field**: Optimized background constellation field with squared-distance thresholding and tab throttling for a locked 60fps experience.
  - **Word-by-Word 3D Hero Headline Reveal**: Staggered upward 3D emergence with optical blur-to-focus and perspective X-axis rotation.
  - **Accessible Character-by-Character Section Headings**: Dynamic letter cascade preserving responsive word wrapping and screen-reader accessibility (`aria-label` / `aria-hidden`).
  - **Hero Subtitle Typewriter**: Cycles through core engineering domains (*Software Developer*, *Cybersecurity Explorer*, *Network Systems Enthusiast*, *Algorithmic Problem Solver*) with tab visibility pausing.
  - **Magnetic CTA Interactions**: Subtle directional cursor tracking on primary buttons and glowing letter-spacing transitions on navigation links.
- **100% Responsive 7-Tier Architecture**:
  - Precision-engineered breakpoints: Small Mobile (320px–374px), Mobile (375px–480px), Large Mobile (481px–767px), Tablet (768px–1024px), Laptop (1025px–1440px), Desktop (1441px–1920px), and UltraWide / 4K (1920px+).
  - Modern slide-out navigation drawer with dynamic viewport height (`100dvh`), backdrop filter blur, 44px minimum tap targets, and outside-click/escape auto-close.
  - Zero horizontal overflow (`overflow-x: hidden`, defensive grid auto-fit formulas, code block scroll containment, and iOS Safari 16px auto-zoom prevention).
  - Adaptive 3D animations with touch interaction support (`touchmove`/`touchstart`), dynamic particle density scaling, and hardware-accelerated CSS transforms.
- **Zero-Dependency Architecture**: No React, Next.js, or bulky external runtime libraries. Pure, high-performance vanilla web standards.
- **Authenticity First**: Clear demarcation between verified skills and active learning goals; structured project templates with honest problem-solving narratives rather than fabricated statistics.
- **Unstop Opportunity Tracking**: Dedicated spotlight module highlighting the Unstop Online Coding Challenge reference (`TbMH0R9`) and participant handle (`Takshpat15544`).
- **Interactive Deep-Dive Modal**: Clickable project inspection modals showing problem statements, technical implementations, and architectural highlights with accessible focus trapping.
- **Working Contact System**: Direct client-side validated inquiry form that formats `mailto:` payloads, alongside a one-click copy-to-clipboard email button with animated toast alerts.
- **Accessibility & SEO**: WCAG 2.1 AA compliant color contrasts, semantic landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`), keyboard navigation, and OpenGraph/Twitter social meta tags.

---

## 📁 Project Structure

```text
takshil-patel-portfolio/
│
├── index.html              # Main Landing Page Hub with overviews & interactive terminal
├── about.html              # Dedicated About Me page (Philosophy, Milestones, Education)
├── skills.html             # Dedicated Technical Skills & Systems Toolkit page
├── projects.html           # Dedicated Projects Gallery with category filters & inspection modals
├── achievements.html       # Dedicated Recognition page featuring Unstop Track (TbMH0R9)
├── contact.html            # Dedicated Contact & Collaboration Hub with client validation
│
├── css/
│   ├── style.css           # Design tokens, CSS variables, typography, and reset
│   ├── components.css      # Header, Hero, Terminal, Cards, Modal, Toast, and Multi-page layouts
│   └── responsive.css      # Modular 7-tier responsive system (320px up to 1920px+ UltraWide)
│
├── js/
│   ├── main.js             # Navigation detection, sticky header, drawer toggle, back-to-top
│   ├── canvas-bg.js        # 3D spatial deep-field canvas with camera parallax & floating polyhedra
│   ├── animations-3d.js    # 3D Hero Cyber Core, card tilt with specular glare & scroll reveals
│   ├── projects-filter.js  # Project category filtering and architectural modal viewer
│   └── contact.js          # Form validation, email copy-to-clipboard, and toast dispatcher
│
├── test-portfolio.js       # Automated multi-page integrity test suite
└── README.md               # Documentation, editing guide, and deployment manual
```

---

## 🚀 How to Run Locally

Because this project is built entirely on native web standards, it requires no Node packages or compilation steps.

### Option 1: Direct File Open
Double-click `index.html` in File Explorer, or run:
```powershell
Start-Process "index.html"
```

### Option 2: Local HTTP Server (Recommended)
Using Python (pre-installed on most systems):
```bash
# Python 3
python -m http.server 8000
```
Then navigate to: `http://localhost:8000`

Or using Node.js:
```bash
npx serve .
```

---

## 🛠️ Personal Customization Guide

All placeholders and editable blocks have been clearly labeled with comments in the source code.

### 1. Update Personal & Academic Background (`index.html`)
Look for the `<!-- TAKSHIL: Edit your personal educational & location details below -->` comment in the **About Me** section (`#about`):
- **Degree / Track**: Update with your exact major (e.g., `B.Tech in Computer Science & Engineering`).
- **Institution**: Replace `[University / College Name]` with your university.
- **Target Graduation**: Update `2026 / 2027` to your target year.
- **Location**: Update `[City, State / Country]` with your current city.

### 2. Update Technical Skills (`index.html`)
In the **Technical Skills** section (`#skills`), each skill tag has a class:
- Use `.skill-badge.verified` for skills you have built projects with.
- Use `.skill-badge.learning` for technologies currently in coursework or active learning.
- Add or remove `<span>` tags to reflect your personal toolkit.

### 3. Replace Project Placeholders with Real Repositories (`index.html` & `js/projects-filter.js`)
In `index.html` (under `#projects`), update:
- `project-title` with your project name.
- `project-problem-box` with the actual technical problem you solved.
- The `href` of the GitHub link: configured with `https://github.com/Takshil2204/...` and the main portfolio repository `https://github.com/Takshil2204/Takshil-Patel-Portfolio`.
- In `js/projects-filter.js`, update the corresponding key in `projectDatabase` to match your architecture and feature descriptions for the modal popup.

### 4. Verify Contact Information (`index.html`)
In `#contact`:
- Email: Update `takshil.patel@example.com` with your real email address.
- GitHub: Connected to `https://github.com/Takshil2204` (Repository: `https://github.com/Takshil2204/Takshil-Patel-Portfolio`).
- LinkedIn: Connected to `https://www.linkedin.com/in/takshil-patel-b93706250`.
- Unstop Profile: Pre-configured to `https://unstop.com/@Takshpat15544`.

---

## 🔍 Reference Opportunity Details

- **Reference URL**: `https://unstop.com/o/TbMH0R9?lb=usesf8XA&utm_medium=Share&utm_source=online_coding_challenge&utm_campaign=Takshpat15544`
- **Platform**: Unstop (formerly Dare2Compete)
- **Opportunity Type**: Online Coding Challenge & Technical Assessment
- **Campaign & Handle**: `Takshpat15544`
- **Implementation**: The opportunity is showcased in the **Achievements & Opportunities** section as an active target challenge track, demonstrating alignment with competitive coding benchmarks without making unverified claims of past placement or awards.

---

## 🌐 Git Connection & Free Deployment Guide

### Connect Local Workspace to GitHub

Run these commands in PowerShell or your terminal inside the project directory:

```powershell
# 1. Initialize local git repository
git init

# 2. Stage all project files
git add .

# 3. Create initial commit
git commit -m "feat: complete interactive 3D multi-page developer portfolio"

# 4. Set branch to main
git branch -M main

# 5. Link to your GitHub repository
git remote add origin https://github.com/Takshil2204/Takshil-Patel-Portfolio.git

# 6. Push codebase to GitHub
git push -u origin main
```

### Enable Free GitHub Pages (1-Click Hosting)

1. Open your repository on GitHub: [`Takshil2204/Takshil-Patel-Portfolio`](https://github.com/Takshil2204/Takshil-Patel-Portfolio).
2. Click **Settings** (top tab) > **Pages** (left sidebar).
3. Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
4. Set branch to `main` and folder to `/ (root)`, then click **Save**.
5. Your live site will be deployed at:
   `https://takshil2204.github.io/Takshil-Patel-Portfolio/`

### Alternative: Vercel / Netlify
1. Connect your GitHub repository on [Vercel](https://vercel.com) or [Netlify](https://netlify.com).
2. Select `Takshil2204/Takshil-Patel-Portfolio`.
3. Leave build settings as default (static site / no build step required).
4. Click **Deploy**.

---

## 📄 License & Credits
Designed and engineered for **Takshil Patel**. Released under the MIT License.