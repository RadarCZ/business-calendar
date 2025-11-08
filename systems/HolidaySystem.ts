import { CountryCode, type ICatholicProvider } from "@types";
import * as Country from "@providers/country";
import { type AbstractHolidayProvider, CatholicProvider } from "@providers";

export class HolidaySystem {
  private readonly _holidayProviders: Record<
    CountryCode,
    AbstractHolidayProvider
  >;

  private readonly _catholicProvider: ICatholicProvider;

  constructor() {
    this._catholicProvider = new CatholicProvider();

    this._holidayProviders = {
      [CountryCode.CZ]: new Country.CzechiaHolidayProvider(
        this._catholicProvider,
      ),
    };
  }

  public getHolidayProvider(country: CountryCode) {
    return this._holidayProviders[country];
  }
}
