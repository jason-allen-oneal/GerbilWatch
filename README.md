# Gerbil Threat Index

A satirical ranking of real gerbil types, not individually named pets.
Ten entries: three species and seven Mongolian gerbil coat varieties, labeled
separately. Real identity sources are linked inside every dossier and recorded
in SOURCES.md. Threat scores and allegations are wholly invented.

The existing bureau theme is retained. Search, classification filters, threat
filters, sorting, type dossiers, fictional incidents, redaction reveals, JSON
exports and resets work locally. Reassessment edits a listed type, rather than
inventing a new breed or registering somebody's pet.

## Develop
Requires Node 22+ and npm.

```sh
npm install --ignore-scripts
npm run typecheck
npm test
npm run preview
```

The build creates `dist/` and `Gerbil-Threat-Index-preview.html`. The latter is a
single offline document with its stylesheet, JavaScript and mascot embedded.
For browser tests, install Python Playwright and Chromium, then run:

```sh
GERBIL_TEST_MODE=document python tests/browser_test.py
```

Import into Vercel from the repository root. `vercel.json` uses the build script
and `dist/` output. No environment variables or model API are needed.

The app stores edits only in tab memory. No tracking, cookies or persistent
storage is added. A hosting provider may process ordinary request logs.
Source links only navigate when clicked. No actual agency or animal assessment
is involved. See QA.md for what was tested. No publishing was performed in this revision.
