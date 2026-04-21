# Platform Extension Starter

> Starter repository for extensions for Bullhorn 2017

* MASTER BRANCH == static version
* FULLSTACK == full stack version (STILL TODO)

## Getting Started

##### Prerequisites: Node `^20.19.0 || ^22.12.0 || >=24` (required by Angular 20)

* Clone this
* `npm install` (runs the `postinstall` brace patch automatically — see below)
* `npm start`

## Scripts

| Command                  | What it does                                          |
| ------------------------ | ----------------------------------------------------- |
| `npm start`              | Dev server on `localhost:4200` (development config)   |
| `npm run start:local`    | Dev server using `environment.local.ts`               |
| `npm run build`          | Production build (`--configuration=prod`)             |
| `npm run build:staging`  | Staging build                                         |
| `npm test`               | Jest (runs via `@angular-builders/jest`)              |
| `npm run lint`           | ESLint over `src/**/*.{ts,html}`                      |

## Stack

* **Angular 20** + Angular CDK 20
* **TypeScript 5.8**
* **novo-elements 12.1.0** (UI), novo-design-tokens, hint.css
* **Jest 30** + jest-preset-angular 15
* ESLint 8.57 + `@angular-eslint` 20, `@typescript-eslint` 8
* `post-robot` 8 (parent-window messaging, wrapped by novo-elements' `AppBridge`)
* `@bullhorn/bullhorn-types` for Bullhorn API typings

## `postinstall` brace patch

`brace@0.11.1` ships an `exports` map whose `./ext/*` pattern mis-resolves novo-elements' `import 'brace/ext/language_tools.js'` to `./ext/language_tools.js.js`. `scripts/patch-brace.mjs` rewrites `node_modules/brace/package.json` with correct subpath patterns and runs automatically after every `npm install`. If `brace` ever publishes a corrected exports map upstream, the patch becomes a no-op and can be removed.

## Upgrade Process

Every upgrade is slightly different. [update.angular.io](https://update.angular.io) is the authoritative step-by-step for each Angular version jump.

### Example: Angular 19 → Angular 20, novo-elements 10 → 12.1.0

1. Bump versions in `package.json`:
   * All `@angular/*` and `@angular-eslint/*` to `^20.0.0`
   * `@angular/cdk` to `^20.0.0` (previously held at 19 for novo-elements 10 compatibility)
   * `typescript` to `~5.8.0` (required by `@angular/compiler-cli` 20)
   * `novo-elements` to `12.1.0`
   * `jest` + `jest-environment-jsdom` + `@types/jest` to `^30.0.0`
   * `jest-preset-angular` to `^15.0.0`
   * `@angular-builders/jest` to `^20.0.0`
   * `@typescript-eslint/*` to `^8.0.0`
2. Add novo-elements 12's new **required** peer deps (formerly optional in v10): `brace`, `codemirror`, `@codemirror/{view,state,commands,lang-javascript}`, `angular-imask`, `timezone-support`, `classlist.js`.
3. `rm -rf node_modules package-lock.json && npm install` — the old lockfile will block resolution; a fresh install is cleanest.
4. Remove `globalSetup: 'jest-preset-angular/global-setup'` from `jest.config.js` (jest-preset-angular 15 no longer ships this export).
5. Add any new CommonJS-flagged dependencies to `allowedCommonJsDependencies` in `angular.json` (this upgrade added `brace`, `brace/ext/language_tools.js`, `brace/theme/chrome`).
6. `npm test` and `npm run build` to verify.

Expect the production bundle to grow substantially — novo-elements 12 ships brace and codemirror as peer deps rather than optional installs, so they're always bundled.
