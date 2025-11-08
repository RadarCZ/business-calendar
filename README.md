# @radarcz/business-calendar

A tiny TypeScript library for working-day calculations per country. It currently ships with Czechia (CZ) weekends and public holidays and a simple API to count business days in a month. Designed for Deno and JSR; can also be consumed from Node/Bun via JSR.

## Features
- Weekend/holiday aware business day calculations
- Country-specific providers (Czechia supported today)
- Zero runtime dependencies for the core logic

## Installation

Using JSR (recommended):

```sh
# Deno
deno add jsr:@radarcz/business-calendar

# Node/Bun via JSR (uses the jsr: specifier through your bundler/runtime)
# See https://jsr.io/docs/using-packages for details
```

You can also import directly by URL with the `jsr:` specifier:

```ts
import { BusinessCalendar, CountryCode, Month } from "jsr:@radarcz/business-calendar";
```

## Quick start

Count business days in each month of a given year for Czechia:

```ts
import { BusinessCalendar, CountryCode, Month } from "jsr:@radarcz/business-calendar";

const cal = new BusinessCalendar(CountryCode.CZ);

for (const monthName of Object.keys(Month).filter(k => isNaN(Number(k)))) {
  const month = (Month as any)[monthName] as Month;
  const days = cal.countBusinessDaysInMonth(2025, month);
  console.log(`${monthName}: ${days}`);
}
```

Example output (varies by year):

```
January: 23
February: 20
...
```

## API

- `class BusinessCalendar`
  - `constructor(country: CountryCode)` – create a calendar for a specific country.
  - `countBusinessDaysInMonth(year: number, month: Month): number` – returns the number of business days excluding weekends and observed public holidays.

- `enum CountryCode`
  - `CZ` – Czechia (currently supported)

- `enum Month` – months `January`..`December` (0-based), exported for convenience.

Additional types are exported (e.g., `DayOfWeek`, `HolidayType`) for provider authors.

## Status and roadmap
- ✅ Weekend and holiday systems for Czechia
- 🚧 More countries (PRs welcome!)

If you need a specific country, please open an issue or contribute a provider under `providers/country/`.

## Development

This is a Deno project configured for JSR publishing.

- Entry point: `mod.ts`
- Aliases are defined in `deno.json` (e.g., `@types`, `@providers`, `@systems`, `@utils`).

## License

MIT © 2025 Lukáš "Radar" Kubíček <[kubicek@radarsoft.cz](mailto:kubicek@radarsoft.cz)>
