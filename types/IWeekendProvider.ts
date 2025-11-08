import type { DayOfWeek } from "./DayOfWeek.ts";
import type { Holiday } from "@models";

export interface IWeekendProvider {
  get weekendDays(): Array<DayOfWeek>;
  isWeekend(date: Date): boolean;
  isWeekend(holiday: Holiday): boolean;
  isWeekend(dayOfWeek: DayOfWeek): boolean;
  isWeekend(parameter: Date | Holiday | DayOfWeek): boolean;
  get firstWeekendDay(): DayOfWeek;
  get lastWeekendDay(): DayOfWeek;
}
