# Swift Translator — Playwright Tests ✅

A small Playwright test suite for verifying the Romanized Sinhala → Sinhala transliteration on https://www.swifttranslator.com/.

---

## 🚀 Quick Start

Prerequisites:

- Node.js (v16+ recommended)
- npm (or yarn)
- Playwright browsers (installed automatically when running commands below)

Install dependencies:

```bash
npm install
```

Run the full test suite:

```bash
# Run all tests across configured browsers
npx playwright test
```

Run a single test file:

```bash
npx playwright test tests/Translator.spec.js
```

Open the HTML report:

```bash
# Show the Playwright HTML report (defaults to playwright-report/)
npx playwright show-report
# Or open the file directly: playwright-report/index.html
```

Run a single test by name (grep):

```bash
npx playwright test -g "Pos_Fun_0001"
```

Run tests headed (visible) or choose a browser:

```bash
npx playwright test --headed
npx playwright test --project=firefox
```

---

## 🔧 Project Structure

- `tests/Translator.spec.js` — Playwright tests and test cases (positive + negative arrays)
- `playwright.config.js` — Playwright configuration (testDir, reporter, projects)
- `playwright-report/` — Generated HTML report
- `test-results/` — Per-run logs / artifacts (screenshots / traces)

---

## ✍️ Test data and how to add tests

Test cases are defined as objects in `positiveTestCases` and `negativeTestCases` arrays near the top of `tests/Translator.spec.js`.

To add a new case:

1. Add an object to the appropriate array with `id`, `input`, `expected`, and `group`.
2. Add a new `test()` entry or let the test loop pick it up automatically.

Example entry:

```js
{ id: 'Pos_Fun_999', input: 'oya kohomada', expected: 'ඔයා කොහොමද', group: 'greeting' }
```

---

## 🧾 Type checking & lint notes

This repo uses `// @ts-check` at the top of the test file. If you see errors like `Parameter 'str' implicitly has an 'any' type (ts7006)`:

- Add JSDoc annotations to provide types for functions (e.g. `@param {string|undefined} str` and `@returns {string}`), or
- Convert files to TypeScript (`.ts`) and add proper type annotations.

Example JSDoc:

```js
/**
 * Normalize input text for reliable comparison.
 * @param {string|undefined} str
 * @returns {string}
 */
function normalize(str) { ... }
```

---

## 🧪 Debugging / Troubleshooting

- Increase timeouts or add extra waits if the site is slow (see `page.waitForTimeout()` in tests).
- Use `npx playwright test --debug` to run in debug mode with inspector.
- Check `test-results/` and `playwright-report/` for artifacts (screenshots/traces).

---

## ♻️ Contributing

Feel free to open issues or PRs to add tests, improve data coverage (edge cases, punctuation, numerals), or harden selectors and assertions.

---

## 📄 License

This repository currently has no license specified. Add a `LICENSE` file if you plan to share or publish the code.

---

If you'd like, I can also add npm scripts to `package.json` (like `test` and `report`) and a CONTRIBUTING.md file. 🔧
