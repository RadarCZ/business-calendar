import type { HolidaySpecification, ObservedRuleSet } from "@models";

export interface ICatholicProvider {
  AdventSunday(year: number): Date;

  EasterSunday(year: number): Date;
  EasterSunday(
    year: number,
    localName: string,
    observedRuleSet?: ObservedRuleSet,
  ): HolidaySpecification;
  EasterSunday(
    year: number,
    localName?: string,
    observedRuleSet?: ObservedRuleSet,
  ): Date | HolidaySpecification;

  MaundyThursday(
    localName: string,
    year: number,
    observedRuleSet?: ObservedRuleSet | undefined,
  ): HolidaySpecification;
  GoodFriday(
    localName: string,
    year: number,
    observedRuleSet?: ObservedRuleSet | undefined,
  ): HolidaySpecification;
  EasterSaturday(
    localName: string,
    year: number,
    observedRuleSet?: ObservedRuleSet | undefined,
  ): HolidaySpecification;
  EasterMonday(
    localName: string,
    year: number,
    observedRuleSet?: ObservedRuleSet | undefined,
  ): HolidaySpecification;
  AscensionDay(
    localName: string,
    year: number,
    observedRuleSet?: ObservedRuleSet | undefined,
  ): HolidaySpecification;
  Pentecost(
    localName: string,
    year: number,
    observedRuleSet?: ObservedRuleSet | undefined,
  ): HolidaySpecification;
  WhitMonday(
    localName: string,
    year: number,
    observedRuleSet?: ObservedRuleSet | undefined,
  ): HolidaySpecification;
  CorpusChristi(
    localName: string,
    year: number,
    observedRuleSet?: ObservedRuleSet | undefined,
  ): HolidaySpecification;
}
