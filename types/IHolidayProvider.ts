import type { Holiday } from "@models";

export interface IHolidayProvider {
  getHolidays(year: number): Iterable<Holiday> | Array<Holiday>;
  getSources(): Array<string>;
}
