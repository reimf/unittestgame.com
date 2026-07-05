# unittestgame.com

A browser game about writing unit tests, built with TypeScript and tested end-to-end with Playwright.

## Prerequisites

### Install git

Follow the instructions on [git-scm.com](https://git-scm.com/downloads)

Verify:
```
git --version
```

### Install Node.js

Follow the instructions on [nodejs.org](https://nodejs.org/en/download)

Verify:
```
node -v
npm -v
```

## Project setup

Clone the repo:
```
git clone https://gitlab.com/fransre/unittestgame.com.git
```

Go to the folder:
```
cd unittestgame.com
```

Install dependencies from `package-lock.json`:
```
npm clean-install
```

Verify TypeScript:
```
npx tsc -v
```

Verify Playwright:
```
npx playwright --version
```

### Install Playwright's browser binaries

Install Playwrights own browser build (Chromium):

```
npx playwright install chromium
```

And (on Linux only):
```
npx playwright install-deps chromium
```

Verify:
```
npx playwright install --dry-run chromium
```

## Compile

Compile TypeScript (`src/` and `test/`) to JavaScript:
```
npm run build
```

## Running the test suite

Run all Playwright unit tests and end-to-end tests:
```
npx playwright test
```

Expected output ends with something like:
```
906 passed (15.7s)

=============================== Coverage summary ===============================
Statements   : 100% ( 3116/3116 )
Branches     : 100% ( 606/606 )
Functions    : 100% ( 333/333 )
Lines        : 100% ( 3116/3116 )
================================================================================
```

An HTML coverage report is written to `playwright-coverage/index.html`.

### Running tests interactively

Playwright's UI mode lets you step through tests and inspect traces:
```
npx playwright test --ui
```

## Local preview

The repo includes a `.fiveserverrc` for previewing the game with live reload:
```
npx five-server
```

Then open the URL:
`http://localhost:5520`

## CI

`.gitlab-ci.yml` mirrors this setup in GitLab CI:
it runs `npm clean-install` + `tsc --build` in a `compile` stage, 
then `npm clean-install` + `npx playwright test` in a `test` stage
using the official `mcr.microsoft.com/playwright` image
(which already has browsers preinstalled).
