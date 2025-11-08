# Contributing to @radarcz/business-calendar

Thanks for your interest in improving this library! This document explains how to set up your environment, make changes, and propose improvements.

The project is a small TypeScript library for computing business/working days per country. It targets Deno and is published via JSR.

## Table of contents
- Getting started
- Development workflow
- Project structure
- Adding a new country provider
- Coding standards
- Submitting changes (PRs)
- Release & publishing (maintainers)
- License

## Getting started

Prerequisites:
- Deno (latest stable recommended). Install from https://deno.com/install
- Git and a GitHub account

Setup:
1. Fork the repository and clone your fork.
2. Ensure Deno works: `deno --version`.
3. No dependency install is required; Deno fetches imports on demand.

Optional but helpful:
- Enable your editor's Deno integration for type-checking and formatting.

## Development workflow

Common commands:
- Format: `deno fmt`
- Lint: `deno lint`
- Type-check the public entry: `deno check mod.ts`

Before committing:
- Run `deno fmt` and `deno lint`.
- Ensure the sample script still runs and outputs reasonable numbers for a given year.

## Project structure

Highlights only (paths relative to repo root):
- `mod.ts` — public entry point re-exporting the library API
- `BusinessCalendar.ts` — core class that counts business days
- `providers/` — holiday and weekend providers
  - `country/` — country-specific holiday providers (e.g., `CzechiaHolidayProvider.ts`)
  - `generic/` — base/utility providers (e.g., `AbstractHolidayProvider.ts`, `WeekendProvider.ts`)
  - `religion/` — shared religious holiday calculators (if applicable)
- `systems/` — wiring that returns the correct provider for a `CountryCode`
  - `HolidaySystem.ts` — maps country -> holiday provider
  - `WeekendSystem.ts` — maps country -> weekend provider
- `types/` — enums and interfaces (e.g., `CountryCode`, `Month`, `IHolidayProvider`)
- `models/` — common data models (e.g., `HolidaySpecification`, `ObservedRuleSet`)
- `utils/` — shared helpers (e.g., date normalization)

## Adding a new country provider

Contributions adding new countries are very welcome! A typical addition involves:

1. Add the country to `types/CountryCode.ts`:
   ```ts
   export enum CountryCode {
     CZ,
     // Add your country code here, e.g. US,
   }
   ```

2. Implement a holiday provider in `providers/country/<YourCountry>HolidayProvider.ts` by extending `AbstractHolidayProvider` and returning the list of holidays for a given year.
   - Use `models/HolidaySpecification.ts` and related types to define fixed/movable holidays.
   - If observed-day rules apply (e.g., move to Monday when on weekend), model them with `models/ObservedRuleSet.ts`.

3. Export your provider from `providers/country/index.ts` and from `providers/index.ts` if needed.

4. Register the provider in `systems/HolidaySystem.ts` so `BusinessCalendar` can obtain it for your `CountryCode`.

5. Weekend rules:
   - If the weekend is Saturday/Sunday, the generic `WeekendProvider` likely works.
   - If your country has different weekend days, add a custom provider and wire it in `systems/WeekendSystem.ts`.

6. Documentation:
   - Update `README.md` to mention the new country.
   - Optionally include short notes about observed-day rules peculiarities.

7. Basic verification:
   - Use `deno run -A .index.ts` and spot-check months that include known public holidays for the new country.
   - If you add tests in the future, place them nearby the relevant files or under a `tests/` folder and run with `deno test`.

## Coding standards

- Language: TypeScript (ESNext libs as configured in `deno.json`).
- Style: `deno fmt` and `deno lint` are the sources of truth.
- Imports: Prefer path aliases defined in `deno.json` (e.g., `@types`, `@providers`, `@systems`, `@utils`).
- API surface: Keep the public API minimal and documented in `README.md`.
- Commit messages: Conventional Commits style is appreciated (e.g., `feat: add US holiday provider`).

## Submitting changes (PRs)

1. Create a feature branch from `main`.
2. Make focused changes with clear commit messages.
3. Run `deno fmt`, `deno lint`, and a quick local check via `.index.ts`.
4. Update `README.md` if behavior or supported countries change.
5. Open a Pull Request describing the change, context, and any caveats.

PR checklist:
- [ ] Code formatted and linted
- [ ] Compiles / type-checks
- [ ] Demo script runs
- [ ] Docs updated (if applicable)

## Release & publishing (maintainers)

Publishing is automated via GitHub Actions (`.github/workflows/publish.yml`) and JSR.

Steps:
1. Bump the version in `deno.json` (semver).
2. Commit the change: `chore: release vX.Y.Z`.
3. Tag the commit with the same version (e.g., `git tag vX.Y.Z`) and push tags (`git push --tags`).
4. The `Publish` workflow will run and execute `npx jsr publish`.

Notes:
- Ensure CHANGELOG/README are up to date before tagging.
- JSR requires appropriate permissions; the workflow uses OIDC with `id-token: write`.

## License

By contributing, you agree that your contributions will be licensed under the MIT license included in this repository.
