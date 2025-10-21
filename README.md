# 🧩 NDBS-DK Lint Monorepo

> Shared ESLint configurations and plugins for NDBS-DK corporate projects.

---

## 📦 Packages

| Package                                                     | Description                                                                                 |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| [eslint-plugin-cap](./packages/eslint-plugin-cap/README.md) | Custom ESLint plugin enforcing CAP (Cloud Application Programming) naming and safety rules. |

---

## 🚀 Overview

This monorepo hosts all **NDBS-DK ESLint tooling**, including:

* `eslint-plugin-cap`: CAP-specific validation and naming rules.
* (Future) `eslint-config-cap`: Flat config presets for internal TypeScript/CAP projects.

Each package under `packages/` contains its own documentation and setup guide.

---

## 🏗️ Development

```bash
# Install all dependencies
yarn install

# Lint and test all packages
yarn workspaces run lint
```

---

## 📄 License

MIT License © 2025 NDBS-DK
