# Jeshurun Technologies

![Status](https://img.shields.io/badge/Status-Active%20Development-brightgreen)
![Framework](https://img.shields.io/badge/Framework-Next.js%2016-black)
![Frontend](https://img.shields.io/badge/Frontend-React%20%7C%20TypeScript-blue)
![Styling](https://img.shields.io/badge/Styling-Tailwind%20CSS-38bdf8)
![Animation](https://img.shields.io/badge/Animation-Framer%20Motion%20%7C%20GSAP-purple)
![3D](https://img.shields.io/badge/3D-Three.js-black)

Enterprise IT consulting website for **Jeshurun Technologies** — a corporate site showcasing IT consulting, cloud & technology capabilities, and custom software engineering services. Built as a flagship portfolio project with a fully custom, enterprise-grade design system.

---

## Features

### Services, Technology & Software Pages
- Three core pillars presenting the company's full offering
- Alternating-layout capability sections with scroll-triggered animations
- Custom coded SVG visuals for every capability — no stock or AI-generated imagery

### Animated Global Presence Hero
- Interactive world map with 17 labeled client-hub cities
- Live connection-arc animations between global offices
- Fully respects `useReducedMotion()` for accessibility

### Enterprise Delivery Methodology
- Connected process timeline shared across all three service pages
- Scroll-driven progress fill with per-phase hover states
- Ghost-numeral editorial design language

### AI-Ready Chatbot
- Rule-based assistant with quick-action prompts and free-text fallback
- Session-persistent conversation via `sessionStorage`
- Structured for future AI API integration without a rewrite

### Theming & Accessibility
- Light/dark theme via `localStorage` + `classList` (no external theme library)
- All animations respect `useReducedMotion()`
- No unlabeled numbers or fabricated content anywhere on the site

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion, GSAP |
| 3D / Visuals | Three.js, custom coded SVG components |
| Forms / Email | Resend API |

---

## Getting Started

### Prerequisites
- Node.js 18 or later
- A Resend API key (for the contact form)

### Setup

```bash
git clone https://github.com/sathwikfr/jeshurun-technologies.git
cd jeshurun-technologies
npm install
cp .env.example .env
# add your RESEND_API_KEY in .env
npm run dev
```

Visit `http://localhost:3000` to view the site locally.

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Starts the local development server |
| `npm run build` | Creates a production build |
| `npm run start` | Runs the production build locally |
| `npm run lint` | Runs ESLint across the project |

---

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
├── components/           # Shared UI components (visuals, cards, nav, chatbot, timeline)
│   └── effects/          # Background/particle effects
public/
├── images/               # Static image assets
```

---

## Design Principles

- No AI-generated image assets — all visuals are coded SVG, CSS, Canvas, or Framer Motion
- Theme switching via `localStorage`/`classList` only
- All animations respect `useReducedMotion()`
- No fabricated named individuals or companies in content

---

## License

Proprietary and closed-source. All rights reserved © Jeshurun Technologies.
