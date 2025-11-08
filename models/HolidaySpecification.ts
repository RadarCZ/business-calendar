import { Holiday, type ObservedRuleSet } from "./index.ts";
import { type HolidaySource, HolidayType } from "@types";

export class HolidaySpecification extends Holiday {
  public override holidayType: HolidayType = HolidayType.Public;
  public observedRuleSet: ObservedRuleSet | null = null;
  public additionalTranslations: Record<string, string> | null = null;
  public holidaySource: HolidaySource | null = null;

  constructor(options: Partial<HolidaySpecification>) {
    super(options);
    this.observedRuleSet = options.observedRuleSet ?? null;
    this.additionalTranslations = options.additionalTranslations ?? null;
    this.holidaySource = options.holidaySource ?? null;
  }
}
