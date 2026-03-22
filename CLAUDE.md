# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

EVENTRIX is a static single-page music festival landing page. No build tools, no bundler, no framework — open `index.html` directly in a browser to develop.

## Tech Stack

- Vanilla HTML/CSS/JS (no transpilation, no preprocessing, no package.json)
- Bootstrap 5.3.8 (CDN) — grid layout and navbar
- Font Awesome 6.5.1 (CDN) — icons
- Google Fonts — Bebas Neue (display), Inter (body), Montserrat (accent)

## Architecture

### Files
- `index.html` — Single-page HTML with all sections inline
- `script.js` — All interactivity in one IIFE with 23 numbered feature blocks
- `style.css` — Full styling with CSS custom properties (`:root` design tokens)
- `img/` — Stock photos (Pexels/Unsplash) for artist cards and experience grid

### HTML Sections (in order)
`hero` → `ticker` → `stats` → `lineup` → `schedule` → `experience` → `testimonials` → `tickets` → `faq` → `register` → `sponsors` → `footer`

### JavaScript Organization
`script.js` is a single IIFE. DOM elements are cached at the top. The 23 feature blocks are: preloader, custom cursor, hero canvas particles, scroll progress/navbar, active nav link, mobile nav auto-close, countdown timer, stats counter, day selector, scroll reveal, testimonial carousel, FAQ accordion, ticket pre-select, 3D tilt cards, button ripple, image lightbox, form validation, success modal, newsletter toast, back to top, ticker pause, typing effect, copyright year.

Scroll logic is batched into one `requestAnimationFrame`-throttled handler (block 4). IntersectionObserver is used for scroll-triggered effects (blocks 5, 8, 10).

## Conventions

- **ES5 syntax only**: `var`, function expressions, `.forEach()` — no `let`/`const`/arrow functions
- **CSS tokens**: Use `:root` custom properties (`--clr-primary`, `--bg-card`, `--radius-md`, etc.) — never hardcode colors/radii/shadows
- **Custom cursor**: New interactive elements (links, buttons, cards) must be registered with the cursor hover system (block 2)
- **Scroll reveal**: New sections should include the appropriate class for scroll-reveal animation (block 10)
- **Images**: Go in `img/`, referenced via relative paths in inline `style` attributes

## Workflow Orchestration

### 1. Plan Mode Default
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately
- Write detailed specs upfront to reduce ambiguity

### 2. Subagent Strategy
- Use subagents liberally to keep main context window clean
- One task per subagent for focused execution

### 3. Self-Improvement Loop
- After ANY correction from the user: update tasks/lessons.md with the pattern
- Write rules for yourself that prevent the same mistake

### 4. Verification Before Done
- Never mark a task complete without proving it works
- Ask yourself: "Would a staff engineer approve this?"

### 5. Demand Elegance (Balanced)
- For non-trivial changes: pause and ask "is there a more elegant way?"
- Skip this for simple, obvious fixes — don't over-engineer

### 6. Autonomous Bug Fixing
- When given a bug report: just fix it. Don't ask for hand-holding
- Zero context switching required from the user

## Task Management

1. Plan First: Write plan to tasks/todo.md with checkable items
2. Verify Plan: Check in before starting implementation
3. Track Progress: Mark items complete as you go
4. Document Results: Add review section to tasks/todo.md
5. Capture Lessons: Update tasks/lessons.md after corrections

## Core Principles

- Simplicity First: Make every change as simple as possible. Impact minimal code.
- No Laziness: Find root causes. No temporary fixes. Senior developer standards.
- Minimal Impact: Only touch what's necessary. No side effects with new bugs.
