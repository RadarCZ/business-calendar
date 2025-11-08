import type { CountryCode, HolidayType } from "@types";

export class Holiday {
  public id: string = "";
  public date: Date;
  public observedDate: Date;
  public englishName: string = "";
  public localName: string = "";
  public countryCode: CountryCode;
  public subdivisionCodes: string[];
  public holidayType: HolidayType;

  public get isNationalHoliday(): boolean {
    return this.subdivisionCodes.length > 0;
  }

  public toString(): string {
    return `${
      this.date.toISOString().split("T")[0]
    } ${this.id} ${this.englishName}";`;
  }

  constructor(options?: Partial<Holiday>) {
    this.id = options?.id ?? this.id ?? "";
    this.date = options?.date ?? new Date();
    this.observedDate = options?.observedDate ?? this.date;
    this.englishName = options?.englishName ?? this.englishName ?? "";
    this.localName = options?.localName ?? this.localName ?? "";
    this.countryCode = options?.countryCode as CountryCode;
    this.subdivisionCodes = options?.subdivisionCodes ?? [];
    this.holidayType = options?.holidayType as HolidayType;
  }
}
