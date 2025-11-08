import { HolidaySpecification, type ObservedRuleSet } from "@models";
import { HolidayType, type ICatholicProvider } from "@types";

export class CatholicProvider implements ICatholicProvider {
  private _cache: Record<number, Date> = {};

  public EasterSunday(year: number): Date;
  public EasterSunday(
    year: number,
    localName: string,
    observedRuleSet?: ObservedRuleSet,
  ): HolidaySpecification;
  public EasterSunday(
    year: number,
    localName?: string,
    observedRuleSet?: ObservedRuleSet,
  ): Date | HolidaySpecification {
    if (localName) {
      const date = this.EasterSunday(year);

      return new HolidaySpecification({
        id: "CEASTERSUNDAY-01",
        localName,
        englishName: "Easter Sunday",
        date,
        holidayType: HolidayType.Public,
        observedRuleSet,
      });
    }

    if (!this._cache[year]) {
      const getDate = () => {
        const g = year % 19;
        const c = Math.floor(year / 100);
        const h = (c - c / 4 - (8 * c + 13) / 25 + 19 * g + 15) % 30;
        const i = h - h / 28 * (1 - h / 28 * (29 / (h + 1)) * ((21 - g) / 11));

        let day = i - (year + year / 4 + i + 2 - c + c / 4) % 7 + 28;
        let monthIndex = 2;

        if (day > 31) {
          monthIndex++;
          day -= 31;
        }

        return new Date(year, monthIndex, day);
      };

      this._cache[year] = getDate();
    }

    return this._cache[year]!;
  }

  public AdventSunday(year: number): Date {
    const date = new Date(year, 11, 24);
    const daysToAdvent = 21 + date.getDay();
    date.setDate(date.getDate() - daysToAdvent);

    return date;
  }

  public MaundyThursday(
    localName: string,
    year: number,
    observedRuleSet: ObservedRuleSet | undefined,
  ): HolidaySpecification {
    const date = this.EasterSunday(year);
    date.setDate(date.getDate() - 3);

    return new HolidaySpecification({
      id: "CMAUNDYTHURSDAY-01",
      localName,
      englishName: "Maundy Thursday",
      date,
      holidayType: HolidayType.Public,
      observedRuleSet,
    });
  }

  public GoodFriday(
    localName: string,
    year: number,
    observedRuleSet: ObservedRuleSet | undefined,
  ): HolidaySpecification {
    const date = this.EasterSunday(year);
    date.setDate(date.getDate() - 2);

    return new HolidaySpecification({
      id: "CGOODFRIDAY-01",
      localName,
      englishName: "Good Friday",
      date,
      holidayType: HolidayType.Public,
      observedRuleSet,
    });
  }

  public EasterSaturday(
    localName: string,
    year: number,
    observedRuleSet: ObservedRuleSet | undefined,
  ): HolidaySpecification {
    const date = this.EasterSunday(year);
    date.setDate(date.getDate() - 1);

    return new HolidaySpecification({
      id: "CEASTERSATURDAY-01",
      localName,
      englishName: "Holy Saturday",
      date,
      holidayType: HolidayType.Public,
      observedRuleSet,
    });
  }

  public EasterMonday(
    localName: string,
    year: number,
    observedRuleSet: ObservedRuleSet | undefined,
  ): HolidaySpecification {
    const date = this.EasterSunday(year);
    date.setDate(date.getDate() + 1);

    return new HolidaySpecification({
      id: "CEASTERMONDAY-01",
      localName,
      englishName: "Easter Monday",
      date,
      holidayType: HolidayType.Public,
      observedRuleSet,
    });
  }

  public AscensionDay(
    localName: string,
    year: number,
    observedRuleSet: ObservedRuleSet | undefined,
  ): HolidaySpecification {
    const date = this.EasterSunday(year);
    date.setDate(date.getDate() + 39);

    return new HolidaySpecification({
      id: "CASCENSIONDAY-01",
      localName,
      englishName: "Ascension Day",
      date,
      holidayType: HolidayType.Public,
      observedRuleSet,
    });
  }

  public Pentecost(
    localName: string,
    year: number,
    observedRuleSet: ObservedRuleSet | undefined,
  ): HolidaySpecification {
    const date = this.EasterSunday(year);
    date.setDate(date.getDate() + 49);

    return new HolidaySpecification({
      id: "CPENTECOST-01",
      localName,
      englishName: "Pentecost",
      date,
      holidayType: HolidayType.Public,
      observedRuleSet,
    });
  }

  public WhitMonday(
    localName: string,
    year: number,
    observedRuleSet: ObservedRuleSet | undefined,
  ): HolidaySpecification {
    const date = this.EasterSunday(year);
    date.setDate(date.getDate() + 50);

    return new HolidaySpecification({
      id: "CWHITMONDAY-01",
      localName,
      englishName: "Whit Monday",
      date,
      holidayType: HolidayType.Public,
      observedRuleSet,
    });
  }

  public CorpusChristi(
    localName: string,
    year: number,
    observedRuleSet: ObservedRuleSet | undefined,
  ): HolidaySpecification {
    const date = this.EasterSunday(year);
    date.setDate(date.getDate() + 60);

    return new HolidaySpecification({
      id: "CCORPUSCHRISTI-01",
      localName,
      englishName: "Corpus Christi",
      date,
      holidayType: HolidayType.Public,
      observedRuleSet,
    });
  }
}
