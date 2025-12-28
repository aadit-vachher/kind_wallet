# Kind Wallet — Version A: Benevolent Ethical Design

A transparent, non-manipulative digital wallet demo focused on user financial well‑being, trust, and clarity.

Design principles:

- Never optimize for spending; prioritize awareness and self‑control
- No urgency banners, fake rewards, or dopamine visuals
- Never hide balance or spending
- No offers/cashbacks/limited time messaging
- No auto notifications; no pre‑selected payment options
- Every action is intentional and reversible (Undo available)

## Tech Stack

- React (JavaScript, functional components)
- Vite
- Plain CSS (blue, calm, light theme only)

## Run locally

```bash
npm install
npm run dev
```

Then open the shown local URL.

## Core Screens

- Financial Truth Panel: total balance, spent this month, remaining budget, savings progress
- Smart Awareness Nudges: gentle, informational only
- Primary Actions: Send, Request, Add Funds (secondary visual weight)
- Recent Activity: simple, clear list
- Navigation: Home, Budget, Savings, Activity, Settings

## Initial Mock Data

- Balance: ₹24,500
- Spent this month: ₹9,200
- Savings goal: ₹1,00,000
- Savings progress: ₹32,000

## Structure

- src/App.jsx — app state, navigation, modals, Undo banner
- src/Home.jsx — home composition
- src/components/BalancePanel.jsx
- src/components/NudgeCard.jsx
- src/components/ActionButtons.jsx
- src/components/TransactionList.jsx
- src/components/Navbar.jsx
- src/index.css — theme and utilities
- src/App.css — layout and components styling

## Accessibility & Behavior

- Calm, readable typography; high-contrast blue accents
- Subtle fade transitions (no flashy animations)
- Forms require explicit input; defaults do not push spending
- Actions show a non-intrusive Undo to reverse the latest change

# kind_wallet
