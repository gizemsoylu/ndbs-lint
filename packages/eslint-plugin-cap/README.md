# 📦 @ndbs/eslint-plugin-cap

> Corporate ESLint 9 (Flat Config) plugin providing opinionated code-quality rules for SAP CAP projects.

---

## 🚀 Installation

```bash
npm install --save-dev @ndbs-dk/eslint-plugin-cap
# or
yarn add -D @ndbs-dk/eslint-plugin-cap
```

---

## 📦 Peer Dependencies

Make sure the following packages are installed (CAP projects usually have them):

```bash
npm install --save-dev eslint@^9 @sap/cds @typescript-eslint/parser @typescript-eslint/eslint-plugin jsonc-eslint-parser
```

---

## 🧩 Usage (Flat Config – ESLint v9+)

Create a file named **`eslint.config.mjs`** in your project root:

```js
import cds from '@sap/cds/eslint.config.mjs'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import jsoncParser from 'jsonc-eslint-parser'
import ndbsPlugin from '@ndbs-dk/eslint-plugin-cap'

export default [
  // CAP/CDS rules
  ...cds.recommended,

  // TypeScript files
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': tseslint,
      '@ndbs/cap': ndbsPlugin
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@ndbs/cap/no-explicit-any': 'error',
      '@ndbs/cap/filename-kebab-4-words': ['error', { maxWords: 4 }]
    }
  },

  // package.json validation
  {
    files: ['package.json'],
    languageOptions: { parser: jsoncParser },
    plugins: { '@ndbs-dk/cap': ndbsPlugin },
    rules: {
      '@ndbs-dk/cap/project-name': 'error'
    }
  }
]
```

Then run:

```bash
npx eslint . --ext .ts,.js,.json
```

---

## ⚙️ Rules

| Rule                                   | Description                                                                 | Default   |
| -------------------------------------- | --------------------------------------------------------------------------- | --------- |
| **`@ndbs-dk/cap/filename-kebab-4-words`** | Enforces kebab-case filenames with max 4 words; forbids `_` and extra dots. | ✅ `error` |
| **`@ndbs-dk/cap/no-explicit-any`**        | Disallows TypeScript `any` type.                                            | ✅ `error` |
| **`@ndbs-dk/cap/project-name`**           | Ensures `package.json:name` is kebab-case ≤4 words and matches folder name. | ✅ `error` |

---

## 🧬 Examples

### ✅ Correct filenames

```
ndbs-demo-cap-app.ts
```

### ❌ Invalid filenames

```
NDBS-Demo-Cap-App.ts          # uppercase
ndbs_demo_cap_app.ts          # underscore
ndbs-demo-cap-ui5-build.ts # 5 words (>4)
```

### ❌ `any` usage

```ts
// Bad
const x: any = 1;

// Good
const x: number = 1;
```

### ❌ Invalid `package.json`

```json
{
  "name": "Ndbs-Cap-App"
}
```

✅ Correct:

```json
{
  "name": "ndbs-cap-app"
}
```

---

## 🧱 CI/CD Integration

Add this step to your pipeline:

```bash
npx eslint . --max-warnings=0
```

Or add a script in `package.json`:

```json
"scripts": {
  "lint": "eslint . --ext .ts,.js,.json --max-warnings=0"
}
```

---

## 🔖 Versioning

Follow **Semantic Versioning (SemVer)**:

* **Patch** – small fixes or internal improvements
* **Minor** – new rule addition
* **Major** – breaking rule rename or logic change

Update & publish:

```bash
npm version patch | minor | major
npm publish
```

---

## 👥 Maintainers

* **gizemsoylutr**
* Contact: [gizemsoylu.tr@gmail.com](mailto:gizemsoylu.tr@gmail.com)

---

## 📄 License

MIT License © 2025 NDBS-DK
