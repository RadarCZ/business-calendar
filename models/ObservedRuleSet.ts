type DateTransform = (d: Date) => Date;

export class ObservedRuleSet {
  public Monday: DateTransform | null = null;
  public Tuesday: DateTransform | null = null;
  public Wednesday: DateTransform | null = null;
  public Thursday: DateTransform | null = null;
  public Friday: DateTransform | null = null;
  public Saturday: DateTransform | null = null;
  public Sunday: DateTransform | null = null;

  /**
   * Gets the observed date for a given date, according to the rules.
   * @param givenDate The original date of the holiday
   * @returns The observed date based on the rules, or `null` if no rule for that day
   */
  public getObservedDate(givenDate: Date): Date | null {
    switch (givenDate.getDay()) {
      case 1: // Monday
        return this.Monday?.(givenDate) ?? null;
      case 2: // Tuesday
        return this.Tuesday?.(givenDate) ?? null;
      case 3: // Wednesday
        return this.Wednesday?.(givenDate) ?? null;
      case 4: // Thursday
        return this.Thursday?.(givenDate) ?? null;
      case 5: // Friday
        return this.Friday?.(givenDate) ?? null;
      case 6: // Saturday
        return this.Saturday?.(givenDate) ?? null;
      case 0: // Sunday
      default:
        return this.Sunday?.(givenDate) ?? null;
    }
  }
}
