# Softmusk website

Company website for Softmusk Info Pvt. Ltd., Belagavi — services, products, careers, internships and workshops.

Built with Next.js (App Router), React, TypeScript and Tailwind CSS.

## Running locally

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

The site runs at http://localhost:3000.

Other scripts:

- `npm run build` – production build
- `npm start` – serve the production build
- `npm run lint` – ESLint

## Environment

See `.env.example` for the full list.

- `NEXT_PUBLIC_SITE_URL` – public URL of the site, used for canonical links, sitemap and Open Graph images.
- `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY`, `EMAILJS_PRIVATE_KEY` – keys for sending the website forms by email. In the EmailJS dashboard, also turn on Account → Security → "Allow EmailJS API for non-browser applications".
- `ENQUIRY_TO` – inbox that receives form submissions (defaults to service@softmusk.com).

Don't commit `.env.local`.

## Project layout

- `src/app/(public)` – site pages
- `src/app/api/enquiry` – form handler (contact, careers, internship, demo and workshop forms)
- `src/components` – layout and shared UI
- `src/lib/site.ts` – company name, address, phone and other business details used across the site
- `public` – images and static files

## Deploying

Runs as a normal Node.js app: `npm run build` then `npm start`. Set the environment variables in the hosting panel.
