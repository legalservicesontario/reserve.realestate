# Netlify deployment notes

This repository is configured for Netlify. Files added:

- netlify.toml - publish set to repository root and functions directory configured.
- _redirects - SPA fallback to index.html for client-side routing.
- netlify/functions/hello.js - a sample serverless function to test Netlify Functions.

Redeploy triggered: 2026-09-06T19:36:30Z by GitHub Copilot

To deploy:
1. Go to https://app.netlify.com/ and "Add new site" → "Import from Git" → choose this repository.
2. Branch: main. Build command: (leave blank). Publish directory: .
3. Deploy site. Netlify will build and publish the site and provide a netlify.app URL.

Environment variables (if you add Stripe functions later):
- STRIPE_SECRET_KEY=sk_live_...
- SITE_URL=https://your-site.netlify.app

To test functions locally you can use Netlify CLI:
- npm i -g netlify-cli
- netlify dev

