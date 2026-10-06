# Muslim Founder Launchpad

A polished, static intake landing page for a free community website setup offer.

## What changed from the original brief

- Positions the offer as a **community project**, not an unlimited agency promise.
- Makes the value clear: landing page, domain connection, email setup and launch help.
- Uses a shorter, friendlier intake flow with useful branching for domain ownership and starting point.
- Adds a privacy reminder and consent checkbox before collecting project details.
- Includes your existing work and GitHub link without making the page feel like a generic portfolio.
- Avoids guaranteeing all hosting costs: the copy says free setup/hosting is for suitable projects and the domain is the likely paid item.

## Files

- `index.html` — landing page and Netlify-compatible multipart form
- `styles.css` — responsive visual system
- `script.js` — progressive form indicator, domain field behavior and local-preview confirmation

## Form setup before publishing

This is intentionally provider-neutral, but the form is already marked up for **Netlify Forms**:

1. Deploy the folder to Netlify.
2. In Netlify, confirm the `project-intake` form appears after the first deploy.
3. Add an email notification to your inbox.
4. Test with a real submission and confirm file upload behavior and notification delivery.
5. If using another provider, replace the form setup in `index.html` with its endpoint and verify uploads, spam protection and email notifications.

The local preview shows a confirmation but does not send anything. Do not promise an email response until the hosted form has been tested.

## Suggested operating rules for the offer

- Accept a small number of projects per month.
- Make it clear that content, product fulfillment, legal pages, payments and ongoing maintenance are separate decisions.
- Never ask people to upload passwords or sensitive documents.
- Get permission before displaying a finished project as a portfolio reference.
- Consider a short review/approval step before purchasing a domain on somebody else's behalf.
