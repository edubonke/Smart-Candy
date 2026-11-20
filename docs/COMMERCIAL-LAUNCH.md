# Commercial launch checklist (not yet authorised)

This repository is an independent educational redesign. The official Smart Candy business and site are unaffected. Do not enable indexing, advertise, collect customer contacts or take payments until written brand/supply authorisation or a distinct lawful brand and operating entity are established.

## Implemented preview

- Fifteen standalone HTML pages (ten original acquisition briefs, three local rental pages, wholesale and starter-kit planners).
- Unique titles, H1s, descriptions, canonical URLs, breadcrumb JSON-LD, internal links and a **review-only** sitemap-preview.xml.
- Local-only calculators: serving yields including waste, sugar portions, equipment payback, rental quote and refundable deposit breakdown, and wholesale trial order estimates.
- Responsive navigation and noindex/nofollow on every generated page.
- Existing homepage and catalogue interactions retained; no official business phone, showroom address or direct sales contact presented as belonging to this demo.

## Authorised commercial release gates

1. Obtain brand and image rights, legitimate product supply, trading entity, verified product claims, prices and VAT status. Rebrand if necessary. Confirm actual service areas and the specific supplier contact destination.
2. Deploy to a host that permits commercial transactions, on a domain controlled by the trading entity. Set new canonicals and create the real sitemap. Enable indexing only once the live site passes the gates. Keep the educational preview noindex.
3. Connect secure server-side product/stock data, accounts, role-based access and a payment provider's hosted checkout. Implement inventory transaction safeguards and booking concurrency protection; test payment callbacks and cancellations. Create applicable consumer guarantees, privacy notice, retention and security controls, and returns/rental terms.
4. Add accurate Product/Offer structured data only once price and availability are supported by the actual storefront. Never assert fictional ratings, locations, stock or products. Implement a verified quote/WhatsApp channel only after recipient ownership is confirmed.
5. Instrument GA4 or an equivalent privacy-aware system with consent and no personal data in event payloads. Track product_view, estimate_completed, quote_started, quote_submitted, qualified_lead, rental_confirmed and purchase. Confirm backend revenue and unique lead IDs before analysing attribution. Verify Search Console with authorised domain ownership and submit the production sitemap.
6. Create one eligible Google Business Profile per real location; no virtual-only or duplicate profiles. Run generic search ads only after tracking and fulfilment are verified. Do not use competitor trademarks in ad copy, fake testimonials or private lists.
7. Run consent-based B2B outreach, keeping channel-specific consent, unsubscribe records, suppression lists and data minimisation. Do not send cold promotions without a lawful basis. Set a margin-safe trial discount only when actual landed costs are known.
8. Establish a public rank baseline for the ten exact keywords, using South African desktop/mobile location settings. Review organic positions, leads, booked rentals, conversion, sales, contribution and repeat orders weekly. Never describe unverified search-result ordering as exact Google ranks.

## Priority pages

Start with slush mix, candy floss sugar, slush machines, soft serve and Pretoria rentals. Expand only where actual operations support the page. Review scripts/growth-pages.mjs for editable titles and content; after any change run npm run lint, npm test, npm run build.
