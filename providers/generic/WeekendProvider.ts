import { DayOfWeek, type IWeekendProvider } from "@types";
import { Holiday } from "@models";

export class WeekendProvider implements IWeekendProvider {
  private readonly _weekendDays: Array<DayOfWeek>;
  private readonly _firstWeekendDay: DayOfWeek;
  private readonly _lastWeekendDay: DayOfWeek;

  public isWeekend(parameter: Date | Holiday | DayOfWeek): boolean {
    if (parameter instanceof Date) {
      return this.isWeekend(parameter.getDay());
    }

    if (parameter instanceof Holiday) {
      return this.isWeekend(parameter.date);
    }

    return this._weekendDays.includes(parameter);
  }

  public get weekendDays(): Array<DayOfWeek> {
    return this._weekendDays;
  }

  public get firstWeekendDay(): DayOfWeek {
    return this._firstWeekendDay;
  }

  public get lastWeekendDay(): DayOfWeek {
    return this._lastWeekendDay;
  }

  public constructor(...weekendDays: DayOfWeek[]) {
    this._weekendDays = weekendDays;

    const min = Math.min(...weekendDays);
    const max = Math.max(...weekendDays);

    if (max - min > (min + 7) - max) {
      this._firstWeekendDay = max;
      this._lastWeekendDay = min;
    } else {
      this._firstWeekendDay = min;
      this._lastWeekendDay = max;
    }
  }

  public static FridayOnly(): WeekendProvider {
    return new WeekendProvider(DayOfWeek.Friday);
  }

  public static SaturdayOnly(): WeekendProvider {
    return new WeekendProvider(DayOfWeek.Saturday);
  }

  public static SundayOnly(): WeekendProvider {
    return new WeekendProvider(DayOfWeek.Sunday);
  }

  public static FridaySunday(): WeekendProvider {
    return new WeekendProvider(DayOfWeek.Friday, DayOfWeek.Sunday);
  }

  public static SemiUniversal(): WeekendProvider {
    return new WeekendProvider(DayOfWeek.Friday, DayOfWeek.Saturday);
  }

  public static Universal(): WeekendProvider {
    return new WeekendProvider(DayOfWeek.Saturday, DayOfWeek.Sunday);
  }
}
