# DPI-HT-01 student-certified submission

This is a static Vercel-ready review site. Its required pages are:

- `/` - reconstructed accounts and schedules
- `/review` - assessor queue for decisions, low-confidence items and certification gaps
- `/submission.json` - machine-readable answer with all 100 decision IDs

All monetary values are EUR in whole euros. Each material decision identifies whether its displayed effect is an original transaction, a correction to management's entry, a presentation reclassification, or a governance/closing-balance conclusion with no direct journal entry.

## Before submission

1. Review the two disclosed limitations: the EUR 9,000 inventory difference and the absence of quantifiable insurance evidence.
2. Re-check all schedules, the three statements, and the decision evidence with the instructor's required standard.
3. Publish this folder to a new GitHub repository, import that repository into Vercel, and verify `/`, `/review`, and `/submission.json` in a private browser window.

## Regenerate the JSON after review edits

Run the bundled Node executable from this folder with `data/build-submission.mjs`. The generated `submission.json` is the file served by the site.

The application contains all 100 decisions and 25 material AI review trails. Do not publish until you are satisfied with the disclosed inventory and insurance limitations.
