import type { CountryCode, IWeekendProvider } from "@types";
import { WeekendProvider } from "@providers";

export class WeekendSystem {
  private _nonUniversalWeekendProviders: {
    [key in CountryCode]?: IWeekendProvider;
  } = {};

  public getWeekendProvider(country: CountryCode): IWeekendProvider {
    return this._nonUniversalWeekendProviders[country] ||
      WeekendProvider.Universal();
  }
}
