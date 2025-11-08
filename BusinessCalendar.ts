import type { CountryCode, IWeekendProvider, Month } from "@types";
import { HolidaySystem, WeekendSystem } from "@systems";
import type { AbstractHolidayProvider } from "@providers";
import { normalizeDate } from "@utils";

/**
 * Business calendar utilities for a specific country.
 *
 * Creates weekend and holiday providers based on the given {@link CountryCode}
 * and exposes methods to work with business days.
 *
 * Example:
 * ```ts
 * import { BusinessCalendar, CountryCode, Month } from "@radarcz/business-calendar";
 * const cal = new BusinessCalendar(CountryCode.CZ);
 * const workdays = cal.countBusinessDaysInMonth(2025, Month.January);
 * ```
 */
export class BusinessCalendar {
  private readonly _country: CountryCode;
  private readonly _weekendProvider: IWeekendProvider;
  private readonly _holidayProvider: AbstractHolidayProvider;

  /**
   * Create a calendar for the given country.
   *
   * @param country ISO 3166-1 alpha-2 country code supported by this library.
   */
  constructor(country: CountryCode) {
    this._country = country;
    this._weekendProvider = new WeekendSystem().getWeekendProvider(country);
    this._holidayProvider = new HolidaySystem().getHolidayProvider(country);
  }

  /**
   * Count business days (Mon–Fri excluding public holidays and observed holidays)
   * for a given month of a given year.
   *
   * Weekends are determined by the selected country's weekend provider and public
   * holidays come from the corresponding holiday provider.
   *
   * @param year Four-digit year, e.g. `2025`.
   * @param month Month enum (zero-based like JavaScript `Date`, January = 0).
   * @returns Number of business days in the specified month.
   */
  public countBusinessDaysInMonth(year: number, month: Month): number {
    const holidayDates = new Set<number>();
    for (const h of this._holidayProvider.getHolidays(year)) {
      const d = normalizeDate(h.observedDate ?? h.date);
      if (d.getMonth() === month && d.getFullYear() === year) {
        holidayDates.add(d.getTime());
      }
    }

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let count = 0;
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      if (this._weekendProvider.isWeekend(date)) {
        continue;
      }
      if (holidayDates.has(normalizeDate(date).getTime())) {
        continue;
      }
      count++;
    }

    return count;
  }
}
