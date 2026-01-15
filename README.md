# FPL Stats

A Fantasy Premier League statistics dashboard built with Next.js. Track your FPL team performance, compare players, and make data-driven transfer decisions.

## Features

- **Team Dashboard** - View your current gameweek picks, points, and rankings
- **Player Analysis** - Compare multiple players side-by-side with detailed statistics
- **Transfer Suggestions** - Get AI-powered transfer recommendations based on player performance scores
- **Probability Predictions** - See the likelihood of players increasing their stats (goals, assists, clean sheets, etc.) using Poisson distribution analysis based on recent form

## Tech Stack

- Next.js 14
- React Query for data fetching
- Recoil for state management
- Tailwind CSS for styling

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
npm install
```

### Running in Development

The FPL API has CORS restrictions, so you need to run a local proxy alongside the dev server.

**Terminal 1** - Start the CORS proxy:

```bash
npm run proxy
```

This starts a local proxy at `http://localhost:8010` that forwards requests to the FPL API.

**Terminal 2** - Start the Next.js dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

In production, API requests are routed through Next.js API routes, so no proxy is needed.

## Usage

1. Enter your FPL Team ID on the home page
2. Navigate to the dashboard to view your team stats
3. Use the Analysis page to compare players and see probability predictions
4. Check transfer suggestions for potential improvements to your squad

## License

MIT
