# Chamath Dilshan

### Personal Portfolio — Built with Next.js 14

A modern, high-performance portfolio showcasing projects, skills, and professional journey.  
Crafted with contemporary UI/UX principles for speed, scalability, and elegance.

[**View Live Site💙 →**](https://chamathdilshan.com)

---

### Full Preview

<img width="1920" height="4808" alt="Portfolio Preview" src="https://github.com/user-attachments/assets/7189cdf4-5408-4d8b-853e-a56d333b0681" />

---

## Overview

<table>
<tr><td><b>Framework</b></td><td>Next.js 14</td></tr>
<tr><td><b>Type</b></td><td>Personal Portfolio</td></tr>
<tr><td><b>Deployment</b></td><td>Vercel</td></tr>
<tr><td><b>Status</b></td><td>Active</td></tr>
<tr><td><b>License</b></td><td>MIT</td></tr>
</table>

## Tech Stack

**Core**  
Next.js 14 • TypeScript • Tailwind CSS • Framer Motion

**Features**  
Responsive Design • Dark/Light Mode • SEO Optimized • Continuous Deployment • GitHub API Integration

**Infrastructure**  
Vercel • Git • Custom Domain

## Key Features

### Automatic GitHub Repository Integration

- **Auto-fetch repositories** — Automatically fetches all your GitHub repositories via GitHub API
- **Topic-based categorization** — Organizes projects by GitHub topics (e.g., `assignments`, `tutorials`, `web-development`)
- **Showcase filtering** — Only repositories with the `showcase` topic appear in your portfolio showcase
- **Easy management** — Update your portfolio by simply adding/removing topics on GitHub — no code changes needed

### How It Works

1. **Add topics to your GitHub repositories** (e.g., `showcase`, `react`, `nextjs`, `assignments`)
2. **Use the `showcase` topic** for projects you want to display prominently
3. **Projects auto-categorize** based on other topics (tutorials, assignments, personal projects, etc.)
4. **Portfolio updates automatically** — fetches latest repo data on each build

**Example:** A repository with topics `showcase nextjs portfolio` will:
- Appear in the showcase section
- Be categorized under `nextjs` and `portfolio` tags
- Display real-time stats (stars, forks, languages)

## Quick Start

```bash
# Clone repository
git clone https://github.com/ChamathDilshanC/PortFolio-NextJs.git
cd PortFolio-NextJs

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your GitHub username and personal access token (optional, for higher rate limits)

# Run development server
npm run dev

# Build for production
npm run build && npm start
```

Visit `http://localhost:3000` to view locally.

## Configuration

### Environment Variables

Create a `.env.local` file:

```env
GITHUB_USERNAME=ChamathDilshanC
GITHUB_TOKEN=your_personal_access_token_here  # Optional but recommended
NEXT_PUBLIC_SITE_URL=https://chamathdilshan.com
```

### Customizing Repository Display

**To add a project to your showcase:**
1. Go to your GitHub repository
2. Click on the gear icon next to "About"
3. Add `showcase` to the topics
4. Add other relevant topics for categorization (e.g., `react`, `machine-learning`, `assignments`)

**Topic examples:**
- `showcase` — Main portfolio showcase projects
- `assignments` — Academic/course assignments
- `tutorials` — Learning projects and tutorials
- `personal` — Personal side projects
- `work` — Professional work projects

Your portfolio will automatically categorize and filter based on these topics.

## Project Structure

```
PortFolio-NextJs/
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js App Router
│   ├── components/      # React components
│   │   ├── github/      # GitHub integration components
│   │   └── projects/    # Project showcase components
│   ├── lib/             # API utilities
│   │   └── github.ts    # GitHub API fetching logic
│   ├── styles/          # Global styles & Tailwind
│   ├── data/            # Static portfolio data
│   └── utils/           # Helper functions
├── .env.example         # Environment variables template
├── package.json
└── README.md
```

## Features

- Fully responsive across all devices
- Dynamic routing with App Router
- Smooth animations via Framer Motion
- SEO optimized metadata
- Modular component architecture
- Modern UI with Tailwind CSS
- Lightning-fast builds & deployments
- **Automatic GitHub repository sync**
- **Smart topic-based categorization**
- **Customizable showcase filtering**
- Real-time repository statistics

## Managing Your Portfolio

### Adding New Projects

1. Create a new GitHub repository
2. Add relevant topics (including `showcase` if you want it featured)
3. Push your code
4. Your portfolio automatically updates on next deployment

### Organizing Projects

Use GitHub topics to organize your work:
- **showcase** → Featured in main portfolio
- **assignments** → Academic work section
- **tutorials** → Learning projects section
- **archived** → Hide from main view

### Updating Project Info

Repository descriptions, stars, and languages update automatically from GitHub.

## Connect

**Website** — [chamathdilshan.com](https://chamathdilshan.com)  
**LinkedIn** — [Chamath Dilshan](https://linkedin.com/in/chamath-dilshan)  
**GitHub** — [@ChamathDilshanC](https://github.com/ChamathDilshanC)  
**Email** — [dilshancolonne123@gmail.com](mailto:dilshancolonne123@gmail.com)

---

**If you find this project helpful, consider giving it a ⭐**

MIT License © 2025 Chamath Dilshan
