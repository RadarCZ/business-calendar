import type { CountryCode, IHolidayProvider } from "@types";
import { Holiday, type HolidaySpecification } from "@models";

export abstract class AbstractHolidayProvider implements IHolidayProvider {
  private readonly _countryCode: CountryCode;

  protected constructor(countryCode: CountryCode) {
    this._countryCode = countryCode;
  }

  public *getHolidays(year: number): IterableIterator<Holiday> {
    const specifications = this.getHolidaySpecifications(year);
    for (const specification of specifications) {
      const id = `${this._countryCode}-${specification.id}`;
      yield new Holiday({ ...specification, id });
    }
  }

  public abstract getSources(): Array<string>;
  protected abstract getHolidaySpecifications(
    year: number,
  ): Array<HolidaySpecification>;
}
