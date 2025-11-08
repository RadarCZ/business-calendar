/**
 * Main entry point for consumers of the library.
 *
 * Re-exports the {@link BusinessCalendar} class as well as commonly used types
 * so that users can import everything from the package root.
 */

/**
 * Business calendar for a given country.
 *
 * Provides utilities to work with business days and holidays (weekends and
 * public holidays) for supported countries.
 *
 * Example:
 * ```ts
 * import { BusinessCalendar, CountryCode, Month } from "@radarcz/business-calendar";
 *
 * const cal = new BusinessCalendar(CountryCode.CZ);
 * const businessDays = cal.countBusinessDaysInMonth(2025, Month.January);
 * ```
 */
export { BusinessCalendar } from "./BusinessCalendar.ts";

/**
 * ISO 3166-1 alpha-2 country codes supported by this library.
 *
 * Used to select appropriate weekend and holiday providers.
 */
export { CountryCode } from "@types";

/**
 * Month enum using JavaScript `Date` zero-based indexing (January = 0 … December = 11).
 *
 * Use together with `Date` APIs and the `BusinessCalendar` methods.
 */
export { Month } from "@types";
