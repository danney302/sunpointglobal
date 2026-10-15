# Sun Point Global website

Static, buildless website for the existing GitHub Pages repository:
https://github.com/danney302/sunpointglobal

## Publish

1. Sign in to GitHub with write access to the repository.
2. Upload the contents of the supplied website ZIP to the repository root on `main` (not a containing folder). Replace matching files and add the new files. Keep `CNAME` containing `sunpointglobal.net`.
3. Commit the update. If GitHub Pages already publishes `main` at `/ (root)`, the commit should trigger publication. Otherwise check Settings → Pages and preserve the existing publishing configuration; merge these files into its publishing branch/folder as appropriate.
4. Check the Pages deployment result and visit https://sunpointglobal.net/ and https://sunpointglobal.net/product.html. Confirm mobile layout and email links before sharing the update.

No package installation, build command, backend, or new hosting service is required. No DNS change is required. `flyer.html` and both original logo files are retained.

## Pages

- `index.html`: company positioning, consulting and product paths, original testimonial
- `consulting.html`: all five existing SolarWinds service areas
- `product.html`: Internet Experience Monitoring concept, planned capabilities, development status, early access interest
- `use-cases.html`: intended applications, explicitly not deployments
- `about.html`: Daniel Ney, enterprise monitoring background, earlier IMF Raspberry Pi concept, independent development statement
- `contact.html`: separate consulting and early access email actions

The original `#services`, `#about`, `#testimonials`, and `#contact` homepage URLs redirect to the corresponding content so old links remain useful.

## Product and contact status

The product is in development. Planned local probing, fault isolation, and battery-backed event capture are goals, not released capabilities. No launch date, price, customer deployments, integration availability, or certifications are asserted. Early access contact expresses interest only.

Contact buttons open an email app. This static site does not collect, store, or submit form data.

## Verification

Passed source checks on six pages, 78 local links/assets, one H1 per page, viewport metadata, active navigation, unchanged CNAME, development labeling, JavaScript syntax, and Git whitespace checks. Browser preview timed out in the execution environment; rendered desktop/mobile verification remains outstanding.

GitHub publication could not be completed because the session's Git credentials were rejected. The ZIP is ready to upload; the companion patch applies against commit 8835d14 of the original repository.
