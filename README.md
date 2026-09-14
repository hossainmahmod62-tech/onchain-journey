# Onchain Journey

**Every Wallet Has A Story**

Paste any public EVM wallet address and discover its onchain journey: wallet age, first onchain activity, value milestones, wallet personality, Web3 era, and an OG score. The product never asks for a wallet connection, a signature, or a private key. It only reads a public address.

This MVP runs entirely client-side using deterministic mock blockchain data. The data layer is isolated behind a single module so it can be pointed at real chain APIs later without touching any UI code.

## Product rules

- No wallet connection is ever requested.
- No signature is ever requested.
- No private key is ever requested.
- Only a public wallet address is used as input.

## Tech stack

- React 18
- Vite 5
- Tailwind CSS 3
- Framer Motion
- Lucide React icons
- html-to-image (for PNG card export)

## Supported chains (architecture)

- Ethereum
- BNB Chain
- Base
- Arbitrum
- Polygon

Chain metadata lives in `src/lib/mockData.js` and is consumed everywhere else by id, so adding a sixth chain is a one-line change.

## Folder structure

```
onchain-journey/
  index.html
  package.json
  vite.config.js
  tailwind.config.js
  postcss.config.js
  vercel.json
  .env.example
  public/
    favicon.svg
  src/
    main.jsx
    App.jsx
    index.css
    components/
      Navbar.jsx
      HeroSection.jsx
      WalletInput.jsx
      LoadingScreen.jsx
      JourneyDashboard.jsx
      MilestoneCard.jsx
      PersonalityCard.jsx
      JourneyCard.jsx
      ShareButton.jsx
      DownloadButton.jsx
    lib/
      mockData.js
      journeyGenerator.js
      cardGenerator.js
      dataSource.js
```

### How the pieces fit together

- **`lib/mockData.js`** holds the supported chains, wallet personalities, Web3 eras, and a deterministic pseudo-random generator seeded from the wallet address. The same address always produces the same journey.
- **`lib/dataSource.js`** is the only place that knows how to fetch wallet data. Today it resolves to the mock provider. A future real provider (Etherscan family, Alchemy, Covalent, The Graph, etc.) can be added here behind the same `fetchWalletProfile(address)` function, so no component needs to change.
- **`lib/journeyGenerator.js`** turns a raw wallet profile into the display-ready view model: formatted dates, wallet age copy, and the OG score calculation (weighted by wallet age, activity history, and milestones reached).
- **`lib/cardGenerator.js`** exports a rendered card DOM node to a PNG using `html-to-image`, and builds the share text used for the X share intent.
- **`components/`** are presentation-only and receive data as props. `JourneyCard.jsx` renders all four collectible card styles (Genesis, Timeline, Achievement, Complete Journey) from the same journey object.

## Installation

Requires Node.js 18 or later.

```bash
# 1. Install dependencies
npm install

# 2. Copy the environment example
cp .env.example .env

# 3. Start the dev server
npm run dev
```

The app runs at `http://localhost:5173`.

## Building for production

```bash
npm run build
npm run preview
```

`npm run build` outputs a static site to `dist/`, which is all any static host needs.

## Deploying to Vercel

**Option A: Vercel dashboard**

1. Push this project to a GitHub, GitLab, or Bitbucket repository.
2. In Vercel, choose "Add New Project" and import the repository.
3. Framework preset: Vite (auto-detected).
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Deploy.

**Option B: Vercel CLI**

```bash
npm install -g vercel
vercel login
vercel --prod
```

The included `vercel.json` sets the build command, output directory, and a single-page-app rewrite rule so client-side routing works correctly if routes are added later.

## Switching to a live data source later

Set `VITE_DATA_SOURCE=live` in `.env` once real chain clients are implemented inside `src/lib/dataSource.js`. Every component already calls `fetchWalletProfile(address)`, so switching providers requires no UI changes, only filling in the `live` provider's `fetchProfile` method with real calls per chain.

## Design notes

The interface uses a dark, premium palette (deep ink background, blue and violet accents) with glassmorphism panels, restrained motion, and no meme, cartoon, or hype styling. Wallet Age, milestones, personality, Web3 era, and OG Score are the core surfaces on the results dashboard, alongside four downloadable, shareable card styles.
