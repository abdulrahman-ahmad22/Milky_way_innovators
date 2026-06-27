# The Majlis Entrepreneurship Group

A modern, open-source community platform for first-time founders in Al Qua’a
Village, Al Ain, UAE. The project combines practical entrepreneurship workshops,
a guided AI business assistant, and a transparent library for community
research.

The prototype is designed around a simple idea: local founders should be able to
move from an idea or skill to one useful first action without needing to know all
the language or systems of business in advance.

## Features

- Calm, responsive landing page rooted in the identity of Al Qua’a Majlis
- Filterable workshop programme with audience, date, time, and location details
- Polished AI chat with starter prompts, loading, empty, and error states
- Server-only POST /api/chat proxy; the API secret never enters browser code
- Searchable public research library with visible methods and limitations
- Light and dark themes with saved preference
- Accessible landmarks, controls, focus states, reduced-motion support, and
  readable contrast
- Typed content models that can later be moved to a CMS or translated to Arabic

> The workshop schedule and research entries in this repository are sample
> content. They are labeled in the interface and must be replaced or reviewed
> before a public launch.

## Tech stack

- [Next.js](https://nextjs.org/) App Router
- React and TypeScript
- Tailwind CSS
- Framer Motion
- Lucide icons
- Google Gemini Developer API through a protected server route

## Project structure

    app/
      api/chat/route.ts       # Validated, rate-limited server proxy
      assistant/page.tsx
      research/page.tsx
      workshops/page.tsx
      globals.css
      layout.tsx
      page.tsx
    components/
      chat-assistant.tsx
      research-library.tsx
      workshop-list.tsx
      site-header.tsx
      site-footer.tsx
      ...
    lib/
      data.ts                 # Sample workshops and research entries
    types/
      index.ts
    public/images/
      majlis-illustrated-exterior.jpeg
      majlis-interior.jpeg

## Run locally

Requirements: Node.js 20 or newer and npm.

    git clone https://github.com/abdulrahman-ahmad22/Milky_way_innovators.git
    cd Milky_way_innovators
    npm install
    cp .env.example .env.local
    npm run dev

Open [http://localhost:3000](http://localhost:3000).

The site works without an API key, but the chat will show a configuration
message until a real key replaces the placeholder value.

## Environment variables

Edit .env.local:

    GEMINI_API_KEY=your_real_key_here
    GEMINI_MODEL=gemini-2.5-flash-lite
    GEMINI_BASE_URL=https://generativelanguage.googleapis.com/v1beta

- GEMINI_API_KEY is required for live chat. Create one in
  [Google AI Studio](https://aistudio.google.com/app/apikey).
- GEMINI_MODEL is optional and defaults to the stable free-tier Flash-Lite model.
- GEMINI_BASE_URL is optional. Keep the default for Google's Gemini API.

Restart the development server after changing environment variables.

## API security

The browser sends conversation messages only to POST /api/chat. The route in
app/api/chat/route.ts reads GEMINI_API_KEY on the server and contacts Google
Gemini from there.

Security measures in the reference implementation:

- no NEXT_PUBLIC_ prefix on secret variables
- .env files ignored, with only .env.example committed
- content-type, message count, role, and length validation
- bounded history and output size
- 30-second upstream timeout
- generic client-facing provider errors
- best-effort per-instance request throttling
- no-store upstream requests

The included in-memory throttling is useful for a small prototype, but it is not
shared between serverless instances. Before a high-traffic deployment, add
durable rate limiting (for example, a managed Redis service or edge gateway),
request monitoring, abuse protection, and an appropriate privacy notice.

Never send the API key to a client component, expose it in an endpoint response,
or commit .env.local.

Google's free tier has usage limits and different data-use terms from its paid
tier. Do not send private, confidential, or identifying community information
through the assistant. Review Google's current terms before a public launch.

## Content and launch checklist

Before publishing:

1. Replace the sample workshop titles, descriptions, audiences, dates, times,
   locations, categories, and durations in lib/data.ts.
2. Decide whether to connect the intentionally inactive registration buttons
   to a form, booking platform, or another workflow.
3. Replace the three research templates in lib/data.ts with reviewed findings
   based on real, consented community activity.
4. Add a real GEMINI_API_KEY to .env.local for the AI assistant.
5. Confirm permission and attribution requirements for the supplied Majlis
   photographs.
6. Add the project’s privacy, data retention, and AI-use notices.
7. Verify current UAE and Abu Dhabi licensing links with the relevant official
   organisations.

## Arabic support

English is the initial interface language. Content is kept in typed data and
components are separated from page structure so an internationalisation layer
can be added later. A production Arabic version should also add:

- locale-based routing and translation dictionaries
- dir="rtl" at the document or route level
- Arabic type choices and mirrored directional icons where needed
- bilingual content review by local speakers

## Development commands

    npm run dev        # start local development
    npm run typecheck  # run TypeScript checks
    npm run lint       # run ESLint
    npm run build      # create a production build
    npm run start      # serve the production build

## Contributing

Issues and pull requests are welcome. Keep contributions accessible,
community-centered, clear about evidence, and careful with participant privacy.
Please avoid adding real personal information to fixtures or examples.

## License

Source code is released under the [MIT License](./LICENSE). The supplied
photographs are not automatically covered by the software license; confirm
usage permission separately.
