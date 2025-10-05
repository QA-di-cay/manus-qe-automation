# Playwright TME Test Automation

Automated UI tests using [Playwright](https://playwright.dev/).  
This project follows the **Page Object Model (POM)** and **Data-Driven** patterns for maintainability and scalability, and supports environment configuration via `.env`.

---

## 📑 Table of Contents
- [Prerequisites](#-prerequisites)
- [Installation / Setup](#-installation--setup)
- [Run Tests](#-run-tests)
- [Test Structure / Project Layout](#-test-structure--project-layout)
- [Reports & Artifacts](#-reports--artifacts)
- [Coding Guidelines / Conventions](#-coding-guidelines--conventions)

---

## ✅ Prerequisites
- **Node.js** v18+  
- **npm** (comes with Node.js)  

---

## ⚙️ Installation / Setup

1. **Clone the repository**
   ```bash
   git clone git@bitbucket.org:TMEAU/tme-qe-automation.git
   ```

2. **Install dependencies**
   ```bash
   npm i && npx playwright install --with-deps
   ```

3. **Create a `.env` file** at project root:
   ```env
   ENV_NAME=
   BASE_URL=
   ADMIN_USERNAME=
   ADMIN_PASSWORD=
   ```

---

## ▶️ Run Tests

- Run **all tests**:
  ```bash
  npm run test:all
  ```

- Run only **feature test**:
  ```bash
  npm run test:<Feature Name>
  ```

- Run **regression tests**:
  ```bash
  npm run test:regression
  ```

- Run **smoke tests**:
  ```bash
  npm run test:smoke
  ```

- Run **combined feature + smoke tests**:
  ```bash
  npm run test:<Feature Name>_smoke
  ```

---

## 📂 Test Structure / Project Layout

```
src
 ├── data                     # Test data
 │    └── *Data.ts
 ├── pom                      # Page Object Model
 │    └── <Application Name>
 │         ├── components     # Common UI components
 │         │    └── *.ts
 │         └── pages          # Page Objects
 │              └── *Page.ts
 ├── setup                    # Fixtures & setup scripts
 │    ├── all_fixtures.ts
 │    └── globalSetup.ts
 ├── utils                    # Helper functions
 │    └── *Helper.ts
tests
 └── operatorPortal
      └── <module Name>        # Test specifications
           └── *.spec.ts
.env                          # Environment variables
playwright.config.ts          # Playwright configuration
tsconfig.json                 # TypeScript configuration
README.md
```

---

## 📊 Reports & Artifacts

- **HTML Report**  
  Generate after test run:
  ```bash
  npx playwright show-report
  ```
  Reports are stored in the `playwright-report/` folder.

- **Screenshots & Videos**  
  - Screenshots captured on failure.  
  - Videos retained only for failed tests.  

- **Trace Files** (optional, can enable in config)  
  Helpful for debugging failing tests.

---

## 📝 Coding Guidelines / Conventions

### 1. **Test Case Naming Convention**
- Use concise and clear descriptions:  
  ```
  'Valid credentials - @login @regression @smoke'
  'Invalid password - @login @regression'
  ```
- Start with the action or test condition.  
- Optionally include tags at the end of the test name for easier filtering.

### 2. **Test Tag Convention**
- `@smoke`: Basic, quick tests to verify system functionality (e.g., login with valid credentials, loading the main page).
- `@regression`: Covers main flows and edge cases, ensuring no bugs appear during releases.  
- `@<Module Name>`, `@<Feature Name>`: Tags based on **module** or **feature** for easier filtering.

### 3. **Other Conventions**
- **Page Object Model (POM):**
  - Each page → a class in `src/pom/<Application Name>/pages/`.  
  - Common components → `src/pom/<Application Name>/components/`.  
- **Fixtures**:
  - Defined in `src/setup/all_fixtures.ts` to share context and login setup.  
- **Test Data**:
  - Separated in `src/data/`, avoid hardcoding inside test files. 
- **Naming convention**:
  - File test: `*.spec.ts`  
  - File data: `*Data.ts`  
  - File page object: `*Page.ts`
  - File helper function: `*Helper.ts`

---