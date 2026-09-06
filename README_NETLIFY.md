# reserve.realestate

Static scaffold for Reserve Real Estate — listings for Dominican Republic and Costa Rica.

Quick start

1. Deploy to Netlify: push this repo to GitHub and connect Netlify to the repository. The site is static — select "main" branch and deploy.
2. Replace Formspree endpoint in post-property.html with your Formspree form id.
3. Add PayPal/Stripe links where needed in property and commercial pages.
4. Images: replace /assets/images/* placeholders with your photos.

Map

- Uses Leaflet + OpenStreetMap (no API key required). map.html loads data/properties.json and places markers.

Payments

- PayPal: add direct PayPal link or PayPal Checkout button on property pages.
- Stripe: recommended to create a serverless function (Netlify Function or Vercel) to create Checkout Sessions. This scaffold includes placeholders and instructions.

Contact & chat

- WhatsApp button wired to +1 647-848-5997.

If you want, I can now:
- Add Netlify _redirects or Functions for Stripe.
- Wire Formspree (if you provide form id).
- Add real images and agent headshots (upload as assets/images)

