import type { CountryCode, IWeekendProvider, Month } from "@types";
import { HolidaySystem, WeekendSystem } from "@systems";
import type { AbstractHolidayProvider } from "@providers";
import { normalizeDate } from "@utils";

export class BusinessCalendar {
  private readonly _country: CountryCode;
  private readonly _weekendProvider: IWeekendProvider;
  private readonly _holidayProvider: AbstractHolidayProvider;

  constructor(country: CountryCode) {
    this._country = country;
    this._weekendProvider = new WeekendSystem().getWeekendProvider(country);
    this._holidayProvider = new HolidaySystem().getHolidayProvider(country);
  }

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
