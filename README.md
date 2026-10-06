# Muslim Founder Launchpad

A polished, static intake landing page for a free community website setup offer. You bring the idea; the tech, hosting and domain email are handled fi sabilillah.

**Live:** https://launchpad.mscarabia.com

## What changed from the original brief

- Positions the offer as a **community project**, not an unlimited agency promise.
- Makes the value clear: landing page, domain connection, email setup and launch help.
- Uses a shorter, friendlier intake flow: three required fields (name, email, idea) plus an optional collapsible section.
- Adds a privacy reminder and consent checkbox before collecting project details.
- Includes your existing work and GitHub link without making the page feel like a generic portfolio.
- Avoids guaranteeing all hosting costs: the copy says free setup/hosting is for suitable projects and the domain is the likely paid item.

## Files

- `index.html` — landing page and Formspree AJAX form (no Netlify dependency)
- `styles.css` — responsive visual system, dark/light themes, scroll-reveal animations
- `script.js` — canvas background, scroll progress, word-reveal titles, form submission

## Form setup

The form submits to Formspree:

1. Create a form at https://formspree.io — free tier is fine.
2. Replace the `action` in `index.html` with your endpoint (`https://formspree.io/f/YOUR_FORM_ID`).
3. Test with a real submission.

## Suggested operating rules for the offer

- Accept a small number of projects per month.
- Make it clear that content, product fulfillment, legal pages, payments and ongoing maintenance are separate decisions.
- Never ask people to upload passwords or sensitive documents.
- Get permission before displaying a finished project as a portfolio reference.
- Consider a short review/approval step before purchasing a domain on somebody else's behalf.
