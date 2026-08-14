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
  961 passed (16.8s)

=============================== Coverage summary ===============================
Statements   : 100% ( 2772/2772 )
Branches     : 100% ( 585/585 )
Functions    : 100% ( 340/340 )
Lines        : 100% ( 2772/2772 )
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

## Conversation languages

### Editing

Keep the translations in sync.
* `translations.json`
* `index.html`
* `game.html`

### Adding

To add a new language (e.g. `pt` for Portuguese):
* Create `pt/translations.json` with the same keys, in the same order, as the other `translations.json` files.
* Create `src/conversation-language-pt.ts`.
* Register it in `src/conversation-languages.ts`.
* Create `pt/index.html` and `pt/game.html` and update `lang`, `og:url`, `canonical`, `<title>`, the meta description and the body text.
* Add `pt` to the `hreflang` links and the language switcher on every locale's `index.html` and `game.html`.
* Add `pt/index` and `pt/game` to `sitemap.txt`.
* Add `pt` to the `cp -r` and `gzip` lines of the `pages` job in `.gitlab-ci.yml`.
* Update `test/unit-test/translations.spec.ts` and `conversation-language.spec.ts` to cover the new locale.

## Programming languages

### Editing

Change how a language transpiles or highlights code.
* `src/programming-language-<id>.ts`
* `test/transpile-test/programming-language-<id>.spec.ts`

### Adding

To add a new programming language (e.g. `kotlin`):
* Create `src/programming-language-kotlin.ts` (implement `transpile()` and `getTokenTypes()`).
* Register it in `src/programming-languages.ts`.
* Add `test/transpile-test/programming-language-kotlin.spec.ts`.
* Add the language to `test/tokenize-test/tokenizer.spec.ts` and `test/e2e-test/21-programming-languages.spec.ts`.
* Add a `game?programming_language=kotlin` link for the language on every other locale's `index.html` and `game.html`.

## Levels

### Editing

Change a level's specification or candidate code.
* `src/level-<id>.ts`
* `<id>Specification` key in `translations.json`
* `test/unit-test/level-<id>.spec.ts`

### Adding

To add a new level (e.g. `sudoku`):
* Create `src/level-sudoku.ts` with the class `Sudoku` (implement `name()`, `specification()`, `getCandidateElements()`, `minimalUnitTestGenerator()` and `hintGenerator()`).
* Add a `sudokuSpecification` key to `ConversationStrings` in `src/conversation-language-base.ts` and to every locale's `translations.json`.
* Register the level in the `levelClasses` array in `src/levels.ts` (its position sets the level number).
* Add `test/unit-test/level-sudoku.spec.ts`.
* Add the level to the levels list on every locale's `index.html`.

Some language constructs that have been tried and eventually rejected.
* Regular expressions
  * Not all users are familiar with regular expressions
  * Some programming languages need an `import`
* Floats
  * Some languages round halves always up, others round halves to the even number
  * Converting a float to a string involves rounding
