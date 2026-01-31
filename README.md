# ITPM_assignment1 - SwiftTranslator Playwright Automation Tests

This repository contains automated end-to-end tests for the SwiftTranslator application using Playwright. The tests cover various functional scenarios, including positive and negative test cases for translation features.

## Features

- Automated UI testing for translation functionality
- Cross-browser testing (Chromium, Firefox, WebKit)
- Data-driven tests using Excel input
- Comprehensive test reporting with Playwright's built-in reporter
- Negative functional tests to ensure error handling

## Requirements

- Node.js (v18 or higher)
- npm (comes with Node.js)
- Git

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/dilshan03/ITPM-Assignment-1-
   cd ITPM-Assignment-1-

   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

## Running Tests

### Run all tests

```bash
npx playwright test
```

### Run specific test file

```bash
npx playwright test tests/translator.spec.js
```

### Run tests in a specific browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run tests in headed mode (visible browser)

```bash
npx playwright test --headed
```

### Run tests with debugging

```bash
npx playwright test --debug
```

## Viewing Reports

After running tests, view the HTML report:

```bash
npx playwright show-report
```
