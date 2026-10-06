# Copy/paste build brief: Muslim Founder Launchpad

Build a responsive static landing page and intake form called **Muslim Founder Launchpad** for Domnic Cooper.

## Purpose

This is a community project that helps Muslim founders, small business owners, makers and everyday people get a professional web presence without technical stress. Domnic builds and launches a simple site for free when a request is a good fit. The requester is usually responsible only for buying a domain name, commonly around $5–$15 for the first year depending on the registrar and domain.

Do not present this as an unlimited agency, legal guarantee or promise of permanently free infrastructure. Say “for suitable projects” when describing free hosting/setup. The form is an initial request, not a commitment.

## Tone and audience

- Warm, practical, credible and community-minded.
- Plain language for non-technical people.
- Avoid hype, jargon and “AI will do everything” messaging.
- Make it welcoming to founders globally: shops, services, creators, tools, community projects and personal ideas.

## Required sections

1. Hero: “Bring the idea. Leave the tech to me.”
2. Explain the offer: landing pages, domain connection, custom domain email, free hosting/setup for suitable projects, and launch help.
3. Explain why: Domnic enjoys building websites and wants to help Muslim founders while growing a portfolio of real work.
4. Work examples with links:
   - https://mscarabia.com
   - https://maazaia.com
   - https://game.mscarabia.com
   - https://prayer.mscarabia.com
   - https://halal.mscarabia.com
   - https://github.com/defaltadmin
5. Simple 3-step process: share the idea, shape the direction, build and launch.
6. Intake form.
7. Privacy note, no-password warning and clear statement that consent is needed before contact.

## Intake form fields

- Full name (required)
- Email address (required)
- WhatsApp/phone and country/time zone
- Business/project name (required)
- What they offer (required)
- Short idea description (required)
- Target audience
- Primary action: buy, book/enquire, learn, contact
- Starting point: idea only, content ready, or HTML/AI-generated code
- Domain status: own one, chosen name, need help, unsure
- Current domain name if available
- Optional HTML/ZIP/assets upload
- Preferred style and reference links
- Additional notes
- Consent checkbox (required)

## Technical requirements

- Semantic accessible HTML with visible labels and keyboard focus states.
- Responsive at desktop and 390px mobile widths.
- Keep the visual style editorial and calm: deep green, warm cream, muted orange, generous whitespace, subtle borders and small cards.
- Use Netlify Forms-compatible markup: `name="project-intake"`, `data-netlify="true"`, hidden `form-name`, honeypot and `multipart/form-data` for file upload.
- Do not fake a successful hosted submission in production. A local preview may show a local-only confirmation; document that a real provider setup and email notification test are still required.
- Do not ask for passwords, payment details or sensitive documents.
