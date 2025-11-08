import { AbstractHolidayProvider } from "@providers";
import { HolidaySpecification } from "@models";
import { CountryCode, HolidayType, type ICatholicProvider } from "@types";

export class CzechiaHolidayProvider extends AbstractHolidayProvider {
  private readonly _catholicProvider: ICatholicProvider;

  public constructor(catholicProvider: ICatholicProvider) {
    super(CountryCode.CZ);
    this._catholicProvider = catholicProvider;
  }

  protected getHolidaySpecifications(
    year: number,
  ): Array<HolidaySpecification> {
    return [
      new HolidaySpecification({
        id: "NEWYEARSDAY-01",
        date: new Date(year, 0, 1),
        holidayType: HolidayType.Public,
        localName: "Den obnovy samostatného českého státu; Nový rok",
        englishName: "New Year's Day",
      }),
      new HolidaySpecification({
        id: "LABORDAY-01",
        date: new Date(year, 4, 1),
        holidayType: HolidayType.Public,
        localName: "Svátek práce",
        englishName: "Labour Day",
      }),
      new HolidaySpecification({
        id: "LIBERATIONDAY-01",
        date: new Date(year, 4, 8),
        holidayType: HolidayType.Public,
        localName: "Den vítězství",
        englishName: "Liberation Day",
      }),
      new HolidaySpecification({
        id: "SAINTSCYRILMETHODIUSDAY-01",
        date: new Date(year, 6, 5),
        holidayType: HolidayType.Public,
        localName: "Den slovanských věrozvěstů Cyrila a Metoděje",
        englishName: "Saints Cyril and Methodius Day",
      }),
      new HolidaySpecification({
        id: "JANHUSDAY-01",
        date: new Date(year, 6, 6),
        holidayType: HolidayType.Public,
        localName: "Den upálení mistra Jana Husa",
        englishName: "Jan Hus Day",
      }),
      new HolidaySpecification({
        id: "STWENCESLASDAY-01",
        date: new Date(year, 8, 28),
        holidayType: HolidayType.Public,
        localName: "Den české státnosti",
        englishName: "St. Wenceslas Day",
      }),
      new HolidaySpecification({
        id: "INDEPENDENTDAY-01",
        date: new Date(year, 9, 28),
        holidayType: HolidayType.Public,
        localName: "Den vzniku samostatného československého státu",
        englishName: "Independent Czechoslovak State Day",
      }),
      new HolidaySpecification({
        id: "DEMOCRACYDAY-01",
        date: new Date(year, 10, 17),
        holidayType: HolidayType.Public,
        localName:
          "Den boje za svobodu a demokracii a Mezinárodní den studentstva",
        englishName: "Struggle for Freedom and Democracy Day",
      }),
      new HolidaySpecification({
        id: "CHRISTMASEVE-01",
        date: new Date(year, 11, 24),
        holidayType: HolidayType.Public,
        localName: "Štědrý den",
        englishName: "Christmas Eve",
      }),
      new HolidaySpecification({
        id: "CHRISTMASDAY-01",
        date: new Date(year, 11, 25),
        holidayType: HolidayType.Public,
        localName: "1. svátek vánoční",
        englishName: "Christmas Day",
      }),
      new HolidaySpecification({
        id: "STSTEPHENSDAY-01",
        date: new Date(year, 11, 26),
        holidayType: HolidayType.Public,
        localName: "2. svátek vánoční",
        englishName: "St. Stephen's Day",
      }),
      this._catholicProvider.GoodFriday("Velký pátek", year),
      this._catholicProvider.EasterMonday("Velikonoční pondělí", year),
    ];
  }

  public getSources(): Array<string> {
    return [
      "https://en.wikipedia.org/wiki/Public_holidays_in_the_Czech_Republic",
    ];
  }
}
